import {Dimensions, PixelRatio} from 'react-native';

const SCREEN_DP = Dimensions.get('window');
const REFERENCE_HEIGHT = 1080;

export const scaleUxToDp = (
  uxUnit: number,
  referenceHeight: number = REFERENCE_HEIGHT,
): number =>
  PixelRatio.roundToNearestPixel(uxUnit * (SCREEN_DP.height / referenceHeight));
