import Highcharts from 'highcharts';
import { round } from 'lodash';
import { DateTime } from 'luxon';
import moment from 'moment';

import { TICK_INTERVALS } from '@ndustrial/nsight-common/charts/constants';

import chartUtils from '../chartUtils';

function getCoincidentPeakConfig(
  data,
  actualDemand,
  hourlyWeather,
  historicPeakSeries,
  currentPeakSeries,
  cpDates,
  locationId,
  locations
) {
  const SERIES_SETTINGS = {
    actualTemp: {
      seriesColor: '#f9c642',
      seriesName: 'Actual Temperature',
      markerSymbol: 'circle'
    },
    forecastedTemp: {
      seriesColor: '#dc7b8c',
      seriesName: 'Forecasted Temp',
      markerSymbol: 'circle'
    },
    demandForecast: {
      seriesColor: '#5fa0dd',
      seriesName: 'Demand Forecast',
      markerSymbol: 'circle'
    },
    actualDemand: {
      seriesColor: '#81ba60',
      seriesName: 'Actual Demand',
      markerSymbol: 'circle'
    },
    currentRisk: {
      seriesColor: '#3b2258',
      seriesName: 'Current Risk',
      markerSymbol: 'circle'
    },
    historicRisk: {
      seriesColor: '#7d48bb',
      seriesName: 'Historic Risk',
      markerSymbol: 'circle'
    },
    monthlyPeak: {
      seriesColor: '#ae384d',
      seriesName: 'Month-to-date Peak',
      markerSymbol: 'circle'
    },
    historicPeak: {
      seriesColor: '#E9724C',
      seriesName: 'Historic Peak',
      markerSymbol: 'circle'
    },
    currentPeak: {
      seriesColor: '#6E0E0A',
      seriesName: 'Month-to-date Peak',
      markerSymbol: 'circle'
    }
  };

  // TODO: figure out why API is returning an extra day for forecast temp
  // and remove this
  // For now we'll filter out data to view
  const filteredForecastedTemp = data.forecastedTemp.filter((d) => {
    const pointTime = moment.unix(d.time);
    return pointTime.isSameOrAfter(cpDates.from);
  });

  // TODO: remove this at some point
  const timezone = 'America/New_York';

  const chart = {
    chart: {
      spacingTop: 5,
      spacingBottom: 35,
      zoomType: 'x'
    },
    title: {
      text: ''
    },
    xAxis: {
      events: {
        setExtremes: function(e) {
          if (Highcharts.syncExtremes) {
            Highcharts.syncExtremes(e);
          }
        }
      },
      crosshair: true,
      tickInterval: TICK_INTERVALS.DAY,
      startOnTick: false,
      endOnTick: false,
      showLastLabel: false,
      labels: {
        formatter: function() {
          return ` <span><strong> ${moment(this.value)
            .utc()
            .format('ddd, MMM DD')}</strong></span>`;
        },
        y: 20
      }
    },
    yAxis: [
      {
        // primary yAxis
        gridLineWidth: 0,
        title: {
          text: 'Peak Probability (%)'
        },
        labels: {
          format: '{value} %'
        },
        max: 100,
        endOnTick: false,
        opposite: true
      },
      {
        // secondary yAxis
        labels: {
          format: '{value}°F'
        },
        title: {
          text: 'Temperature (˚F)'
        },
        min: chartUtils.getTempMin(hourlyWeather, filteredForecastedTemp),
        max: chartUtils.getTempMax(hourlyWeather, filteredForecastedTemp)
      },
      {
        // tertiary yAxis
        gridLineWidth: 0,
        startOnTick: false,
        title: {
          text: 'Demand (MW)'
        },
        labels: {
          format: '{value} MW'
        },
        min: chartUtils.getDemandMin(actualDemand, data.forecast) - 400,
        max:
          chartUtils.getDemandMax(
            actualDemand,
            data.forecast,
            historicPeakSeries,
            currentPeakSeries
          ) + 400
      }
    ],
    legend: {
      align: 'center',
      itemMarginBottom: 4,
      borderColor: null,
      borderWidth: 0,
      fillOpacity: 1,
      x: 0,
      y: 40,
      layout: 'horizontal',
      verticalAlign: 'bottom',
      useHTML: true
    },
    tooltip: {
      formatter: function(tooltip) {
        const header = `<div>${DateTime.fromJSDate(new Date(this.x), {
          zone: timezone
        }).toFormat('MMM dd, yyyy h:mm a ZZZZ')}</div>`;
        return header + tooltip.bodyFormatter(this.points).join('');
      }
    },
    series: [
      {
        name: 'Forecasted Temperature',
        yAxis: 1,
        type: 'spline',
        color: SERIES_SETTINGS.forecastedTemp.seriesColor,
        data: filteredForecastedTemp
          ? chartUtils.normalizeChartData(
              filteredForecastedTemp,
              SERIES_SETTINGS.forecastedTemp
            )
          : [],
        useHTML: true,
        tooltip: {
          useHTML: true,
          pointFormatter: function() {
            return `<div><span style=color: ${this.color}">&#9679;</span> ${
              SERIES_SETTINGS.forecastedTemp.seriesName
            }: <span><strong>${round(this.y, 1).toFixed(
              1
            )}°F</strong></span></div>`;
          }
        },
        marker: {
          enabled: false
        }
      },

      {
        name: 'Actual Temperature',
        yAxis: 1,
        type: 'spline',
        color: SERIES_SETTINGS.actualTemp.seriesColor,
        data: hourlyWeather.length
          ? chartUtils.normalizeChartData(
              hourlyWeather,
              SERIES_SETTINGS.actualTemp,
              undefined,
              false,
              false,
              false,
              locationId
            )
          : [],
        tooltip: {
          useHTML: true,
          pointFormatter: function() {
            const tempColor = chartUtils.getTempColor(this.y);
            const locationLabel = locations.find(
              (val) => val.locationId === this.options.locationId
            ).label;

            return `<div><span style="color: ${this.color}">&#9679;</span> ${
              SERIES_SETTINGS.actualTemp.seriesName
            }: <span style="color: ${tempColor.color}"><strong>${round(
              this.y,
              1
            ).toFixed(1)}°F (${locationLabel})</strong></span></div>`;
          }
        },
        marker: {
          enabled: false
        }
      },
      {
        name: 'Demand Forecast',
        yAxis: 2,
        type: 'areaspline',
        color: SERIES_SETTINGS.demandForecast.seriesColor,
        data: data.forecast
          ? chartUtils.normalizeChartData(
              data.forecast,
              SERIES_SETTINGS.demandForecast,
              null
            )
          : [],
        tooltip: {
          useHTML: true,
          valueDecimals: 0,
          valueSuffix: ' MW'
        }
      },
      {
        name: 'Actual Demand',
        yAxis: 2,
        type: 'spline',
        color: SERIES_SETTINGS.actualDemand.seriesColor,
        data: actualDemand
          ? chartUtils.normalizeChartData(
              actualDemand,
              SERIES_SETTINGS.actualDemand,
              null,
              true,
              locationId
            )
          : [],
        tooltip: {
          valueDecimals: 0,
          valueSuffix: ' MW'
        }
      },
      {
        name: 'Current Risk',
        type: 'areaspline',
        color: SERIES_SETTINGS.currentRisk.seriesColor,
        data: data.currentRisk
          ? chartUtils.normalizeChartData(
              data.currentRisk,
              SERIES_SETTINGS.currentRisk,
              100
            )
          : [],
        tooltip: {
          valueDecimals: 1,
          valueSuffix: '%'
        },
        marker: {
          enabled: false
        }
      },
      {
        name: 'Historic Risk',
        type: 'areaspline',
        color: SERIES_SETTINGS.historicRisk.seriesColor,
        data: data.historicRisk
          ? chartUtils.normalizeChartData(
              data.historicRisk,
              SERIES_SETTINGS.historicRisk,
              100
            )
          : [],
        tooltip: {
          valueDecimals: 1,
          valueSuffix: '%'
        },
        marker: {
          enabled: false
        }
      }
    ],
    plotOptions: {
      series: {
        fillOpacity: 0.1,
        marker: {
          enabled: true
        }
      }
    },
    responsive: {
      rules: [
        {
          condition: {
            maxWidth: 500
          },
          chartOptions: {
            yAxis: [
              {
                labels: {
                  align: 'right',
                  x: 0,
                  y: -6
                },
                showLastLabel: false
              },
              {
                labels: {
                  align: 'left',
                  x: 0,
                  y: -6
                },
                showLastLabel: false
              },
              {
                visible: false
              }
            ]
          }
        }
      ]
    }
  };

  historicPeakSeries.forEach((val, idx) => {
    chart.series.push({
      name: 'Historic Peaks',
      type: 'line',
      yAxis: 2,
      dashStyle: 'ShortDash',
      color: SERIES_SETTINGS.historicPeak.seriesColor,
      linkedTo: idx > 0 ? ':previous' : '',
      data: val,
      visible: false,
      tooltip: {
        useHTML: true,
        pointFormatter: function() {
          if (this.peakMonth === moment(this.x).format('M')) {
            return `<div><span style="color: ${
              this.color
            }">&#9679;</span> Historic Peak: <strong>${round(this.y, 0).toFixed(
              0
            )} MW</strong>, (${DateTime.fromJSDate(new Date(this.peakDate), {
              zone: timezone
            }).toFormat('MMM dd, yyyy h:mm a')})</span></div>`;
          }
        }
      },
      showInLegend: idx === 0 || false,
      marker: {
        enabled: false
      }
    });
  });

  currentPeakSeries.forEach((val, idx) => {
    chart.series.push({
      name: 'Month-to-date Peak',
      type: 'line',
      yAxis: 2,
      dashStyle: 'ShortDash',
      color: SERIES_SETTINGS.currentPeak.seriesColor,
      linkedTo: idx > 0 ? ':previous' : '',
      data: val,
      visible: true,
      tooltip: {
        useHTML: true,
        pointFormatter: function() {
          return `<div><span style="color: ${
            this.color
          }">&#9679;</span> Month-to-date Peak: <strong>${round(
            this.y,
            0
          ).toFixed(0)} MW</strong>, (${DateTime.fromJSDate(
            new Date(this.peakDate),
            {
              zone: timezone
            }
          ).toFormat('MMM dd, yyyy h:mm a')})</span></div>`;
        }
      },
      showInLegend: idx === 0 || false,
      marker: {
        enabled: false
      }
    });
  });

  return chart;
}
export default getCoincidentPeakConfig;
