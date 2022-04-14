import feedsReducer from './reducer';

function getFeedStatusesModule() {
  return {
    id: 'feeds',
    reducerMap: {
      feeds: feedsReducer
    }
  };
}

export default getFeedStatusesModule;
