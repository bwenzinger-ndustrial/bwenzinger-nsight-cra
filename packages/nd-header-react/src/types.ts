export interface NdHeaderReactProps {
  appName?: string;
  children?: any;
  className?: string;
  homePath?:
    | string
    | {
        pathname: string;
        search?: string;
        hash?: string;
        state?: object;
      };
  logoSrc?: string | JSX.Element;
}
