import axios from 'axios';
import swal from 'sweetalert';

function request(method, url, parameters, data) {
  const axiosConfig = {
    baseURL: 'http://127.0.0.1:5000/',
    method,
    url,
    headers: {
      Authorization: `Bearer ${localStorage.getItem('TOKEN_KEY')}`,
    },
  };

  if (parameters) {
    axiosConfig.params = parameters;
  }

  if (data) {
    axiosConfig.data = data;
  }

  axios.interceptors.response.use(
    (response) => response,
    (error) => {
      if (error.response.status === 401) {
        swal({
          title: 'Время сеанса истекло',
          text:
            'Время сеанса истекло. Сейчас вы будете перенаправлены на страницу входа для повторной авторизации',
          type: 'warning',
          icon: 'warning',
          buttons: {
            confirm: {
              text: 'Ok',
              className: 'sweet-warning-button',
            },
          },
          confirmButtonColor: '#000',

          closeOnClickOutside: false,
        })
          .then(() => {
            localStorage.removeItem('TOKEN_KEY');
            window.location = '/login';
          });
      }
      return Promise.reject(error);
    },
  );

  return axios(axiosConfig);
}

export function get(url) {
  return request('get', url);
}

export function post(url, data) {
  const postData = data || {};
  return request('post', url, null, postData);
}

export function put(url, data) {
  const putData = data || {};
  return request('put', url, null, putData);
}

export function remove(url) {
  return request('delete', url);
}
