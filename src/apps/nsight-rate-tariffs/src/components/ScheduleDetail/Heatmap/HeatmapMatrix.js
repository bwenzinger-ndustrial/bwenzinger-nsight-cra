import React from 'react';
import { findIndex } from 'lodash';
import { rem } from 'polished';
import PropTypes from 'prop-types';
import styled from 'styled-components';

import { Tooltip, useSingleton } from '@ndustrial/nd-tooltip-react';

import { RATE_COLORS } from '../../../constants';
import HeatmapLegend from '../../common/HeatmapLegend';
import TooltipComponent from './TooltipComponent';

const propTypes = {
  _scheduleType: PropTypes.string.isRequired,
  annualScheduleTypeDesc: PropTypes.string,
  heatmap: PropTypes.arrayOf(
    PropTypes.shape({
      dayIndex: PropTypes.number,
      hours: PropTypes.arrayOf(
        PropTypes.shape({
          id: PropTypes.number.isRequired,
          periods: PropTypes.arrayOf(
            PropTypes.shape({
              hour: PropTypes.number.isRequired,
              periodId: PropTypes.number.isRequired,
              minuteEnd: PropTypes.number.isRequired,
              minuteStart: PropTypes.number.isRequired
            })
          ).isRequired
        })
      ).isRequired,
      monthIndex: PropTypes.number,
      name: PropTypes.string.isRequired
    })
  ).isRequired,
  periods: PropTypes.arrayOf(
    PropTypes.shape({
      _id: PropTypes.number.isRequired
    })
  ).isRequired,
  rateType: PropTypes.string.isRequired
};

const HOURS_OF_DAY = [
  '12a',
  '1a',
  '2a',
  '3a',
  '4a',
  '5a',
  '6a',
  '7a',
  '8a',
  '9a',
  '10a',
  '11a',
  '12p',
  '1p',
  '2p',
  '3p',
  '4p',
  '5p',
  '6p',
  '7p',
  '8p',
  '9p',
  '10p',
  '11p'
];

const HeatmapContainer = styled.div`
  margin-bottom: -12px;
  padding-bottom: 12px;
  overflow-x: scroll;
  width: 100%;
`;

const HeatmapContent = styled.div`
  display: inline-grid;
  grid-template-columns: auto 1fr;
  grid-column-gap: 5px;
  grid-row-gap: 5px;
  min-width: 700px;
  width: 100%;
`;

const HeatmapSpacer = styled.div`
  background: transparent;
`;

const HeatmapYAxis = styled.div`
  display: flex;
  flex: 1;
  flex-direction: column;
  justify-content: space-around;
  text-transform: uppercase;
`;

const HeatmapXAxis = styled.div`
  display: flex;
  flex: 1;
  justify-content: space-around;
`;

const Heatmap = styled.div`
  display: flex;
  flex-direction: column;
`;

const HeatmapRow = styled.div`
  align-items: stretch;
  display: flex;
  flex: 1;
  justify-content: space-around;
  margin: 1px;
`;

const HeatmapCellContainer = styled.div`
  border: 1px solid ${({ theme }) => theme.colors.gray};
  display: flex;
  flex: 1;
  margin: 1px;
  padding: 2px;
  position: relative;

  &:hover {
    border: 1px solid ${({ theme }) => theme.colors.primary};
  }

  &::before {
    content: '';
    float: left;
    padding-top: 100%;
  }
`;

const HeatmapCell = styled.div`
  display: flex;
  flex: 1;
`;

const HeatmapCellInfo = styled.div`
  align-items: center;
  background-color: ${({ color }) => color};
  /* stylelint-disable-next-line sh-waqar/declaration-use-variable */
  color: #fff;
  display: flex;
  flex: 1;
  font-size: ${rem('14px')};
  justify-content: center;
`;

const HeatmapLabel = styled.div`
  color: ${({ theme }) => theme.colors.text};
  font-size: 0.6rem;
  font-family: ${({ theme }) => theme.fonts.primary};
  font-weight: 700;
`;

const HeatmapXAxisLabel = styled(HeatmapLabel)`
  text-align: center;
  width: 100%;
`;

const HeatmapYAxisLabel = styled(HeatmapLabel)`
  text-align: right;
  display: flex;
  justify-content: center;
  flex-direction: column;
`;

const TooltipContainer = styled(({ periodCount, ...props }) => (
  <Tooltip {...props} />
))`
  display: flex;
  flex: 1;
  line-height: ${rem('14px')};

  ${({ periodCount }) =>
    periodCount > 1 &&
    `
    ${HeatmapCellInfo} {
      font-size: ${rem('12px')};
    }
  }
`}
`;

function HeatmapMatrix(props) {
  const {
    _scheduleType,
    annualScheduleTypeDesc,
    heatmap,
    periods,
    rateType
  } = props;

  const singleton = useSingleton();

  return (
    <HeatmapContainer>
      <HeatmapContent>
        <HeatmapSpacer />
        <HeatmapLegend />
        <HeatmapSpacer />

        <HeatmapXAxis>
          {HOURS_OF_DAY.map((hour) => {
            return <HeatmapXAxisLabel key={hour}>{hour}</HeatmapXAxisLabel>;
          })}
        </HeatmapXAxis>

        <HeatmapYAxis>
          {heatmap.map((dayOrMonth) => {
            return (
              <HeatmapYAxisLabel key={dayOrMonth.name}>
                {dayOrMonth.name}
              </HeatmapYAxisLabel>
            );
          })}
        </HeatmapYAxis>

        <Heatmap>
          {heatmap.map((dayOrMonth) => {
            return (
              <HeatmapRow key={`${dayOrMonth.name}`}>
                {dayOrMonth.hours.map((hour) => {
                  return (
                    <TooltipContainer
                      content={
                        <TooltipComponent
                          _scheduleType={_scheduleType}
                          annualScheduleTypeDesc={annualScheduleTypeDesc}
                          dayIndex={dayOrMonth.dayIndex}
                          hour={hour}
                          monthIndex={dayOrMonth.monthIndex}
                          name={dayOrMonth.name}
                          periods={periods}
                          rateType={rateType}
                        />
                      }
                      key={`${dayOrMonth.name}-${hour.id + 1}`}
                      periodCount={hour.periods.length}
                      singleton={singleton}
                      tagName="span"
                    >
                      <HeatmapCellContainer>
                        {hour.periods.map((period) => {
                          const periodIndex = findIndex(periods, {
                            _id: period.periodId
                          });

                          return (
                            <HeatmapCell
                              key={`${dayOrMonth.name}-${hour.id + 1}-${
                                period.periodId
                              }`}
                            >
                              <HeatmapCellInfo color={RATE_COLORS[periodIndex]}>
                                {periodIndex + 1}
                              </HeatmapCellInfo>
                            </HeatmapCell>
                          );
                        })}
                      </HeatmapCellContainer>
                    </TooltipContainer>
                  );
                })}
              </HeatmapRow>
            );
          })}
        </Heatmap>
      </HeatmapContent>
    </HeatmapContainer>
  );
}

HeatmapMatrix.propTypes = propTypes;

export default HeatmapMatrix;
