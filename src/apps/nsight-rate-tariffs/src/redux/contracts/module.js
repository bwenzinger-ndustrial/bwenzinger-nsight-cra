import contractsReducer from './reducer';

function getContractsModule() {
  return {
    id: 'contracts',
    reducerMap: {
      contract: contractsReducer
    }
  };
}

export default getContractsModule;
