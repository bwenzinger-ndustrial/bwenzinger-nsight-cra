import React from 'react';
import { Provider } from 'react-redux';
import { Router, useLocation } from 'react-router-dom';
import { renderHook } from '@testing-library/react-hooks';
import { expect } from 'chai';
import { createBrowserHistory } from 'history';
import { createStore } from 'redux-dynamic-modules';

import useQueryParams from './useQueryParams';

describe('nsight-common/hook/useQueryParams', function() {
  let wrapper;

  before(function() {
    const history = createBrowserHistory();
    const store = createStore({}, []);

    /* eslint-disable react/display-name, react/prop-types */
    wrapper = ({ children }) => (
      <Provider store={store}>
        <Router history={history}>{children}</Router>
      </Provider>
    );
    /* eslint-enable react/display-name, react/prop-types */
  });

  it('parses query strings that contain a query prefix', function() {
    const location = renderHook(() => useLocation(), { wrapper });

    location.result.current.search = '?testKey1=value1&testKey2=value2';

    const val = renderHook(() => useQueryParams(), { wrapper });

    expect(val.result.current).to.deep.equal({
      testKey1: 'value1',
      testKey2: 'value2'
    });
  });

  it('parses query strings that do not have a query prefix', function() {
    const location = renderHook(() => useLocation(), { wrapper });

    location.result.current.search = 'testKey1=value1&testKey2=value2';

    const val = renderHook(() => useQueryParams(false), { wrapper });

    expect(val.result.current).to.deep.equal({
      testKey1: 'value1',
      testKey2: 'value2'
    });
  });
});
