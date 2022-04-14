const geKpiCardLoadingStatus = (state, name) => {
  if (state.kpiCard && state.kpiCard[name]) {
    return state.kpiCard[name].isLoading;
  }
  return true;
};

export default geKpiCardLoadingStatus;
