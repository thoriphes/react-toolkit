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
import { findDOMNode } from 'react-dom';
import getSubMenu from './getSubMenu';
import Menu from '../Menu';
import MenuItem from '../MenuItem';
import MenuSeparator from '../MenuSeparator';
import { mount, shallow } from 'enzyme';

import { render, simulateMouseEvent } from '../../../common/testUtils';

const ROOT_CLASS_NAME = Menu.defaultProps.rootClassName;

describe('items', () => {
  describe('menuProps', () => {
    it('should be supported on item object', done => {
      const items = [
        {
          country: 'USA',
          menuProps: {
            columns: ['city'],
            padding: 50
          },
          items: [{ city: 'NY' }]
        }
      ];

      // NOTE: could not get submenu reference with enzyme, so fallback to pure React/DOM rendering
      const wrapper = render(<Menu items={items} columns={['country']} />);
      const dom = findDOMNode(wrapper);

      const cells = dom.querySelectorAll('td');

      simulateMouseEvent('mouseover', cells[0]);

      setTimeout(
        () => {
          const subMenu = dom.querySelector(`.${ROOT_CLASS_NAME}`);
          expect(subMenu.textContent).to.equal('NY');
          expect(subMenu.style.padding).to.equal('50px');
          wrapper.unmount();
          done();
        },
        150
      );
    });
  });
  describe('children length', () => {
    it('correct number of items', () => {
      const items = [
        { label: 'test' },
        { label: 'test2' },
        { label: 'test3' },
        { label: 'test4' },
        { label: 'test5' },
        { label: 'test6' },
        { label: 'test7' }
      ];

      const wrapper = shallow(<Menu items={items} />);
      expect(wrapper.find('tbody').children()).to.have.length(items.length);
    });

    it('correct number of items with separator', () => {
      const items = [
        { label: 'test' },
        { label: 'test2' },
        { label: 'test3' },
        '-',
        { label: 'test4' },
        { label: 'test5' },
        { label: 'test6' },
        '-',
        { label: 'test7' }
      ];

      const wrapper = shallow(<Menu items={items} />);
      expect(wrapper.find('tbody').children()).to.have.length(items.length);
    });
  });

  describe('separator', () => {
    it('1 should be rendered', () => {
      const items = ['-'];
      const wrapper = shallow(<Menu items={items} />);
      expect(wrapper.find(MenuSeparator)).to.have.length(1);
    });
    it('separator should be rendered between items', () => {
      const items = [{ label: 'test1' }, '-', { label: 'test1' }, '-'];
      const wrapper = shallow(<Menu items={items} />);
      expect(wrapper.find(MenuSeparator)).to.have.length(2);
    });
  });
});
