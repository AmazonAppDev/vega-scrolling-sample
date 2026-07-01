import {
  CardType,
  ImageData,
  ImageResolutions,
  ResolutionUrls,
  RowData,
} from '../types';
import {HORIZONTAL_IMAGE_COUNT} from './HorizontalPosters';
import {VERTICAL_IMAGE_COUNT} from './VerticalPosters';
import {ROW_CONFIG} from '../config';

// Posters are bundled local assets. Only these resolution folders exist on disk
// under assets/image/posters/<orientation>/<res>/<n>.png, so every requested
// ResolutionUrls key maps to the nearest available local folder.
const LOCAL_RESOLUTION_DIRS = [240, 320, 480, 720];
const nearestLocalDir = (res: string): number => {
  const target = Number(res);
  return LOCAL_RESOLUTION_DIRS.reduce((best, dir) =>
    Math.abs(dir - target) < Math.abs(best - target) ? dir : best,
  );
};

// Builds a ResolutionUrls map of on-device bundle paths for one local poster.
const localResolutions = (
  orientation: 'horizontal' | 'vertical',
  n: number,
): ResolutionUrls => {
  const map: {[index: string]: string} = {};
  for (const resolution in ImageResolutions) {
    map[
      resolution
    ] = `file:///pkg/bundle/assets/assets/image/posters/${orientation}/${nearestLocalDir(
      resolution,
    )}/${n}.png`;
  }
  return map as ResolutionUrls;
};

// Static genre labels used to title the rows (replaces a faker dependency).
const ROW_GENRES = [
  'Action',
  'Adventure',
  'Comedy',
  'Drama',
  'Fantasy',
  'Horror',
  'Mystery',
  'Romance',
  'Sci-Fi',
  'Thriller',
];

export const IMAGES: {[index: string]: ImageData[]} = {
  horizontal: Array.from({length: HORIZONTAL_IMAGE_COUNT}, (_unused, i) => ({
    dataIndex: i,
    // Poster files are named 1..COUNT on disk.
    resolutions: localResolutions('horizontal', i + 1),
  })),
  vertical: Array.from({length: VERTICAL_IMAGE_COUNT}, (_unused, i) => ({
    dataIndex: i,
    resolutions: localResolutions('vertical', i + 1),
  })),
};

// Specifies the pattern for the card rows
export const ROW_ORDER: CardType[] = [
  'HERO',
  'VERTICAL',
  'REGULAR',
  'REGULAR',
  'REGULAR',
  'REGULAR',
  'REGULAR',
  'VERTICAL',
  'REGULAR',
  'REGULAR',
  'REGULAR',
  'REGULAR',
  'REGULAR',
];

const generateRowData = () => {
  const ROW_DATA: RowData[] = [];
  let hIndex = 0; // tracks how many horizontal images have been used
  let vIndex = 0; // tracks how many vertical images have been used
  let rowIndex = 0;
  let currentOffset = 0; // calculates offset of row from top. Useful for Flatlist getItemLayout prop
  while (hIndex < IMAGES.horizontal.length && vIndex < IMAGES.vertical.length) {
    let cardType: CardType = ROW_ORDER[rowIndex % ROW_ORDER.length];
    let dataSource: ImageData[];
    let dataStartIndex: number;
    let dataEndIndex: number;
    const title = `${
      ROW_GENRES[rowIndex % ROW_GENRES.length]
    } - Row ${rowIndex}`;

    if (cardType === 'VERTICAL') {
      dataStartIndex = vIndex;
      dataEndIndex = vIndex + ROW_CONFIG[cardType].ITEM_COUNT;
      dataSource = IMAGES.vertical;
      vIndex = dataEndIndex;
    } else {
      dataStartIndex = hIndex;
      dataEndIndex = hIndex + ROW_CONFIG[cardType].ITEM_COUNT;
      dataSource = IMAGES.horizontal;
      hIndex = dataEndIndex;
    }

    let rowData: RowData = {
      rowIndex,
      title,
      cardType,
      data: dataSource
        .slice(dataStartIndex, dataEndIndex)
        .map((imageData, index) => ({...imageData, index, rowIndex, cardType})),
      height: ROW_CONFIG[cardType].HEIGHT,
      offset: currentOffset,
      pagination: {
        isLoading: false,
        hasMore: true,
        error: null,
        lastRequestedIndex: 0,
      },
    };
    currentOffset += ROW_CONFIG[cardType].HEIGHT;

    ROW_DATA.push(rowData);

    rowIndex++;
  }
  return ROW_DATA;
};

export const ROW_DATA = generateRowData();
