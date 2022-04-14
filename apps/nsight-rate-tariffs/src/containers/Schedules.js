import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { bindActionCreators } from 'redux';

import {
  createCompletionStatusSelector,
  getSelectedFacility,
  getSelectedFacilitySlug
} from '@ndustrial/nsight-common/selectors';

import Schedules from '../components/ScheduleOverview';
import * as schedulesActions from '../redux/schedules/actions';
import { getSchedules } from '../redux/schedules/selectors';

const propTypes = {
  actions: PropTypes.shape({
    schedules: PropTypes.shape({
      loadSchedulesByFacilityId: PropTypes.func.isRequired
    }).isRequired
  }).isRequired,
  selectedFacility: PropTypes.shape({
    id: PropTypes.integer
  })
};

const getSchedulesCompletionStatus = createCompletionStatusSelector(
  'rateTariffs',
  ['LOAD_RATE_SCHEDULES']
);

class SchedulesContainer extends Component {
  componentDidMount() {
    if (!this.props.selectedFacility) {
      return;
    }

    this.props.actions.schedules.loadSchedulesByFacilityId(
      this.props.selectedFacility.id
    );
  }

  componentDidUpdate(prevProps) {
    if (
      this.props.selectedFacility &&
      prevProps.selectedFacility !== this.props.selectedFacility
    ) {
      this.props.actions.schedules.loadSchedulesByFacilityId(
        this.props.selectedFacility.id
      );
    }
  }

  render() {
    return <Schedules {...this.props} />;
  }
}

SchedulesContainer.propTypes = propTypes;

function mapStateToProps(state) {
  return {
    hasLoadedSchedules: getSchedulesCompletionStatus(state),
    hasSelectedFacilitySlug: !!getSelectedFacilitySlug(state),
    schedules: getSchedules(state),
    selectedFacility: getSelectedFacility(state)
  };
}

function mapDispatchToProps(dispatch) {
  return {
    actions: {
      schedules: bindActionCreators(schedulesActions, dispatch)
    }
  };
}

export { SchedulesContainer };
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(SchedulesContainer);
