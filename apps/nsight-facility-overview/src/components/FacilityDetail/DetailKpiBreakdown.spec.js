import React from 'react';
import { cleanup, fireEvent } from '@testing-library/react';
import { expect } from 'chai';

import { renderWithAppContext } from '@ndustrial/nsight-common/test/testRenderer';

import DetailKpiBreakdown from './DetailKpiBreakdown';

afterEach(cleanup);

describe('nsight-facility-overview/src/components/facilityDetail/DetailKpiBreakdown', function() {
  // TODO: update with detailPageRef and detailChart
  it('changes the view when the tab is changed', function() {
    const kpi = {
      label: 'Test',
      name: 'Test',
      detail: {
        breakdown: [
          { key: 'breakdown-key', name: 'breakdown-name', icon: 'Dollar' }
        ]
      }
    };
    const { getByText, queryByTestId, getAllByText } = renderWithAppContext(
      <DetailKpiBreakdown
        kpi={kpi}
        comparisonDetail={{
          breakdown: {},
          avg: 0,
          comparisonDates: {}
        }}
        primaryDetail={{
          breakdown: {},
          avg: 0,
          primaryDates: {}
        }}
        comparisonDates={{}}
        primaryDates={{}}
        weather={{
          primaryWeather: {
            data: {
              records: []
            },
            details: { avgHigh: undefined, avgLow: undefined }
          },
          secondaryWeather: {
            data: {
              records: []
            },
            details: { avgHigh: undefined, avgLow: undefined }
          }
        }}
      />
    );

    fireEvent.click(getAllByText('Graph')[0]);
    expect(queryByTestId('detail-kpi-breakdown-graphs')).to.not.be.null();
    expect(queryByTestId('detail-kpi-breakdown-table')).to.be.null();

    fireEvent.click(getByText('Table'));
    expect(queryByTestId('detail-kpi-breakdown-graphs')).to.be.null();
    expect(queryByTestId('detail-kpi-breakdown-table')).to.not.be.null();
  });
});
