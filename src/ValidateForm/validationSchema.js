import * as Yup from 'yup'

export const validationContactSchema = Yup.object().shape({
  firstName: Yup.string()
    .min(2, 'Имя слишком короткое!')
    .max(30, 'Имя слишком длинное!')
    .required('Введите имя'),
  lastName: Yup.string()
    .min(2, 'Фамилия слишком короткая!')
    .max(30, 'Фамилия слишком длинная!')
    .required('Введите фамилию'),
  phone: Yup.number('Номер должен содержать только цифры')
    .min(10, 'Минимум 10 цифр!')
    .required('Введите номер телефона'),
  address: Yup.string()
    .min(5, 'Наименование места работы слишком короткое!')
    .max(50, 'Наименование места работы слишком длинное!')
    .required('Введите наименование места работы'),
  email: Yup.string().email('Некорректный email').required('Введите email'),
})

export const validationLoginSchema = Yup.object().shape({
  email: Yup.string().email('Некорректный email').required('Введите email'),
  password: Yup.string().required('Введите пароль'),
})

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
