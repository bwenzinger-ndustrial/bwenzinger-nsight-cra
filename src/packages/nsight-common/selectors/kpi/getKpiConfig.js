import { createSelector } from 'reselect';

import getSelectedFacility from '../facility/getSelectedFacility';
import getActiveMetric from '../metric/getActiveMetric';
import getSelectedOrganization from '../organization/getSelectedOrganization';

const _getAllKpiConfigs = (state) => (state.kpiConfig ? state.kpiConfig : []);

const getPortfolioConfigs = createSelector(
  _getAllKpiConfigs,
  getSelectedOrganization,
  ({ config: { pageConfigs } }, org) => {
    const portfolioPageConfigs = pageConfigs.portfolio_page || {};
    const orgSlug = org && org.slug;
    return portfolioPageConfigs[orgSlug] || portfolioPageConfigs.default;
  }
);

const getFacilityConfigs = createSelector(
  _getAllKpiConfigs,
  getSelectedFacility,
  getSelectedOrganization,
  ({ config: { pageConfigs } }, facility, org) => {
    const facilityPageConfigs = pageConfigs.facility_page || {};
    const facilitySlug = facility && facility.slug;
    const orgSlug = org && org.slug;
    return (
      facilityPageConfigs[facilitySlug] ||
      facilityPageConfigs[orgSlug] ||
      facilityPageConfigs.default
    );
  }
);

const getKpiConfigWithRouter = createSelector(
  getActiveMetric,
  getFacilityConfigs,
  (metric, configs) => {
    return (
      configs.find((item) => {
        return item.slug === metric;
      }) || null
    );
  }
);

const getPortfolioKpiConfigWithRouter = createSelector(
  getActiveMetric,
  getPortfolioConfigs,
  (metric, configs) => {
    return configs.find((item) => item.slug === metric) || null;
  }
);

export {
  getFacilityConfigs,
  getKpiConfigWithRouter,
  getPortfolioConfigs,
  getPortfolioKpiConfigWithRouter
};
