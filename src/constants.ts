import {Dimensions} from 'react-native';
import {scaleUxToDp} from './utils/PixelUtils';

export const SCREEN_DIMENSION = Dimensions.get('window');

export const PAGE_PADDING = scaleUxToDp(50);
