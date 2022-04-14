import { cloneDeep } from 'lodash';
import { createSelector } from 'reselect';

import { SCHEDULE_TABS } from '../../../constants';

const getSchedulesMap = (state) => state.schedules && state.schedules.items;

const getScheduleId = (state, props) => props.match.params.scheduleId;

const getOptions = (state, props, options) => options;

const getScheduleById = createSelector(
  getSchedulesMap,
  getScheduleId,
  getOptions,
  (schedules = {}, scheduleId, options = {}) => {
    const schedule = schedules[scheduleId] && cloneDeep(schedules[scheduleId]);

    if (options.includeSeasonsAggregate && schedule) {
      SCHEDULE_TABS.forEach(({ key }) => {
        if (!(schedule[key] && schedule[key].seasons)) {
          return;
        }

        schedule[key].seasons.push({
          _scheduleType: 'annual',
          endDay: 31,
          endMonth: 12,
          rateScheduleId: schedule.id,
          seasonName: 'Annual Rate',
          seasonType:
            schedule[key].seasons[0] && schedule[key].seasons[0].seasonType,
          slug: 'annual-rate',
          startDay: 1,
          startMonth: 1,
          seasonPeriods: schedule[key].seasons.reduce((memo, season) => {
            memo.push(
              ...season.seasonPeriods.map((period) => {
                return {
                  ...period,
                  endDay: season.endDay,
                  endMonth: season.endMonth,
                  startDay: season.startDay,
                  startMonth: season.startMonth
                };
              })
            );

            return memo;
          }, [])
        });
      });
    }

    return schedule;
  }
);

export default getScheduleById;
