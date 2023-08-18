
import * as Yup from 'yup';

export const RegisterValidationSchema = Yup.object().shape({
    name : Yup.string()
      .required('Name is required'),
    email: Yup.string()
      .required('Email is required')
      .email('Email is invalid'),
    password: Yup.string()
      .required('Password is required')
      .min(6, 'Password must be at least 6 characters')
      .max(40, 'Password must not exceed 40 characters'),
    password_confirmation: Yup.string()
      .required('Password confirmation is required')
      .oneOf([Yup.ref('password')], 'Passwords must match')
  });

  export const loginValidationSchema = Yup.object().shape({
    email: Yup.string()
      .required('Email is required')
      .email('Email is invalid'),
    password: Yup.string()
      .required('Password is required')
      .min(6, 'Password must be at least 6 characters')
      .max(40, 'Password must not exceed 40 characters'),
  });