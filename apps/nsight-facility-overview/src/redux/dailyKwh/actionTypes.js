import keyMirror from 'keymirror';

export const DAILY_KWH_CURRENT_GET = 'DAILY_KWH_CURRENT_GET';
export const DAILY_KWH_LAST_GET = 'DAILY_KWH_LAST_GET';

export default keyMirror({
  [`${DAILY_KWH_CURRENT_GET}_START`]: null,
  [`${DAILY_KWH_CURRENT_GET}_SUCCESS`]: null,
  [`${DAILY_KWH_CURRENT_GET}_FAILURE`]: null,
  [`${DAILY_KWH_LAST_GET}_START`]: null,
  [`${DAILY_KWH_LAST_GET}_SUCCESS`]: null,
  [`${DAILY_KWH_LAST_GET}_FAILURE`]: null
});
