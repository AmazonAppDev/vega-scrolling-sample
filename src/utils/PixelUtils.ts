import {Dimensions, PixelRatio} from 'react-native';

// Read once at import: the TV window size is fixed for the app's lifetime.
export const SCREEN_DP = Dimensions.get('window');
const REFERENCE_HEIGHT = 1080;

export const scaleUxToDp = (
  uxUnit: number,
  referenceHeight: number = REFERENCE_HEIGHT,
): number =>
  PixelRatio.roundToNearestPixel(uxUnit * (SCREEN_DP.height / referenceHeight));
