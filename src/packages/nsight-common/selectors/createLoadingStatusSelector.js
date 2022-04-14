import { createSelector } from 'reselect';

function createLoadingStatusSelector(appName, actions) {
  const name = `${appName}RequestState`;

  return createSelector(
    actions.map((action) => {
      return (state) =>
        state &&
        state[name] &&
        state[name].isLoading &&
        state[name].isLoading[action];
    }),
    (...statuses) => statuses.some((status) => status)
  );
}

export default createLoadingStatusSelector;
