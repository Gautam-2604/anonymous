import { getServerSession } from "next-auth";
import { authOptions } from "../auth/[...nextauth]/options";
import dbConnect from "@/lib/dbConnect";
import UserModel from "@/model/User";
import { User } from "next-auth";

export async function POST(request: Request){
    await dbConnect();
    const session = await getServerSession(authOptions)
    //now the next line is due to options.ts

    const user: User = session?.user as User
    if(!session || !session.user){
        return Response.json({
            success: false,
            message:"Not Authenticated"
            
        },{status:401})
    }
    const userId = user._id;
    const {acceptMessages} = await request.json()
    try {
        const updatedUser = await UserModel.findByIdAndUpdate(userId,{
            isAcceptingMessages: acceptMessages
        },{new: true})
        if(!updatedUser){
            return Response.json({
                success: false,
                message:"Failed to update acceptMessages"
                
            },{status:401})
        }

        return Response.json({
            success: true,
            message:"Done acceptMessages"
            
        },{status:200})

    } catch (error) {
        console.log("Failed to update acceptMessages",error);
        
        return Response.json({
            success: false,
            message:"Failed to update acceptMessages"
            
        },{status:500})
    }
}

export async function GET(request: Request){
    await dbConnect();
    const session = await getServerSession(authOptions)
    //now the next line is due to options.ts

    const user: User = session?.user as User
    if(!session || !session.user){
        return Response.json({
            success: false,
            message:"Not Authenticated"
            
        },{status:401})
    }
    const userId = user._id;
    try {
        const foundUser = UserModel.findById(userId)
        if(!foundUser){
            return Response.json({
                success: false,
                message:"No User found"
                
            },{status:401})
        }
        
        return Response.json({
            success: true,
            message:"We got the status"
            
        },{status:500})
    
    } catch (error) {
        console.log("Error ",error);
        return Response.json({
            success: false,
            message:"No User found"
            
        },{status:500})
        
    }


}