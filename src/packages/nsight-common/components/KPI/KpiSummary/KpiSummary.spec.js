import React from 'react';
import { expect } from 'chai';
import moment from 'moment';

import { kpiEnums } from '@ndustrial/nsight-common/kpi-config/constants';
import { fixtures } from '@ndustrial/nsight-test-utils';

import { renderWithAppContext } from '../../../test/testRenderer';
import KpiSummary from './KpiSummary';

describe('nsight-common/components/KPI/KpiSummary/KpiSummary', function() {
  let primaryDetail;
  let comparisonDetail;
  let isRealTimeEnabled;
  let kpi;

  beforeEach(function() {
    primaryDetail = {
      breakdown: {}
    };
    comparisonDetail = {
      breakdown: {}
    };
    isRealTimeEnabled = false;
    kpi = fixtures.build('kpiConfig', {
      label: 'Test',
      name: 'Test',
      detail: {
        breakdown: [
          { key: 'breakdown-key', name: 'breakdown-name', icon: 'Dollar' }
        ]
      },
      compareBy: kpiEnums.COMPARE_BY_TYPES.DATE,
      unitPosition: kpiEnums.UNIT_POSITION.PREFIX,
      changeLanguage: {
        positive: 'More Efficient',
        negative: 'Less Efficient'
      }
    });
  });

  it('should display the when a date is selected', function() {
    const { queryByText } = renderWithAppContext(
      <KpiSummary
        comparisonDates={{
          from: moment('2018-01-01', 'YYYY-MM-DD')
            .startOf('day')
            .toDate(),
          to: moment('2018-01-30', 'YYYY-MM-DD')
            .endOf('day')
            .toDate()
        }}
        kpiWindow={kpiEnums.DATE_INTERVALS.MONTHLY}
        comparisonDetail={comparisonDetail}
        isRealTimeEnabled={isRealTimeEnabled}
        kpi={kpi}
        primaryDates={{
          from: moment('2019-01-01', 'YYYY-MM-DD')
            .startOf('day')
            .toDate(),
          to: moment('2019-01-30', 'YYYY-MM-DD')
            .endOf('day')
            .toDate()
        }}
        primaryDetail={primaryDetail}
      />
    );

    expect(queryByText(/Jan 2019 - Jan 2019/)).to.not.be.null();
    expect(queryByText(/Jan 2018 - Jan 2018/)).to.not.be.null();
    expect(queryByText(/Set Primary Date Range/)).to.be.null();
    expect(queryByText(/Set Comparison Date Range/)).to.be.null();
    expect(queryByText(/No Date Range Selected/)).to.be.null();
  });

  it('should inform the user to set the primary date', function() {
    primaryDetail.primaryDates = {};

    const { queryByText } = renderWithAppContext(
      <KpiSummary
        primaryDates={{}}
        primaryDetail={primaryDetail}
        isRealTimeEnabled={isRealTimeEnabled}
        comparisonDates={{}}
        comparisonDetail={comparisonDetail}
        kpi={kpi}
        kpiWindow={kpiEnums.DATE_INTERVALS.MONTHLY}
      />
    );

    expect(queryByText(/Set Primary Date Range/)).to.not.be.null();
    expect(queryByText(/No Date Range Selected/)).to.not.be.null();
  });

  it('should inform the user to set the comparison date', function() {
    comparisonDetail.comparisonDates = {};

    const { queryByText } = renderWithAppContext(
      <KpiSummary
        primaryDates={{}}
        primaryDetail={primaryDetail}
        comparisonDates={{}}
        comparisonDetail={comparisonDetail}
        isRealTimeEnabled={isRealTimeEnabled}
        kpi={kpi}
        kpiWindow={kpiEnums.DATE_INTERVALS.MONTHLY}
      />
    );

    expect(queryByText(/Set Comparison Date Range/)).to.not.be.null();
    expect(queryByText(/No Date Range Selected/)).to.not.be.null();
  });

  it('should calculate the percent difference', function() {
    primaryDetail.breakdown = {
      x: { records: [{ value: 1 }, { value: 2 }, { value: 3 }] },
      y: { records: [{ value: 1 }, { value: 2 }, { value: 3 }] }
    };

    comparisonDetail.breakdown = {
      x: { records: [{ value: 4 }, { value: 4 }, { value: 4 }] },
      y: { records: [{ value: 4 }, { value: 4 }, { value: 4 }] }
    };

    const { queryAllByText } = renderWithAppContext(
      <KpiSummary
        assetMetricFormula="sum(x) + sum(y)"
        comparisonDates={{}}
        comparisonDetail={comparisonDetail}
        kpi={kpi}
        isRealTimeEnabled={isRealTimeEnabled}
        primaryDates={{}}
        primaryDetail={primaryDetail}
        kpiWindow={kpiEnums.DATE_INTERVALS.MONTHLY}
      />
    );

    expect(queryAllByText('12')).to.not.be.null();
    expect(queryAllByText('24')).to.not.be.null();
    expect(queryAllByText('(- 50%)')).to.not.be.null();
  });
});
