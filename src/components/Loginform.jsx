// src/components/LoginForm.js

import React, { useContext } from 'react';
import { useForm } from 'react-hook-form';
// import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
// import { AuthContext } from '../contexts/AuthContext';

const schema = z.object({
  email: z.string().email(),
  password: z.string().min(6),
});

const LoginForm = () => {
  // const { login } = useContext(AuthContext);
  const { register, handleSubmit, formState: { errors } } = useForm({
    // resolver: zodResolver(schema),
  });

  const onSubmit = async (data) => {
    // await login(data.email, data.password);
    console.log(data);
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div>
        <label>Email</label>
        <input {...register('email')} />
        {errors.email && <span>{errors.email.message}</span>}
      </div>
      <div>
        <label>Password</label>
        <input type="password" {...register('password')} />
        {errors.password && <span>{errors.password.message}</span>}
      </div>
      <button type="submit">Login</button>
    </form>
  );
};

export default LoginForm;
