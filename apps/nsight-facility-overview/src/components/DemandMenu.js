import React, { Fragment } from 'react';
import { withRouter } from 'react-router-dom';
import { rem } from 'polished';
import PropTypes from 'prop-types';
import queryString from 'qs';
import styled from 'styled-components';

import {
  DropdownButton,
  Menu,
  MenuItem as Item,
  Wrapper
} from '@ndustrial/nd-dropdown-react';

import { DEMAND_MENU_OPTIONS } from '../constants';

const StyledWrapper = styled(Wrapper)`
  min-width: 225px;
`;

const MenuButton = styled(DropdownButton)`
  align-items: center;
  display: flex;
  padding-left: 8px;
  padding-right: 40px;
`;

const MenuItem = styled(({ isSelected, ...rest }) => <Item {...rest} />)`
  font-weight: ${({ isSelected }) => (isSelected ? 700 : 'inherit')};
`;

const DividerLine = styled.div`
  /* stylelint-disable-next-line sh-waqar/declaration-use-variable */
  background: #e6e6e6;
  height: ${rem(16, 14)};
  width: 1px;
`;

const propTypes = {
  className: PropTypes.string,
  location: PropTypes.shape({
    search: PropTypes.string.isRequired
  }),
  selectedDemandView: PropTypes.string.isRequired,
  setDemandView: PropTypes.func
};

function DemandMenu({ className, location, setDemandView }) {
  const currentParams = queryString.parse(location.search, {
    ignoreQueryPrefix: true
  });
  const demandSelection = currentParams.demandView || 'comparison';

  return (
    <StyledWrapper
      className={className}
      onSelection={(demandSelection) => setDemandView(demandSelection)}
    >
      <MenuButton>
        {demandSelection ? (
          <Fragment>
            <DividerLine />
            <span>{DEMAND_MENU_OPTIONS[demandSelection]}</span>
          </Fragment>
        ) : (
          ''
        )}
      </MenuButton>
      <Menu>
        <MenuItem
          isSelected={demandSelection === 'comparison'}
          key="comparison"
          text="Demand Comparison"
          value="comparison"
        >
          Demand Comparison
        </MenuItem>
        <MenuItem
          isSelected={demandSelection === 'heatmap'}
          key="heatmap"
          text="Demand Heatmap"
          value="heatmap"
        >
          Demand Heatmap
        </MenuItem>
        <MenuItem
          isSelected={demandSelection === 'daily_kwh'}
          key="facility_daily_electricity_usage"
          text="Daily Kwh"
          value="facility_daily_electricity_usage"
        >
          Daily kWh
        </MenuItem>
      </Menu>
    </StyledWrapper>
  );
}

DemandMenu.propTypes = propTypes;

export default withRouter(DemandMenu);
