import reducer from './reducer';

function getFacilitiesModule() {
  return {
    id: 'facilities',
    reducerMap: {
      facilities: reducer
    }
  };
}

export default getFacilitiesModule;
