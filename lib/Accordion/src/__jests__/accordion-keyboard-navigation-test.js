'use strict';

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _Accordion = require('../Accordion');

var _Accordion2 = _interopRequireDefault(_Accordion);

var _enzyme = require('enzyme');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

describe('Accordion Keyboard Navigation', function () {
  var component = void 0,
      instance = void 0;
  var accordion = _react2.default.createElement(
    _Accordion2.default,
    { activateOnFocus: true, 'data-test': 'self', transition: false },
    _react2.default.createElement(
      'div',
      { tabTitle: _react2.default.createElement(
          'div',
          { 'data-test': 'tab1' },
          'Tab 1'
        ) },
      'Tab 1'
    ),
    _react2.default.createElement(
      'div',
      { tabTitle: _react2.default.createElement(
          'div',
          { 'data-test': 'tab2' },
          'Tab 2'
        ) },
      'Tab 2'
    ),
    _react2.default.createElement(
      'div',
      { tabTitle: 'tab3' },
      'Tab 3'
    )
  );

  beforeEach(function () {
    component = (0, _enzyme.mount)(accordion);
    instance = component.instance();
  });

  describe('focusing', function () {
    it('should focus with focus event', function () {
      component.simulate('focus');
      var self = component.find('div[data-test="self"]');
      expect(self.hasClass(_Accordion.CLASS_NAME + '--focused')).toBe(true);
    });

    it('should focus on click on a tab', function () {
      var tab2 = component.find('[data-test="tab2"]');

      tab2.simulate('click');

      var self = component.find('div[data-test="self"]');

      expect(self.props().className).toContain(_Accordion.CLASS_NAME + '--focused');
    });

    it('should have tab index set and configurable', function () {
      var domProps = component.find('div[data-test="self"]').props();

      expect(domProps).toHaveProperty('tabIndex', 0);

      var USER_TAB_INDEX = 32;
      component.setProps({
        tabIndex: USER_TAB_INDEX
      });

      domProps = component.find('div[data-test="self"]').props();
      expect(domProps).toHaveProperty('tabIndex', USER_TAB_INDEX);
    });
  });

  describe('navigation', function () {
    it('should navigate via ArrowUp and ArrowDown', function () {
      var activeTabs = void 0;
      component.simulate('focus');
      component.simulate('keyDown', { key: 'ArrowDown' });
      component.simulate('keyDown', { key: ' ' });
      activeTabs = component.instance().getActiveTabs();
      expect(activeTabs).toEqual([1]);

      component.simulate('keyDown', { key: 'ArrowDown' });
      component.simulate('keyDown', { key: ' ' });
      activeTabs = component.instance().getActiveTabs();
      expect(activeTabs).toEqual([2]);

      component.simulate('keyDown', { key: 'ArrowUp' });
      component.simulate('keyDown', { key: 'ArrowUp' });
      component.simulate('keyDown', { key: ' ' });

      activeTabs = component.instance().getActiveTabs();
      expect(activeTabs).toEqual([0]);
    });

    it('should navigate via Home and End', function () {
      var activeTabs = void 0;
      var component = (0, _enzyme.mount)(_react2.default.createElement(
        _Accordion2.default,
        { activateOnFocus: true, 'data-test': 'self', transition: false },
        _react2.default.createElement(
          'div',
          { tabTitle: _react2.default.createElement(
              'div',
              { 'data-test': 'tab1' },
              'Tab 1'
            ) },
          'Tab 1'
        ),
        _react2.default.createElement(
          'div',
          { tabTitle: _react2.default.createElement(
              'div',
              { 'data-test': 'tab2' },
              'Tab 2'
            ) },
          'Tab 2'
        ),
        _react2.default.createElement(
          'div',
          { tabTitle: 'tab3' },
          'Tab 3'
        )
      ));
      component.simulate('focus');
      component.simulate('keyDown', { key: 'End' });
      component.simulate('keyDown', { key: 'Enter' });
      activeTabs = component.instance().getActiveTabs();
      expect(activeTabs).toEqual([2]);

      component.simulate('keyDown', { key: 'Home' });
      component.simulate('keyDown', { key: 'Enter' });
      activeTabs = component.instance().getActiveTabs();
      expect(activeTabs).toEqual([0]);
    });

    it('should expand via ArrowRight', function () {
      var activeTabs = void 0;
      component.simulate('focus');
      component.simulate('keyDown', { key: 'ArrowDown' });
      component.simulate('keyDown', { key: 'ArrowRight' });
      activeTabs = component.instance().getActiveTabs();
      expect(activeTabs).toEqual([1]);

      component.simulate('keyDown', { key: 'ArrowDown' });
      component.simulate('keyDown', { key: 'ArrowRight' });
      activeTabs = component.instance().getActiveTabs();
      expect(activeTabs).toEqual([2]);
    });

    it('should collapse via ArrowLeft', function () {
      var activeTabs = void 0;
      component.setProps({
        collapsible: true
      });
      component.simulate('focus');
      component.simulate('keyDown', { key: 'ArrowLeft' });
      activeTabs = component.instance().getActiveTabs();
      expect(activeTabs).toEqual([]);
      component.simulate('keyDown', { key: 'ArrowRight' });
      activeTabs = component.instance().getActiveTabs();
      expect(activeTabs).toEqual([0]);
    });

    it('should toggle via " " (space)', function () {
      var component = (0, _enzyme.mount)(_react2.default.createElement(
        _Accordion2.default,
        {
          collapsible: true,
          activateOnFocus: true,
          'data-test': 'self',
          transition: false
        },
        _react2.default.createElement(
          'div',
          { tabTitle: _react2.default.createElement(
              'div',
              { 'data-test': 'tab1' },
              'Tab 1'
            ) },
          'Tab 1'
        ),
        _react2.default.createElement(
          'div',
          { tabTitle: _react2.default.createElement(
              'div',
              { 'data-test': 'tab2' },
              'Tab 2'
            ) },
          'Tab 2'
        ),
        _react2.default.createElement(
          'div',
          { tabTitle: 'tab3' },
          'Tab 3'
        )
      ));
      var activeTabs = void 0;
      component.simulate('focus');
      component.simulate('keyDown', { key: 'Enter' });
      activeTabs = component.instance().getActiveTabs();
      expect(activeTabs).toEqual([]);
      component.simulate('keyDown', { key: 'Enter' });
      activeTabs = component.instance().getActiveTabs();
      expect(activeTabs).toEqual([0]);
    });

    it('should support horizontal navigation', function () {
      var component = (0, _enzyme.mount)(_react2.default.createElement(
        _Accordion2.default,
        {
          horizontal: true,
          activateOnFocus: true,
          'data-test': 'self',
          transition: false
        },
        _react2.default.createElement(
          'div',
          { tabTitle: _react2.default.createElement(
              'div',
              { 'data-test': 'tab1' },
              'Tab 1'
            ) },
          'Tab 1'
        ),
        _react2.default.createElement(
          'div',
          { tabTitle: _react2.default.createElement(
              'div',
              { 'data-test': 'tab2' },
              'Tab 2'
            ) },
          'Tab 2'
        ),
        _react2.default.createElement(
          'div',
          { tabTitle: 'tab3' },
          'Tab 3'
        )
      ));

      component.simulate('focus');
      component.simulate('keyDown', { key: 'ArrowRight' });
      component.simulate('keyDown', { key: ' ' });
      var activeTabs = component.instance().getActiveTabs();
      expect(activeTabs).toEqual([1]);
    });

    it('should ignore keyDown when not focused', function () {
      var component = (0, _enzyme.mount)(_react2.default.createElement(
        _Accordion2.default,
        { activateOnFocus: true, 'data-test': 'self', transition: false },
        _react2.default.createElement(
          'div',
          { tabTitle: _react2.default.createElement(
              'div',
              { 'data-test': 'tab1' },
              'Tab 1'
            ) },
          'Tab 1'
        ),
        _react2.default.createElement(
          'div',
          { tabTitle: _react2.default.createElement(
              'div',
              { 'data-test': 'tab2' },
              'Tab 2'
            ) },
          'Tab 2'
        ),
        _react2.default.createElement(
          'div',
          { tabTitle: 'tab3' },
          'Tab 3'
        )
      ));
      component.simulate('keyDown', { key: 'ArrowDown' });
      component.simulate('keyDown', { key: ' ' });
      var activeTabs = component.instance().getActiveTabs();
      expect(activeTabs).toEqual([0]);
    });
  });

  describe('handling onFocus, onBlur and onKeyDown outside', function () {
    it('should allow setting custom handlers while keeping navigation functionality, and expand tab on arrowdown with activateOnFocus=true', function () {
      var onFocusSpy = jest.fn(),
          onBlurSpy = jest.fn(),
          onKeyDownSpy = jest.fn(),
          component = (0, _enzyme.mount)(_react2.default.createElement(
        _Accordion2.default,
        {
          'data-test': 'self',
          onFocus: onFocusSpy,
          onBlur: onBlurSpy,
          onKeyDown: onKeyDownSpy,
          transition: false,
          activateOnFocus: true
        },
        _react2.default.createElement(
          'div',
          { tabTitle: _react2.default.createElement(
              'div',
              { 'data-test': 'tab1' },
              'Tab 1'
            ) },
          'Tab 1'
        ),
        _react2.default.createElement(
          'div',
          { tabTitle: _react2.default.createElement(
              'div',
              { 'data-test': 'tab2' },
              'Tab 2'
            ) },
          'Tab 2'
        ),
        _react2.default.createElement(
          'div',
          { tabTitle: 'tab3' },
          'Tab 3'
        )
      ));

      component.simulate('focus');
      component.simulate('keyDown');
      component.simulate('blur');

      expect(onFocusSpy).toHaveBeenCalledTimes(1);
      expect(onBlurSpy).toHaveBeenCalledTimes(1);
      expect(onKeyDownSpy).toHaveBeenCalledTimes(1);

      component.simulate('focus', {});
      component.simulate('keyDown', { key: 'ArrowDown' });
      component.simulate('keyDown', { key: ' ' });

      expect(onFocusSpy).toHaveBeenCalledTimes(2);
      expect(onKeyDownSpy).toHaveBeenCalledTimes(3);

      var activeTabs = component.instance().getActiveTabs();
      expect(activeTabs).toEqual([1]);
    });
  });
});