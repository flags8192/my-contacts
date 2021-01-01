import Avatar from '@material-ui/core/Avatar'
import CssBaseline from '@material-ui/core/CssBaseline'
import Grid from '@material-ui/core/Grid'
import Paper from '@material-ui/core/Paper'
import {withStyles} from '@material-ui/core/styles'
import Typography from '@material-ui/core/Typography'
import ContactMailIcon from '@material-ui/icons/ContactMail'
import {Formik} from 'formik'
import React, {Component} from 'react'
import swal from 'sweetalert'
import {post} from '../../api/request'
import {StylesLoginRegister} from '../../Style/styleLoginRegister'
import {validationLoginSchema} from '../../ValidateForm/validationSchema'
import {version} from '../App/App'
import {Form} from './form'

class Login extends Component {
  componentDidMount() {
    if (localStorage.getItem('TOKEN_KEY') !== null) {
      return this.props.history.goBack()
    }
  }

  submitForm = async (values, history) => {
    try {
      await post('/api/auth/login', values).then((response) => {
        if (response.data.result === 'success') {
          localStorage.setItem('TOKEN_KEY', response.data.token)
          history.push('/dashboard')
        } else if (response.data.result === 'error') {
          swal('Ошибка!', response.data.message, 'error')
        }
      })
    } catch (error) {
      await swal('Ошибка!', error.message, 'error')
    }
  }

  render() {
    const {classes} = this.props
    return (
      <Grid container className={classes.root}>
        <CssBaseline/>
        <Grid item xs={false} sm={4} md={7} className={classes.image}/>
        <Grid
          item
          xs={12}
          sm={8}
          md={5}
          component={Paper}
          container
          spacing={0}
          direction='column'
          alignItems='center'
          justify='center'
          style={{minHeight: '100vh'}}
          square
        >
          <div className={classes.paper}>
            <Avatar className={classes.avatar}>
              <ContactMailIcon/>
            </Avatar>
            <Typography variant='h5'>
              {`Мои контакты (${version})`}
            </Typography>
            <Formik
              initialValues={{
                email: '',
                password: '',
              }}
              onSubmit={async (values) => {
                await this.submitForm(values, this.props.history)
              }}
              validationSchema={validationLoginSchema}
            >
              {(properties) => Form(properties)}
            </Formik>
          </div>
        </Grid>
      </Grid>
    )
  }
}

export default withStyles(StylesLoginRegister, {withTheme: true})(Login)
