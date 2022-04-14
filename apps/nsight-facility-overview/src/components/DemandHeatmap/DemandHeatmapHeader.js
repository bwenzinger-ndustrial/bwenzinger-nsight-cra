import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

import { ToggleGroup, ToggleOption } from '@ndustrial/nd-toggle-group-react';

const Container = styled.div`
  display: flex;
  justify-content: center;
  position: absolute;
  margin: 25px 0 30px;

  @media screen and (min-width: 897px) and (orientation: landscape),
    screen and (min-width: 768px) and (orientation: portrait) {
    margin: 10px 0 20px;
  }
`;

const propTypes = {
  setHeatmapTab: PropTypes.func.isRequired,
  view: PropTypes.string.isRequired
};

export function DemandHeatmapHeader({ setHeatmapTab, view }) {
  return (
    <Container>
      <ToggleGroup>
        <ToggleOption
          isSelected={view === 'weekly'}
          size="small"
          onClick={() => setHeatmapTab('weekly')}
        >
          Weekly
        </ToggleOption>
        <ToggleOption
          isSelected={view === 'daily'}
          size="small"
          onClick={() => setHeatmapTab('daily')}
        >
          Daily
        </ToggleOption>
      </ToggleGroup>
    </Container>
  );
}

DemandHeatmapHeader.propTypes = propTypes;

export default DemandHeatmapHeader;
