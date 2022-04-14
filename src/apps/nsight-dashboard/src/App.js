import React, { Fragment } from 'react';
import ReactDOM from 'react-dom';
import Helmet from 'react-helmet';
import { Provider } from 'react-redux';
import { LicenseManager } from 'ag-grid-enterprise';
import { StyleSheetManager } from 'styled-components';

import GlobalStyle from './components/GlobalStyle';
import App from './containers/App';
import createStore from './createStore';
import { initDataDog } from './initDataDog';

initDataDog();
LicenseManager.setLicenseKey(window.nd.agGrid.licenseKey);

const store = createStore();

export function AppMain() {
  return (
    <StyleSheetManager disableCSSOMInjection={true}>
      <Fragment>
        <Helmet defaultTitle="nSight" titleTemplate="%s - nSight" />

        <GlobalStyle />

        <Provider store={store}>
          <App />
        </Provider>
      </Fragment>
    </StyleSheetManager>
  );
}
// const container = document.getElementById('main');

// ReactDOM.render(element, container);
