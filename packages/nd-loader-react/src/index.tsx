import React from 'react';
import styled, { keyframes } from 'styled-components';
import { NdLoaderReactProps } from './types';
export * from './types';

const pulse = keyframes`
  0%,
  80%,
  100% {
    transform: scale(0);
  }
  40% {
    transform: scale(1);
  }
`;

const LoaderContainer = styled.div`
  align-items: center;
  display: flex;
  flex-direction: column;
  justify-content: center;
  padding: 16px 0px;
  width: 100%;
`;

const LoaderDot = styled.div`
  background-color: ${({ theme }) => theme.colors.gray};
  border-radius: 100%;
  display: inline-block;
  height: 12px;
  margin-right: 8px;
  width: 12px;
  animation: ${pulse} 1.4s infinite ease-in-out both;
  &:last-child {
    margin-right: 0;
  }
  &:nth-child(1) {
    animation-delay: -0.32s;
  }
  &:nth-child(2) {
    animation-delay: -0.16s;
  }
`;

const LoaderLabel = styled.label`
  color: ${({ theme }) => theme.colors.gray};
  font-family: ${({ theme }) => theme.fonts.primary};
  font-size: 1rem;
  font-weight: 700;
  margin-top: 16px;
  text-transform: uppercase;
`;

function Loader(props: NdLoaderReactProps) {
  const { className, label, ...rest } = props;

  return (
    <LoaderContainer {...rest} className={`nd-loader ${className}`}>
      <div>
        <LoaderDot />
        <LoaderDot />
        <LoaderDot />
      </div>
      {label && <LoaderLabel>{label}</LoaderLabel>}
    </LoaderContainer>
  );
}

export { Loader, LoaderContainer, LoaderDot, LoaderLabel };
