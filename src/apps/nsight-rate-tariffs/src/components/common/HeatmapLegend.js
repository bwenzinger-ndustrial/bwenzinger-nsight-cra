import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

const propTypes = {
  className: PropTypes.string
};

const TIME_DAY_COLORS = [
  { color: '#125989', label: 'Night' },
  { color: '#3089B3' },
  { color: '#51BBE0', label: 'Day' },
  { color: '#3089B3' },
  { color: '#125989', label: 'Night' }
];

const getBackground = ({ color }) => {
  return `background-color: ${color}`;
};

const LegendContainer = styled.div`
  display: flex;
  justify-content: center;
`;

const HeatmapLegendContainer = styled.div`
  border: 1px solid #d5d5d5;
  border-radius: 6px;
  flex: 1;
  padding: 1px;
  width: 100%;
`;

const HeatmapLegendColorsContainer = styled.div`
  border-radius: 6px;
  display: flex;
  overflow: hidden;
`;

const HeatmapLegendLabel = styled.div`
  display: flex;
  font-size: 0.5rem;
  /* stylelint-disable-next-line sh-waqar/declaration-use-variable */
  color: #fff;
  font-weight: 700;
  justify-content: center;
  letter-spacing: 0.25px;
  padding: 2px 0;
  text-transform: uppercase;
`;

const HeatmapLegendColorBar = styled.div`
  ${getBackground};
  flex: 1;
`;

const HeatmapLegend = (props) => {
  return (
    <LegendContainer className={props.className}>
      <HeatmapLegendContainer>
        <HeatmapLegendColorsContainer>
          {TIME_DAY_COLORS.map((color, index) => (
            <HeatmapLegendColorBar key={index} color={color.color}>
              <HeatmapLegendLabel>{color.label}</HeatmapLegendLabel>
            </HeatmapLegendColorBar>
          ))}
        </HeatmapLegendColorsContainer>
      </HeatmapLegendContainer>
    </LegendContainer>
  );
};

HeatmapLegend.propTypes = propTypes;

export default HeatmapLegend;
