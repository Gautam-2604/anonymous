import UserModel from "@/model/User";
import dbConnect from "@/lib/dbConnect";
import { Message } from "@/model/User";

export async function POST(request: Request){
    await dbConnect()
    const {username, content} = await request.json()
    try {
        const user = await UserModel.findOne({username})
        if(!user){
            return Response.json({
                success: false,
                message: "User not found"
                
            },{status:400})
        }

        //is User accepting messages
        if(!user.isAcceptingMessages){
            return Response.json({
                success: false,
                messages:"User not accepting message"
                
            },{status:401})
        }

        //craft new message
        const newMessage = {content, createdAt: new Date()}
        user.messages.push(newMessage as Message)
        await user.save()
        return Response.json({
            success: true,
            message: "Message sent"
            
        },{status:200})
    } catch (error) {
        console.log("error in sendMessage",error);
        
        return Response.json({
            success: false,
            messages:"Internal server error"
            
        },{status:500})
    }

}