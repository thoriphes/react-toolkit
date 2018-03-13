'use strict';

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _Accordion = require('../Accordion');

var _Accordion2 = _interopRequireDefault(_Accordion);

var _enzyme = require('enzyme');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

describe('Accordion tab title style props', function () {
  var component = void 0,
      instance = void 0,
      CUSTOM_CLASS_NAME = 'CUSTOM_CLASS_NAME',
      CUSTOM_CLASS_NAME_2 = 'CUSTOM_CLASS_NAME_2',
      tabTitleComponents = void 0,
      tabTitleStyle = { padding: 20 },
      extraStyleProps = { fontSize: 13 };

  beforeEach(function () {
    component = (0, _enzyme.mount)(_react2.default.createElement(
      _Accordion2.default,
      {
        transition: false,
        tabTitleStyle: tabTitleStyle,
        tabTitleAlign: 'start',
        tabTitleVerticalAlign: 'top',
        tabTitleEllipsis: false
      },
      _react2.default.createElement(
        'div',
        { locked: true, 'data-test': 'tab-content-1', tabTitle: 'Tab 1' },
        'Tab 1'
      ),
      _react2.default.createElement(
        'div',
        { disabled: true, 'data-test': 'tab-content-2', tabTitle: 'Tab 2' },
        'Tab 2'
      ),
      _react2.default.createElement(
        'div',
        {
          tabProps: {
            titleStyle: extraStyleProps,
            className: CUSTOM_CLASS_NAME_2,
            titleAlign: 'end',
            titleVerticalAlign: 'bottom',
            titleEllipsis: true
          },
          'data-test': 'tab-content-3',
          tabTitle: 'Tab 3'
        },
        'Tab 3'
      )
    ));

    instance = component.instance();
    tabTitleComponents = component.find('ZippyAccordionTabTitle');
  });

  describe('tabTitleStyle', function () {
    it('should apply tabTitleStyle to all tab titles', function () {
      expect(tabTitleComponents.at(0).prop('tabTitleStyle')).toEqual(tabTitleStyle);
      expect(tabTitleComponents.at(1).prop('tabTitleStyle')).toEqual(tabTitleStyle);
      expect(tabTitleComponents.at(2).prop('tabTitleStyle')).toEqual(_extends({}, tabTitleStyle, extraStyleProps));
    });
  });

  describe('tabTitleAlign', function () {
    it('should apply tabTitleAlign to all tabs', function () {
      expect(tabTitleComponents.at(0).prop('tabTitleAlign')).toEqual('start');
      expect(tabTitleComponents.at(1).prop('tabTitleAlign')).toEqual('start');
      expect(tabTitleComponents.at(2).prop('tabTitleAlign')).toEqual('end');
    });

    it('should map non standard values to start and end', function () {
      var component = (0, _enzyme.mount)(_react2.default.createElement(
        _Accordion2.default,
        {
          transition: false,
          tabTitleStyle: tabTitleStyle,
          tabTitleAlign: 'start',
          tabTitleVerticalAlign: 'top',
          tabTitleEllipsis: false
        },
        _react2.default.createElement(
          'div',
          { locked: true, 'data-test': 'tab-content-1', tabTitle: 'Tab 1' },
          'Tab 1'
        ),
        _react2.default.createElement(
          'div',
          { disabled: true, 'data-test': 'tab-content-2', tabTitle: 'Tab 2' },
          'Tab 2'
        ),
        _react2.default.createElement(
          'div',
          {
            tabProps: {
              titleStyle: extraStyleProps,
              className: CUSTOM_CLASS_NAME_2,
              titleAlign: 'end',
              titleVerticalAlign: 'bottom',
              titleEllipsis: true
            },
            'data-test': 'tab-content-3',
            tabTitle: 'Tab 3'
          },
          'Tab 3'
        )
      ));

      var tabTitleComponents = component.find('ZippyAccordionTabTitle');
      expect(tabTitleComponents.find('.zippy-react-toolkit-accordion__tab-title--align-start')).toHaveLength(2);
      expect(tabTitleComponents.find('.zippy-react-toolkit-accordion__tab-title--align-end')).toHaveLength(1);

      component.setProps({
        tabTitleAlign: 'right'
      });

      tabTitleComponents = component.find('ZippyAccordionTabTitle');

      expect(tabTitleComponents.find('.zippy-react-toolkit-accordion__tab-title--align-start')).toHaveLength(0);

      expect(tabTitleComponents.find('.zippy-react-toolkit-accordion__tab-title--align-end')).toHaveLength(3);
      return;
    });
  });

  describe('tabTitleVerticalAlign', function () {
    it('should apply tabTitleVerticalAlign to all tabs', function () {
      expect(tabTitleComponents.at(0).prop('tabTitleVerticalAlign')).toEqual('top');
      expect(tabTitleComponents.at(1).prop('tabTitleVerticalAlign')).toEqual('top');
      expect(tabTitleComponents.at(2).prop('tabTitleVerticalAlign')).toEqual('bottom');
    });
  });

  describe('tabTitleEllipsis', function () {
    it('should apply tabTitleEllipsis to all tabs', function () {
      expect(tabTitleComponents.at(0).prop('tabTitleEllipsis')).toEqual(false);
      expect(tabTitleComponents.at(1).prop('tabTitleEllipsis')).toEqual(false);
      expect(tabTitleComponents.at(2).prop('tabTitleEllipsis')).toEqual(true);
    });
  });

  describe('renderTabTitle', function () {
    it('should set renderTabTitle to AccordionTabTitle', function () {
      var renderTabTitleSpy = jest.fn(function (domProps) {
        return _react2.default.createElement('div', domProps);
      });
      var component = (0, _enzyme.mount)(_react2.default.createElement(
        _Accordion2.default,
        {
          transition: false,
          tabTitleStyle: tabTitleStyle,
          tabTitleAlign: 'start',
          tabTitleVerticalAlign: 'top',
          tabTitleEllipsis: false,
          renderTabTitle: renderTabTitleSpy
        },
        _react2.default.createElement(
          'div',
          { locked: true, 'data-test': 'tab-content-1', tabTitle: 'Tab 1' },
          'Tab 1'
        ),
        _react2.default.createElement(
          'div',
          { disabled: true, 'data-test': 'tab-content-2', tabTitle: 'Tab 2' },
          'Tab 2'
        ),
        _react2.default.createElement(
          'div',
          {
            tabProps: {
              titleStyle: extraStyleProps,
              className: CUSTOM_CLASS_NAME_2,
              titleAlign: 'end',
              titleVerticalAlign: 'bottom',
              titleEllipsis: true
            },
            'data-test': 'tab-content-3',
            tabTitle: 'Tab 3'
          },
          'Tab 3'
        )
      ));
      var tabTitleComponents = component.find('ZippyAccordionTabTitle');
      expect(tabTitleComponents.at(0).prop('renderTabTitle')).toEqual(renderTabTitleSpy);
      expect(tabTitleComponents.at(1).prop('renderTabTitle')).toEqual(renderTabTitleSpy);
      expect(tabTitleComponents.at(2).prop('renderTabTitle')).toEqual(renderTabTitleSpy);

      var callArguments = renderTabTitleSpy.mock.calls[0][1];
      ['expanded', 'index', 'activeIndex', 'disabled', 'multiExpand', 'collapsible', 'focused', 'transition'].forEach(function (key) {
        expect(callArguments).toHaveProperty(key);
      });
    });
  });

  describe('tabTitleRotate', function () {
    it('should support tabTitleRotate in horizontal mode', function () {
      component.setProps({
        horizontal: true,
        tabTitleRotate: -90
      });

      expect(tabTitleComponents.at(0).prop('tabTitleRotate')).toEqual(-90);
      expect(tabTitleComponents.at(1).prop('tabTitleRotate')).toEqual(-90);
      expect(tabTitleComponents.at(2).prop('tabTitleRotate')).toEqual(-90);
    });
  });
});