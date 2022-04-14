import React from 'react';
import { Redirect, withRouter } from 'react-router-dom';
import PropTypes from 'prop-types';

import { getSearchString } from '../utils';

const propTypes = {
  location: PropTypes.object.isRequired,
  to: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.shape({
      pathname: PropTypes.string,
      search: PropTypes.string,
      hash: PropTypes.string,
      state: PropTypes.object
    })
  ]).isRequired,
  addParams: PropTypes.PropTypes.object,
  preserveParams: PropTypes.bool,
  removeParams: PropTypes.arrayOf(PropTypes.string)
};

const defaultProps = {
  addParams: {},
  preserveParams: true,
  removeParams: [],
  to: ''
};

function QueryRedirect({
  location,
  addParams,
  preserveParams,
  removeParams,
  to,
  ...rest
}) {
  const toConfig =
    typeof to === 'string' ? { pathname: to || location.pathname } : to;

  const search = getSearchString({
    searchString: preserveParams ? location.search : '',
    addParams,
    removeParams
  });

  return (
    <Redirect
      to={{
        ...toConfig,
        search
      }}
      {...rest}
    />
  );
}

QueryRedirect.propTypes = propTypes;
QueryRedirect.defaultProps = defaultProps;

export default withRouter(QueryRedirect);
