import reducer from './reducer';

function getUserModule() {
  return {
    id: 'user',
    reducerMap: {
      user: reducer
    }
  };
}

export default getUserModule;
