import React from 'react';
import { expect } from 'chai';
import { shallow } from 'enzyme';
import faker from 'faker';
import _ from 'lodash';
import sinon from 'sinon';

import { fixtures } from '@ndustrial/nsight-test-utils';

import RatesTable from './RatesTable';

const RATE_TYPES = ['flatDemand', 'touDemand', 'usage'];

describe('nsight-rate-tariffs/components/ScheduleDetail/Schedule/RatesTable', function() {
  let baseProps;

  beforeEach(function() {
    baseProps = {
      periods: _.times(faker.random.number({ min: 1, max: 5 }), (index) => {
        return {
          _id: index,
          rates: fixtures.buildList(
            'rateTierRate',
            faker.random.number({ min: 1, max: 10 })
          )
        };
      }),
      rateType: faker.random.arrayElement(RATE_TYPES),
      season: {}
    };
    baseProps.season.seasonPeriods = baseProps.periods.map(({ _id }) => ({
      _periodId: _id
    }));

    sinon.stub(RatesTable.prototype, 'getDefaultExpandedStatus');
    sinon.stub(RatesTable.prototype, 'getRates').returns([]);
  });

  afterEach(function() {
    sinon.restore();
  });

  describe('constructor', function() {
    let expectedExpandedPeriods;
    let ratesTable;

    beforeEach(function() {
      RatesTable.prototype.getDefaultExpandedStatus.restore();

      expectedExpandedPeriods = baseProps.periods.map(() =>
        faker.random.boolean()
      );

      sinon
        .stub(RatesTable.prototype, 'getDefaultExpandedStatus')
        .returns(expectedExpandedPeriods);

      ratesTable = shallow(<RatesTable {...baseProps} />, {
        disableLifecycleMethods: true
      });
    });

    it('sets the initial state', function() {
      expect(RatesTable.prototype.getDefaultExpandedStatus).to.be.calledOnce();
      expect(ratesTable.state('expandedPeriods')).to.deep.equal({
        [baseProps.rateType]: expectedExpandedPeriods
      });
    });
  });

  describe('componentDidUpdate', function() {
    context('expandedPeriods', function() {
      context('when a prop other than rate type is updated', function() {
        let existingState;
        let ratesTable;

        beforeEach(function() {
          ratesTable = shallow(<RatesTable {...baseProps} />, {
            disableLifecycleMethods: true
          });

          existingState = ratesTable.state();

          ratesTable.instance().componentDidUpdate({
            ...baseProps,
            [faker.hacker.adjective()]: faker.lorem.word()
          });
        });

        it('does not update the component state', function() {
          expect(ratesTable.state()).to.equal(existingState);
        });
      });

      context(
        'when there is already an expanded status state for the rate type',
        function() {
          let existingState;
          let ratesTable;

          beforeEach(function() {
            const previousRateType = faker.random.arrayElement(
              RATE_TYPES.filter((type) => type !== baseProps.rateType)
            );

            ratesTable = shallow(<RatesTable {...baseProps} />, {
              disableLifecycleMethods: true
            });

            ratesTable.setState((prevState) => {
              return {
                ...prevState,
                expandedPeriods: {
                  ...prevState.expandedPeriods,
                  [baseProps.rateType]: baseProps.periods.map(() =>
                    faker.random.boolean()
                  )
                }
              };
            });

            existingState = ratesTable.state();

            ratesTable.instance().componentDidUpdate({
              ...baseProps,
              rateType: previousRateType
            });
          });

          it('does not update the component state', function() {
            expect(ratesTable.state()).to.equal(existingState);
          });
        }
      );

      context(
        'when there is not an existing expanded state for the new rate type',
        function() {
          let expectedCurrentExpandedStatuses;
          let expectedPreviousExpandedStatuses;
          let previousRateType;
          let ratesTable;

          beforeEach(function() {
            RatesTable.prototype.getDefaultExpandedStatus.restore();

            previousRateType = faker.random.arrayElement(
              RATE_TYPES.filter((type) => type !== baseProps.rateType)
            );
            expectedCurrentExpandedStatuses = baseProps.periods.map(() =>
              faker.random.boolean()
            );
            expectedPreviousExpandedStatuses = baseProps.periods.map(() =>
              faker.random.boolean()
            );

            sinon
              .stub(RatesTable.prototype, 'getDefaultExpandedStatus')
              .returns(expectedCurrentExpandedStatuses);

            ratesTable = shallow(<RatesTable {...baseProps} />, {
              disableLifecycleMethods: true
            });

            ratesTable.setState((prevState) => {
              return {
                ...prevState,
                expandedPeriods: {
                  ...prevState.expandedPeriods,
                  [previousRateType]: expectedPreviousExpandedStatuses
                }
              };
            });

            ratesTable.instance().componentDidUpdate({
              ...baseProps,
              rateType: previousRateType
            });
          });

          it('gets the default expanded status for the new rate type', function() {
            expect(
              RatesTable.prototype.getDefaultExpandedStatus
            ).to.be.calledOnce();
          });

          it('stores the default expanded status for the new rate type in the component state', function() {
            expect(
              ratesTable.state('expandedPeriods')[baseProps.rateType]
            ).to.equal(expectedCurrentExpandedStatuses);
          });

          it('retains the expanded status for the previous rate type', function() {
            expect(
              ratesTable.state('expandedPeriods')[previousRateType]
            ).to.equal(expectedPreviousExpandedStatuses);
          });
        }
      );
    });
  });

  describe('getDefaultExpandedStatus', function() {
    let expandedStatus;
    let props;

    beforeEach(function() {
      const periods = _.times(
        faker.random.number({ min: 5, max: 10 }),
        (index) => {
          return {
            _id: index,
            rates: fixtures.buildList(
              'rateTierRate',
              faker.random.number({ min: 1, max: 10 })
            )
          };
        }
      );

      props = {
        periods,
        rateType: faker.random.arrayElement(RATE_TYPES),
        season: {
          seasonPeriods: periods
            .filter(() => faker.random.boolean())
            .map(({ _id }) => ({ _periodId: _id }))
        }
      };

      const ratesTable = shallow(<RatesTable {...props} />, {
        disableLifecycleMethods: true
      });

      RatesTable.prototype.getDefaultExpandedStatus.restore();

      expandedStatus = ratesTable.instance().getDefaultExpandedStatus();
    });

    it('marks periods associated with the season as open', function() {
      const expandedPeriodIds = expandedStatus
        .map((isExpanded, index) =>
          isExpanded ? props.periods[index]._id : null
        )
        .filter((id) => id !== null);

      expect(expandedPeriodIds).to.deep.equal(
        props.season.seasonPeriods.map(({ _periodId }) => _periodId)
      );
    });

    it('marks periods not associated with the season as closed', function() {
      const expandedPeriodIds = expandedStatus
        .map((isExpanded, index) =>
          isExpanded ? null : props.periods[index]._id
        )
        .filter((id) => id !== null);

      props.season.seasonPeriods
        .map(({ _periodId }) => _periodId)
        .forEach((id) => {
          expect(expandedPeriodIds).to.not.include(id);
        });
    });
  });

  describe('setExpandedPeriods', function() {
    let currentRateType;
    let expectedCurrentExpandedStatuses;
    let expectedPreviousExpandedStatuses;
    let previousRateType;
    let ratesTable;

    beforeEach(function() {
      currentRateType = baseProps.rateType;
      previousRateType = faker.random.arrayElement(
        RATE_TYPES.filter((type) => type !== baseProps.rateType)
      );
      expectedCurrentExpandedStatuses = baseProps.periods.map(() =>
        faker.random.boolean()
      );
      expectedPreviousExpandedStatuses = baseProps.periods.map(() =>
        faker.random.boolean()
      );

      ratesTable = shallow(<RatesTable {...baseProps} />, {
        disableLifecycleMethods: true
      });

      ratesTable.setState({
        expandedPeriods: {
          [previousRateType]: expectedPreviousExpandedStatuses
        }
      });

      ratesTable.instance().setExpandedPeriods(expectedCurrentExpandedStatuses);
    });

    it('sets the new expanded periods to the component state', function() {
      expect(ratesTable.state('expandedPeriods')[currentRateType]).to.equal(
        expectedCurrentExpandedStatuses
      );
    });

    it('retains the previously existing expanded periods in the component state', function() {
      expect(ratesTable.state('expandedPeriods')[previousRateType]).to.equal(
        expectedPreviousExpandedStatuses
      );
    });
  });
});
