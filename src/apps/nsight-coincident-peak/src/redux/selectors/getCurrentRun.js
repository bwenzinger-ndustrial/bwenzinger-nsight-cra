import { createSelector } from 'reselect';

import getCurrentRunId from './getCurrentRunId';

const getRuns = (state) => state.coincidentPeak.runs;

const getCurrentRun = createSelector(
  getCurrentRunId,
  getRuns,
  (runId, runs) => runs[runId] || { data: {} }
);

export default getCurrentRun;
