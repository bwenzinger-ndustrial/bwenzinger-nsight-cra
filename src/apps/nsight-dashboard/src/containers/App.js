import React, { useEffect } from 'react';
import ReactGA from 'react-ga';
import { connect } from 'react-redux';
import { ConnectedRouter } from 'connected-react-router';
import PropTypes from 'prop-types';
import { ThemeProvider } from 'styled-components';

import { defaultTheme } from '@ndustrial/nd-theme-react';

import { history } from '../createStore';
import Routes from '../routes';
import { initializePendo } from '../services/pendoService';

const propTypes = {
  theme: PropTypes.shape({
    colors: PropTypes.shape({
      button: PropTypes.string,
      disabled: PropTypes.string,
      gray: PropTypes.string,
      failure: PropTypes.string,
      primary: PropTypes.string,
      secondary: PropTypes.string,
      success: PropTypes.string,
      text: PropTypes.string,
      textLight: PropTypes.string,
      warning: PropTypes.string
    }),
    fonts: PropTypes.shape({
      primary: PropTypes.string
    })
  }),
  user: PropTypes.shape({
    name: PropTypes.string,
    sub: PropTypes.string
  }).isRequired
};

function AppContainer({ theme, user }) {
  useEffect(() => {
    initializePendo(user);
    ReactGA.initialize(window.nd.analytics.ga);
    ReactGA.pageview(window.location.pathname + window.location.search);
    history.listen((location) => {
      ReactGA.pageview(location.pathname + location.search);
    });
  }, [user]);

  return (
    <ConnectedRouter history={history}>
      <ThemeProvider theme={theme}>
        <Routes />
      </ThemeProvider>
    </ConnectedRouter>
  );
}

function mapStateToProps(state) {
  return {
    theme: state.user ? state.user.theme : defaultTheme,
    user: state.user.profile
  };
}

AppContainer.propTypes = propTypes;

export { AppContainer as App, mapStateToProps };
export default connect(mapStateToProps)(AppContainer);
