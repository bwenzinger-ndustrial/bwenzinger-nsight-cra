import React, { Component } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

import { RATE_COLORS } from '../../../../constants';
import UnstyledRatesTreeTable from './RatesTreeTable';

const RATES_TREE_TABLE_MIN_WIDTH = 700;

const RatesTableContainer = styled.div`
  margin-bottom: -12px;
  padding-bottom: 12px;
  overflow-x: scroll;
  width: 100%;
`;

const RatesTreeTable = styled(UnstyledRatesTreeTable)`
  min-width: ${RATES_TREE_TABLE_MIN_WIDTH}px;
`;

class RatesTable extends Component {
  static propTypes = {
    periods: PropTypes.arrayOf(
      PropTypes.shape({
        rates: PropTypes.arrayOf(
          PropTypes.shape({
            adjustment: PropTypes.number,
            unit: PropTypes.string.isRequired,
            unitStartValue: PropTypes.number.isRequired,
            unitStopValue: PropTypes.oneOfType([
              PropTypes.string,
              PropTypes.number
            ]).isRequired,
            rate: PropTypes.number.isRequired
          })
        ).isRequired
      })
    ).isRequired,
    rateType: PropTypes.string.isRequired,
    season: PropTypes.shape({
      seasonPeriods: PropTypes.arrayOf(
        PropTypes.shape({
          _periodId: PropTypes.number.isRequired
        })
      ).isRequired
    }).isRequired
  };

  constructor(props) {
    super(props);

    this.state = {
      expandedPeriods: {
        [props.rateType]: this.getDefaultExpandedStatus()
      }
    };
  }

  componentDidUpdate(prevProps) {
    if (this.props.rateType !== prevProps.rateType) {
      this.setState((prevState) => {
        if (prevState.expandedPeriods[this.props.rateType]) {
          return;
        }

        return {
          expandedPeriods: {
            ...prevState.expandedPeriods,
            [this.props.rateType]: this.getDefaultExpandedStatus()
          }
        };
      });
    }
  }

  getDefaultExpandedStatus() {
    const seasonPeriodIds = this.props.season.seasonPeriods.map(
      (period) => period._periodId
    );

    return this.props.periods.map(
      ({ _id }) => seasonPeriodIds.indexOf(_id) !== -1
    );
  }

  setExpandedPeriods = (expandedPeriods) => {
    this.setState((prevState) => {
      return {
        expandedPeriods: {
          ...prevState.expandedPeriods,
          [this.props.rateType]: expandedPeriods
        }
      };
    });
  };

  getRates() {
    const seasonPeriodIds = this.props.season.seasonPeriods.map(
      (period) => period._periodId
    );

    return this.props.periods.reduce((memo, period, periodIndex) => {
      return memo.concat(
        period.rates.map((rate, rateIndex) => {
          return {
            adjustment: rate.adjustment !== undefined ? rate.adjustment : '--',
            color: RATE_COLORS[periodIndex],
            chargePeriod: periodIndex + 1,
            existsInSeason: seasonPeriodIds.indexOf(period._id) !== -1,
            period: `Period ${periodIndex + 1}`,
            max:
              !rate.unitStopValue || rate.unitStopValue === 'Infinity'
                ? '--'
                : rate.unitStopValue,
            min: rate.unitStartValue !== undefined ? rate.unitStartValue : '--',
            rate: rate.rate !== undefined ? rate.rate : '--',
            tier: rateIndex + 1,
            units: rate.unit !== undefined ? rate.unit : '--'
          };
        })
      );
    }, []);
  }

  render() {
    return (
      <RatesTableContainer>
        <RatesTreeTable
          data={this.getRates()}
          expandedPeriods={this.state.expandedPeriods[this.props.rateType]}
          onExpandedChange={this.setExpandedPeriods}
          minWidth={RATES_TREE_TABLE_MIN_WIDTH}
        />
      </RatesTableContainer>
    );
  }
}

export default RatesTable;
