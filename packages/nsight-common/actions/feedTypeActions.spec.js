import { expect } from 'chai';
import faker from 'faker';
import sinon from 'sinon';

import { fixtures } from '@ndustrial/nsight-test-utils';

import { contxtSdk } from '../utils';
import * as actions from './feedTypeActions';
import actionTypes from './feedTypeActionTypes';

describe('nsight-common/actions/feedTypeActions', function() {
  describe('getFeedTypes', function() {
    let dispatch;
    let expectedItems;
    let getAll;

    beforeEach(function() {
      dispatch = sinon.stub();
      expectedItems = fixtures.buildList('feedType', 5);
      getAll = sinon.stub(contxtSdk.iot.feedTypes, 'getAll');
    });

    afterEach(function() {
      sinon.restore();
    });

    it(`dispatches a ${actionTypes.FEED_TYPES_GET_START} action`, function() {
      getAll.resolves(expectedItems);

      return actions
        .getFeedTypes()(dispatch)
        .then(() => {
          expect(dispatch).to.be.calledWith({
            type: actionTypes.FEED_TYPES_GET_START
          });
        });
    });

    it(`dispatches a ${actionTypes.FEED_TYPES_GET_SUCCESS} action`, function() {
      getAll.resolves(expectedItems);

      return actions
        .getFeedTypes()(dispatch)
        .then(() => {
          expect(dispatch).to.be.calledWith({
            type: actionTypes.FEED_TYPES_GET_SUCCESS,
            payload: expectedItems
          });
        });
    });

    it(`dispatches a ${actionTypes.FEED_TYPES_GET_FAILURE} action`, function() {
      const expectedErrorMessage = faker.hacker.phrase();

      getAll.rejects(new Error(expectedErrorMessage));

      return actions
        .getFeedTypes()(dispatch)
        .then(() => {
          expect(dispatch).to.be.calledWith({
            type: actionTypes.FEED_TYPES_GET_FAILURE,
            error: true,
            payload: expectedErrorMessage
          });
        });
    });
  });
});
