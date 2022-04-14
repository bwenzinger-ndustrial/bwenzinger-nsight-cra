import React from 'react';
import { rem } from 'polished';
import PropTypes from 'prop-types';
import styled from 'styled-components';

const propTypes = {
  className: PropTypes.string
};

const Anchor = styled.a`
  color: ${({ theme }) => theme.colors.primary};
`;

const StatusHeaderText = styled.p`
  color: ${({ theme }) => theme.colors.text};
  font-size: ${rem('14px')};
  font-weight: 300;
  line-height: 1.2;
  margin: 0;
  text-align: center;
`;

const HeaderText = styled(StatusHeaderText)`
  font-weight: 400;
  text-transform: uppercase;

  @media screen and (min-width: 897px) and (orientation: landscape),
    screen and (min-width: 768px) and (orientation: portrait) {
    font-size: ${rem('20px')};
  }
`;

const HeaderSubText = styled(StatusHeaderText)`
  letter-spacing: 0.5px;
`;

const HeaderSubTextContainer = styled.div``;

const HeaderTextContainer = styled.div`
  ${HeaderSubTextContainer} {
    margin: 15px 0 30px;
  }
`;

function DeviceStatusText({ className }) {
  return (
    <HeaderTextContainer className={className}>
      <HeaderText as="h2">Facility Equipment</HeaderText>
      <HeaderSubTextContainer>
        <HeaderSubText>
          nSight relies on accurate reporting from the devices located around
          your facility. If you notice data is not being collected for an area
          of your facility, or you have changed your facility’s equipment,
          please contact{' '}
          <Anchor href="mailto: support@ndustrial.io">
            support@ndustrial.io
          </Anchor>
          .
        </HeaderSubText>
      </HeaderSubTextContainer>
    </HeaderTextContainer>
  );
}

DeviceStatusText.propTypes = propTypes;

export default DeviceStatusText;
