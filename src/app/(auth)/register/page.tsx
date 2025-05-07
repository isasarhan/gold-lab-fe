import RegisterModule from '@/modules/auth/register';
import React, { FC } from 'react';
export interface RegisterPageProps {
  
}
const RegisterPage: FC<RegisterPageProps> = () => {
  return (
    <RegisterModule/>
  );
};

export default RegisterPage;