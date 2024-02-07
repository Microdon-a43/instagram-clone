import { type IUser } from '@/entities/User/model/types/user';
import { useForm } from 'react-hook-form';
import * as yup from 'yup';

import { yupResolver } from '@hookform/resolvers/yup';
import { useEffect } from 'react';

interface EditProfileNames {
  fullname: string;
  mobile: string;
  story: string;
  website: string;
}

export enum EditProfileConsts {
  FULLNAME = 'fullname',
  STORY = 'story',
  WEBSITE = 'website',
  MOBILE = 'mobile'
}

export const useEditProfileForm = (auth: any) => {
  const message = 'Поле не может быть пустым';
  const schema = yup.object().shape({
    fullname: yup.string().required(message).min(3, 'Минимум 3 символа'),
    mobile: yup.string().required(message),
    story: yup.string().required(message),
    website: yup.string().required(message)
  });

  const {
    register,
    watch,
    handleSubmit,
    reset,
    formState: { isValid, errors, isSubmitting }
  } = useForm<Partial<EditProfileNames>>({
    mode: 'onChange',
    resolver: yupResolver(schema),
    defaultValues: {
      fullname: '',
      mobile: '',
      story: '',
      website: ''
    }
  });

  useEffect(() => {
    if (auth) {
      reset(auth);
    }
  }, [reset]);

  return {
    register,
    watch,
    handleSubmit,
    EditProfileConsts,
    isValid,
    isSubmitting,
    errors
  };
};
