import {z} from 'zod'

export const verifySchema=z.object({
    code: z.string().min(6,{message:"Must be 6 characters man"})
})