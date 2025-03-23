export function validateEmail(email: string) {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  //const isEmailValid = email.length > 0 ? emailRegex.test(email) : false;

  const isValid = {
    isValid: emailRegex.test(email),
    errorList: !emailRegex.test(email) ? ["Invalid email address"] : [],
  };

  return isValid;
}

export function validatePassword(password: string) {
  const errorList: string[] = [];

  if (password.length < 8) {
    errorList.push("Password must be at least 8 characters long");
  }

  if (!/[A-Z]/.test(password)) {
    errorList.push("Password must contain at least one uppercase letter");
  }

  if (!/[a-z]/.test(password)) {
    errorList.push("Password must contain at least one lowercase letter");
  }

  if (!/[0-9]/.test(password)) {
    errorList.push("Password must contain at least one number");
  }

  if (!/[^A-Za-z0-9]/.test(password)) {
    errorList.push("Password must contain at least one special character");
  }

  const isValid = {
    isValid: errorList.length === 0,
    errorList: errorList,
  };

  return isValid;
}
