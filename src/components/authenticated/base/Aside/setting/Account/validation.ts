
import * as Yup from 'yup';

export const editFormValidations = Yup.object().shape({
name : Yup.string()
    .required('Name is required')
    .min(3, 'Name must be at least 3 characters')
    .max(40, 'Name must not exceed 40 characters')
    .matches(/^[a-zA-Z0-9_ ]*$/, 'Name can only contain letters, numbers, underscores and spaces')
    .trim(),
phone : Yup.string()
    .nullable()
    .test('is-valid-phone', 'Phone number is not valid', (value ) => {
        if (!value) return true; // Skip validation if value is not provided
        const isValid = /^\d{10}$/.test(value) && value.startsWith('09');
        return isValid;
        }),
email: Yup.string()
    .required('Email is required')
    .email('Email is invalid')
,
});
