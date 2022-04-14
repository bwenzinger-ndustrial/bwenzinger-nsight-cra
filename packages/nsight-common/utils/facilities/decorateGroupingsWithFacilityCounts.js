function decorateGroupingsWithFacilityCounts(facilityGroupings) {
  return facilityGroupings.map((grouping) => {
    const childGroupings = decorateGroupingsWithFacilityCounts(
      grouping.children
    );

    return {
      ...grouping,
      children: childGroupings,
      facilityCount: getFacilityCount({
        facilities: grouping.facilities,
        children: childGroupings
      })
    };
  });
}

function getFacilityCount(facilityGrouping) {
  return (
    facilityGrouping.facilities.length +
    facilityGrouping.children.reduce((memo, grouping) => {
      return memo + getFacilityCount(grouping);
    }, 0)
  );
}

export { decorateGroupingsWithFacilityCounts, getFacilityCount };
