import React from 'react';
import momentPropTypes from 'react-moment-proptypes';
import { rem } from 'polished';
import PropTypes from 'prop-types';
import styled from 'styled-components';

import NoKpi from '@ndustrial/nsight-common/assets/noKpiSelected.svg';

const propTypes = {
  comparisonDates: PropTypes.shape({
    from: momentPropTypes.momentObj,
    to: momentPropTypes.momentObj
  }).isRequired,
  exampleKpi: PropTypes.shape({
    label: PropTypes.string
  }),
  primaryDates: PropTypes.shape({
    from: momentPropTypes.momentObj,
    to: momentPropTypes.momentObj
  }).isRequired
};

const Container = styled.div`
  display: flex;
  flex-direction: column;
  border: 1px dashed ${({ theme }) => theme.colors.primary};
`;

const InfoHeader = styled.p`
  color: ${({ theme }) => theme.colors.text};
  font-size: ${rem('14px')};
  font-weight: 700;
  text-align: center;
  opacity: 0.5;
`;

const NoKpiImage = styled.div`
  background: url(${NoKpi}) no-repeat center;
  min-height: 293px;
  background-size: cover;

  ${InfoHeader} {
    margin: 5px;
    padding-top: 60px;
  }
`;

const InfoText = styled.p`
  color: ${({ theme }) => theme.colors.text};
  font-size: ${rem('14px')};
  font-weight: 300;
  text-align: center;
  margin: 5px;
  opacity: 0.5;
`;

function NoSelectedKpi({ comparisonDates, exampleKpi, primaryDates }) {
  const isDatesSelected =
    comparisonDates.from &&
    comparisonDates.to &&
    primaryDates.from &&
    primaryDates.to;

  return (
    <Container>
      <NoKpiImage>
        <InfoHeader>{"Let's see how things are going!"}</InfoHeader>
        <InfoText>
          {!isDatesSelected ? '1.' : null} Select a Key Performance Indicator
          {exampleKpi && exampleKpi.label
            ? ` (ex. ${exampleKpi.label.toUpperCase()})`
            : null}
        </InfoText>
        {!isDatesSelected ? (
          <InfoText>2. Select date ranges you wish to examine</InfoText>
        ) : null}
      </NoKpiImage>
    </Container>
  );
}

NoSelectedKpi.propTypes = propTypes;

export default NoSelectedKpi;
