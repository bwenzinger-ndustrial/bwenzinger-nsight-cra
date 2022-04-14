import React from 'react';
import { rem } from 'polished';
import PropTypes from 'prop-types';
import styled from 'styled-components';

import { WarningTriangle } from '@ndustrial/nd-icons-svg';
import { Loader } from '@ndustrial/nd-loader-react';
import { Tooltip } from '@ndustrial/nd-tooltip-react';

import { ErrorBanner } from './ErrorBanner';

const WarningIcon = styled(WarningTriangle)`
  height: 20px;
  width: 20px;
  stroke: ${({ theme }) => theme.colors.failure};
`;

const Top = styled.div`
  position: absolute;
  top: ${({ isDraggable }) => (isDraggable ? '34px' : '14px')};

  @media screen and (min-width: 897px) and (orientation: landscape),
    screen and (min-width: 768px) and (orientation: portrait) {
    top: 14px;
  }
`;

const Right = styled(Top)`
  right: 19px;
`;

const Left = styled(Top)`
  left: 19px;

  @media screen and (min-width: 897px) and (orientation: landscape),
    screen and (min-width: 768px) and (orientation: portrait) {
    left: ${({ isDraggable }) => (isDraggable ? '39px' : '19px')};
  }
`;

const IntervalLoading = styled.div`
  left: 19px;
  position: absolute;
  top: -2px;
`;

const Title = styled.div`
  color: ${({ theme }) => theme.colors.text};
  text-transform: uppercase;
  font-size: ${rem('14px')};
  font-weight: 600;
`;

const Subtitle = styled.div`
  color: #979797;
  font-size: ${rem('14px')};
  text-transform: uppercase;
`;

const ErrorText = styled.div`
  /* stylelint-disable-next-line sh-waqar/declaration-use-variable */
  color: ${({ theme }) => theme.colors.failure};
  font-size: ${rem('14px')};
  text-transform: uppercase;
`;

const Header = styled.div`
  height: 35px;
  margin-bottom: 10px;
  margin-top: ${({ isDraggable }) => (isDraggable ? '20px' : '0')};
  text-align: center;

  @media screen and (min-width: 897px) and (orientation: landscape),
    screen and (min-width: 768px) and (orientation: portrait) {
    margin-top: 0;
  }

  ${Title},
  ${Subtitle},
  ${ErrorText} {
    margin-top: 5px;
    text-align: center;
  }
`;

const Content = styled.div`
  display: flex;
  flex: 1;
  margin-top: 4px;
  justify-content: center;
`;

const DragSide = styled.div`
  background-color: ${({ error, theme }) =>
    error ? theme.colors.failure : '#f7f7f7'};
  border-bottom: 1px solid #d8d8d8;
  height: 20px;
  width: 100%;

  @media screen and (min-width: 897px) and (orientation: landscape),
    screen and (min-width: 768px) and (orientation: portrait) {
    border-right: 1px solid #d8d8d8;
    height: 100%;
    width: 20px;
  }
`;

const Container = styled.div`
  background-color: #fff;
  border: 1px solid #d8d8d8;
  display: flex;
  flex-direction: column;
  height: ${({ isFullHeight }) => (isFullHeight ? '100%' : '400px')};
  padding: 14px 19px 19px;
  position: relative;

  @media screen and (min-width: 897px) and (orientation: landscape),
    screen and (min-width: 768px) and (orientation: portrait) {
    padding: ${({ isDraggable }) =>
      isDraggable ? '14px 19px 19px 39px;' : '14px 19px 19px'};
  }

  ${DragSide} {
    left: 0;
    position: absolute;
    top: 0;

    @media screen and (min-width: 897px) and (orientation: landscape),
      screen and (min-width: 768px) and (orientation: portrait) {
      margin-right: 18px;
    }
  }
`;

Card.propTypes = {
  children: PropTypes.node.isRequired,
  className: PropTypes.string,
  error: PropTypes.string,
  hasData: PropTypes.bool,
  isDraggable: PropTypes.bool,
  isFullHeight: PropTypes.bool,
  isLoading: PropTypes.bool,
  renderLeft: PropTypes.func,
  renderRight: PropTypes.func,
  subtitle: PropTypes.node,
  title: PropTypes.node,
  warning: PropTypes.string
};

const defaultProps = {
  error: null,
  subtitle: null
};

function Card({
  children,
  className,
  error,
  hasData,
  isDraggable,
  isFullHeight,
  isLoading,
  renderLeft,
  renderRight,
  subtitle,
  title,
  warning
}) {
  return (
    <Container
      className={className}
      isDraggable={isDraggable}
      isFullHeight={isFullHeight}
    >
      {isDraggable && <DragSide error={error} />}
      {renderRight && <Right isDraggable={isDraggable}>{renderRight()}</Right>}
      {!isLoading && (error || warning) && (
        <Left isDraggable={isDraggable}>
          <Tooltip content={error || warning} placement="right">
            <WarningIcon />
          </Tooltip>
        </Left>
      )}
      {!isLoading && !error && !warning && renderLeft && (
        <Left isDraggable={isDraggable}>{renderLeft()}</Left>
      )}
      {isLoading && hasData && (
        <IntervalLoading>
          <Loader />
        </IntervalLoading>
      )}
      <Header isDraggable={isDraggable}>
        <Title>{title}</Title>
        {subtitle && !error && <Subtitle>{subtitle}</Subtitle>}
        {error && <ErrorText>{error}</ErrorText>}
      </Header>
      <Content>
        {isLoading && !hasData && <Loader label="Loading" />}
        {!isLoading && !hasData && error && <ErrorBanner />}
        {(!isLoading || hasData) && !error && children}
      </Content>
    </Container>
  );
}

export { Content, Header, Subtitle, Title };
Card.defaultProps = defaultProps;
export default Card;
