import {TextStyle} from 'react-native';
import {CardType, ImageResolutions} from '../../types';

type CardConfig = Record<
  CardType,
  {
    TITLE: {
      HEIGHT: number;
      FONT_SIZE: number;
      FONT_WEIGHT: TextStyle['fontWeight'];
    };
    CARD: {
      HEIGHT: number;
      WIDTH: number;
      BORDER_RADIUS: number;
      RESOLUTION: keyof typeof ImageResolutions;
      // Per-card horizontal gap, applied as marginRight on the card itself.
      // Kept at 0 for the V2 vega-carousel path, which controls spacing via
      // itemStyle.itemPadding / itemPaddingOnSelection instead. The FlashList
      // path has no such item padding, so it relies on this GAP for spacing —
      // change it here if you need gaps in the FlashList grid.
      GAP: number;
    };
    ROW_GAP: number;
  }
>;

export const CARD_CONFIG: CardConfig = {
  HERO: {
    TITLE: {
      HEIGHT: 60,
      FONT_SIZE: 50,
      FONT_WEIGHT: '700',
    },
    CARD: {
      HEIGHT: 400,
      WIDTH: 700,
      BORDER_RADIUS: 30,
      RESOLUTION: '720',
      GAP: 0,
    },
    ROW_GAP: 100,
  },
  VERTICAL: {
    TITLE: {
      HEIGHT: 50,
      FONT_SIZE: 35,
      FONT_WEIGHT: '300',
    },
    CARD: {
      HEIGHT: 400,
      WIDTH: 250,
      BORDER_RADIUS: 20,
      RESOLUTION: '260',
      GAP: 0,
    },
    ROW_GAP: 30,
  },
  REGULAR: {
    TITLE: {
      HEIGHT: 50,
      FONT_SIZE: 35,
      FONT_WEIGHT: '300',
    },
    CARD: {
      HEIGHT: 175,
      WIDTH: 300,
      BORDER_RADIUS: 15,
      RESOLUTION: '400',
      GAP: 0,
    },
    ROW_GAP: 30,
  },
};
