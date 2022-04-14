import actionTypes from './actionTypes';

const INITIAL_STATE = {
  values: null,
  hasError: false,
  activeProject: null
};

function projectReducer(state = INITIAL_STATE, action) {
  const { payload, type } = action;

  switch (type) {
    case actionTypes.PROJECTS_GET_FAILURE:
      return {
        ...state,
        error: payload,
        hasError: true
      };

    case actionTypes.PROJECTS_GET_START:
      return { ...state, hasError: false };

    case actionTypes.PROJECTS_GET_SUCCESS:
      return {
        ...state,
        values: payload
      };

    case actionTypes.ADD_PROJECT:
      return {
        ...state,
        values: [...state.values, payload]
      };

    case actionTypes.SET_ACTIVE_PROJECT:
      return {
        ...state,
        activeProject: {
          ...payload.project,
          newFiles: [],
          isDirty: false
        }
      };

    case actionTypes.ADD_FILES_TO_ACTIVE_PROJECT:
      return {
        ...state,
        activeProject: {
          ...state.activeProject,
          newFiles: [...state.activeProject.newFiles, ...payload.files]
        }
      };

    case actionTypes.REMOVE_FILE_FROM_ACTIVE_PROJECT: {
      const { file } = payload;
      return {
        ...state,
        activeProject: {
          ...state.activeProject,
          newFiles: state.activeProject.newFiles.filter((f) => {
            if (f.tempId) return f.tempId !== file.tempId;
            return f.id !== file.id;
          }),
          files: state.activeProject.files.filter((f) => f.id !== file.id)
        }
      };
    }

    case actionTypes.UPDATE_FILE_IN_ACTIVE_PROJECT: {
      const { file, status, id } = payload;

      const updatedFiles = state.activeProject.newFiles.map((f) => {
        const { name, size, type, lastModified } = f;

        // a quirk of spread forces us to explicitly pull these form a the File interface
        let value = { name, size, type, lastModified };

        if ((f.id && f.id === file.id) || f.tempId === file.tempId) {
          value = { ...value, status };

          if (id) value.id = id;
        }
        return value;
      });

      return {
        ...state,
        activeProject: {
          ...state.activeProject,
          newFiles: updatedFiles
        }
      };
    }

    case actionTypes.UPDATE_PROJECT:
      return {
        ...state,
        values: state.values.map((item) =>
          item.slug === payload.slug ? payload : item
        )
      };

    case actionTypes.UPDATE_ACTIVE_PROJECT:
      return {
        ...state,
        activeProject: {
          ...state.activeProject,
          ...payload,
          isDirty: true
        }
      };

    case actionTypes.PROJECT_USERS_GET_FAILURE:
      return {
        ...state,
        error: payload,
        hasError: true
      };

    case actionTypes.PROJECT_USERS_GET_START:
      return { ...state, hasError: false };

    case actionTypes.PROJECT_USERS_GET_SUCCESS:
      return {
        ...state,
        orgUsers: payload
      };

    default:
      return state;
  }
}

export { INITIAL_STATE };
export default projectReducer;
