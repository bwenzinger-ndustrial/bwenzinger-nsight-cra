import React from 'react';
import styled from 'styled-components';

import { TooltipQuestion } from '@ndustrial/nd-icons-svg';
import { Tooltip as UnstyledTooltip } from '@ndustrial/nd-tooltip-react';

const TooltipIcon = styled(TooltipQuestion)`
  height: 12px;
  width: 12px;
  cursor: pointer;
`;

const Tooltip = styled(UnstyledTooltip)`
  display: inline-flex;
`;

const TooltipText = styled.p`
  margin: 0;
`;

const TooltipContainer = styled.div`
  ${TooltipText} {
    margin-bottom: 12px;
  }
`;

const RateNarrativeTooltip = () => (
  <Tooltip
    placement="right"
    tagName="span"
    content={
      <TooltipContainer>
        <TooltipText>
          A Rate Narrative is a high-level summary of your Utility Contract.
          Consider using this space to mention important details about this
          Utility Contract such as fees and penalties, cost structure, and your
          provider&lsquo;s name and contact information.
        </TooltipText>
      </TooltipContainer>
    }
  >
    <TooltipIcon />
  </Tooltip>
);

const SubscribedUsersTooltip = () => (
  <Tooltip
    placement="right"
    tagName="span"
    content={
      <TooltipContainer>
        <TooltipText>
          Personnel who will receive email notifications for this contract’s
          events. This includes expirations of &quot;active&quot; contracts with
          notifications for 90, 60, 30, and 15 days prior to this contract
          expiring.
        </TooltipText>
      </TooltipContainer>
    }
  >
    <TooltipIcon />
  </Tooltip>
);

export { RateNarrativeTooltip };
export { SubscribedUsersTooltip };
