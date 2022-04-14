const getKpiLoadingStatus = (state, name) => {
  if (state.kpi && state.kpi[name]) {
    return state.kpi[name].isLoading;
  }
  return true;
};

export default getKpiLoadingStatus;
