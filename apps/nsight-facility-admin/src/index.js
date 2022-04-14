import React, { Component } from 'react';
import { NotificationContainer } from 'react-notifications';

import 'react-notifications/lib/notifications.css';

import FacilityEditorContainer from './containers/FacilityEditorContainer';

class FacilityAdmin extends Component {
  shouldComponentUpdate() {
    // This view never needs to update after the first render.  It should only load
    // it's modules, boostrap redux within DynamicModuleLoader, and sit and
    // wait to be unmounted
    return false;
  }

  render() {
    return (
      <>
        <NotificationContainer />
        <FacilityEditorContainer />
      </>
    );
  }
}

export default FacilityAdmin;
