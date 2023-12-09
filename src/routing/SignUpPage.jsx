import React, { useState, useEffect } from "react"
import { z } from "zod"
import Input from "../util/Input"
import Button from "../util/Button"
import { useNavigate } from "react-router-dom"
import User from "../util/validation"
import { useDispatch, useSelector } from "react-redux"
import { getAllUsers, signUpUser } from "../redux/slices/userSlice/userActions"
import { selectUser } from "../redux/slices/userSlice/userSelectors"

export default function SignUp() {
  localStorage.removeItem("userId")
  const [alias, setAlias] = useState("")
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [repeatPassword, setRepeatPassword] = useState("")
  const [comparePassword, setComparePassword] = useState(true)
  const [userAliasExist, setUserAliasExist] = useState(true)
  const [userEmailExist, setUserEmailExist] = useState(true)
  const [errors, setErrors] = useState(null);
  const user = useSelector(selectUser)

  const navigation = useNavigate()
  useEffect(() => {
    if (user?.alias) {
      console.log("+");
      navigation("/notes");
    }
  }, []);

  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(getAllUsers())
  }, []);

  function handleSignUp() {
    try {
      const userAliasExists = users.some((user) => user.alias === alias)
      if (userAliasExists) {
        setUserAliasExist(false);
        throw new Error("A user with this alias exists")
      } else {
        setUserAliasExist(true)
      }
      const userEmailExists = users.some((user) => user.email === email)
      if (userEmailExists) {
        setUserEmailExist(false);
        throw new Error("A user with this email exists")
      } else {
        setUserEmailExist(true)
      }
      if (password !== repeatPassword) {
        setComparePassword(false)
        throw new Error("Passwords don't match")
      }
      const user = User.parse({
        alias,
        email,
        password,
      })
      setErrors(null)
      dispatch(signUpUser(alias, email, password))
      navigation("/")
    } catch (err) {
      if (err instanceof z.ZodError) {
        setErrors(err.format())
      }
    }
  }

  return (
    <div
      className="w-3/4 mx-auto mt-12 text-center"
    >
      <div className="grid gap-4 mb-6 md:grid-cols-1">
        <h1 className="mb-4 text-3xl font-bold text-gray-800 md:text-4xl lg:text-5xl">
          Sign Up
        </h1>
        <div className="mb-4">
          <div className="block mb-2 text-lg font-medium text-gray-800">
            Alias
          </div>
          <Input
            $type="text"
            $placeholder="SigmaPie345"
            $onDataChange={setAlias}
          />
        </div>
        {!userAliasExist && (
          <div className="text-red-500">A user with this alias exists</div>
        )}
        <div className="mb-4">
          <div className="block mb-2 text-lg font-medium text-gray-800">
            Email address
          </div>
          <Input
            $type="email"
            $placeholder="yury.pazniak@bsu.by"
            $onDataChange={setEmail}
          />
          {errors?.email && (
            <div className="text-red-500">{errors?.email?._errors}</div>
          )}
        </div>
        {!userEmailExist && (
          <div className="text-red-500">A user with this email exists</div>
        )}
        <div className="mb-4">
          <div className="block mb-2 text-lg font-medium text-gray-800">
            Password
          </div>
          <Input
            $type="password"
            $placeholder="••••••••"
            $onDataChange={setPassword}
          />
          {errors?.password && (
            <div className="text-red-500">{errors?.password?._errors}</div>
          )}
        </div>
        <div className="mb-4">
          <div className="block mb-2 text-lg font-medium text-gray-800">
            Repeat password
          </div>
          <Input
            $type="password"
            $placeholder="••••••••"
            $onDataChange={(value) => {
              setRepeatPassword(value);
              setComparePassword(true);
            }}
          />
          {!comparePassword && (
            <div className="text-red-500">Passwords don't match</div>
          )}
        </div>
      </div>
      <div className="flex flex-col sm:flex-row sm:justify-between sm:w-2/3 sm:mx-auto">
        <Button $text="Sign Up" $handleOnClick={handleSignUp} />
        <Button $text="Login" $to="/login" />
      </div>
    </div>
  );
}
