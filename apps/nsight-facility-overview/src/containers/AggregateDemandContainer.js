import { connect } from 'react-redux';

import { getSelectedFacility } from '@ndustrial/nsight-common/selectors';

import AggregateDemand from '../components/AggregateDemand';
import { getAggregateDemandData } from '../redux/aggregateDemand/actions';
import {
  getAggregateDemand,
  getCurrentDemand
} from '../redux/aggregateDemand/selectors';
import { getDemandUnits } from '../redux/facilityMetadata/selectors';

const mapStateToProps = (state) => ({
  aggregateDemand: getAggregateDemand(state),
  currentDemand: getCurrentDemand(state),
  facility: getSelectedFacility(state),
  demandUnits: getDemandUnits(state)
});

const mapDispatchToProps = {
  getAggregateDemandData
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(AggregateDemand);
