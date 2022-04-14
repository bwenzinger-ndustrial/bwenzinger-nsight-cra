import { transparentize } from 'polished';
import PropTypes from 'prop-types';
import React, { Component } from 'react';
import styled, { css } from 'styled-components';
import { animations, themeHelper } from '@ndustrial/nd-theme-react';
import { NdFlashMessageProps } from './types';
export * from './types';

const fadeOut = animations.createFadeOut('400px');

const FlashMessageIcon = styled.div`
  display: flex;
  justify-content: center;
  padding: 5px;
  flex-direction: column;
`;

const TextContainer = styled.div`
  display: flex;
  flex-grow: 2;
  flex-direction: column;

  @media screen and (min-width: 550px) {
    flex-direction: row;
  }
`;

const FlashMessageText = styled.p`
  flex-grow: 2;
  font-weight: 500;
  justify-content: center;
  margin: 0;
  min-height: 30px;
  padding: 10px;
`;

const ActionText = styled.div`
  align-items: center;
  border: 0 solid ${({ theme }) => transparentize(0.9, theme.colors.text)};
  border-top-width: 1px;
  color: ${({ theme }) => theme.colors.textLight};
  cursor: pointer;
  display: flex;
  font-weight: 500;
  justify-content: center;
  margin: 0 5px;
  padding: 10px 5px;

  @media screen and (min-width: 550px) {
    border-left-width: 1px;
    border-top-width: 0;
    margin: 5px 0;
    padding: 5px 10px;
  }
`;

interface FlashMessageContainerProps {
  isDismissed?: boolean;
  type: string;
}

const FlashMessageContainer = styled.div<FlashMessageContainerProps>`
  background: ${({ theme, type }) =>
    themeHelper.whiten(theme.colors[type], 0.95)};
  border: 1px solid ${({ theme, type }) => theme.colors[type]};
  color: ${({ theme, type }) => theme.colors[type]};
  display: flex;

  ${({ isDismissed }) =>
    isDismissed &&
    css`
      animation: ${fadeOut} 1s ease-out forwards;
    `}

  ${FlashMessageIcon} {
    background-color: ${({ theme, type }) => theme.colors[type]};
  }
`;

const FlashMessageGroup = styled.div`
  flex-direction: column;
  display: flex;

  ${FlashMessageContainer}:not(:last-child) {
    margin-bottom: 5px;
  }
`;

class FlashMessageComponent extends Component<NdFlashMessageProps> {
  state = {
    isDismissed: false
  };

  handleDismiss = () => {
    this.setState({ isDismissed: true });

    if (this.props.onDismiss) {
      this.props.onDismiss();
    }
  };

  render() {
    const { children, className, dismissible, icon, type } = this.props;

    return (
      <FlashMessageContainer
        className={className}
        isDismissed={this.state.isDismissed}
        type={type}
      >
        <FlashMessageIcon>
          {icon({ stroke: '#fff', height: 20, width: 20 })}
        </FlashMessageIcon>
        <TextContainer>
          <FlashMessageText>{children}</FlashMessageText>
          {dismissible && (
            <ActionText onClick={this.handleDismiss}>Dismiss</ActionText>
          )}
        </TextContainer>
      </FlashMessageContainer>
    );
  }
}

export { ActionText, FlashMessageComponent as FlashMessage, FlashMessageGroup };
