import dbConnect from "@/lib/dbConnect";
import UserModel from "@/model/User";
import {z} from 'zod'
import { usernameValidation  } from "@/schema/signUpSchema";

const UsernameQuerySchema = z.object({
    username: usernameValidation
})
