import { expect } from 'chai';
import faker from 'faker';
import _ from 'lodash';
import moment from 'moment';

import getDemandForecast from './getDemandForecast';

function _generateUnixTime(date) {
  return (date.getTime() / 1000).toFixed(0);
}

describe('nsight-coincident-peak/redux/selectors/getDemandForecast', function() {
  let dates;
  let expectedForecast;
  let run;

  beforeEach(function() {
    const currentDate = new Date();
    const currentPeakDate = faker.date.recent();
    const forecastTimes = _.times(190, (i) =>
      _generateUnixTime(faker.date.future(i + 0.0027, currentDate))
    ).sort();

    dates = {
      from: moment.unix(forecastTimes[0]),
      to: moment.unix(forecastTimes[forecastTimes.length - 1])
    };

    expectedForecast = {
      series: {
        currentPeak: [
          {
            time: _generateUnixTime(currentPeakDate),
            value: faker.random.number()
          }
        ],
        currentRisk: forecastTimes.map((time) => {
          return {
            time,
            value: faker.random.number()
          };
        }),
        forecast: forecastTimes.map((time) => {
          return {
            time,
            value: faker.random.number()
          };
        }),
        forecastedTemp: forecastTimes.map((time) => {
          return {
            time,
            value: faker.random.number({ min: -20, max: 120 })
          };
        }),
        historicPeak: _.sortBy(
          _.times(5, (i) => {
            return {
              time: _generateUnixTime(faker.date.recent(i + 1, currentDate)),
              value: faker.random.number()
            };
          }),
          'time'
        ),
        historicRisk: forecastTimes.map((time) => {
          return {
            time,
            value: faker.random.number({ max: 100 }) / 100
          };
        })
      },
      region: faker.random.arrayElement(['CPLE', 'CPLW', 'DEP']),
      runId: faker.random.number(),
      time: faker.date.recent().toISOString()
    };

    run = {
      data: {
        currentPeak: expectedForecast.series.currentPeak.reduce(
          (memo, peak) => {
            memo[peak.time] = peak.value;
            return memo;
          },
          {}
        ),
        currentRisk: expectedForecast.series.currentRisk.reduce(
          (memo, peak) => {
            memo[peak.time] = peak.value;
            return memo;
          },
          {}
        ),
        forecast: expectedForecast.series.forecast.reduce((memo, peak) => {
          memo[peak.time] = peak.value;
          return memo;
        }, {}),
        historicRisk: expectedForecast.series.historicRisk.reduce(
          (memo, peak) => {
            memo[peak.time] = peak.value;
            return memo;
          },
          {}
        ),
        historicPeaks: {
          // eslint-disable-next-line standard/computed-property-even-spacing
          [faker.random.number({
            max: 9
          })]: expectedForecast.series.historicPeak.reduce((memo, peak) => {
            memo[peak.time] = peak.value;
            return memo;
          }, {})
        },
        temperature: expectedForecast.series.forecastedTemp.reduce(
          (memo, peak) => {
            memo[peak.time] = peak.value;
            return memo;
          },
          {}
        )
      },
      region: expectedForecast.region,
      runId: expectedForecast.runId,
      time: expectedForecast.time
    };
  });

  context('data with dates only in-bound', function() {
    let result;

    beforeEach(function() {
      result = getDemandForecast.resultFunc(dates, run);
    });

    context('series data', function() {
      it('returns an array of current peak data', function() {
        expect(result.series.currentPeak).to.be.an('array');
        expect(result.series.currentPeak).to.deep.equal(
          expectedForecast.series.currentPeak
        );
      });

      it('returns an array of current risk data', function() {
        expect(result.series.currentRisk).to.be.an('array');
        expect(result.series.currentRisk).to.deep.equal(
          expectedForecast.series.currentRisk
        );
      });

      it('returns an array of forecast data', function() {
        expect(result.series.forecast).to.be.an('array');
        expect(result.series.forecast).to.deep.equal(
          expectedForecast.series.forecast
        );
      });

      it('returns an array of forecasted temperature data', function() {
        expect(result.series.forecastedTemp).to.be.an('array');
        expect(result.series.forecastedTemp).to.deep.equal(
          expectedForecast.series.forecastedTemp
        );
      });

      it('returns an array of historic peak data', function() {
        expect(result.series.historicPeak).to.be.an('array');
        expect(result.series.historicPeak).to.deep.equal(
          expectedForecast.series.historicPeak
        );
      });

      it('returns an array of historic risk data', function() {
        expect(result.series.historicRisk).to.be.an('array');
        expect(result.series.historicRisk).to.deep.equal(
          expectedForecast.series.historicRisk
        );
      });
    });

    context('metadata', function() {
      it('contains the region', function() {
        expect(result.region).to.equal(expectedForecast.region);
      });

      it('contains the runId', function() {
        expect(result.runId).to.equal(expectedForecast.runId);
      });

      it('contains the time', function() {
        expect(result.time).to.equal(expectedForecast.time);
      });
    });
  });

  context('data with dates out of bounds', function() {
    let outOfBoundsPoints;
    let outOfBoundsRun;
    let result;

    beforeEach(function() {
      /* eslint-disable standard/computed-property-even-spacing */
      outOfBoundsPoints = {
        currentRisk: {
          [dates.from
            .clone()
            .subtract(faker.random.number({ min: 1, max: 7 }), 'days')
            .unix()]: faker.random.number(),
          [dates.to
            .clone()
            .add(faker.random.number({ min: 1, max: 7 }), 'days')
            .unix()]: faker.random.number()
        },
        forecast: {
          [dates.from
            .clone()
            .subtract(faker.random.number({ min: 1, max: 7 }), 'days')
            .unix()]: faker.random.number(),
          [dates.to
            .clone()
            .add(faker.random.number({ min: 1, max: 7 }), 'days')
            .unix()]: faker.random.number()
        },
        historicRisk: {
          [dates.from
            .clone()
            .subtract(faker.random.number({ min: 1, max: 7 }), 'days')
            .unix()]: faker.random.number(),
          [dates.to
            .clone()
            .add(faker.random.number({ min: 1, max: 7 }), 'days')
            .unix()]: faker.random.number()
        },
        temperature: {
          [dates.from
            .clone()
            .subtract(faker.random.number({ min: 1, max: 7 }), 'days')
            .unix()]: faker.random.number({
            min: -20,
            max: 120
          }),
          [dates.to
            .clone()
            .add(faker.random.number({ min: 1, max: 7 }), 'days')
            .unix()]: faker.random.number({
            min: -20,
            max: 120
          })
        }
      };
      /* eslint-enable standard/computed-property-even-spacing */

      outOfBoundsRun = {
        ...run,
        data: {
          ...run.data,
          currentRisk: {
            ...run.data.currentRisk,
            ...outOfBoundsPoints.currentRisk
          },
          forecast: {
            ...run.data.forecast,
            ...outOfBoundsPoints.forecast
          },
          historicRisk: {
            ...run.data.historicRisk,
            ...outOfBoundsPoints.historicRisk
          },
          temperature: {
            ...run.data.temperature,
            ...outOfBoundsPoints.temperature
          }
        }
      };

      result = getDemandForecast.resultFunc(dates, outOfBoundsRun);
    });

    it('does not include out of bounds current risk data', function() {
      Object.keys(outOfBoundsPoints.currentRisk).forEach((key) => {
        expect(result.series.currentRisk).to.not.deep.include({
          time: key,
          value: outOfBoundsPoints.currentRisk[key]
        });
      });

      expect(result.series.currentRisk).to.deep.equal(
        expectedForecast.series.currentRisk
      );
    });

    it('does not include out of bounds forecast data', function() {
      Object.keys(outOfBoundsPoints.forecast).forEach((key) => {
        expect(result.series.forecast).to.not.deep.include({
          time: key,
          value: outOfBoundsPoints.forecast[key]
        });
      });

      expect(result.series.forecast).to.deep.equal(
        expectedForecast.series.forecast
      );
    });

    it('does not include out of bounds historic risk data', function() {
      Object.keys(outOfBoundsPoints.historicRisk).forEach((key) => {
        expect(result.series.historicRisk).to.not.deep.include({
          time: key,
          value: outOfBoundsPoints.historicRisk[key]
        });
      });

      expect(result.series.historicRisk).to.deep.equal(
        expectedForecast.series.historicRisk
      );
    });

    it('does not include out of bounds forecasted temp data', function() {
      Object.keys(outOfBoundsPoints.temperature).forEach((key) => {
        expect(result.series.forecastedTemp).to.not.deep.include({
          time: key,
          value: outOfBoundsPoints.temperature[key]
        });
      });

      expect(result.series.forecastedTemp).to.deep.equal(
        expectedForecast.series.forecastedTemp
      );
    });
  });
});
