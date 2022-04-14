import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import { getSelectedFacilityId } from '@ndustrial/nsight-common/selectors';

import SiteNavigation from '../components/SiteNavigation';
import { changeRoute } from '../redux/router/actions';

function mapStateToProps(state) {
  return {
    applicationGroupings: state.applications.groupings,
    selectedFacilityId: getSelectedFacilityId(state)
  };
}

function mapDispatchToProps(dispatch) {
  return {
    actions: {
      changeRoute: bindActionCreators(changeRoute, dispatch)
    }
  };
}

export { mapStateToProps };
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(SiteNavigation);
