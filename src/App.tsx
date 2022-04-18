import { Box, Container, CssBaseline } from '@mui/material';
import { ThemeProvider } from '@mui/material/styles';
import theme from './theme';
import TestPage from './components/test';

function App() {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Container maxWidth={false}>
        <Box
          display='flex'
          sx={{
            justifyContent: 'center',
            alignItems: 'center',
            height: '100vh',
          }}
        >
          <TestPage />
        </Box>
      </Container>
    </ThemeProvider>
  );
}

export default App;
