import reducer from '../reducers/requestStateReducer';

function getRequestStateModule(appName) {
  const name = `${appName}RequestState`;
  return {
    id: name,
    reducerMap: {
      [name]: reducer
    }
  };
}

export default getRequestStateModule;
