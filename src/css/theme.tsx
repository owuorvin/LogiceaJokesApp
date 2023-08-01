import { green, orange, red } from '@mui/material/colors';
import { createTheme } from '@mui/material/styles';
import { PickersDay } from '@mui/lab';

// type overridesNameToClassKey = {
//   [P in keyof MuiPickersOverrides]: keyof MuiPickersOverrides[P];
// };

// declare module '@mui/styles/overrides' {
//   export interface ComponentNameToClassKey extends overridesNameToClassKey {}
// }
const theme = createTheme({
  palette: {
    primary: {
      main: '#D84465',
      dark: '#D84465',
    },
    secondary: {
      main: '#0F103A',
      dark: '#0F103A',
      light: '#a0dfdf',
    },
    error: {
      main: red.A400,
      light: red[100],
    },
    warning: {
      main: orange.A400,
      light: orange[100],
    },
    success: {
      main: green.A400,
      light: green.A100,
    },

    background: {
      default: '#ffffff',
    },
    text: {
      primary: '#000000E2',
      secondary: '#000000A3',
    },
  },
  // overrides: {
  //   MuiInputBase: {
  //     input: {
  //       padding: '0.5rem 0',
  //       height: 'inherit',
  //     },
  //   },
  //   MuiPickersToolbar: {
  //     toolbar: {
  //       backgroundColor: '#0F103A',
  //     },
  //   },
  //   MuiPickersDay: {
  //     daySelected: {
  //       backgroundColor: '#0F103A',
  //     },
  //   },
  // },
  breakpoints: {
    values: {
      xs: 0,
      sm: 768,
      md: 960,
      lg: 1280,
      xl: 1920,
    },
  },
});

export default theme;
