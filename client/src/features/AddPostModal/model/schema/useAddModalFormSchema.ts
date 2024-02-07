import { useForm } from 'react-hook-form';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';

export enum AddModalFormNames {
  CONTENT = 'content'
}

export interface AddModalFormValues {
  content?: string;
}

export const useAddModalFormSchema = () => {
  const schema = yup.object().shape({
    content: yup
      .string()
      .required('Поле не может быть пустым')
      .min(30, 'Минимум 30 символов')
      .max(200, 'Максимальное количество символов 200')
  });

  const {
    register,
    watch,
    reset,
    handleSubmit,
    formState: { isValid, errors, isSubmitting }
  } = useForm<Partial<AddModalFormValues>>({
    mode: 'onChange',
    resolver: yupResolver(schema),
    defaultValues: {
      content: ''
    }
  });

  return {
    AddModalFormNames,
    register,
    watch,
    reset,
    handleSubmit,
    isValid,
    errors,
    isSubmitting
  };
};
