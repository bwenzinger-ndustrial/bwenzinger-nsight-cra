import React from 'react';
import { rem } from 'polished';
import PropTypes from 'prop-types';
import styled from 'styled-components';

import { WarningTriangle } from '@ndustrial/nd-icons-svg';

const Container = styled.div`
  align-items: center;
  display: flex;
  padding: 40px 0;
`;
const DividerLine = styled.div`
  background-color: ${({ theme }) => theme.colors.gray};
  flex-grow: 1;
  height: 1px;
`;
const DividerText = styled.div`
  font-size: ${rem('12px')};
  font-weight: 700;
  padding: 0 10px;
  text-transform: uppercase;
`;
const WarningIcon = styled(WarningTriangle)`
  height: 12px;
  margin-right: 5px;
  stroke: ${({ theme }) => theme.colors.failure};
  width: 12px;
`;

const propTypes = {
  warning: PropTypes.string
};

function DetailCardDivider({ warning }) {
  return (
    <Container>
      <DividerLine />
      <DividerText>{warning && <WarningIcon />} kpi breakdown</DividerText>
      <DividerLine />
    </Container>
  );
}

DetailCardDivider.propTypes = propTypes;

export default DetailCardDivider;
