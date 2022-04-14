import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

import { RATE_COLORS } from '../../constants';

const propTypes = {
  className: PropTypes.string,
  colors: PropTypes.arrayOf(PropTypes.string)
};

const defaultProps = {
  colors: RATE_COLORS
};

const getBackground = ({ color }) => {
  return `background-color: ${color}`;
};

const ScaleContainer = styled.div`
  background: #f5f5f5;
  border-bottom: 1px solid #d8d8d8;
  justify-content: center;
  display: flex;
  flex: 0 0 auto;
`;

const HeatmapScale = styled.div`
  display: flex;
  width: 100%;
  max-width: 800px;
  padding: 15px 0;
  background: #f5f5f5;
`;

const HeatmapScaleContainer = styled.div`
  border: 1px solid #d5d5d5;
  border-radius: 6px;
  flex: 1;
  height: 12px;
  padding: 1px;
  width: 100%;
`;

const HeatmapColorsContainer = styled.div`
  border-radius: 6px;
  display: flex;
  height: 100%;
  overflow: hidden;
  width: 100%;
`;

const HeatmapLabel = styled.div`
  color: ${({ theme }) => theme.colors.text};
  font-size: 0.714rem;
  font-weight: 700;
  padding: 0 10px;
  text-transform: uppercase;
`;

const LeftHeatmapLabel = styled(HeatmapLabel)`
  ::before {
    content: 'Low';
  }

  @media screen and (min-width: 897px) {
    ::before {
      content: 'Lowest Rate';
    }
  }
`;

const RightHeatmapLabel = styled(HeatmapLabel)`
  ::before {
    content: 'High';
  }

  @media screen and (min-width: 897px) {
    ::before {
      content: 'Highest Rate';
    }
  }
`;

const HeatmapColorBar = styled.div`
  ${getBackground};
  flex: 1;
`;

const HeatmapScaleComponent = (props) => {
  return (
    <ScaleContainer className={props.className}>
      <HeatmapScale>
        <LeftHeatmapLabel />
        <HeatmapScaleContainer>
          <HeatmapColorsContainer>
            {props.colors.map((color, index) => (
              <HeatmapColorBar key={index} color={color} />
            ))}
          </HeatmapColorsContainer>
        </HeatmapScaleContainer>
        <RightHeatmapLabel />
      </HeatmapScale>
    </ScaleContainer>
  );
};

HeatmapScaleComponent.defaultProps = defaultProps;
HeatmapScaleComponent.propTypes = propTypes;

export { HeatmapScaleComponent as HeatmapScale };
