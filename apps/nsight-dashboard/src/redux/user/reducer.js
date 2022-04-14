import { defaultTheme } from '@ndustrial/nd-theme-react';

import actionTypes from './actionTypes';

const INITIAL_STATE = {
  profile: {},
  theme: defaultTheme
};

function reducer(state = INITIAL_STATE, action) {
  switch (action.type) {
    case actionTypes.LOAD_USER_INFO_SUCCESS:
      return {
        ...state,
        profile: action.payload.profile,
        theme: Object.assign({}, INITIAL_STATE.theme, action.payload.theme)
      };

    default:
      return state;
  }
}

export { INITIAL_STATE };
export default reducer;
