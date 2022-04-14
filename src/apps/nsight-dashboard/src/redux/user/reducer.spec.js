import { expect } from 'chai';

import { fixtures } from '@ndustrial/nsight-test-utils';

import userReducer, { INITIAL_STATE } from './reducer';

describe('nsight-dashboard/redux/user/reducer', function() {
  it('returns the initial state', function() {
    expect(userReducer(undefined, {})).to.equal(INITIAL_STATE);
  });

  describe('LOAD_USER_INFO_SUCCESS', function() {
    let expectedProfile;
    let expectedTheme;
    let nextState;

    beforeEach(function() {
      expectedProfile = fixtures.build('userProfile');
      expectedTheme = fixtures.build('theme');

      nextState = userReducer(INITIAL_STATE, {
        type: 'LOAD_USER_INFO_SUCCESS',
        payload: {
          profile: expectedProfile,
          theme: expectedTheme
        }
      });
    });

    it("stores the user's profile", function() {
      expect(nextState.profile).to.equal(expectedProfile);
    });

    it('stores the users theme', function() {
      expect(nextState.theme).to.deep.equal(expectedTheme);
    });
  });
});
