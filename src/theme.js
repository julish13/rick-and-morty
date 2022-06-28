import { red } from '@mui/material/colors';
import { createTheme } from '@mui/material/styles';

const theme = createTheme();

export default createTheme({
  palette: {
    background: {
      primary: '#FCF8E8',
      secondary: '#FBA92C',
      overlay: 'rgba(0.34, 0.34, 0.34, 0.6)',
    },
    text: {
      primary: '#141414',
      secondary: '#565656',
      light: '#FCF8E8',
      error: red.A400,
    },
  },
  typography: {
    h1: {
      fontSize: '21px',
      fontWeight: 500,
      [theme.breakpoints.up('sm')]: {
        fontSize: '36px',
      },
    },
    h2: {
      fontSize: '16px',
      fontWeight: 500,
      [theme.breakpoints.up('sm')]: {
        fontSize: '24px',
      },
    },
  },
});
