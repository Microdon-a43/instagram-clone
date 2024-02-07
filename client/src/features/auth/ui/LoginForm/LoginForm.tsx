/* eslint-disable multiline-ternary */
import {
  AppLink,
  Button,
  Form,
  HStack,
  Input,
  Spinner,
  Text,
  VStack
} from '@/shared/ui';
import styles from './LoginForm.module.scss';
import Logo from '@/shared/assets/Logo.png';
import { useContext } from 'react';
import { ThemeContext } from '@/app/provider';
import { Theme } from '@/shared/consts/theme';
import { useTranslation } from 'react-i18next';
import {
  type LoginFormValues,
  useLoginForm
} from '../../model/schema/useLoginForm';
import { useAppDispatch } from '@/shared/hooks/useAppDispatch';
import { loginByEmail } from '../../model/service/loginByEmail';
import { useSelector } from 'react-redux';
import { getAuthError } from '../../model/selectors/getAuthError';
import { getAuthLoading } from '../../model/selectors/getAuthLoading';
import { useNavigate } from 'react-router-dom';

export const LoginForm = () => {
  const { theme } = useContext(ThemeContext);
  const { t } = useTranslation('loginPage');

  const { register, watch, handleSubmit, errors, LoginFormNames, isValid } =
    useLoginForm();

  const dispatch = useAppDispatch();
  const authError = useSelector(getAuthError);
  const authLoading = useSelector(getAuthLoading);
  const navigate = useNavigate();

  const onSubmit = async (data: LoginFormValues) => {
    const res = await dispatch(loginByEmail(data));
    if (res.meta.requestStatus === 'fulfilled') {
      navigate('/');
      window.location.reload();
    }
  };

  return (
    <HStack justify="center">
      <VStack className={styles.auth} gap={12}>
        <VStack className={styles.authTop} gap={40} align="center">
          <img
            className={Theme.DARK === theme && styles.dark}
            src={Logo}
            alt=""
          />
          <Form onSubmit={handleSubmit(onSubmit)}>
            <VStack gap={16} align="center">
              <Input
                {...register(LoginFormNames.EMAIL)}
                value={watch(LoginFormNames.EMAIL)}
                error={errors?.email?.message}
                placeholder={t('Телефон, имя пользователя или эл.адрес')}
              />
              <Input
                {...register(LoginFormNames.PASSWORD)}
                value={watch(LoginFormNames.PASSWORD)}
                placeholder={t('Пароль')}
                error={errors?.password?.message}
              />
              {authError && <Text color="error">{authError}</Text>}
              <Button max disabled={!isValid && authLoading}>
                {authLoading ? (
                  <Spinner size="small" option="white" />
                ) : (
                  t('Войти')
                )}
              </Button>
              <Text as="span" size={12}>
                {t('Или')}
              </Text>
              <VStack align="center" gap={22}>
                <VStack gap={12}>
                  <Button
                    addOnLeft={
                      <svg
                        viewBox="0 0 533.5 544.3"
                        width="20px"
                        height="20px"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          d="M533.5 278.4c0-18.5-1.5-37.1-4.7-55.3H272.1v104.8h147c-6.1 33.8-25.7 63.7-54.4 82.7v68h87.7c51.5-47.4 81.1-117.4 81.1-200.2z"
                          fill="#4285f4"
                        />
                        <path
                          d="M272.1 544.3c73.4 0 135.3-24.1 180.4-65.7l-87.7-68c-24.4 16.6-55.9 26-92.6 26-71 0-131.2-47.9-152.8-112.3H28.9v70.1c46.2 91.9 140.3 149.9 243.2 149.9z"
                          fill="#34a853"
                        />
                        <path
                          d="M119.3 324.3c-11.4-33.8-11.4-70.4 0-104.2V150H28.9c-38.6 76.9-38.6 167.5 0 244.4l90.4-70.1z"
                          fill="#fbbc04"
                        />
                        <path
                          d="M272.1 107.7c38.8-.6 76.3 14 104.4 40.8l77.7-77.7C405 24.6 339.7-.8 272.1 0 169.2 0 75.1 58 28.9 150l90.4 70.1c21.5-64.5 81.8-112.4 152.8-112.4z"
                          fill="#ea4335"
                        />
                      </svg>
                    }
                    variant="outline"
                    max
                  >
                    {t('Войти через Google')}
                  </Button>
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
                  >
                    {t('Войти через Facebook')}
                  </Button>
                </VStack>
                <AppLink to="/">
                  <Text>{t('Забыли пароль?')}</Text>
                </AppLink>
              </VStack>
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
          <Text as="span"> {t('У вас еще нет аккаунта?')} </Text>
          <AppLink to="/register">
            {' '}
            <Text as="span" size={12} color="blue">
              {t('Зарегистрироваться')}
            </Text>{' '}
          </AppLink>
        </HStack>
      </VStack>
    </HStack>
  );
};
