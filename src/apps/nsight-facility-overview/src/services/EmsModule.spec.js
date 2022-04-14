import { expect } from 'chai';
import faker from 'faker';
import sinon from 'sinon';

import fixture from '../../test/fixtures/factories';
import EmsModule from './EmsModule';

describe('nsight-facility-overview/services/EmsModule', function() {
  let baseRequest;
  let baseSdk;
  let expectedHost;
  const orgId = 1;
  const noOrgEms = new EmsModule(
    {
      config: {
        audiences: {
          facilityEms: {
            host: faker.internet.url()
          }
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
      get: sinon.stub().resolves()
    };

    baseSdk = {
      config: {
        audiences: {
          facilityEms: {
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
      expect(ems._baseUrl).to.equal(
        `${baseSdk.config.audiences.facilityEms.host}/v1`
      );
    });

    it('appends the supplied request module to the class instance', function() {
      expect(ems._request).to.deep.equal(baseRequest);
    });

    it('appends the supplied sdk to the class instance', function() {
      expect(ems._sdk).to.deep.equal(baseSdk);
    });
  });

  describe('getAggregateDemandData', function() {
    context('no organizationId is provided to sdk', function() {
      let promise;
      beforeEach(function() {
        promise = noOrgEms.getAggregateDemandData();
      });

      it('throws an error', function() {
        return expect(promise).to.be.rejectedWith(
          'A selectored organization is required to get data'
        );
      });
    });
    context('when successfully retrieving aggregate demand data', function() {
      let ems;
      let expectedAggregateDemand;
      let facilityId;
      let units;
      let promise;
      let request;

      beforeEach(function() {
        expectedAggregateDemand = fixture.buildList(
          'aggregateDemand',
          faker.random.number({ min: 1, max: 10 })
        );
        facilityId = faker.random.number();
        units = 'kW';

        request = {
          ...baseRequest,
          get: sinon.stub().resolves(expectedAggregateDemand)
        };

        ems = new EmsModule(baseSdk, request);
        ems._baseUrl = expectedHost;

        promise = ems.getAggregateDemandData(facilityId, units);
      });

      it('makes a call to the ems api to get aggregate demand for a facility', function() {
        expect(request.get).to.be.calledOnceWithExactly(
          `${ems._baseUrl}/${orgId}/facilities/${facilityId}/demand/aggregate?units=${units}`
        );
      });

      it('retrieves aggregate demand', function() {
        return promise.then((values) => {
          expect(values).to.deep.equal(expectedAggregateDemand);
        });
      });

      it('returns a fulfilled promise', function() {
        return expect(promise).to.be.fulfilled.and.to.eventually.deep.equal(
          expectedAggregateDemand
        );
      });
    });

    context('when missing a facility ID', function() {
      let promise;

      beforeEach(function() {
        const ems = new EmsModule(baseSdk, baseRequest);
        ems._baseUrl = expectedHost;

        promise = ems.getAggregateDemandData(null);
      });

      it('does not get the aggregate demand', function() {
        return promise.then(expect.fail).catch(() => {
          expect(baseRequest.get).to.not.be.called();
        });
      });

      it('returns with a rejected promise', function() {
        return expect(promise).to.be.rejectedWith(
          'A facility ID is required to get Real Time Demand data.'
        );
      });
    });
  });

  describe('getCurrentDemand', function() {
    context('no organizationId is provided to sdk', function() {
      let promise;
      beforeEach(function() {
        promise = noOrgEms.getCurrentDemand();
      });

      it('throws an error', function() {
        return expect(promise).to.be.rejectedWith(
          'A selectored organization is required to get data'
        );
      });
    });
    context('when successfully retrieving current demand data', function() {
      let ems;
      let expectedCurrentDemand;
      let facilityId;
      let unit;
      let promise;
      let request;

      beforeEach(function() {
        expectedCurrentDemand = {
          type: 'electric',
          value: faker.random.number()
        };
        facilityId = faker.random.number();
        unit = 'kW';

        request = {
          ...baseRequest,
          get: sinon.stub().resolves(expectedCurrentDemand)
        };

        ems = new EmsModule(baseSdk, request);
        ems._baseUrl = expectedHost;

        promise = ems.getCurrentDemand(facilityId, unit);
      });

      it('makes a call to the ems api to get current demand for a facility', function() {
        expect(request.get).to.be.calledOnceWithExactly(
          `${ems._baseUrl}/${orgId}/facilities/${facilityId}/demand/current?type=electric&unit=${unit}`
        );
      });

      it('returns a fulfilled promise', function() {
        return expect(promise).to.be.fulfilled.and.to.eventually.deep.equal(
          expectedCurrentDemand
        );
      });
    });

    context('when missing a facility ID', function() {
      let promise;

      beforeEach(function() {
        const ems = new EmsModule(baseSdk, baseRequest);
        ems._baseUrl = expectedHost;

        promise = ems.getCurrentDemand(null);
      });

      it('does not get the aggregate demand', function() {
        return promise.then(expect.fail).catch(() => {
          expect(baseRequest.get).to.not.be.called();
        });
      });

      it('returns with a rejected promise', function() {
        return expect(promise).to.be.rejectedWith(
          'A facility ID is required to get current demand data.'
        );
      });
    });
  });
});
