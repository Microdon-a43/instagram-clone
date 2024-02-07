import { useForm } from 'react-hook-form';
import * as yup from 'yup';

import { yupResolver } from '@hookform/resolvers/yup';

export enum PostCommentNames {
  CONTENT = 'content'
}

interface PostCommentValues {
  content: string;
}

export const usePostCommentSchema = () => {
  const schema = yup.object().shape({
    content: yup
      .string()
      .required('Поле комментария обязательно для заполнения!')
      .min(5, 'Минимальное количество - 5 символов')
      .max(200, 'Минимальное количество - 200 символов')
  });

  const {
    register,
    watch,
    handleSubmit,
    formState: { errors, isValid }
  } = useForm<Partial<PostCommentValues>>({
    mode: 'onChange',
    resolver: yupResolver(schema),
    defaultValues: {
      content: ''
    }
  });

  return {
    register,
    watch,
    handleSubmit,
    PostCommentNames,
    errors,
    isValid
  };
};
