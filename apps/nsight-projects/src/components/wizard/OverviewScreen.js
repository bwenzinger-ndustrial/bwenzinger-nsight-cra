import React, { useEffect, useMemo, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import PropTypes from 'prop-types';
import styled from 'styled-components';

import {
  DateRangePicker,
  SingleDatePicker
} from '@ndustrial/nd-date-picker-react';
import { Pencil } from '@ndustrial/nd-icons-svg';
import { InputLabel, InputTextField } from '@ndustrial/nd-inputs-react';
import IconButton from '@ndustrial/nsight-common/components/IconButton';
import UserSearch from '@ndustrial/nsight-common/components/UserSearch';

import { updateActiveProject } from '../../redux/projects/actions';
import FieldSection from '../common/FieldSection';
import { baseInputStyles } from './constants/WizardTextStyles';

const propTypes = {
  setComplete: PropTypes.func,
  setTouched: PropTypes.func,
  idx: PropTypes.number
};

const fieldTopMargin = 15;

/* stylelint-disable property-no-vendor-prefix */
const FormDiv = styled.div`
  display: flex;
  flex: 1;
  overflow: auto;
  max-width: clamp(800px, 80%, 1000px);
  padding-bottom: 25px;
  margin: 0 auto;

  ::-webkit-scrollbar {
    -webkit-appearance: none;
    width: 7px;
  }

  ::-webkit-scrollbar-thumb {
    border-radius: 4px;
    background-color: rgba(0, 0, 0, 0.5);
    box-shadow: 0 0 1px rgba(255, 255, 255, 0.5);
  }
`;
/* stylelint-enable property-no-vendor-prefix */

const LeftSideDiv = styled.div`
  height: 100%;
  flex: 1;
  padding: 0 15px;
`;

const RightSideDiv = styled.div`
  height: 100%;
  flex: 1;
  padding: 0 15px;
`;

const MultiLineInputTextField = styled(InputTextField)`
  height: 100%;
  margin-top: ${fieldTopMargin}px;

  label {
    height: 100%;
  }

  .nd-inputs-react-inputtext-inputcontainer {
    height: calc(100% - 20px);
  }

  textarea {
    ${baseInputStyles}
  }
`;

const StyledInputLabel = styled(InputLabel)`
  margin-top: ${fieldTopMargin}px;

  cursor: ${({ $showUserSearch }) => ($showUserSearch ? 'pointer' : 'default')};
`;

const StyledInputTextField = styled(InputTextField)`
  margin-top: ${fieldTopMargin}px;

  input {
    ${baseInputStyles}
  }
`;

const StyledContactTextField = styled(InputTextField)`
  width: 100%;

  input {
    ${baseInputStyles}
  }
`;

const StyledSingleDatePicker = styled(SingleDatePicker)`
  margin-top: ${fieldTopMargin}px;
  width: 100%;

  .SingleDatePicker {
    width: 100%;
  }

  .SingleDatePickerInput {
    width: 100%;

    button {
      background-color: transparent;
    }

    input {
      ${baseInputStyles}
      background-color: transparent;
    }
  }
`;

const StyledDateRangePicker = styled(DateRangePicker)`
  margin-top: ${fieldTopMargin}px;
  width: 100%;

  .DateRangePicker {
    width: 100%;
  }

  .DateRangePickerInput {
    width: 100%;
    background-color: transparent;

    input {
      ${baseInputStyles}
    }

    button {
      background-color: transparent;
    }
  }

  .DateInput {
    input::placeholder {
      ${baseInputStyles}
    }
  }
`;

const StyledPencilIconButton = styled(IconButton)`
  margin-left: calc(100% - 20px);
  margin-bottom: -20px;
  margin-top: -5px;
  z-index: 1000;
`;

const StyledPencilIcon = styled(Pencil)`
  height: 20px;
  width: 20px;

  g {
    stroke-width: 1;
  }
`;

const StyledFieldSection = styled(FieldSection)`
  margin-top: 5px;
`;

const StyledUserSearch = styled(UserSearch)`
  margin-top: 5px;

  input::placeholder {
    ${baseInputStyles}
  }
`;

// each step is responsible for updating the project properties for that step
const OverviewScreen = ({ setComplete, idx }) => {
  const activeProject = useSelector((state) => state.projects.activeProject);
  const dispatch = useDispatch();
  const orgUsers = useSelector((state) => state.projects.orgUsers);
  const [isEditingProjectManager, setIsEditingProjectManager] = useState(false);
  const [showUserSearch, setShowUserSearch] = useState(false);

  function dataChanged(newData) {
    dispatch(updateActiveProject(newData));
  }

  function onUserSelected(user) {
    setIsEditingProjectManager(false);
    dataChanged({ projectManagerId: user.id });
  }

  const projectManager = useMemo(
    () =>
      orgUsers &&
      orgUsers.find((user) => user.id === activeProject.projectManagerId),
    [orgUsers, activeProject.projectManagerId]
  );

  useEffect(() => {
    if (!isEditingProjectManager && projectManager) {
      setShowUserSearch(false);
    } else {
      setShowUserSearch(true);
    }
  }, [projectManager, isEditingProjectManager]);

  return (
    <FormDiv>
      <LeftSideDiv>
        <StyledInputTextField
          label="Project Name"
          value={activeProject.projectName}
          onChange={(e) => {
            dataChanged({ projectName: e.currentTarget.value });
          }}
        />
        <StyledInputTextField
          label="Project Type"
          value={activeProject.projectType}
          onChange={(e) => {
            dataChanged({ projectType: e.currentTarget.value });
          }}
        />
        <StyledSingleDatePicker
          value={activeProject.approvalDate}
          label="Approval Date"
          id="approvalDate"
          onDateChange={(date) => {
            dataChanged({ approvalDate: date });
          }}
        />
        <StyledDateRangePicker
          startDateId="trackingPeriodStart"
          endDateId="trackingPeriodEnd"
          startDate={activeProject.trackingPeriodStart}
          endDate={activeProject.trackingPeriodEnd}
          label="Tracking Period"
          onDatesChange={(dates) => {
            dataChanged({
              trackingPeriodStart: dates.startDate,
              trackingPeriodEnd: dates.endDate
            });
          }}
          onStartDateChange={(startDate) => {
            dataChanged({
              trackingPeriodStart: startDate,
              trackingPeriodEnd: null
            });
          }}
        />
        <StyledInputLabel htmlFor="searchbox" $showUserSearch={showUserSearch}>
          Project Manager
        </StyledInputLabel>
        {showUserSearch && (
          <StyledUserSearch
            onUserSelected={onUserSelected}
            users={orgUsers}
            isFocused={isEditingProjectManager}
            excludedIds={projectManager ? [projectManager.id] : []}
          />
        )}
        {!showUserSearch && projectManager && (
          <StyledFieldSection hasBorder={true}>
            <StyledPencilIconButton
              onClick={() => setIsEditingProjectManager(true)}
            >
              <StyledPencilIcon />
            </StyledPencilIconButton>
            <StyledContactTextField
              label="First name"
              value={projectManager.firstName ?? ''}
              disabled
            />
            <StyledContactTextField
              label="Last name"
              value={projectManager.lastName ?? ''}
              disabled
            />
            <StyledContactTextField
              label="Phone"
              value={projectManager.phoneNumber ?? ''}
              disabled
            />
            <StyledContactTextField
              label="Email"
              value={projectManager.email ?? ''}
              disabled
            />
          </StyledFieldSection>
        )}
      </LeftSideDiv>
      <RightSideDiv>
        <MultiLineInputTextField
          value={activeProject.summary}
          label="Summary"
          multiline
          onChange={(e) => {
            dataChanged({ summary: e.currentTarget.value });
          }}
        />
      </RightSideDiv>
    </FormDiv>
  );
};

OverviewScreen.propTypes = propTypes;

export default OverviewScreen;
