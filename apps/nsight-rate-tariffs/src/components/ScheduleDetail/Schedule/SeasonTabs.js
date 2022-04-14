import React from 'react';
import { withRouter } from 'react-router';
import _ from 'lodash';
import { rem } from 'polished';
import PropTypes from 'prop-types';
import styled from 'styled-components';

import {
  Tab as UnstyledTab,
  TabList,
  TabPanel as UnstyledTabPanel,
  TabPanels,
  Tabs
} from '@ndustrial/nd-tabs-react';

import Heatmap from '../Heatmap';
import SeasonRates from './SeasonRates';

const propTypes = {
  className: PropTypes.string,
  history: PropTypes.shape({
    location: PropTypes.object.isRequired,
    push: PropTypes.func.isRequired
  }).isRequired,
  match: PropTypes.shape({
    params: PropTypes.shape({
      rateType: PropTypes.string.isRequired,
      scheduleId: PropTypes.string.isRequired,
      seasonPeriod: PropTypes.string.isRequired
    }).isRequired
  }).isRequired,
  schedule: PropTypes.object.isRequired
};

const SanitizedTab = ({ seasonLength, ...props }) => <UnstyledTab {...props} />;
SanitizedTab.propTypes = { seasonLength: PropTypes.number };

const Tab = styled(SanitizedTab)`
  && {
    border-left: 0;
    border-right: 0;
    border-top: 0;
    font-size: ${rem('12px')};
    font-weight: 500;
    height: 100%;
    outline: none;
    width: ${({ seasonLength }) => `${100 / seasonLength}%`};

    &[data-selected] {
      font-weight: 500;
    }
  }
`;

const TabPanel = styled(UnstyledTabPanel)`
  &:focus {
    outline: none;
  }
`;

function SeasonTabs(props) {
  const {
    className,
    history,
    match: {
      params: { rateType, scheduleId, seasonPeriod }
    },
    schedule
  } = props;
  const seasons = schedule[rateType].seasons;

  return (
    <Tabs
      className={className}
      index={_.findIndex(seasons, { slug: seasonPeriod })}
      onChange={(index) => {
        history.push({
          ...history.location,
          pathname: `/rate-tariffs/schedule/${scheduleId}/${seasons[index].slug}/${rateType}`
        });
      }}
    >
      <TabList>
        {seasons.map((season) => {
          return (
            <Tab key={season.slug} seasonLength={seasons.length}>
              {season.seasonName}
            </Tab>
          );
        })}
      </TabList>

      <TabPanels>
        {seasons.map((season) => {
          return (
            <TabPanel key={season.slug}>
              <SeasonRates
                periods={schedule[rateType].periods}
                rateType={rateType}
                season={season}
              />
              <Heatmap
                periods={schedule[rateType].periods}
                rateType={rateType}
                season={season}
              />
            </TabPanel>
          );
        })}
      </TabPanels>
    </Tabs>
  );
}

SeasonTabs.propTypes = propTypes;

export default withRouter(SeasonTabs);
