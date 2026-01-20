import z from "zod"

export const loginUserValidation = z.object({
    email: z
            .email({message: "Please enter a valid email address"})
            .trim(),

    password: z 
            .string()
            .trim()
            .min(6, {message: "Password should be 6 char"})
            .max(100, {message: "Password should be 100 char"}) 
});

export const registerUserValidation = loginUserValidation.extend({
    name: z
        .string()
        .trim()
        .min(3, {message:"Name should be greater than 3 char"})
        .max(100, {message: "Name should be 100 char"})
})