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

import separateNotificationsByStacking
  from '../separateNotificationsByStacking';

describe('separateNotificationsByStacking', () => {
  it('filters out in to lists matched and unmatched notifications', () => {
    const input = [
      { id: 1, stacking: ['left', 'right'] },
      { id: 2, stacking: ['left', 'right'] },
      { id: 3, stacking: ['top', 'right'] },
      { id: 4, stacking: ['bottom', 'right'] }
    ];
    const expected = {
      filteredNotifications: [
        { id: 1, stacking: ['left', 'right'] },
        { id: 2, stacking: ['left', 'right'] }
      ],
      otherNotifications: [
        { id: 3, stacking: ['top', 'right'] },
        { id: 4, stacking: ['bottom', 'right'] }
      ]
    };

    expect(
      separateNotificationsByStacking({
        notifications: input,
        stacking: ['left', 'right']
      })
    ).to.deep.equal(expected);
  });

  it('must filter out closed notifications', () => {
    const input = [
      { id: 1, stacking: ['left', 'right'] },
      { id: 2, stacking: ['left', 'right'], closed: true },
      { id: 3, stacking: ['top', 'right'] },
      { id: 4, stacking: ['bottom', 'right'] }
    ];
    const expected = {
      filteredNotifications: [{ id: 1, stacking: ['left', 'right'] }],
      otherNotifications: [
        { id: 2, stacking: ['left', 'right'], closed: true },
        { id: 3, stacking: ['top', 'right'] },
        { id: 4, stacking: ['bottom', 'right'] }
      ]
    };

    expect(
      separateNotificationsByStacking({
        notifications: input,
        stacking: ['left', 'right']
      })
    ).to.deep.equal(expected);
  });
});
