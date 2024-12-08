import React from 'react';
import { useForm } from '../../hooks/useForm';
import Input from '../Input/Input';
import { useNavigate } from 'react-router-dom';

const Signup: React.FC = () => {
  const { state: formData, handleChange, handleBlur, validateAll } = useForm();
  const navigate = useNavigate();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const isValid = validateAll();
    if (isValid) {
      navigate('/usercreated', { replace: true });
    } else {
      console.log('Existem erros no formulário');
    }
  };

  return (
    <div className="min-h-screen py-40">
      <div className="container mx-auto">
        <div className="flex flex-col lg:flex-row w-10/12 lg:w-12/12 bg-white rounded-xl mx-auto shadow-lg overflow-hidden">
          <div className="w-full py-16 px-12">
            <h2 className="text-3xl mb-4">Register</h2>
            <p className="mb-4">
              Create your account. It’s free and only takes a minute
            </p>
            <form onSubmit={handleSubmit}>
              <div className="grid grid-cols-2 gap-5">
                <Input
                  label="Full name"
                  type="text"
                  name="fName"
                  value={formData.data.fName}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  placeHolderText="Full Name"
                  error={formData.errors.fNameError}
                />
                <Input
                  label="Email"
                  type="email"
                  name="email"
                  value={formData.data.email}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  placeHolderText="Please inform your E-mail"
                  error={formData.errors.emailError}
                />
              </div>
              <div className="grid grid-cols-2 gap-5 mt-5">
                <Input
                  label="City"
                  type="text"
                  name="city"
                  value={formData.data.city}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  placeHolderText="City"
                  error={formData.errors.cityError}
                />
                <Input
                  label="Day of Birth"
                  type="date"
                  name="birthDate"
                  value={formData.data.birthDate}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  placeHolderText="Day of Birth"
                  error={formData.errors.birthDateError}
                />
              </div>
              <div className="mt-5">
                <Input
                  label="Password"
                  type="password"
                  name="password"
                  value={formData.data.password}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  placeHolderText="Password"
                  error={formData.errors.passwordError}
                />
              </div>
              <div className="mt-5">
                <Input
                  label="Confirm Password"
                  type="password"
                  name="confirmPassword"
                  value={formData.data.confirmPassword}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  placeHolderText="Confirm password"
                  error={formData.errors.confirmPasswordError}
                />
              </div>
              <div className="mt-5">
                <label htmlFor="acceptedTerms" className="flex items-center">
                  <input
                    id="acceptedTerms"
                    name="acceptedTerms"
                    type="checkbox"
                    className="border border-gray-400 pr-2"
                    onChange={handleChange}
                    onBlur={handleBlur}
                  />
                  <span className="ml-2">
                    I accept the{' '}
                    <a href="#" className="text-purple-500 font-semibold">
                      Terms of Use
                    </a>{' '}
                    &{' '}
                    <a href="#" className="text-purple-500 font-semibold">
                      Privacy Policy
                    </a>
                  </span>
                </label>
              </div>
              <div className="mt-5">
                <button
                  type="submit"
                  className="w-full bg-purple-500 py-3 text-center text-white"
                >
                  Register Now
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Signup;
