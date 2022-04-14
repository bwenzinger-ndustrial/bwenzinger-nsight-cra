import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

import { ErrorBanner } from './ErrorBanner';

const ErrorBannerContainer = styled.div`
  margin: auto 0;
`;
class ErrorBoundary extends React.Component {
  static propTypes = {
    children: PropTypes.node.isRequired
  };

  constructor(props) {
    super(props);
    this.state = {
      error: null
    };
  }

  static getDerivedStateFromError(error) {
    // Update state so the next render will show the fallback UI.
    return { error };
  }

  componentDidCatch(_error, _errorInfo) {
    // You can also log the error to an error reporting service
  }

  render() {
    const { error } = this.state;

    if (!error) {
      return this.props.children;
    }

    return (
      <ErrorBannerContainer>
        <ErrorBanner />
      </ErrorBannerContainer>
    );
  }
}

export default ErrorBoundary;
