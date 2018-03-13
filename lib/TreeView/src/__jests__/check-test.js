'use strict';

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _TreeView = require('../TreeView');

var _TreeView2 = _interopRequireDefault(_TreeView);

var _Node = require('../Node');

var _Node2 = _interopRequireDefault(_Node);

var _enzyme = require('enzyme');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var CLASS_NAME = _TreeView2.default.defaultProps.rootClassName;

var NESTED_DATA_STRUCTURE = [{
  label: 'test 1'
}, {
  label: 'test 2',
  nodes: [{
    label: 'test 3'
  }, {
    label: 'test 4'
  }, {
    label: 'test 5'
  }]
}];

describe('checked props', function () {
  describe('defaultChecked', function () {
    it('should be used as initial state for checked', function () {
      var defaultChecked = { '0': true };
      var wrapper = (0, _enzyme.shallow)(_react2.default.createElement(_TreeView2.default, {
        dataSource: NESTED_DATA_STRUCTURE,
        defaultChecked: defaultChecked
      }));

      expect(wrapper.state().checked).toEqual(defaultChecked);
    });
  });

  describe('checked', function () {
    it('should use correct checked state', function () {
      var checked = { '2': true };
      var wrapper = (0, _enzyme.shallow)(_react2.default.createElement(_TreeView2.default, {
        dataSource: NESTED_DATA_STRUCTURE,
        checked: checked,
        defaultChecked: { '1': true }
      }));

      expect(wrapper.instance().getCurrentCheckedState()).toEqual(checked);
    });

    xit('should not update this.state.checked', function () {
      var checked = { '1/1': true };
      var wrapper = (0, _enzyme.mount)(_react2.default.createElement(_TreeView2.default, { dataSource: NESTED_DATA_STRUCTURE, checked: checked }));

      wrapper.instance().checkNode('1/2');

      expect(wrapper.state().checked).toEqual({});
    });
  });

  describe('enableChecked', function () {
    it('enableChecked is passed to nodes', function () {
      var wrapper = (0, _enzyme.mount)(_react2.default.createElement(_TreeView2.default, { enableChecked: false, dataSource: NESTED_DATA_STRUCTURE }));
      expect(wrapper.find(_Node2.default).first().props().enableChecked).toBe(false);
    });
  });

  describe('checkOnSelect', function () {
    it('when a node is selected it should trigger also a check', function () {
      var onCheckedChange = jest.fn();
      var wrapper = (0, _enzyme.mount)(_react2.default.createElement(_TreeView2.default, {
        enableChecked: true,
        checkOnSelect: true,
        onCheckedChange: onCheckedChange,
        dataSource: NESTED_DATA_STRUCTURE
      }));

      wrapper.instance().selectNode('0');
      expect(onCheckedChange).toHaveBeenCalled();
      expect(wrapper.state().checked[0]).toBe(true);
      expect(onCheckedChange.mock.calls[0][0].checkedMap).toEqual({
        '0': true
      });
    });
  });

  describe('getUpdatedDataSource', function () {
    it('should update correctly dataSource', function () {
      var newDataSource = void 0;
      var onCheckedChange = function onCheckedChange(_ref) {
        var getUpdatedDataSource = _ref.getUpdatedDataSource;

        newDataSource = getUpdatedDataSource(function (_ref2) {
          var node = _ref2.node,
              nodeProps = _ref2.nodeProps,
              selected = _ref2.selected;

          node.customPropertyInjecter = true;
        });
      };
      var wrapper = (0, _enzyme.mount)(_react2.default.createElement(_TreeView2.default, {
        enableChecked: true,
        dataSource: NESTED_DATA_STRUCTURE,
        onCheckedChange: onCheckedChange
      }));

      wrapper.instance().checkNode('0');

      expect(wrapper.state().data).not.toEqual(newDataSource);
      expect(newDataSource[0].customPropertyInjecter).toBe(true);
    });
  });

  describe('isNodeChecked', function () {
    it('should be called with correct props', function () {
      var isNodeChecked = jest.fn();
      var wrapper = (0, _enzyme.mount)(_react2.default.createElement(_TreeView2.default, {
        enableChecked: true,
        checked: { 0: false },
        isNodeChecked: isNodeChecked,
        dataSource: NESTED_DATA_STRUCTURE
      }));

      var args = isNodeChecked.mock.calls[0][0];

      expect(isNodeChecked).toHaveBeenCalled();
      expect(args.index).toEqual(0);
    });

    it('should overwrite controlled or uncontrolled checked', function () {
      var isNodeChecked = function isNodeChecked() {
        return true;
      };
      var wrapper = (0, _enzyme.mount)(_react2.default.createElement(_TreeView2.default, {
        enableChecked: true,
        isNodeChecked: isNodeChecked,
        dataSource: NESTED_DATA_STRUCTURE
      }));

      expect(wrapper.find(_Node2.default).first().props().checked).toBe(true);
    });

    it('should take into account isNodeChecked state when selected changes', function () {
      var isNodeChecked = function isNodeChecked() {
        return true;
      };
      var onCheckedChange = jest.fn();

      var wrapper = (0, _enzyme.mount)(_react2.default.createElement(_TreeView2.default, {
        enableChecked: true,
        isNodeChecked: isNodeChecked,
        dataSource: NESTED_DATA_STRUCTURE,
        onCheckedChange: onCheckedChange
      }));

      wrapper.instance().checkNode('0');
      expect(onCheckedChange.mock.calls[0][0].checkedMap).toEqual({
        '0': true,
        '1': true,
        '1/0': true,
        '1/1': true,
        '1/2': true
      });
    });
  });
});