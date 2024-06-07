import {z} from 'zod'

export const acceptMessageSchema=z.object({
    content: z.string().min(10,{message:"Min 10 characters man"}).max(300,{message:"300 Words!!"})
   
})