import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { bindActionCreators } from 'redux';

import {
  createCompletionStatusSelector,
  getSelectedFacility
} from '@ndustrial/nsight-common/selectors';

import ScheduleDetail from '../components/ScheduleDetail';
import * as contractsActions from '../redux/contracts/actions';
import { getContractByScheduleId } from '../redux/contracts/selectors';
import * as schedulesActions from '../redux/schedules/actions';
import { getScheduleById } from '../redux/schedules/selectors';

const SELECTED_SCHEDULE_SELECTOR_OPTIONS = {
  includeSeasonsAggregate: true
};

const getScheduleCompletionStatus = createCompletionStatusSelector(
  'rateTariffs',
  ['LOAD_RATE_SCHEDULE']
);

const getContractCompletionStatus = createCompletionStatusSelector(
  'rateTariffs',
  ['LOAD_UTILITY_CONTRACT', 'LOAD_CONTRACT_FILE']
);

class ScheduleDetailContainer extends Component {
  static propTypes = {
    actions: PropTypes.shape({
      contracts: PropTypes.shape({
        getContractFile: PropTypes.func.isRequired,
        loadContractById: PropTypes.func.isRequired
      }).isRequired,
      schedules: PropTypes.shape({
        loadScheduleById: PropTypes.func.isRequired
      }).isRequired
    }).isRequired,
    contract: PropTypes.shape({
      fileId: PropTypes.string,
      fileUrl: PropTypes.string
    }).isRequired,
    history: PropTypes.shape({
      location: PropTypes.shape({
        search: PropTypes.string.isRequired
      }),
      push: PropTypes.func.isRequired
    }).isRequired,
    match: PropTypes.shape({
      params: PropTypes.shape({
        rateType: PropTypes.string.isRequired,
        scheduleId: PropTypes.string.isRequired,
        seasonPeriod: PropTypes.string.isRequired
      }).isRequired
    }).isRequired,
    selectedFacility: PropTypes.shape({
      id: PropTypes.integer
    }),
    selectedSchedule: PropTypes.shape({
      utilityContractId: PropTypes.number
    })
  };

  componentDidMount() {
    if (this.props.selectedFacility) {
      this.loadScheduleAndContract();
    }
  }

  componentDidUpdate(prevProps = {}) {
    // FIXME: This if statement is very hacky. It works, but it is not clear why.
    // It basically is saying "if the page is already loaded and the facility changes".
    if (
      this.props.selectedFacility &&
      this.props.selectedSchedule &&
      prevProps.selectedFacility !== this.props.selectedFacility
    ) {
      this.props.history.push({
        ...this.props.history.location,
        pathname: '/rate-tariffs'
      });
    }

    if (
      (this.props.selectedFacility &&
        prevProps.selectedFacility !== this.props.selectedFacility) ||
      prevProps.match.params.scheduleId !== this.props.match.params.scheduleId
    ) {
      this.loadScheduleAndContract();
    }

    if (this.props.match.params.rateType !== prevProps.match.params.rateType) {
      this.navigateToExistingSeason(this.props);
    }
  }

  loadScheduleAndContract() {
    return this.props.actions.schedules
      .loadScheduleById(this.props.match.params.scheduleId)
      .then(() => {
        if (
          !this.props.selectedFacility ||
          !this.props.selectedSchedule.utilityContractId
        ) {
          return;
        }

        return this.props.actions.contracts
          .loadContractById(
            this.props.selectedFacility.id,
            this.props.selectedSchedule.utilityContractId
          )
          .then(() => {
            if (!this.props.contract.fileId) {
              return;
            }

            return this.props.actions.contracts.getContractFile(
              this.props.contract.fileId,
              this.props.selectedSchedule.utilityContractId
            );
          });
      });
  }

  navigateToExistingSeason({ history, match, selectedSchedule }) {
    const rateType = match.params.rateType;
    const seasonPeriodSlugs =
      selectedSchedule[rateType].seasons.map(({ slug }) => slug) || [];

    if (seasonPeriodSlugs.indexOf(match.params.seasonPeriod) === -1) {
      history.push({
        ...history.location,
        pathname: `/rate-tariffs/schedule/${selectedSchedule.id}/annual-rate/${rateType}`
      });
    }
  }

  render() {
    return <ScheduleDetail {...this.props} />;
  }
}

function mapStateToProps(state, props) {
  return {
    contract: getContractByScheduleId(state, props),
    hasLoadedContract:
      getScheduleCompletionStatus(state) && getContractCompletionStatus(state),
    hasLoadingContractFileError: state.contract.hasLoadingError,
    hasLoadedSchedule: getScheduleCompletionStatus(state),
    selectedFacility: getSelectedFacility(state),
    selectedSchedule: getScheduleById(
      state,
      props,
      SELECTED_SCHEDULE_SELECTOR_OPTIONS
    )
  };
}

function mapDispatchToProps(dispatch) {
  return {
    actions: {
      contracts: bindActionCreators(contractsActions, dispatch),
      schedules: bindActionCreators(schedulesActions, dispatch)
    }
  };
}

export { ScheduleDetailContainer };
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ScheduleDetailContainer);
