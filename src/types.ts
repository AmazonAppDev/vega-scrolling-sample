import React from 'react';

export interface ListConfig<PropType> {
  component: React.ComponentType<PropType>;
  otherProps: {[index: string]: Partial<PropType>};
  optimizationProps: {[index: string]: Partial<PropType>};
}

export const Orientation = {
  HORIZONTAL: 'horizontal',
  VERTICAL: 'vertical',
};

export const ImageResolutions = {
  '260': 260,
  '300': 300,
  '400': 400,
  '500': 500,
  '600': 600,
  '720': 720,
  '1080': 1080,
  '1440': 1440,
  '2160': 2160,
};

export type ResolutionUrls = Record<keyof typeof ImageResolutions, string>;

export interface ImageData {
  dataIndex: number;
  resolutions: ResolutionUrls;
}
export interface CardData extends ImageData {
  index: number;
  rowIndex: number;
  cardType: CardType;
}

export interface CardProps {
  cardType: CardType;
  data: CardData;
  onFocus?: (cardData: CardData) => void;
}

export interface PaginationState {
  isLoading: boolean;
  hasMore: boolean;
  error: string | null;
  lastRequestedPage: number;
}

export interface RowData {
  rowIndex: number;
  title: string;
  cardType: CardType;
  data: CardData[];
  height: number;
  offset: number;
  pagination: PaginationState;
}

export interface CardTitleProps {
  cardType: CardType;
  title: string;
}
export interface CardRowProps {
  rowIndex: number;
}

export type CardType = 'HERO' | 'VERTICAL' | 'REGULAR';
