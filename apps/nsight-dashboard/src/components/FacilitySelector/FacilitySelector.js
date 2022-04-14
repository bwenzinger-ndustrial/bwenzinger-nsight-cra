import React, { Component, Fragment } from 'react';
import { rem } from 'polished';
import PropTypes from 'prop-types';
import styled from 'styled-components';

import { Buildings, ChevronDown, ChevronUp } from '@ndustrial/nd-icons-svg';
import {
  Button as NdButton,
  closeMenu,
  openMenu,
  Wrapper as NdWrapper
} from '@ndustrial/nd-menu-button-react';
import { blacken } from '@ndustrial/nsight-common/utils/colors';

import Facilities from './Facilities';
import Loader from './Loader';
import Menu from './Menu';
import Organizations from './Organizations';
import SelectedFacility from './SelectedFacility';

const IconContainer = styled.div`
  align-items: center;
  background-color: ${({ theme }) => blacken(theme.colors.primary, 0.2)};
  border-radius: 100%;
  display: flex;
  height: 30px;
  justify-content: center;
  width: 30px;
`;

const BuildingsIcon = styled(Buildings)`
  stroke: #fff;
`;

const StyledChevronDown = styled(ChevronDown)`
  stroke: #fff;
`;

const StyledChevronUp = styled(ChevronUp)`
  stroke: #fff;
`;

const FacilityContainer = styled.div`
  align-items: center;
  cursor: pointer;
  display: flex;
  flex: 1;
  height: 100%;
  padding: 0 16px;

  ${IconContainer} {
    margin-right: 8px;
  }

  :hover {
    background: #183d5d;
  }
`;

const Wrapper = styled(NdWrapper)`
  align-self: stretch;
  flex-grow: 1;
  max-width: 400px;
  position: static;
  align-items: center;

  @media screen and (min-width: 897px) and (orientation: landscape),
    screen and (min-width: 768px) and (orientation: portrait) {
    position: relative;
  }
`;

const Button = styled(({ isOpen, ...rest }) => <NdButton {...rest} />)`
  align-items: center;
  background: ${({ isOpen }) => (isOpen ? '#183d5d' : 'transparent')};
  display: flex;
  font-size: ${rem('28px')};
  outline: none;
  height: 100%;
  border-left: 1px solid;
  border-right: 1px solid;
  border-color: rgba(255, 255, 255, 0.5);
  padding: 0 16px;
  cursor: pointer;

  :hover {
    background: #183d5d;
  }
`;

const Header = styled.h3`
  /* stylelint-disable-next-line sh-waqar/declaration-use-variable */
  color: #fff;
  font-size: ${rem('14px')};
  font-weight: 300;
  line-height: 1;
  margin: 0;

  @media screen and (min-width: 600px) {
    font-size: ${rem('20px')};
  }
`;

const Placeholder = styled(Header)`
  font-size: ${rem('14px')};

  @media screen and (min-width: 600px) {
    font-size: ${rem('20px')};
  }
`;

const FACILITY_SELECTOR_ID = 'nd-facility-selector';

class FacilitySelector extends Component {
  static propTypes = {
    actions: PropTypes.shape({
      changeRoute: PropTypes.func.isRequired
    }).isRequired,
    className: PropTypes.string,
    facilities: PropTypes.array,
    facilityGroupings: PropTypes.array,
    history: PropTypes.shape({
      location: PropTypes.shape({
        pathname: PropTypes.string.isRequired
      }).isRequired
    }).isRequired,
    isLoadingFacilities: PropTypes.bool,
    isLoadingOrganizations: PropTypes.bool,
    organizations: PropTypes.array,
    selectedFacility: PropTypes.object,
    selectedOrganization: PropTypes.object
  };

  state = {
    openGroupingIds: [],
    isOpen: false
  };

  handleGroupingSelection(value) {
    this.setState((prevState) => {
      const isOpen = prevState.openGroupingIds.indexOf(value.id) !== -1;

      return {
        openGroupingIds: isOpen
          ? prevState.openGroupingIds.filter((id) => id !== value.id)
          : prevState.openGroupingIds.concat([value.id])
      };
    });
  }

  handleMenuToggle = (isOpen) => {
    this.setState({ isOpen, openGroupingIds: [] });
  };

  navigateToDashboard = () => {
    const { selectedFacility, selectedOrganization, actions } = this.props;
    actions.changeRoute({
      pathname: '/facility-dashboard',
      search: `organization=${selectedOrganization.slug}&facility=${selectedFacility.slug}`
    });
  };

  toggleMenu = () => {
    if (this.state.isOpen) {
      closeMenu(FACILITY_SELECTOR_ID);
    } else {
      openMenu(FACILITY_SELECTOR_ID);
    }
  };

  // Creating this function so handleSelection can be tested appropriately
  closeMenu() {
    closeMenu(FACILITY_SELECTOR_ID);
  }

  handleSelection = (value) => {
    switch (value.type) {
      case 'facility':
        return this.closeMenu();

      case 'grouping':
        return this.handleGroupingSelection(value);

      // while on a page that doesn't need a facility close the menu once an
      // organization is selected
      case 'organization':
        return this.closeMenu();
    }
  };

  render() {
    const {
      facilities,
      facilityGroupings,
      isLoadingFacilities,
      isLoadingOrganizations,
      organizations,
      selectedFacility,
      selectedOrganization
    } = this.props;

    const { isOpen, openGroupingIds } = this.state;
    const showOrganization = organizations.length > 1;
    const handleClick = selectedFacility
      ? this.navigateToDashboard
      : this.toggleMenu;

    return (
      <Wrapper
        className={this.props.className}
        closeOnBlur={true}
        closeOnSelection={false}
        id={FACILITY_SELECTOR_ID}
        onMenuToggle={this.handleMenuToggle}
        onSelection={this.handleSelection}
      >
        {isLoadingFacilities || isLoadingOrganizations ? (
          <Loader />
        ) : (
          <Fragment>
            <FacilityContainer
              id="facilityButton"
              role="button"
              onClick={handleClick}
            >
              <IconContainer>
                <BuildingsIcon />
              </IconContainer>
              {selectedFacility ? (
                <SelectedFacility
                  facility={selectedFacility}
                  organization={selectedOrganization}
                />
              ) : (
                <Placeholder>
                  Click here to select
                  {showOrganization && !selectedOrganization
                    ? ' an organization'
                    : ' a facility'}
                </Placeholder>
              )}
            </FacilityContainer>
            <Button isOpen={isOpen}>
              {isOpen ? <StyledChevronUp /> : <StyledChevronDown />}
            </Button>
            <Menu>
              {!selectedOrganization ? (
                <Organizations organizations={organizations} />
              ) : (
                <Facilities
                  facilities={facilities}
                  facilityGroupings={facilityGroupings}
                  openGroupingIds={openGroupingIds}
                  organization={selectedOrganization}
                  showOrganization={showOrganization}
                  onFacilitySelected={this.closeMenu}
                />
              )}
            </Menu>
          </Fragment>
        )}
      </Wrapper>
    );
  }
}

export default FacilitySelector;
