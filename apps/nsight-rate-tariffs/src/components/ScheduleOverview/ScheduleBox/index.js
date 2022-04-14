import React, { Component } from 'react';
import { truncate } from 'lodash';
import { rem } from 'polished';
import PropTypes from 'prop-types';
import styled from 'styled-components';

import { SecondaryButton } from '@ndustrial/nd-button-react';
import { QueryLink } from '@ndustrial/nsight-common/components';

import { SCHEDULE_TABS } from '../../../constants';
import { RtpOverview } from './RtpOverview';
import SeasonList from './SeasonList';
import StatusText from './StatusText';
import { UsageDemandTabs } from './UsageDemandTabs';

const ScheduleColor = ({ isActive, theme }) => {
  return isActive ? theme.colors.primary : theme.colors.disabled;
};

const ScheduleBox = styled.div`
  background: #fff;
  display: flex;
  border: 1px solid ${ScheduleColor};
  border-top-width: 8px;
  flex-direction: column;

  @media screen and (min-width: 700px) and (max-width: 899px),
    screen and (min-width: 1300px) {
    flex-direction: row;
    border-top-width: 1px;
    border-left-width: 8px;
  }
`;

const ScheduleStatusText = styled(StatusText)``;

const ScheduleTitle = styled.h2`
  color: ${({ theme }) => theme.colors.text};
  font-size: ${rem('20px')};
  font-weight: 300;
  line-height: 1.2;
`;

const UnpublishedText = styled.span`
  font-style: italic;
`;

const ScheduleOrganization = styled.span`
  color: ${({ theme }) => theme.colors.textLight};
  font-size: ${rem('10px')};
  font-weight: 400;
  font-style: italic;
  letter-spacing: -0.1px;
`;

const ScheduleSeasonList = styled(SeasonList)``;

const ScheduleDetails = styled.div`
  color: ${({ theme }) => theme.colors.textLight};
  font-size: ${rem('10px')};
  font-weight: 500;
  letter-spacing: 0.5px;
  line-height: ${rem('16px')};
`;

const ScheduleInfo = styled.div`
  padding: 10px 15px 15px;
  width: 100%;
  border-bottom: 1px solid ${ScheduleColor};
  display: flex;
  flex-direction: column;

  @media screen and (min-width: 700px) and (max-width: 899px),
    screen and (min-width: 1300px) {
    border-right: 1px solid ${ScheduleColor};
    border-bottom: 0;
    padding: 10px 12px 12px;
    width: 270px;
  }

  ${ScheduleStatusText} {
    padding-bottom: 1px;
  }

  ${ScheduleTitle} {
    margin-bottom: 8px;
    margin-top: 26px;
  }

  ${UnpublishedText} {
    margin-left: 4px;
  }

  ${ScheduleStatusText} + ${ScheduleTitle} {
    margin-top: 10px;
  }

  ${ScheduleOrganization} {
    margin-bottom: 12px;
  }

  ${ScheduleSeasonList} {
    margin-bottom: 14px;
  }

  ${ScheduleDetails} {
    margin-bottom: 16px;
    flex-grow: 1;
  }
`;

const ScheduleButton = styled(SecondaryButton)`
  width: 100%;
  font-size: ${rem('10px')};
  color: ${({ theme }) => theme.colors.primary};
  border: 1px solid ${({ theme }) => theme.colors.primary};

  &:hover {
    background: ${({ theme }) => theme.colors.primary};
    /* stylelint-disable-next-line sh-waqar/declaration-use-variable */
    color: #fff;
  }
`;

const ScheduleOverview = styled.div`
  flex-grow: 1;
`;

class ScheduleBoxComponent extends Component {
  static propTypes = {
    className: PropTypes.string,
    isActive: PropTypes.bool,
    isExpired: PropTypes.bool,
    organizationName: PropTypes.string.isRequired,
    rateNarrative: PropTypes.string,
    schedule: PropTypes.shape({
      description: PropTypes.string.isRequired,
      flatDemand: PropTypes.shape({
        seasons: PropTypes.array
      }),
      id: PropTypes.number.isRequired,
      isPublished: PropTypes.bool,
      isRtpRate: PropTypes.bool,
      label: PropTypes.string.isRequired,
      touDemand: PropTypes.shape({
        seasons: PropTypes.array
      }),
      usage: PropTypes.shape({
        seasons: PropTypes.array
      })
    }).isRequired
  };

  static defaultProps = {
    isActive: false,
    isExpired: false,
    isRtpRate: false
  };

  constructor(props) {
    super(props);

    const defaultRateType = 'usage';

    this.state = {
      selectedRateType: defaultRateType,
      selectedSeasonIndex: 0
    };
  }

  handleSeasonIndexSelection = (seasonIndex) => {
    this.setState({ selectedSeasonIndex: seasonIndex });
  };

  handleRateTypeSelection = (rateType) => {
    this.setState((prevState) => {
      const update = { selectedRateType: rateType };

      if (
        !this.props.schedule[rateType].seasons[prevState.selectedSeasonIndex]
      ) {
        update.selectedSeasonIndex = 0;
      }

      return update;
    });
  };

  render() {
    const {
      className,
      isActive,
      isExpired,
      organizationName,
      rateNarrative,
      schedule
    } = this.props;

    const scheduleDetailsText = truncate(schedule.description, {
      length: 140
    });

    return (
      <ScheduleBox isActive={isActive} className={className}>
        <ScheduleInfo isActive={isActive}>
          <ScheduleStatusText isActive={isActive} isExpired={isExpired} />
          <ScheduleTitle>
            {schedule.label}
            {!schedule.isPublished && (
              <UnpublishedText>(Unpublished)</UnpublishedText>
            )}
          </ScheduleTitle>

          <ScheduleOrganization>{organizationName}</ScheduleOrganization>

          <ScheduleSeasonList
            handleSeasonIndexSelection={this.handleSeasonIndexSelection}
            isRtpRate={schedule.isRtpRate}
            seasons={this.props.schedule[this.state.selectedRateType].seasons}
          />

          <ScheduleDetails>{scheduleDetailsText}</ScheduleDetails>

          <ScheduleButton
            as={QueryLink}
            to={`/rate-tariffs/schedule/${schedule.id}/annual-rate/usage`}
          >
            View Schedule
          </ScheduleButton>
        </ScheduleInfo>

        {schedule.isRtpRate ? (
          <RtpOverview copy={rateNarrative} />
        ) : (
          <ScheduleOverview>
            <UsageDemandTabs
              handleRateTypeSelection={this.handleRateTypeSelection}
              selectedSeasonIndex={this.state.selectedSeasonIndex}
              schedule={this.props.schedule}
              tabs={SCHEDULE_TABS}
            />
          </ScheduleOverview>
        )}
      </ScheduleBox>
    );
  }
}

export { ScheduleBoxComponent as ScheduleBox };
