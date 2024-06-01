// src/components/RegisterForm.js

import React, { useContext } from "react";
import { useForm } from "react-hook-form";
// import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import axios from "axios";
// import { useHistory } from 'react-router-dom';
// import { AuthContext } from "../contexts/AuthContext";
import { MdTextFields } from "react-icons/md";
import { MdEmail, MdLock } from "react-icons/md";
import { Button, Input } from "@nextui-org/react";
import { Link } from "react-router-dom";

const schema = z.object({
  name: z.string().min(2),
  email: z.string().email(),
  password: z.string().min(6),
});

const RegisterForm = () => {
  // const { login } = useContext(AuthContext);
  // const history = useHistory();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    // resolver: zodResolver(schema),
  });

  const onSubmit = async (data) => {
    console.log(data);
    try {
      // await axios.post('http://127.0.0.1:8000/api/register', data);
      // await login(data.email, data.password);
      // history.push('/');
    } catch (error) {
      console.error("Registration error", error);
    }
  };

  return (
    <div className={`flex flex-col justify-center px-6 py-12 lg:px-8  `}>
      <h2 className=" px-6 py-8 text-center text-2xl font-bold tracking-tight text-gray-900">
        Register a new account
        <p>Already have an account <Link to='/login' className=" underline underline-offset-4"> login here</Link></p>
      </h2>

      <div className=" mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="mt-10 space-y-8 flex flex-col gap-3 px-4 py-6 items-center  "
        >
          <Input
            isClearable
            label="Name"
            variant="flat"
            {...register("name")}
            startContent={
              <MdTextFields className=" pointer-events-none flex-shrink-0 text-2xl" />
            }
            type="email"
            className=" max-w-md"
          />{" "}
          {errors.name && <span>{errors.email.message}</span>}
          <Input
            isClearable
            label="Email"
            variant="flat"
            {...register("email")}
            startContent={
              <MdEmail className=" pointer-events-none flex-shrink-0 text-2xl" />
            }
            type="email"
            className=" max-w-md"
          />{" "}
          {errors.email && <span>{errors.email.message}</span>}
          <Input
            label="Password"
            variant="flat"
            {...register("password")}
            startContent={
              <MdLock className=" pointer-events-none flex-shrink-0 text-2xl" />
            }
          
            type='password'
            className=" max-w-md"
            aria-label={errors.root ? true : false}
          />{" "}
          {errors.password && <span>{errors.password.message}</span>}
          <Button
            type="submit"
            variant="flat"
            className="flex w-full max-w-md justify-center rounded-md py-1.5 text-sm leading-6 text-gray-600 "
          >
            Login
          </Button>
        </form>
      </div>
    </div>
  );
};

export default RegisterForm;
