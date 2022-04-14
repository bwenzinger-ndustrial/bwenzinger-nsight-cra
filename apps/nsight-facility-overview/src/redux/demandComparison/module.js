import demandReducer from './reducer';

function getChartsModule() {
  return {
    id: 'demandData',
    reducerMap: {
      demandData: demandReducer
    }
  };
}

export default getChartsModule;
