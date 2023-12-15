import * as React from 'react';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Link from '@mui/material/Link';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import AuthService from '../services/authService';
import { Copyright } from './CommonComponent';
import { useState } from 'react';
import { useSnackbar } from 'notistack';
import { useNavigate } from "react-router-dom";
import CommonService from '../services/commonService';


export default function RegisterComponent() {
  const navigate = useNavigate();

  const [usernameHelperText, setUsernameHelperText] = useState("");
  const [usernameTextError, setUsernameTextError] = useState(false);
  const [emailHelperText, setEmailHelperText] = useState("");
  const [emailTextError, setEmailTextError] = useState(false);
  const [passwordHelperText, setPasswordHelperText] = useState("");
  const [passwordTextError, setPasswordTextError] = useState("");
  const { enqueueSnackbar } = useSnackbar();

  const loginButton = () => (
    <Button style={{color:'#2f44ff'}} onClick={() => {navigate("/login")}}>
      Login
    </Button>
  );

  const handleSubmit = (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    const username = data.get('username');
    const email = data.get('email');
    const password = data.get('password');
    if (username === null || username === "" || usernameTextError) {
        enqueueSnackbar('Invalid Username', { variant: 'error' });
        return
    }
    if (email === null || email === "" || emailTextError) {
        enqueueSnackbar('Invalid Email', { variant: 'error' });
        return
    }
    if (password === null || password === "" || passwordTextError) {
        enqueueSnackbar('Invalid Password', { variant: 'error' });
        return
    }

    // doing some api to backends
    AuthService.register(username, password, email)
    .then(response => {
      enqueueSnackbar('Congratulation! Register successfully!', { variant: 'success', action: loginButton });
    })
    .catch(error => {
      const errorText = CommonService.capitalizeFirstCharacter(error.response.data.error);
      enqueueSnackbar(errorText, { variant: 'error' });
    })
  };

  const validateEmail = (input) => {
    const emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
    if (!input.match(emailRegex)) {
      setEmailHelperText("Email address is not valid.");
      setEmailTextError(true);
      return;
    }
    setEmailHelperText("");
    setEmailTextError(false);
  }

  const validatePassword = (input) => {
    const passwordRegex = /^[a-zA-Z0-9!@#$%^&*]{6,16}$/;
    if (!input.match(passwordRegex)) {
      setPasswordHelperText("Password must be 6-16 characters which can contains a-z, A-Z, 0-9, special character [!,@,#,$,%,^,&,*] only.");
      setPasswordTextError(true);
      return;
    }
    setPasswordHelperText("");
    setPasswordTextError(false);
  }

  const validateUsername = (input) => {
    if (!input.match(/^[0-9a-z]{5,15}$/)) {
        setUsernameHelperText("Username must be 5-15 characters which can contains a-z or 0-9 only.");
        setUsernameTextError(true);
        return;
    }

    setUsernameHelperText("");
    setUsernameTextError(false);
  }

  return (
      <Container component="main" maxWidth="xs">
        <Box
          sx={{
            marginTop: 8,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
          }}
        >
          <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            Register
          </Typography>
          <Box component="form" noValidate onSubmit={handleSubmit} sx={{ mt: 3 }}>
            <Grid container spacing={2}>
            <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  id="username"
                  label="Username"
                  name="username"
                  helperText={usernameHelperText}
                  error={usernameTextError}
                  onChange={(e) => {validateUsername(e.target.value)}}
                  autoFocus
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  id="email"
                  label="Email Address"
                  name="email"
                  autoComplete="email"
                  helperText={emailHelperText}
                  error={emailTextError}
                  onChange={(e) => {validateEmail(e.target.value)}}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  name="password"
                  label="Password"
                  type="password"
                  id="password"
                  autoComplete="new-password"
                  helperText={passwordHelperText}
                  error={passwordTextError}
                  onChange={(e) => {validatePassword(e.target.value)}}
                />
              </Grid>
            </Grid>
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
            >
              Register
            </Button>
            <Grid container justifyContent="flex-end">
              <Grid item>
                <Link href="#" variant="body2">
                  Already have an account? Login
                </Link>
              </Grid>
            </Grid>
          </Box>
        </Box>
        <Copyright sx={{ mt: 5 }} />
      </Container>
  );
}