import React from 'react';
import PropTypes from 'prop-types';
import styled, { withTheme } from 'styled-components';

import SummaryItemValue from './SummaryItemValue';

const Container = styled.div`
  display: flex;
  align-items: center;
`;

const CenterContainer = styled.div`
  @media screen and (min-width: 897px) and (orientation: landscape),
    screen and (min-width: 768px) and (orientation: portrait) {
    padding-top: 8px;
  }
`;

const ValueContainer = styled(SummaryItemValue)`
  @media screen and (min-width: 897px) and (orientation: landscape),
    screen and (min-width: 768px) and (orientation: portrait) {
    align-items: center;
    display: flex;
  }
`;

const IconContainer = styled.div`
  position: relative;
  margin-right: 24px;

  img {
    width: 45px;

    @media screen and (min-width: 560px) {
      width: 55px;
    }
  }

  @media screen and (min-width: 897px) and (orientation: landscape),
    screen and (min-width: 768px) and (orientation: portrait) {
    align-items: center;
  }
`;

const propTypes = {
  className: PropTypes.string,
  summary: PropTypes.array,
  theme: PropTypes.object
};

const SummaryItem = withTheme(function({ className, item, summary, theme }) {
  return (
    <Container className={className}>
      <IconContainer>
        <img src={item.config.icon} />
      </IconContainer>
      <CenterContainer>
        <ValueContainer
          config={item.config}
          percentChange={item.percentChange}
          value={item.value}
          theme={theme}
        />
      </CenterContainer>
    </Container>
  );
});

SummaryItem.propTypes = propTypes;

export default SummaryItem;
