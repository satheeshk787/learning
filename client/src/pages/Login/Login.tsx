import * as React from 'react';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import Link from '@mui/material/Link';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider,darken } from '@mui/material/styles';
import './Login.css';
import styled from '@emotion/styled';
import LoginRequest from './LoginRequest';
import { Navigate } from 'react-router-dom';

const WhiteTextField = styled(TextField)({
  '& label.Mui-focused': {
    color: 'white',
  },
  '& .MuiInput-underline:after': {
    borderBottomColor: 'white',
  },
  '& .MuiInputLabel-root': {
    color: 'white',
  },
  '& .MuiOutlinedInput-input': {
    color: 'white',
  },
  '& .MuiOutlinedInput-root': {
    '& fieldset': {
      borderColor: 'white',
    },
    '&:hover fieldset': {
      borderColor: 'white',
    },
    '&.Mui-focused fieldset': {
      borderColor: 'white',
    },
  },
});

const WhiteCheckbox = styled(Checkbox)({
  '&.Mui-checked': {
    color: 'white',
  },
  '&.MuiCheckbox-colorPrimary.Mui-checked': {
    '&.Mui-checked': {
      color: 'white',
    },
  },
  '&.MuiCheckbox-root': {
    color: 'white',
  },
});


const defaultTheme = createTheme();

export default function Login() {

  const handleSubmit = async(event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    const req = new LoginRequest();
  
    const email = data.get('email') as string;
    const password = data.get('password') as string;
  
    const response = await req.login({
      email,
      password,
    });

    const token = response?.data.token;
    localStorage.setItem('token', token);
    // console.log('Token saved to local storage:', token);
    window.location.assign("/")
  
  };
  
  return (
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <Box
          sx={{
            marginTop: 8,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
          }}
        >
          <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
            {/* <LockOutlinedIcon /> */}
          </Avatar>
          <Typography component="h1" variant="h5">
            Sign in
          </Typography>
          <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
            <WhiteTextField
              margin="normal"
              required
              fullWidth
              id="email"
              label="Email Address"
              name="email"
              autoComplete="email"
              autoFocus
            />
            <WhiteTextField
              margin="normal"
              required
              fullWidth
              name="password"
              label="Password"
              type="password"
              id="password"
              autoComplete="current-password"
            />
            <FormControlLabel
              control={<WhiteCheckbox value="remember" />}
              label="Remember me"
            />
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
            >
              Sign In
            </Button>
          </Box>
        </Box>

        <Typography variant="body2" align="center"  sx={{ mt: 8, mb: 4 }}>
          {'Copyright © '}
          <Link color="inherit" href="#">
            My Application
          </Link>{' '}
          {new Date().getFullYear()}
          {'.'}
      </Typography>

      </Container>
  );
}