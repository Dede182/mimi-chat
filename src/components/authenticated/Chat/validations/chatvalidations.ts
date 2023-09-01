
import * as Yup from 'yup';

export const fileInputValidations = Yup.object().shape({
    files: Yup.array().of(
    Yup.mixed()
    .test('fileSize', 'File size should be under 2 MB', (value) => {
        if (!value) {
            return true; // Skip validation if no file provided
        }
        return value.size <= 2 * 1024 * 1024; // 2 MB in bytes
    })
    )
    .required('File is required'),
  });
