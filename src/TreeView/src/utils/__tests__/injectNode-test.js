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

import injectNode from '../injectNode';

describe('injectNode', () => {
  it('should inject node at the correct place', () => {
    const nodeToInject = { label: 'injectedNode' };
    const data = [
      {
        label: 'test',
        nodes: [
          {
            label: 'test 1'
          }
        ]
      }
    ];

    const expected = [
      {
        label: 'test',
        nodes: [nodeToInject]
      }
    ];

    const test = injectNode(nodeToInject, [0, 0], data);

    expect(test).to.deep.equal(expected);
  });
});
