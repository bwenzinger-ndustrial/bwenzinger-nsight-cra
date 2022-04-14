import { renderHook } from '@testing-library/react-hooks';
import { expect } from 'chai';
import faker from 'faker';
import sinon from 'sinon';

import useInterval from './useInterval';

describe('nsight-common/hook/useInterval', function() {
  let clock;
  let expectedCalls;
  let expectedFunctionToCall;
  let interval;

  beforeEach(function() {
    clock = sinon.useFakeTimers();
    expectedCalls = faker.random.number({ min: 1, max: 5 });
    expectedFunctionToCall = sinon.stub();
    expectedFunctionToCall.x = true;
    interval = faker.random.number({ min: 50, max: 100 });

    renderHook(() =>
      useInterval(expectedFunctionToCall, interval * expectedCalls)
    );
  });

  afterEach(function() {
    clock.restore();
    sinon.restore();
  });

  it('calls the function on an interval', function() {
    for (let i = 1; i <= expectedCalls; i++) {
      clock.tick(interval);
      setTimeout(
        () => expect(expectedFunctionToCall.callCount).to.equal(i),
        500
      );
    }
  });
});
