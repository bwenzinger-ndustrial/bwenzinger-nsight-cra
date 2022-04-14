import { createSelector } from 'reselect';

const getContractByScheduleId = createSelector(
  (state, props) => state.contract.items,
  (state) => state.schedules.items,
  (state, props) => props.match.params.scheduleId,
  (contracts = {}, schedules = {}, scheduleId) => {
    const id = schedules[scheduleId] && schedules[scheduleId].utilityContractId;

    return contracts[id] || {};
  }
);

export default getContractByScheduleId;
