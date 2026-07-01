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

// The current samples only need data as prop. In future we can add more optionals to show other variants.
export type ScrollableProps = {
  data: ItemType[];
  // Optional focus-behavior override so a shared scrollable can be reused with a
  // different indicator (e.g. ScrollTo reuses the Horizontal scrollable but wants
  // anchored/fixed instead of the default natural). Omitted => component default.
  selectionStrategy?: SelectionStrategy; // V2 (vega-carousel): 'natural' | 'anchored' | 'pinned'
  focusIndicatorType?: 'natural' | 'fixed' | 'pinned'; // V1 (kepler-ui-components)
};
