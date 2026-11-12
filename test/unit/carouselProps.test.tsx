import React from 'react';
import TestRenderer, {act} from 'react-test-renderer';

// Record the props each demo hands to the native carousel.
const mockCarouselProps: Array<Record<string, unknown>> = [];
jest.mock('@amazon-devices/vega-carousel', () => ({
  Carousel: (props: Record<string, unknown>) => {
    mockCarouselProps.push(props);
    return null;
  },
}));
// Avoid the config -> listConfig -> store -> data import cycle.
jest.mock('../../src/config', () => ({
  ROW_CONFIG: jest.requireActual('../../src/config/layout/rowConfig')
    .ROW_CONFIG,
  FEATURES_CONFIG: {API_PAGINATION: false},
}));
jest.mock('../../src/utils/listUtils', () => ({
  buildRowRenderer: () => () => null,
  rowKeyExtractor: () => 'row',
}));

import {VerticalScrollable} from '../../src/carousel-demo/components/VerticalScrollable';
import {HeterogeneousItemViewScrollable} from '../../src/carousel-demo/components/HeterogeneousScrollable';
import {CarouselGrid} from '../../src/components/Carousel/CarouselGrid';

const lastCarouselProps = (element: React.ReactElement) => {
  mockCarouselProps.length = 0;
  let renderer: TestRenderer.ReactTestRenderer | undefined;
  act(() => {
    renderer = TestRenderer.create(element);
  });
  act(() => renderer?.unmount());
  return mockCarouselProps[mockCarouselProps.length - 1];
};

describe.each([
  ['VerticalScrollable', VerticalScrollable],
  ['HeterogeneousItemViewScrollable', HeterogeneousItemViewScrollable],
])('%s', (_name, Demo) => {
  it('passes the selectionStrategy prop to the carousel', () => {
    expect(
      lastCarouselProps(<Demo data={[]} selectionStrategy="natural" />)
        .selectionStrategy,
    ).toBe('natural');
  });

  // Guard: the old code hard-coded 'anchored', so this passes on it too.
  it("defaults selectionStrategy to 'anchored'", () => {
    expect(lastCarouselProps(<Demo data={[]} />).selectionStrategy).toBe(
      'anchored',
    );
  });
});

describe('CarouselGrid', () => {
  it('fills its tab container instead of the whole screen', () => {
    expect(lastCarouselProps(<CarouselGrid />).containerStyle).toEqual({
      height: '100%',
      width: '100%',
    });
  });
});
