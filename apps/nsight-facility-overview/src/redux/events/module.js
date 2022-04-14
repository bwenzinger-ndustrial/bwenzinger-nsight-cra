import reducer from './reducer';

function getEventsModule() {
  return {
    id: 'eventFeedList',
    reducerMap: {
      eventFeedList: reducer
    }
  };
}

export default getEventsModule;
