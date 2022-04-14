import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

import SummaryItem from './SummaryItem';

const StyledSummaryItem = styled(SummaryItem)`
  margin-bottom: 25px;

  @media screen and (min-width: 1200px) and (orientation: landscape),
    screen and (min-width: 897px) and (orientation: portrait) {
    margin: 0;
  }
`;

const SummaryWrapper = styled.div`
  display: flex;
  flex-direction: column;
  top: 100%;
  padding: 16px;
  vertical-align: middle;
  z-index: 0;

  @media screen and (min-width: 1200px) and (orientation: landscape),
    screen and (min-width: 897px) and (orientation: portrait) {
    display: flex;
    align-items: center;
    position: relative;
    flex-direction: row;
    padding: 48px 16px;
    top: 0;
  }
`;

const propTypes = {
  className: PropTypes.string,
  summary: PropTypes.array,
  theme: PropTypes.object
};

function Summary({ className, summary, theme }) {
  return (
    <SummaryWrapper className={className}>
      {summary.map((item, idx) => (
        <StyledSummaryItem summary={summary} key={idx} item={item} />
      ))}
    </SummaryWrapper>
  );
}

Summary.propTypes = propTypes;

export default Summary;
