import {z} from 'zod'
export const usernameValidation = z
     .string()
     .min(2,"Atleast 2")
     .max(20,"Atmost 20")

export const signUpSchema = z.object({
    username : usernameValidation,
    email: z.string().email({message: 'Invalid email'}),
    password: z.string().min(6,{message: "Min 6 characters man"})
})