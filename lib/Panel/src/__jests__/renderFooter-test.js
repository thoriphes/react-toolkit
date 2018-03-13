'use strict';

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _Panel = require('../Panel');

var _Panel2 = _interopRequireDefault(_Panel);

var _enzyme = require('enzyme');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var rootClassName = _Panel2.default.defaultProps.rootClassName;
var bodyClassName = '.' + rootClassName + '__body';

describe('renderFooter', function () {
  var wrapper = void 0;
  beforeEach(function () {
    wrapper = (0, _enzyme.shallow)(_react2.default.createElement(_Panel2.default, null));
  });

  it('should be called with props', function () {
    var renderFooter = jest.fn(function () {
      return _react2.default.createElement('div', { id: 'footer' });
    });
    var wrapper = (0, _enzyme.mount)(_react2.default.createElement(_Panel2.default, { renderFooter: renderFooter }));

    expect(renderFooter).toHaveBeenCalledTimes(1);
    expect(wrapper.find('#footer')).toHaveLength(1);
  });

  it('should render what it returns', function () {
    var renderFooter = function renderFooter() {
      return _react2.default.createElement('div', { id: 'customFooterId' });
    };
    wrapper.setProps({ renderFooter: renderFooter });

    expect(wrapper.find('#customFooterId')).toHaveLength(1);
  });

  it('should be rendered after body', function () {
    var renderFooter = function renderFooter() {
      return _react2.default.createElement('div', { id: 'customFooterId' });
    };
    wrapper.setProps({ renderFooter: renderFooter });

    /**
     * 0 - title
     * 1 - body
     * 2 - footer
     */

    expect(wrapper.childAt(2).props().id).toEqual('customFooterId');
  });
});