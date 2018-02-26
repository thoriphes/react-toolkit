import React, { Component } from 'react';

import TextInput from '../../src';
import '../../style/index.scss';

import TextArea from '../../../TextArea';
import '../../../TextArea/style/index.scss';

import NumericInput from '../../../NumericInput';
import '../../../NumericInput/style/index.scss';

import MaskedInput from '../../../MaskedInput';
import '../../../MaskedInput/style/index.scss';

import DateInput from '../../../Calendar/DateInput';
import '../../../Calendar/style/index.scss';

import ComboBox from '../../../ComboBox';
import '../../../ComboBox/style/index.scss';
import countries from '../../../ComboBox/examples/default/countries';

class EditorsExample extends Component {
  constructor(props) {
    super(props);

    this.state = {
      textInputValue: 'Text',
      textAreaValue: 'Content',
      numericInputValue: '2345',
      maskedInputValue: '345',
      dateInputValue: '12-12-2017',
      comboValue: 'Albania'
    };
  }
  render() {
    return (
      <div style={{ margin: 30 }}>
        <table>
          <tbody>
            <tr>
              <td>TextInput:</td>
              <td>
                <TextInput
                  style={{ width: 230 }}
                  value={this.state.textInputValue}
                  onChange={textInputValue => this.setState({ textInputValue })}
                />
              </td>
            </tr>
            <tr>
              <td>TextArea:</td>
              <td>
                <TextArea
                  style={{ height: 200, width: 230 }}
                  value={this.state.textAreaValue}
                  onChange={textAreaValue => this.setState({ textAreaValue })}
                />
              </td>
            </tr>
            <tr>
              <td>NumericInput:</td>
              <td>
                <NumericInput
                  style={{ width: 230 }}
                  value={this.state.numericInputValue}
                  onChange={numericInputValue =>
                    this.setState({ numericInputValue })
                  }
                />
              </td>
            </tr>
            <tr>
              <td>MaskedInput:</td>
              <td>
                <MaskedInput
                  style={{ width: 230 }}
                  mask="000-000-000"
                  value={this.state.maskedInputValue}
                  onChange={maskedInputValue =>
                    this.setState({ maskedInputValue })
                  }
                />
              </td>
            </tr>
            <tr>
              <td>DateInput:</td>
              <td>
                <DateInput
                  dateFormat="DD-MM-YYYY hh:mm:ss"
                  style={{ width: 230 }}
                  text={this.state.dateInputValue}
                  onTextChange={dateInputValue =>
                    this.setState({ dateInputValue })
                  }
                  showClock
                />
              </td>
            </tr>
            <tr>
              <td>ComboBox:</td>
              <td>
                <ComboBox
                  inlineFlex
                  dataSource={countries}
                  style={{ width: 230 }}
                  value={this.state.comboValue}
                  onChange={comboValue => this.setState({ comboValue })}
                />
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    );
  }
}

export default EditorsExample;
