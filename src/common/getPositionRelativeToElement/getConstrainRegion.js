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

import Region from '@zippytech/region-align';
import selectParent from '../selectParent';

import getViewportRegion from '../getViewportRegion';

export default function(constrainTo, domNode) {
  let constrainRegion;

  if (constrainTo === true) {
    constrainRegion = getViewportRegion();
  }

  if (!constrainRegion && typeof constrainTo === 'function') {
    constrainTo = Region.from(constrainTo(domNode));
  }

  if (!constrainRegion && typeof constrainTo === 'string') {
    constrainTo = selectParent(constrainTo, domNode);
  }

  if (!constrainRegion && constrainTo) {
    constrainRegion = Region.from(constrainTo);
  }

  return constrainRegion;
}
