import {ListType} from '../types';
import {FlashList, FlashListProps} from '@amazon-devices/shopify__flash-list';
import {Carousel, CarouselProps} from '@amazon-devices/vega-carousel';
import {FlashlistGrid} from '../components/Flashlist/FlashlistGrid';
import {CarouselGrid} from '../components/Carousel/CarouselGrid';
import {FlashlistCardRow} from '../components/Flashlist/FlashlistCardRow';
import {CarouselCardRow} from '../components/Carousel/CarouselCardRow';
export const currentList: ListType = 'Carousel';

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
