import { CHART_TYPES } from '@ndustrial/nsight-common/charts/constants';
import { SeriesCreator } from '@ndustrial/nsight-common/charts/series';

function getDailyKwhSeries(dailyKwh, timezone, theme) {
  return [
    new SeriesCreator({
      name: 'Last Year',
      color: theme.colors.secondary,
      data: dailyKwh.last.length ? dailyKwh.last : [],
      type: CHART_TYPES.AREASPLINE,
      yearOffset: 1,
      timezone
    }).getConfig(),
    new SeriesCreator({
      name: 'Last 30 Days',
      color: theme.colors.primary,
      data: dailyKwh.current.length ? dailyKwh.current : [],
      type: CHART_TYPES.COLUMN,
      timezone
    }).getConfig()
  ];
}

export default { getDailyKwhSeries };
