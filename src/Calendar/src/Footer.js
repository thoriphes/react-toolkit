/**
 * Copyright 2015-present Zippy Technologies
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *   http://www.apache.org/licenses/LICENSE-2.0
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

import React from 'react';
import PropTypes from 'prop-types';
import Component from '@zippytech/react-class';

import { Flex, Item } from '../../Flex';
import InlineBlock from './InlineBlock';
import Button from '../../Button';

import assign from '../../common/assign';
import join from '../../common/join';

import joinFunctions from './joinFunctions';

const numbers = [1];
const SPACER = numbers.map((item, index) => {
  return <Item key={`footer_spacer_${index * 37}`} />;
});

const preventDefault = e => e.preventDefault();

export const FooterButton = props => {
  const disabledClassName = props.disabled
    ? `${props.rootClassName}-button--disabled`
    : '';
  const cancelButtonClass =
    props.children === 'Cancel' ? `${props.rootClassName}-button-cancel` : '';
  const className = `${props.className || ''} ${cancelButtonClass} ${
    props.rootClassName
  }-button ${disabledClassName}`;
  const buttonProps = { ...props };
  delete buttonProps.rootClassName;
  return <Button tabIndex={-1} {...buttonProps} className={className} />;
};

export default class Footer extends Component {
  render() {
    const props = (this.p = assign({}, this.props));
    const { rootClassName } = props;
    const className = join(
      props.className,
      rootClassName,
      `${rootClassName}--theme-${props.theme}`,
      `${rootClassName}--button-cancel`
    );

    const todayButton = this.renderTodayButton();
    const clearButton = this.renderClearButton();

    const okButton = this.renderOkButton();
    const cancelButton = this.renderCancelButton();

    if (!todayButton && !clearButton && !okButton && !cancelButton) {
      return null;
    }

    const middleSpacer = okButton || cancelButton ? SPACER : null;

    const spacer = !props.centerButtons ? middleSpacer : null;

    let children = [
      props.centerButtons && SPACER,

      todayButton,
      clearButton,

      spacer,

      okButton,
      cancelButton,
      props.centerButtons && SPACER
    ];

    if (props.renderChildren) {
      children = props.renderChildren(children, props);
    }

    const flexProps = assign({}, props);

    delete flexProps.rootClassName;
    delete flexProps.actionEvent;
    delete flexProps.buttonFactory;
    delete flexProps.cancelButton;
    delete flexProps.cancelButtonText;
    delete flexProps.centerButtons;
    delete flexProps.clearDate;
    delete flexProps.cleanup;
    delete flexProps.clearButton;
    delete flexProps.clearButtonText;
    delete flexProps.isDatePickerFooter;
    delete flexProps.onCancelClick;
    delete flexProps.onClearClick;
    delete flexProps.onOkClick;
    delete flexProps.onTodayClick;
    delete flexProps.okButton;
    delete flexProps.okButtonText;
    delete flexProps.selectDate;
    delete flexProps.theme;
    delete flexProps.todayButton;
    delete flexProps.todayButtonText;

    if (typeof props.cleanup == 'function') {
      props.cleanup(flexProps);
    }

    return (
      <Flex
        key="footer"
        inline
        row
        {...flexProps}
        justifyContent="center"
        className={className}
        children={children}
      />
    );
  }

  renderTodayButton() {
    if (!this.props.todayButton) {
      return null;
    }
    return this.renderButton(
      this.props.todayButtonText,
      this.props.onTodayClick
    );
  }

  renderClearButton() {
    if (!this.props.clearButton) {
      return null;
    }

    return this.renderButton(
      {
        children: this.props.clearButtonText,
        disabled: this.props.clearDate === undefined
      },
      this.props.onClearClick
    );
  }

  renderOkButton() {
    if (!this.props.okButton) {
      return null;
    }
    return this.renderButton(this.props.okButtonText, this.props.onOkClick);
  }

  renderCancelButton(theme = 'light') {
    if (!this.props.cancelButton) {
      return null;
    }
    return this.renderButton(
      this.props.cancelButtonText,
      this.props.onCancelClick,
      theme
    );
  }

  renderButton(props, fn, theme) {
    let text = props.children;
    let p = props;

    if (typeof props == 'string') {
      p = {};
      text = props;
    }

    if (typeof fn == 'function' && !p.onClick && !p.disabled) {
      p.onClick = fn;
    }

    const Factory = this.props.buttonFactory;

    const onMouseDown = p.onMouseDown
      ? joinFunctions(p.onMouseDown, preventDefault)
      : preventDefault;

    return (
      <Factory
        key={`footer_${text}`}
        tabIndex={0}
        {...p}
        rootClassName={this.props.rootClassName}
        onMouseDown={onMouseDown}
        theme={theme}
      >
        {text}
      </Factory>
    );
  }
}

Footer.defaultProps = {
  rootClassName: 'zippy-react-toolkit-calendar__footer',
  actionEvent: 'onClick',
  theme: 'default',

  buttonFactory: FooterButton,

  todayButton: true,
  clearButton: false,
  okButton: true,
  cancelButton: true,

  todayButtonText: 'Today',
  clearButtonText: 'Clear',
  okButtonText: 'OK',
  cancelButtonText: 'Cancel',

  isDatePickerFooter: true
};

Footer.propTypes = {
  isDatePickerFooter: PropTypes.bool,
  rootClassName: PropTypes.string,
  theme: PropTypes.string,
  actionEvent: PropTypes.string,
  centerButtons: PropTypes.bool,
  buttonFactory: PropTypes.oneOfType([PropTypes.func, PropTypes.object]),

  clearDate: PropTypes.object,
  okButtonText: PropTypes.oneOfType([PropTypes.object, PropTypes.string]),
  clearButtonText: PropTypes.oneOfType([PropTypes.object, PropTypes.string]),
  cancelButtonText: PropTypes.oneOfType([PropTypes.object, PropTypes.string]),
  todayButtonText: PropTypes.oneOfType([PropTypes.object, PropTypes.string]),

  todayButton: PropTypes.bool,
  clearButton: PropTypes.bool,
  okButton: PropTypes.bool,
  cancelButton: PropTypes.bool,
  disabled: PropTypes.bool,

  onTodayClick: PropTypes.func,
  onClearClick: PropTypes.func,
  onOkClick: PropTypes.func,
  onCancelClick: PropTypes.func,

  renderChildren: PropTypes.func,
  cleanup: PropTypes.func
};
