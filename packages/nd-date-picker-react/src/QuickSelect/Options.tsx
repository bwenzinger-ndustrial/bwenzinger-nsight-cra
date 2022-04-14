import React, { Fragment, useState } from 'react';
import styled from 'styled-components';
import { SecondaryButton } from '@ndustrial/nd-button-react';
import {
  ToggleGroup as UnstyledToggleGroup,
  ToggleOption as UnstyledToggleOption
} from '@ndustrial/nd-toggle-group-react';

import {
  Label,
  OpenIndicator,
  OptionsContainer,
  Title,
  TitleContainer
} from './Accordion';
import { QuickSelectUnitOptions } from '.';
import { DatePickerDatesRangeWithBaseline } from '../MultiCalendarComparisonWidget';
import {
  NdDatePickerDatesRange,
  NdDatePickerDatesWithType,
  NdCalendarRangeUnitTypes
} from '../types';

export interface DatePickerOptionsprops {
  baselineYear: number;
  numberOfDays?: number;
  onQuickSelectRange: ({}: NdDatePickerDatesWithType) => void;
  onSelection: (unit: NdCalendarRangeUnitTypes) => void;
  options?: QuickSelectUnitOptions[];
  primaryDates?: NdDatePickerDatesRange;
  selectedUnit?: string;
  units?: NdCalendarRangeUnitTypes[];
}

const ToggleGroup = styled(UnstyledToggleGroup)`
  display: flex;
`;

const ToggleOption = styled(UnstyledToggleOption)`
  flex-grow: 1;
`;

const Container = styled.div`
  border-bottom: 1px solid #d8d8d8;
  padding: 16px;

  ${Label} {
    margin-bottom: 8px;
  }

  ${ToggleGroup} + ${Label} {
    margin-top: 8px;
  }

  ${SecondaryButton} + ${SecondaryButton} {
    margin-top: 4px;
  }
`;

function OptionsPanel(props: DatePickerOptionsprops) {
  const {
    baselineYear,
    onQuickSelectRange,
    onSelection,
    options = [],
    primaryDates,
    selectedUnit,
    units = []
  } = props;

  const [isAccordionOpen, setAccordionOpen] = useState(false);

  return (
    <Container>
      <TitleContainer
        isOpen={isAccordionOpen}
        onClick={() => setAccordionOpen(!isAccordionOpen)}
      >
        <OpenIndicator isOpen={isAccordionOpen} />
        <Title>Quick Select Options</Title>
      </TitleContainer>

      <OptionsContainer isOpen={isAccordionOpen}>
        {units.length ? (
          <Fragment>
            <Label>Comparison Type:</Label>
            <ToggleGroup>
              {units.map((unit) => (
                <ToggleOption
                  isSelected={selectedUnit === unit}
                  key={unit}
                  onClick={() => onSelection(unit)}
                  size="small"
                >
                  {unit}
                </ToggleOption>
              ))}
            </ToggleGroup>
          </Fragment>
        ) : null}

        {options.length ? (
          <Fragment>
            <Label>Quick Select:</Label>
            {options.map(({ dates, text, textFromDates }) => {
              const buttonText = text
                ? text()
                : textFromDates!({ ...primaryDates, baselineYear });

              return (
                <SecondaryButton
                  key={buttonText}
                  onClick={() =>
                    onQuickSelectRange(dates({ ...primaryDates }, baselineYear))
                  }
                >
                  {buttonText}
                </SecondaryButton>
              );
            })}
          </Fragment>
        ) : null}
      </OptionsContainer>
    </Container>
  );
}

export default OptionsPanel;
