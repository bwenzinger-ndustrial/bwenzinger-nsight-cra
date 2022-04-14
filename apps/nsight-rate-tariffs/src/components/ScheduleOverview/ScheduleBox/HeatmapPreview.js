import React from 'react';
import { findIndex } from 'lodash';
import PropTypes from 'prop-types';
import styled from 'styled-components';

import { RATE_COLORS } from '../../../constants';
import UnstyledHeatmapLegend from '../../common/HeatmapLegend';

const propTypes = {
  heatmap: PropTypes.arrayOf(
    PropTypes.shape({
      dayIndex: PropTypes.number.isRequired,
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
      name: PropTypes.string.isRequired
    })
  ).isRequired,
  periods: PropTypes.arrayOf(
    PropTypes.shape({
      _id: PropTypes.number.isRequired
    })
  ).isRequired
};

const HeatmapSpacer = styled.div`
  background: transparent;
`;

const HeatmapLegend = styled(UnstyledHeatmapLegend)``;

const HeatmapContainer = styled.div`
  display: inline-grid;
  width: 100%;
  grid-template-columns: auto 1fr;
  grid-column-gap: 4px;
  grid-row-gap: 4px;

  ${HeatmapLegend} {
    margin-bottom: 8px;
  }
`;

const HeatmapYAxis = styled.div`
  display: flex;
  flex: 1;
  flex-direction: column;
  justify-content: space-around;
  padding: 3px 0;
`;

const Heatmap = styled.div`
  background: #fff;
  display: flex;
  flex-direction: column;
  flex: 1;
  justify-content: space-around;
  padding: 2px;
  border: 1px solid ${({ theme }) => theme.colors.gray};
`;

const HeatmapRow = styled.div`
  align-items: center;
  display: flex;
  flex: 1;
  justify-content: space-around;
`;

const HeatmapCell = styled.div`
  background-color: ${({ color }) => color};
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
`;

const HeatmapCellContainer = styled.div`
  border: 1px solid #fff;
  display: flex;
  flex: 1;

  @media screen and (min-width: 400px) {
    border: 2px solid #fff;
  }
`;

const HeatmapAspectRatio = styled.div`
  width: 100%;
  padding-top: 100%;
  position: relative;
`;

const HeatmapLabel = styled.div`
  color: ${({ theme }) => theme.colors.text};
  font-size: 0.6rem;
  padding: 2px 0;
  font-weight: 700;
  font-family: ${({ theme }) => theme.fonts.primary};
  text-align: right;
  text-transform: uppercase;
`;

function HeatmapPreview(props) {
  return (
    <HeatmapContainer>
      <HeatmapSpacer />
      <HeatmapLegend />

      <HeatmapYAxis>
        {props.heatmap.map((dayOfWeek) => {
          return (
            <HeatmapLabel key={dayOfWeek.name}>{dayOfWeek.name}</HeatmapLabel>
          );
        })}
      </HeatmapYAxis>

      <Heatmap>
        {props.heatmap.map((dayOfWeek) => {
          return (
            <HeatmapRow key={`${dayOfWeek.name}`}>
              {dayOfWeek.hours.map((hourOfDay) => {
                return (
                  <HeatmapCellContainer
                    key={`${dayOfWeek.name}-${hourOfDay.id + 1}`}
                    periodCount={hourOfDay.periods.length}
                  >
                    {hourOfDay.periods.map((period) => {
                      const periodIndex = findIndex(props.periods, {
                        _id: period.periodId
                      });

                      return (
                        <HeatmapAspectRatio
                          key={`${dayOfWeek.name}-${hourOfDay.id + 1}-${
                            period.periodId
                          }`}
                        >
                          <HeatmapCell color={RATE_COLORS[periodIndex]} />
                        </HeatmapAspectRatio>
                      );
                    })}
                  </HeatmapCellContainer>
                );
              })}
            </HeatmapRow>
          );
        })}
      </Heatmap>
    </HeatmapContainer>
  );
}

HeatmapPreview.propTypes = propTypes;

export default HeatmapPreview;
