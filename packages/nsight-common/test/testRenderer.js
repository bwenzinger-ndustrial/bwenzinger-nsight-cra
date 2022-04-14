import React from 'react';
import { Provider } from 'react-redux';
import { Router } from 'react-router-dom';
import { render } from '@testing-library/react';
import { createBrowserHistory } from 'history';
import { createStore } from 'redux-dynamic-modules';
import { getThunkExtension } from 'redux-dynamic-modules-thunk';
import { ThemeProvider } from 'styled-components';

import getApplicationsModule from '../../../apps/nsight-dashboard/src/redux/applications/module';
import getUserModule from '../../../apps/nsight-dashboard/src/redux/user/module';

function renderWithAppContext(ui, options = {}) {
  const {
    history = createBrowserHistory(),
    store = createStore(
      { extensions: [getThunkExtension()] },
      getApplicationsModule(),
      getUserModule(),
      ...(options.modules || [])
    ),
    theme = { colors: {}, fonts: {}, uiKitText: {} }
  } = options;

  return {
    history,
    store,
    theme,
    ...render(
      <Provider store={store}>
        <ThemeProvider theme={theme}>
          <Router history={history}>{ui}</Router>
        </ThemeProvider>
      </Provider>
    )
  };
}

export { renderWithAppContext };
