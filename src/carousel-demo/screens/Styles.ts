import {StyleSheet} from 'react-native';
import {scaleUxToDp} from '../../utils/PixelUtils';

export const styles = StyleSheet.create({
  container: {
    backgroundColor: 'black',
    width: '100%',
    height: '100%',
    flexDirection: 'column',
    alignItems: 'center',
  },
  carousel: {
    height: '50%',
    padding: scaleUxToDp(100),
    width: '100%',
  },
  gap: {
    paddingTop: scaleUxToDp(200),
  },
});
