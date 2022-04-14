import moment from 'moment';
import { createSelector } from 'reselect';

import getDetailTableInfo from './getDetailTableInfo';

const getTableExport = createSelector(
  getDetailTableInfo,
  (detailInfo) => {
    const rows = [
      [
        'Date',
        'Hour',
        'Risk Probability (%)',
        'Forecasted Load (MW)',
        'Actual Load (MW)',
        'Load Variance (MW)',
        'Forecasted Temp (\u00B0F)',
        'Actual Temp (\u00B0F)',
        'Temp Variance (\u00B0F)'
      ]
    ];

    Object.keys(detailInfo.dates).forEach((date) => {
      detailInfo.dates[date].forEach((dateInfo) => {
        rows.push([
          date,
          dateInfo.hour,
          dateInfo.riskProbability,
          dateInfo.forecastedLoad,
          dateInfo.actualLoad,
          dateInfo.loadVariance.replace('+', ''),
          dateInfo.forecastedTemp,
          dateInfo.actualTemp,
          dateInfo.tempVariance.replace('+', '')
        ]);
      });
    });

    return {
      data: rows.map((row) => row.join(',')).join('\n'),
      title: `coincident-peak-${detailInfo.region}-${moment(
        detailInfo.time
      ).format('YYYY-MM-DDTHH:mm:ssZ')}.csv`
    };
  }
);

export default getTableExport;
