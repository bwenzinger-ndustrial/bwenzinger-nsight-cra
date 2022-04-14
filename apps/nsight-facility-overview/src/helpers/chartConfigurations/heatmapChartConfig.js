import Highcharts from 'highcharts';
import moment from 'moment';

function getHeatmapDemandConfig(configObj, units) {
  return {
    chart: {
      type: 'heatmap',
      backgroundColor: 'transparent',
      style: {
        fontFamily: 'Roboto, Arial, sans-serif'
      }
    },
    legend: {
      align: 'right',
      layout: 'vertical',
      verticalAlign: 'top'
    },
    colorAxis: {
      min: configObj.minVal,
      reversed: false,
      stops: [[0, '#477BBA'], [0.5, '#FDE8B3'], [0.9, '#AE384D']]
    },
    tooltip: {
      useHTML: true,
      borderWidth: 0,
      shadow: false,
      formatter: function() {
        let date;
        let point;
        if (this.series.yAxis.categories.length > 7) {
          date = `${moment(
            this.series.yAxis.categories[this.point.y],
            'ddd MMM D'
          ).format('dddd, MMMM Do')} , ${
            this.series.xAxis.categories[this.point.x]
          }`;
          point = `Demand: ${Highcharts.numberFormat(
            this.point.value,
            0,
            '',
            ','
          )} ${units}`;
        } else {
          date = `${this.series.yAxis.categories[this.point.y]}, ${
            this.series.xAxis.categories[this.point.x]
          }`;
          point = `Avg. Demand: ${Highcharts.numberFormat(
            this.point.value,
            0,
            '',
            ','
          )} ${units}`;
        }

        if (this.point.value === null) {
          point = '<div style="color: gray;">Data Outage</div>';
        }

        return `<div>${date}</div><div>${point}</div>`;
      }
    },

    title: {
      text: ''
    },

    subtitle: {
      text: '',
      style: {
        color: '#6D6D6D',
        fontSize: '13px'
      }
    },

    xAxis: {
      categories: configObj.xLabels,
      labels: {
        rotation: -45
      }
    },

    yAxis: {
      categories: configObj.yLabels,
      reversed: true,
      title: null
    },

    credits: { enabled: false },

    series: [
      {
        name: units,
        borderWidth: 0,
        data: configObj.chartData,
        dataLabels: {
          enabled: false,
          color: '#000000'
        }
      }
    ],
    responsive: {
      rules: [
        {
          condition: {
            maxWidth: 400
          },
          chartOptions: {
            chart: {
              spacing: 0,
              spacingTop: 30,
              spacingBottom: 10
            },
            legend: {
              align: 'right',
              verticalAlign: 'top',
              x: 12
            }
          }
        },
        {
          condition: {
            maxWidth: 625
          },
          chartOptions: {
            chart: {
              spacing: 0,
              spacingTop: 30,
              spacingBottom: 10
            },
            legend: {
              align: 'right',
              verticalAlign: 'top',
              x: 12
            }
          }
        }
      ]
    }
  };
}

export default getHeatmapDemandConfig;
