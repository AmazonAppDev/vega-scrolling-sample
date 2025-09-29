import {Carousel, CarouselProps} from '@amazon-devices/kepler-ui-components';
import {FlashList, FlashListProps} from '@amazon-devices/shopify__flash-list';

import {CarouselCardRow, CarouselGrid} from '../components/Carousel';
import {FlashlistCardRow, FlashlistGrid} from '../components/Flashlist';
import {ListType} from '../types';
export const currentList: ListType = 'FlashList';

type currentListType = typeof currentList;

export type ListComponent = currentListType extends 'FlashList'
  ? typeof FlashList
  : typeof Carousel;

export type ListProps<Data> = currentListType extends 'FlashList'
  ? FlashListProps<Data>
  : CarouselProps<Data>;

export const Grid = currentList === 'FlashList' ? FlashlistGrid : CarouselGrid;
export const CardRow =
  currentList === 'FlashList' ? FlashlistCardRow : CarouselCardRow;
