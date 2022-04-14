import scheduleActionTypes from '../schedules/actionTypes';
import actionTypes from './actionTypes';

const INITIAL_STATE = {
  items: {},
  hasLoadingError: false
};

function contractsReducer(state = INITIAL_STATE, action) {
  const { payload, type } = action;
  switch (type) {
    case actionTypes.LOAD_CONTRACT_FILE_FAILURE:
      return {
        ...state,
        hasLoadingError: true
      };

    case actionTypes.LOAD_CONTRACT_FILE_SUCCESS:
      return {
        ...state,
        items: {
          ...state.items,
          [action.meta.contractId]: {
            ...state.items[action.meta.contractId],
            fileUrl: payload
          }
        }
      };

    case scheduleActionTypes.LOAD_RATE_SCHEDULE_FAILURE:
      return {
        ...state,
        hasLoadingError: true
      };

    case scheduleActionTypes.LOAD_RATE_SCHEDULE_START:
      return INITIAL_STATE;

    case scheduleActionTypes.LOAD_RATE_SCHEDULES_START:
      return INITIAL_STATE;

    case scheduleActionTypes.LOAD_RATE_SCHEDULES_SUCCESS: {
      const items = payload.contracts.reduce((memo, contract) => {
        memo[contract.id] = {
          ...contract
        };

        return memo;
      }, {});

      return {
        ...state,
        items
      };
    }

    case actionTypes.LOAD_UTILITY_CONTRACT_FAILURE:
      return {
        ...state,
        hasLoadingError: true
      };

    case actionTypes.LOAD_UTILITY_CONTRACT_START:
      return INITIAL_STATE;

    case actionTypes.LOAD_UTILITY_CONTRACT_SUCCESS:
      return {
        ...state,
        items: {
          ...state.items,
          [action.payload.id]: {
            ...action.payload
          }
        }
      };

    default:
      return state;
  }
}

export { INITIAL_STATE };
export default contractsReducer;
