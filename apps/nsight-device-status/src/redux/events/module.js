import eventsReducer from './reducer';

function getEventsModule() {
  return {
    id: 'events',
    reducerMap: {
      events: eventsReducer
    }
  };
}

export default getEventsModule;
