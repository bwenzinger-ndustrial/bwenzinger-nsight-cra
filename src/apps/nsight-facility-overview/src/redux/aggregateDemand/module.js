import aggregateDemandReducer from './reducer';

function getAggregateDemandModule() {
  return {
    id: 'aggregateDemandData',
    reducerMap: {
      aggregateDemand: aggregateDemandReducer
    }
  };
}

export default getAggregateDemandModule;
