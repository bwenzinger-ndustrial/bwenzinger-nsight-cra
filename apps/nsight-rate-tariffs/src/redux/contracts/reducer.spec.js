import { expect } from 'chai';
import faker from 'faker';
import _ from 'lodash';

import { fixtures } from '@ndustrial/nsight-test-utils';

import contractsReducer, { INITIAL_STATE } from './reducer';

describe('nsight-rate-tariffs/redux/contracts/reducer', function() {
  it('returns the initial state', function() {
    expect(contractsReducer(undefined, {})).to.equal(INITIAL_STATE);
  });

  describe('LOAD_CONTRACT_FILE_FAILURE', function() {
    let nextState;

    beforeEach(function() {
      nextState = contractsReducer(INITIAL_STATE, {
        type: 'LOAD_CONTRACT_FILE_FAILURE',
        hasLoadingError: true
      });
    });

    it('changes the boolean when their is an error', function() {
      expect(nextState.hasLoadingError).to.equal(true);
    });
  });

  describe('LOAD_CONTRACT_FILE_SUCCESS', function() {
    let contract;
    let nextState;
    let fileFixture;

    beforeEach(function() {
      contract = fixtures.build('contract');
      fileFixture = fixtures.build('file', null, { fileId: contract.fileId });

      nextState = contractsReducer(INITIAL_STATE, {
        type: 'LOAD_CONTRACT_FILE_SUCCESS',
        payload: fileFixture.downloadInfo.inlineUrl,
        meta: {
          contractId: contract.id
        }
      });
    });

    it('stores the file url', function() {
      expect(nextState.items[contract.id].fileUrl).to.equal(
        fileFixture.downloadInfo.inlineUrl
      );
    });
  });

  describe('LOAD_RATE_SCHEDULE_START', function() {
    let nextState;

    beforeEach(function() {
      nextState = contractsReducer(
        { ...INITIAL_STATE },
        { type: 'LOAD_RATE_SCHEDULE_START' }
      );
    });

    it('clears the utility contract', function() {
      expect(nextState).to.equal(INITIAL_STATE);
    });
  });

  describe('LOAD_RATE_SCHEDULES_START', function() {
    let nextState;

    beforeEach(function() {
      nextState = contractsReducer(
        { ...INITIAL_STATE },
        { type: 'LOAD_RATE_SCHEDULES_START' }
      );
    });

    it('clears the utility contract', function() {
      expect(nextState).to.equal(INITIAL_STATE);
    });
  });

  describe('LOAD_RATE_SCHEDULES_SUCCESS', function() {
    let expectedContracts;
    let nextState;

    beforeEach(function() {
      expectedContracts = fixtures.buildList(
        'contract',
        faker.random.number({ min: 1, max: 3 })
      );

      nextState = contractsReducer(INITIAL_STATE, {
        type: 'LOAD_RATE_SCHEDULES_SUCCESS',
        payload: {
          contracts: expectedContracts
        }
      });
    });

    it('stores the utility contracts', function() {
      expect(nextState.items).to.deep.equal(_.keyBy(expectedContracts, 'id'));
    });
  });

  describe('LOAD_UTILITY_CONTRACT_START', function() {
    let nextState;

    beforeEach(function() {
      nextState = contractsReducer(
        { ...INITIAL_STATE },
        { type: 'LOAD_UTILITY_CONTRACT_START' }
      );
    });

    it('clears the utility contract', function() {
      expect(nextState).to.equal(INITIAL_STATE);
    });
  });

  describe('LOAD_UTILITY_CONTRACT_SUCCESS', function() {
    let expectedContract;
    let nextState;

    beforeEach(function() {
      expectedContract = fixtures.build('contract');

      nextState = contractsReducer(INITIAL_STATE, {
        type: 'LOAD_UTILITY_CONTRACT_SUCCESS',
        payload: expectedContract
      });
    });

    it('stores the utility contract', function() {
      expect(nextState).to.deep.equal({
        ...INITIAL_STATE,
        items: {
          [expectedContract.id]: {
            ...expectedContract
          }
        }
      });
    });
  });
});
