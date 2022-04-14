import React from 'react';
import moment from 'moment';
import { rem } from 'polished';
import PropTypes from 'prop-types';
import styled from 'styled-components';

const propTypes = {
  className: PropTypes.string,
  endDate: PropTypes.string,
  name: PropTypes.string,
  startDate: PropTypes.string,
  status: PropTypes.string,
  updatedAt: PropTypes.string
};

const statusColor = ({ status, theme }) => {
  let color;
  switch (status) {
    case 'active':
      color = theme.colors.success;
      break;
    case 'expired':
      color = theme.colors.failure;
      break;
    default:
      color = theme.colors.failure;
      break;
  }

  return `color: ${color}`;
};

const Label = styled.label`
  color: ${({ theme }) => theme.colors.textLight};
  display: block;
  font-size: ${rem('14px')};
  font-style: italic;
  letter-spacing: -0.1px;
  line-height: 1.2;
`;

const Info = styled.p`
  color: ${({ theme }) => theme.colors.text};
  font-size: ${rem('14px')};
  font-weight: 500;
  letter-spacing: 0.5px;
  line-height: 1.2;
  margin: 0;
`;

const InfoContainer = styled.div`
  &:not(:nth-last-child(-n + 2)) {
    margin-bottom: 36px;
  }

  ${Label} {
    margin-bottom: 12px;
  }

  ${Info} {
    margin-left: 2px;
  }
`;

const ContractName = styled(InfoContainer)``;
const StartDate = styled(InfoContainer)``;
const Status = styled(InfoContainer)`
  ${Info} {
    text-transform: capitalize;
    ${statusColor}
  }
`;
const UpdatedAt = styled(InfoContainer)``;
const Expires = styled(InfoContainer)``;

const ContractDetails = styled.div`
  display: flex;
  flex-wrap: wrap;

  ${InfoContainer} {
    width: 100%;
  }

  ${ContractName},
  ${Status},
  ${UpdatedAt},
  ${Expires},
  ${StartDate} {
    width: calc(50% - 6px);
  }

  @media screen and (min-width: 897px) and (orientation: landscape),
    screen and (min-width: 768px) and (orientation: portrait) {
    ${ContractName},
    ${Status},
    ${UpdatedAt},
    ${Expires},
    ${StartDate} {
      width: calc(33% - 8px);
    }
  }
`;

function UtilityContractDetails({
  className,
  endDate,
  name,
  startDate,
  status,
  updatedAt
}) {
  return (
    <ContractDetails className={className}>
      <ContractName>
        <Label>Name:</Label>
        <Info>{name || 'Not Available'}</Info>
      </ContractName>
      <StartDate>
        <Label>Start Date:</Label>
        <Info>
          {(startDate && moment(startDate).format('MMMM D, YYYY')) ||
            'Not Available'}
        </Info>
      </StartDate>
      <Status status={status}>
        <Label>Status:</Label>
        <Info>{status || 'Not Available'}</Info>
      </Status>
      <UpdatedAt>
        <Label>Updated At:</Label>
        <Info>
          {(updatedAt && moment(updatedAt).format('MMMM D, YYYY hh:mm A')) ||
            'Not Available'}
        </Info>
      </UpdatedAt>
      <Expires>
        <Label>Expires:</Label>
        <Info>
          {(endDate && moment(endDate).format('MMMM D, YYYY')) ||
            'Not Available'}
        </Info>
      </Expires>
    </ContractDetails>
  );
}

UtilityContractDetails.propTypes = propTypes;

export default UtilityContractDetails;
