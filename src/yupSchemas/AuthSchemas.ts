import * as yup from "yup";

export const signUpSchema = yup.object().shape({
  full_name: yup.string().required(),
  email: yup.string().required(),
  password: yup.string().required(),
  confirm_password: yup
    .string()
    .oneOf([yup.ref("password")], "Passwords must match"),
});

export const signInSchema = yup.object().shape({
  email: yup.string().required("Email required").email(),
  password: yup.string().required("Password is required"),
});
