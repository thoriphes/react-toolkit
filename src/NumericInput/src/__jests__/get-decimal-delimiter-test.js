import getDecimalDelimiter from '../utils/get-decimal-delimiter';

describe('getDecimalDelimiter utils function', () => {
  it('should get decimal character when no locale used', () => {
    const delimiter = getDecimalDelimiter();
    expect(!!delimiter).toBe(true);
  });

  it('should get decimal character "." for en-GB locale', () => {
    const delimiter = getDecimalDelimiter('en-GB');
    expect(delimiter).toBe('.');
  });

  it('should get decimal character "," for ro-RO locale', () => {
    const delimiter = getDecimalDelimiter('ro-RO');
    expect(delimiter).toBe(',');
  });
});