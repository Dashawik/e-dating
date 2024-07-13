module.exports = (password) => {
  const minLength = 8;
  const hasUpperCase = /[A-Z]/.test(password);
  const hasLowerCase = /[a-z]/.test(password);
  const hasNumbers = /\d/.test(password);

  if (password.length < minLength) {
    return {
      status: false,
      msg: "Пароль має бути не менше 8 символів.",
    };
  }
  if (!hasUpperCase) {
    return {
      status: false,
      msg: "Пароль має містити принаймні одну велику літеру.",
    };
  }
  if (!hasLowerCase) {
    return {
      status: false,
      msg: "Пароль має містити принаймні одну малу літеру.",
    };
  }
  if (!hasNumbers) {
    return {
      status: false,
      msg: "Пароль повинен містити хоча б одне число.",
    };
  }

  return {
    status: true,
    msg: "Password is valid.",
  };
};
