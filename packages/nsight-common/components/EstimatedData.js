import React, { Fragment } from 'react';
import { rem } from 'polished';
import PropTypes from 'prop-types';
import styled from 'styled-components';

import ChartPieColored from '../assets/chartPieColored.svg';

const EstimatedDataContainer = styled.div`
  align-items: center;
  display: flex;
`;

const EstimatedDataLabel = styled.div`
  font-size: ${rem('8px')};
  font-style: italic;
  line-height: 16px;
  margin-left: 5px;

  @media screen and (min-width: 345px) {
    font-size: ${rem('10px')};
  }

  @media screen and (min-width: 385px) {
    font-size: ${rem('12px')};
  }
`;

const StyledLink = styled.a`
  color: ${({ theme }) => theme.colors.primary};
`;

const propTypes = {
  className: PropTypes.string,
  hasUnvalidatedData: PropTypes.bool
};

function EstimatedData({ className, hasUnvalidatedData }) {
  return (
    <EstimatedDataContainer className={className}>
      <img src={ChartPieColored} />
      <EstimatedDataLabel>
        <StyledLink
          href="https://ndustrialio.atlassian.net/servicedesk/customer/portal/6/topic/0fa422eb-7b6d-46c8-80db-d49db4b8d75b/article/931790969"
          target="_blank"
          rel="noopener noreferrer"
        >
          Estimated Data
        </StyledLink>{' '}
        {hasUnvalidatedData ? (
          <Fragment>
            and{' '}
            <StyledLink
              href="https://ndustrialio.atlassian.net/servicedesk/customer/portal/6/article/1130856489"
              target="_blank"
              rel="noopener noreferrer"
            >
              Unvalidated Data
            </StyledLink>{' '}
            are{' '}
          </Fragment>
        ) : (
          <Fragment>is </Fragment>
        )}
        being used on this page.
      </EstimatedDataLabel>
    </EstimatedDataContainer>
  );
}

EstimatedData.propTypes = propTypes;

export default EstimatedData;
