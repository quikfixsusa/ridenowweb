export const validate = ({
  newPassword,
  confirmNewPassword,
  currentPassword,
}: {
  currentPassword: string;
  newPassword: string;
  confirmNewPassword: string;
}) => {
  const errors = {
    currentPassword: '',
    newPassword: '',
    confirmNewPassword: '',
  };

  // VALIDACIONES PARA LA CONTRASEÑA
  if (currentPassword.length < 4) errors.currentPassword = 'Current password must be at least 4 characters long';
  if (currentPassword.length === 0) errors.currentPassword = '';

  // VALIDACIONES PARA LA CONTRASEÑA
  if (!/^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[_#$%&*¡?-])/.test(newPassword))
    errors.newPassword =
      'Password must contain at least one lowercase letter, one uppercase letter, one number, and one special character (#$%&*¡?-_)';
  if (newPassword.length < 8) errors.newPassword = 'Password must be at least 8 characters long';
  if (newPassword.length === 0) errors.newPassword = '';

  // VALIDACIONES PARA LA VALIDACIÓN DE CONTRASEÑA
  if (confirmNewPassword.length === 0) errors.confirmNewPassword = '';
  if (confirmNewPassword !== newPassword) errors.confirmNewPassword = 'Passwords do not match';

  return errors;
};
