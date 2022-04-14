const getCPLoadingState = (state) =>
  state.coincidentPeak
    ? state.coincidentPeak.loadingDemand ||
      state.coincidentPeak.loadingForecast ||
      state.coincidentPeak.loadingWeather
    : true;

export default getCPLoadingState;
