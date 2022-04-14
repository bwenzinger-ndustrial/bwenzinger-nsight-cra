import React, { Component, ReactNode } from 'react';
import styled, { css } from 'styled-components';
import {
  animations,
  themeHelper,
  defaultTheme
} from '@ndustrial/nd-theme-react';
import { Close } from '@ndustrial/nd-icons-svg';
import { NdAsideProps } from './types';
export * from './types';

const fadeOut = animations.createFadeOut('400px');

interface AsideMessageStyledProps {
  isDismissed: boolean;
  type: string;
}

interface AsideTitleStyledProps {
  type: string;
}

const AsideIcon = styled.div`
  display: flex;
  flex-direction: column;
  padding: 0 5px;
`;

const TextContainer = styled.div`
  display: flex;
  flex-direction: column;
  padding: 0 12px;
`;

const AsideText = styled.p`
  color: ${({ theme }) => theme.colors.textLight};
  font-size: 12px;
  font-weight: 300;
  line-height: 16px;
  letter-spacing: 0.5px;
  margin: 5px 0;
  min-height: 30px;
`;

const ActionText = styled.div`
  cursor: pointer;
`;

const AsideTitle = styled.h2<AsideTitleStyledProps>`
  color: ${({ theme, type }) => theme.colors[type]};
  font-size: 14px;
  font-weight: 700;
  line-height: 20px;
  margin: 0;
  letter-spacing: 0.5px;
`;

const AsideMessage = styled.div<AsideMessageStyledProps>`
  background: ${({ theme, type }) =>
    themeHelper.whiten(theme.colors[type], 0.95)};
  border-left: 5px solid ${({ theme, type }) => theme.colors[type]};
  color: ${({ theme, type }) => theme.colors[type]};
  display: flex;
  max-width: 624px;
  padding: 12px;

  ${({ isDismissed }) =>
    isDismissed &&
    css`
      animation: ${fadeOut} 1s ease-out forwards;
    `}
`;

const AsideGroup = styled.div`
  flex-direction: column;
  display: flex;

  ${AsideMessage}:not(:last-child) {
    margin-bottom: 5px;
  }
`;

class AsideComponent extends Component<NdAsideProps> {
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
    const { children, className, dismissible, icon, title, type } = this.props;

    return (
      <AsideMessage
        className={className}
        isDismissed={this.state.isDismissed}
        type={type}
      >
        <AsideIcon>
          {icon({ stroke: defaultTheme.colors[type], height: 20, width: 20 })}
        </AsideIcon>
        <TextContainer>
          {title && <AsideTitle type={type}>{title}</AsideTitle>}
          <AsideText>{children}</AsideText>
        </TextContainer>
        {dismissible && (
          <ActionText onClick={this.handleDismiss}>
            <Close fill="#979797" />
          </ActionText>
        )}
      </AsideMessage>
    );
  }
}

export { ActionText, AsideComponent as Aside, AsideGroup };
