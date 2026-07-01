import {ROW_DATA} from './data';
import {CardData, RowData} from './types';
import {configureStore, PayloadAction, Action} from '@reduxjs/toolkit';
import {createSlice, ThunkAction} from '@reduxjs/toolkit';
import {
  useDispatch as useReduxDispatch,
  useSelector as useReduxSelector,
} from 'react-redux';
import {FEATURES_CONFIG, ROW_CONFIG} from './config';
import {api, ApiType} from './services/dataService';

const initialData: RowData[] = ROW_DATA.map((row) => {
  const pageLen = ROW_CONFIG[row.cardType].API_PAGE_SIZE;

  return {
    ...row,
    data: row.data.slice(
      0,
      FEATURES_CONFIG.API_PAGINATION ? pageLen : row.data.length,
    ),
    pagination: {
      isLoading: false,
      hasMore: true,
      error: null,
      lastRequestedPage: -1,
    },
  };
});

export const slice = createSlice({
  name: 'rows',
  initialState: initialData,
  reducers: {
    setPaginationLoading: (
      state,
      action: PayloadAction<{
        rowIndex: number;
        isLoading: boolean;
      }>,
    ) => {
      const {rowIndex, isLoading} = action.payload;
      state[rowIndex].pagination.isLoading = isLoading;
    },
    setPaginationError: (
      state,
      action: PayloadAction<{
        rowIndex: number;
        error: string | null;
      }>,
    ) => {
      const {rowIndex, error} = action.payload;
      state[rowIndex].pagination.error = error;
      state[rowIndex].pagination.isLoading = false;
    },
    setLastRequestedPage: (
      state,
      action: PayloadAction<{
        rowIndex: number;
        page: number;
      }>,
    ) => {
      const {rowIndex, page} = action.payload;
      state[rowIndex].pagination.lastRequestedPage = page;
    },
    addRowData: (
      state,
      action: PayloadAction<{
        newCards: CardData[];
        rowIndex: number;
      }>,
    ) => {
      const {newCards, rowIndex} = action.payload;
      const row = state[rowIndex];

      newCards.forEach((card) => {
        row.data.push(card);
      });

      row.pagination.isLoading = false;
      row.pagination.error = null;
      row.pagination.hasMore = newCards.length > 0;

      console.log(
        `[API PAGINATION] Row ${rowIndex} updated and now has ${row.data.length} cards`,
      );
    },
  },
});

export const store = configureStore({
  reducer: {
    rows: slice.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      thunk: {
        extraArgument: api,
      },
    }),
});

export const {
  addRowData,
  setPaginationLoading,
  setPaginationError,
  setLastRequestedPage,
} = slice.actions;
export type RootState = ReturnType<typeof store.getState>;
export type DispatchType = typeof store.dispatch;

export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  ApiType,
  Action<string>
>;

export const useDispatch = useReduxDispatch.withTypes<DispatchType>();
export const useSelector = useReduxSelector.withTypes<RootState>();
