import styled from 'styled-components';

import { layoutConstants } from '@ndustrial/nsight-common/constants';
import { blacken } from '@ndustrial/nsight-common/utils/colors';
const {
  NAV_BAR_HEIGHT_MOBILE,
  NAV_BAR_HEIGHT_DESKTOP,
  DEFAULT_HEADER_HEIGHT
} = layoutConstants;

const NavBar = styled.div`
  background-color: ${({ theme }) => blacken(theme.colors.primary, 0.2)};
  bottom: 0;
  height: ${NAV_BAR_HEIGHT_MOBILE}px;
  position: fixed;
  width: 100%;
  z-index: 90;

  @media screen and (min-width: 897px) and (orientation: landscape),
    screen and (min-width: 768px) and (orientation: portrait) {
    bottom: auto;
    height: ${NAV_BAR_HEIGHT_DESKTOP}px;
    top: ${DEFAULT_HEADER_HEIGHT}px;
  }
`;

export { NAV_BAR_HEIGHT_DESKTOP, NAV_BAR_HEIGHT_MOBILE };
export default NavBar;
