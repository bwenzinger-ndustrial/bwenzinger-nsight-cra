import weatherReducer from './reducer';

function getWeatherModule() {
  return {
    id: 'weather',
    reducerMap: {
      weather: weatherReducer
    }
  };
}

export default getWeatherModule;
