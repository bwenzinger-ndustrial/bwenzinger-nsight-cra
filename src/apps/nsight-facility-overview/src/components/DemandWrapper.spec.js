import React from 'react';
import { MemoryRouter } from 'react-router-dom';
import { expect } from 'chai';
import faker from 'faker';
import sinon from 'sinon';

import { renderWithAppContext } from '@ndustrial/nsight-common/test/testRenderer';
import { fixtures } from '@ndustrial/nsight-test-utils';

import DemandWrapper from './DemandWrapper';

describe('nsight-facility-overview/components/DemandWrapper', function() {
  let baseProps;
  let clock;
  let demandWrapperComponent;

  beforeEach(function() {
    baseProps = {
      dailyKwh: {},
      daillyHeatmapDemand: {},
      demandComparison: {
        isLoading: false
      },
      facility: fixtures.build('facility'),
      getDailyKwhData: sinon.stub(),
      getDemandComparisonData: sinon.stub(),
      getHeatmapData: sinon.stub(),
      weeklyHeatmapDemand: {},
      demandUnits: 'kW'
    };
    clock = sinon.useFakeTimers();
    demandWrapperComponent = renderWithAppContext(
      <MemoryRouter>
        <DemandWrapper {...baseProps} />
      </MemoryRouter>
    );
  });

  afterEach(function() {
    sinon.restore();
    clock.restore();
    demandWrapperComponent.unmount();
  });

  context('on mount', function() {
    it('calls get demand comparison data with facility', function() {
      expect(baseProps.getDemandComparisonData).to.be.calledOnce();
      expect(baseProps.getDemandComparisonData).to.be.calledWith(
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
        clock.tick(900000);
        setTimeout(() => {
          return expect(baseProps.getDemandComparisonData.callCount).to.equal(
            i + 1
          );
        }, 500);
      }
    });
  });
});
