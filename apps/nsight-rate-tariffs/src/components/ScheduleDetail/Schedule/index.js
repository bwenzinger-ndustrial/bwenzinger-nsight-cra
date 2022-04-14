import React, { Fragment } from 'react';
import { rem } from 'polished';
import PropTypes from 'prop-types';
import styled from 'styled-components';

import UnstyledRateTypeToggle from './RateTypeToggle';
import Rtp from './Rtp';
import UnstyledSeasonTabs from './SeasonTabs';

const propTypes = {
  className: PropTypes.string,
  rateNarrative: PropTypes.string,
  schedule: PropTypes.shape({
    id: PropTypes.number,
    label: PropTypes.string.isRequired,
    isRtpRate: PropTypes.bool
  }).isRequired
};

const Header = styled.h2`
  color: ${({ theme }) => theme.colors.textLight};
  font-size: ${rem('14px')};
  font-weight: 300;
  letter-spacing: 0.5px;
  line-height: 0.85;
  text-align: center;
`;

const RateTypeToggle = styled(UnstyledRateTypeToggle)``;
const SeasonTabs = styled(UnstyledSeasonTabs)``;

const Container = styled.div`
  display: flex;
  flex-direction: column;

  ${Header},
  ${RateTypeToggle} {
    margin-bottom: 32px;
  }

  ${Header} {
    margin-top: 0;
  }

  ${RateTypeToggle} {
    align-self: center;
  }
`;

function Schedule({ className, rateNarrative, schedule }) {
  return (
    <Container className={className}>
      {schedule.isRtpRate ? (
        <Rtp rateNarrative={rateNarrative} />
      ) : (
        <Fragment>
          <Header>{schedule.label}</Header>

          <RateTypeToggle schedule={schedule} />

          <SeasonTabs schedule={schedule} />
        </Fragment>
      )}
    </Container>
  );
}

Schedule.propTypes = propTypes;

export default Schedule;
