import { createSelector } from 'reselect';

import getDataInDateRange from '../../helpers/getDataInDateRange';
import getCPDates from './getCPDates';

const getCoincidentPeakActualDemand = (state) =>
  state.coincidentPeak.actualDemand || [];

const getActualDemand = createSelector(
  getCPDates,
  getCoincidentPeakActualDemand,
  (cpDates, actualDemand) => {
    return getDataInDateRange(actualDemand, cpDates, true);
  }
);

export default getActualDemand;
