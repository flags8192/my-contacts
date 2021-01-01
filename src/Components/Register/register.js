import Avatar from '@material-ui/core/Avatar'
import CssBaseline from '@material-ui/core/CssBaseline'
import Grid from '@material-ui/core/Grid'
import Paper from '@material-ui/core/Paper'
import {withStyles} from '@material-ui/core/styles'
import Typography from '@material-ui/core/Typography'
import MonetizationOnIcon from '@material-ui/icons/MonetizationOn'
import {Formik} from 'formik'
import React, {Component} from 'react'
import swal from 'sweetalert'
import {post} from '../../api/request'
import {StylesLoginRegister} from '../../Style/styleLoginRegister'
import {validationRegisterSchema} from '../../ValidateForm/validationSchema'
import {version} from '../App/App'
import {Form} from './form'

class Register extends Component {
  submitForm = async (values, history) => {
    try {
      await post('/api/auth/register', values).then((response) => {
        if (response.data.result === 'success') {
          swal('Успешно!', response.data.message, 'success').then(() => {
            history.push('/login')
          })
        } else if (response.data.result === 'error') {
          ;(async () => {
            await swal('Ошибка!', response.data.message, 'error')
          })()
        }
      })
    } catch (error) {
      await swal('Ошибка!', error.message, 'error')
    }
  }

  render() {
    const {classes} = this.props
    return (
      <Grid container component='main' className={classes.root}>
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
              <MonetizationOnIcon/>
            </Avatar>
            <Typography variant='h5'>
              {`Мои контакты (${version})`}
            </Typography>
            <Formik
              initialValues={{
                firstName: '',
                lastName: '',
                email: '',
                password: '',
                confirm_password: '',
              }}
              onSubmit={async (values) => {
                await this.submitForm(values, this.props.history)
              }}
              validationSchema={validationRegisterSchema}
            >
              {(properties) => Form(properties)}
            </Formik>
          </div>
        </Grid>
      </Grid>
    )
  }
}

export default withStyles(StylesLoginRegister, {withTheme: true})(Register)
