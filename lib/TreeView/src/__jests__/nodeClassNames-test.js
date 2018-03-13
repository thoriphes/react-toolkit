'use strict';

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _enzyme = require('enzyme');

var _TreeView = require('../TreeView');

var _TreeView2 = _interopRequireDefault(_TreeView);

var _Node = require('../Node');

var _Node2 = _interopRequireDefault(_Node);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var CLASS_NAME = _TreeView2.default.defaultProps.rootClassName;

describe('node classNames', function () {
  describe('nodeClassName and node.className', function () {
    it('should compute correct classname using strings', function () {
      var nodeClassName = 'node className';
      var globalClassName = 'global className';
      var dataSource = [{
        label: 'hello world',
        className: nodeClassName
      }];
      var wrapper = (0, _enzyme.mount)(_react2.default.createElement(_TreeView2.default, { dataSource: dataSource, nodeClassName: globalClassName }));

      var test = wrapper.find(_Node2.default).first().props().domProps.className;
      expect(test).toEqual(globalClassName + ' ' + nodeClassName);
    });

    it('should compute correct classname using a function', function () {
      var nodeClassName = 'node className';
      var globalClassName = 'global className';
      var _dataSource = [{
        label: 'hello world',
        className: nodeClassName
      }];
      var wrapper = (0, _enzyme.mount)(_react2.default.createElement(_TreeView2.default, {
        dataSource: function dataSource() {
          return _dataSource;
        },
        nodeClassName: function nodeClassName() {
          return globalClassName;
        }
      }));

      var test = wrapper.find(_Node2.default).first().props().domProps.className;
      expect(test).toEqual(globalClassName + ' ' + nodeClassName);
    });

    it('should call className function with correct args', function () {
      var globalClassName = jest.fn();
      var nodeClassName = jest.fn();
      var dataSource = [{
        label: 'hello world',
        className: nodeClassName
      }];
      var wrapper = (0, _enzyme.mount)(_react2.default.createElement(_TreeView2.default, { dataSource: dataSource, nodeClassName: globalClassName }));

      expect(globalClassName).toHaveBeenCalled();
      expect(nodeClassName).toHaveBeenCalled();

      var _wrapper$find$first$p = wrapper.find(_Node2.default).first().props(),
          index = _wrapper$find$first$p.index,
          path = _wrapper$find$first$p.path;

      expect(globalClassName.mock.calls[0][0].path).toEqual(path);
      expect(globalClassName.mock.calls[0][0].index).toEqual(index);

      expect(nodeClassName.mock.calls[0][0].path).toEqual(path);
      expect(nodeClassName.mock.calls[0][0].index).toEqual(index);
    });
  });

  describe('labelClassName and node.labelClassName', function () {
    it('should compute correct classname using strings', function () {
      var nodeClassName = 'node className';
      var globalClassName = 'global className';
      var dataSource = [{
        label: 'hello world',
        labelClassName: nodeClassName
      }];
      var wrapper = (0, _enzyme.mount)(_react2.default.createElement(_TreeView2.default, { dataSource: dataSource, labelClassName: globalClassName }));

      var test = wrapper.find(_Node2.default).first().props().labelClassName;
      expect(test).toEqual(globalClassName + ' ' + nodeClassName);
    });

    it('shoud compute correct classname using a function', function () {
      var nodeClassName = 'node className';
      var globalClassName = 'global className';
      var _dataSource2 = [{
        label: 'hello world',
        labelClassName: nodeClassName
      }];
      var wrapper = (0, _enzyme.mount)(_react2.default.createElement(_TreeView2.default, {
        dataSource: function dataSource() {
          return _dataSource2;
        },
        labelClassName: function labelClassName() {
          return globalClassName;
        }
      }));

      var test = wrapper.find(_Node2.default).first().props().labelClassName;
      expect(test).toEqual(globalClassName + ' ' + nodeClassName);
    });

    it('should call className function with correct args', function () {
      var globalClassName = jest.fn();
      var nodeClassName = jest.fn();
      var dataSource = [{
        label: 'hello world',
        labelClassName: nodeClassName
      }];
      var wrapper = (0, _enzyme.mount)(_react2.default.createElement(_TreeView2.default, { dataSource: dataSource, labelClassName: globalClassName }));

      expect(globalClassName).toHaveBeenCalled();
      expect(nodeClassName).toHaveBeenCalled();

      var _wrapper$find$first$p2 = wrapper.find(_Node2.default).first().props(),
          index = _wrapper$find$first$p2.index,
          path = _wrapper$find$first$p2.path;

      expect(globalClassName.mock.calls[0][0].path).toEqual(path);
      expect(globalClassName.mock.calls[0][0].index).toEqual(index);

      expect(nodeClassName.mock.calls[0][0].path).toEqual(path);
      expect(nodeClassName.mock.calls[0][0].index).toEqual(index);
    });
  });

  describe('contentClassName and node.contentClassName', function () {
    it('should compute correct classname using strings', function () {
      var nodeClassName = 'node className';
      var globalClassName = 'global className';
      var dataSource = [{
        label: 'hello world',
        contentClassName: nodeClassName
      }];
      var wrapper = (0, _enzyme.mount)(_react2.default.createElement(_TreeView2.default, { dataSource: dataSource, contentClassName: globalClassName }));

      var test = wrapper.find(_Node2.default).first().props().contentClassName;
      expect(test).toEqual(globalClassName + ' ' + nodeClassName);
    });

    it('shoud compute correct classname using a function', function () {
      var nodeClassName = 'node className';
      var globalClassName = 'global className';
      var _dataSource3 = [{
        label: 'hello world',
        contentClassName: nodeClassName
      }];
      var wrapper = (0, _enzyme.mount)(_react2.default.createElement(_TreeView2.default, {
        dataSource: function dataSource() {
          return _dataSource3;
        },
        contentClassName: function contentClassName() {
          return globalClassName;
        }
      }));

      var test = wrapper.find(_Node2.default).first().props().contentClassName;
      expect(test).toEqual(globalClassName + ' ' + nodeClassName);
    });

    it('should call className function with correct args', function () {
      var globalClassName = jest.fn();
      var nodeClassName = jest.fn();
      var dataSource = [{
        label: 'hello world',
        contentClassName: nodeClassName
      }];
      var wrapper = (0, _enzyme.mount)(_react2.default.createElement(_TreeView2.default, { dataSource: dataSource, contentClassName: globalClassName }));

      expect(globalClassName).toHaveBeenCalled();
      expect(nodeClassName).toHaveBeenCalled();

      var _wrapper$find$first$p3 = wrapper.find(_Node2.default).first().props(),
          index = _wrapper$find$first$p3.index,
          path = _wrapper$find$first$p3.path;

      expect(globalClassName.mock.calls[0][0].path).toEqual(path);
      expect(globalClassName.mock.calls[0][0].index).toEqual(index);

      expect(nodeClassName.mock.calls[0][0].path).toEqual(path);
      expect(nodeClassName.mock.calls[0][0].index).toEqual(index);
    });
  });
});