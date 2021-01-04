import Box from '@material-ui/core/Box';
import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';
import InputAdornment from '@material-ui/core/InputAdornment';
import Link from '@material-ui/core/Link';
import TextField from '@material-ui/core/TextField';
import { Lock, Person } from '@material-ui/icons';
import EmailIcon from '@material-ui/icons/Email';
import React from 'react';
import Copyright from '../Copyright';
import { Links } from '../Links/links';

export const Form = (properties) => {
  const {
    values: {
      firstName,
      lastName,
      email,
      password,
      confirmPassword,
    },
    errors,
    touched,
    handleSubmit,
    handleChange,
    isValid,
  } = properties;

  return (
    <form onSubmit={handleSubmit}>
      <Grid container spacing={2}>
        <Grid item xs={12} sm={6}>
          <TextField
            autoFocus
            variant="outlined"
            margin="normal"
            name="firstName"
            helperText={touched.firstName ? errors.firstName : ''}
            error={Boolean(errors.firstName)}
            label="Имя"
            fullWidth
            value={firstName}
            onChange={handleChange}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <Person />
                </InputAdornment>
              ),
            }}
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            variant="outlined"
            margin="normal"
            name="lastName"
            helperText={touched.lastName ? errors.lastName : ''}
            error={Boolean(errors.lastName)}
            label="Фамилия"
            fullWidth
            value={lastName}
            onChange={handleChange}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <Person />
                </InputAdornment>
              ),
            }}
          />
        </Grid>
        <Grid item xs={12}>
          <TextField
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
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            variant="outlined"
            margin="normal"
            name="password"
            type="password"
            helperText={touched.password ? errors.password : ''}
            error={Boolean(errors.password)}
            label="Пароль"
            fullWidth
            value={password}
            onChange={handleChange}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <Lock />
                </InputAdornment>
              ),
            }}
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            variant="outlined"
            margin="normal"
            name="confirmPassword"
            type="password"
            helperText={touched.confirmPassword ? errors.confirmPassword : ''}
            error={Boolean(errors.confirmPassword)}
            label="Повторите пароль"
            fullWidth
            value={confirmPassword}
            onChange={handleChange}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <Lock />
                </InputAdornment>
              ),
            }}
          />
        </Grid>
      </Grid>
      <Box mt={2}>
        <Button
          type="submit"
          fullWidth
          variant="contained"
          color="primary"
          disabled={!isValid}
        >
          Зарегистрироваться
        </Button>
      </Box>
      <Grid container justify="flex-end">
        <Grid item>
          <Box mt={2}>
            <Link component={Links} to="/login" variant="body2">
              Уже зарегистрированы? Войти
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
