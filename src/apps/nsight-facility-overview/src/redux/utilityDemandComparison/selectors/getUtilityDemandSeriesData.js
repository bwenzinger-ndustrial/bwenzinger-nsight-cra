import moment from 'moment';
import { createSelector } from 'reselect';

const getUtilityDemandData = (state) => state.utilityDemandData.demand;
const getUtilityUsageData = (state) => state.utilityDemandData.usage;

const getUtilityDemandSeriesData = createSelector(
  getUtilityDemandData,
  getUtilityUsageData,
  (utilityDemandData, utilityUsageData) => {
    if (!utilityDemandData && !utilityUsageData) {
      return null;
    }

    const sortedKeys = Object.keys(utilityDemandData || utilityUsageData).sort(
      (a, b) => (moment(a, 'YYYY-M').isBefore(moment(b, 'YYYY-M')) ? -1 : 1)
    );

    const seriesData = sortedKeys.reduce((memo, key) => {
      if (memo.length) {
        const previousDate = memo[memo.length - 1].x;
        const missingMonthCount = moment(key, 'YYYY-M').diff(
          moment(previousDate),
          'months'
        );

        // Subtract 1 to account for the expected distance of one month, added below
        for (let i = 0; i < missingMonthCount - 1; i += 1) {
          memo.push({
            x:
              moment(previousDate)
                .add(i + 1, 'months')
                .unix() * 1000,
            y: null
          });
        }
      }

      memo.push({
        x: moment(key, 'YYYY-M').unix() * 1000,
        y: utilityDemandData ? utilityDemandData[key] : utilityUsageData[key]
      });
      return memo;
    }, []);

    const latestPoint = seriesData[seriesData.length - 1];
    if (latestPoint) {
      const latestDate = moment(latestPoint.x);
      const distanceToCurrent = moment().diff(latestDate, 'months');
      for (let i = 0; i < distanceToCurrent; i += 1) {
        seriesData.push({
          x:
            latestDate
              .clone()
              .add(i + 1, 'months')
              .unix() * 1000,
          y: null
        });
      }
    }

    return {
      primary: seriesData.slice(-12),
      comparison: seriesData.slice(-24, -12)
    };
  }
);

export default getUtilityDemandSeriesData;
