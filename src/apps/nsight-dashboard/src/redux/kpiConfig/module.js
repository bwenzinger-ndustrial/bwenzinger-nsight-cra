import kpiConfigReducer from './reducer';

function getKpiConfigModule() {
  return {
    id: 'kpiConfig',
    reducerMap: {
      kpiConfig: kpiConfigReducer
    }
  };
}

export default getKpiConfigModule;
