import PropTypes from 'prop-types';
import React, { Component, Fragment } from 'react';
import styled from 'styled-components';
import { Wrapper as UnstyledWrapper } from '@ndustrial/nd-menu-button-react';
import Button from './Button';
import Menu from './Menu';
import MenuItem from './MenuItem';
import { NdUserDropDownProps } from './types';

const Wrapper = styled(UnstyledWrapper)`
  display: inline-flex;
  flex-direction: column;
`;

class UserDropdown extends Component<NdUserDropDownProps> {
  render() {
    return (
      <Wrapper
        className={this.props.className}
        onSelection={this.props.onSelection}
      >
        {({ isOpen }: { isOpen: boolean }) => (
          <Fragment>
            <Button
              avatarSrc={this.props.avatarSrc}
              isOpen={isOpen}
              userName={this.props.userName}
            />
            <Menu isOpen={isOpen}>{this.props.children}</Menu>
          </Fragment>
        )}
      </Wrapper>
    );
  }
}

export { UserDropdown, MenuItem as UserDropdownItem };
