import { useForm } from 'react-hook-form';
import * as yup from 'yup';

import { yupResolver } from '@hookform/resolvers/yup';

enum LoginFormNames {
  EMAIL = 'email',
  PASSWORD = 'password'
}

export interface LoginFormValues {
  email?: string;
  password?: string;
}

export const useLoginForm = () => {
  const schema = yup.object().shape({
    email: yup
      .string()
      .required('Поле не может быть пустым')
      .min(5, 'Некорректное имя пользователя или эл. адрес'),
    password: yup
      .string()
      .required('Поле не может быть пустым')
      .min(6, 'Длина пароля не менее 6 символов')
  });

  const {
    register,
    watch,
    handleSubmit,
    formState: { errors, isValid }
  } = useForm<LoginFormValues>({
    mode: 'onChange',
    resolver: yupResolver(schema),
    defaultValues: {
      email: '',
      password: ''
    }
  });
  return {
    register,
    watch,
    handleSubmit,
    LoginFormNames,
    errors,
    isValid
  };
};
