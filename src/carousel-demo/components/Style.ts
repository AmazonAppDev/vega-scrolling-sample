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
    width: 250,
    height: '100%',
  },
  itemVerticalContainer: {
    width: '100%',
    height: 420,
  },
  itemContainerType1: {
    height: 420,
    width: 200,
    justifyContent: 'center',
    alignContent: 'center',
  },
  itemContainerType2: {
    height: 420,
    width: 500,
    justifyContent: 'center',
    alignContent: 'center',
  },
  itemFocusContainer: {
    borderWidth: 4,
    borderColor: 'white',
  },
  horizontalCarouselContainerStyle: {
    width: '100%',
    height: 420,
  },
  verticalCarouselContainerStyle: {
    height: '100%',
    width: 250,
    justifyContent: 'center',
  },
});
