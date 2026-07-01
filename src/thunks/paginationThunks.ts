import {
  AppThunk,
  addRowData,
  setPaginationLoading,
  setPaginationError,
  setLastRequestedPage,
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

    const isAlreadyRequested = cardData.index <= pagination.lastRequestedPage;
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

    const nextPageToRequest = pagination.lastRequestedPage + 1;

    console.log(
      `[API PAGINATION] Triggering pagination for row ${rowIndex}, card ${cardData.index}. Fetching page ${nextPageToRequest}`,
    );

    dispatch(setPaginationLoading({rowIndex, isLoading: true}));
    dispatch(setLastRequestedPage({rowIndex, page: nextPageToRequest}));

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
        console.log(
          `[API PAGINATION] New pagination threshold: ${currentRowLength + 1}`,
        );
      } else {
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

      dispatch(setPaginationError({rowIndex, error: errorMessage}));

      return [];
    }
  };
