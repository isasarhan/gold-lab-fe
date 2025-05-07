import LoginModule from '@/modules/auth/login';
import React, { FC } from 'react';
export interface LoginPageProps {

}
const LoginPage: FC<LoginPageProps> = () => {
  return (
      <LoginModule />
  );
};

export default LoginPage;