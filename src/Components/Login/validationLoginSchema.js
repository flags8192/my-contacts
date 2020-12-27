import * as Yup from 'yup'

export const validationLoginSchema = Yup.object().shape({
  email: Yup.string().email('Некорректный email').required('Введите email'),
  password: Yup.string().required('Введите пароль'),
})
