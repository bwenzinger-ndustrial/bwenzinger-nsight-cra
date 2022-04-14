import { lazy } from 'react';

import { NotFound as NotFoundPage } from '@ndustrial/nsight-common/components';

export const ROUTE_DEFAULT = {
  Component: NotFoundPage,
  path: 'not-found'
};

export const routeConfig = {
  '@ndustrial/nsight-coincident-peak': {
    Component: lazy(() => import('@ndustrial/nsight-coincident-peak')),
    path: 'coincident-peak'
  },
  '@ndustrial/nsight-facility-overview': {
    Component: lazy(() => import('@ndustrial/nsight-facility-overview')),
    path: 'facility-dashboard'
  },
  '@ndustrial/nsight-emissions': {
    Component: lazy(() => import('@ndustrial/nsight-emissions')),
    path: 'emissions'
  },
  '@ndustrial/nsight-device-status': {
    Component: lazy(() => import('@ndustrial/nsight-device-status')),
    path: 'device-status'
  },
  '@ndustrial/nsight-facility-admin': {
    Component: lazy(() => import('@ndustrial/nsight-facility-admin')),
    path: 'facility-admin/profile'
  },
  '@ndustrial/nsight-legacy-analytics': {
    Component: lazy(() => import('@ndustrial/nsight-legacy-analytics')),
    path: 'analytics'
  },
  '@ndustrial/nsight-legacy-alerts': {
    Component: lazy(() => import('@ndustrial/nsight-legacy-alerts')),
    path: 'alerts'
  },
  '@ndustrial/nsight-legacy-facility-status': {
    Component: lazy(() => import('@ndustrial/nsight-legacy-facility-status')),
    path: 'status'
  },
  '@ndustrial/nsight-legacy-utility-bills': {
    Component: lazy(() => import('@ndustrial/nsight-legacy-utility-bills')),
    path: 'utility-bills'
  },
  '@ndustrial/nsight-utility-bill-manager': {
    Component: lazy(() => import('@ndustrial/nsight-utility-bill-manager')),
    path: 'utility-bill-manager'
  },
  '@ndustrial/nsight-portfolio-dashboard': {
    Component: lazy(() => import('@ndustrial/nsight-portfolio-dashboard')),
    path: 'portfolio-dashboard'
  },
  '@ndustrial/nsight-portfolio-rates': {
    Component: lazy(() => import('@ndustrial/nsight-portfolio-rates')),
    path: 'portfolio-rates'
  },
  '@ndustrial/nsight-rate-tariffs': {
    Component: lazy(() => import('@ndustrial/nsight-rate-tariffs')),
    path: 'rate-tariffs'
  },
  '@ndustrial/nsight-utility-contract-upload': {
    Component: lazy(() => import('@ndustrial/nsight-utility-contract-upload')),
    path: 'utility-contract-upload'
  },
  '@ndustrial/nsight-projects': {
    Component: lazy(() => import('@ndustrial/nsight-projects')),
    path: 'projects'
  }
};

export const getRoute = (slug) => routeConfig[slug] || ROUTE_DEFAULT;

export const defaultApplicationConfig = {
  electricities: '@ndustrial/nsight-coincident-peak'
};

export const getDefaultApplicationRoute = (groupings, organizationSlug) => {
  const applicationSlugs = groupings.reduce((memo, grouping) => {
    grouping.applicationModules.forEach(({ slug }) => {
      memo.push(slug);
    });

    return memo;
  }, []);

  // Decision tree for what a user/orgs's default application is:
  // 1. If there is a default set for an organization, use that
  // 2. If not, if the user/org has access to Portfolio Dashboard, use that
  // 3. If not both of those, use the first application module that we find
  if (defaultApplicationConfig[organizationSlug]) {
    return getRoute(defaultApplicationConfig[organizationSlug]).path;
  } else if (
    applicationSlugs.indexOf('@ndustrial/nsight-portfolio-dashboard') !== -1
  ) {
    return getRoute('@ndustrial/nsight-portfolio-dashboard').path;
  } else {
    return getRoute(applicationSlugs[0]).path;
  }
};

export const isSelectedGroup = (applicationModules, path) => {
  let isSelected = false;

  applicationModules.forEach((module) => {
    if (path.includes(routeConfig[module.slug]?.path)) {
      isSelected = true;
    }
  });

  return isSelected;
};
