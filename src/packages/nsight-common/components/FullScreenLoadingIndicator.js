import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

import { Loader } from '@ndustrial/nd-loader-react';

const propTypes = {
  className: PropTypes.string,
  loadingText: PropTypes.string
};

const defaultProps = {
  type: 'application'
};

const FullScreenLoader = styled(Loader)`
  display: flex;
  font-family: sans-serif;
  flex: 1;
  width: auto;
`;

function FullScreenLoadingIndicator({ className, loadingText }) {
  return <FullScreenLoader className={className} label={loadingText} />;
}

FullScreenLoadingIndicator.propTypes = propTypes;
FullScreenLoadingIndicator.defaultProps = defaultProps;

export default FullScreenLoadingIndicator;
