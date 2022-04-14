import kpiCardReducer from '../reducers/kpiCardReducer';

function getKpiCardModule() {
  return {
    id: 'kpiCard',
    reducerMap: {
      kpiCard: kpiCardReducer
    }
  };
}

export default getKpiCardModule;
