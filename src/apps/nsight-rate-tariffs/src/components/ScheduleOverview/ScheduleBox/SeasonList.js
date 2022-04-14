import React from 'react';
import moment from 'moment';
import { rem } from 'polished';
import PropTypes from 'prop-types';
import styled, { css } from 'styled-components';

import { Plus } from '@ndustrial/nd-icons-svg';

const propTypes = {
  className: PropTypes.string,
  handleSeasonIndexSelection: PropTypes.func.isRequired,
  isRtpRate: PropTypes.bool,
  seasons: PropTypes.arrayOf(
    PropTypes.shape({
      endDay: PropTypes.number.isRequired,
      endMonth: PropTypes.number.isRequired,
      id: PropTypes.number.isRequired,
      startDay: PropTypes.number.isRequired,
      startMonth: PropTypes.number.isRequired
    })
  ).isRequired
};

const PlusIcon = styled(Plus)`
  height: 5px;
  width: 5px;
  stroke-width: 2;
`;

const ScheduleSeasonLink = styled.a`
  align-items: center;
  display: flex;
  color: ${({ theme }) => theme.colors.text};
  font-size: ${rem('10px')};
  font-weight: 500;
  letter-spacing: 0.5px;

  ${PlusIcon} {
    margin-right: 6px;
  }

  ${({ isClickable, theme }) => {
    if (isClickable) {
      return css`
        color: ${theme.colors.primary};

        &:hover {
          text-decoration: underline;
          cursor: pointer;
        }

        ${PlusIcon} {
          fill: ${theme.colors.primary};
          stroke: ${theme.colors.primary};
        }
      `;
    }
  }};
`;

const ScheduleSeasonList = styled.div`
  ${ScheduleSeasonLink}:not(:last-child) {
    margin-bottom: 5px;
  }
`;

function SeasonList(props) {
  const { className, handleSeasonIndexSelection, isRtpRate, seasons } = props;

  return (
    <ScheduleSeasonList className={className}>
      {isRtpRate ? (
        <ScheduleSeasonLink isClickable={false}>
          <PlusIcon />
          RTP Rate Schedule
        </ScheduleSeasonLink>
      ) : (
        seasons.map((season, index) => {
          return (
            <ScheduleSeasonLink
              isClickable={seasons.length > 1}
              key={season.id}
              onClick={() => handleSeasonIndexSelection(index)}
            >
              <PlusIcon />
              {season.seasonName} (
              {moment(`${season.startMonth}-${season.startDay}`, 'M-DD')
                .format('MMM DD')
                .toUpperCase()}{' '}
              -{' '}
              {moment(`${season.endMonth}-${season.endDay}`, 'M-DD')
                .format('MMM DD')
                .toUpperCase()}
              )
            </ScheduleSeasonLink>
          );
        })
      )}
    </ScheduleSeasonList>
  );
}

SeasonList.propTypes = propTypes;

export default SeasonList;
