import { CssBaseline, ThemeProvider, createTheme } from '@mui/material';
import EmployeesPage from './components/pages/EmployeesPage';

const theme = createTheme({
  palette: {
    mode: 'light',
    primary: {
      main: '#1976d2',
    },
    secondary: {
      main: '#dc004e',
    },
  },
});

function App() {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <EmployeesPage />
    </ThemeProvider>
  );
}

export default App;
