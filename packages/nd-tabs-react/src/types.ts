import { TabProps } from '@reach/tabs';

export type NdTabItemProps = TabProps & {
  children?: any;
  className?: string;
  icon?: any;
};

export interface NdTabsProps {
  $size?: string;
}
