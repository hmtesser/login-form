import FormData from '../models/FormData';
import FormErrors from '../models/FormErrors';

type Action =
  | { type: 'SET_FIELD'; field: keyof FormData; value: string | boolean }
  | { type: 'SET_ERROR'; field: keyof FormErrors; value: string }
  | { type: 'SET_ERRORS'; value: Partial<FormErrors> };

export default Action;
