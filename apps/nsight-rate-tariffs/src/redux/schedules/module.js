import schedulesReducer from './reducer';

function getSchedulesModule() {
  return {
    id: 'schedules',
    reducerMap: {
      schedules: schedulesReducer
    }
  };
}

export default getSchedulesModule;
