import { WrapperProps } from 'react-aria-menubutton';
import { MenuButtonPassedProps } from './index';

export type NdMenuButtonReactProps = MenuButtonPassedProps &
  Omit<WrapperProps<HTMLElement>, 'ref' | 'as'>;
