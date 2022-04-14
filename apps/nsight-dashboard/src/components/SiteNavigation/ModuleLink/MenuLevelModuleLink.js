import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

import { External as UnstyledExternalLinkIcon } from '@ndustrial/nd-icons-svg';
import { QueryLink } from '@ndustrial/nsight-common/components';
import { whiten } from '@ndustrial/nsight-common/utils/colors';

import Icon from '../Icon';

const propTypes = {
  description: PropTypes.string.isRequired,
  iconUrl: PropTypes.string,
  isExternal: PropTypes.bool,
  label: PropTypes.string.isRequired,
  linkProps: PropTypes.object.isRequired
};

const IconContainer = styled.div`
  border-right: 1px solid ${({ theme }) => whiten(theme.colors.primary, 0.1)};
  padding: 0 4px;
`;

const Label = styled.strong`
  /* stylelint-disable-next-line sh-waqar/declaration-use-variable */
  color: #fff;
  font-size: 0.75rem;
  text-decoration: none;
`;

const Description = styled.em`
  /* stylelint-disable-next-line sh-waqar/declaration-use-variable */
  color: #fff;
  font-size: 0.625rem;
  text-decoration: none;
`;

const MenuItemInnerContainer = styled.div`
  display: flex;
  flex-direction: column;
  margin: 0 30px 0 10px;

  ${Description} {
    margin-top: 5px;
  }
`;

const ExternalLinkIcon = styled(UnstyledExternalLinkIcon)``;

const Link = styled(QueryLink)`
  display: flex;
  padding: 10px;
  text-decoration: none;
  width: 100%;

  > ${ExternalLinkIcon} {
    stroke: #fff;
    height: 14px;
    position: absolute;
    right: 10px;
    top: 50%;
    transform: translateY(-50%);
    width: 14px;
  }
`;

function MenuLevelModuleLink(props) {
  const { description, iconUrl, isExternal, label, linkProps } = props;

  return (
    <Link {...linkProps}>
      <IconContainer>
        <Icon src={iconUrl} />
      </IconContainer>
      <MenuItemInnerContainer>
        <Label>{label}</Label>
        <Description>{description}</Description>
      </MenuItemInnerContainer>
      {isExternal && <ExternalLinkIcon />}
    </Link>
  );
}

MenuLevelModuleLink.propTypes = propTypes;

export default MenuLevelModuleLink;
