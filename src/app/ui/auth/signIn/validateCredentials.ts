export const validateLogin = ({ email, password }: { email: string; password: string }) => {
  const errors = {
    email: '',
    password: '',
  };

  // Validaciones para el email
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    errors.email = 'Email must be a valid email address';
  }
  if (email.length === 0) {
    errors.email = 'Email is required';
  }

  // Validaciones para la contraseña
  if (password.length === 0) {
    errors.password = 'Password is required';
  }

  return errors;
};
