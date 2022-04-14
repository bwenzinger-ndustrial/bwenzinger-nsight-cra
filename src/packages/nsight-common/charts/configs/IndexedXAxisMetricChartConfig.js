import Highcharts from 'highcharts/highstock';
import _ from 'lodash';
import moment from 'moment';

import { CHART_DISPLAY_INTERVALS, TICK_INTERVALS } from '../constants';
import { formatDetailTooltips } from '../tooltipUtils';
import { BaseChartConfig } from './index';

export default class IndexedXAxisMetricChartConfig extends BaseChartConfig {
  createTooltip() {
    const { metric, theme, chartInterval } = this;

    return {
      formatter: function() {
        const { points } = this;
        return formatDetailTooltips(
          points,
          metric,
          theme,
          chartInterval === CHART_DISPLAY_INTERVALS.MONTH,
          true
        );
      }
    };
  }

  createXAxis() {
    const baseXAxis = super.createXAxis();

    const xAxis = {
      labels: this.createXAxisLabels(),
      tickInterval: TICK_INTERVALS.DEFAULT,
      events: {
        setExtremes: function(e) {
          if (Highcharts.syncExtremes) {
            Highcharts.syncExtremes(e);
          }
        }
      }
    };

    return _.merge(baseXAxis, xAxis);
  }

  createXAxisLabels() {
    const {
      chartInterval,
      primarySeries: { data = [] }
    } = this;

    return {
      align: 'center',
      formatter: (axisAttributes) => {
        if (!data.length || axisAttributes.pos >= data.length) {
          return '';
        }

        const dateTime = moment(data[axisAttributes.pos].date);
        const day = dateTime.date();
        const month = dateTime.format('MMM');
        const monthForDayDisplay =
          day === 1 || axisAttributes.isFirst ? month : '\n';

        if (chartInterval === CHART_DISPLAY_INTERVALS.DAY) {
          return `<span style="color: #393D3F;">${monthForDayDisplay}</span> 
                  <br/>
                  <span><strong>${day}</strong></span>
                  `;
        }

        return `<span><strong>${month}</strong></span>`;
      },
      y: 20
    };
  }
}
