import reducer from '../reducers/feedTypesReducer';

function getFeedTypesModule() {
  return {
    id: 'feedTypes',
    reducerMap: {
      feedTypes: reducer
    }
  };
}

export default getFeedTypesModule;
