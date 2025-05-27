const SYMBOLS =
  '0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ';

const BASE = SYMBOLS.length;

/**
 * Encodes a positive integer into a base-62 string.
 * @param value The number to encode (must be a non-negative integer).
 * @returns The base-62 encoded string.
 */
export const encodeBase62 = (value: number): string => {
  if (!Number.isInteger(value) || value < 0) {
    throw new Error('Input must be a non-negative integer.');
  }

  if (value === 0) return SYMBOLS[0];

  let result = '';

  while (value > 0) {
    const remainder = value % BASE;

    result = SYMBOLS[remainder] + result;
    value = Math.floor(value / BASE);
  }

  return result;
};
