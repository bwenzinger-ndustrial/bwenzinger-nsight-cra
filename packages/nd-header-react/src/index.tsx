import React from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import { NdHeaderReactProps } from './types';
export * from './types';

const DEFAULT_HEADER_HEIGHT = 65;

const HeaderContainer = styled.div`
  align-items: stretch;
  background: ${({ theme }) => theme.colors.primary};
  box-shadow: 0px 2px 0px rgba(0, 0, 0, 0.15);
  display: flex;
  height: ${DEFAULT_HEADER_HEIGHT}px;
  justify-content: space-between;
  position: relative;
  width: 100%;
`;

const HeaderContent = styled.div<{ children: any }>`
  align-items: center;
  display: flex;
  flex: 1;
  justify-content: ${({ children }) => {
    return children && children.length > 1 ? 'space-between' : 'flex-end';
  }};
`;

const HeaderLogoLink = styled(Link)`
  align-self: stretch;
  background: rgba(0, 0, 0, 0.1);
  display: none;
  width: 150px;

  @media screen and (min-width: 897px) and (orientation: landscape),
    screen and (min-width: 768px) and (orientation: portrait) {
    align-items: center;
    display: flex;
    justify-content: center;
  }
`;

function Header(props: NdHeaderReactProps) {
  return (
    <HeaderContainer className={props.className}>
      <HeaderLogoLink to={props.homePath ?? '/'}>
        {typeof props.logoSrc === 'string' ? (
          <img src={props.logoSrc} alt={props.appName} />
        ) : (
          props.logoSrc
        )}
      </HeaderLogoLink>
      <HeaderContent>{props.children}</HeaderContent>
    </HeaderContainer>
  );
}

export { DEFAULT_HEADER_HEIGHT, Header };
