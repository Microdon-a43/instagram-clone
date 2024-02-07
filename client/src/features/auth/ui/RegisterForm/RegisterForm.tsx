import { ThemeContext } from '@/app/provider';
import Logo from '@/shared/assets/Logo.png';
import { Theme } from '@/shared/consts/theme';
import { useAppDispatch } from '@/shared/hooks/useAppDispatch';
import {
  AppLink,
  Button,
  Form,
  HStack,
  Input,
  Text,
  VStack
} from '@/shared/ui';
import { useContext } from 'react';
import {
  useRegisterForm,
  type RegisterFormValues
} from '../../model/schema/useRegisterForm';
import { registerByEmail } from '../../model/service/registerByEmail';
import styles from '../LoginForm/LoginForm.module.scss';
import { useSelector } from 'react-redux';
import { getAuthError } from '../../model/selectors/getAuthError';
import { useNavigate } from 'react-router-dom';
import { getAuthLoading } from '../../model/selectors/getAuthLoading';

export const RegisterForm = () => {
  const { theme } = useContext(ThemeContext);
  const { register, watch, handleSubmit, errors, RegisterFormNames, isValid } =
    useRegisterForm();

  const dispatch = useAppDispatch();
  const authError = useSelector(getAuthError);
  const authLoading = useSelector(getAuthLoading);

  const navigate = useNavigate();

  const onSubmit = async (data: RegisterFormValues) => {
    delete data.cf_password;
    const res = await dispatch(registerByEmail(data));

    if (res.meta.requestStatus === 'fulfilled') {
      navigate('/login');
    }
  };

  return (
    <HStack justify="center">
      <VStack className={styles.auth} gap={12}>
        <VStack className={styles.authTop} gap={12} align="center">
          <VStack align="center" justify="center">
            <img
              className={Theme.DARK === theme && styles.dark}
              src={Logo}
              alt=""
            />
            <Text as="p" align="center">
              Зарегистрируйтесь, чтобы смотреть фото и видео ваших друзей
            </Text>
          </VStack>
          <Form onSubmit={handleSubmit(onSubmit)}>
            <VStack>
              <Button
                addOnLeft={
                  <svg
                    enableBackground="new 0 0 32 32"
                    height="20px"
                    id="Layer_1"
                    version="1.0"
                    viewBox="0 0 32 32"
                    width="20px"
                    xmlSpace="preserve"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <g>
                      <path
                        d="M32,30c0,1.104-0.896,2-2,2H2c-1.104,0-2-0.896-2-2V2c0-1.104,0.896-2,2-2h28c1.104,0,2,0.896,2,2V30z"
                        fill="#3B5998"
                      />
                      <path
                        d="M22,32V20h4l1-5h-5v-2c0-2,1.002-3,3-3h2V5c-1,0-2.24,0-4,0c-3.675,0-6,2.881-6,7v3h-4v5h4v12H22z"
                        fill="#FFFFFF"
                        id="f"
                      />
                    </g>
                    <g />
                    <g />
                    <g />
                    <g />
                    <g />
                    <g />
                  </svg>
                }
                variant="outline"
                max
                className={styles.facebook}
              >
                Войти через Facebook
              </Button>
            </VStack>
            <VStack gap={16} align="center">
              <Text as="span">Или</Text>
              <Input
                {...register(RegisterFormNames.EMAIL)}
                value={watch(RegisterFormNames.EMAIL)}
                error={errors?.email?.message}
                placeholder="Телефон или эл.адрес"
              />
              <Input
                {...register(RegisterFormNames.FULLNAME)}
                value={watch(RegisterFormNames.FULLNAME)}
                error={errors?.fullname?.message}
                placeholder="Имя и фамилия"
              />
              <Input
                {...register(RegisterFormNames.USERNAME)}
                value={watch(RegisterFormNames.USERNAME)}
                error={errors?.username?.message}
                placeholder="Имя пользователя"
              />
              <Input
                {...register(RegisterFormNames.PASSWORD)}
                value={watch(RegisterFormNames.PASSWORD)}
                error={errors?.password?.message}
                placeholder="Пароль"
              />
              <Input
                {...register(RegisterFormNames.CF_PASSWORD)}
                value={watch(RegisterFormNames.CF_PASSWORD)}
                error={errors?.cf_password?.message}
                placeholder="Повторите пароль"
              />
              {authError && (
                <Text color="error" align="center">
                  {authError}
                </Text>
              )}
              <Text as="p" align="center">
                Регистрируясь, Вы принимаете Условия. Прочитайте Политику
                конфиденциальности, чтобы узнать, как мы получаем, используем и
                передаем Ваши данные. Также посмотрите Политику в отношении
                файлов cookie, чтобы узнать, как мы используем файлы cookie и
                подобные технологии
              </Text>
              <Button
                type="submit"
                max
                disabled={!isValid && authLoading}
                loading={authLoading}
              >
                Зарегистрироваться
              </Button>
            </VStack>
          </Form>
        </VStack>
        <HStack
          max
          className={styles.authBottom}
          align="center"
          justify="center"
          gap={8}
        >
          <Text as="span"> Есть аккаунт? </Text>
          <AppLink to="/login">
            {' '}
            <Text as="span" size={12} color="blue">
              Войти
            </Text>{' '}
          </AppLink>
        </HStack>
      </VStack>
    </HStack>
  );
};
