import React from 'react';
import { rem } from 'polished';
import PropTypes from 'prop-types';
import styled from 'styled-components';

import { MenuItem as NdMenuItem } from '@ndustrial/nd-menu-button-react';
import { blacken } from '@ndustrial/nsight-common/utils/colors';

const propTypes = {
  children: PropTypes.node,
  className: PropTypes.string,
  level: PropTypes.number,
  name: PropTypes.string.isRequired,
  value: PropTypes.object.isRequired
};

const defaultProps = {
  level: 0
};

const Item = styled(NdMenuItem)`
  background-color: ${({ level, theme }) =>
    blacken(theme.colors.primary, 0.2 * (0.3 * (level + 1)))};
  /* stylelint-disable-next-line sh-waqar/declaration-use-variable */
  color: #fff;
  display: flex;
  font-size: ${rem('12px')};
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  font-weight: 900;
  letter-spacing: ${rem('0.5px')};
  padding: 10px;
  padding-left: ${({ level }) => 10 + level * 10}px;
  vertical-align: middle;

  :focus,
  :hover {
    background-color: ${({ level, theme }) =>
      blacken(theme.colors.primary, 0.2 * (0.3 * (level + 1)) + 0.1)};
  }
`;

function MenuItem({ children, className, level, name, value }) {
  return (
    <Item className={className} level={level} text={name} value={value}>
      {children}
    </Item>
  );
}

MenuItem.propTypes = propTypes;
MenuItem.defaultProps = defaultProps;

export default MenuItem;
