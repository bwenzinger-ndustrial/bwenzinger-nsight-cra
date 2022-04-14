import React from 'react';
import { Link, withRouter } from 'react-router-dom';
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
  ]),
  addParams: PropTypes.PropTypes.object,
  preserveParams: PropTypes.bool,
  removeParams: PropTypes.arrayOf(PropTypes.string),
  staticContext: PropTypes.any,
  children: PropTypes.node.isRequired,
  onItemClick: PropTypes.func
};

const defaultProps = {
  addParams: {},
  preserveParams: true,
  removeParams: [],
  to: ''
};

function QueryLink({
  location,
  addParams,
  preserveParams,
  removeParams,
  staticContext,
  to,
  children,
  onItemClick,
  ...rest
}) {
  const toConfig =
    typeof to === 'string' ? { pathname: to || location.pathname } : to;

  const search = getSearchString({
    searchString: preserveParams ? location.search : '',
    addParams,
    removeParams
  });

  if (onItemClick) {
    return (
      <div onClick={() => onItemClick({ ...toConfig, search })} {...rest}>
        {children}
      </div>
    );
  }

  return (
    <Link
      to={{
        ...toConfig,
        search
      }}
      {...rest}
    >
      {children}
    </Link>
  );
}

QueryLink.propTypes = propTypes;
QueryLink.defaultProps = defaultProps;

// Using withRouter to provide location until we are ready to upgrade to version 5.1
// https://reacttraining.com/react-router/web/api/Link/to-function
// https://github.com/ReactTraining/react-router/pull/6933
export default withRouter(QueryLink);
