import React from 'react';
import { useSelector } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { rem } from 'polished';
import PropTypes from 'prop-types';
import styled from 'styled-components';

import {
  DropdownButton,
  Menu,
  MenuItem,
  Wrapper
} from '@ndustrial/nd-dropdown-react';

import { DetailSelectorContainer } from '../containers';
import { KPI_ICON_HASH } from '../kpi-config/constants';
import { getPortfolioKpiConfigWithRouter } from '../selectors';

const MenuButton = styled(DropdownButton)`
  align-items: center;
  display: flex;
  padding-left: 8px;
  padding-right: 40px;
`;

const StyledWrapper = styled(Wrapper)`
  height: 30px;

  ${MenuItem} {
    padding: 0;
  }
`;

const Placeholder = styled.span`
  color: ${({ theme }) => theme.colors.text};
  font-size: ${rem('10px')};
  font-weight: 700;
`;

const StyledDetailSelector = styled(DetailSelectorContainer)`
  border: 0;
  font-size: ${rem('10px')};
  height: 32px;

  svg {
    height: 24px;
    width: 24px;
  }
`;

const DividerLine = styled.div`
  /* stylelint-disable-next-line sh-waqar/declaration-use-variable */
  background: #e6e6e6;
  height: ${rem(16, 14)};
  width: 1px;
`;

const KPIText = styled.span`
  color: ${({ theme }) => theme.colors.text};
  font-weight: 700;
  font-size: ${rem('10px')};
  text-transform: uppercase;
`;

const SelectedKPIContainer = styled.div`
  align-items: center;
  display: flex;

  ${DividerLine} {
    margin: 8px;
  }

  svg {
    height: 24px;
    width: 24px;
  }
`;

const propTypes = {
  className: PropTypes.string,
  allKpiConfigs: PropTypes.arrayOf(
    PropTypes.shape({
      daily: PropTypes.shape({
        key: PropTypes.string.isRequired,
        formula: PropTypes.string.isRequired
      }),
      monthly: PropTypes.shape({
        key: PropTypes.string.isRequired,
        formula: PropTypes.string.isRequired
      }),
      label: PropTypes.string.isRequired,
      id: PropTypes.string.isRequired
    })
  ).isRequired
};

function KPIMenu({ className, allKpiConfigs }) {
  const kpiConfig = useSelector(getPortfolioKpiConfigWithRouter);
  const KPIIcon = kpiConfig && KPI_ICON_HASH[kpiConfig.icon];

  return (
    <StyledWrapper className={className}>
      <MenuButton>
        {kpiConfig ? (
          <SelectedKPIContainer>
            <KPIIcon />
            <DividerLine />
            <KPIText>{kpiConfig.label}</KPIText>
          </SelectedKPIContainer>
        ) : (
          <Placeholder>Select a KPI...</Placeholder>
        )}
      </MenuButton>
      <Menu>
        {allKpiConfigs.map((config) => (
          <MenuItem key={config.id}>
            <StyledDetailSelector kpiConfig={config} />
          </MenuItem>
        ))}
      </Menu>
    </StyledWrapper>
  );
}

KPIMenu.propTypes = propTypes;

export default withRouter(KPIMenu);
