import kpiReducer from './kpiReducer';
import portfolioKpiReducer from './portfolioKpiReducer';

function getKPIModule() {
  return {
    id: 'kpiChart',
    reducerMap: {
      kpi: portfolioKpiReducer,
      kpiData: kpiReducer
    }
  };
}

export default getKPIModule;
