import {TextStyle} from 'react-native';
import {CardType, ImageResolutions} from '../../types';
import {scaleUxToDp} from '../../utils/PixelUtils';

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
      HEIGHT: scaleUxToDp(60),
      FONT_SIZE: scaleUxToDp(50),
      FONT_WEIGHT: '700',
    },
    CARD: {
      HEIGHT: scaleUxToDp(400),
      WIDTH: scaleUxToDp(700),
      BORDER_RADIUS: scaleUxToDp(30),
      RESOLUTION: '720',
      GAP: 0,
    },
    ROW_GAP: scaleUxToDp(100),
  },
  VERTICAL: {
    TITLE: {
      HEIGHT: scaleUxToDp(50),
      FONT_SIZE: scaleUxToDp(35),
      FONT_WEIGHT: '300',
    },
    CARD: {
      HEIGHT: scaleUxToDp(400),
      WIDTH: scaleUxToDp(250),
      BORDER_RADIUS: scaleUxToDp(20),
      RESOLUTION: '260',
      GAP: 0,
    },
    ROW_GAP: scaleUxToDp(30),
  },
  REGULAR: {
    TITLE: {
      HEIGHT: scaleUxToDp(50),
      FONT_SIZE: scaleUxToDp(35),
      FONT_WEIGHT: '300',
    },
    CARD: {
      HEIGHT: scaleUxToDp(175),
      WIDTH: scaleUxToDp(300),
      BORDER_RADIUS: scaleUxToDp(15),
      RESOLUTION: '400',
      GAP: 0,
    },
    ROW_GAP: scaleUxToDp(30),
  },
};
