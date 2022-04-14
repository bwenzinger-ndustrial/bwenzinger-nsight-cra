import { array as arrayUtils } from '@ndustrial/nsight-common/utils';

import actionTypes from './actionTypes';

const INITIAL_STATE = {
  groupings: [],
  items: {},
  orderedItemSlugs: [],
  selectedSlug: null
};

function _sortNestedGroupingsAndFacilities(groupings, activeFacilitiesById) {
  return groupings.sort(arrayUtils.sortByName).reduce((memo, grouping) => {
    const filteredFacilities = grouping.facilities.filter(
      ({ id }) => !!activeFacilitiesById[id]
    );
    const children = _sortNestedGroupingsAndFacilities(
      grouping.children,
      activeFacilitiesById
    );
    const facilities = filteredFacilities.sort(arrayUtils.sortByName);
    if ((facilities && facilities.length) || (children && children.length)) {
      return [
        ...memo,
        {
          ...grouping,
          children,
          facilities
        }
      ];
    }
    return memo;
  }, []);
}

/**
 * This checks the passed in list of facility groupings, and determines whether the facility
 * has at least one grouping that is valid. A grouping is valid as long as it, and all of
 * its ancestors, are in the groupingIdMap.
 * @param {Grouping[]} facilityGroupings This an array of the groups a facility is assigned to.
 * @param {{[key: number]: Grouping}} groupingIdMap This is an id indexed map of the groups
 * @returns {boolean}
 */
function _isFacilityUncategorized(facilityGroupings, groupingIdMap) {
  const _findGrouping = (group) => {
    if (group) {
      const { id: groupingId, parentId } = group;
      if (groupingIdMap[groupingId] && parentId) {
        return groupingIdMap[parentId]
          ? _findGrouping(groupingIdMap[parentId])
          : false;
      } else {
        return groupingIdMap[groupingId] ? groupingIdMap[groupingId] : false;
      }
    }
  };

  return facilityGroupings.filter((group) => _findGrouping(group)).length === 0;
}

function reducer(state = INITIAL_STATE, action) {
  switch (action.type) {
    case actionTypes.LOAD_FACILITIES_SUCCESS: {
      // Assign here instead of reducer to allow this object to be shared and edited
      const sortedFacilities = {
        items: {},
        orderedItemSlugs: [],
        uncategorizedFacilities: []
      };

      const activeFacilities = window.nd.disableFacilityFilter
        ? action.payload.facilities
        : action.payload.facilities.filter(
            (facility) => facility.nSight2Active
          );

      // Index groups by id for quick access later
      const flatGroupings = action.payload.groupings;
      const groupingsIdMap = flatGroupings.reduce((acc, grouping) => {
        grouping.children = [];
        grouping.facilities = grouping.facilities.nodes;
        acc[grouping.id] = grouping;
        return acc;
      }, {});

      // This will be a tree, with the root groups and all of their child groups/facilities
      const groupingsTree = [];
      // facility slug indexed map of the group(s) a facility belongs to
      const facilityGroupingsMap = {};
      flatGroupings.forEach((grouping) => {
        grouping.facilities.forEach((f) => {
          if (!facilityGroupingsMap[f.slug]) {
            facilityGroupingsMap[f.slug] = [];
          }
          facilityGroupingsMap[f.slug].push({
            parentId: grouping.parentId,
            id: grouping.id
          });
        });
        if (!grouping.parentId) {
          groupingsTree.push(grouping);
        } else {
          groupingsIdMap[grouping.parentId]?.children.push(grouping);
        }
      });

      const groupings = [
        ..._sortNestedGroupingsAndFacilities(
          groupingsTree,
          activeFacilities.reduce((accumulator, facility) => {
            accumulator[facility.id] = facility;
            return accumulator;
          }, {})
        ),
        {
          children: [],
          facilities: sortedFacilities.uncategorizedFacilities,
          id: 'uncategorized',
          name: 'Uncategorized',
          parentId: null
        }
      ];

      const { items, orderedItemSlugs } = activeFacilities
        .sort(arrayUtils.sortByName)
        .reduce((memo, facility) => {
          const { slug } = facility;
          memo.items[slug] = facility;
          memo.orderedItemSlugs.push(slug);
          const facilityGroupings = facilityGroupingsMap[slug]
            ? facilityGroupingsMap[slug]
            : [];

          if (_isFacilityUncategorized(facilityGroupings, groupingsIdMap)) {
            memo.uncategorizedFacilities.push(facility);
          }
          return memo;
        }, sortedFacilities);

      return {
        ...state,
        groupings,
        items,
        orderedItemSlugs
      };
    }

    case actionTypes.RESET_FACILITIES:
      return {
        ...state,
        groupings: INITIAL_STATE.groupings,
        items: INITIAL_STATE.items,
        orderedItemSlugs: INITIAL_STATE.orderedItemSlugs
      };

    case actionTypes.SET_SELECTED_FACILITY_SLUG:
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
