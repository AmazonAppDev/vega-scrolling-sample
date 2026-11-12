# Carousel demo tabs

The tabs demonstrate the carousel from `@amazon-devices/vega-carousel` (referred to here as
**V2**), the recommended component for new apps. The V1 columns below list the equivalent props of
the earlier carousel from `@amazon-devices/kepler-ui-components` (**V1**), as a reference for
migrating; the app itself renders V2 only.

Each tab shows an on-screen label with the `selectionStrategy` and `selectionBorder` props it uses.

## What the tabs show

| Tab | V2 prop | V1 prop | Purpose |
|-----|---------|---------|---------|
| Scrolling Grid | `selectionStrategy="anchored"` (rows `"pinned"`) | `focusIndicatorType="fixed"` (rows `"pinned"`) | Real-world grid layout |
| Horizontal | `selectionStrategy="natural"` | `focusIndicatorType="natural"` | Basic horizontal carousel |
| Vertical | `selectionStrategy="anchored"` | `focusIndicatorType="fixed"` | Basic vertical carousel |
| Heterogeneous | `selectionStrategy="anchored"` | `focusIndicatorType="fixed"` | Mixed item sizes in one row |
| ScrollTo | `selectionStrategy="anchored"` | `focusIndicatorType="fixed"` | `scrollTo` to a target item |
| Pinned | `selectionStrategy="pinned"` | `focusIndicatorType="pinned"` | Pinned offset from 0% to 100% across rows |
| Pinned Vertical | `selectionStrategy="pinned"` | `focusIndicatorType="pinned"` | Vertical list with pinned offset |

## V1 to V2 prop mapping

| V1 (`kepler-ui-components`) | V2 (`vega-carousel`) |
|-----------------------------|----------------------|
| `focusIndicatorType="natural"` | `selectionStrategy="natural"` |
| `focusIndicatorType="fixed"` | `selectionStrategy="anchored"` |
| `focusIndicatorType="pinned"` + `pinnedFocusOffset` | `selectionStrategy="pinned"` + `pinnedSelectedItemOffset` |
| `data[]` + `getItemForIndex` + `keyProvider` + `itemDimensions` | `dataAdapter` (`getItem` / `getItemCount` / `getItemKey`) |
| `hasTVPreferredFocus` | `hasPreferredFocus` |
| `itemSelectionExpansion` | `itemStyle.selectedItemScaleFactor` |

To experiment, open the matching tab, adjust the props, and share the change (see the
repository's contribution guidance).
