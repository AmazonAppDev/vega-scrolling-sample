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

// Size for the kepler-ui-components Buttons in the demos. Versions after 3.1
// scale the library's Button sizes by window height / 1080, which makes them
// about half as big on a 960x540 dp TV window. These are the library's
// default ('md') sizes as 3.1 drew them, so the demo screens keep the look
// they were designed with.
export const DEMO_BUTTON_STYLE = StyleSheet.create({
  container: {
    height: 84,
    paddingHorizontal: 18,
    borderWidth: 3,
    borderRadius: 8,
  },
  label: {
    fontSize: 24,
  },
});
