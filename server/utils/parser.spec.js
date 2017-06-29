import { parsePrice } from './parser';

describe('parsePrice', () => {
  it('strip off the currency symbol correctly', () => {
    expect(parsePrice('£998')).toBe(998);
  });

  it('strip off comma in price text correctly', () => {
    expect(parsePrice('£1,998')).toBe(1998);
  });
});
