import {FEATURES_CONFIG} from './featuresConfig';
import {CARD_CONFIG} from './layout/cardConfig';
import {ROW_CONFIG} from './layout/rowConfig';
import {currentList} from './listConfig';

export * from './layout/cardConfig';
export * from './layout/rowConfig';
export * from './listConfig';
export * from './featuresConfig';

export const CONFIG = {
  CARD: CARD_CONFIG,
  ROW: ROW_CONFIG,
  LIST: {
    TYPE: currentList,
  },
  FEATURES: FEATURES_CONFIG,
};

export const FOCUS_BORDER = 8;
