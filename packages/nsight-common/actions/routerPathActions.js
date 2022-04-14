import { push } from 'connected-react-router';

/**
 * Simple reroute action to temporarily use with the LegacyAngularAdapter so that
 * we can accept url changes from nsight v1.  No checking will be done.  If a pathname
 * doesn't exist the route ends up a  blank content area, so it's up to nsight v1
 * to send a good pathname.
 *
 * @param pathname
 * @param search
 * @returns {function(*): void}
 */
const reroute = ({ pathname, search }) => {
  return (dispatch) => {
    dispatch(push({ pathname, search }));
  };
};

export { reroute };
