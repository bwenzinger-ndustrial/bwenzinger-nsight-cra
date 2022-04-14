import dailyKwhReducer from './reducer';

function getDailyKwhModule() {
  return {
    id: 'dailyKwh',
    reducerMap: {
      dailyKwh: dailyKwhReducer
    }
  };
}

export default getDailyKwhModule;
