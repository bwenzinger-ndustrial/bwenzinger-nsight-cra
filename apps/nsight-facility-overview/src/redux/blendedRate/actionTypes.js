import { actions } from '../../helpers';

export const BLENDED_RATE_GET = 'BLENDED_RATE_GET';
const blendedRateGetAsync = actions.asyncAction(BLENDED_RATE_GET);

export default {
  ...blendedRateGetAsync
};
