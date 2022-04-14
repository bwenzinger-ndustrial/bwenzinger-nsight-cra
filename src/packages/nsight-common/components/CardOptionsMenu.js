import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

import { DotsVertical } from '@ndustrial/nd-icons-svg';
import {
  Button,
  Menu,
  MenuItem,
  Wrapper
} from '@ndustrial/nd-menu-button-react';

const StyledWrapper = styled(Wrapper)`
  position: static;
`;

const OptionsButton = styled(Button)`
  cursor: pointer;
  border: 0;
  padding: 0;
  background-color: rgba(0, 0, 0, 0);

  svg {
    stroke: #979797;
  }

  &:hover,
  &:focus {
    svg {
      stroke: ${({ theme }) => theme.colors.primary};
    }
  }

  &:focus {
    outline: none;
  }
`;

const MenuOptions = styled(Menu)``;

const OptionsMenu = styled.div`
  z-index: 90;

  ${MenuOptions} {
    width: 170px;
    right: 0;

    a {
      text-decoration: none;
      color: ${({ theme }) => theme.colors.primary};
    }

    ${MenuItem}:hover {
      a {
        text-decoration: none;
        /* stylelint-disable-next-line sh-waqar/declaration-use-variable */
        color: #fff;
      }
    }
  }
`;

const propTypes = {
  children: PropTypes.node
};

function CardOptionsMenu({ children }) {
  return (
    <StyledWrapper>
      <OptionsMenu>
        <OptionsButton>
          <DotsVertical />
        </OptionsButton>
        <MenuOptions>{children}</MenuOptions>
      </OptionsMenu>
    </StyledWrapper>
  );
}

CardOptionsMenu.propTypes = propTypes;

export default CardOptionsMenu;
