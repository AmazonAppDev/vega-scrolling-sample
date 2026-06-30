'use strict';

import React, {StrictMode, useState} from 'react';
import {Grid} from './config';
import {Pressable, ScrollView, StyleSheet, Text, View} from 'react-native';
import {TVFocusGuideView} from '@amazon-devices/react-native-kepler';
import {SCREEN_DIMENSION} from './constants';
import {MOVIES_DATA} from './carousel-demo/Data/MoviesData';
import {HorizontalScrollable} from './carousel-demo/components/HorizontalScrollable';
import {HorizontalScrollableV1} from './carousel-demo/components/HorizontalScrollableV1';
import {VerticalScrollable} from './carousel-demo/components/VerticalScrollable';
import {VerticalScrollableV1} from './carousel-demo/components/VerticalScrollableV1';
import {HeterogeneousItemViewScrollable} from './carousel-demo/components/HeterogeneousScrollable';
import {HeterogeneousItemViewScrollableV1} from './carousel-demo/components/HeterogeneousScrollableV1';
import {PinnedScrollable} from './carousel-demo/components/PinnedScrollable';
import {PinnedScrollableV1} from './carousel-demo/components/PinnedScrollableV1';
import {PinnedVertical} from './carousel-demo/components/PinnedVertical';
import {PinnedVerticalV1} from './carousel-demo/components/PinnedVerticalV1';
import {ScrollToItemScreen} from './carousel-demo/screens/ScrollToItemScreen';
import {ScrollToItemScreenV1} from './carousel-demo/screens/ScrollToItemScreenV1';
import {CarouselGridV1} from './carousel-demo/grid-v1/CarouselGridV1';

type Tab = {
  id: string;
  title: string;
  // One-sentence, plain-language explanation of what this demo shows.
  description: string;
  // Short label shown on-screen describing the focus behavior this tab uses.
  // V2 prop is `selectionStrategy`; the V1 equivalent is `focusIndicatorType`.
  indicator: string;
  render: () => React.ReactElement;
};

// Tab 0 is the existing KeplerScrollingApp grid demo (FlashList / Carousel toggle).
// The remaining tabs are carousel demos for reproducing carousel behavior
// (scrollTo, pinned offset).
const TABS: Tab[] = [
  {
    id: 'grid',
    title: 'Scrolling Grid (V2)',
    description:
      'A real-world home-screen grid: vertically scrolling rows of horizontally scrolling cards, mixing hero, regular, and vertical card sizes.',
    indicator:
      'vertical selectionStrategy="anchored" · rows selectionStrategy="pinned" · rows selectionBorder: outset, radius=card (15-30), strokeRadius=card · hasPreferredFocus=false',
    render: () => <Grid />,
  },
  {
    id: 'gridV1',
    title: 'Scrolling Grid (V1)',
    description:
      'The same home-screen grid built on the V1 carousel, for side-by-side comparison with the V2 grid above.',
    indicator:
      'vertical focusIndicatorType="fixed" · rows focusIndicatorType="pinned" · rows selectionBorder: enabled outset, radius=card (15-30), strokeRadius=card · hasTVPreferredFocus=unset (default false)',
    render: () => <CarouselGridV1 />,
  },
  {
    id: 'horizontal',
    title: 'Horizontal (V2)',
    description:
      'A single horizontally scrolling row demonstrating natural focus, where the selection moves with the focused item.',
    indicator:
      'selectionStrategy="natural" · selectionBorder: outset (default color/width, default radius) · hasPreferredFocus=true',
    render: () => <HorizontalScrollable data={MOVIES_DATA} />,
  },
  {
    id: 'horizontalV1',
    title: 'Horizontal (V1)',
    description:
      'The V1 counterpart of the horizontal natural-focus row, for side-by-side comparison.',
    indicator:
      'focusIndicatorType="natural" · selectionBorder: white 4px, outset, radius=8 · hasTVPreferredFocus=true',
    render: () => <HorizontalScrollableV1 data={MOVIES_DATA} />,
  },
  {
    id: 'vertical',
    title: 'Vertical (V2)',
    description:
      'A single vertically scrolling column demonstrating anchored focus, where the selection stays fixed and the content scrolls beneath it.',
    indicator:
      'selectionStrategy="anchored" · selectionBorder: outset gold 5px, radius=10 + yellow stroke 2px (strokeRadius=5) · hasPreferredFocus=true',
    render: () => <VerticalScrollable data={MOVIES_DATA} />,
  },
  {
    id: 'verticalV1',
    title: 'Vertical (V1)',
    description:
      'The V1 counterpart of the vertical anchored-focus column, for side-by-side comparison.',
    indicator:
      'focusIndicatorType="fixed" · selectionBorder: gold 5px, outset, radius=10 · hasTVPreferredFocus=true',
    render: () => <VerticalScrollableV1 data={MOVIES_DATA} />,
  },
  {
    id: 'heterogeneous',
    title: 'Heterogeneous (V2)',
    description:
      'A single row mixing two different item sizes, showing how the carousel lays out items of varying dimensions together.',
    indicator:
      'selectionStrategy="anchored" · selectionBorder: inset white 4px, radius=8 (strokeRadius=4) · hasPreferredFocus=true',
    render: () => <HeterogeneousItemViewScrollable data={MOVIES_DATA} />,
  },
  {
    id: 'heterogeneousV1',
    title: 'Heterogeneous (V1)',
    description:
      'The V1 counterpart of the mixed-item-size row, for side-by-side comparison.',
    indicator:
      'focusIndicatorType="fixed" · selectionBorder: white 4px, inset_fit, radius=8 · hasTVPreferredFocus=true',
    render: () => <HeterogeneousItemViewScrollableV1 data={MOVIES_DATA} />,
  },
  {
    id: 'scrollTo',
    title: 'ScrollTo (V2)',
    description:
      'Demonstrates programmatic scrollTo(index): buttons jump the carousel to a target item to test landing position.',
    indicator:
      'selectionStrategy="anchored" · selectionBorder: outset (default color/width, default radius) · hasPreferredFocus=true',
    render: () => <ScrollToItemScreen />,
  },
  {
    id: 'scrollToV1',
    title: 'ScrollTo (V1)',
    description:
      'The V1 counterpart of the programmatic scrollTo demo, for side-by-side comparison.',
    indicator:
      'focusIndicatorType="fixed" · selectionBorder: white 4px, inset_fit, radius=8 · hasTVPreferredFocus=true',
    render: () => <ScrollToItemScreenV1 />,
  },
  {
    id: 'pinned',
    title: 'Pinned (V2)',
    description:
      'Multiple rows, each pinning the selected item at a different offset (0% to 100%), to show how pinnedSelectedItemOffset positions selection.',
    indicator:
      'selectionStrategy="pinned" · selectionBorder: green 3px, radius=8, outset + View border lime 2px · hasPreferredFocus=true',
    render: () => <PinnedScrollable data={MOVIES_DATA} />,
  },
  {
    id: 'pinnedV1',
    title: 'Pinned (V1)',
    description:
      'The V1 counterpart of the per-row pinned-offset demo, for side-by-side comparison.',
    indicator:
      'focusIndicatorType="pinned" · selectionBorder: green 3px, radius=8, outset + View border lime 2px · hasTVPreferredFocus=true',
    render: () => <PinnedScrollableV1 data={MOVIES_DATA} />,
  },
  {
    id: 'pinnedVerticalV2',
    title: 'Pinned Vertical (V2)',
    description:
      'A vertical list pinning selection at a fixed offset, with scrollTo buttons to test how a pinned vertical carousel lands on a target.',
    indicator:
      'selectionStrategy="pinned" · selectionBorder: cyan 3px, radius=8, outset · hasPreferredFocus=true',
    render: () => <PinnedVertical data={MOVIES_DATA} />,
  },
  {
    id: 'pinnedVerticalV1',
    title: 'Pinned Vertical (V1)',
    description:
      'The V1 counterpart of the pinned vertical list, for side-by-side comparison.',
    indicator:
      'focusIndicatorType="pinned" · selectionBorder: cyan 3px, radius=8, outset · hasTVPreferredFocus=true',
    render: () => <PinnedVerticalV1 data={MOVIES_DATA} />,
  },
];

