import React, { Component, ReactNode } from 'react';
import {
  Button,
  closeMenu,
  Menu as UnstyledMenu,
  MenuItem as UnstyledMenuItem,
  MenuItemProps,
  MenuProps,
  openMenu,
  Wrapper as UnstyledWrapper,
  WrapperProps,
  WrapperState
} from 'react-aria-menubutton';
import styled from 'styled-components';
import { NdMenuButtonReactProps } from './types';
export * from './types';

const Wrapper = styled(UnstyledWrapper)`
  display: flex;
  position: relative;
`;

const MenuItem = styled(UnstyledMenuItem)<MenuItemProps<HTMLElement>>`
  background-color: #fff;
  color: ${({ theme }) => theme.colors.primary};
  cursor: pointer;
  font-size: 1rem;
  font-weight: 400;
  line-height: 1.2;
  padding: 10px;
  transition: all 0.15s ease-out;

  &:focus,
  &:hover {
    background-color: ${({ theme }) => theme.colors.primary};
    color: #fff;
  }
`;

export type MenuButtonReactMenuProps = MenuProps<HTMLElement>;

const Menu = styled(UnstyledMenu)<MenuButtonReactMenuProps>`
  background: #fff;
  border: 1px solid #e6e6e6;
  position: absolute;
  top: 100%;
  width: 100%;
  z-index: 10;

  /* prettier-ignore */
  ${MenuItem}:not(:last-child) {
    border-bottom: 1px solid #f2f2f2;
  }
`;

export interface MenuButtonPassedProps {
  children: any;
  onMenuToggle?: (isOpen: boolean) => void;
}

class StatefulWrapper extends Component<NdMenuButtonReactProps> {
  state = {
    isOpen: false
  };

  handleMenuToggle = ({ isOpen }: WrapperState) => {
    this.setState({ isOpen }, () => {
      if (typeof this.props.onMenuToggle === 'function') {
        this.props.onMenuToggle(isOpen);
      }
    });
  };

  render() {
    const { children, ...restProps } = this.props;

    return (
      <Wrapper {...restProps} onMenuToggle={this.handleMenuToggle}>
        {typeof children === 'function'
          ? children({ isOpen: this.state.isOpen })
          : children}
      </Wrapper>
    );
  }
}

export {
  Button,
  closeMenu,
  Menu,
  MenuItem,
  openMenu,
  StatefulWrapper as Wrapper
};
