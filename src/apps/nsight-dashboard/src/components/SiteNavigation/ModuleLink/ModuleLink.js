import React from 'react';
import PropTypes from 'prop-types';
import queryString from 'qs';

import { getRoute } from '../../../services/routeService';
import MenuLevelModuleLink from './MenuLevelModuleLink';
import TopLevelModuleLink from './TopLevelModuleLink';

const propTypes = {
  changeRoute: PropTypes.func,
  description: PropTypes.string,
  externalApplication: PropTypes.shape({
    domainName: PropTypes.string,
    vhost: PropTypes.string
  }),
  externalApplicationId: PropTypes.number,
  externalLink: PropTypes.string,
  iconUrl: PropTypes.string,
  isTopLevel: PropTypes.bool,
  label: PropTypes.string,
  slug: PropTypes.string
};

function ModuleLink(props) {
  const {
    changeRoute,
    description,
    externalApplication,
    externalApplicationId,
    externalLink,
    iconUrl,
    isTopLevel,
    label,
    slug
  } = props;
  const isExternal = externalApplicationId || externalLink;
  const ModuleLinkComponent = isTopLevel
    ? TopLevelModuleLink
    : MenuLevelModuleLink;
  let linkProps;

  if (isExternal) {
    const path = externalApplicationId
      ? `https://${externalApplication.vhost}.${externalApplication.domainName}/`
      : externalLink;

    linkProps = {
      rel: 'noopener noreferrer',
      target: '_blank',
      to: path
    };
  } else {
    const params = queryString.parse(location.search, {
      ignoreQueryPrefix: true
    });
    // when clicking on a menu item link, remove all params except for organization and facility
    const paramsToRemove = Object.keys(params).filter((key) => {
      return ['organization', 'facility'].indexOf(key.toLowerCase()) === -1;
    });
    const path = `/${getRoute(slug).path}`;

    linkProps = {
      onItemClick: changeRoute,
      removeParams: paramsToRemove,
      to: path
    };
  }

  return (
    <ModuleLinkComponent
      description={description}
      iconUrl={iconUrl}
      isExternal={isExternal}
      label={label}
      linkProps={linkProps}
    />
  );
}

ModuleLink.propTypes = propTypes;

export default ModuleLink;
