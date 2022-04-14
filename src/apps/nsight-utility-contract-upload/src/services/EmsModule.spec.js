import { expect } from 'chai';
import faker from 'faker';
import _ from 'lodash';
import sinon from 'sinon';

import * as objectUtils from '@ndustrial/contxt-sdk';
import { utils as nsightUtils } from '@ndustrial/nsight-common';
import { fixtures } from '@ndustrial/nsight-test-utils';

import EmsModule from './EmsModule';

describe('nsight-utility-contract-upload/services/EmsModule', function() {
  let baseRequest;
  let baseSdk;
  let expectedHost;
  const orgId = 1;
  const noOrgEms = new EmsModule(
    {
      config: {
        audiences: {
          ems: fixtures.build('audience')
        }
      },
      coordinator: {
        _organizationId: null
      }
    },
    baseRequest
  );

  beforeEach(function() {
    baseRequest = {
      delete: sinon.stub().resolves(),
      get: sinon.stub().resolves(),
      post: sinon.stub().resolves(),
      put: sinon.stub().resolves()
    };

    baseSdk = {
      config: {
        audiences: {
          ems: {
            clientId: faker.internet.password(),
            host: faker.internet.url()
          }
        }
      },
      coordinator: {
        _organizationId: orgId
      }
    };

    expectedHost = faker.internet.url();
  });

  afterEach(function() {
    sinon.restore();
  });

  describe('constructor', function() {
    let ems;

    beforeEach(function() {
      ems = new EmsModule(baseSdk, baseRequest);
    });

    it('sets a base url for the class instance', function() {
      expect(ems._baseUrl).to.equal(`${baseSdk.config.audiences.ems.host}/v1`);
    });

    it('appends the supplied request module to the class instance', function() {
      expect(ems._request).to.deep.equal(baseRequest);
    });

    it('appends the supplied sdk to the class instance', function() {
      expect(ems._sdk).to.deep.equal(baseSdk);
    });
  });

  describe('createContract', function() {
    context('no organizationId is provided to sdk', function() {
      let promise;
      beforeEach(function() {
        promise = noOrgEms.createContract();
      });

      it('throws an error', function() {
        return expect(promise).to.be.rejectedWith(
          'A selectored organization is required to get data'
        );
      });
    });

    context('when successfully creating a contract', function() {
      let contractFromServer;
      let contractToServer;
      let request;
      let promise;

      beforeEach(function() {
        contractToServer = fixtures.build('contract');
        contractFromServer = fixtures.build('contract', contractToServer, {});

        request = {
          ...baseRequest,
          post: sinon.stub().resolves(contractFromServer)
        };

        const ems = new EmsModule(baseSdk, request);
        ems._baseUrl = expectedHost;

        sinon
          .stub(EmsModule.prototype, 'formatContractBody')
          .returns(contractFromServer);

        promise = ems.createContract(_.omit(contractToServer, ['id']));
      });

      it('creates a contract', function() {
        return promise.then(() => {
          expect(request.post).to.be.calledWith(
            `${expectedHost}/${orgId}/facilities/${contractToServer.facilityId}/contracts`,
            contractFromServer
          );
        });
      });

      it('returns a resolved promise with the new contract', function() {
        return promise.then((result) => {
          expect(result).to.deep.equal(contractFromServer);
        });
      });
    });

    context('when missing a facility ID', function() {
      let promise;

      beforeEach(function() {
        const contract = _.omit(fixtures.build('contract'), [
          'facilityId',
          'id'
        ]);

        const ems = new EmsModule(baseSdk, baseRequest);
        ems._baseUrl = expectedHost;

        promise = ems.createContract(contract);
      });

      it('does not create the contract', function() {
        return promise.then(expect.fail).catch(() => {
          expect(baseRequest.post).to.not.be.called();
        });
      });

      it('returns with a rejected promise', function() {
        return expect(promise).to.be.rejectedWith(
          'A facilityId is required to create a contract.'
        );
      });
    });
  });

  describe('deleteContract', function() {
    context('no organizationId is provided to sdk', function() {
      let promise;
      beforeEach(function() {
        promise = noOrgEms.deleteContract();
      });

      it('throws an error', function() {
        return expect(promise).to.be.rejectedWith(
          'A selectored organization is required to get data'
        );
      });
    });
    context('when successfully creating a contract', function() {
      let contract;
      let promise;

      beforeEach(function() {
        contract = fixtures.build('contract');

        const ems = new EmsModule(baseSdk, baseRequest);
        ems._baseUrl = expectedHost;

        promise = ems.deleteContract(contract.facilityId, contract.id);
      });

      it('deletes a contract', function() {
        expect(baseRequest.delete).to.be.calledWith(
          `${expectedHost}/${orgId}/facilities/${contract.facilityId}/contracts/${contract.id}`
        );
      });

      it('returns a resolved promise', function() {
        return expect(promise).to.be.fulfilled();
      });
    });

    context('when missing required fields', function() {
      [
        { errorField: 'facilityId', field: 'facilityId' },
        { errorField: 'contractId', field: 'id' }
      ].forEach(function({ errorField, field }) {
        context(`when missing the ${errorField}`, function() {
          let promise;

          beforeEach(function() {
            const contract = fixtures.build('contract');

            const ems = new EmsModule(baseSdk, baseRequest);
            ems._baseUrl = expectedHost;

            const requestArguments = _.omit(
              {
                facilityId: contract.facilityId,
                id: contract.id
              },
              [field]
            );

            promise = ems.deleteContract(
              requestArguments.facilityId,
              requestArguments.id
            );
          });

          it('does not delete the contract', function() {
            return promise.then(expect.fail).catch(() => {
              expect(baseRequest.delete).to.not.be.called();
            });
          });

          it('returns with a rejected promise', function() {
            return expect(promise).to.be.rejectedWith(
              `A ${errorField} is required to delete a contract.`
            );
          });
        });
      });
    });
  });

  describe('getContractsByFacility', function() {
    context('no organizationId is provided to sdk', function() {
      let promise;
      beforeEach(function() {
        promise = noOrgEms.getContractsByFacility();
      });

      it('throws an error', function() {
        return expect(promise).to.be.rejectedWith(
          'A selectored organization is required to get data'
        );
      });
    });
    context('when successfully retrieving contracts', function() {
      let expectedContracts;
      let expectedContractsFromServer;
      let expectedFacilityId;
      let expectedPaginatedValues;
      let promise;
      let request;

      beforeEach(function() {
        expectedFacilityId = fixtures.build('facility').id;
        expectedContracts = fixtures.buildList(
          'contract',
          faker.random.number({ min: 1, max: 10 }),
          { facilityId: expectedFacilityId }
        );
        expectedContractsFromServer = expectedContracts.map((contract) =>
          fixtures.build('contract', contract, { fromServer: true })
        );
        expectedPaginatedValues = {
          _metadata: {
            count: expectedContractsFromServer.length,
            offset: 0
          },
          records: expectedContractsFromServer
        };

        sinon
          .stub(nsightUtils, 'getAllPaginatedResults')
          .resolves(expectedContractsFromServer);
        request = {
          ...baseRequest,
          get: sinon.stub().resolves(expectedPaginatedValues)
        };
        sinon.stub(objectUtils, 'toCamelCase').resolves(expectedContracts);

        const ems = new EmsModule(baseSdk, request);
        ems._baseUrl = expectedHost;

        promise = ems.getContractsByFacility(expectedFacilityId);
      });

      it('retrieves all the contracts', function() {
        const expectedOptions = { offset: faker.random.number() };

        expect(nsightUtils.getAllPaginatedResults).to.be.calledOnce();

        const [requestFn] = nsightUtils.getAllPaginatedResults.firstCall.args;
        const results = requestFn(expectedOptions);

        expect(request.get).to.be.calledWith(
          `${expectedHost}/${orgId}/facilities/${expectedFacilityId}/contracts`
        );

        return results.then((values) => {
          expect(values).to.deep.equal(expectedPaginatedValues);
        });
      });

      it('formats the contracts', function() {
        return promise.then(() => {
          expect(objectUtils.toCamelCase).to.be.calledWith(
            expectedContractsFromServer
          );
        });
      });

      it('returns a fulfilled promise with the contracts', function() {
        return expect(promise).to.be.fulfilled.and.to.eventually.deep.equal(
          expectedContracts
        );
      });
    });

    context('when missing a facility ID', function() {
      let promise;

      beforeEach(function() {
        const ems = new EmsModule(baseSdk, baseRequest);
        ems._baseUrl = expectedHost;

        promise = ems.getContractsByFacility(null);
      });

      it('does not get the contracts', function() {
        return promise.then(expect.fail).catch(() => {
          expect(baseRequest.get).to.not.be.called();
        });
      });

      it('returns with a rejected promise', function() {
        return expect(promise).to.be.rejectedWith(
          'A facilityId is required get contracts.'
        );
      });
    });
  });

  describe('formatContractBody', function() {
    let contract;
    let expectedBodyAfterFormat;
    let formattedBody;

    beforeEach(function() {
      contract = fixtures.build('contract');
      expectedBodyAfterFormat = _.pick(
        fixtures.build('contract', contract, { fromServer: true }),
        [
          'end_date',
          'file_id',
          'name',
          'rate_narrative',
          'start_date',
          'status',
          'users'
        ]
      );

      formattedBody = EmsModule.prototype.formatContractBody(contract);
    });

    it('formats the contract body in a format that is appropriate for updating the contract', function() {
      expect(formattedBody).to.deep.equal(expectedBodyAfterFormat);
    });
  });

  describe('updateContract', function() {
    context('no organizationId is provided to sdk', function() {
      let promise;
      beforeEach(function() {
        promise = noOrgEms.updateContract();
      });

      it('throws an error', function() {
        return expect(promise).to.be.rejectedWith(
          'A selectored organization is required to get data'
        );
      });
    });
    context('when successfully updating a contract', function() {
      let contract;
      let formattedBody;
      let promise;

      beforeEach(function() {
        contract = fixtures.build('contract');
        formattedBody = fixtures.build('contract', contract, {
          fromServer: true
        });

        sinon
          .stub(EmsModule.prototype, 'formatContractBody')
          .returns(formattedBody);

        const ems = new EmsModule(baseSdk, baseRequest);
        ems._baseUrl = expectedHost;

        promise = ems.updateContract(
          contract.facilityId,
          contract.id,
          contract
        );
      });

      it('formats the request body', function() {
        expect(EmsModule.prototype.formatContractBody).to.be.calledWith(
          contract
        );
      });

      it('updates the contract', function() {
        expect(baseRequest.put).to.be.calledWith(
          `${expectedHost}/${orgId}/facilities/${contract.facilityId}/contracts/${contract.id}`,
          formattedBody
        );
      });

      it('returns with a fulfilled promise', function() {
        return expect(promise).to.be.fulfilled();
      });
    });

    context('when missing required fields', function() {
      [
        { errorField: 'facilityId', field: 'facilityId' },
        { errorField: 'contractId', field: 'id' }
      ].forEach(function({ errorField, field }) {
        context(`when missing the ${errorField}`, function() {
          let promise;

          beforeEach(function() {
            const contract = fixtures.build('contract');

            const ems = new EmsModule(baseSdk, baseRequest);
            ems._baseUrl = expectedHost;

            const requestArguments = _.omit(
              {
                facilityId: contract.facilityId,
                id: contract.id
              },
              [field]
            );

            promise = ems.updateContract(
              requestArguments.facilityId,
              requestArguments.id,
              contract
            );
          });

          it('does not update the contract', function() {
            return promise.then(expect.fail).catch(() => {
              expect(baseRequest.put).to.not.be.called();
            });
          });

          it('returns with a rejected promise', function() {
            return expect(promise).to.be.rejectedWith(
              `A ${errorField} is required to update a contract.`
            );
          });
        });
      });
    });
  });
});
