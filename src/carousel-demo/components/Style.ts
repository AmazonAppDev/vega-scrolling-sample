import {StyleSheet} from 'react-native';

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
    width: 125,
    height: '100%',
  },
  itemVerticalContainer: {
    width: '100%',
    height: 210,
  },
  itemContainerType1: {
    height: 210,
    width: 100,
    justifyContent: 'center',
    alignContent: 'center',
  },
  itemContainerType2: {
    height: 210,
    width: 250,
    justifyContent: 'center',
    alignContent: 'center',
  },
  itemFocusContainer: {
    borderWidth: 2,
    borderColor: 'white',
  },
  horizontalCarouselContainerStyle: {
    width: '100%',
    height: 210,
  },
  verticalCarouselContainerStyle: {
    height: '100%',
    width: 125,
    justifyContent: 'center',
  },
});
