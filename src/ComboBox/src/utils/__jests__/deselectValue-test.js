import deselectValue from '../deselectValue';

describe('deselectValue', () => {
  it('deselects single value', () => {
    expect(deselectValue({ id: 20, value: 20 })).toBe(null);
  });
  it('nows how to handle null value', () => {
    expect(deselectValue({ id: 20, value: null })).toBe(null);
  });
  it('removes id from multiple value', () => {
    expect(deselectValue({ id: 20, value: [20, 30] })).toEqual([30]);
  });
  it('returns null when multiple results to an empty array', () => {
    expect(deselectValue({ id: 20, value: [20] })).toBe(null);
  });
});