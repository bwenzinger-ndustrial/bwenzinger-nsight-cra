const getEmissionsLoadingStatus = (state) => {
  if (!state.primaryEmissions.data && !state.comparisonEmissions.data) {
    return true;
  }
  return false;
};

export default getEmissionsLoadingStatus;
