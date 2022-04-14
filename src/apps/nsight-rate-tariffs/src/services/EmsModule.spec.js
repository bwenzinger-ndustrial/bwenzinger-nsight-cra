import { expect } from 'chai';
import faker from 'faker';
import sinon from 'sinon';

import * as objectUtils from '@ndustrial/contxt-sdk';
import { fixtures } from '@ndustrial/nsight-test-utils';

import Ems from './EmsModule';

describe('nsight-rate-tariffs/services/EmsModule', function() {
  let baseRequest;
  let baseSdk;
  let expectedHost;
  const orgId = 1;
  const noOrgEms = new Ems(
    {
      config: {
        audiences: {
          ratesEms: fixtures.build('audience')
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
          ratesEms: fixtures.build('audience')
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
      ems = new Ems(baseSdk, baseRequest);
    });

    it('sets a base url for the class instance', function() {
      expect(ems._baseUrl).to.equal(
        `${baseSdk.config.audiences.ratesEms.host}/v1`
      );
    });

    it('appends the supplied request module to the class instance', function() {
      expect(ems._request).to.deep.equal(baseRequest);
    });

    it('appends the supplied sdk to the class instance', function() {
      expect(ems._sdk).to.deep.equal(baseSdk);
    });
  });

  describe('getContractById', function() {
    context('no organizationId is provided to sdk', function() {
      let promise;
      beforeEach(function() {
        promise = noOrgEms.getContractById();
      });

      it('throws an error', function() {
        return expect(promise).to.be.rejectedWith(
          'A selectored organization is required to get data'
        );
      });
    });

    context('the contract ID and facility ID are provided', function() {
      let expectedContract;
      let expectedFacility;
      let request;
      let promise;
      let unformattedContract;

      beforeEach(function() {
        expectedContract = fixtures.build('contract');
        expectedFacility = fixtures.build('facility');
        unformattedContract = fixtures.build('contract', expectedContract);

        request = {
          ...baseRequest,
          get: sinon.stub().resolves(unformattedContract)
        };
        sinon.stub(objectUtils, 'toCamelCase').returns(expectedContract);

        const ems = new Ems(baseSdk, request);
        ems._baseUrl = expectedHost;

        promise = ems.getContractById(expectedFacility.id, expectedContract.id);
      });
      it('gets the utility contract from the EMS API', function() {
        return promise.then(() => {
          expect(request.get).to.be.calledWith(
            `${expectedHost}/${orgId}/facilities/${expectedFacility.id}/contracts/${expectedContract.id}`
          );
        });
      });

      it('formats the response', function() {
        return promise.then(() => {
          expect(objectUtils.toCamelCase).to.be.calledWith(unformattedContract);
        });
      });

      it('returns the utility contract', function() {
        return expect(promise).to.be.fulfilled.and.to.eventually.equal(
          expectedContract
        );
      });
    });

    context('the contract ID is not provided', function() {
      let expectedFacility;
      let promise;

      beforeEach(function() {
        const ems = new Ems(baseSdk, baseRequest);
        ems._baseUrl = expectedHost;

        expectedFacility = fixtures.build('facility');

        promise = ems.getContractById(expectedFacility.id, null);
      });

      it('throws an error', function() {
        return expect(promise).to.be.rejectedWith(
          'A contractId is required get a contract.'
        );
      });

      it('does not attempt to get the utility contract from the EMS API', function() {
        return promise.then(expect.fail).catch(() => {
          expect(baseRequest.get).to.not.be.called();
        });
      });
    });

    context('the facility ID is not provided', function() {
      let expectedContract;
      let promise;

      beforeEach(function() {
        const ems = new Ems(baseSdk, baseRequest);
        ems._baseUrl = expectedHost;

        expectedContract = fixtures.build('contract');

        promise = ems.getContractById(null, expectedContract.id);
      });

      it('throws an error', function() {
        return expect(promise).to.be.rejectedWith(
          'A facilityId is required get a contract.'
        );
      });

      it('does not attempt to get the utility contract from the EMS API', function() {
        return promise.then(expect.fail).catch(() => {
          expect(baseRequest.get).to.not.be.called();
        });
      });
    });
  });
});
