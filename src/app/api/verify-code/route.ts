import dbConnect from "@/lib/dbConnect";
import UserModel from "@/model/User";

export async function POST(request: Request){
    await dbConnect()
    try {
        const {username, code} = await request.json()
        const decodedUsername = decodeURIComponent(username)
        const user = await UserModel.findOne({username: decodedUsername})
        if(!user){
           return Response.json({
               success: false,
               message:"User does not exist"
           },{status:404})
        }

        const isCodeValid = user.verifyCode === code
        const isCodeNotExpired = new Date(user.verifyCodeExpiry)> new Date()

        if(isCodeValid && isCodeNotExpired){
            user.isVerified= true
            await user.save()
            return Response.json({
                success: true,
                message:"Code verified"
            },{status:200})
        }
        else if(!isCodeNotExpired){
            return Response.json({
                success: false,
                message:"Code expired"
            },{status:404})
        }else{
            return Response.json({
                success: false,
                message:"Wrong code"
            },{status:404})
        }


    } catch (error) {
        return Response.json({
            success: false,
            message:"Error in verifying code"
        },{status:500})
        
    }
}