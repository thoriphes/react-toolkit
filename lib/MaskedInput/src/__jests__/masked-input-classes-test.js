'use strict';

var _MaskedInput = require('../../src/MaskedInput');

describe('getClassNames', function () {
  it('should return string containing main class name', function () {
    expect((0, _MaskedInput.getClassNames)({ rootClassName: 'zippy-react-toolkit-masked-input' })).toContain(_MaskedInput.CLASS_NAME);
  });

  it('should return focused modifier when focused state', function () {
    expect((0, _MaskedInput.getClassNames)({}, { focused: true })).toContain('--focused');
  });

  it('should return disabled modifier when disabled state', function () {
    expect((0, _MaskedInput.getClassNames)({ disabled: true }, {})).toContain('--disabled');
  });

  it('should return readOnly modifier when readOnly state', function () {
    expect((0, _MaskedInput.getClassNames)({}, { readOnly: true })).toContain('--readOnly');
  });

  it('should return empty modifier when empty value', function () {
    expect((0, _MaskedInput.getClassNames)({
      currentValue: ''
    })).toContain('--empty');
  });

  it('should return unmasked modifier when no mask value', function () {
    expect((0, _MaskedInput.getClassNames)({
      currentValue: '',
      mask: false
    })).toContain('--unmasked');
  });

  it('should return masked modifier when mask value exists', function () {
    expect((0, _MaskedInput.getClassNames)({
      currentValue: '',
      mask: 'something'
    })).toContain('--masked');
  });
});