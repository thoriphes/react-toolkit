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
import TreeView from '../TreeView';
import Node from '../Node';
import { mount, shallow } from 'enzyme';

const NESTED_DATA_STRUCTURE = [
  {
    label: 'test 1'
  },
  {
    label: 'test 2',
    nodes: [
      {
        label: 'test 3'
      },
      {
        label: 'test 4'
      },
      {
        label: 'test 5'
      }
    ]
  }
];

describe('selection props', () => {
  describe('enableSelection', () => {
    it('should default to false', () => {
      const wrapper = mount(<TreeView dataSource={NESTED_DATA_STRUCTURE} />);
      expect(wrapper.props().enableSelection).to.be.false;
    });

    it('nodes should not be selected when if false and there is a selection', () => {
      const wrapper = mount(
        <TreeView selected={{ 0: true }} dataSource={NESTED_DATA_STRUCTURE} />
      );

      expect(wrapper.find(Node).first().props().selected).to.be.falsey;
    });
  });

  describe('selection change by click', () => {
    it('should update selected state correct', () => {
      const wrapper = mount(
        <TreeView enableSelection dataSource={NESTED_DATA_STRUCTURE} />
      );
      wrapper.find(Node).get(0).onLabelClick({ stopPropagation: () => {} });
      wrapper.find(Node).get(1).onLabelClick({ stopPropagation: () => {} });
      expect(wrapper.state().selected).to.deep.equal({
        '0': true,
        '1': true
      });
    });
  });

  describe('defaultSelected', () => {
    it('should be used as initial state for selected', () => {
      const wrapper = shallow(
        <TreeView
          defaultSelected={{ '0': true }}
          dataSource={NESTED_DATA_STRUCTURE}
        />
      );
      expect(wrapper.state().selected['0']).to.be.true;
    });
  });

  describe('selected', () => {
    it('should not update this.state.selected', () => {
      const wrapper = mount(
        <TreeView selected={{ '0': true }} dataSource={NESTED_DATA_STRUCTURE} />
      );
      const initialState = wrapper.state().selected;
      wrapper.find(Node).get(1).onLabelClick({ stopPropagation: () => {} });
      expect(wrapper.state().selected).to.be.deep.equal(initialState);
    });

    it('should use correct selected state', () => {
      const selected = { '2': true };
      const wrapper = shallow(
        <TreeView
          dataSource={NESTED_DATA_STRUCTURE}
          selected={selected}
          defaultSelected={{ '1': true }}
        />
      );

      expect(wrapper.instance().getCurrentSelectedState()).to.deep.equal(
        selected
      );
    });
  });

  describe('singleSelect', () => {
    it('should update state correctly', () => {
      const wrapper = mount(
        <TreeView
          singleSelect
          enableSelection
          defaultSelected={{ '0': true }}
          dataSource={NESTED_DATA_STRUCTURE}
        />
      );

      wrapper.find(Node).get(1).onLabelClick({ stopPropagation: () => {} });
      expect(wrapper.state().selected).to.deep.equal({
        '1': true
      });
    });
  });

  describe('onSelectionChange', () => {
    it('should not call onSelectionChange when enableSelection is false', () => {
      const onSelectionChange = sinon.spy();
      const wrapper = mount(
        <TreeView
          dataSource={NESTED_DATA_STRUCTURE}
          onSelectionChange={onSelectionChange}
        />
      );

      wrapper.find(Node).get(0).onLabelClick({ stopPropagation: () => {} });

      expect(onSelectionChange.called).to.be.false;
    });

    it('should call onSelectionChange when is enabled', () => {
      const onSelectionChange = sinon.spy();
      const wrapper = mount(
        <TreeView
          enableSelection
          dataSource={NESTED_DATA_STRUCTURE}
          onSelectionChange={onSelectionChange}
        />
      );

      wrapper.find(Node).get(0).onLabelClick({ stopPropagation: () => {} });
      expect(onSelectionChange.called).to.be.true;
    });

    it('should call onSelectionChange with correct new selected', () => {
      const onSelectionChange = sinon.spy();
      const wrapper = mount(
        <TreeView
          enableSelection
          dataSource={NESTED_DATA_STRUCTURE}
          onSelectionChange={onSelectionChange}
        />
      );
      wrapper.setProps({ enableSelection: true, onSelectionChange });
      wrapper.find(Node).get(0).onLabelClick({ stopPropagation: () => {} });
      wrapper.find(Node).get(1).onLabelClick({ stopPropagation: () => {} });

      const test = onSelectionChange.args[1][0];

      expect(test.selected).to.be.true;
      expect(test.path).to.be.equal('1');
      expect(test.selectedMap).to.deep.equal({
        '0': true,
        '1': true
      });
    });

    describe('getUpdatedDataSource', () => {
      it('should update correctly dataSource', () => {
        let newDataSource;
        const onSelectionChange = ({ getUpdatedDataSource }) => {
          newDataSource = getUpdatedDataSource(({
            node,
            nodeProps,
            selected
          }) => {
            node.customPropertyInjecter = true;
          });
        };
        const wrapper = mount(
          <TreeView
            enableSelection
            dataSource={NESTED_DATA_STRUCTURE}
            onSelectionChange={onSelectionChange}
          />
        );

        wrapper.find(Node).get(0).onLabelClick({ stopPropagation: () => {} });

        expect(newDataSource).to.be.ok;
        expect(wrapper.state().data).to.not.equal(newDataSource);
        expect(newDataSource[0].customPropertyInjecter).to.be.true;
      });
    });
  });

  describe('isNodeSelected', () => {
    it('should be called with correct props', () => {
      const isNodeSelected = sinon.spy();
      const wrapper = mount(
        <TreeView
          enableSelection
          isNodeSelected={isNodeSelected}
          dataSource={NESTED_DATA_STRUCTURE}
        />
      );

      const args = isNodeSelected.args[0][0];

      expect(isNodeSelected.called).to.be.true;
      expect(args.index).to.be.equal(0);
    });

    it('should overwrite selection', () => {
      const isNodeSelected = () => false;

      const wrapper = mount(
        <TreeView
          enableSelection
          selected={{ 0: true }}
          isNodeSelected={isNodeSelected}
          dataSource={NESTED_DATA_STRUCTURE}
        />
      );

      const test = wrapper.find(Node).get(0).props.selected;
      expect(test).to.be.false;
    });

    it('should take into account isNodeSelected state when selected changes', () => {
      const isNodeSelected = () => false;
      const onSelectionChange = sinon.spy();

      const wrapper = mount(
        <TreeView
          enableSelection
          selected={{ 0: true }}
          isNodeSelected={isNodeSelected}
          dataSource={NESTED_DATA_STRUCTURE}
          onSelectionChange={onSelectionChange}
        />
      );

      wrapper.find(Node).get(0).onLabelClick({ stopPropagation: () => {} });
      expect(onSelectionChange.args[0][0].selectedMap).to.be.deep.equal({
        0: true
      });
    });
  });
});
