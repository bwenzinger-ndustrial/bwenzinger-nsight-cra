import React from 'react';
import { rem } from 'polished';
import styled from 'styled-components';

import { Info } from '@ndustrial/nd-icons-svg';

const Container = styled.div`
  align-items: center;
  display: flex;
  flex-direction: column;
  justify-content: center;

  @media screen and (min-width: 897px) and (orientation: landscape),
    screen and (min-width: 768px) and (orientation: portrait) {
    align-items: center;
    justify-content: center;
  }
`;

const StyledInfo = styled(Info)`
  stroke: ${({ theme }) => theme.colors.primary};
  height: 1em;
  margin-bottom: 5px;
  width: 1em;

  @media screen and (min-width: 897px) and (orientation: landscape),
    screen and (min-width: 768px) and (orientation: portrait) {
    margin-bottom: 12px;
  }
`;

const TextDiv = styled.div`
  /* stylelint-disable-next-line sh-waqar/declaration-use-variable */
  color: ${({ theme }) => theme.colors.text};
  font-size: ${rem('10px')};
  font-weight: 300;
  letter-spacing: 0;
  line-height: 0.9;
  text-align: center;
`;

const SupportLink = styled.a`
  color: ${({ theme }) => theme.colors.primary};
  font-size: ${rem('9px')};
  font-weight: 400;
  letter-spacing: 0;
`;

function KPIEmptyChange() {
  return (
    <Container>
      <StyledInfo />
      <TextDiv>
        <div>For help contact:</div>{' '}
        <SupportLink
          href="mailto:support@ndustrial.io"
          onClick={(event) => event.stopPropagation()}
        >
          support@ndustrial.io
        </SupportLink>
      </TextDiv>
    </Container>
  );
}

export default KPIEmptyChange;
