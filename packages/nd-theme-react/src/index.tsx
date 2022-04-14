import * as animations from './animations';
import GlobalStyle from '../src/GlobalStyle';
import themeHelper from './themeHelper';

const defaultTheme = {
  colors: {
    // These colors are in the process of being deprecated.  Use colors from uiKit below
    button: '#0b588a',
    disabled: '#d5d5d5',
    gray: '#bababa',
    failure: '#e1697d',
    primary: '#0b588a',
    secondary: '#2ab7cc',
    success: '#99be40',
    text: '#393d3f',
    textLight: '#717171',
    warning: '#dab75f'
  },
  uiKitBackground: {
    background: '#fff'
  },
  uiKitText: {
    text: '#202020',
    textSecondary: '#606060',
    textTertiay: '#838383',
    disabled: '#d8d8d8',
    placeholder: '#A8A8A8'
  },
  uiKitInput: {
    border: '#EBEBEB'
  },
  uiKitDataComparison: {
    primary: '#2764ae',
    secondary: '#2ab7cc'
  },
  uiKitCalendar: {
    calendarPrimary: '#2764ae',
    calendarComparison: '#2ab7cc',
    calendarInRange: '#f4f7fb',
    calendarHover: '#f5f5f5'
  },
  uiKitStates: {
    error: '#e1697d',
    success: '#99be40',
    warning: '#dab75f',
    disabled: '#d8d8d8'
  },
  fonts: {
    primary: 'Roboto, Arial, sans-serif'
  }
};

export { animations, defaultTheme, GlobalStyle, themeHelper };
