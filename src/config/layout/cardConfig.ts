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
      HEIGHT: 480,
      WIDTH: 720,
      BORDER_RADIUS: 30,
      RESOLUTION: '480',
      GAP: 40,
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
      HEIGHT: 480,
      WIDTH: 320,
      BORDER_RADIUS: 20,
      RESOLUTION: '320',
      GAP: 20,
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
      HEIGHT: 240,
      WIDTH: 360,
      BORDER_RADIUS: 15,
      RESOLUTION: '240',
      GAP: 20,
    },
    ROW_GAP: 30,
  },
};
