import { red } from '@mui/material/colors';
import { createTheme } from '@mui/material/styles';

const theme = createTheme({
  palette: {
    background: {
      primary: '#FCF8E8',
      secondary: '#FBA92C',
    },
    text: {
      primary: '#141414',
      secondary: '#565656',
      error: red.A400,
    },
  },
  typography: {
    h1: {
      fontSize: '1.7rem',
      fontWeight: 500,
      '@media (min-width:600px)': {
        fontSize: '2.5rem',
      },
    },
  },
});

export default theme;
