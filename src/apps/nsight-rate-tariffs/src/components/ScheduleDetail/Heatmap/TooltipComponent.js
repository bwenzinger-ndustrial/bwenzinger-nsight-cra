import React, { Fragment } from 'react';
import { find, findIndex } from 'lodash';
import moment from 'moment';
import { rem } from 'polished';
import PropTypes from 'prop-types';
import styled from 'styled-components';

import { RATE_COLORS, SCHEDULE_TABS } from '../../../constants';

const propTypes = {
  _scheduleType: PropTypes.string.isRequired,
  annualScheduleTypeDesc: function(props, propName, componentName) {
    if (props._scheduleType === 'annual' && props[propName] === undefined) {
      throw new Error(
        `Failed prop type: The prop \`${propName}\` is marked as required in \`${componentName}\` when \`_scheduleType\` is \`annual\`, but its value is \`undefined\`.`
      );
    }
  },
  className: PropTypes.string,
  dayIndex: PropTypes.number,
  hour: PropTypes.shape({
    periods: PropTypes.arrayOf(
      PropTypes.shape({
        periodId: PropTypes.number.isRequired
      })
    ).isRequired
  }).isRequired,
  monthIndex: PropTypes.number,
  name: PropTypes.string.isRequired,
  periods: PropTypes.arrayOf(
    PropTypes.shape({
      _id: PropTypes.number.isRequired,
      rates: PropTypes.arrayOf(
        PropTypes.shape({
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
  rateType: PropTypes.string.isRequired
};

const TooltipHeader = styled.h4`
  font-size: ${rem('10px')};
  font-weight: 500;
  letter-spacing: 0;
  line-height: 1.5;
  margin: 0;
`;

const TooltipTierTitle = styled(TooltipHeader)`
  display: inline;
`;

const TooltipTierTextContainer = styled.div`
  display: block;
  font-size: ${rem('10px')};
  letter-spacing: 0;
  line-height: 1.5;
`;

const TooltipPeriod = styled.p`
  align-items: center;
  display: flex;
  font-size: ${rem('10px')};
  font-weight: 500;
  letter-spacing: 0;
  line-height: 1.5;
  margin: 0;
  padding: 4px 0;
  text-transform: capitalize;
`;

const TooltipColor = styled.span`
  background-color: ${({ color }) => color};
  border: 1px solid #fff;
  border-radius: 50%;
  box-shadow: 0 0 0 1px ${({ theme }) => theme.colors.gray};
  display: inline-block;
  height: 12px;
  width: 12px;
`;

const TooltipInfo = styled.div`
  margin-left: 15px;

  &:not(:last-child) {
    margin-bottom: 10px;
  }

  ${TooltipColor} {
    margin-right: 5px;
  }
`;

function TooltipComponent(props) {
  const {
    _scheduleType,
    annualScheduleTypeDesc,
    className,
    dayIndex,
    name,
    hour,
    monthIndex,
    periods,
    rateType
  } = props;
  const rateTypeTitle = find(SCHEDULE_TABS, { key: rateType }).title;
  const dayOrMonthDesc =
    _scheduleType === 'annual'
      ? `${moment()
          .month(monthIndex)
          .format('MMMM')} / ${annualScheduleTypeDesc}`
      : `${moment()
          .day(dayIndex + 1)
          .format('dddd')} `;

  return (
    <div className={className}>
      {hour.periods.map((period) => {
        const periodIndex = findIndex(periods, {
          _id: period.periodId
        });
        const startHourDesc = moment()
          .hour(period.hour)
          .minute(period.minuteStart)
          .format('h:mm');
        const endHourDesc = moment()
          .hour(period.hour)
          .minute(period.minuteEnd)
          .format('h:mm A');

        return (
          <Fragment key={`${name}-${period.periodId}`}>
            <TooltipHeader>
              {dayOrMonthDesc} / {startHourDesc} - {endHourDesc}
            </TooltipHeader>

            <TooltipInfo>
              <TooltipPeriod>
                <TooltipColor color={RATE_COLORS[periodIndex]} />
                Period {periodIndex + 1} - {rateTypeTitle}
              </TooltipPeriod>

              {periods[periodIndex].rates.map((rate, index) => {
                return (
                  <TooltipTierTextContainer
                    key={`${name}-${period.periodId}-${rate.rate}`}
                  >
                    <TooltipTierTitle>
                      {rate.unitStopValue === 'Infinity'
                        ? `T${index + 1} (${rate.unitStartValue}+ ${
                            rate.unit
                          }): `
                        : `T${index + 1} (${rate.unitStartValue} -
                      ${rate.unitStopValue} ${rate.unit}): `}
                    </TooltipTierTitle>
                    {rate.rate} $/{rate.unit}
                  </TooltipTierTextContainer>
                );
              })}
            </TooltipInfo>
          </Fragment>
        );
      })}
    </div>
  );
}

TooltipComponent.propTypes = propTypes;

export default TooltipComponent;
