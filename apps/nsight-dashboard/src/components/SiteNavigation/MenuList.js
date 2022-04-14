import React from 'react';
import Rect from '@reach/rect';
import PropTypes from 'prop-types';
import styled from 'styled-components';

import { Menu as NdMenu } from '@ndustrial/nd-menu-button-react';
import { blacken, whiten } from '@ndustrial/nsight-common/utils/colors';

import MenuItem from './MenuItem';

const Menu = styled(NdMenu)`
  background-color: ${({ theme }) => blacken(theme.colors.primary, 0.2)};
  border: 0;
  max-height: calc(100vh - 70px);
  overflow-y: scroll;
  padding: 10px 0;

  @media screen and (min-width: 897px) and (orientation: landscape),
    screen and (min-width: 768px) and (orientation: portrait) {
    max-height: initial;
    overflow: auto;
    white-space: nowrap;
    width: auto;
  }

  ${MenuItem} {
    position: relative;

    &:not(:last-child) {
      border: 0;
    }

    &::before,
    &:last-child::after {
      content: '';
      background-color: ${({ theme }) => whiten(theme.colors.primary, 0.1)};
      position: absolute;
      width: calc(100% - 20px);
      left: 50%;
      transform: translateX(-50%);
      height: 1px;
    }

    &::before {
      top: 0;
    }

    &:focus,
    &:hover,
    &:focus + ${MenuItem},
    /* prettier-ignore */ /* prettier tries to reformat this to be combined with the previous line */
    &:hover + ${MenuItem} {
      &::before {
        display: none;
      }
    }

    &:last-child {
      &::after {
        top: 100%;
      }

      &:focus::after,
      &:hover::after {
        display: none;
      }
    }
  }
`;

const propTypes = {
  buttonRect: PropTypes.shape({
    left: PropTypes.number,
    right: PropTypes.number
  }),
  children: PropTypes.node.isRequired,
  handleMenuRectChange: PropTypes.func.isRequired,
  menuRect: PropTypes.shape({
    width: PropTypes.number
  })
};

function getMenuPositioning(buttonRect, menuRect) {
  const isLandscape = window.innerWidth > window.innerHeight;
  const tableBreakpointWidth = isLandscape ? 897 : 768;
  const styles = {
    bottom: 'auto',
    left: 0,
    top: '100%'
  };

  if (window.innerWidth < tableBreakpointWidth) {
    return {
      ...styles,
      bottom: '70px',
      left: 0,
      top: 'auto'
    };
  }

  if (!buttonRect || !menuRect) {
    return {
      ...styles,
      opacity: 0
    };
  }

  const collisions = {
    left: buttonRect.left - menuRect.width < 0,
    right: window.innerWidth < buttonRect.left + menuRect.width
  };

  return {
    ...styles,
    left:
      collisions.right && !collisions.left
        ? `${buttonRect.right - menuRect.width}px`
        : `${buttonRect.left}px`
  };
}

function MenuList(props) {
  const {
    buttonRect,
    children,
    handleMenuRectChange,
    menuRect,
    ...rest
  } = props;

  return (
    <Menu {...rest} style={getMenuPositioning(buttonRect, menuRect)}>
      <Rect onChange={handleMenuRectChange}>
        {({ ref }) => <div ref={ref}>{children}</div>}
      </Rect>
    </Menu>
  );
}

MenuList.propTypes = propTypes;

export default MenuList;
