import {StyleSheet} from 'react-native';
import {scaleUxToDp} from '../../utils/PixelUtils';

export const CAROUSEL_STYLE = StyleSheet.create({
  container: {
    backgroundColor: '#000000',
    width: '100%',
    height: '100%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  imageContainer: {
    width: '100%',
    height: '100%',
    resizeMode: 'cover',
  },
  itemHorizontalContainer: {
    width: scaleUxToDp(250),
    height: '100%',
  },
  itemVerticalContainer: {
    width: '100%',
    height: scaleUxToDp(420),
  },
  itemContainerType1: {
    height: scaleUxToDp(420),
    width: scaleUxToDp(200),
    justifyContent: 'center',
    alignContent: 'center',
  },
  itemContainerType2: {
    height: scaleUxToDp(420),
    width: scaleUxToDp(500),
    justifyContent: 'center',
    alignContent: 'center',
  },
  itemFocusContainer: {
    borderWidth: scaleUxToDp(4),
    borderColor: 'white',
  },
  horizontalCarouselContainerStyle: {
    width: '100%',
    height: scaleUxToDp(420),
  },
  verticalCarouselContainerStyle: {
    height: '100%',
    width: scaleUxToDp(250),
    justifyContent: 'center',
  },
});
