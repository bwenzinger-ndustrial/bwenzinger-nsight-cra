import React from 'react';
import { FORM_ERROR } from 'final-form';
import moment from 'moment';
import { rem } from 'polished';
import PropTypes from 'prop-types';
import styled from 'styled-components';

import { SingleDatePickerAdapter } from '@ndustrial/nd-date-picker-react';
import {
  FormControlLabelAdapter,
  FormGroup,
  FormLabel,
  InputTextFieldAdapter,
  RadioButton
} from '@ndustrial/nd-inputs-react';
import { getAllErrorsForForm } from '@ndustrial/nsight-common/utils';

import {
  ContractFormBackground,
  ContractFormColumn,
  ContractFormRow,
  ContractLayout,
  ContractSection
} from '../../common/ContractLayout';
import Field from '../../common/Field';
import Reminders from '../Reminders';
import UnstlyedPreviewFile from './PreviewFile';
import UnstyledUploadFile from './UploadFile';

const propTypes = {
  addReminder: PropTypes.func.isRequired,
  contractMode: PropTypes.string.isRequired,
  deleteContractFile: PropTypes.func.isRequired,
  errors: PropTypes.object.isRequired,
  filterUsers: PropTypes.func.isRequired,
  filteredUsers: PropTypes.array,
  form: PropTypes.object.isRequired,
  handleFileDrop: PropTypes.func.isRequired,
  handleQueuedFileClear: PropTypes.func.isRequired,
  handleSubmit: PropTypes.func.isRequired,
  isLoadingContractDetails: PropTypes.bool,
  pristine: PropTypes.bool,
  queuedFile: PropTypes.object,
  reminderChanged: PropTypes.bool,
  reminders: PropTypes.array,
  removeReminder: PropTypes.func,
  resetForm: PropTypes.func,
  selectedContract: PropTypes.shape({
    file: PropTypes.object
  }),
  selectedFacility: PropTypes.shape({
    slug: PropTypes.string
  }),
  selectedOrg: PropTypes.shape({
    slug: PropTypes.string
  }),
  submitErrors: PropTypes.shape({
    [FORM_ERROR]: PropTypes.string
  }),
  submitting: PropTypes.bool,
  touched: PropTypes.object.isRequired,
  valid: PropTypes.bool,
  values: PropTypes.shape({
    file: PropTypes.shape({
      attachmentUrl: PropTypes.string,
      inlineUrl: PropTypes.string
    })
  }),
  users: PropTypes.array
};

const PreviewFile = styled(UnstlyedPreviewFile)``;
const UploadFile = styled(UnstyledUploadFile)``;

const RadioFormLabel = styled(FormLabel)`
  width: 100%;
  padding: 0 10px;
`;

const ContractNameGroup = styled(FormGroup)`
  min-width: 310px;
`;

const InlineRadio = styled(FormGroup)`
  align-content: flex-start;
  flex-direction: row;
  flex: 1;

  ${RadioButton} {
    background: #fff;
    border-radius: 50%;
  }
`;

const SingleDatePickerAdapterGroup = styled(FormGroup)`
  font-size: ${rem(14)};
`;

function Form(props) {
  const {
    addReminder,
    contractMode,
    deleteContractFile,
    errors,
    form,
    filteredUsers,
    filterUsers,
    handleFileDrop,
    handleQueuedFileClear,
    handleSubmit,
    pristine,
    queuedFile,
    reminderChanged,
    reminders,
    removeReminder,
    resetForm,
    selectedContract,
    selectedFacility,
    selectedOrg,
    submitErrors,
    submitting,
    touched,
    valid
  } = props;

  const errorsList = getAllErrorsForForm({
    errors,
    submitErrors,
    touched
  });

  return (
    <form onSubmit={handleSubmit}>
      <ContractLayout>
        <ContractFormColumn>
          <ContractSection>
            <ContractFormBackground>
              <ContractFormRow>
                <ContractNameGroup>
                  <Field
                    component={InputTextFieldAdapter}
                    label="Contract Name"
                    modifier="name"
                    name="name"
                    required
                  />
                </ContractNameGroup>

                <InlineRadio>
                  <RadioFormLabel>Status *</RadioFormLabel>
                  <Field
                    name="status"
                    component={FormControlLabelAdapter}
                    type="radio"
                    label="Active"
                    value="active"
                  />
                  <Field
                    name="status"
                    component={FormControlLabelAdapter}
                    type="radio"
                    label="Inactive"
                    value="inactive"
                  />
                </InlineRadio>
              </ContractFormRow>
              <ContractFormRow>
                <SingleDatePickerAdapterGroup>
                  <Field
                    component={SingleDatePickerAdapter}
                    required
                    label="Start Date"
                    maxDate={moment().add('10', 'years')}
                    minDate={moment('01-01-2014', 'MM-DD-YYYY')}
                    name="startDate"
                    type="text"
                  />
                </SingleDatePickerAdapterGroup>
                <SingleDatePickerAdapterGroup>
                  <Field
                    component={SingleDatePickerAdapter}
                    required
                    label="Expiration Date"
                    maxDate={moment().add('10', 'years')}
                    minDate={moment('01-01-2014', 'MM-DD-YYYY')}
                    name="endDate"
                    type="text"
                  />
                </SingleDatePickerAdapterGroup>
              </ContractFormRow>
            </ContractFormBackground>
          </ContractSection>
          <ContractSection>
            {selectedContract.file ? (
              <PreviewFile
                deleteContractFile={deleteContractFile}
                formMode={contractMode}
                selectedContract={selectedContract}
              />
            ) : (
              <UploadFile
                formMode={contractMode}
                handleFileDrop={handleFileDrop}
                handleQueuedFileClear={handleQueuedFileClear}
                queuedFile={queuedFile}
              />
            )}
          </ContractSection>
        </ContractFormColumn>
        <ContractFormColumn>
          <ContractSection>
            <Reminders
              addReminder={addReminder}
              contractMode={contractMode}
              errorsList={errorsList}
              filterUsers={filterUsers}
              filteredUsers={filteredUsers}
              handleSubmit={handleSubmit}
              pristine={pristine}
              queuedFile={queuedFile}
              reminderChanged={reminderChanged}
              reminders={reminders}
              removeReminder={removeReminder}
              reset={form.reset}
              resetForm={resetForm}
              selectedContract={selectedContract}
              selectedFacility={selectedFacility}
              selectedOrg={selectedOrg}
              submitting={submitting}
              valid={valid}
            />
          </ContractSection>
        </ContractFormColumn>
      </ContractLayout>
    </form>
  );
}

Form.propTypes = propTypes;

export default Form;
