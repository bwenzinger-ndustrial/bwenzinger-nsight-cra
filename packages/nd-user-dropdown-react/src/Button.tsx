import PropTypes from 'prop-types';
import React from 'react';
import styled from 'styled-components';
import { ChevronDown } from '@ndustrial/nd-icons-svg';
import { Button as UnstyledContainer } from '@ndustrial/nd-menu-button-react';
import createSanitizedComponent from './createSanitizedComponent';

const ArrowIcon = styled(createSanitizedComponent(ChevronDown))`
  display: inline-block;
  fill: #fff;
  height: 24px;
  transform: ${({ isOpen }) => (isOpen ? 'rotate(180deg)' : 'rotate(0deg)')};
  transform-origin: 50% 50%;
  transition: all 0.2s cubic-bezier(0.165, 0.84, 0.44, 1);
  width: 24px;
`;

const UserInfo = styled.div`
  color: #fff;
  display: none;
  flex: 1;
  font-size: 1rem;
  font-weight: 700;
  letter-spacing: 1px;
  text-shadow: 0 1px 0 rgba(0, 0, 0, 0.1);
  text-transform: uppercase;

  @media screen and (min-width: 550px) {
    display: block;
  }
`;

const PictureContainer = styled.div`
  height: 35px;
  width: 35px;
`;

const UserAvatar = styled.img`
  border: 2px solid #fff;
  border-radius: 100px;
  box-shadow: 0 1px 0 rgba(0, 0, 0, 0.1);
  height: 100%;
  width: 100%;
`;

const Container = styled(UnstyledContainer)`
  align-items: center;
  background: transparent;
  border: none;
  cursor: pointer;
  display: flex;
  justify-content: center;
  outline-color: #ccc;
  outline-width: thin;
  padding: 5px 0;

  ${ArrowIcon} {
    margin-right: 8px;
  }

  ${UserInfo} {
    margin-right: 16px;
  }
`;

interface UserDropdownButtonProps {
  avatarSrc?: string;
  className?: string;
  isOpen?: boolean;
  userName?: string;
}

function Button({
  avatarSrc = '',
  className = '',
  isOpen,
  userName = ''
}: UserDropdownButtonProps) {
  return (
    <Container className={className} tag="div">
      <ArrowIcon aria-hidden isOpen={isOpen} />
      <UserInfo>{userName}</UserInfo>
      <PictureContainer>
        <picture>
          <source srcSet={avatarSrc} />
          <UserAvatar
            src="https://s3-us-west-2.amazonaws.com/ndustrialio-public/images/profile-placeholder.svg"
            alt={userName}
          />
        </picture>
      </PictureContainer>
    </Container>
  );
}

export default Button;
