import React, { Component } from 'react';
import { DynamicModuleLoader } from 'redux-dynamic-modules';

import {
  getFeedTypesModule,
  getKpiCardModule,
  getRequestStateModule
} from '@ndustrial/nsight-common/reduxModules';
import CommonEmsModule, {
  moduleConfig as commonEmsConfig
} from '@ndustrial/nsight-common/services/EmsModule';
import { contxtSdk } from '@ndustrial/nsight-common/utils';

import 'react-notifications/lib/notifications.css';

import FacilityOverviewRoot from './containers/FacilityOverviewRoot';
import getAggregateDemandModule from './redux/aggregateDemand/module';
import getBlendedRateModule from './redux/blendedRate/module';
import getDailyKwhModule from './redux/dailyKwh/module';
import getDemandChartModule from './redux/demandComparison/module';
import getHeatmapModule from './redux/demandHeatmap/module';
import getDetailModule from './redux/detail/module';
import getEventsModule from './redux/events/module';
import getFacilityMetadataModule from './redux/facilityMetadata/module';
import getUtilityDemandChartModule from './redux/utilityDemandComparison/module';
import EmsModule from './services/EmsModule';
import IotModule from './services/IotModule';
import SisModule from './services/SisModule';

class FacilityOverview extends Component {
  /**
   * If we start to run into issues with component did mount running too soon, and breaking
   * our fetch actions, we will likely need to move mounting modules to the constructor
   * see note in packages/nsight-common/services/EmsModule.js
   */
  componentDidMount() {
    contxtSdk.mountDynamicModule('facilityDashboardIot', {
      clientId: contxtSdk.config.audiences.iot_v2.clientId,
      host: contxtSdk.config.audiences.iot_v2.host,
      module: IotModule
    });

    contxtSdk.mountDynamicModule('facilitySis', {
      clientId: contxtSdk.config.audiences.sis.clientId,
      host: contxtSdk.config.audiences.sis.host,
      module: SisModule
    });

    contxtSdk.mountDynamicModule('facilityEms', {
      clientId: contxtSdk.config.audiences.ems.clientId,
      host: contxtSdk.config.audiences.ems.host,
      module: EmsModule
    });

    contxtSdk.mountDynamicModule(commonEmsConfig.name, {
      clientId: commonEmsConfig.clientId,
      host: commonEmsConfig.host,
      module: CommonEmsModule
    });
  }

  componentWillUnmount() {
    contxtSdk.unmountDynamicModule('facilityEms');
    contxtSdk.unmountDynamicModule('facilityDashboardIot');
    contxtSdk.unmountDynamicModule('facilitySis');
    contxtSdk.unmountDynamicModule(commonEmsConfig.name);
  }

  shouldComponentUpdate() {
    // This view never needs to update after the first render.  It should only load
    // it's modules, boostrap redux within DynamicModuleLoader, and sit and
    // wait to be unmounted
    return false;
  }

  render() {
    return (
      <DynamicModuleLoader
        modules={[
          getAggregateDemandModule(),
          getBlendedRateModule(),
          getDailyKwhModule(),
          getDemandChartModule(),
          getDetailModule(),
          getHeatmapModule(),
          getEventsModule(),
          getFeedTypesModule(),
          getRequestStateModule('facilityOverview'),
          getKpiCardModule(),
          getUtilityDemandChartModule(),
          getFacilityMetadataModule()
        ]}
      >
        <FacilityOverviewRoot />
      </DynamicModuleLoader>
    );
  }
}

export default FacilityOverview;
