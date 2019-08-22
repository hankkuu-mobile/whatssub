import 'styled-components';

declare module 'styled-components' {
  export interface DefaultTheme {
    background: string;
    headerBackground: string;
    highlight: string;
    fontColor: string;
    fontSecondaryColor: string;
    disabled: string;
    rosa: string;
    marine: string;
    gray: string;
    blue: string;
    // for debug layout
    debug: boolean;
    setDebug: (debug: boolean) => void;
  }
}
