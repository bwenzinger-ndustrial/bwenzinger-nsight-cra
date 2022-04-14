import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

import { Loader } from '@ndustrial/nd-loader-react';
import { QueryLink } from '@ndustrial/nsight-common/components';

import ContractForm from './ContractForm';
import Instructions from './ContractInstructions';
import ContractList from './ContractList';

const AppTitle = styled.div`
  font-size: 1.4rem;
  padding: 15px 15px 0;
  color: ${({ theme }) => theme.colors.text};
`;

const MainContainer = styled.div`
  display: flex;
  flex-direction: column;
`;

const MainContent = styled.div`
  display: flex;
  flex-direction: column;
  height: 100%;
  padding: 10px;
  position: relative;

  @media screen and (min-width: 897px) and (orientation: landscape),
    screen and (min-width: 768px) and (orientation: portrait) {
    flex-direction: row;
  }
`;

const LoadingDiv = styled.div`
  padding-top: 25px;
  display: flex;
  flex: 1;
  width: auto;
`;

const FacilityContractDiv = styled.div`
  margin-bottom: 10px;
  margin-top: 10px;
  width: 100%;

  @media screen and (min-width: 897px) and (orientation: landscape),
    screen and (min-width: 768px) and (orientation: portrait) {
    margin-top: 0;
    margin-left: 10px;
  }
`;

const SidebarDiv = styled.div`
  flex: 1;

  @media screen and (min-width: 897px) and (orientation: landscape),
    screen and (min-width: 768px) and (orientation: portrait) {
    min-width: 400px;
  }
`;

const NewContractLink = styled(QueryLink)`
  display: flex;
  position: relative;
  padding: 10px;
  margin-bottom: 15px;
  color: ${({ theme }) => theme.colors.primary};
  border: 1px dashed ${({ theme }) => theme.colors.primary};
  cursor: pointer;
  height: auto;
  text-transform: uppercase;
  font-size: 0.75rem;
  font-weight: 700;
  text-decoration: none;

  &::after {
    content: '';
    flex: 1;
    margin-left: 15px;
    background: #e8e8e8;
    height: 12px;
  }
`;

const propTypes = {
  addReminder: PropTypes.func.isRequired,
  children: PropTypes.node,
  contractMode: PropTypes.string,
  contractsGroupedByStatus: PropTypes.object,
  createContract: PropTypes.func.isRequired,
  deleteContract: PropTypes.func.isRequired,
  deleteContractFile: PropTypes.func.isRequired,
  filterContracts: PropTypes.func.isRequired,
  filteredContracts: PropTypes.array,
  filterUsers: PropTypes.func.isRequired,
  filteredUsers: PropTypes.array,
  handleFileDrop: PropTypes.func.isRequired,
  handleQueuedFileClear: PropTypes.func.isRequired,
  hasWriteScope: PropTypes.bool.isRequired,
  isLoadingContractDetails: PropTypes.bool.isRequired,
  isLoadingContracts: PropTypes.bool.isRequired,
  queuedFile: PropTypes.object,
  reminderChanged: PropTypes.bool,
  reminders: PropTypes.array,
  removeReminder: PropTypes.func.isRequired,
  resetForm: PropTypes.func.isRequired,
  selectedContract: PropTypes.object,
  updateContract: PropTypes.func.isRequired,
  users: PropTypes.array,
  validateContract: PropTypes.func.isRequired
};

function FacilityContract(props) {
  const {
    addReminder,
    contractMode,
    contractsGroupedByStatus,
    createContract,
    deleteContract,
    deleteContractFile,
    filterContracts,
    filteredContracts,
    filterUsers,
    filteredUsers,
    handleFileDrop,
    handleQueuedFileClear,
    hasWriteScope,
    isLoadingContracts,
    isLoadingContractDetails,
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

  if (isLoadingContracts) {
    return (
      <LoadingDiv>
        <Loader label="Loading" />
      </LoadingDiv>
    );
  }

  function showForm() {
    if (
      !isLoadingContractDetails &&
      !selectedContract.id &&
      contractMode !== 'create'
    ) {
      return <Instructions />;
    } else {
      return (
        <ContractForm
          addReminder={addReminder}
          contractMode={contractMode}
          createContract={createContract}
          deleteContract={deleteContract}
          deleteContractFile={deleteContractFile}
          filterUsers={filterUsers}
          filteredUsers={filteredUsers}
          handleFileDrop={handleFileDrop}
          handleQueuedFileClear={handleQueuedFileClear}
          hasWriteScope={hasWriteScope}
          isLoadingContracts={isLoadingContracts}
          isLoadingContractDetails={isLoadingContractDetails}
          queuedFile={queuedFile}
          reminderChanged={reminderChanged}
          reminders={reminders}
          removeReminder={removeReminder}
          resetForm={resetForm}
          selectedContract={selectedContract}
          updateContract={updateContract}
          users={users}
          validateContract={validateContract}
        />
      );
    }
  }

  return (
    <MainContainer>
      <AppTitle>Utility Contract Upload</AppTitle>
      <MainContent>
        <SidebarDiv>
          <NewContractLink to={`/utility-contract-upload/contract/new`}>
            + New Contract
          </NewContractLink>
          <ContractList
            contractsGroupedByStatus={contractsGroupedByStatus}
            filterContracts={filterContracts}
            filteredContracts={filteredContracts}
            isLoadingContracts={isLoadingContracts}
            selectedContract={selectedContract}
          />
        </SidebarDiv>
        <FacilityContractDiv>{showForm()}</FacilityContractDiv>
      </MainContent>
    </MainContainer>
  );
}

FacilityContract.propTypes = propTypes;

export default FacilityContract;
