import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import { FullScreenLoadingIndicator, MissingSelection } from '../components';
import { getSelectedFacility, getSelectedFacilitySlug } from '../selectors';
import { getDisplayName } from '../utils';

const mapStateToProps = (state) => ({
  hasSelectedFacility: !!getSelectedFacility(state),
  hasSelectedFacilitySlug: !!getSelectedFacilitySlug(state)
});

const propTypes = {
  hasSelectedFacility: PropTypes.bool.isRequired,
  hasSelectedFacilitySlug: PropTypes.bool.isRequired
};

const withFacility = (WrappedComponent) => {
  const WithFacilityComponent = ({
    hasSelectedFacility,
    hasSelectedFacilitySlug,
    ...passThroughProps
  }) => {
    if (hasSelectedFacilitySlug && !hasSelectedFacility) {
      return <FullScreenLoadingIndicator loadingText="Loading" />;
    }

    if (!hasSelectedFacilitySlug) {
      return <MissingSelection requiredType="facility" />;
    }

    return <WrappedComponent {...passThroughProps} />;
  };

  WithFacilityComponent.propTypes = propTypes;
  WithFacilityComponent.displayName = `WithFacility${getDisplayName(
    WrappedComponent
  )}`;

  return connect(mapStateToProps)(WithFacilityComponent);
};

export default withFacility;
