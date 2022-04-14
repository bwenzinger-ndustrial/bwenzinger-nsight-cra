import React, { Component } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

import { Header as NdHeader } from '@ndustrial/nd-header-react';
import nsightLogo from '@ndustrial/nd-icons-svg/icons/nsight-logo.svg';
import {
  UserDropdown,
  UserDropdownItem
} from '@ndustrial/nd-user-dropdown-react';
import { getSearchString } from '@ndustrial/nsight-common/utils';

import { MODULE_PATHS_WITHOUT_FACILITY } from '../constants';
import FacilitySelector from '../containers/FacilitySelector';

const StyledFacilitySelector = styled(FacilitySelector)``;
const StyledUserDropdown = styled(UserDropdown)``;

const StyledHeader = styled(NdHeader)`
  box-shadow: none;
  position: fixed;
  top: 0;
  z-index: 100;

  ${StyledFacilitySelector} {
    margin-right: 16px;
  }

  ${StyledUserDropdown} {
    margin-right: 16px;
  }
`;

class Header extends Component {
  static propTypes = {
    actions: PropTypes.shape({
      user: PropTypes.shape({
        logOutUser: PropTypes.func.isRequired
      }).isRequired
    }).isRequired,
    defaultApplicationRoute: PropTypes.string,
    location: PropTypes.shape({
      search: PropTypes.string.isRequired
    }).isRequired,
    selectedOrganization: PropTypes.shape({
      slug: PropTypes.string.isRequired
    }),
    user: PropTypes.shape({
      name: PropTypes.string,
      picture: PropTypes.string
    }).isRequired
  };

  handleSelection = (value) => {
    switch (value) {
      case 'logOut':
        return this.props.actions.user.logOutUser();
    }
  };

  render() {
    const homePath = {
      pathname: this.props.defaultApplicationRoute
        ? `/${this.props.defaultApplicationRoute}`
        : '/',
      search:
        MODULE_PATHS_WITHOUT_FACILITY.indexOf(
          `/${this.props.defaultApplicationRoute}`
        ) !== -1
          ? getSearchString({
              searchString: this.props.location.search,
              removeParams: ['facility']
            })
          : this.props.location.search
    };

    return (
      <StyledHeader appName="nSight" homePath={homePath} logoSrc={nsightLogo}>
        <StyledFacilitySelector />
        <StyledUserDropdown
          avatarSrc={this.props.user.picture}
          onSelection={this.handleSelection}
          userName={this.props.user.name}
        >
          <UserDropdownItem value="logOut">Log Out</UserDropdownItem>
        </StyledUserDropdown>
      </StyledHeader>
    );
  }
}

export default Header;
