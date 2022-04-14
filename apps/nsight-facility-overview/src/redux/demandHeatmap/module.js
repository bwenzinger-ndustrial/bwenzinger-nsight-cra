import heatmapReducer from './reducer';

function getHeatmapModule() {
  return {
    id: 'heatmapDemand',
    reducerMap: {
      heatmapDemand: heatmapReducer
    }
  };
}

export default getHeatmapModule;
