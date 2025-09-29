import { CardData, CardType } from '../types';

/**
 * Type guard to validate if an unknown value is a valid CardData object.
 * 
 * This demonstrates the core patterns for TypeScript type guards:
 * - Runtime type checking for object properties
 * - Enum/union type validation
 * - Proper type predicate return type
 * 
 * @param data - The unknown value to validate
 * @returns True if data is a valid CardData object, false otherwise
 * 
 * @example
 * ```typescript
 * // In API response handling:
 * const apiResponse = await fetch('/api/cards');
 * const rawData = await apiResponse.json();
 * 
 * if (Array.isArray(rawData) && rawData.every(isCardData)) {
 *   // TypeScript now knows rawData is CardData[]
 *   setCards(rawData);
 * } else {
 *   console.error('Invalid card data received from API');
 * }
 * 
 * // In Redux reducers:
 * if (isCardData(action.payload.cardData)) {
 *   // Safe to use cardData properties
 *   state.cards.push(action.payload.cardData);
 * }
 * ```
 */
export const isCardData = (data: unknown): data is CardData => {
  // First check: ensure it's an object and not null
  if (typeof data !== 'object' || data === null) {
    return false;
  }

  // Cast to any for property access (we'll validate each property)
  const obj = data as any;

  // Validate required properties exist and have correct types
  if (typeof obj.dataIndex !== 'number') {
    return false;
  }

  if (typeof obj.imageUrl !== 'string') {
    return false;
  }

  if (typeof obj.index !== 'number') {
    return false;
  }

  if (typeof obj.rowIndex !== 'number') {
    return false;
  }

  // Validate cardType is one of the allowed enum values
  if (!isValidCardType(obj.cardType)) {
    return false;
  }

  // All validations passed
  return true;
};

/**
 * Helper function to validate CardType enum values.
 * This pattern can be reused for other union types in your app.
 * 
 * @param value - The value to check
 * @returns True if value is a valid CardType
 */
const isValidCardType = (value: unknown): value is CardType => {
  return typeof value === 'string' && 
         (value === 'HERO' || value === 'VERTICAL' || value === 'REGULAR');
};

/**
 * Utility function to validate an array of CardData objects.
 * Useful for validating API responses that return multiple cards.
 * 
 * @param data - The unknown value to validate as CardData array
 * @returns True if data is a valid CardData array
 * 
 * @example
 * ```typescript
 * const apiResponse = await fetchCards();
 * if (isCardDataArray(apiResponse)) {
 *   // TypeScript knows apiResponse is CardData[]
 *   dispatch(addCards(apiResponse));
 * }
 * ```
 */
export const isCardDataArray = (data: unknown): data is CardData[] => {
  return Array.isArray(data) && data.every(isCardData);
};

// Export the helper for potential reuse
export { isValidCardType };


