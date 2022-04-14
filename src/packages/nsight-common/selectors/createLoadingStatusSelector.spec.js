import { expect } from 'chai';
import faker from 'faker';

import createLoadingStatusSelector from './createLoadingStatusSelector';

describe('nsight-common/selectors/createLoadingStatusSelector', function() {
  let actions;
  let selector;

  beforeEach(function() {
    actions = [faker.random.word(), faker.hacker.noun()];
    selector = createLoadingStatusSelector('test', actions);
  });

  it('creates a function', function() {
    expect(selector).to.be.a('function');
  });

  it('returns true when all actions are loading', function() {
    const state = {
      testRequestState: actions.reduce(
        (memo, action) => {
          memo.isLoading[action] = true;

          return memo;
        },
        { isLoading: {} }
      )
    };

    expect(selector(state)).to.be.true();
  });

  it('returns true when one action is loading', function() {
    const stillLoadingRequest = faker.random.arrayElement(actions);
    const state = {
      testRequestState: actions.reduce(
        (memo, action) => {
          memo.isLoading[action] = action === stillLoadingRequest;

          return memo;
        },
        { isLoading: {} }
      )
    };

    expect(selector(state)).to.be.true();
  });

  it('returns false when no actions are loading', function() {
    const state = {
      testRequestState: actions.reduce(
        (memo, action) => {
          memo.isLoading[action] = false;

          return memo;
        },
        { isLoading: {} }
      )
    };

    expect(selector(state)).to.be.false();
  });
});
