import { createSelector } from 'reselect';

const getCoincidentPeakRunOrder = (state) =>
  state.coincidentPeak.runOrder || [];

const getCoincidentPeakStep = (state) => state.coincidentPeak.step;

const getCurrentRunId = createSelector(
  getCoincidentPeakRunOrder,
  getCoincidentPeakStep,
  (runOrder, step) => (step >= 0 ? runOrder[step] : undefined)
);

export default getCurrentRunId;
