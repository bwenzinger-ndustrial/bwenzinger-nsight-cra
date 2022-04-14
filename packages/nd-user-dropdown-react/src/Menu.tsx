import styled, { css, keyframes } from 'styled-components';
import { Menu as UnstyledMenu } from '@ndustrial/nd-menu-button-react';
import createSanitizedComponent from './createSanitizedComponent';
import MenuItem from './MenuItem';
import { NdUserDropdownSanitizedMenuProps } from './types';

const itemBorderStyle = '1px solid #e6e6e6';

const slideIn = keyframes`
  0% {
    opacity: 0;
  }
  1% {
    max-height: 0px;
    opacity: 0;
    transform: translateY(10px);
  }
  100% {
    max-height: 1000px;
    opacity: 1;
    transform: translateY(0);
  }
`;

const slideOut = keyframes`
  0% {
    opacity: 1;
  }
  99% {
    max-height: 1000px;
    opacity: 0;
    transform: translateY(10px);
  }
  100% {
    max-height: 0px;
    opacity: 0;
    display: none;
  }
`;

const slideInAnimation = () => css`
  ${slideIn} 200ms 1 normal cubic-bezier(0.165, 0.840, 0.440, 1) forwards;
`;

const slideOutAnimation = () => css`
  ${slideOut} 200ms 1 normal cubic-bezier(0.165, 0.840, 0.440, 1) forwards;
`;

const Menu = styled(
  createSanitizedComponent(UnstyledMenu)
)<NdUserDropdownSanitizedMenuProps>`
  animation: ${({ isOpen }) => (isOpen ? slideInAnimation : slideOutAnimation)};
  border: 0;
  right: 0;
  white-space: nowrap;
  width: auto;

  @media screen and (min-width: 550px) {
    white-space: normal;
    width: 100%;
  }

  ${MenuItem} {
    border-left: ${itemBorderStyle};
    border-right: ${itemBorderStyle};

    &:first-of-type {
      border-top: ${itemBorderStyle};
    }

    &:last-of-type {
      border-bottom: ${itemBorderStyle};
    }

    &:hover,
    &:focus {
      border-color: ${({ theme }) => theme.colors.primary};
    }
  }
`;

export default Menu;
