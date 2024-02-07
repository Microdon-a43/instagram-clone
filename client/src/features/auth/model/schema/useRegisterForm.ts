import { useForm } from 'react-hook-form';
import * as yup from 'yup';

import { yupResolver } from '@hookform/resolvers/yup';

enum RegisterFormNames {
  EMAIL = 'email',
  FULLNAME = 'fullname',
  USERNAME = 'username',
  PASSWORD = 'password',
  CF_PASSWORD = 'cf_password'
}

export interface RegisterFormValues {
  email?: string;
  fullname?: string;
  username?: string;
  password?: string;
  cf_password?: string;
}

export const useRegisterForm = () => {
  const schema = yup.object().shape({
    email: yup
      .string()
      .required('Поле не может быть пустым')
      .min(5, 'Некорректное имя пользователя или эл. адрес'),
    fullname: yup
      .string()
      .required('Поле не может быть пустым')
      .min(5, 'Некорректное имя и фамилия'),
    username: yup
      .string()
      .required('Поле не может быть пустым')
      .min(5, 'Некорректное имя пользователя'),
    password: yup
      .string()
      .required('Поле не может быть пустым')
      .min(6, 'Длина пароля не менее 6 символов'),
    cf_password: yup
      .string()
      .required('Поле не может быть пустым')
      .min(6, 'Длина пароля не менее 6 символов')
      .oneOf([yup.ref('password')], 'Пароли не совпадают')
  });

  const {
    register,
    watch,
    handleSubmit,
    formState: { errors, isValid }
  } = useForm<RegisterFormValues>({
    mode: 'onChange',
    resolver: yupResolver(schema),
    defaultValues: {
      email: '',
      fullname: '',
      username: '',
      password: '',
      cf_password: ''
    }
  });
  return {
    register,
    watch,
    handleSubmit,
    RegisterFormNames,
    errors,
    isValid
  };
};
