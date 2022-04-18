import {
  Box,
  FormControlLabel,
  FormGroup,
  FormHelperText,
  Typography,
} from '@mui/material';
import { useForm, SubmitHandler, FormProvider } from 'react-hook-form';
import { literal, object, string, TypeOf } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { useEffect, useState } from 'react';
import { LoadingButton } from '@mui/lab';
import Checkbox from '@mui/material/Checkbox';
import FormInput from '../components/FormInput';

const registerSchema = object({
  name: string()
    .nonempty('Name is required')
    .max(32, 'Name must be less than 100 characters'),
  email: string().nonempty('Email is required').email('Email is invalid'),
  password: string()
    .nonempty('Password is required')
    .min(8, 'Password must be more than 8 characters')
    .max(32, 'Password must be less than 32 characters'),
  passwordConfirm: string().nonempty('Please confirm your password'),
  terms: literal(true, {
    invalid_type_error: 'Accept Terms is required',
  }),
}).refine((data) => data.password === data.passwordConfirm, {
  path: ['passwordConfirm'],
  message: 'Passwords do not match',
});

type RegisterInput = TypeOf<typeof registerSchema>;

const RegisterPage2 = () => {
  const [loading, setLoading] = useState(false);

  const methods = useForm<RegisterInput>({
    resolver: zodResolver(registerSchema),
  });

  const {
    reset,
    handleSubmit,
    register,
    formState: { isSubmitSuccessful, errors },
  } = methods;

  useEffect(() => {
    if (isSubmitSuccessful) {
      reset();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isSubmitSuccessful]);

  const onSubmitHandler: SubmitHandler<RegisterInput> = (values) => {
    console.log(values);
  };
  console.log(errors);

  return (
    <Box sx={{ maxWidth: '30rem' }}>
      <Typography variant='h4' component='h1' sx={{ mb: '2rem' }}>
        Register
      </Typography>
      <FormProvider {...methods}>
        <Box
          component='form'
          noValidate
          autoComplete='off'
          onSubmit={handleSubmit(onSubmitHandler)}
        >
          <FormInput
            name='name'
            required
            fullWidth
            label='Name'
            sx={{ mb: 2 }}
          />

          <FormInput
            name='email'
            required
            fullWidth
            label='Email Address'
            type='email'
            sx={{ mb: 2 }}
          />
          <FormInput
            name='password'
            required
            fullWidth
            label='Password'
            type='password'
            sx={{ mb: 2 }}
          />
          <FormInput
            name='passwordConfirm'
            required
            fullWidth
            label='Confirm Password'
            type='password'
            sx={{ mb: 2 }}
          />
          <FormGroup>
            <FormControlLabel
              control={<Checkbox required />}
              {...register('terms')}
              label={
                <Typography color={errors['terms'] ? 'error' : 'inherit'}>
                  Accept Terms and Conditions
                </Typography>
              }
            />
            <FormHelperText error={!!errors['terms']}>
              {errors['terms'] ? errors['terms'].message : ''}
            </FormHelperText>
          </FormGroup>

          <LoadingButton
            variant='contained'
            fullWidth
            type='submit'
            loading={loading}
            sx={{ py: '0.8rem', mt: '1rem' }}
          >
            Register
          </LoadingButton>
        </Box>
      </FormProvider>
    </Box>
  );
};

export default RegisterPage2;
