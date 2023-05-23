import { useState } from 'react';
import { RegistrationData } from '../types/FormData';
import { CurrentLocation, UserForm } from '../components';

const Register = () => {
  const [formData, setFormData] = useState<RegistrationData>({
    name: '',
    email: '',
    password: '',
    avatar: 'https://i.pravatar.cc/300',
  });
  return (
    <>
      <CurrentLocation name="Register" singleProduct={false} />
      <UserForm />
    </>
  );
};
export default Register;
