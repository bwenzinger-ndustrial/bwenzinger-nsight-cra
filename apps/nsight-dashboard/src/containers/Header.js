import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import { getSelectedOrganization } from '@ndustrial/nsight-common/selectors';

import Header from '../components/Header';
import * as userActions from '../redux/user/actions';

function mapStateToProps(state) {
  return {
    defaultApplicationRoute: state.applications.defaultApplicationRoute,
    selectedOrganization: getSelectedOrganization(state),
    user: state.user.profile
  };
}

function mapDispatchToProps(dispatch) {
  return {
    actions: {
      user: bindActionCreators(userActions, dispatch)
    }
  };
}

export { mapDispatchToProps, mapStateToProps };
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Header);
