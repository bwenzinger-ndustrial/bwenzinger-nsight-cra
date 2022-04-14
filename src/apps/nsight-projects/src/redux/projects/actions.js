import { NotificationManager } from 'react-notifications';

import { contxtSdk } from '@ndustrial/nsight-common/utils';

import actionTypes from './actionTypes';

const getProjectsByOrgId = (slug) => {
  return (dispatch) => {
    dispatch({
      type: actionTypes.PROJECTS_GET_START
    });

    return contxtSdk.nsightProjects
      .getProjectsByOrg(slug)
      .then((response) => {
        dispatch({
          type: actionTypes.PROJECTS_GET_SUCCESS,
          payload: response.records
        });
      })
      .catch((err) => {
        const error = err.isAxiosError
          ? err.response.data.message
          : err.message;
        dispatch({
          type: actionTypes.PROJECTS_GET_FAILURE,
          error: true,
          payload: error
        });
      });
  };
};

const getOrgUsers = (organizationId) => {
  return (dispatch) => {
    dispatch({
      type: actionTypes.PROJECT_USERS_GET_START
    });

    return contxtSdk.coordinator.users
      .getByOrganizationId(organizationId)
      .then((users) => {
        dispatch({
          type: actionTypes.PROJECT_USERS_GET_SUCCESS,
          payload: users
        });
      })
      .catch(() => {
        NotificationManager.error(
          'There was an error retrieving a list of users for this organization.',
          'Contact List error'
        );
      });
  };
};

const setActiveProject = (project) => {
  return {
    type: actionTypes.SET_ACTIVE_PROJECT,
    payload: { project }
  };
};

const addFiles = (files) => {
  return {
    type: actionTypes.ADD_FILES_TO_ACTIVE_PROJECT,
    payload: { files }
  };
};

const removeFile = (file) => {
  return {
    type: actionTypes.REMOVE_FILE_FROM_ACTIVE_PROJECT,
    payload: { file }
  };
};

const updateFile = (file, status, id) => {
  return {
    type: actionTypes.UPDATE_FILE_IN_ACTIVE_PROJECT,
    payload: { file, status, id }
  };
};

const addProject = (project) => {
  return {
    type: actionTypes.ADD_PROJECT,
    payload: project
  };
};

const updateProject = (project) => {
  return {
    type: actionTypes.UPDATE_PROJECT,
    payload: project
  };
};

const updateActiveProject = (newData) => {
  return {
    type: actionTypes.UPDATE_ACTIVE_PROJECT,
    payload: newData
  };
};

export {
  addFiles,
  addProject,
  getOrgUsers,
  getProjectsByOrgId,
  removeFile,
  setActiveProject,
  updateActiveProject,
  updateFile,
  updateProject
};
