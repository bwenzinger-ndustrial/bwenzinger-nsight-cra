import React, { useState } from 'react';
import { rem } from 'polished';
import PropTypes from 'prop-types';
import styled from 'styled-components';

import PortfolioRatesTable from './PortfolioRatesTable';
import QuickFilterInput from './QuickFilterInput';

const ContainerDiv = styled.div`
  background-color: #e3e3e3;
  flex-grow: 1;
  flex-shrink: 0;
  padding: 10px;

  @media screen and (min-width: 960px) {
    flex-grow: 1;
    width: auto;
  }

  @media screen and (min-width: 1440px) {
    align-content: flex-start;
    display: flex;
    flex-wrap: wrap;
  }
`;

const HeaderText = styled.div`
  color: ${({ theme }) => theme.colors.text};
  font-size: ${rem('20px')};
  font-weight: 300;
  line-height: 1.167;
  margin: 0;

  @media screen and (min-width: 897px) and (orientation: landscape),
    screen and (min-width: 768px) and (orientation: portrait) {
    font-size: ${rem('24px')};
  }
`;

const Header = styled.div`
  border-bottom: 1px solid #d8d8d8;
  padding: 16px 10px;
`;

const propTypes = {
  portfolioRatesData: PropTypes.array
};

const PortfolioRates = (props) => {
  const { portfolioRatesData } = props;
  const [quickFilterText, setQuickFilterText] = useState('');

  return (
    <>
      <Header>
        <HeaderText>Portfolio Rates</HeaderText>
      </Header>
      <ContainerDiv>
        <QuickFilterInput onChangeCallback={setQuickFilterText} />
        <PortfolioRatesTable
          portfolioRatesData={portfolioRatesData}
          quickFilterText={quickFilterText}
          {...props}
        />
      </ContainerDiv>
    </>
  );
};

PortfolioRates.propTypes = propTypes;

export default PortfolioRates;
