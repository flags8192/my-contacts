import {Divider} from '@material-ui/core'
import Avatar from '@material-ui/core/Avatar'
import Button from '@material-ui/core/Button'
import Card from '@material-ui/core/Card'
import CardActions from '@material-ui/core/CardActions'
import CardContent from '@material-ui/core/CardContent'
import CardHeader from '@material-ui/core/CardHeader'
import CssBaseline from '@material-ui/core/CssBaseline'
import FormGroup from '@material-ui/core/FormGroup'
import Grid from '@material-ui/core/Grid'
import Input from '@material-ui/core/Input'
import {withStyles} from '@material-ui/core/styles'
import TextField from '@material-ui/core/TextField'
import {Formik} from 'formik'
import React, {Component} from 'react'
import swal from 'sweetalert'
import {get, put} from '../../api/request'
import userAvatarDefault from '../../Images/user.png'
import {StylesEditContact} from '../../Style/styleEditContact'
import Loading from '../Loading'
import {validationEditContactSchema} from './validationEditContactSchema'

class EditContact extends Component {
  constructor(properties) {
    super(properties)

    this.state = {
      response: {},
      error_message: null,
      loading: false,
      avatarImage: userAvatarDefault
    }
  }

  componentDidMount() {
    (async () => {
      let id = this.props.match.params.id
      await this.getData(id)
    })()
  }

  showPreviewImage = (values) => {
    return values.file_obj !== null ? values.file_obj : this.state.avatarImage
  }

  getData = async (id) => {
    try {
      this.setState({loading: true})
      await get('/api/contacts/' + id).then((response) => {
        if (response.data.avatars) {
          this.setState({
            avatarImage: 'http://localhost:5000/images/' +
              response.data._id +
              '/' +
              response.data.avatars
          })
        }
        if (!response.data.avatars) {
          this.setState({
            avatarImage: userAvatarDefault
          })
        }
        this.setState({response: response.data})
        this.setState({loading: false})
      })
    } catch (error) {
      this.setState({error_message: error.message})
      this.setState({loading: false})
    }
  }

  submitForm = async (formData) => {
    try {
      await put('/api/contacts', formData).then((response) => {
        if (response.data.result === 'success') {
          swal('Успешно!', response.data.message, 'success').then(() => {
            window.location.reload()
          })
        } else if (response.data.result === 'error') {
          swal('Ошибка!', response.data.message, 'error')
        }
      })
    } catch {
      await swal('Ошибка!', 'Непредвиденная ошибка', 'error')
    }
  }

  showForm = ({
    values,
    errors,
    touched,
    handleChange,
    handleSubmit,
    onSubmit,
    isSubmitting,
    setFieldValue,
  }) => {
    return (
      <form noValidate onSubmit={handleSubmit}>
        <Avatar
          className={this.props.classes.avatar}
          src={this.showPreviewImage(values)}
          alt=""
        />
        <CardContent>
          <FormGroup style={{textAlign: 'center', marginBottom: '10px'}}>
            <Input
              className={this.props.classes.inputUploadAvatar}
              type="file"
              onChange={(event) => {
                event.preventDefault()
                setFieldValue('avatars', event.target.files[0]) // for upload
                setFieldValue(
                  'file_obj',
                  URL.createObjectURL(event.target.files[0])
                ) // for preview image
              }}
              name="avatars"
              value=""
              inputProps={{accept: 'image/*'}}
              id="avatars"
              error={errors.avatars}
            />
            {errors.avatars ? (
              <span className={this.props.classes.errorSpan}>
                {errors.avatars}
              </span>
            ) : null}
            <label htmlFor="avatars">
              <Button
                variant="contained"
                color="primary"
                style={{marginBottom: '10px'}}
                component="span"
              >
                Загрузить фото
              </Button>
            </label>
            <Divider/>
          </FormGroup>
          <input type="hidden" name="id" value={values._id}/>
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
              // type='email'
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
              helperText={errors.phone && touched.phone ? errors.phone : null}
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
            style={{flexDirection: 'column'}}
          >
            Сохранить
          </Button>
        </CardActions>
      </form>
    )
  }

  render() {
    const {classes} = this.props
    let result = this.state.response
    let loading = this.state.loading

    return loading ? <Loading/> : (<Grid container component="main" className={classes.root}>
          <CssBaseline/>
          <Grid item xs={12} lg={8} sm={12} md={6} className={classes.grid}>
            <Card className={classes.cardEdit}>
              <CardHeader
                className={classes.cardEditHeader}
                title="Редактирование контакта"
              />
              <CardContent>
                <Formik
                  enableReinitialize={true}
                  initialValues={
                    result
                      ? result
                      : {
                        id: '',
                        email: '',
                        firstName: '',
                        lastName: '',
                        jobName: '',
                        notes: '',
                        phone: '',
                        address: '',
                        avatars: '',
                      }
                  }
                  onSubmit={async (values, {setSubmitting}) => {
                    let formData = new FormData()
                    formData.append('id', values._id)
                    formData.append('firstName', values.firstName)
                    formData.append('lastName', values.lastName)
                    formData.append('phone', values.phone)
                    formData.append('address', values.address)
                    formData.append('email', values.email)
                    formData.append('jobName', values.jobName)
                    formData.append('notes', values.notes)
                    if (values.avatars) {
                      formData.append('avatars', values.avatars)
                    }
                    await this.submitForm(formData, this.props.history)
                    setSubmitting(false)
                  }}
                  validationSchema={validationEditContactSchema}
                >
                  {(properties) => this.showForm(properties)}
                </Formik>
              </CardContent>
            </Card>
          </Grid>
        </Grid>);
  }
}

export default withStyles(StylesEditContact, {withTheme: true})(EditContact)
