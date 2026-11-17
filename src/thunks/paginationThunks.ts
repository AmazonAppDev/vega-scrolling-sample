import {
  AppThunk,
  addRowData,
  setPaginationLoading,
  setPaginationError,
  setLastRequestedOffset,
  setPaginationHasMore,
} from '../store';
import {CardData} from '../types';

export const fetchMoreCards =
  (
    cardData: CardData,
    paginationBatchSize: number,
    rowIndex: number,
  ): AppThunk =>
  async (dispatch, getState, api) => {
    const state = getState();
    const row = state.rows[rowIndex];
    const currentRowLength = row.data.length;
    const pagination = row.pagination;

    const currentThreshold = currentRowLength - paginationBatchSize + 1;
    const shouldTrigger = cardData.index >= currentThreshold;

    // Already requested if the row has not grown since the last request.
    // Defensive: isLoading and hasMore already cover the reachable cases.
    const isAlreadyRequested =
      currentRowLength <= pagination.lastRequestedOffset;
    const isCurrentlyLoading = pagination.isLoading;
    const hasNoMoreData = !pagination.hasMore;

    if (
      !shouldTrigger ||
      isAlreadyRequested ||
      isCurrentlyLoading ||
      hasNoMoreData
    ) {
      return [];
    }

    const previousOffset = pagination.lastRequestedOffset;

    console.log(
      `[API PAGINATION] Triggering pagination for row ${rowIndex}, card ${cardData.index}. Fetching from offset ${currentRowLength}`,
    );

    dispatch(setPaginationLoading({rowIndex, isLoading: true}));
    dispatch(setLastRequestedOffset({rowIndex, offset: currentRowLength}));

    try {
      const newCards = await api.cardApi.fetchCards(
        rowIndex,
        currentRowLength,
        paginationBatchSize,
      );

      const newCardsLen = newCards.length;

      console.log(`[API PAGINATION] Number of Cards Retrieved: ${newCardsLen}`);

      if (newCardsLen > 0) {
        dispatch(
          addRowData({
            rowIndex: rowIndex,
            newCards: newCards,
          }),
        );
        // A short page is the last one: stop here instead of spending one
        // more request to learn that the next page is empty.
        if (newCardsLen < paginationBatchSize) {
          dispatch(setPaginationHasMore({rowIndex, hasMore: false}));
        }
        console.log(
          `[API PAGINATION] New pagination threshold: ${currentRowLength + 1}`,
        );
      } else {
        // An empty page means the row is exhausted: record it so later focus
        // on the trailing cards short-circuits instead of refetching.
        dispatch(setPaginationHasMore({rowIndex, hasMore: false}));
        dispatch(setPaginationLoading({rowIndex, isLoading: false}));
        console.log(
          `[API PAGINATION] No more cards to load for row ${rowIndex}`,
        );
      }

      dispatch(setPaginationError({rowIndex, error: null}));

      return newCards;
    } catch (error) {
      const errorMessage =
        error instanceof Error ? error.message : 'Unknown error';
      console.error(
        `[API PAGINATION] Failed to fetch more cards for row ${rowIndex}:`,
        error,
      );

      // Let a later focus retry this offset after a failed request.
      dispatch(setLastRequestedOffset({rowIndex, offset: previousOffset}));
      dispatch(setPaginationError({rowIndex, error: errorMessage}));

      return [];
    }
  };
