import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

import { SecondaryButton } from '@ndustrial/nd-button-react';
import { ToggleGroup, ToggleOption } from '@ndustrial/nd-toggle-group-react';
import { Tooltip as UnstyledTooltip } from '@ndustrial/nd-tooltip-react';
import { TooltipIcon } from '@ndustrial/nsight-common/components';

const Tooltip = styled(UnstyledTooltip)``;

const KpiLabel = styled.div`
  color: ${({ theme }) => theme.colors.textLight};
  display: none;
  font-weight: 300;
  letter-spacing: 0.5;
  text-transform: uppercase;

  @media screen and (min-width: 897px) and (orientation: landscape),
    screen and (min-width: 768px) and (orientation: portrait) {
    align-items: center;
    display: flex;
  }

  ${Tooltip} {
    margin-left: 10px;
  }
`;

const Container = styled.div`
  align-items: center;
  display: flex;
  justify-content: center;
  position: relative;

  ${KpiLabel} {
    left: 0;
    position: absolute;
  }
`;

const ResetZoomButton = styled(SecondaryButton)`
  position: absolute;
  right: 0;
  margin-right: 12px;
  font-weight: normal;
  font-size: 12px;
  padding: 8px 30px;
`;

const propTypes = {
  isZoomed: PropTypes.bool,
  kpi: PropTypes.shape({
    label: PropTypes.string.isRequired,
    tooltip: PropTypes.string.isRequired
  }).isRequired,
  resetZoom: PropTypes.func.isRequired,
  setIsZoomed: PropTypes.func.isRequired,
  setView: PropTypes.func.isRequired,
  view: PropTypes.string.isRequired
};

export function DetailKpiBreakdownHeader({
  isZoomed,
  kpi,
  resetZoom,
  setView,
  view
}) {
  return (
    <Container>
      <KpiLabel>
        <span>{kpi.label}</span>
        <Tooltip content={kpi.tooltip} placement="right" tagName="span">
          <TooltipIcon />
        </Tooltip>
      </KpiLabel>
      <ToggleGroup>
        <ToggleOption
          isSelected={view === 'table'}
          onClick={() => setView('table')}
          size="small"
        >
          Table
        </ToggleOption>
        <ToggleOption
          isSelected={view === 'graph'}
          onClick={() => setView('graph')}
          size="small"
        >
          Graph
        </ToggleOption>
      </ToggleGroup>
      {isZoomed && view === 'graph' && (
        <ResetZoomButton onClick={resetZoom}>Reset Zoom</ResetZoomButton>
      )}
    </Container>
  );
}

DetailKpiBreakdownHeader.propTypes = propTypes;
