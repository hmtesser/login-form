import Action from '../types/Action';
import FormData from '../models/FormData';
import FormErrors from '../models/FormErrors';

export const initialState: { data: FormData; errors: FormErrors } = {
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

export const formReducer = (
  state: { data: FormData; errors: FormErrors },
  action: Action
) => {
  switch (action.type) {
    case 'SET_FIELD':
      return {
        ...state,
        data: { ...state.data, [action.field]: action.value },
      };
    case 'SET_ERROR':
      return {
        ...state,
        errors: { ...state.errors, [action.field]: action.value },
      };
    default:
      return state;
  }
};
