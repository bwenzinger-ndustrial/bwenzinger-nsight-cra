import React from 'react';
import { expect } from 'chai';
import { shallow } from 'enzyme';
import faker from 'faker';
import _ from 'lodash';
import sinon from 'sinon';

import { fixtures } from '@ndustrial/nsight-test-utils';

import { ScheduleBox } from './index';

const RATE_TYPES = ['flatDemand', 'touDemand', 'usage'];

describe('nsight-rate-tariffs/components/ScheduleBox/index', function() {
  let baseProps;

  beforeEach(function() {
    const rateSchedule = fixtures.build(
      'rateSchedule',
      RATE_TYPES.reduce((memo, rateType) => {
        memo[rateType] = {
          periods: _.times(faker.random.number({ min: 1, max: 5 }), (index) => {
            return {
              _id: index,
              rates: fixtures.buildList(
                'rateTierRate',
                faker.random.number({ min: 1, max: 10 }),
                null,
                { type: rateType }
              )
            };
          }),
          seasons: fixtures
            .buildList(
              'rateSeason',
              faker.random.number({ min: 2, max: 3 }),
              {
                seasonPeriods: []
              },
              { type: rateType }
            )
            .map((season) => _.omit(season, [`${rateType}SeasonPeriods`]))
        };

        return memo;
      }, {})
    );

    baseProps = {
      isActive: rateSchedule.isActive,
      isExpired: rateSchedule.isExpired,
      organizationName: rateSchedule.organizationName,
      rateNarrative: faker.hacker.phrase(),
      schedule: rateSchedule
    };
  });

  afterEach(function() {
    sinon.restore();
  });

  describe('handleSeasonIndexSelection', function() {
    let expectedSeasonIndexSelection;
    let scheduleBox;

    beforeEach(function() {
      expectedSeasonIndexSelection = faker.random.number();

      scheduleBox = shallow(<ScheduleBox {...baseProps} />, {
        disableLifecycleMethods: true
      });

      scheduleBox.setState({ selectedSeasonIndex: faker.random.number() });

      scheduleBox
        .instance()
        .handleSeasonIndexSelection(expectedSeasonIndexSelection);
    });

    it('sets expectedSeasonIndexSelection to new season index', function() {
      expect(scheduleBox.state('selectedSeasonIndex')).to.equal(
        expectedSeasonIndexSelection
      );
    });
  });

  describe('handleRateTypeSelection', function() {
    context(
      'when the new rate type does not have a corresponding season to the previously selected season',
      function() {
        let expectedRateTypeSelection;
        let scheduleBox;

        beforeEach(function() {
          expectedRateTypeSelection = faker.random.arrayElement(RATE_TYPES);

          scheduleBox = shallow(<ScheduleBox {...baseProps} />, {
            disableLifecycleMethods: true
          });

          scheduleBox.setState({
            selectedRateType: faker.random.arrayElement(RATE_TYPES),
            selectedSeasonIndex: faker.random.number({ min: 1 })
          });

          scheduleBox
            .instance()
            .handleRateTypeSelection(expectedRateTypeSelection);
        });

        it('sets selectedRateType to new rate type', function() {
          expect(scheduleBox.state('selectedRateType')).to.equal(
            expectedRateTypeSelection
          );
        });

        it('updates the selectedSeasonIndex to 0', function() {
          expect(scheduleBox.state('selectedSeasonIndex')).to.equal(0);
        });
      }
    );
    context(
      'when the new rate type does not have a corresponding season to the previously selected season',
      function() {
        let expectedRateTypeSelection;
        let expectedSelectedSeasonIndex;
        let scheduleBox;

        beforeEach(function() {
          expectedRateTypeSelection = faker.random.arrayElement(RATE_TYPES);
          expectedSelectedSeasonIndex = 1;

          scheduleBox = shallow(<ScheduleBox {...baseProps} />, {
            disableLifecycleMethods: true
          });

          scheduleBox.setState({
            selectedRateType: faker.random.arrayElement(
              RATE_TYPES.filter(
                (rateType) => rateType !== expectedRateTypeSelection
              )
            ),
            selectedSeasonIndex: expectedSelectedSeasonIndex
          });

          scheduleBox
            .instance()
            .handleRateTypeSelection(expectedRateTypeSelection);
        });

        it('sets selectedRateType to new rate type', function() {
          expect(scheduleBox.state('selectedRateType')).to.equal(
            expectedRateTypeSelection
          );
        });

        it('keeps the previously selected season', function() {
          expect(scheduleBox.state('selectedSeasonIndex')).to.equal(
            expectedSelectedSeasonIndex
          );
        });
      }
    );
  });
});
