import reducer from './reducer';

function getProjectsModule() {
  return {
    id: 'projects',
    reducerMap: {
      projects: reducer
    }
  };
}

export default getProjectsModule;
