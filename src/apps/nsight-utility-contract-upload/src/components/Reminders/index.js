import React, { Fragment } from 'react';
import { FORM_ERROR } from 'final-form';
import PropTypes from 'prop-types';
import styled from 'styled-components';

import Field from '../../common/Field';
import TextareaWithTooltip from '../../common/TextareaWithTooltip';
import { RateNarrativeTooltip } from '../../common/Tooltips';
import FormActions from './FormActions';
import RemindersInput from './RemindersInput';

const propTypes = {
  addReminder: PropTypes.func.isRequired,
  contractMode: PropTypes.string.isRequired,
  errorsList: PropTypes.array.isRequired,
  filterUsers: PropTypes.func,
  filteredUsers: PropTypes.array,
  handleSubmit: PropTypes.func.isRequired,
  pristine: PropTypes.bool,
  queuedFile: PropTypes.object,
  reminderChanged: PropTypes.bool.isRequired,
  reminders: PropTypes.array,
  removeReminder: PropTypes.func,
  reset: PropTypes.func,
  resetForm: PropTypes.func,
  selectedContract: PropTypes.shape({
    id: PropTypes.number
  }),
  submitErrors: PropTypes.shape({
    [FORM_ERROR]: PropTypes.string
  }),
  submitting: PropTypes.bool,
  valid: PropTypes.bool,
  users: PropTypes.array
};

const ContractFormErrors = styled.div`
  font-size: 0.75rem;
  font-weight: 700;
  color: ${({ theme }) => theme.colors.warning};
  margin-top: 15px;
`;

function Reminders(props) {
  const {
    addReminder,
    contractMode,
    errorsList,
    filterUsers,
    filteredUsers,
    reset,
    pristine,
    queuedFile,
    reminderChanged,
    reminders,
    removeReminder,
    resetForm,
    selectedContract,
    submitting,
    valid
  } = props;

  const isSaveDisabled =
    !reminderChanged && !queuedFile && (!valid || pristine);

  const rateNarrativePlaceholder =
    'Example: Schedule 10 is a dynamic pricing tariff based on ' +
    "Dominion's declaration of the type of day (A, B, or C) affecting how much one is charged for " +
    'using electricity. The determination is made by Dominion Virginia before 5:00 PM for the next day…';

  return (
    <Fragment>
      <Field
        component={TextareaWithTooltip}
        hasEditableIcon
        required
        label="Rate Narrative"
        modifier="rateNarrative"
        name="rateNarrative"
        placeholder={rateNarrativePlaceholder}
        Tooltip={<RateNarrativeTooltip />}
      />
      <RemindersInput
        addReminder={addReminder}
        filterUsers={filterUsers}
        filteredUsers={filteredUsers}
        formMode={contractMode}
        label="Subscribed Users"
        reminders={reminders}
        removeReminder={removeReminder}
      />
      <FormActions
        formMode={contractMode}
        reset={reset}
        resetForm={resetForm}
        isSaveDisabled={isSaveDisabled}
        selectedContract={selectedContract}
        submitting={submitting}
      />

      <ContractFormErrors>
        {errorsList.map((error, index) => (
          <p key={error + index}>{error}</p>
        ))}
      </ContractFormErrors>
    </Fragment>
  );
}

Reminders.propTypes = propTypes;

export default Reminders;
