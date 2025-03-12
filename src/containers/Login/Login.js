import * as React from 'react';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import Link from '@mui/material/Link';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { authenticateUserLogin } from '../../api/UserAPI.js'


function Copyright(props) {
  return (
    <Typography variant="body2" color="text.secondary" align="center" {...props}>
      {'Copyright © '}
      <Link color="inherit" href="https://mui.com/">
        Your Website
      </Link>{' '}
      {new Date().getFullYear()}
      {'.'}
    </Typography>
  );
}


// Original Template Source: https://github.com/mui/material-ui/tree/v5.16.0/docs/data/material/getting-started/templates/sign-in
// TODO remove, this demo shouldn't need to reset the theme.

const defaultTheme = createTheme();
const Login = (props) => {

  const submitHandler = async (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);

    // Display on console log
    console.log({
      id: Number(data.get('user_id')),
      password: data.get('password'),
    });

    try {
      const response = await authenticateUserLogin(data.get('user_id'), data.get('password'));

      if (response.ok) {
        props.onLogin(data.get('user_id'));
      } 
      else {
        console.log("Invalid userId/password.");
        alert("Invalid userId/password. Please try again.");
      } 
    } 
    catch (error) {
      console.error('Error during login:', error);
      alert("An error occurred during login. Please try again later.");
    }
  };

  return (
    <ThemeProvider theme={defaultTheme}>
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
            Welcome to &#181;Learn!
          </Typography>
          <Box component="form" onSubmit={submitHandler} noValidate sx={{ mt: 1 }}>
            <TextField
              margin="normal"
              required
              fullWidth
              id="user_id"
              label="User ID"
              name="user_id"
              autoComplete="user_id"
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
            <Container>Demo Login details (Lecturer role): 230001 / tenaciousD</Container>
            <Container>Demo Login details (Student role): 230005 / racerx</Container>
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
            >
              Log In
            </Button>
            <Grid container>
              <Grid item xs>

              </Grid>
              <Grid item>

              </Grid>
            </Grid>
          </Box>
        </Box>
        <Copyright sx={{ mt: 8, mb: 4 }} />
      </Container>
    </ThemeProvider>
  );
}

export default Login;