'use strict';

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _Menu = require('../Menu');

var _Menu2 = _interopRequireDefault(_Menu);

var _MenuItem = require('../MenuItem');

var _MenuItem2 = _interopRequireDefault(_MenuItem);

var _enzyme = require('enzyme');

var _getSubMenu = require('../utils/getSubMenu');

var _getSubMenu2 = _interopRequireDefault(_getSubMenu);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var ROOT_CLASS = _Menu2.default.defaultProps.rootClassName;

describe('disabled', function () {
  it('should not call onClick', function () {
    var items = [{ label: 'test', disabled: true }];
    var onClick = jest.fn();
    var wrapper = (0, _enzyme.mount)(_react2.default.createElement(_Menu2.default, { onClick: onClick, items: items }));

    wrapper.find(_MenuItem2.default).first().simulate('click');
    expect(onClick).toHaveBeenCalledTimes(0);
  });

  xit('should not call onChildClick', function () {
    var subMenu = void 0;
    var items = [{
      label: 'test',
      items: [{
        label: 'submenu item',
        disabled: true
      }]
    }];
    var onChildClick = sinon.spy();
    var wrapper = (0, _enzyme.mount)(_react2.default.createElement(_Menu2.default, { onChildClick: onChildClick, items: items }));

    // open submenu
    wrapper.find(_MenuItem2.default).first().simulate('mouseEnter');
    subMenu = (0, _getSubMenu2.default)(wrapper);
    expect(subMenu).to.exist;

    subMenu.find(_MenuItem2.default).first().simulate('click');

    expect(onChildClick.called).toBe(false);
  });

  it('should not trigger onClick when Enter key is pressed on focused item', function () {
    var subMenu = void 0;
    var onClick = jest.fn();
    var items = [{
      label: 'test',
      disabled: true,
      items: [{
        label: 'submenu item',
        disabled: true
      }]
    }];
    var wrapper = (0, _enzyme.mount)(_react2.default.createElement(_Menu2.default, { onClick: onClick, enableKeyboardNavigation: true, items: items }));

    wrapper.find(_MenuItem2.default).first().simulate('keyPress', { key: 'Enter' });
    expect(onClick).toHaveBeenCalledTimes(0);
  });

  xit('should apply disabled style if provided', function () {
    var disabledStyle = {
      background: 'red',
      fontSize: 40
    };
    var items = [{
      disabled: true,
      disabledStyle: disabledStyle
    }];
    var wrapper = (0, _enzyme.mount)(_react2.default.createElement(_Menu2.default, { items: items }));
    var appliedStyle = wrapper.find(_MenuItem2.default).first().find('tr').props().style;
    expect(appliedStyle.background).to.equal('red');
    expect(appliedStyle.fontSize).to.equal(40);
  });

  xit('should apply disabled style with higher precedence if provided', function () {
    var itemDisabledStyle = {
      background: 'orange'
    };

    var disabledStyle = {
      background: 'red'
    };

    var items = [{
      disabled: true,
      disabledStyle: disabledStyle,
      itemDisabledStyle: itemDisabledStyle
    }];

    var wrapper = (0, _enzyme.mount)(_react2.default.createElement(_Menu2.default, { items: items }));
    var appliedStyle = wrapper.find(_MenuItem2.default).first().find('tr').props().style;

    expect(appliedStyle.background).to.equal('red');
  });

  it('adds --disabled className', function () {
    var wrapper = (0, _enzyme.mount)(_react2.default.createElement(_Menu2.default, { items: [{ label: 'test', disabled: true }] }));
    var test = wrapper.find(_MenuItem2.default).find('tr').hasClass(ROOT_CLASS + '__row--disabled');
    expect(test).toBe(true);
  });
});