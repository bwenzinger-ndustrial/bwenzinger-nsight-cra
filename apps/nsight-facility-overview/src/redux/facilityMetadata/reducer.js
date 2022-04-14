import actionTypes from './actionTypes';

const INITIAL_STATE = {
  metadata: {},
  error: null
};

function facilityMetadataReducer(state = INITIAL_STATE, action) {
  const { payload, type } = action;

  switch (type) {
    case actionTypes.FACILITY_METADATA_GET_SUCCESS:
      return {
        ...state,
        metadata: payload
      };
    case actionTypes.FACILITY_METADATA_GET_FAILURE:
      return {
        ...state,
        error: payload
      };
    default:
      return state;
  }
}

export default facilityMetadataReducer;
