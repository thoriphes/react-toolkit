import changeChildrenCheckProperty from '../changeChildrenCheckProperty';

describe('changeChildrenCheckProperty', () => {
  it('changeChildrenCheckProperty should work', () => {
    const test = {
      path: '0',
      children: [
        {
          path: '0/0'
        },
        {
          path: '0/1',
          children: [{}, {}],
          disabled: true
        }
      ]
    };
    expect(changeChildrenCheckProperty(test, true)).toEqual({
      0: true
    });
  });
});