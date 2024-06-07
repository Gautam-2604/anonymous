import {z} from 'zod'

export const signInSchema=z.object({
    identifier: z.string().email() ,     //email
    password: z.string()
})