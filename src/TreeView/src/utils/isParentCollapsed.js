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

/**
 * Tests whether one if it's ancestor is collapsed
 * @param {Object} parent
 * @return {Booleon} collapsed
 */
function isParentCollapsed(parent) {
  if (!parent) {
    return false;
  }

  parent = parent;
  let collapsed = false;

  while (parent) {
    if (parent.collapsed) {
      collapsed = true;
      break;
    }
    parent = parent.parent;
  }

  return collapsed;
}

export default isParentCollapsed;
