export interface NdAsideProps {
  children?: any;
  className?: string;
  dismissible?: boolean;
  icon: (props: any) => JSX.Element;
  onDismiss?: () => void;
  title?: string;
  type: string;
}
