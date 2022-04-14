import { expect } from 'chai';

import expressionParser from './expressionParser';

describe('nsight-common/utils/expressionParser', function() {
  it('Defines the sum function', function() {
    const result = expressionParser.evaluate('sum(arrayOfValues)', {
      arrayOfValues: [1, 2]
    });

    expect(result).to.equal(3);
  });
});
