import React from 'react';
import styled from 'styled-components';
import Tippy from '@tippy.js/react';
import { NdTooltipProps } from './types';
export * from './types';

import 'tippy.js/dist/tippy.css';

const BACKGROUND_COLOR = '#3e3e3e';

// still exporting this for anyone who might be using javascript still. otherwise this isn't needed
const TOOLTIP_PLACEMENTS = [
  'top',
  'top-start',
  'top-end',
  'right',
  'right-start',
  'right-end',
  'bottom',
  'bottom-start',
  'bottom-end',
  'left',
  'left-start',
  'left-end'
];

const Anchor = styled.div`
  display: flex;
`;

const TippyWrapper = styled(({ suppressClassNameWarning, ...props }) => {
  return <Tippy {...props} theme="ndustrial" />;
}).attrs({
  suppressClassNameWarning: true
})`
  &.tippy-tooltip.ndustrial-theme {
    background-color: ${BACKGROUND_COLOR};
    border-radius: 2px;
    letter-spacing: 0.25px;

    &.tippy- &[data-placement^='top'] > .tippy-arrow {
      border-left-width: 7px;
      border-right-width: 7px;
      border-top-color: ${BACKGROUND_COLOR};
      border-top-width: 7px;
      margin-left: 4px;
      margin-right: 4px;
    }

    &[data-placement^='right'] > .tippy-arrow {
      border-bottom-width: 7px;
      border-right-color: ${BACKGROUND_COLOR};
      border-right-width: 7px;
      border-top-width: 7px;
      margin-bottom: 4px;
      margin-top: 4px;
    }

    &[data-placement^='bottom'] > .tippy-arrow {
      border-bottom-color: ${BACKGROUND_COLOR};
      border-bottom-width: 7px;
      border-right-width: 7px;
      border-left-width: 7px;
      margin-left: 4px;
      margin-right: 4px;
    }

    &[data-placement^='left'] > .tippy-arrow {
      border-bottom-width: 7px;
      border-left-color: ${BACKGROUND_COLOR};
      border-left-width: 7px;
      border-top-width: 7px;
      margin-bottom: 4px;
      margin-top: 4px;
    }

    & > .tippy-content {
      padding: 12px 16px;
    }
  }
`;

function Tooltip({ className, children, tagName, ...props }: NdTooltipProps) {
  return (
    <TippyWrapper {...props}>
      {/* @ts-ignore next-line - not sure how to do "as=" part with typescript */}
      <Anchor as={tagName} className={className}>
        {children}
      </Anchor>
    </TippyWrapper>
  );
}

export { Tooltip, TOOLTIP_PLACEMENTS };
