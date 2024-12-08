import React, { useState } from 'react';
import Input from '../Input/Input';
import { useNavigate } from 'react-router-dom';
import validation from '../../utils/validation';

const Login: React.FC = () => {
  const [loginData, setLoginData] = useState({ email: '', password: '' });
  const [errorMessages, setErrorMessages] = useState({
    email: '',
    password: '',
  });

  const navigate = useNavigate();

  const handleClick = () => {
    navigate('/signup', { replace: true });
  };

  const validate = new validation();

  const handleSubmit = () => {
    event?.preventDefault();
    const { email, password } = loginData;

    const emailError = validate.validateEmail(email);

    const passwordError = validate.validatePassword(password);

    setErrorMessages({
      email: emailError,
      password: passwordError,
    });
  };

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setLoginData((prevValues) => ({
      ...prevValues,
      [name]: value,
    }));

    setErrorMessages((prevValues) => ({
      ...prevValues,
      [name]: '',
    }));
  };

  return (
    <div className="bg-white px-10 py-20 rounded-3xl border-2 border-gray-200">
      <h1 className="text-5xl">Welcome Back</h1>
      <p className="font-medium text-lg text-gray-500 mt-4">
        Please enter your login information
      </p>
      <form>
        <div className="mt-8">
          <Input
            label="email"
            type="email"
            name="email"
            value={loginData.email}
            onChange={handleChange}
            placeHolderText="Please inform your E-mail or ID"
            error={errorMessages.email}
          />
          <Input
            label="password"
            type="password"
            name="password"
            value={loginData.password}
            onChange={handleChange}
            placeHolderText="Please inform your password"
            error={errorMessages.password}
          />
          <div className="mt-8 flex justify-between items-center">
            <input type="checkbox" id="remember" />
            <label className="ml-2 font-medium text-base" htmlFor="remember">
              Remember me
            </label>
            <button className="font-medium text-base text-violet-300">
              Forget password
            </button>
          </div>

          <div className="mt-8 flex flex-col gap-y-4">
            <button
              onClick={handleSubmit}
              className="py-3 rounded-full active:scale-[.98] active:duration-75 transition-all hover:scale-[1.05] ease-in-out bg-violet-500 text-white"
            >
              Sign in
            </button>

            <div className="flex items-center my-4">
              <hr className="flex-grow border-t border-gray-300" />
              <span className="mx-2 text-gray-500">OR</span>
              <hr className="flex-grow border-t border-gray-300" />
            </div>

            <button className="py-3 active:scale-[.98] active:duration-75 transition-all hover:scale-[1.05] ease-in-out bg-blue-400 text-white rounded-full flex items-center justify-center">
              <img
                src="/png/7123025_logo_google_g_icon.svg"
                alt="Google logo"
                className="w-5 h-5 mr-2 bg-white"
              />
              Sign in with Google
            </button>
          </div>
        </div>
      </form>
      <div className="mt-8 flex justify-center items-center">
        <label className="font-medium text-base">Don't have an account?</label>
        <button
          onClick={handleClick}
          className="text-violet-500 text-base font-medium ml-2"
        >
          Sign up
        </button>
      </div>
    </div>
  );
};

export default Login;
