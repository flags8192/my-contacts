import Button from '@material-ui/core/Button';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardHeader from '@material-ui/core/CardHeader';
import CssBaseline from '@material-ui/core/CssBaseline';
import FormGroup from '@material-ui/core/FormGroup';
import Grid from '@material-ui/core/Grid';
import { withStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import { Formik } from 'formik';
import PropTypes from 'prop-types';
import React, { Component } from 'react';
import swal from 'sweetalert';
import { post } from '../../../api/request';
import { StylesAddContact } from '../../../Style/styleAddContact';
import { validationContactSchema } from '../../../ValidateForm/validationSchema';
import Loading from '../../Loading';

class AddContact extends Component {
  constructor(properties) {
    super(properties);

    this.state = {
      loading: false,
    };
  }

  submitForm = async (formData) => {
    try {
      await post('/api/contacts/add', formData)
        .then((response) => {
          if (response.data.result === 'success') {
            swal('Успешно!', response.data.message, 'success')
              .then(() => {
                window.location = '/dashboard/contacts';
              });
          } else if (response.data.result === 'error') {
            swal('Ошибка!', response.data.message, 'error');
          }
        });
    } catch {
      await swal('Ошибка!', 'Непредвиденная ошибка', 'error');
    }
  };

  showForm = ({
    values,
    errors,
    touched,
    handleChange,
    handleSubmit,
    isSubmitting,
  }) => (
    <form noValidate onSubmit={handleSubmit}>
      <CardContent>
        <input type="hidden" name="id" value={values._id} />
        <FormGroup>
          <TextField
            variant="outlined"
            margin="normal"
            type="email"
            required
            fullWidth
            id="email"
            label="Email адрес"
            InputLabelProps={{
              shrink: true,
            }}
            name="email"
            autoComplete="email"
            autoFocus
            onChange={handleChange}
            value={values.email}
            className={
              errors.email && touched.email
                ? 'form-control is-invalid'
                : 'form-control'
            }
            error={!!(errors.email && touched.email)}
            helperText={errors.email && touched.email ? errors.email : null}
          />
          <TextField
            variant="outlined"
            margin="normal"
            id="firstName"
            label="Имя"
            type="text"
            InputLabelProps={{
              shrink: true,
            }}
            name="firstName"
            autoComplete="firstName"
            onChange={handleChange}
            value={values.firstName}
            error={!!(errors.firstName && touched.firstName)}
            helperText={
              errors.firstName && touched.firstName ? errors.firstName : null
            }
          />
          <TextField
            variant="outlined"
            margin="normal"
            id="lastName"
            label="Фамилия"
            type="text"
            InputLabelProps={{
              shrink: true,
            }}
            name="lastName"
            autoComplete="lastName"
            onChange={handleChange}
            value={values.lastName}
            error={!!(errors.lastName && touched.lastName)}
            helperText={
              errors.lastName && touched.lastName ? errors.lastName : null
            }
          />
          <TextField
            variant="outlined"
            margin="normal"
            id="phone"
            label="Телефон"
            type="text"
            InputLabelProps={{
              shrink: true,
            }}
            name="phone"
            autoComplete="phone"
            onChange={handleChange}
            value={values.phone}
            error={!!(errors.phone && touched.phone)}
            helperText={
              errors.phone && touched.phone ? errors.phone : null
            }
          />
          <TextField
            variant="outlined"
            margin="normal"
            id="address"
            label="Место работы"
            type="text"
            InputLabelProps={{
              shrink: true,
            }}
            name="address"
            autoComplete="address"
            onChange={handleChange}
            value={values.address}
            error={!!(errors.address && touched.address)}
            helperText={
              errors.address && touched.address ? errors.address : null
            }
          />
          <TextField
            variant="outlined"
            margin="normal"
            id="jobName"
            label="Должность"
            type="text"
            InputLabelProps={{
              shrink: true,
            }}
            name="jobName"
            autoComplete="jobName"
            onChange={handleChange}
            value={values.jobName}
            error={!!(errors.jobName && touched.jobName)}
            helperText={
              errors.jobName && touched.jobName ? errors.jobName : null
            }
          />
          <TextField
            variant="outlined"
            margin="normal"
            id="notes"
            label="Заметка/статус"
            type="text"
            InputLabelProps={{
              shrink: true,
            }}
            name="notes"
            autoComplete="notes"
            onChange={handleChange}
            value={values.notes}
          />
        </FormGroup>
      </CardContent>
      <CardActions>
        <Button
          variant="contained"
          color="primary"
          type="submit"
          disabled={isSubmitting}
          style={{ flexDirection: 'column' }}
        >
          Сохранить
        </Button>
      </CardActions>
    </form>
  );

  render() {
    const { classes } = this.props;
    const { loading } = this.state;

    return loading ? <Loading /> : (
      <Grid container component="main" className={classes.root}>
        <CssBaseline />
        <Grid item xs={12} lg={8} sm={12} md={6} className={classes.grid}>
          <Card className={classes.cardEdit}>
            <CardHeader
              className={classes.cardEditHeader}
              title="Добавление контакта"
            />
            <CardContent>
              <Formik
                initialValues={{
                  id: '',
                  email: '',
                  firstName: '',
                  lastName: '',
                  jobName: '',
                  notes: '',
                  phone: '',
                  address: '',
                  avatars: '',
                }}
                onSubmit={async (values, { setSubmitting }) => {
                  const { history } = this.props;
                  await this.submitForm(values, history);
                  setSubmitting(false);
                }}
                validationSchema={validationContactSchema}
              >
                {(properties) => this.showForm(properties)}
              </Formik>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    );
  }
}

AddContact.propTypes = {
  classes: PropTypes.objectOf(PropTypes.string).isRequired,
  history: PropTypes.shape({
    push: PropTypes.func.isRequired,
  }).isRequired,
};

export default withStyles(StylesAddContact, { withTheme: true })(AddContact);
