import { ButtonHTMLAttributes } from 'react';

interface ButtonPassedProps {
  children?: any;
  className?: string;
  component?: string;
  disabled?: boolean;
  onClick?: (event: any) => void;
  icon?: JSX.Element | null;
}

export type NdButtonProps = ButtonPassedProps &
  ButtonHTMLAttributes<HTMLButtonElement>;
