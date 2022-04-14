import React from 'react';
import { rem } from 'polished';
import PropTypes from 'prop-types';
import styled from 'styled-components';

import unplugged from '../assets/unplugged.svg';

const propTypes = {
  children: PropTypes.func
};

const defaultProps = {
  // eslint-disable-next-line react/display-name
  children: () => (
    <ErrorText>
      Something isn’t right here,
      <br />
      try refreshing the page.
    </ErrorText>
  )
};

const GradientContainer = styled.div`
  background: repeating-linear-gradient(
    45deg,
    #efefef,
    #efefef 2px,
    #f5f5f5 2px,
    #f5f5f5 12px
  );
  opacity: 0.6;
  width: 100%;
`;

const ImageContainer = styled.div`
  border: 1px solid #d8d8d8;
  height: 321px;
  background: url(${unplugged}) no-repeat center;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
`;

const Text = styled.p`
  color: ${({ theme }) => theme.colors.text};
  font-size: ${rem('14px')};
  font-weight: 300;
  text-align: center;
  margin: 5px auto;
  max-width: 350px;
`;

const ErrorText = styled(Text)`
  opacity: 0.5;
`;

const ErrorHeader = styled.h2`
  color: ${({ theme }) => theme.colors.text};
  font-weight: 300;
  text-align: center;
  padding-top: 15px;
  margin: 0;
  opacity: 0.5;
`;

const Anchor = styled.a`
  color: ${({ theme }) => theme.colors.primary};
  font-size: ${rem('14px')};
  font-weight: 400;
  text-align: center;
  display: block;
  padding-bottom: 15px;
`;

function ErrorBanner({ children }) {
  return (
    <GradientContainer>
      <ImageContainer>
        <div>
          <ErrorHeader>Whoops!</ErrorHeader>
          {children()}
        </div>
        <div>
          <Text>For any help or questions please contact </Text>
          <Anchor href="mailto:support@ndustrial.io">
            support@ndustrial.io
          </Anchor>
        </div>
      </ImageContainer>
    </GradientContainer>
  );
}

ErrorBanner.propTypes = propTypes;
ErrorBanner.defaultProps = defaultProps;

export { ErrorBanner, ErrorText };
