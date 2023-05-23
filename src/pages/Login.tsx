import { useState } from 'react';
import { UserForm } from '../components';
import { RegistrationData } from '../types/FormData';

const Login = () => {
  const [formData, setFormData] = useState<RegistrationData>({
    name: '',
    email: '',
    password: '',
    avatar: 'https://i.pravatar.cc/300',
  });
  return (
    <>
      <UserForm />
    </>
  );
};

export default Login;
