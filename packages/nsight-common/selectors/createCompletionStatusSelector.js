import { createSelector } from 'reselect';

function createCompletionStatusSelector(appName, actions) {
  const name = `${appName}RequestState`;

  return createSelector(
    actions.map((action) => {
      return (state) =>
        state &&
        state[name] &&
        state[name].hasCompleted &&
        state[name].hasCompleted[action];
    }),
    (...statuses) => statuses.every((status) => status)
  );
}

export default createCompletionStatusSelector;
