import { push } from 'connected-react-router';

import { getSearchString } from '@ndustrial/nsight-common/utils';

import { MODULE_PATHS_WITHOUT_FACILITY } from '../../constants';
import { setSelectedFacilitySlug } from '../facilities/actions';

function changeRoute({ pathname, search }) {
  return (dispatch) => {
    let searchString = search;

    if (MODULE_PATHS_WITHOUT_FACILITY.indexOf(pathname) !== -1) {
      searchString = getSearchString({
        searchString: search,
        removeParams: ['facility']
      });

      dispatch(setSelectedFacilitySlug(null));
    }

    dispatch(push({ pathname, search: searchString }));
  };
}

export { changeRoute };
