import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

import { Search } from '@ndustrial/nd-icons-svg';
import { InputTextField } from '@ndustrial/nd-inputs-react';

import { colors } from '../common/constants.js';
import ContractListItem from './ContractListItem';
import ContractListItemContainer from './ContractListItemContainer';

const propTypes = {
  contractsGroupedByStatus: PropTypes.shape({
    active: PropTypes.array,
    expiringSoon: PropTypes.array,
    expired: PropTypes.array,
    inactive: PropTypes.array
  }).isRequired,
  filterContracts: PropTypes.func.isRequired,
  filteredContracts: PropTypes.arrayOf(
    PropTypes.shape({
      group: PropTypes.string,
      id: PropTypes.number,
      icon: PropTypes.string,
      label: PropTypes.string,
      subText: PropTypes.string,
      url: PropTypes.string
    })
  ).isRequired,
  isLoadingContracts: PropTypes.bool.isRequired
};

const SearchBox = styled(InputTextField)`
  margin-bottom: 10px;

  input {
    font-size: 0.625rem;
    transition: all 0.2s cubic-bezier(0.165, 0.84, 0.44, 1);
  }
`;

const ContractListContainer = styled.div`
  display: flex;
  flex-direction: column;
`;

const SearchBoxIcon = styled(Search)`
  height: 15px;
  width: 15px;
  stroke: ${colors.grayDark};
`;

function ContractList(props) {
  const {
    contractsGroupedByStatus,
    filterContracts,
    filteredContracts
  } = props;

  return (
    <ContractListContainer>
      <SearchBox
        label=""
        onChange={filterContracts}
        placeholder="Filter Contracts"
        type="search"
        endIcon={<SearchBoxIcon />}
      />
      {filteredContracts.length === 0 ? (
        <Fragment>
          <ContractListItemContainer
            data={contractsGroupedByStatus.active}
            group="Active"
          />
          <ContractListItemContainer
            data={contractsGroupedByStatus.expiringSoon}
            group="Expiring Within 90 Days"
          />
          <ContractListItemContainer
            data={contractsGroupedByStatus.expired}
            group="Expired"
          />
          <ContractListItemContainer
            data={contractsGroupedByStatus.inactive}
            group="Inactive"
          />
        </Fragment>
      ) : (
        <ContractListItem data={filteredContracts} />
      )}
    </ContractListContainer>
  );
}

ContractList.propTypes = propTypes;

export default ContractList;
