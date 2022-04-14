import React, { useMemo } from 'react';
import PropTypes from 'prop-types';

import { facilityUtils } from '@ndustrial/nsight-common/utils';

import GroupingItem from './GroupingItem';

const propTypes = {
  facilityGroupings: PropTypes.array,
  selectedFacilityId: PropTypes.number
};

const findFacility = (grouping, id) => {
  const { facilities, children } = grouping;

  const decoratedGrouping = {
    ...grouping
  };

  decoratedGrouping.children = children.map((childGroup) =>
    findFacility(childGroup, id)
  );
  decoratedGrouping.hasSelectedFacility =
    facilities.some((facility) => facility.id === id) ||
    decoratedGrouping.children.some(
      (childGroup) => childGroup.hasSelectedFacility
    );

  return decoratedGrouping;
};

// Passing down onSelectFacility callback with rest props
const FacilityGroupings = ({
  facilityGroupings,
  selectedFacilityId,
  ...rest
}) => {
  const decoratedGroupings = useMemo(() => {
    return facilityUtils
      .decorateGroupingsWithFacilityCounts(facilityGroupings)
      .map((grouping) => findFacility(grouping, selectedFacilityId));
  }, [facilityGroupings, selectedFacilityId]);

  return (
    <>
      {decoratedGroupings.map((grouping) => (
        <GroupingItem
          selectedFacilityId={selectedFacilityId}
          key={grouping.id}
          {...grouping}
          {...rest}
        />
      ))}
    </>
  );
};

FacilityGroupings.propTypes = propTypes;

export default FacilityGroupings;
