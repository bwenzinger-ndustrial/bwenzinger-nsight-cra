import { actions } from '../../helpers';

export const EVENTS_GET = 'EVENTS_GET';
const eventsGetAsync = actions.asyncAction(EVENTS_GET);

export default {
  ...eventsGetAsync
};
