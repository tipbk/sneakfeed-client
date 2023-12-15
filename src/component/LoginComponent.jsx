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
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { Copyright } from './CommonComponent';
import AuthService from '../services/authService';
import ConfigService from '../services/configService';
import { useState } from 'react';
import { useSnackbar } from 'notistack';
import CommonService from '../services/commonService';

export default function LoginComponent() {
  const [rememberUser, setRememberUser] = useState(false);
  const { enqueueSnackbar } = useSnackbar();
  const handleSubmit = (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    const username = data.get('username');
    const password = data.get('password');
    if (username === null || username === "") {
      enqueueSnackbar('Username cannot be empty', { variant: 'error' });
        return
    }
    if (password === null || password === "") {
      enqueueSnackbar('Password cannot be empty', { variant: 'error' });
        return
    }

    // doing some api to backends
    AuthService.login(username, password)
        .then(response => {
            ConfigService.setAccessToken(response.data.data.accessToken, !rememberUser);
            ConfigService.setRefreshToken(response.data.data.refreshToken, !rememberUser);
            enqueueSnackbar("Login successfully! Redirecting...", { variant: 'success', autoHideDuration: 1000 });
            setTimeout(() => {
              window.location.href = `/`;
            }, 1000);
        })
        .catch(error => {
          const errorMessage = error.response.data.error;
          enqueueSnackbar(CommonService.capitalizeFirstCharacter(errorMessage), { variant: 'error' });
        })
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
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            Login
          </Typography>
          <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
            <TextField
              margin="normal"
              required
              fullWidth
              id="username"
              label="Username"
              name="username"
              autoComplete="username"
              autoFocus
            />
            <TextField
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
              control={<Checkbox value={rememberUser} onChange={(e) => setRememberUser(!rememberUser)} color="primary" />}
              label="Remember me"
            />
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
            >
              Login
            </Button>
            <Grid container>
              {/* <Grid item xs>
                <Link href="#" variant="body2">
                  Forgot password?
                </Link>
              </Grid> */}
              <Grid item>
                <Link href="#" variant="body2">
                  {"Don't have an account?"}
                </Link>
              </Grid>
            </Grid>
          </Box>
        </Box>
        <Copyright sx={{ mt: 8, mb: 4 }} />
      </Container>
  );
}