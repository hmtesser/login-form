import ValidationConfig from '../types/ValidationConfig';

class validation {
  validateEmail = (email: string) => {
    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    if (!emailRegex.test(email)) {
      return 'Incorrect E-mail format';
    }
    return '';
  };

  validatePassword = (password: string): string => {
    if (!password || password.length < 6) {
      return 'Password must be at least 6 characters';
    }

    return '';
  };

  validateForm<T>(
    state: T,
    config: ValidationConfig<T>
  ): (field: string, value: any) => string {
    return (field, value) => {
      const fieldConfig = config[field];
      if (!fieldConfig) return '';
      return fieldConfig.validate(value, state);
    };
  }
}

export default validation;
