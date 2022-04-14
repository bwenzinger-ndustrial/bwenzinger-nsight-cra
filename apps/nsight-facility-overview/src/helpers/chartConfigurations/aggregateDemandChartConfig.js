import { get, round } from 'lodash';
import moment from 'moment';

function removePath(id) {
  const element = document.getElementById(id);
  if (element) {
    element.remove();
  }
}

function getAggregateDemandChartConfig(data) {
  const monthPeakValue = round(data.monthPeak.value, 3) || 0;
  const historicPeakValue = round(data.historicPeak.value, 3) || 0;
  const categoryTotal = round(data.categoryTotal, 3) || 0;

  const yMax = Math.max(monthPeakValue, historicPeakValue, categoryTotal);
  const units = get(data, 'units', '');

  return {
    credits: { enabled: false },
    colors: [
      '#5fa0dd',
      '#81ba60',
      '#f9c642',
      '#dc7b8c',
      '#ae384d',
      '#7d48bb',
      '#3b2258',
      '#124e78',
      '#e9724c',
      '#6e0e0a'
    ],
    series: [
      {
        // This series is a hack used to fill the background to the top of the graph
        name: 'High Demand',
        data: [yMax],
        color: '#e4e4e4',
        enableMouseTracking: false,
        includeInDataExport: false,
        showInLegend: false,
        units: '',
        label: { enabled: false },
        yAxis: 1
      },
      ...data.series
    ],
    title: null,
    chart: {
      type: 'column',
      // The margin is needed for when the demand lines are at the very top of the chart
      marginTop: 16,
      style: {
        fontFamily: 'Roboto, Arial, sans-serif'
      },
      events: {
        redraw: function() {
          // The previous paths persist, so we must remove them first
          removePath('monthPeak');
          removePath('historicPeak');

          const pointOffset = this.options.plotOptions.series.pointWidth / 2;
          const commonSettings = {
            'stroke-width': 1,
            stroke: '#e1697d',
            dashstyle: 'solid',
            zIndex: 999
          };

          // These two lines are rendered as paths rather than plotlines so they stop at the end of the
          // bar instead of stretching the entire axis
          const monthlyPeak = this.yAxis[0].plotLinesAndBands[0];
          const { x, y } = monthlyPeak.svgElem.getBBox();
          this.renderer
            .path({
              ...commonSettings,
              id: 'monthPeak',
              d: `M ${x} ${y} L ${this.chartWidth / 2 + pointOffset} ${y}`
            })
            .add();

          const historicPeak = this.yAxis[0].plotLinesAndBands[1];
          const { y: hy } = historicPeak.svgElem.getBBox();
          const hx = this.chartWidth / 2 - pointOffset;
          this.renderer
            .path({
              ...commonSettings,
              id: 'historicPeak',
              d: `M ${hx} ${hy} L ${this.chartWidth} ${hy}`
            })
            .add();
        }
      }
    },
    plotOptions: {
      series: { pointWidth: 200 },
      column: { stacking: 'normal' }
    },
    tooltip: { enabled: false },
    legend: {
      layout: 'horizontal',
      reverse: false,
      fillOpacity: 1,
      floating: false,
      labelFormat: '{name}' // Should be {name} {userOptions.value:.3f} kW, but the data is currently incorrect
    },
    xAxis: {
      lineColor: 'transparent',
      tickLength: 0,
      labels: {
        enabled: false
      }
    },
    yAxis: [
      {
        // This ensures the bar chart touches the exact top of the chart
        tickPositions: [0, yMax],
        gridLineColor: 'transparent',
        title: null,
        labels: { enabled: false },
        plotLines: [
          // These lines are drawn in the redraw method
          {
            color: 'transparent',
            width: 1,
            value: monthPeakValue,
            zIndex: 30,
            useHTML: true,
            label: {
              align: 'left',
              formatter: function() {
                return `
                <div style='font-size: 14px; color: #CA5E70;'>
                  <div>${moment
                    .utc(data.monthPeak.event_time)
                    .format('MMM D YYYY')} PEAK</div>
                  <br />
                  <div style='color: #CA5E70; font-weight: 700;'>
                  ${monthPeakValue} ${units.toUpperCase()}
                  </div>
                  <br />

                </div>
              `;
              }
            }
          },
          {
            color: 'transparent',
            width: 1,
            value: historicPeakValue,
            zIndex: 30,
            useHTML: true,
            label: {
              align: 'right',
              formatter: function() {
                return `
                <div style='font-size: 14px; color: #CA5E70;'>
                  <div>
                    ${moment
                      .utc(data.historicPeak.event_time)
                      .format('MMM D YYYY')} PEAK</div>
                  <br />
                  <div style='color: #CA5E70; font-weight: 700;'>
                  ${historicPeakValue} ${units.toUpperCase()}
                  </div>
                </div>
              `;
              }
            }
          }
        ]
      },
      {
        // This extra y-axis is a hack to fill the background to the top
        tickPositions: [0, yMax],
        gridLineColor: 'transparent',
        title: null,
        labels: { enabled: false }
      }
    ]
  };
}

export default getAggregateDemandChartConfig;
