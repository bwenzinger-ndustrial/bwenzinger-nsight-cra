import React, { useCallback } from 'react';
import _ from 'lodash';
import { rem } from 'polished';
import PropTypes from 'prop-types';
import styled from 'styled-components';

import { PrimaryButton, WarningButton } from '@ndustrial/nd-button-react';
import { Chip, ChipLabel } from '@ndustrial/nd-chip-react';
import { Pencil, Trash } from '@ndustrial/nd-icons-svg';
import { QueryLink } from '@ndustrial/nsight-common/components';

import { colors } from '../../common/constants.js';
import {
  ContractFormBackground,
  ContractFormColumn,
  ContractFormRow,
  ContractLayout,
  ContractProperty as UnstyledContractProperty,
  ContractPropertyLabel,
  ContractPropertyText,
  ContractSection
} from '../../common/ContractLayout';
import {
  RateNarrativeTooltip,
  SubscribedUsersTooltip
} from '../../common/Tooltips';
import LoadingFormIndicator from './LoadingFormIndicator';
import UnstlyedPreviewFile from './PreviewFile';

const SVG_STYLES = `
  height: 16px;
  width: 16px;
  stroke: ${colors.white};
`;

const TrashIcon = styled(Trash)`
  ${SVG_STYLES}
`;

const PencilIcon = styled(Pencil)`
  ${SVG_STYLES}
`;

const PropertyValue = styled.div`
  font-weight: 500;
  font-style: normal;
  letter-spacing: 0.1px;
  line-height: 20px;
  font-size: ${rem('14px')};
`;

const SubscribedUsers = styled.div`
  display: flex;
  flex-wrap: wrap;

  ${Chip} {
    margin-right: 4px;
    margin-bottom: 4px;
  }
`;

const ContractProperty = styled(UnstyledContractProperty)`
  ${PropertyValue}, ${SubscribedUsers} {
    margin-top: 12px;
  }

  ${ContractPropertyText} {
    margin-bottom: 12px;
  }
`;

const RateNarrative = styled.p`
  max-height: 140px;
  font-size: ${rem('14px')};
  overflow: auto;
  font-style: normal;
  letter-spacing: 0.1px;
  line-height: 20px;
  margin-top: 12px;
  margin-bottom: 0;
`;

const NoFileUploaded = styled.div`
  border: 1px dashed ${colors.blueDark};
  background-color: ${colors.grayVeryLight};
  text-align: center;
  padding-top: 250px;
  min-height: 600px;

  font-size: 0.75rem;
  letter-spacing: 0;
  text-transform: uppercase;
  color: ${colors.grayDark};
`;

const ButtonGroup = styled.div`
  ${WarningButton} {
    margin-right: 10px;
  }

  ${TrashIcon}, ${PencilIcon} {
    margin-right: 7px;
  }
`;

const propTypes = {
  contract: PropTypes.shape({
    endDate: PropTypes.object,
    file: PropTypes.object,
    id: PropTypes.number,
    name: PropTypes.string,
    rateNarrative: PropTypes.string,
    startDate: PropTypes.object,
    status: PropTypes.string
  }),
  deleteContract: PropTypes.func.isRequired,
  hasWriteScope: PropTypes.bool.isRequired,
  reminders: PropTypes.arrayOf(
    PropTypes.shape({
      userId: PropTypes.string,
      label: PropTypes.string
    })
  )
};

function ReadOnlyContract(props) {
  const { contract, deleteContract, hasWriteScope, reminders } = props;

  const handleDelete = useCallback(() => {
    deleteContract(contract);
  }, [contract, deleteContract]);

  if (_.isEmpty(contract)) {
    return <LoadingFormIndicator loading={true} />;
  }

  const properCaseStatus =
    contract.status.charAt(0).toUpperCase() + contract.status.slice(1);

  const editBtnTitle = hasWriteScope
    ? 'Edit Contract'
    : "You don't have the correct permissions to edit this contract";

  return (
    <ContractLayout>
      <ContractFormColumn>
        <ContractSection>
          <ContractFormBackground>
            <ContractFormRow>
              <ContractProperty>
                <ContractPropertyLabel>
                  Contract Name:
                  <PropertyValue>{contract.name}</PropertyValue>
                </ContractPropertyLabel>
              </ContractProperty>
              <ContractProperty>
                <ContractPropertyLabel>
                  Status:
                  <PropertyValue>{properCaseStatus}</PropertyValue>
                </ContractPropertyLabel>
              </ContractProperty>
            </ContractFormRow>
            <ContractFormRow>
              <ContractProperty>
                <ContractPropertyLabel>
                  Start Date:
                  <PropertyValue>
                    {contract.startDate.format('YYYY-MM-DD')}
                  </PropertyValue>
                </ContractPropertyLabel>
              </ContractProperty>
              <ContractProperty>
                <ContractPropertyLabel>
                  Expiration Date:
                  <PropertyValue>
                    {contract.endDate.format('YYYY-MM-DD')}
                  </PropertyValue>
                </ContractPropertyLabel>
              </ContractProperty>
            </ContractFormRow>
          </ContractFormBackground>
        </ContractSection>
        <ContractSection>
          {contract.file ? (
            <UnstlyedPreviewFile formMode="view" selectedContract={contract} />
          ) : (
            <NoFileUploaded>A contract has not been uploaded.</NoFileUploaded>
          )}
        </ContractSection>
      </ContractFormColumn>

      <ContractFormColumn>
        <ContractSection>
          <ContractProperty>
            <ContractPropertyLabel>
              <ContractPropertyText>Rate Narrative:</ContractPropertyText>
              <RateNarrativeTooltip />
            </ContractPropertyLabel>
            <RateNarrative>{contract.rateNarrative}</RateNarrative>
          </ContractProperty>
        </ContractSection>
        <ContractSection>
          <ContractProperty>
            <ContractPropertyLabel>
              <ContractPropertyText>Subscribed Users:</ContractPropertyText>
              <SubscribedUsersTooltip />
            </ContractPropertyLabel>
            <SubscribedUsers>
              {reminders.length > 0 ? (
                reminders.map((reminder) => (
                  <Chip key={reminder.userId}>
                    <ChipLabel>{reminder.label}</ChipLabel>
                  </Chip>
                ))
              ) : (
                <ContractPropertyText>
                  No subscriptions have been set up.
                </ContractPropertyText>
              )}
            </SubscribedUsers>
          </ContractProperty>
        </ContractSection>

        <ButtonGroup>
          <WarningButton onClick={handleDelete} type="button">
            <TrashIcon />
            Delete Contract
          </WarningButton>
          <PrimaryButton
            as={QueryLink}
            title={editBtnTitle}
            to={`/utility-contract-upload/contract/${contract.id}/edit`}
            onClick={(event) => {
              if (!hasWriteScope) {
                event.preventDefault();
              }
            }}
          >
            <PencilIcon />
            Edit Contract
          </PrimaryButton>
        </ButtonGroup>
      </ContractFormColumn>
    </ContractLayout>
  );
}

ReadOnlyContract.propTypes = propTypes;

export default ReadOnlyContract;
