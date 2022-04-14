import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

import { MenuItem as NdMenuItem } from '@ndustrial/nd-menu-button-react';
import { blacken } from '@ndustrial/nsight-common/utils/colors';

import ModuleLink from './ModuleLink';

const MenuItemContainer = styled(NdMenuItem)`
  background-color: transparent;
  display: flex;
  padding: 0;

  &:hover {
    cursor: pointer;
  }

  &:hover,
  &:focus {
    background-color: ${({ theme }) => blacken(theme.colors.primary, 0.3)};
  }
`;

const propTypes = {
  className: PropTypes.string,
  label: PropTypes.string.isRequired
};

function MenuItem({ className, label, ...restProps }) {
  return (
    <MenuItemContainer className={className} text={label}>
      <ModuleLink {...restProps} label={label} />
    </MenuItemContainer>
  );
}

MenuItem.propTypes = propTypes;

const StyledMenuItem = styled(MenuItem)``;

export default StyledMenuItem;
