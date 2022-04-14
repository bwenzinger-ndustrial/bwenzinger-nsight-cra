import _ from 'lodash';

import { formatDetailTooltips } from '../tooltipUtils';
import { BaseChartConfig } from './index';

export default class MetricChartConfig extends BaseChartConfig {
  createTooltip() {
    const { metric, theme, chartInterval } = this;

    return {
      formatter: function() {
        const { points } = this;
        return formatDetailTooltips(points, metric, theme, chartInterval, true);
      }
    };
  }

  createXAxis() {
    const baseXAxis = super.createXAxis();

    const xAxis = {
      startOnTick: true,
      tickPixelInterval: 50,
      dateTimeLabelFormats: {
        month: '%b'
      }
    };

    return _.merge(baseXAxis, xAxis);
  }

  createPlotOptions() {
    return {
      ...super.createPlotOptions(),
      pointPlacement: 'on'
    };
  }
}
