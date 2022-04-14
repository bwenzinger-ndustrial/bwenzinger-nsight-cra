import styled from 'styled-components';
import {
  Menu as UnstyledMenu,
  MenuItem,
  Wrapper
} from '@ndustrial/nd-menu-button-react';
import DropdownButton from './DropdownButton';
export * from './types';

const Menu = styled(UnstyledMenu)`
  border-top: none;
  margin-top: 0;
`;

export { DropdownButton, Menu, MenuItem, Wrapper };
