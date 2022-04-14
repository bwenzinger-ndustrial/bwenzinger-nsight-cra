import React from 'react';
import { withRouter } from 'react-router';
import PropTypes from 'prop-types';
import styled from 'styled-components';

import {
  ToggleGroup as UnstyledToggleGroup,
  ToggleOption as UnstyledToggleOption
} from '@ndustrial/nd-toggle-group-react';
import { QueryLink } from '@ndustrial/nsight-common/components';

import { SCHEDULE_TABS } from '../../../constants';

const propTypes = {
  className: PropTypes.string,
  match: PropTypes.shape({
    params: PropTypes.shape({
      rateType: PropTypes.string.isRequired,
      seasonPeriod: PropTypes.string.isRequired
    }).isRequired
  }).isRequired,
  schedule: PropTypes.shape({
    flatDemand: PropTypes.object,
    id: PropTypes.number.isRequired,
    touDemand: PropTypes.object,
    usage: PropTypes.object
  }).isRequired
};

const SanitizedQueryLink = ({ isSelected, ...props }) => (
  <QueryLink {...props} />
);
SanitizedQueryLink.propTypes = { isSelected: PropTypes.bool };

const ToggleOption = styled(UnstyledToggleOption)`
  max-width: 120px;
  padding: 4px;
  text-align: center;
  text-decoration: none;
`;

const ToggleGroup = styled(UnstyledToggleGroup)`
  display: flex;
  justify-content: center;
  width: 100%;

  ${ToggleOption} {
    flex-basis: 33%;
  }
`;

function RateTypeToggle(props) {
  const {
    className,
    match: {
      params: { rateType, seasonPeriod }
    },
    schedule
  } = props;

  const availableTabs = SCHEDULE_TABS.filter(({ key }) => schedule[key]);

  return (
    <ToggleGroup className={className}>
      {availableTabs.map((tab) => (
        <ToggleOption
          as={SanitizedQueryLink}
          isSelected={rateType === tab.key}
          key={tab.key}
          size="small"
          to={`/rate-tariffs/schedule/${schedule.id}/${seasonPeriod}/${tab.key}`}
        >
          {tab.title}
        </ToggleOption>
      ))}
    </ToggleGroup>
  );
}

RateTypeToggle.propTypes = propTypes;

export default withRouter(RateTypeToggle);
