import coincidentPeakReducer from './reducer';

function getCoincidentPeakModule() {
  return {
    id: 'coincidentPeakData',
    reducerMap: {
      coincidentPeak: coincidentPeakReducer
    }
  };
}

export default getCoincidentPeakModule;
