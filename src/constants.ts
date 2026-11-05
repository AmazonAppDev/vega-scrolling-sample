import {Dimensions} from 'react-native';
import {scaleUxToDp} from './utils/PixelUtils';

export const SCREEN_DIMENSION = Dimensions.get('window');

export const DEFAULT_IMAGE_RESOLUTION = '300';

export const PAGE_PADDING = scaleUxToDp(50);
