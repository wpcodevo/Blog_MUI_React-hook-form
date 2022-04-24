import { Box, Container, CssBaseline, Stack, Typography } from '@mui/material';
import { ThemeProvider } from '@mui/material/styles';
import { FormProvider, useForm } from 'react-hook-form';
import FileUpload from './components/FileUpload';
import theme from './theme';

function App() {
  const methods = useForm();
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
          <Box display='flex' flexDirection='column' sx={{ width: '30%' }}>
            {/* Single Image Upload */}
            <FormProvider {...methods}>
              <Stack marginBottom={2}>
                <Typography
                  textAlign='center'
                  variant='h4'
                  component='h1'
                  gutterBottom
                >
                  Single Image Upload
                </Typography>
                <FileUpload limit={1} multiple={false} name='imageCover' />
              </Stack>
              {/* Multiple Image Upload */}
              <Typography
                textAlign='center'
                variant='h4'
                component='h1'
                gutterBottom
              >
                Multiple Image Upload
              </Typography>
              <FileUpload limit={3} multiple name='images' />
            </FormProvider>
          </Box>
        </Box>
      </Container>
    </ThemeProvider>
  );
}

export default App;
