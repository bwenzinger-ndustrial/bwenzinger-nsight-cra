import React from 'react';
import moment from 'moment';
import { rem } from 'polished';
import PropTypes from 'prop-types';
import styled from 'styled-components';

import {
  Tab,
  TabList,
  TabPanel,
  TabPanels,
  Tabs
} from '@ndustrial/nd-tabs-react';

import { dayHeatmapParser } from '../../../helpers/heatmapParser';
import HeatmapPreview from './HeatmapPreview';

const rateTypePropTypes = PropTypes.shape({
  periods: PropTypes.array.isRequired,
  seasons: PropTypes.arrayOf(
    PropTypes.shape({
      endDay: PropTypes.number.isRequired,
      endMonth: PropTypes.number.isRequired,
      seasonName: PropTypes.string.isRequired,
      seasonPeriods: PropTypes.arrayOf(
        PropTypes.shape({
          _periodId: PropTypes.number.isRequired,
          dayOfWeekEnd: PropTypes.number.isRequired,
          dayOfWeekStart: PropTypes.number.isRequired,
          hourEnd: PropTypes.number.isRequired,
          hourStart: PropTypes.number.isRequired
        })
      ).isRequired,
      startDay: PropTypes.number.isRequired,
      startMonth: PropTypes.number.isRequired
    })
  ).isRequired
});

const propTypes = {
  className: PropTypes.string,
  handleRateTypeSelection: PropTypes.func.isRequired,
  schedule: PropTypes.shape({
    flatDemand: rateTypePropTypes,
    touDemand: rateTypePropTypes,
    usage: rateTypePropTypes
  }).isRequired,
  selectedSeasonIndex: PropTypes.number.isRequired,
  tabs: PropTypes.arrayOf(
    PropTypes.shape({
      key: PropTypes.string.isRequired,
      title: PropTypes.string.isRequired
    })
  ).isRequired
};

const TabPanelsContainer = styled(TabPanels)`
  background-image: linear-gradient(
    45deg,
    #ededed 10%,
    #fbfbfb 10%,
    #fbfbfb 50%,
    #ededed 50%,
    #ededed 60%,
    #fbfbfb 60%,
    #fbfbfb 100%
  );
  background-size: 7.07px 7.07px;
  display: flex;
  flex-grow: 1;
  flex-direction: column;
  min-height: 224px;
  padding: 12px;
`;

const UsageDemandTabs = styled(Tabs)`
  align-items: stretch;
  height: 100%;
  display: flex;
  flex: 1;
  flex-direction: column;

  ${TabList} {
    height: 36px;
    width: 100%;
  }

  ${Tab} {
    background: #fff;
    border: 0;
    border-bottom: 2px solid transparent;
    color: ${({ theme }) => theme.colors.textLight};
    font-size: ${rem('12px')};
    font-weight: 500;
    height: 100%;
    outline: 0;
    width: 50%;

    &[data-selected] {
      font-weight: 500;
    }
  }
`;

const ScheduleTitle = styled.h3`
  color: ${({ theme }) => theme.colors.primary};
  font-size: ${rem('10px')};
  font-weight: 700;
  letter-spacing: 0.5px;
  line-height: ${rem('12px')};
  margin: 0;
  text-align: center;
  text-transform: uppercase;
`;

const ScheduleSubTitle = styled.h4`
  color: ${({ theme }) => theme.colors.textLight};
  font-size: ${rem('10px')};
  font-weight: 400;
  letter-spacing: 0.5px;
  line-height: 1.2;
  margin: 0;
  text-align: center;
`;

const HeatmapContainer = styled(TabPanel)`
  &:focus {
    outline: none;
  }

  &:not([hidden]) {
    align-items: center;
    display: flex;
    flex-grow: 1;
    flex-direction: column;
    justify-content: space-between;
  }

  ${ScheduleTitle} {
    margin-bottom: 4px;
    margin-top: 16px;
  }

  ${ScheduleSubTitle} {
    margin-bottom: 16px;
  }
`;

const UsageDemandTabsComponent = (props) => {
  const {
    className,
    handleRateTypeSelection,
    schedule,
    selectedSeasonIndex,
    tabs
  } = props;

  const availableTabs = tabs.filter((tab) => schedule[tab.key]);

  return (
    <UsageDemandTabs
      className={className}
      onChange={(index) => handleRateTypeSelection(availableTabs[index].key)}
    >
      <TabList>
        {availableTabs.map((tab) => (
          <Tab key={tab.key}>{tab.title}</Tab>
        ))}
      </TabList>

      <TabPanelsContainer>
        {availableTabs.map((tab, index) => {
          const periods = schedule[tab.key].periods;
          const season = schedule[tab.key].seasons[selectedSeasonIndex] || {};
          const formattedSeasonDates =
            moment(`${season.startMonth}-${season.startDay}`, 'M-DD')
              .format('MMM DD')
              .toUpperCase() +
            ' - ' +
            moment(`${season.endMonth}-${season.endDay}`, 'M-DD')
              .format('MMM DD')
              .toUpperCase();

          return (
            <HeatmapContainer key={tab.key}>
              <div>
                <ScheduleTitle>
                  {season.seasonName} - {tab.title} Heatmap
                </ScheduleTitle>
                <ScheduleSubTitle>{formattedSeasonDates}</ScheduleSubTitle>
              </div>

              <HeatmapPreview
                heatmap={dayHeatmapParser(season.seasonPeriods)}
                periods={periods}
              />
            </HeatmapContainer>
          );
        })}
      </TabPanelsContainer>
    </UsageDemandTabs>
  );
};

UsageDemandTabsComponent.propTypes = propTypes;

export { UsageDemandTabsComponent as UsageDemandTabs };
