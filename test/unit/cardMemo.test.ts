import {checkIfDataSame} from '../../src/components/Card';
import {CARD_VARIATIONS} from '../../src/components/CardVariations';
import {CARD_CONFIG} from '../../src/config/layout/cardConfig';
import {CardProps, CardType} from '../../src/types';

// Same '300' URL, different URL at the resolution the card renders.
const props = (cardType: CardType, url: string) =>
  ({
    cardType,
    data: {
      index: 0,
      rowIndex: 0,
      resolutions: {
        '300': 'file:///default.png',
        [CARD_CONFIG[cardType].CARD.RESOLUTION]: url,
      },
    },
  } as unknown as CardProps);

// React.memo keeps its comparator on .compare; the typings omit it.
const memoCompare = (cardType: CardType) =>
  (
    CARD_VARIATIONS[cardType] as unknown as {
      compare: (a: CardProps, b: CardProps) => boolean;
    }
  ).compare;

describe('Card memo comparators', () => {
  it.each(['HERO', 'REGULAR', 'VERTICAL'] as CardType[])(
    'detect a change of the rendered %s image',
    (cardType) => {
      const a = props(cardType, 'file:///a.png');
      const b = props(cardType, 'file:///b.png');
      expect(checkIfDataSame(a, b)).toBe(false);
      expect(memoCompare(cardType)(a, b)).toBe(false);
      expect(checkIfDataSame(a, props(cardType, 'file:///a.png'))).toBe(true);
      expect(memoCompare(cardType)(a, props(cardType, 'file:///a.png'))).toBe(
        true,
      );
      const moved = {...a, data: {...a.data, index: 1}} as CardProps;
      expect(checkIfDataSame(a, moved)).toBe(false);
      expect(memoCompare(cardType)(a, moved)).toBe(false);
    },
  );
});
