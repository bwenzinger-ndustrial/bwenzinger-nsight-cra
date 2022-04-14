import React from 'react';
import { rem } from 'polished';
import PropTypes from 'prop-types';
import styled from 'styled-components';

import { Aside } from '@ndustrial/nd-aside-react';
import { Information, TooltipQuestion } from '@ndustrial/nd-icons-svg';

const propTypes = {
  className: PropTypes.string,
  rateNarrative: PropTypes.string
};

const NarrativeLabel = styled.label`
  color: ${({ theme }) => theme.colors.textLight};
  display: flex;
  align-items: center;
  font-size: ${rem('10px')};
  font-style: italic;
  letter-spacing: -0.1px;
  line-height: 1.2;
`;

const NarrativeText = styled.p`
  color: ${({ theme }) => theme.colors.text};
  font-size: ${rem('12px')};
  line-height: 1.33;
`;

const WarningIcon = styled(Information)`
  background: rgba(0, 0, 0, 0.2);
  border-radius: 50%;
  cursor: pointer;
  stroke: #fff;
  padding: 4px;
  height: 16px;
  width: 16px;
`;

const AsideIcon = styled(TooltipQuestion)`
  stroke: #606060;
  background: #606060;
`;

const RateNarrative = styled.div`
  ${NarrativeLabel} {
    margin-bottom: ${rem('10px')};
  }

  ${NarrativeText} {
    margin: 0 0 32px 2px;
  }

  ${WarningIcon} {
    margin-left: 8px;
  }
`;

function RtpDetailsContainer({ className, rateNarrative }) {
  return (
    <div className={className}>
      <RateNarrative>
        <NarrativeLabel>Rate Narrative:</NarrativeLabel>
        <NarrativeText>
          {rateNarrative || 'No Rate Narrative Available'}
        </NarrativeText>
      </RateNarrative>
      <Aside
        dismissible
        icon={(props) => <AsideIcon {...props} />}
        type="primary"
        title="Why Is My Rate Schedule Different?"
      >
        Under real time pricing (RTP) tariffs, utility consumers are charged
        prices that vary over short time intervals, typically hourly, and are
        quoted one day or less in advance to reflect contemporaneous marginal
        supply costs. RTP differs from conventional rate tariffs, which are
        based on prices that are fixed for months or years at a time to reflect
        average, embedded supply costs. Due to these differences we are not
        currently able to provide the appropriate visualizations at this time.
      </Aside>
    </div>
  );
}

RtpDetailsContainer.propTypes = propTypes;

export default RtpDetailsContainer;
