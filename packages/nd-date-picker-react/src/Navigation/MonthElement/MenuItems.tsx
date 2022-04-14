import moment from 'moment';
import React from 'react';
import styled from 'styled-components';

import { MenuItem as UnstyledMenuItem } from '@ndustrial/nd-menu-button-react';

export interface MonthMenuItemsProps {
  accentColor: string;
}

export interface YearMenuItemsProps {
  accentColor: string;
  maxDate: moment.Moment;
  minDate: moment.Moment;
}

const MenuItem = styled(({ accentColor, ...props }) => (
  <UnstyledMenuItem {...props} />
))`
  background-color: transparent;
  color: #606060;
  font-size: 14px;
  letter-spacing: 0.25px;
  line-height: 1.4285714286;
  padding: 0 16px;

  &:first-child {
    margin-top: 8px;
  }

  &:last-child {
    margin-bottom: 8px;
  }

  &&&:not(:last-child) {
    border: 0;
  }

  &:focus,
  &:hover {
    background-color: #f5f5f5;
    color: ${({ accentColor }) => accentColor};
    outline: none;
  }
`;

const MenuItemsContainer = styled.div`
  max-height: 256px;
  overflow-y: scroll;
`;

function MonthMenuItems({ accentColor }: MonthMenuItemsProps) {
  const monthsToDisplay = moment.monthsShort();

  return (
    <MenuItemsContainer>
      {monthsToDisplay.map((month, index) => (
        <MenuItem accentColor={accentColor} key={month} value={index}>
          {month}
        </MenuItem>
      ))}
    </MenuItemsContainer>
  );
}

function YearMenuItems({ accentColor, maxDate, minDate }: YearMenuItemsProps) {
  const maxYear = maxDate.year();
  const minYear = minDate.year();
  const yearMenuItems = [];

  for (let year = minYear; maxYear >= year; year++) {
    yearMenuItems.push(
      <MenuItem accentColor={accentColor} key={year}>
        {year}
      </MenuItem>
    );
  }

  return <MenuItemsContainer>{yearMenuItems}</MenuItemsContainer>;
}

export { MonthMenuItems, YearMenuItems };
