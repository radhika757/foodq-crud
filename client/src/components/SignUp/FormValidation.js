import * as yup from 'yup';

// define schema
 export const signInSchema = yup.object().shape({
    name: yup.string().required(),
    number: yup.number().required(),
    email: yup.string().email().required(),
    // address: yup.string().min(5).required() .min(9).max(10)
    address: yup.string().required()
})