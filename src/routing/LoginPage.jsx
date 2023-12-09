import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { z } from "zod";
import { getUsersByQuery } from "../redux/slices/userSlice/userActions";
import Button from "../util/Button";
import Input from "../util/Input";
import {
  selectUser,
  selectUserError,
} from "../redux/slices/userSlice/userSelectors";

const User = z.object({
  email: z.string().email(),
  password: z.string().min(8),
});

function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState(null);
  const navigation = useNavigate();
  const dispatch = useDispatch();
  const user = useSelector(selectUser);
  const error = useSelector(selectUserError);
  useEffect(() => {
    if (user?.alias) {
      console.log("+");
      navigation("/notes");
    }
  }, []);

  function handleLogin() {
    try {
      const query = new URLSearchParams({
        email,
        password,
      }).toString();
      const currentUser = User.parse({
        email,
        password,
      });
      setErrors(null);
      dispatch(getUsersByQuery(query));
      if (!error) {
        navigation("/notes");
      }
    } catch (err) {
      if (err instanceof z.ZodError) {
        setErrors(err.format());
      }
    }
  }

  return (
    <div className="w-3/4 mx-auto mt-12 text-center">
      <div className="grid gap-4 mb-6 md:grid-cols-1">
        <h1 className="mb-4 text-3xl font-bold text-gray-800 md:text-4xl lg:text-5xl">
          Login
        </h1>
        <div className="mb-4">
          <div className="block mb-2 text-lg font-medium text-gray-800">
            Email address
          </div>
          <Input
            $type="email"
            $placeholder="yury.pazniak@bsu.by"
            $onDataChange={setEmail}
          ></Input>
          {errors?.email?._errors && (
            <div className="text-red-500">{errors?.email?._errors[0]}</div>
          )}
        </div>
        <div className="mb-4">
          <div className="block mb-2 text-lg font-medium text-gray-800">
            Password
          </div>
          <Input
            $type="password"
            $placeholder="••••••••"
            $onDataChange={setPassword}
          ></Input>
          {errors?.password?._errors && (
            <div className="text-red-500">{errors?.password?._errors[0]}</div>
          )}
        </div>
      </div>
      {errors && <div className="text-red-500">{errors.message}</div>}
      {error && <div className="text-red-500">{error}</div>}
      <div className="flex flex-col sm:flex-row sm:justify-between sm:w-2/3 sm:mx-auto">
        <Button $text="Login" $handleOnClick={handleLogin} />
        <Button $text="SignUp" $to="/signup" />
      </div>
    </div>
  );
}

export default LoginPage;
