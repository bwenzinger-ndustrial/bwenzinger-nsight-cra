import utilityDemandReducer from './reducer';

function getModule() {
  return {
    id: 'utilityDemandData',
    reducerMap: {
      utilityDemandData: utilityDemandReducer
    }
  };
}

export default getModule;
