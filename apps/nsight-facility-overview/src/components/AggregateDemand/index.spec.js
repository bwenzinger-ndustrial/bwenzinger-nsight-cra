import React from 'react';
import { MemoryRouter } from 'react-router-dom';
import { expect } from 'chai';
import faker from 'faker';
import sinon from 'sinon';

import { fixtures } from '@ndustrial/nsight-test-utils';
import mountWithTheme from '@ndustrial/nsight-test-utils/mountWithTheme';

import AggregateDemand from './index';

describe('nsight-facility-overview/components/AggregateDemand', function() {
  let baseProps;
  let clock;
  let aggregateDemandComponent;

  beforeEach(function() {
    baseProps = {
      aggregateDemand: {
        isLoading: false
      },
      currentDemand: {
        value: 1
      },
      facility: fixtures.build('facility'),
      getAggregateDemandData: sinon.stub(),
      demandUnits: 'kW'
    };
    clock = sinon.useFakeTimers();

    aggregateDemandComponent = mountWithTheme(
      <MemoryRouter>
        <AggregateDemand {...baseProps} />
      </MemoryRouter>
    );
  });

  afterEach(function() {
    aggregateDemandComponent.unmount();
    clock.restore();
    sinon.restore();
  });

  context('on mount', function() {
    it('calls get aggregate demand data with a facility', function() {
      expect(baseProps.getAggregateDemandData).to.be.calledOnce();
      expect(baseProps.getAggregateDemandData).to.be.calledWith(
        baseProps.facility
      );
    });
  });

  context('on interval', function() {
    let expectedCalls;

    beforeEach(function() {
      expectedCalls = faker.random.number({ min: 1, max: 5 });
    });

    it('calls the function on an interval', function() {
      for (let i = 1; i < expectedCalls; i++) {
        clock.tick(60000);
        setTimeout(
          // +1 added to account for call on mount
          () => {
            return expect(baseProps.getAggregateDemandData.callCount).to.equal(
              i + 1
            );
          },
          500
        );
      }
    });
  });
});
