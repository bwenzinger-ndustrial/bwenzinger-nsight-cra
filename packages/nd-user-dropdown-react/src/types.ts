import { NdMenuButtonReactProps } from '@ndustrial/nd-menu-button-react';

export interface NdUserDropDownProps {
  avatarSrc?: string;
  children: any;
  className?: string;
  onSelection: (value: string) => void;
  userName?: string;
}

export interface NdWrappedComponentProps {
  isOpen: boolean;
}

export type NdUserDropdownSanitizedMenuProps = NdMenuButtonReactProps &
  NdWrappedComponentProps;
