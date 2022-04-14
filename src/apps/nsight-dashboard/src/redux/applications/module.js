import reducer from './reducer';

function getApplicationsModule() {
  return {
    id: 'applications',
    reducerMap: {
      applications: reducer
    }
  };
}

export default getApplicationsModule;
