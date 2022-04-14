import _ from 'lodash';
import { createSelector } from 'reselect';

import { getApplicationGroupings } from './index';

const getApplicationModules = createSelector(
  getApplicationGroupings,
  (groupings) => _.flatMap(groupings, (grouping) => grouping.applicationModules)
);

export default getApplicationModules;
