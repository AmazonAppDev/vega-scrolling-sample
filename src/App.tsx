'use strict';

import React, {StrictMode, useState} from 'react';
import {Grid} from './config';
import {Pressable, ScrollView, StyleSheet, Text, View} from 'react-native';
import {TVFocusGuideView} from '@amazon-devices/react-native-kepler';
import {SCREEN_DIMENSION} from './constants';
import {scaleUxToDp} from './utils/PixelUtils';
import {MOVIES_DATA} from './carousel-demo/Data/MoviesData';
import {HorizontalScrollable} from './carousel-demo/components/HorizontalScrollable';
import {VerticalScrollable} from './carousel-demo/components/VerticalScrollable';
import {HeterogeneousItemViewScrollable} from './carousel-demo/components/HeterogeneousScrollable';
import {PinnedScrollable} from './carousel-demo/components/PinnedScrollable';
import {PinnedVertical} from './carousel-demo/components/PinnedVertical';
import {ScrollToItemScreen} from './carousel-demo/screens/ScrollToItemScreen';

type Tab = {
  id: string;
  title: string;
  description: string;
  indicator: string;
  render: () => React.ReactElement;
};

const TABS: Tab[] = [
  {
    id: 'grid',
    title: 'Scrolling Grid',
    description:
      'A real-world home-screen grid: vertically scrolling rows of horizontally scrolling cards, mixing hero, regular, and vertical card sizes.',
    indicator:
      'vertical selectionStrategy="anchored" · rows selectionStrategy="pinned" · rows selectionBorder: outset, radius=card (15-30), strokeRadius=card · hasPreferredFocus=false',
    render: () => <Grid />,
  },
  {
    id: 'horizontal',
    title: 'Horizontal',
    description:
      'A single horizontally scrolling row demonstrating natural focus, where the selection moves with the focused item.',
    indicator:
      'selectionStrategy="natural" · selectionBorder: outset (default color/width, default radius) · hasPreferredFocus=true',
    render: () => <HorizontalScrollable data={MOVIES_DATA} />,
  },
  {
    id: 'vertical',
    title: 'Vertical',
    description:
      'A single vertically scrolling column demonstrating anchored focus, where the selection stays fixed and the content scrolls beneath it.',
    indicator:
      'selectionStrategy="anchored" · selectionBorder: outset gold 5px, radius=10 + yellow stroke 2px (strokeRadius=5) · hasPreferredFocus=true',
    render: () => <VerticalScrollable data={MOVIES_DATA} />,
  },
  {
    id: 'heterogeneous',
    title: 'Heterogeneous',
    description:
      'A single row mixing two different item sizes, showing how the carousel lays out items of varying dimensions together.',
    indicator:
      'selectionStrategy="anchored" · selectionBorder: inset white 4px, radius=8 (strokeRadius=4) · hasPreferredFocus=true',
    render: () => <HeterogeneousItemViewScrollable data={MOVIES_DATA} />,
  },
  {
    id: 'scrollTo',
    title: 'ScrollTo',
    description:
      'Demonstrates programmatic scrollTo(index): buttons jump the carousel to a target item to test landing position.',
    indicator:
      'selectionStrategy="anchored" · selectionBorder: outset (default color/width, default radius) · hasPreferredFocus=true',
    render: () => <ScrollToItemScreen />,
  },
  {
    id: 'pinned',
    title: 'Pinned',
    description:
      'Multiple rows, each pinning the selected item at a different offset (0% to 100%), to show how pinnedSelectedItemOffset positions selection.',
    indicator:
      'selectionStrategy="pinned" · selectionBorder: green 3px, radius=8, outset + View border lime 2px · hasPreferredFocus=true',
    render: () => <PinnedScrollable data={MOVIES_DATA} />,
  },
  {
    id: 'pinnedVertical',
    title: 'Pinned Vertical',
    description:
      'A vertical list pinning selection at a fixed offset, with scrollTo buttons to test how a pinned vertical carousel lands on a target.',
    indicator:
      'selectionStrategy="pinned" · selectionBorder: cyan 3px, radius=8, outset · hasPreferredFocus=true',
    render: () => <PinnedVertical data={MOVIES_DATA} />,
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
    width: scaleUxToDp(150),
    flexGrow: 0,
    flexShrink: 0,
    height: '100%',
    backgroundColor: '#1b1f24',
    paddingTop: scaleUxToDp(24),
  },
  tab: {
    paddingVertical: scaleUxToDp(12),
    paddingHorizontal: scaleUxToDp(14),
  },
  tabActive: {
    backgroundColor: '#33414f',
  },
  tabFocused: {
    backgroundColor: '#3b82f6',
  },
  tabLabel: {
    color: '#ffffff',
    fontSize: scaleUxToDp(16),
  },
  content: {
    flex: 1,
    height: '100%',
    overflow: 'hidden',
    padding: scaleUxToDp(24),
  },
  contentInner: {
    flex: 1,
  },
  descriptionLabel: {
    color: '#e6edf3',
    fontSize: scaleUxToDp(15),
    marginBottom: scaleUxToDp(6),
  },
  indicatorLabel: {
    color: '#9fb3c8',
    fontSize: scaleUxToDp(13),
    fontFamily: 'monospace',
    marginBottom: scaleUxToDp(8),
  },
});
