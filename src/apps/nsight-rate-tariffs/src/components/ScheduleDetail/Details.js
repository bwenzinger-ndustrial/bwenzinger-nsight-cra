import React from 'react';
import moment from 'moment';
import { rem } from 'polished';
import PropTypes from 'prop-types';
import styled from 'styled-components';

const propTypes = {
  description: PropTypes.string,
  provider: PropTypes.string.isRequired,
  sector: PropTypes.string.isRequired,
  updatedAt: PropTypes.string.isRequired
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
  line-height: 1.5;
  margin: 0;
`;

const InfoContainer = styled.div`
  &:not(:last-child) {
    margin-bottom: 36px;
  }

  ${Label} {
    margin-bottom: 12px;
  }

  ${Info} {
    margin-left: 2px;
  }
`;

const UtilityProvider = styled(InfoContainer)``;
const Sector = styled(InfoContainer)``;
const LastUpdated = styled(InfoContainer)``;
const AdditionalDetails = styled(InfoContainer)`
  ${Info} {
    font-weight: 400;
  }
`;

const Content = styled.div`
  display: flex;
  flex-wrap: wrap;

  ${InfoContainer} {
    width: 100%;
  }

  ${UtilityProvider},
  ${Sector} {
    width: calc(50% - 6px);
  }

  ${UtilityProvider} {
    margin-right: 12px;
  }

  @media screen and (min-width: 897px) and (orientation: landscape),
    screen and (min-width: 768px) and (orientation: portrait) {
    ${UtilityProvider},
    ${Sector},
    ${LastUpdated} {
      width: calc(33% - 8px);
    }

    ${UtilityProvider},
    ${Sector} {
      margin-right: 12px;
    }
  }
`;

function Details({ description, provider, sector, updatedAt }) {
  return (
    <Content>
      <UtilityProvider>
        <Label>Utility Provider:</Label>
        <Info>{provider}</Info>
      </UtilityProvider>

      <Sector>
        <Label>Sector:</Label>
        <Info>{sector}</Info>
      </Sector>

      <LastUpdated>
        <Label>Last Updated:</Label>
        <Info>{moment(updatedAt).format('MMMM D YYYY, hh:mm A')}</Info>
      </LastUpdated>

      {description && (
        <AdditionalDetails>
          <Label>Additional Details:</Label>
          <Info>{description}</Info>
        </AdditionalDetails>
      )}
    </Content>
  );
}

Details.propTypes = propTypes;

export default Details;
