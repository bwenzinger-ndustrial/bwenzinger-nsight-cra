import styled from 'styled-components';

import { Menu as NdMenu } from '@ndustrial/nd-menu-button-react';
import { layoutConstants } from '@ndustrial/nsight-common/constants';
import { blacken } from '@ndustrial/nsight-common/utils/colors';
const { DEFAULT_HEADER_HEIGHT } = layoutConstants;

const Menu = styled(NdMenu)`
  background-color: ${({ theme }) => blacken(theme.colors.primary, 0.2)};
  border: 0;
  max-height: calc(100vh - ${DEFAULT_HEADER_HEIGHT}px);
  padding: 10px;
  top: calc(100% - 1px);
`;

export default Menu;
