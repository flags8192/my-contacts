import Box from '@material-ui/core/Box';
import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';
import InputAdornment from '@material-ui/core/InputAdornment';
import Link from '@material-ui/core/Link';
import TextField from '@material-ui/core/TextField';
import EmailIcon from '@material-ui/icons/Email';
import LockIcon from '@material-ui/icons/Lock';
import React from 'react';
import Copyright from '../Copyright';
import { Links } from '../Links/links';

export const Form = (properties) => {
  const {
    values: {
      email,
      password,
    },
    errors,
    touched,
    handleSubmit,
    handleChange,
    isValid,
  } = properties;

  return (
    <form onSubmit={handleSubmit}>
      <TextField
        autoFocus
        variant="outlined"
        margin="normal"
        name="email"
        helperText={touched.email ? errors.email : ''}
        error={Boolean(errors.email)}
        label="Email адрес"
        fullWidth
        value={email}
        onChange={handleChange}
        InputProps={{
          startAdornment: (
            <InputAdornment position="start">
              <EmailIcon />
            </InputAdornment>
          ),
        }}
      />
      <TextField
        variant="outlined"
        margin="normal"
        name="password"
        helperText={touched.password ? errors.password : ''}
        error={Boolean(errors.password)}
        label="Пароль"
        fullWidth
        type="password"
        value={password}
        onChange={handleChange}
        InputProps={{
          startAdornment: (
            <InputAdornment position="start">
              <LockIcon />
            </InputAdornment>
          ),
        }}
      />
      <Box mt={2}>
        <Button
          type="submit"
          fullWidth
          variant="contained"
          color="primary"
          disabled={!isValid}
        >
          Вход
        </Button>
      </Box>
      <Grid container>
        <Grid item xs>
          <Box mt={2}>
            <Link component={Links} to="/password/forgot" variant="body2">
              Забыли пароль ?
            </Link>
          </Box>
        </Grid>
        <Grid item>
          <Box mt={2}>
            <Link component={Links} to="/register" variant="body2">
              Зарегистрироваться
            </Link>
          </Box>
        </Grid>
      </Grid>
      <Box mt={5}>
        <Copyright />
      </Box>
    </form>
  );
};
