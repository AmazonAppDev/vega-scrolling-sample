import React, {useRef} from 'react';
import {View} from 'react-native';
import {
  findNodeHandle,
  FocusManager,
  TVFocusGuideView,
} from '@amazon-devices/react-native-kepler';
import {HorizontalScrollable} from '../components/HorizontalScrollable';
import {Button} from '@amazon-devices/kepler-ui-components';
import {CarouselRef} from '@amazon-devices/vega-carousel';
import {MOVIES_DATA} from '../Data/MoviesData';
import {DEMO_BUTTON_STYLE} from '../components/Style';
import {styles} from './Styles';

export const ScrollToItemScreen = () => {
  const scrollableRef = useRef<CarouselRef<any>>(null);
  const hostRef = useRef<React.ComponentRef<typeof TVFocusGuideView>>(null);
  const onPressHandler = () => {
    scrollableRef.current?.scrollTo(6, true);
    const node = findNodeHandle(hostRef.current);
    if (node) {
      FocusManager.focus(node);
    }
  };

  return (
    <View style={styles.container}>
      <TVFocusGuideView ref={hostRef} autoFocus style={styles.carousel}>
        <HorizontalScrollable
          data={MOVIES_DATA}
          selectionStrategy="anchored"
          ref={scrollableRef}
        />
      </TVFocusGuideView>
      <View style={styles.gap}>
        <Button
          label="Scroll to 7"
          onPress={onPressHandler}
          variant={'primary'}
          style={DEMO_BUTTON_STYLE.container}
          labelStyle={DEMO_BUTTON_STYLE.label}
        />
      </View>
    </View>
  );
};
