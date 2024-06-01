// src/components/LoginForm.js

import React, { useContext, useState } from "react";
import { useForm } from "react-hook-form";
// import { zodResolver } from '@hookform/resolvers/zod';
import * as z from "zod";
// import { AuthContext } from '../contexts/AuthContext';
import { Button, Input } from "@nextui-org/react";
import { EyeFilledIcon } from "../units/Eyefilled";
import { EyeSlashFilledIcon } from "../units/Eyeslashed";
import { MdEmail, MdLock } from "react-icons/md";
import { Link } from "react-router-dom";

const LoginForm = () => {
  const schema = z.object({
    email: z.string().email(),
    password: z.string().min(6),
  });
  // const { login } = useContext(AuthContext);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    // resolver: zodResolver(schema),
  });

  const onSubmit = async (data) => {
    // await login(data.email, data.password);
    console.log(data);
  };
  const [isVisible, setIsVisible] = useState(false);

  const toggleVisibility = () => setIsVisible(!isVisible);

  return (
    <div className={`flex flex-col justify-center px-6 py-12 lg:px-8  `}>
      <h2 className=" px-6 py-8 text-center text-2xl font-bold   tracking-tight text-gray-900">
        Login to your account
        <p>New account? <Link to='/register' className=" underline underline-offset-4"> Register here</Link></p>

      </h2>

      <div className=" mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="mt-10 space-y-8 flex flex-col gap-3 px-4 py-6 items-center  "
        >
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
            endContent={
              <button
                className="focus:outline-none"
                type="button"
                onClick={toggleVisibility}
              >
                {isVisible ? (
                  <EyeSlashFilledIcon className="text-2xl text-default-400 pointer-events-none" />
                ) : (
                  <EyeFilledIcon className="text-2xl text-default-400 pointer-events-none" />
                )}
              </button>
            }
            type={isVisible ? "text" : "password"}
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

export default LoginForm;
