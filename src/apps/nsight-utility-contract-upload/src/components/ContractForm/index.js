import React from 'react';
import { Form as FinalForm } from 'react-final-form';
import PropTypes from 'prop-types';

import Form from './Form';
import ReadOnlyContract from './ReadOnlyContract';

const propTypes = {
  addReminder: PropTypes.func.isRequired,
  contractMode: PropTypes.string,
  createContract: PropTypes.func.isRequired,
  deleteContract: PropTypes.func.isRequired,
  deleteContractFile: PropTypes.func.isRequired,
  filterUsers: PropTypes.func.isRequired,
  filteredUsers: PropTypes.array,
  isLoadingContracts: PropTypes.bool,
  isLoadingContractDetails: PropTypes.bool,
  organizationId: PropTypes.string,
  handleFileDrop: PropTypes.func.isRequired,
  handleQueuedFileClear: PropTypes.func.isRequired,
  hasWriteScope: PropTypes.bool,
  queuedFile: PropTypes.object,
  reminderChanged: PropTypes.bool,
  reminders: PropTypes.array,
  removeReminder: PropTypes.func,
  resetForm: PropTypes.func,
  selectedContract: PropTypes.object.isRequired,
  updateContract: PropTypes.func.isRequired,
  users: PropTypes.array,
  validateContract: PropTypes.func.isRequired
};

function ContractForm(props) {
  const {
    addReminder,
    contractMode,
    createContract,
    deleteContract,
    deleteContractFile,
    filterUsers,
    filteredUsers,
    handleFileDrop,
    handleQueuedFileClear,
    hasWriteScope,
    isLoadingContracts,
    isLoadingContractDetails,
    organizationId,
    queuedFile,
    reminderChanged,
    reminders,
    removeReminder,
    resetForm,
    selectedContract,
    updateContract,
    users,
    validateContract
  } = props;

  const initialValues = selectedContract || { status: 'active' };
  const handleSubmit = selectedContract.id ? updateContract : createContract;

  return (
    <FinalForm
      initialValues={initialValues}
      onSubmit={handleSubmit}
      render={(renderProps) => {
        if (contractMode === 'view' || !hasWriteScope) {
          return (
            <ReadOnlyContract
              contract={selectedContract}
              reminders={reminders}
              hasWriteScope={hasWriteScope}
              deleteContract={deleteContract}
            />
          );
        }

        return (
          <Form
            {...renderProps}
            addReminder={addReminder}
            contractMode={contractMode}
            deleteContractFile={deleteContractFile}
            filteredUsers={filteredUsers}
            filterUsers={filterUsers}
            handleFileDrop={handleFileDrop}
            handleQueuedFileClear={handleQueuedFileClear}
            isLoadingContracts={isLoadingContracts}
            isLoadingContractDetails={isLoadingContractDetails}
            organizationId={organizationId}
            queuedFile={queuedFile}
            reminderChanged={reminderChanged}
            reminders={reminders}
            removeReminder={removeReminder}
            resetForm={resetForm}
            selectedContract={selectedContract}
            users={users}
          />
        );
      }}
      validate={validateContract}
    />
  );
}

ContractForm.propTypes = propTypes;

export default ContractForm;
