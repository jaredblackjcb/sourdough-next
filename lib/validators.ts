import isStrongPassword from "validator/lib/isStrongPassword";

export const isValidPassword = (password: string) => {
  return isStrongPassword(password, {
    minLength: 6,
    minLowercase: 1,
    minUppercase: 1,
    minNumbers: 1,
    minSymbols: 0,
  });
};
