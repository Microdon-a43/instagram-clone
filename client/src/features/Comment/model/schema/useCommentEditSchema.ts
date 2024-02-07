import { useForm } from 'react-hook-form';
import * as yup from 'yup';
import { useEffect } from 'react';

import { yupResolver } from '@hookform/resolvers/yup';
import { type IComment } from '@/entities/PostCard';

export enum EditCommentNames {
  CONTENT = 'content'
}

export interface EditCommentValues {
  content: string;
}
interface EditCommentProps {
  comment: IComment;
}

export const useCommentEditSchema = ({ comment }: EditCommentProps) => {
  const schema = yup.object().shape({
    content: yup
      .string()
      .required('Поле не может быть пустым')
      .min(5, 'Минимальное количество - 5 символов')
      .max(200, 'Минимальное количество - 200 символов')
  });

  const {
    register,
    watch,
    reset,
    handleSubmit,
    formState: { errors, isValid, isSubmitting, defaultValues }
  } = useForm<Partial<EditCommentValues>>({
    mode: 'onChange',
    resolver: yupResolver(schema),
    defaultValues: {
      content: ''
    }
  });

  useEffect(() => {
    if (comment) {
      reset(comment);
    }
  }, [comment]);

  return {
    register,
    watch,
    handleSubmit,
    reset,
    EditCommentNames,
    defaultValues,
    errors,
    isValid
  };
};
