import keyMirror from 'keymirror';

export const DEMAND_GET_LAST = 'DEMAND_GET_LAST';
export const DEMAND_GET_CURRENT = 'DEMAND_GET_CURRENT';
export const DEMAND_MAX_GET_CURRENT = 'DEMAND_MAX_GET_CURRENT';
export const DEMAND_MAX_GET_LAST = 'DEMAND_MAX_GET_LAST';

export default keyMirror({
  [`${DEMAND_GET_LAST}_START`]: null,
  [`${DEMAND_GET_LAST}_SUCCESS`]: null,
  [`${DEMAND_GET_LAST}_FAILURE`]: null,
  [`${DEMAND_GET_CURRENT}_START`]: null,
  [`${DEMAND_GET_CURRENT}_SUCCESS`]: null,
  [`${DEMAND_GET_CURRENT}_FAILURE`]: null,
  [`${DEMAND_MAX_GET_LAST}_START`]: null,
  [`${DEMAND_MAX_GET_LAST}_SUCCESS`]: null,
  [`${DEMAND_MAX_GET_LAST}_FAILURE`]: null,
  [`${DEMAND_MAX_GET_CURRENT}_START`]: null,
  [`${DEMAND_MAX_GET_CURRENT}_SUCCESS`]: null,
  [`${DEMAND_MAX_GET_CURRENT}_FAILURE`]: null
});
