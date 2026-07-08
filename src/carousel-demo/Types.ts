import type {ReactElement} from 'react';
import {SelectionStrategy} from '@amazon-devices/vega-carousel';

// Data Source type. `url` holds a bundled-asset module ref (the result of
// require(...)), so it is passed straight to <Image source={item.url} />.
export type ItemType = {
  url: number;
};

// A basic interface to pass Carousel component and some additional view if necessary.
export type ScreenProps = {
  scrollableComponent: ReactElement;
  children?: ReactElement;
};

export type ScrollableProps = {
  data: ItemType[];
  selectionStrategy?: SelectionStrategy;
};
