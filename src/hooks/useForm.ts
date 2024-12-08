import { useReducer } from 'react';
import { formReducer } from '../reducers/formReducer';
import validation from '../utils/validation';
import ValidationConfig from '../types/ValidationConfig';

const initialState = {
  data: {
    fName: '',
    email: '',
    city: '',
    birthDate: '',
    password: '',
    confirmPassword: '',
    acceptedTerms: false,
  },
  errors: {
    fNameError: '',
    emailError: '',
    cityError: '',
    birthDateError: '',
    passwordError: '',
    confirmPasswordError: '',
    acceptedTermsError: '',
  },
};

const validateInstance = new validation();

const validationConfig: ValidationConfig<(typeof initialState)['data']> = {
  fName: {
    validate: (value: string) => (value ? '' : 'Field Full name is required'),
  },
  email: {
    validate: (value: string) =>
      !value
        ? 'Field Email is required'
        : validateInstance.validateEmail(value),
  },
  city: {
    validate: (value: string) => (value ? '' : 'Field City is required'),
  },
  birthDate: {
    validate: (value: string) =>
      value ? '' : 'Field Date of Birth is required',
  },
  password: {
    validate: (value: string) => (value ? '' : 'Field Password is required'),
  },
  confirmPassword: {
    validate: (value: string, state) => {
      if (!value) {
        return 'Field Confirm Password is required';
      }
      const passwordError = validateInstance.validatePassword(value);
      if (passwordError) {
        return passwordError;
      }
      return value !== state.password
        ? "Password and Confirm Password don't match"
        : '';
    },
  },
  acceptedTerms: {
    validate: (value: boolean) =>
      value
        ? ''
        : 'You need to Accept the Terms of Use to continue this operation',
  },
};

export const useForm = () => {
  const [state, dispatch] = useReducer(formReducer, initialState);

  const validateField = validateInstance.validateForm(
    state.data,
    validationConfig
  );

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, type, checked } = e.target;

    const fieldValue = type === 'checkbox' ? checked : value;
    dispatch({
      type: 'SET_FIELD',
      field: name as keyof (typeof initialState)['data'],
      value: fieldValue,
    });

    const fieldError = validateField(name, fieldValue);

    dispatch({
      type: 'SET_ERROR',
      field: `${name}Error` as keyof (typeof initialState)['errors'],
      value: fieldError,
    });
  };

  const handleBlur = (e: React.FocusEvent<HTMLInputElement>) => {
    const { name, value, type, checked } = e.target;
    const fieldValue = type === 'checkbox' ? checked : value;

    const fieldError = validateField(name, fieldValue);

    dispatch({
      type: 'SET_ERROR',
      field: `${name}Error` as keyof (typeof initialState)['errors'],
      value: fieldError,
    });
  };

  const validateAll = () => {
    const errors = Object.keys(state.data).reduce((acc, key) => {
      const fieldError = validateField(
        key,
        state.data[key as keyof (typeof initialState)['data']]
      );

      const errorKey = `${key}Error` as keyof (typeof initialState)['errors'];
      acc[errorKey] = fieldError || '';
      return acc;
    }, {} as (typeof initialState)['errors']);

    Object.entries(errors).forEach(([field, error]) => {
      dispatch({
        type: 'SET_ERROR',
        field: field as keyof (typeof initialState)['errors'],
        value: error,
      });
    });

    return !Object.values(errors).some((error) => error);
  };

  return {
    state,
    handleChange,
    handleBlur,
    validateAll,
  };
};
