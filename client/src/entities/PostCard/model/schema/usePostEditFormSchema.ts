import { useForm } from 'react-hook-form';
import * as yup from 'yup';

import { yupResolver } from '@hookform/resolvers/yup';
import { type IPost } from '../types/post';
import { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { getAuthData } from '@/entities/User';
import { type MediaUpload } from '@/shared/lib/uploadMedia';

export enum EditPostFormNames {
  CONTENT = 'content',
  MEDIA = 'media'
}

export interface EditPostFromValues {
  content?: string;
}

export const usePostEditFormSchema = (post: IPost) => {
  const schema = yup.object().shape({
    content: yup
      .string()
      .required('Поле не может быть пустым')
      .min(30, 'Минимум 30 символов')
      .max(200, 'Максимум 200 символов'),
    media: yup.array().of(
      yup.object().shape({
        public_id: yup.string().required(),
        url: yup.string().required()
      })
    )
  });

  const {
    register,
    watch,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting, isLoading, isValid }
  } = useForm({
    mode: 'onChange',
    resolver: yupResolver(schema),
    defaultValues: {
      content: '',
      media: [
        {
          public_id: '',
          url: ''
        }
      ]
    }
  });
  useEffect(() => {
    if (post) {
      reset(post);
    }
  }, [reset]);

  return {
    register,
    watch,
    handleSubmit,
    reset,
    EditPostFormNames,
    isValid,
    errors,
    isSubmitting,
    isLoading
  };
};
