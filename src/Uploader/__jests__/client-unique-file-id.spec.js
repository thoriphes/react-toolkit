/**
 * Copyright (c) 2015-present, Zippy Technologies
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

import clientUniqueFileId from '../src/utils/client-unique-file-id';

describe('client file id', () => {
  it('should generate the same file id for the same file twice', () => {
    const GIVEN_FILE = {
      name: 'some name'
    };
    expect(clientUniqueFileId(GIVEN_FILE)).toEqual(
      clientUniqueFileId(GIVEN_FILE)
    );
  });

  it('should generate file based on size', () => {
    const GIVEN_FILE = {
      name: 'some name',
      size: 1234
    };
    expect(clientUniqueFileId(GIVEN_FILE)).toContain('1234');
  });
});
