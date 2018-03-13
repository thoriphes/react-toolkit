'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _Menu = require('../Menu');

var _Menu2 = _interopRequireDefault(_Menu);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * Give an wrapper instance from enzyme.mount
 * it will return it's submenu
 */
exports.default = function (wrapper) {
  var subMenu = wrapper.find(_Menu2.default).reduce(function (acc, menu) {
    if (menu.props().subMenu) {
      acc = menu;
    }

    return acc;
  }, null);

  return subMenu;
};