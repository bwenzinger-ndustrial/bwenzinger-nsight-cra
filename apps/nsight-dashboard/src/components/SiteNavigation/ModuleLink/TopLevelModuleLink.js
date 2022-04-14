import React from 'react';
import { useLocation } from 'react-router-dom';
import PropTypes from 'prop-types';
import styled from 'styled-components';

import { QueryLink } from '@ndustrial/nsight-common/components';
import { blacken } from '@ndustrial/nsight-common/utils/colors';

import Icon from '../Icon';

const propTypes = {
  className: PropTypes.string,
  iconUrl: PropTypes.string,
  label: PropTypes.string.isRequired,
  linkProps: PropTypes.object.isRequired
};

const Link = styled(QueryLink)`
  display: flex;
  padding: 10px;
  text-decoration: none;
  width: 100%;
`;

const WrapperLink = styled(Link)`
  flex-grow: 1;
  flex-shrink: 0;
  padding: 0;
  position: static;
  width: auto;

  @media screen and (min-width: 897px) and (orientation: landscape),
    screen and (min-width: 768px) and (orientation: portrait) {
    flex-grow: 0;
  }

  @media screen and (min-width: 897px) and (orientation: landscape),
    screen and (min-width: 768px) and (orientation: portrait) {
    flex-grow: 0;
  }
`;

const ButtonContainer = styled.div`
  width: 100%;
`;

const MenuButton = styled.div`
  align-items: center;
  background-color: ${(props) =>
    props && props.$isSelected ? props.theme.colors.button : 'transparent'};
  /* stylelint-disable-next-line sh-waqar/declaration-use-variable */
  color: #fff;
  display: flex;
  flex-direction: column;
  height: 100%;
  justify-content: center;
  min-height: 40px;
  min-width: 70px;
  padding: 10px;
  white-space: nowrap;

  :hover {
    cursor: pointer;
  }

  :hover,
  :focus,
  &[aria-expanded='true'] {
    background-color: ${({ theme }) => blacken(theme.colors.primary, 0.3)};
  }

  @media screen and (min-width: 897px) and (orientation: landscape),
    screen and (min-width: 768px) and (orientation: portrait) {
    flex-direction: row;
    flex-grow: 0;
    min-width: 150px;
    padding: 0 20px;
  }
`;

const Label = styled.span`
  font-size: 0.5rem;
  text-transform: uppercase;
  margin-top: 0.5rem;

  @media screen and (min-width: 897px) and (orientation: landscape),
    screen and (min-width: 768px) and (orientation: portrait) {
    font-size: 0.875rem;
    text-transform: none;
    margin-left: 0.875rem;
    margin-top: 0;
  }
`;

const StyledIcon = styled(Icon)`
  background-color: ${({ theme }) => blacken(theme.colors.primary, 0.3)};
  border-radius: 50%;

  @media screen and (min-width: 897px) and (orientation: landscape),
    screen and (min-width: 768px) and (orientation: portrait) {
    height: 20px;
    width: 20px;
  }

  /* stylelint-disable selector-no-qualifying-type */
  ${MenuButton}:hover &,
  ${MenuButton}:focus &,
  ${MenuButton}[aria-expanded='true'] & {
    background-color: ${({ theme }) => blacken(theme.colors.primary, 0.4)};
  }
  /* stylelint-enable selector-no-qualifying-type */
`;

function UnstyledTopLevelModuleLink(props) {
  const { className, iconUrl, label, linkProps } = props;

  const location = useLocation();

  return (
    <WrapperLink className={className} {...linkProps}>
      <ButtonContainer>
        <MenuButton $isSelected={location.pathname.includes(linkProps.to)}>
          <StyledIcon src={iconUrl} />
          <Label>{label}</Label>
        </MenuButton>
      </ButtonContainer>
    </WrapperLink>
  );
}

UnstyledTopLevelModuleLink.propTypes = propTypes;

const TopLevelModuleLink = styled(UnstyledTopLevelModuleLink)``;

export default TopLevelModuleLink;
