import React, {useRef} from 'react';
import {View} from 'react-native';
import {HorizontalScrollable} from '../components/HorizontalScrollable';
import {Button} from '@amazon-devices/kepler-ui-components';
import {CarouselRef} from '@amazon-devices/vega-carousel';
import {MOVIES_DATA} from '../Data/MoviesData';
import {styles} from './Styles';

export const ScrollToItemScreen = () => {
  const scrollableRef = useRef<CarouselRef<any>>(null);
  const onPressHandler = () => {
    scrollableRef.current?.scrollTo(6, true);
  };

  return (
    <View style={styles.container}>
      <View style={styles.carousel}>
        <HorizontalScrollable
          data={MOVIES_DATA}
          selectionStrategy="anchored"
          ref={scrollableRef}
        />
      </View>
      <View style={styles.gap}>
        <Button label="ScrollTo" onPress={onPressHandler} variant={'primary'} />
      </View>
    </View>
  );
};
