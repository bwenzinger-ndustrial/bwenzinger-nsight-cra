import { createSelector } from 'reselect';

import { getApplicationModules } from './index';

const getApplicationModulesInternal = createSelector(
  getApplicationModules,
  (modules) => modules.filter((module) => !module.externalLink)
);

export default getApplicationModulesInternal;
