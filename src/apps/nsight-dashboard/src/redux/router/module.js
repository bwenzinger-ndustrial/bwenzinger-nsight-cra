import { connectRouter } from 'connected-react-router';

function getRouterModule(history) {
  return {
    id: 'router',
    reducerMap: {
      router: connectRouter(history)
    }
  };
}

export default getRouterModule;
