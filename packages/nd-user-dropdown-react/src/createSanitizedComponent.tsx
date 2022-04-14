import PropTypes from 'prop-types';
import React from 'react';
import { NdWrappedComponentProps } from './types';

function getDisplayName(WrappedComponent: any) {
  return WrappedComponent.displayName || WrappedComponent.name || 'Component';
}

function createSanitizedComponent(WrappedComponent: any) {
  function newComponent({ isOpen, ...restProps }: NdWrappedComponentProps) {
    return <WrappedComponent {...restProps} />;
  }

  newComponent.displayName = `SanitizedComponent(${getDisplayName(
    WrappedComponent
  )})`;

  return newComponent;
}

export default createSanitizedComponent;
