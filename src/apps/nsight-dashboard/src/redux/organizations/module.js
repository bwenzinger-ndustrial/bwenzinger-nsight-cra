import reducer from './reducer';

function getOrganizationsModule() {
  return {
    id: 'organizations',
    reducerMap: {
      organizations: reducer
    }
  };
}

export default getOrganizationsModule;
