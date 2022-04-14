import React from 'react';
import styled from 'styled-components';
import { NdButtonProps } from './types';
export * from './types';

function ButtonComponent(props: NdButtonProps) {
  const {
    children,
    className,
    component = 'button',
    disabled,
    onClick,
    icon,
    ...rest
  } = props;

  /*
    This is a workaround/alternative that seems necessary to support
    rendering the icon. Using the 'as' option provided by
    styled-component was not rendering the icon provided via the
    icon prop. I haven't dug into the styled-components source
    code, but I am guessing it does some filtering of props.
  */
  const Component = component;

  return (
    // @ts-ignore next-line
    <Component
      className={className}
      disabled={disabled}
      onClick={onClick}
      {...rest}
    >
      {icon}
      {children}
    </Component>
  );
}

const PrimaryButton = styled(ButtonComponent)`
  background-color: #2764ae;
  border: 0;
  color: #fff;
  font-size: 14px;
  font-weight: 500;
  letter-spacing: 0.75px;
  line-height: 1.143;
  padding: 12px 16px;
  text-decoration: none;
  text-transform: uppercase;
  user-select: none;

  svg {
    font-size: 20px;
    margin-bottom: -5px;
    margin-right: ${({ children }) => (children ? '12px' : 0)};
    margin-top: -2px;
    stroke: #fff;
  }

  &:active {
    background-color: #1b467a;
  }

  &:hover,
  &:focus {
    background-color: #215594;
    cursor: pointer;
  }

  &:focus {
    outline: 2px solid #2764ae;
    outline-offset: 2px;
  }

  &:disabled,
  &.disabled {
    background-color: #d8d8d8;
    color: #838383;
    cursor: not-allowed;
    pointer-events: none;

    svg {
      stroke: #838383;
    }
  }
`;

const SecondaryButton = styled(PrimaryButton)`
  background-color: #fff;
  border: 1px solid #2764ae;
  color: #2764ae;
  padding: 11px 15px;

  svg {
    stroke: #2764ae;
  }

  &:active,
  &:hover,
  &:focus {
    color: #fff;

    svg {
      stroke: #fff;
    }
  }

  &:active {
    background-color: #2764ae;
  }

  &:hover,
  &:focus {
    border-color: #215594;
  }

  &:disabled,
  &.disabled {
    background-color: #fff;
    border-color: #d8d8d8;
  }
`;

const GhostButton = styled(PrimaryButton)`
  background-color: #fff;
  color: #2764ae;

  svg {
    stroke: #2764ae;
  }

  &:active,
  &:hover,
  &:focus {
    color: #2764ae;

    svg {
      stroke: #2764ae;
    }
  }

  &:active {
    background-color: #f4f7fb;
  }

  &:hover {
    background-color: #f5f5f5;
  }

  &:focus {
    background-color: #fff;
  }

  &:disabled,
  &.disabled {
    background-color: #fff;
  }
`;

const DangerButton = styled(PrimaryButton)`
  background-color: #cd425b;

  &:active {
    background-color: #902e40;
  }

  &:hover,
  &:focus {
    background-color: #ae384d;
  }
`;

const ButtonGroup = styled.div`
  align-items: center;
  display: inline-flex;
  flex-wrap: wrap;
  margin: -8px;

  ${PrimaryButton} {
    margin: 8px;
  }
`;

export {
  ButtonGroup,
  DangerButton,
  GhostButton,
  PrimaryButton,
  SecondaryButton
};
