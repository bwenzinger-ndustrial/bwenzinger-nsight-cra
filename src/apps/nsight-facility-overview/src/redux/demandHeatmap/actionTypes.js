import keyMirror from 'keymirror';

export const HEATMAP_GET_CURRENT = 'HEATMAP_GET_CURRENT';

export default keyMirror({
  [`${HEATMAP_GET_CURRENT}_START`]: null,
  [`${HEATMAP_GET_CURRENT}_SUCCESS`]: null,
  [`${HEATMAP_GET_CURRENT}_FAILURE`]: null
});
