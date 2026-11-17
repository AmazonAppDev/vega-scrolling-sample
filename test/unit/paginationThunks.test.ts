import {configureStore} from '@reduxjs/toolkit';

const mockRowConfig = {API_PAGE_SIZE: 2, WIDTH: 300, HEIGHT: 200};
jest.mock('../../src/config', () => ({
  ROW_CONFIG: {
    HERO: mockRowConfig,
    VERTICAL: mockRowConfig,
    REGULAR: mockRowConfig,
  },
  FEATURES_CONFIG: {API_PAGINATION: true},
}));
jest.mock('../../src/data', () => ({
  ROW_DATA: [
    {
      cardType: 'REGULAR',
      title: 'Row 0',
      data: [{index: 0}, {index: 1}, {index: 2}],
    },
  ],
}));
jest.mock('../../src/services/dataService', () => ({
  api: {cardApi: {fetchCards: jest.fn()}},
}));

import {slice, setLastRequestedOffset} from '../../src/store';
import {fetchMoreCards} from '../../src/thunks/paginationThunks';

const makeStore = (fetchCards: jest.Mock) =>
  configureStore({
    reducer: {rows: slice.reducer},
    middleware: (getDefault) =>
      getDefault({thunk: {extraArgument: {cardApi: {fetchCards}}}}),
  });
const card = (index: number) => ({index} as never);
const fetchFrom = (store: ReturnType<typeof makeStore>, index: number) =>
  store.dispatch(fetchMoreCards(card(index), 2, 0) as never);

// Each row starts with one page of 2 cards; batch size is 2.
describe('fetchMoreCards', () => {
  afterEach(() => jest.restoreAllMocks());

  // Guard: the isLoading check and the offset record both stop this today.
  it('sends one request when a second focus arrives mid-flight', async () => {
    let resolve: (cards: unknown[]) => void = () => {};
    const fetchCards = jest.fn(
      () => new Promise<unknown[]>((r) => (resolve = r)),
    );
    const store = makeStore(fetchCards);
    const first = fetchFrom(store, 1);
    await fetchFrom(store, 1);
    resolve([{index: 2}, {index: 3}]);
    await first;
    expect(fetchCards).toHaveBeenCalledTimes(1);
    expect(store.getState().rows[0].data).toHaveLength(4);
  });

  it('stops after an empty page', async () => {
    const fetchCards = jest.fn().mockResolvedValue([]);
    const store = makeStore(fetchCards);
    await fetchFrom(store, 1);
    // Clear the offset guard so only hasMore can stop the second request.
    store.dispatch(setLastRequestedOffset({rowIndex: 0, offset: -1}));
    await fetchFrom(store, 1);
    expect(fetchCards).toHaveBeenCalledTimes(1);
    expect(store.getState().rows[0].pagination.hasMore).toBe(false);
  });

  it('stops after a page shorter than the batch size', async () => {
    const fetchCards = jest.fn().mockResolvedValue([{index: 2}]);
    const store = makeStore(fetchCards);
    await fetchFrom(store, 1);
    await fetchFrom(store, 2);
    expect(fetchCards).toHaveBeenCalledTimes(1);
    expect(store.getState().rows[0].pagination.hasMore).toBe(false);
  });

  it('records the offset it fetched from', async () => {
    const fetchCards = jest.fn().mockResolvedValue([{index: 3}]);
    const store = makeStore(fetchCards);
    await fetchFrom(store, 1);
    expect(fetchCards).toHaveBeenCalledWith(0, 2, 2);
    expect(store.getState().rows[0].pagination.lastRequestedOffset).toBe(2);
  });

  it('skips an offset that was already requested', async () => {
    const fetchCards = jest.fn().mockResolvedValue([{index: 2}]);
    const store = makeStore(fetchCards);
    store.dispatch(setLastRequestedOffset({rowIndex: 0, offset: 2}));
    await fetchFrom(store, 1);
    expect(fetchCards).not.toHaveBeenCalled();
  });

  it('retries the same offset after a failed request', async () => {
    const fetchCards = jest
      .fn()
      .mockRejectedValueOnce(new Error('network'))
      .mockResolvedValueOnce([{index: 3}]);
    const store = makeStore(fetchCards);
    jest.spyOn(console, 'error').mockImplementation(() => {});
    await fetchFrom(store, 1);
    await fetchFrom(store, 1);
    expect(fetchCards).toHaveBeenCalledTimes(2);
    expect(store.getState().rows[0].data).toHaveLength(3);
  });
});
