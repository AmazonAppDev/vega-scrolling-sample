import React, {useRef} from 'react';
import {View} from 'react-native';
import {Button, CarouselRef} from '@amazon-devices/kepler-ui-components';
import {HorizontalScrollableV1} from '../components/HorizontalScrollableV1';
import {MOVIES_DATA} from '../Data/MoviesData';
import {styles} from './Styles';

export const ScrollToItemScreenV1 = () => {
  const scrollableRef = useRef<CarouselRef<string>>(null);
  const onPressHandler = () => {
    scrollableRef.current?.scrollTo(6, true);
  };

  return (
    <View style={styles.container}>
      <View style={styles.carousel}>
        <HorizontalScrollableV1
          data={MOVIES_DATA}
          focusIndicatorType="fixed"
          ref={scrollableRef}
        />
      </View>
      <View style={styles.gap}>
        <Button
          label="ScrollTo (V1)"
          onPress={onPressHandler}
          variant={'primary'}
        />
      </View>
    </View>
  );
};
