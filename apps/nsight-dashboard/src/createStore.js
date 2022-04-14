import { routerMiddleware } from 'connected-react-router';
import { createBrowserHistory } from 'history';
import { createStore } from 'redux-dynamic-modules';
import { getThunkExtension } from 'redux-dynamic-modules-thunk';

import getApplicationsModule from './redux/applications/module';
import getFacilitiesModule from './redux/facilities/module';
import getFeedStatusesModule from './redux/feedStatus/module';
import getKpiConfigModule from './redux/kpiConfig/module';
import getOrganizationsModule from './redux/organizations/module';
import getRouterModule from './redux/router/module';
import getUserModule from './redux/user/module';

export const history = createBrowserHistory();

export default function configureStore() {
  return createStore(
    {
      extensions: [
        getThunkExtension(),
        { middleware: [routerMiddleware(history)] }
      ]
    },
    getApplicationsModule(),
    getFacilitiesModule(),
    getOrganizationsModule(),
    getKpiConfigModule(),
    getUserModule(),
    getFeedStatusesModule(),
    getRouterModule(history)
  );
}
