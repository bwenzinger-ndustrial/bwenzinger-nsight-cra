import { useRect } from '@reach/rect';
import React, { Fragment, useCallback, useRef, useState } from 'react';
import { Portal } from 'react-portal';
import styled, { css } from 'styled-components';

import { ChevronDown } from '@ndustrial/nd-icons-svg';
import {
  Button as UnstyledButton,
  Menu as UnstyledMenu,
  Wrapper as UnstyledWrapper
} from '@ndustrial/nd-menu-button-react';

import dateTextStyles from './dateTextStyles';
import { MonthMenuItems, YearMenuItems } from './MenuItems';
import moment from 'moment';

export interface MonthElementWrapperStyledProps {
  accentColor: string;
}

export interface MonthElementWithSelectionsPassedProps {
  maxDate: moment.Moment;
  minDate: moment.Moment;
  month: moment.Moment;
  onMenuFocus: (isOpen: boolean) => void;
  onMonthSelect: (monthYear: moment.Moment, newMonth: string) => void;
  onYearSelect: (monthYear: moment.Moment, newYear: string) => void;
}

export type MonthElementWithSelectionsProps =
  MonthElementWithSelectionsPassedProps & MonthElementWrapperStyledProps;

const DownArrow = styled(ChevronDown)`
  font-size: 12px;
  position: absolute;
  right: 1px;
  stroke: #606060;
  transform: translateY(-50%);
  top: 50%;
`;

const WrapperSelected = css<MonthElementWrapperStyledProps>`
  background-color: #f5f5f5;
  color: ${({ accentColor }) => accentColor};
  outline: none;

  ${DownArrow} {
    stroke: #2764ae;
  }
`;

const Wrapper = styled(({ accentColor, isOpen, ...props }) => (
  <UnstyledWrapper {...props} />
))`
  ${dateTextStyles}

  display: inline-flex;
  margin-bottom: -6px;
  margin-top: -6px;

  &:hover,
  &:focus,
  &:focus-within,
  &:active {
    ${WrapperSelected}
  }

  ${({ isOpen }) => {
    return isOpen && WrapperSelected;
  }}
`;

const Button = styled(UnstyledButton)`
  padding: 8px 6px 8px;
  padding-right: 14px;
  position: relative;

  &:focus {
    outline: none;
  }
`;

const Menu = styled(({ parentRect, ...props }) => {
  return <UnstyledMenu {...props} />;
}).attrs(({ parentRect }) => {
  return {
    style: {
      left: parentRect && `${(parentRect.left + parentRect.right) / 2}px`,
      top: parentRect && `${parentRect.bottom}px`
    }
  };
})`
  background-color: #fbfbfb;
  border: 1px solid #ebebeb;
  box-shadow: 0px 2px 6px rgba(0, 0, 0, 0.3);
  transform: translateX(-50%);
  width: auto;

  &::before {
    border-bottom: 3.5px solid #fbfbfb;
    border-left: 3.5px solid transparent;
    border-right: 3.5px solid transparent;
    content: '';
    left: 50%;
    height: 0;
    position: absolute;
    top: -3.5px;
    transform: translateX(-50%);
    width: 0;
  }

  &::after {
    border-bottom: 5px solid #fbfbfb;
    border-left: 5px solid transparent;
    border-right: 5px solid transparent;
    content: '';
    left: 50%;
    height: 0;
    position: absolute;
    top: -5px;
    transform: translateX(-50%);
    width: 0;
  }
`;

function MonthElementWithSelections(props: MonthElementWithSelectionsProps) {
  const {
    accentColor,
    maxDate,
    minDate,
    month: monthYear,
    onMenuFocus,
    onMonthSelect,
    onYearSelect
  } = props;
  const [month, year] = monthYear.format('MMM YYYY').split(' ');

  const monthButton = useRef() as React.MutableRefObject<HTMLInputElement>;
  const yearButton = useRef() as React.MutableRefObject<HTMLInputElement>;

  const [isMonthOpen, setIsMonthOpen] = useState(false);
  const [isYearOpen, setIsYearOpen] = useState(false);
  const monthButtonRect = useRect(monthButton, isMonthOpen);
  const yearButtonRect = useRect(yearButton);

  const onMonthMenuToggle = useCallback(
    (isOpen) => {
      onMenuFocus(isOpen);
      setIsMonthOpen(isOpen);
    },
    [onMenuFocus]
  );
  const onYearMenuToggle = useCallback(
    (isOpen) => {
      onMenuFocus(isOpen);
      setIsYearOpen(isOpen);
    },
    [onMenuFocus]
  );

  const onMonthSelection = useCallback(
    (newMonth) => {
      onMenuFocus(false);
      onMonthSelect(monthYear, newMonth);
    },
    [onMenuFocus, onMonthSelect, monthYear]
  );
  const onYearSelection = useCallback(
    (newYear) => {
      onMenuFocus(false);
      onYearSelect(monthYear, newYear);
    },
    [onMenuFocus, onMonthSelect, monthYear]
  );

  return (
    <Fragment>
      <Wrapper
        accentColor={accentColor}
        isOpen={isMonthOpen}
        onMenuToggle={onMonthMenuToggle}
        onSelection={onMonthSelection}
      >
        <div ref={monthButton!!}>
          <Button>
            {month}
            <DownArrow />
          </Button>
        </div>
        <Portal>
          <Menu parentRect={monthButtonRect}>
            <MonthMenuItems accentColor={accentColor} />
          </Menu>
        </Portal>
      </Wrapper>
      <Wrapper
        isOpen={isYearOpen}
        onMenuToggle={onYearMenuToggle}
        onSelection={onYearSelection}
      >
        <div ref={yearButton}>
          <Button>
            {year}
            <DownArrow />
          </Button>
        </div>
        <Portal>
          <Menu parentRect={yearButtonRect}>
            <YearMenuItems
              accentColor={accentColor}
              maxDate={maxDate}
              minDate={minDate}
            />
          </Menu>
        </Portal>
      </Wrapper>
    </Fragment>
  );
}

export { MonthElementWithSelections };
