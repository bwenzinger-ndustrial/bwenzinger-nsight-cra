import React from 'react';
import {
  Tabs as TabsContainer,
  TabList as TabListContainer,
  Tab as TabContainer,
  TabPanels,
  TabPanel,
  TabsProps
} from '@reach/tabs';
import styled, { css } from 'styled-components';

import { themeHelper } from '@ndustrial/nd-theme-react';

import { rem } from 'polished';
import { NdTabItemProps, NdTabsProps } from './types';

export * from './types';

const TabIconContainer = styled.div`
  border-radius: 50%;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const TabContentDivider = styled.div`
  width: 1px;
  background-color: #d8d8d8;
  margin: 0 12px;
`;

const TabContent = styled.div``;

const TabList = styled(TabListContainer)`
  display: flex;
  width: 100%;
  border-bottom: 1px solid #d8d8d8;
`;

const TabComponent = ({
  children,
  className,
  icon,
  ...props
}: NdTabItemProps) => {
  return (
    <TabContainer className={className} {...props}>
      {icon && (
        <React.Fragment>
          <TabIconContainer>{icon}</TabIconContainer>
          <TabContentDivider />
        </React.Fragment>
      )}
      <TabContent>{children}</TabContent>
    </TabContainer>
  );
};

const Tab = styled(TabComponent)`
  align-items: center;
  background: transparent;
  border: 0;
  border-bottom: 2px solid transparent;
  color: ${({ theme }) => theme.colors.text};
  cursor: pointer;
  display: flex;
  font-size: ${rem('12px', 14)};
  font-weight: 500;
  height: 100%;
  justify-content: ${({ icon }) => (icon ? 'flex-start' : 'center')};
  outline: 0;
  transition: all 0.15s ease-out;

  &:disabled {
    color: ${({ theme }) => themeHelper.whiten(theme.colors.textLight, 0.5)};
    cursor: not-allowed;

    ${TabIconContainer} {
      svg {
        stroke: ${({ theme }) =>
          themeHelper.whiten(theme.colors.textLight, 0.5)};
      }
    }
  }

  &:enabled {
    &:hover {
      color: ${({ theme }) => theme.colors.primary};

      ${TabIconContainer}, ${TabContentDivider} {
        background-color: ${({ theme }) =>
          themeHelper.whiten(theme.colors.primary, 0.9)};
      }
    }

    &[data-selected]:enabled {
      color: ${({ theme }) => theme.colors.primary};
      border-bottom: 2px solid ${({ theme }) => theme.colors.primary};

      ${TabIconContainer} {
        background-color: ${({ theme }) => theme.colors.primary};
        border-bottom: 2px solid ${({ theme }) => theme.colors.primary};

        svg {
          stroke: #fff;
        }
      }

      ${TabContentDivider} {
        background-color: ${({ theme }) =>
          themeHelper.whiten(theme.colors.primary, 0.9)};
      }
    }
  }

  ${TabContent} {
    display: ${({ icon }) => (icon ? 'none' : 'block')};
  }

  @media screen and (min-width: 768px) {
    ${TabContent} {
      display: block;
    }
  }
`;

const Tabs = styled(TabsContainer)<NdTabsProps>`
  ${TabList} {
    height: ${({ $size = '' }) => {
      switch ($size) {
        case 'large':
          return '60px';
        default:
          return '32px';
      }
    }};
  }

  ${Tab} {
    ${({ $size = '' }) => {
      switch ($size) {
        case 'large':
          return css`
            text-transform: uppercase;
            height: ${rem('60px', 14)};

            ${TabIconContainer} {
              height: ${rem('32px', 14)};
              width: ${rem('32px', 14)};

              svg {
                height: ${rem('20px', 14)};
                width: ${rem('20px', 14)};
              }
            }

            ${TabContentDivider} {
              height: ${rem('20px', 14)};
              display: none;
            }

            @media screen and (min-width: 768px) {
              min-width: 150px;

              ${TabContentDivider} {
                display: block;
              }
            }
          `;
        default:
          return css`
            height: ${rem('32px', 14)};

            ${TabIconContainer} {
              height: ${rem('24px', 14)};
              width: ${rem('24px', 14)};

              svg {
                height: ${rem('16px', 14)};
                width: ${rem('16px', 14)};
              }
            }

            ${TabContentDivider} {
              display: none;
              height: ${rem('16px', 14)};
            }

            @media screen and (min-width: 768px) {
              min-width: 100px;

              ${TabContentDivider} {
                display: block;
              }
            }
          `;
      }
    }}
  }
`;

export {
  Tabs,
  TabList,
  Tab,
  TabPanels,
  TabPanel,
  TabIconContainer,
  TabContentDivider
};
