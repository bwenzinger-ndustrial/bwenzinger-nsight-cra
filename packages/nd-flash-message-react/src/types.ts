export interface NdFlashMessageProps {
  children: any;
  className?: string;
  dismissible?: boolean;
  icon: (props: any) => any;
  onDismiss?: () => void;
  type: string;
}
