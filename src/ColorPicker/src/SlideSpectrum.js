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

import React, { Component } from 'react';
import PropTypes from 'prop-types';
import cleanProps from '../../common/cleanProps';
import join from '../../common/join';
import Slider from '../../Slider';
import { toColorValue } from './utils/color';
import toStringValue from './utils/toStringValue';

class ZippyAlphaSpectrum extends Component {
  constructor(props) {
    super(props);

    this.state = {
      value: props.defaultValue
    };

    this.handleOnDrag = this.handleOnDrag.bind(this);
    this.renderHandleContent = this.renderHandleContent.bind(this);
    this.handleOnChange = this.handleOnChange.bind(this);
  }

  render() {
    const { props } = this;
    const { type } = props;

    const isAlpha = this.isAlpha();
    const style = isAlpha ? this.getAlphaStyle() : this.getHueStyle();

    if (props.width) {
      style.width = props.width;
    }

    if (props.height) {
      style.height = props.height;
    }

    const className = join(
      props.className,
      props.rootClassName,
      `${props.rootClassName}--${type}`,
      `${props.rootClassName}__slider`
    );

    const value = isAlpha ? this.getAlphaValue() : this.getHueValue();

    let startEndValue;
    if (isAlpha) {
      startEndValue = {
        startValue: 1000,
        endValue: 0,
        step: 1
      };
    } else {
      startEndValue = {
        startValue: 0,
        endValue: 360,
        step: 1
      };
    }

    return (
      <Slider
        {...cleanProps(props, ZippyAlphaSpectrum.propTypes)}
        {...startEndValue}
        className={className}
        updateValueOnTrackDrag
        style={style}
        handleSize={{ height: 3 }}
        tooltipVisibility="never"
        tickBarPosition="none"
        orientation="vertical"
        // rootClassName={props.rootClassName}
        value={value}
        onChange={this.handleOnDrag}
        onDragEnd={this.handleOnChange}
        renderHandleContent={this.renderHandleContent}
      />
    );
  }

  renderHandleContent(domProps) {
    return (
      <div
        {...domProps}
        style={{
          ...domProps.style,
          left: 0,
          right: 0,
          width: '100%'
        }}
        children={null}
        className={`${this.props.rootClassName}__handle`}
      />
    );
  }

  isAlpha() {
    return this.props.type === 'alpha';
  }

  getAlphaStyle() {
    const { props } = this;
    const colorString = toStringValue({ ...this.getValue(), a: 1 });
    return {
      ...props.style,
      background: `linear-gradient(to top, #fff, ${colorString})`
    };
  }

  getHueStyle() {
    const { props } = this;

    return {
      ...props.style
    };
  }

  handleOnDrag(value) {
    const newColor = this.isAlpha()
      ? this.changeColorAlpha(value)
      : this.changeColorHue(value);

    this.setValue(newColor);
  }

  setValue(value) {
    if (!this.isValueControlled()) {
      this.setState({ value });
    }

    const stringValue = toStringValue(value);
    this.props.onDrag(stringValue, value);
  }

  handleOnChange() {
    const value = this.getValue();
    const stringValue = toStringValue(value);

    this.props.onChange(stringValue, value);
  }

  isValueControlled() {
    return this.props.value != null;
  }

  getValue() {
    const value = this.isValueControlled()
      ? this.props.value
      : this.state.value;
    const hslValue = toColorValue(value);

    return hslValue;
  }

  changeColorAlpha(value) {
    const newA =
      typeof value === 'number' ? parseFloat((value / 1000).toFixed(2)) : null;

    return {
      ...this.getValue(),
      a: newA
    };
  }

  changeColorHue(value) {
    if (value == null) {
      return null;
    }

    value = value > 360 ? 360 : value;

    return {
      ...this.getValue(),
      h: value
    };
  }

  getAlphaValue() {
    const value = this.getValue();
    return value && value.a * 1000;
  }

  getHueValue() {
    const value = this.getValue();
    return value && value.h;
  }
}

function emptyFn() {}

ZippyAlphaSpectrum.defaultProps = {
  value: null,
  defaultValue: 1,
  onChange: emptyFn,
  onDrag: emptyFn,
  rootClassName: 'zippy-react-toolkit-color-picker__slider'
};

ZippyAlphaSpectrum.propTypes = {
  value: PropTypes.oneOfType([PropTypes.number, PropTypes.object]),
  defaultValue: PropTypes.number,
  rootClassName: PropTypes.string,
  onChange: PropTypes.func,
  onDrag: PropTypes.func,
  width: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  height: PropTypes.oneOfType([PropTypes.string, PropTypes.number])
};

export default ZippyAlphaSpectrum;