export const App = () => {
  const [activeTab, setActiveTab] = useState<number>(0);

  return (
    <StrictMode>
      <View style={styles.pageContainer}>
        {/* autoFocus makes the guide remember the last-focused tab and redirect
            focus back to it when focus returns to the side nav, instead of
            letting spatial navigation pick the geometrically-nearest tab. */}
        <TVFocusGuideView style={styles.sidebar} autoFocus>
          <ScrollView>
            {TABS.map((tab, index) => (
              <Pressable
                key={tab.id}
                onPress={() => setActiveTab(index)}
                style={(state) => [
                  styles.tab,
                  index === activeTab && styles.tabActive,
                  (state as {focused?: boolean}).focused && styles.tabFocused,
                ]}>
                <Text style={styles.tabLabel}>{tab.title}</Text>
              </Pressable>
            ))}
          </ScrollView>
        </TVFocusGuideView>
        <View style={styles.content}>
          <Text style={styles.descriptionLabel}>
            {TABS[activeTab].description}
          </Text>
          <Text style={styles.indicatorLabel}>{TABS[activeTab].indicator}</Text>
          <View style={styles.contentInner}>{TABS[activeTab].render()}</View>
        </View>
      </View>
    </StrictMode>
  );
};

const styles = StyleSheet.create({
  pageContainer: {
    height: SCREEN_DIMENSION.height,
    width: SCREEN_DIMENSION.width,
    backgroundColor: '#252a30',
    flexDirection: 'row',
  },
  sidebar: {
    width: 150,
    flexGrow: 0,
    flexShrink: 0,
    height: '100%',
    backgroundColor: '#1b1f24',
    paddingTop: 24,
  },
  tab: {
    paddingVertical: 12,
    paddingHorizontal: 14,
  },
  tabActive: {
    backgroundColor: '#33414f',
  },
  tabFocused: {
    backgroundColor: '#3b82f6',
  },
  tabLabel: {
    color: '#ffffff',
    fontSize: 16,
  },
  content: {
    flex: 1,
    height: '100%',
    overflow: 'hidden',
    // Breathing room so items scaled up on selection are not clipped by the
    // content area's edges (overflow is hidden to keep tabs from bleeding over).
    padding: 24,
  },
  contentInner: {
    flex: 1,
  },
  descriptionLabel: {
    color: '#e6edf3',
    fontSize: 15,
    marginBottom: 6,
  },
  indicatorLabel: {
    color: '#9fb3c8',
    fontSize: 13,
    fontFamily: 'monospace',
    marginBottom: 8,
  },
});
