import * as Yup from 'yup'

const FILE_SIZE = 2048 * 1024
const SUPPORTED_FORMATS = new Set(['image/jpg', 'image/jpeg', 'image/gif', 'image/png'])

export const validationProfileSchema = Yup.object().shape({
  avatar: Yup.mixed()
    .test(
      'fileSize',
      'File is too large',
      (value) => !value || (value && value.size <= FILE_SIZE)
    )
    .test(
      'fileFormat',
      'Unsupported Format',
      (value) =>
        !value || ((value) => value && SUPPORTED_FORMATS.has(value.type))
    ),
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
    .min(12, 'Наименование места работы слишком короткое!')
    .max(50, 'Наименование места работы слишком длинное!')
    .required('Введите наименование места работы'),
  email: Yup.string().email('Некорректный email').required('Введите email'),
})
