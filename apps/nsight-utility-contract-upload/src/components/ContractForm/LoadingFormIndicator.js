import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

import { Loader } from '@ndustrial/nd-loader-react';

const propTypes = {
  loading: PropTypes.bool.isRequired
};

const LoadingIndicator = styled.div`
  background-color: rgba(255, 255, 255, 0.75);
  position: absolute;
  left: 0;
  right: 0;
  top: 0;
  bottom: 0;
  z-index: 10;
  display: flex;
  justify-content: center;
  align-items: center;
`;

function LoadingFormIndicator(props) {
  if (!props.loading) {
    return null;
  }

  return (
    <LoadingIndicator>
      <Loader label="" />
    </LoadingIndicator>
  );
}

LoadingFormIndicator.propTypes = propTypes;

export default LoadingFormIndicator;
