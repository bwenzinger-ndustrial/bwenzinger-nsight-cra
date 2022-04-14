import weatherReducer from '../../redux/weather/reducer';
import comparisonReducer from './comparisonReducer';
import primaryReducer from './primaryReducer';

function getDetailModule() {
  return {
    id: 'detail',
    reducerMap: {
      comparisonDetail: comparisonReducer,
      primaryDetail: primaryReducer,
      weather: weatherReducer
    }
  };
}

export default getDetailModule;
