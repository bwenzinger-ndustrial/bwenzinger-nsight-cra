import { unescape } from 'he';

import { KPI_LABEL_DISPLAY_HASH, KPI_UNIT_DISPLAY_HASH } from './constants';

function getDisplayLabel(key, name) {
  return KPI_LABEL_DISPLAY_HASH[key]
    ? unescape(KPI_LABEL_DISPLAY_HASH[key])
    : name;
}

function getDisplayUnit(key, unit) {
  return KPI_UNIT_DISPLAY_HASH[key]
    ? unescape(KPI_UNIT_DISPLAY_HASH[key])
    : unit;
}

export { getDisplayLabel, getDisplayUnit };
