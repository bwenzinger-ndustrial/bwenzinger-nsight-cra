import React, { useMemo } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import _ from 'lodash';
import PropTypes from 'prop-types';
import styled from 'styled-components';

import {
  DropdownButton,
  Menu,
  MenuItem,
  Wrapper
} from '@ndustrial/nd-dropdown-react';
import { InputTextField } from '@ndustrial/nd-inputs-react';
import { Tooltip as UnstyledTooltip } from '@ndustrial/nd-tooltip-react';

import DateUnitLabels from '../../constants/DateUnits';
import { updateActiveProject } from '../../redux/projects/actions';
import FieldSection from '../common/FieldSection';
import { baseInputStyles } from './constants/WizardTextStyles';

const propTypes = {
  setComplete: PropTypes.func,
  setTouched: PropTypes.func,
  idx: PropTypes.number
};

const fieldTopMargin = 15;

const InnerWrapper = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  max-width: clamp(400px, 80%, 600px);
  margin: 0 auto;
`;

const StyledDropDownWrapper = styled(Wrapper)`
  min-width: 125px;
  height: 38px;
  margin-top: 20px;
  margin-left: 10px;
`;

const MenuButton = styled(DropdownButton)`
  align-items: center;
  display: flex;
  color: ${({ theme }) => theme.colors.text};

  svg {
    stroke: ${({ theme }) => theme.colors.text};
  }

  ${baseInputStyles}
`;

const StyledSpanForUnit = styled.span`
  display: flex;
  align-items: center;
  justify-content: center;
  margin-top: 20px;
  margin-right: 5px;
  margin-left: 15px;
  color: ${({ theme }) => theme.colors.text};
`;

const BaseStyledInputTextField = styled(InputTextField)`
  input {
    ${baseInputStyles}
  }
`;

const FixedWidthInputTextField = styled(BaseStyledInputTextField)`
  .nd-inputs-react-inputtext-inputcontainer {
    width: ${(props) => props.$width}px;
  }
`;

const StyledInputTextField = styled(FixedWidthInputTextField)`
  margin-top: ${fieldTopMargin}px;
`;

const StyledMenu = styled(Menu)`
  ${baseInputStyles}
`;

const StyledMenuItem = styled(MenuItem)`
  color: #393d3f;

  ${baseInputStyles}
`;

const PaybackPeriodDiv = styled.div`
  border: 1px dashed #6b81b8;
  margin-right: 10px;
  padding: 10px;
  color: ${({ theme }) => theme.colors.text};

  ${baseInputStyles}
`;

const Tooltip = styled(UnstyledTooltip)`
  border-bottom: 1px dashed ${({ theme }) => theme.colors.primary};
  display: inline-flex;
  color: #2764ae;
`;

const ProjectProjections = ({ setComplete, idx }) => {
  const activeProject = useSelector((state) => state.projects.activeProject);
  const dispatch = useDispatch();

  function dataChanged(newData) {
    dispatch(updateActiveProject(newData));
  }

  const paybackPeriod = useMemo(() => {
    if (
      activeProject.monetarySavingsUnit === DateUnitLabels.YEAR ||
      activeProject.monetarySavingsUnit === undefined
    ) {
      return (
        Math.round(
          (activeProject.cost / activeProject.projectedMonetarySavings) * 10
        ) / 10
      );
    } else if (activeProject.monetarySavingsUnit === DateUnitLabels.MONTH) {
      return (
        Math.round(
          (activeProject.cost / activeProject.projectedMonetarySavings / 12) *
            10
        ) / 10
      );
    }
  }, [
    activeProject.cost,
    activeProject.monetarySavingsUnit,
    activeProject.projectedMonetarySavings
  ]);

  const formulaText =
    activeProject.monetarySavingsUnit === DateUnitLabels.MONTH
      ? 'Formula: (Cost/Estimated savings) / 12'
      : 'Formula: Cost/Estimated savings';

  return (
    <InnerWrapper>
      <StyledInputTextField
        mask="currency"
        $width={200}
        min="0"
        step="1.00"
        label="Projected Cost"
        type="number"
        value={activeProject.cost}
        onChange={(e) => {
          dataChanged({ cost: e.currentTarget.value });
        }}
        tooltipContent="Total cost of project"
      />
      <FieldSection>
        <>
          <FixedWidthInputTextField
            $width={200}
            label="Projected Monetary Savings"
            value={activeProject.projectedMonetarySavings}
            type="number"
            onChange={(e) => {
              dataChanged({ projectedMonetarySavings: e.currentTarget.value });
            }}
            tooltipContent="Estimated monetary savings for project"
          />
          <StyledSpanForUnit>per</StyledSpanForUnit>
          <StyledDropDownWrapper
            id={'123'}
            onSelection={(selection) => {
              dataChanged({ monetarySavingsUnit: selection });
            }}
          >
            <MenuButton>{activeProject.monetarySavingsUnit}</MenuButton>
            <StyledMenu>
              {Object.values(DateUnitLabels).map((unit) => (
                <StyledMenuItem key={unit}>{unit}</StyledMenuItem>
              ))}
            </StyledMenu>
          </StyledDropDownWrapper>
        </>
      </FieldSection>

      {_.isFinite(paybackPeriod) && (
        <FieldSection>
          <PaybackPeriodDiv>
            Your payback period is{' '}
            <Tooltip
              content={formulaText}
              placement={'bottom-start'}
              tagName="span"
            >
              {`${paybackPeriod} years`}
            </Tooltip>
          </PaybackPeriodDiv>
        </FieldSection>
      )}
      <FieldSection>
        <>
          <FixedWidthInputTextField
            $width={200}
            label="Projected Energy Savings"
            value={activeProject.projectedEnergySavings}
            type="number"
            onChange={(e) => {
              dataChanged({ projectedEnergySavings: e.currentTarget.value });
            }}
            tooltipContent="Estimated energy savings for project"
          />
          <StyledDropDownWrapper
            id={'234'}
            onSelection={(selection) => {
              dataChanged({ energySavingsUnit: selection });
            }}
          >
            <MenuButton>{activeProject.energySavingsUnit}</MenuButton>
            <Menu>
              <StyledMenuItem>kwh</StyledMenuItem>
              <StyledMenuItem>kva</StyledMenuItem>
              <StyledMenuItem>kvar</StyledMenuItem>
            </Menu>
          </StyledDropDownWrapper>
          <StyledSpanForUnit>per</StyledSpanForUnit>
          <StyledDropDownWrapper
            id={'345'}
            onSelection={(selection) => {
              dataChanged({ energySavingsTimeUnit: selection });
            }}
          >
            <MenuButton>{activeProject.energySavingsTimeUnit}</MenuButton>
            <Menu>
              {Object.values(DateUnitLabels).map((unit) => (
                <StyledMenuItem key={unit}>{unit}</StyledMenuItem>
              ))}
            </Menu>
          </StyledDropDownWrapper>
        </>
      </FieldSection>
      <StyledInputTextField
        $width={200}
        label="Projected ROI"
        value={activeProject.roi}
        onChange={(e) => {
          dataChanged({ roi: e.currentTarget.value });
        }}
        tooltipContent="Estimated return on investment"
      />
      <StyledInputTextField
        $width={200}
        label="Projected IRR"
        value={activeProject.irr}
        onChange={(e) => {
          dataChanged({ irr: e.currentTarget.value });
        }}
        tooltipContent="Estimated internal rate of return"
      />
    </InnerWrapper>
  );
};

ProjectProjections.propTypes = propTypes;

export default ProjectProjections;
