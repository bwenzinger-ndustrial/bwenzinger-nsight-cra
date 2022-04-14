import { expect } from 'chai';
import faker from 'faker';

import createCompletionStatusSelector from './createCompletionStatusSelector';

describe('nsight-common/selectors/createCompletionStatusSelector', function() {
  let actions;
  let selector;

  beforeEach(function() {
    actions = [faker.random.word(), faker.hacker.noun()];
    selector = createCompletionStatusSelector('test', actions);
  });

  it('creates a function', function() {
    expect(selector).to.be.a('function');
  });

  it('returns true when all actions have completed', function() {
    const state = {
      testRequestState: actions.reduce(
        (memo, action) => {
          memo.hasCompleted[action] = true;

          return memo;
        },
        { hasCompleted: {} }
      )
    };

    expect(selector(state)).to.be.true();
  });

  it('returns false when only one action has completed', function() {
    const stillLoadingRequest = faker.random.arrayElement(actions);
    const state = {
      testRequestState: actions.reduce(
        (memo, action) => {
          memo.hasCompleted[action] = action === stillLoadingRequest;

          return memo;
        },
        { hasCompleted: {} }
      )
    };

    expect(selector(state)).to.be.false();
  });

  it('returns false when no actions have completed', function() {
    const state = {
      testRequestState: actions.reduce(
        (memo, action) => {
          memo.hasCompleted[action] = false;

          return memo;
        },
        { hasCompleted: {} }
      )
    };

    expect(selector(state)).to.be.false();
  });
});
