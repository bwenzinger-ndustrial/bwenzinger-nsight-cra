import { expect } from 'chai';
import faker from 'faker';
import sinon from 'sinon';

import { contxtSdk } from '@ndustrial/nsight-common/utils';
import { fixtures } from '@ndustrial/nsight-test-utils';

import EmsModule from '../../services/EmsModule';
import RatesModule from '../../services/RatesModule';
import * as contractsActions from './actions';

describe('nsight-rate-tariffs/redux/contracts/actions', function() {
  before(function() {
    contxtSdk.mountDynamicModule('ratesEms', {
      clientId: contxtSdk.config.audiences.ems.clientId,
      host: contxtSdk.config.audiences.ems.host,
      module: EmsModule
    });

    contxtSdk.mountDynamicModule('rates', {
      clientId: contxtSdk.config.audiences.ems.clientId,
      host: contxtSdk.config.audiences.ems.host,
      module: RatesModule
    });
  });

  afterEach(function() {
    sinon.restore();
  });

  after(function() {
    contxtSdk.unmountDynamicModule('rates');
    contxtSdk.unmountDynamicModule('ratesEms');
  });

  describe('getContractFile', function() {
    let dispatch;

    beforeEach(function() {
      dispatch = sinon.stub();
    });

    context('when successfully retrieving the file', function() {
      let expectedContract;
      let expectedFile;
      let promise;

      beforeEach(function() {
        expectedContract = fixtures.build('contract');
        expectedFile = fixtures.build('file', null, {
          id: expectedContract.fileId
        });

        sinon.stub(contxtSdk.files, 'download').resolves(expectedFile);

        promise = contractsActions.getContractFile(
          expectedFile.id,
          expectedContract.id
        )(dispatch);
      });

      it('dispatches a LOAD_CONTRACT_FILE_START action', function() {
        return promise.then(() => {
          expect(dispatch).to.be.calledWith({
            type: 'LOAD_CONTRACT_FILE_START',
            meta: {
              contractId: expectedContract.id
            }
          });
        });
      });

      it('gets the file from the API', function() {
        return promise.then(() => {
          expect(contxtSdk.files.download).to.be.calledWith(expectedFile.id);
        });
      });

      it('dispatches a LOAD_CONTRACT_FILE_SUCCESS action', function() {
        return promise.then(() => {
          expect(dispatch).to.be.calledWith({
            type: 'LOAD_CONTRACT_FILE_SUCCESS',
            payload: expectedFile.downloadInfo.inlineUrl,
            meta: {
              contractId: expectedContract.id
            }
          });
        });
      });

      it('returns a resolved promise', function() {
        return expect(promise).to.be.fulfilled();
      });
    });

    context('when there is a problem getting the file', function() {
      let expectedContract;
      let expectedError;
      let promise;

      beforeEach(function() {
        expectedContract = fixtures.build('contract');
        expectedError = new Error(faker.hacker.phrase());

        sinon.stub(contxtSdk.files, 'download').rejects(expectedError);

        promise = contractsActions.getContractFile(
          fixtures.build('file').id,
          expectedContract.id
        )(dispatch);
      });

      it('dispatches a LOAD_CONTRACT_FILE_FAILURE action', function() {
        return promise.then(expect.fail).catch(() => {
          expect(dispatch).to.be.calledWith({
            type: 'LOAD_CONTRACT_FILE_FAILURE',
            error: true,
            payload: expectedError,
            meta: {
              contractId: expectedContract.id
            }
          });
        });
      });

      it('returns a rejected promise', function() {
        return expect(promise).to.be.rejectedWith(expectedError);
      });
    });
  });

  describe('loadContractById', function() {
    let dispatch;

    beforeEach(function() {
      dispatch = sinon.stub();
    });

    context('when successfully retriving the utility contract', function() {
      let expectedContract;
      let expectedFacilityId;
      let promise;

      beforeEach(function() {
        expectedContract = fixtures.build('contract');
        expectedFacilityId = fixtures.build('facility').id;

        sinon
          .stub(contxtSdk.ratesEms, 'getContractById')
          .resolves(expectedContract);

        promise = contractsActions.loadContractById(
          expectedFacilityId,
          expectedContract.id
        )(dispatch);
      });

      it('dispatches a LOAD_UTILITY_CONTRACT_START action', function() {
        return promise.then(() => {
          expect(dispatch).to.be.calledWith({
            type: 'LOAD_UTILITY_CONTRACT_START'
          });
        });
      });

      it('gets the utility contract from the API', function() {
        return promise.then(() => {
          expect(contxtSdk.ratesEms.getContractById).to.be.calledWith(
            expectedFacilityId,
            expectedContract.id
          );
        });
      });

      it('dispatches a LOAD_UTILITY_CONTRACT_SUCCESS action', function() {
        return promise.then(() => {
          expect(dispatch).to.be.calledWith({
            type: 'LOAD_UTILITY_CONTRACT_SUCCESS',
            payload: expectedContract
          });
        });
      });

      it('returns a resolved promise', function() {
        return expect(promise).to.be.fulfilled();
      });
    });

    context('when there are missing arguments', function() {
      const expectedError =
        'Facility ID and Contract ID required to load a utility contract';

      context('FacilityId not supplied', function() {
        beforeEach(function() {
          contractsActions.loadContractById(
            null,
            fixtures.build('contract').id
          )(dispatch);
        });

        it('dispatches a LOAD_UTILITY_CONTRACT_FAILURE action', function() {
          expect(dispatch).to.be.calledWith({
            type: 'LOAD_UTILITY_CONTRACT_FAILURE',
            error: true,
            payload: expectedError
          });
        });
      });

      context('ContractId not supplied', function() {
        beforeEach(function() {
          contractsActions.loadContractById(
            fixtures.build('facility').id,
            null
          )(dispatch);
        });

        it('dispatches a LOAD_UTILITY_CONTRACT_FAILURE action', function() {
          expect(dispatch).to.be.calledWith({
            type: 'LOAD_UTILITY_CONTRACT_FAILURE',
            error: true,
            payload: expectedError
          });
        });
      });
    });

    context('when there is a problem getting the utility contract', function() {
      let expectedError;
      let promise;

      beforeEach(function() {
        expectedError = new Error(faker.hacker.phrase());

        sinon
          .stub(contxtSdk.ratesEms, 'getContractById')
          .rejects(expectedError);

        promise = contractsActions.loadContractById(
          fixtures.build('facility').id,
          fixtures.build('contract').id
        )(dispatch);
      });

      it('dispatches a LOAD_UTILITY_CONTRACT_FAILURE action', function() {
        return promise.then(expect.fail).catch(() => {
          expect(dispatch).to.be.calledWith({
            type: 'LOAD_UTILITY_CONTRACT_FAILURE',
            error: true,
            payload: expectedError
          });
        });
      });

      it('returns a rejected promise', function() {
        return expect(promise).to.be.rejectedWith(expectedError);
      });
    });
  });
});
