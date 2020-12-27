import * as Yup from 'yup'

export const validationRegisterSchema = Yup.object().shape({
  firstName: Yup.string()
    .min(3, 'Не менее 3 символов!')
    .max(50, 'Не больше 50 символов!')
    .required('Введите имя'),
  lastName: Yup.string()
    .min(3, 'Не менее 3 символов!')
    .max(50, 'Не больше 50 символов!')
    .required('Введите фамилию'),
  email: Yup.string().email('Некорректный email').required('Введите email'),
  password: Yup.string().required('Введите пароль'),
  confirm_password: Yup.string()
    .required('Введите пароль')
    .oneOf([Yup.ref('password'), null], 'Оба пароля должны совпадать'),
})
