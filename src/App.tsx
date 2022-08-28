import {
  Box,
  Button,
  Container,
  CssBaseline,
  Stack,
  Typography,
} from '@mui/material';
import { ThemeProvider } from '@mui/material/styles';
import { FormProvider, SubmitHandler, useForm } from 'react-hook-form';
import { array, object, TypeOf, z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import FileUpload from './components/FileUpload';
import theme from './theme';
import {
  useUploadImageMutation,
  useUploadMultipleImageMutation,
  useUploadSingleImageMutation,
} from './redux/uploadAPI';

const imageUploadSchema = object({
  image: z.instanceof(File),
  images: array(z.instanceof(File)),
});

type IUploadImage = TypeOf<typeof imageUploadSchema>;

function App() {
  const [uploadImage] = useUploadMultipleImageMutation();

  const methods = useForm<IUploadImage>({
    resolver: zodResolver(imageUploadSchema),
  });

  // console.log(methods.formState.errors);

  const onSubmitHandler: SubmitHandler<IUploadImage> = (values) => {
    const formData = new FormData();
    formData.append('image', values.image);

    if (values.images.length > 0) {
      values.images.forEach((el) => formData.append('images', el));
    }

    console.log(values);

    // Call the Upload API
    uploadImage(formData);
  };

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
              <Box
                component='form'
                noValidate
                autoComplete='off'
                onSubmit={methods.handleSubmit(onSubmitHandler)}
              >
                <Stack marginBottom={2}>
                  <Typography
                    textAlign='center'
                    variant='h4'
                    component='h1'
                    gutterBottom
                  >
                    Single Image Upload
                  </Typography>
                  <FileUpload limit={1} multiple={false} name='image' />
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
                <Button
                  variant='contained'
                  type='submit'
                  fullWidth
                  sx={{ py: '0.8rem', my: 2 }}
                >
                  Submit Images
                </Button>
              </Box>
            </FormProvider>
          </Box>
        </Box>
      </Container>
    </ThemeProvider>
  );
}

export default App;
