export const validateEmail = text => {
  let reg = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
  return reg.test(text);
};

export const validateForm = (email, password) => {
  let emailInvalid = false;
  let passwordInvalid = false;
  if (email && email.length) {
    emailInvalid = !validateEmail(email);
  }
  if (email && email.length && (!password || password.length == 0)) {
    passwordInvalid = true;
  }
  return {
    passwordInvalid,
    emailInvalid
  };
};

export const validateMnemonic = phrase =>
  phrase.trim().split(/\s+/g).length == 12;
