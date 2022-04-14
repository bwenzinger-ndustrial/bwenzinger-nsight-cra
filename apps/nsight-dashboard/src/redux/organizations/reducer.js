import { array as arrayUtils } from '@ndustrial/nsight-common/utils';

import actionTypes from './actionTypes';

const INITIAL_STATE = {
  items: {},
  orderedItemSlugs: [],
  selectedSlug: null
};

function reducer(state = INITIAL_STATE, action) {
  switch (action.type) {
    case actionTypes.LOAD_ORGANIZATIONS_SUCCESS: {
      const { items, orderedItemSlugs } = action.payload.organizations
        .sort(arrayUtils.sortByName)
        .reduce(
          (memo, organization) => {
            memo.items[organization.slug] = {
              ...organization
            };
            memo.orderedItemSlugs = memo.orderedItemSlugs.concat(
              organization.slug
            );

            return memo;
          },
          { items: {}, orderedItemSlugs: [] }
        );

      return {
        ...state,
        items,
        orderedItemSlugs,
        selectedSlug:
          orderedItemSlugs.length > 1 ? state.selectedSlug : orderedItemSlugs[0]
      };
    }

    case actionTypes.SET_SELECTED_ORGANIZATION_SLUG:
      return {
        ...state,
        selectedSlug: action.payload
      };

    default:
      return state;
  }
}

export { INITIAL_STATE };
export default reducer;
