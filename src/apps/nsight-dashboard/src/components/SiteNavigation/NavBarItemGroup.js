import styled from 'styled-components';

import { whiten } from '@ndustrial/nsight-common/utils/colors';

import { TopLevelModuleLink } from './ModuleLink';
import { NavBarItemButton, NavBarItemWrapper } from './NavBarItem';

const NavBarItemGroup = styled.div`
  display: flex;
  width: 100%;
  height: 100%;
  overflow-x: auto;

  ${NavBarItemButton},
  ${TopLevelModuleLink} {
    border: 0 solid transparent;
    border-left-color: ${({ theme }) => whiten(theme.colors.primary, 0.1)};
    border-left-width: 1px;
    border-right-width: 1px;
  }

  /* stylelint-disable selector-no-qualifying-type */
  ${NavBarItemButton}:hover,
  ${NavBarItemButton}:focus,
  ${TopLevelModuleLink}:hover,
  ${TopLevelModuleLink}:focus,
  ${TopLevelModuleLink}:first-child,
  ${NavBarItemWrapper}:first-child ${NavBarItemButton},
  ${NavBarItemWrapper}[data-expanded='true'] ${NavBarItemButton},
  ${NavBarItemWrapper}:hover + ${NavBarItemWrapper} ${NavBarItemButton},
  ${NavBarItemWrapper}:focus + ${NavBarItemWrapper} ${NavBarItemButton},
  ${NavBarItemWrapper}:hover + ${TopLevelModuleLink},
  ${NavBarItemWrapper}:focus + ${TopLevelModuleLink},
  ${TopLevelModuleLink}:hover + ${TopLevelModuleLink},
  ${TopLevelModuleLink}:focus + ${TopLevelModuleLink},
  ${NavBarItemWrapper}[data-expanded='true'] + ${NavBarItemWrapper} ${NavBarItemButton} {
    border-left-color: transparent;
  }
  /* stylelint-enable selector-no-qualifying-type */

  @media screen and (min-width: 897px) and (orientation: landscape),
    screen and (min-width: 768px) and (orientation: portrait) {
    ${NavBarItemWrapper}:last-child {
      ${NavBarItemButton} {
        border-right-color: ${({ theme }) => whiten(theme.colors.primary, 0.1)};
      }

      /* stylelint-disable selector-no-qualifying-type */
      &:hover ${NavBarItemButton},
      &:focus ${NavBarItemButton},
      &[data-expanded='true'] ${NavBarItemButton} {
        border-right-color: transparent;
      }
      /* stylelint-enable selector-no-qualifying-type */
    }

    ${TopLevelModuleLink}:last-child {
      border-right-color: ${({ theme }) => whiten(theme.colors.primary, 0.1)};

      &:hover,
      &:focus {
        border-right-color: transparent;
      }
    }
  }
`;

export default NavBarItemGroup;
