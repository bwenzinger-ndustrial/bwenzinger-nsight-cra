import { expect } from 'chai';
import faker from 'faker';

import { fixtures } from '@ndustrial/nsight-test-utils';

import { INITIAL_STATE } from '../reducer';
import getApplicationGroupings from './getApplicationGroupings';

describe('nsight-dashboard/redux/applications/selectors/getApplicationGroupings', function() {
  let applicationState;
  let groupings;

  beforeEach(function() {
    applicationState = {
      applications: INITIAL_STATE
    };
    groupings = fixtures.buildList(
      'applicationGrouping',
      faker.random.number({ min: 1, max: 10 })
    );
  });

  it('returns an empty array if the aplications reducer is undefined', function() {
    const actual = getApplicationGroupings({});
    const expected = [];
    expect(actual).to.deep.equal(expected);
  });

  it('returns the list of groupings from the applications reducer', function() {
    applicationState = {
      applications: {
        ...INITIAL_STATE,
        groupings
      }
    };
    const actual = getApplicationGroupings(applicationState);
    const expected = groupings;
    expect(actual).to.deep.equal(expected);
  });
});
