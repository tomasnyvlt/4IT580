import * as yup from "yup";

export const registerLoginValidation = yup.object({
    firstName: yup.string().required().min(2),
    lastName: yup.string().required().min(2),
    email: yup.string().required().email(),
    password: yup.string().required().min(6).matches(/^(?=.*[A-Z])(?=.*[a-z])(?=.*\d)(?=.*[^A-Za-z0-9]).{6,}$/)
})