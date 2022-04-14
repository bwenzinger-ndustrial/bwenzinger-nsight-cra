import { createSelector } from 'reselect';

const getSchedulesMap = (state) => state.schedules && state.schedules.items;

const getContractsMap = (state) => state.contract.items;

const getScheduleIds = (state) =>
  state.schedules && state.schedules.orderedItemIds;

const getSchedules = createSelector(
  getSchedulesMap,
  getScheduleIds,
  getContractsMap,
  (schedules = {}, orderedIds = [], contracts = {}) => {
    return orderedIds.map((id) => {
      if (schedules[id].utilityContractId) {
        return {
          ...schedules[id],
          contract: {
            ...contracts[schedules[id].utilityContractId]
          }
        };
      } else {
        return {
          ...schedules[id]
        };
      }
    });
  }
);

export default getSchedules;
