const INITIAL_STATE = {
  hasCompleted: {},
  isLoading: {}
};

function reducer(state = INITIAL_STATE, action) {
  const matches = /(.*)_(START|SUCCESS|FAILURE)/.exec(action.type);

  if (!matches) {
    return state;
  }

  const [, requestName, requestState] = matches;

  return {
    hasCompleted: {
      ...state.hasCompleted,
      [requestName]: requestState === 'SUCCESS'
    },
    isLoading: {
      ...state.isLoading,
      [requestName]: requestState === 'START'
    }
  };
}

export { INITIAL_STATE };
export default reducer;
