import { TippyProps } from '@tippy.js/react';

interface PassedTooltipProps {
  className?: string;
  tagName?: string;
  placement?:
    | 'top'
    | 'top-start'
    | 'top-end'
    | 'right'
    | 'right-start'
    | 'right-end'
    | 'bottom'
    | 'bottom-start'
    | 'bottom-end'
    | 'left'
    | 'left-start'
    | 'left-end';
}

export type NdTooltipProps = TippyProps & PassedTooltipProps;
