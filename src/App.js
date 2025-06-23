import React from 'react';
import Wordle from './wordle';
import { createTheme, ThemeProvider, CssBaseline } from '@mui/material';

const theme = createTheme({
  palette: {
    mode: 'dark',
    primary: { main: '#6aaa64' },
    secondary: { main: '#c9b458' },
    background: {
      default: '#121213',
      paper: '#1e1f23',
    },
  },
  typography: {
    fontFamily: 'Arial, sans-serif',
  },
});

function App() {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Wordle />
    </ThemeProvider>
  );
}

export default App;