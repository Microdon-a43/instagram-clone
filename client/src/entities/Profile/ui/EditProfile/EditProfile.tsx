import { type IUser } from '@/entities/User/model/types/user';
import { useAppDispatch } from '@/shared/hooks/useAppDispatch';
import { Avatar, Form, Input, Text, VStack } from '@/shared/ui';
import { Button } from 'antd';
import { type ChangeEvent, useState, type FC } from 'react';
import { useSelector } from 'react-redux';
import { useEditProfileForm } from '../../model/schema/useEditProfileForm';
import { getProfileUpdateError } from '../../model/selectors/getProfileUpdateError';
import { getProfileUpdateSuccess } from '../../model/selectors/getProfileUpdateSuccess';
import { updateProfile } from '../../model/service/updateProfile';
import styles from './EditProfile.module.scss';

interface EditProfileProps {
  auth: IUser;
  onClose: () => void;
}

export const EditProfile: FC<EditProfileProps> = ({ auth, onClose }) => {
  const {
    register,
    watch,
    handleSubmit,
    errors,
    isValid,
    EditProfileConsts,
    isSubmitting
  } = useEditProfileForm(auth);

  const [avatar, setAvatar] = useState(null);

  const dispatch = useAppDispatch();
  const successMessage = useSelector(getProfileUpdateSuccess);
  const errorMessage = useSelector(getProfileUpdateError);

  const onChangeAvatar = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files[0];
    if (file) {
      setAvatar(file);
    }
  };

  const onRemoveAvatar = () => {
    setAvatar(null);
  };

  const onSubmit = async (data: IUser) => {
    if (!isValid) return;
    await dispatch(updateProfile({ user: data, avatar }));

    setAvatar(null);
  };

  return (
    <VStack gap={40}>
      <VStack className={styles.editProfile} align="center" gap={12}>
        <label htmlFor="avatarFile" className={styles.avatar}>
          <Avatar
            src={avatar ? URL.createObjectURL(avatar) : auth?.avatar}
            size={150}
          />
          <input type="file" id="avatarFile" onChange={onChangeAvatar} />
        </label>
        {avatar && <Button onClick={onRemoveAvatar}>Удалить</Button>}
      </VStack>
      <Form onSubmit={handleSubmit(onSubmit)}>
        <VStack gap={18}>
          <Input
            placeholder={EditProfileConsts.FULLNAME}
            {...register(EditProfileConsts.FULLNAME)}
            value={watch(EditProfileConsts.FULLNAME)}
            error={errors?.fullname?.message}
          />
          <Input
            placeholder={EditProfileConsts.MOBILE}
            {...register(EditProfileConsts.MOBILE)}
            value={watch(EditProfileConsts.MOBILE)}
            error={errors?.mobile?.message}
          />
          <Input
            placeholder={EditProfileConsts.STORY}
            {...register(EditProfileConsts.STORY)}
            value={watch(EditProfileConsts.STORY)}
            error={errors?.story?.message}
          />
          <Input
            placeholder={EditProfileConsts.WEBSITE}
            {...register(EditProfileConsts.WEBSITE)}
            value={watch(EditProfileConsts.WEBSITE)}
            error={errors?.website?.message}
          />
          <Button
            htmlType="submit"
            block
            loading={isSubmitting}
            type="primary"
            disabled={!isValid}
          >
            Сохранить
          </Button>
          {successMessage && (
            <Text as="span" color="blue">
              {successMessage}
            </Text>
          )}
          {errorMessage && (
            <Text as="span" color="error">
              {errorMessage}
            </Text>
          )}
        </VStack>
      </Form>
    </VStack>
  );
};
