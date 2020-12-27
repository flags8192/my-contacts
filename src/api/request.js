import axios from 'axios'
import swal from 'sweetalert'

function request(method, url, parameters, data) {
  let axios_config = {
    baseURL: 'http://localhost:5000/',
    method,
    url,
    headers: {
      Authorization: 'Bearer ' + localStorage.getItem('TOKEN_KEY'),
    },
  }

  if (parameters) {
    axios_config.params = parameters
  }

  if (data) {
    // `data` allows changes to the request data before it is sent to the server
    // This is only applicable for request methods 'PUT', 'POST', and 'PATCH'
    axios_config.data = data
  }

  // intercept responses before they are handled by then or catch
  axios.interceptors.response.use(
    (response) => {
      // console.log('api request.js response: ', response)
      return response
    },
    (error) => {
      if (error.response.status === 401) {
        swal({
          title: 'Время сеанса истекло',
          text:
            'Время сеанса истекло. Сейчас вы будете перенаправлены на страницу входа для повторной авторизации',
          type: 'warning',
          icon: 'warning',
          buttons: {
            confirm: {text: 'Ok', className: 'sweet-warning-button'},
          },
          confirmButtonColor: '#000',

          closeOnClickOutside: false,
        }).then(() => {
          localStorage.removeItem('TOKEN_KEY')
          window.location = '/login'
        })
      }
      // console.log('Error', error.response.status)
      return Promise.reject(error)
    }
  )

  return axios(axios_config)
}

export function get(url) {
  return request('get', url)
}

export function post(url, data) {
  data = data || {}
  return request('post', url, null, data)
}

export function put(url, data) {
  data = data || {}
  return request('put', url, null, data)
}

export function remove(url) {
  return request('delete', url)
}
