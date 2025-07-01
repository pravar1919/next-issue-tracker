import { NextRequest, NextResponse } from "next/server";
import axios from '@/utils/api'
import { z } from "zod";

const createIssueSchema = z.object({
    title: z.string().min(1, "Title is mandatory.").max(255),
    description: z.string().min(1, "Description is mandatory.")
})

export async function POST(request: NextRequest){
    let validation;
    try{
        const body = await request.json()
        validation = createIssueSchema.safeParse(body)
    }catch (error){
        console.log(error);
        return NextResponse.json({"error": "This is a invalid request."}, {status: 400})
    }
    if (!validation.success){
        return NextResponse.json(validation.error.format(), {status: 400})
    }
    try {
        console.log(validation.data)
        const response = await axios.post("/issues/create_issue", validation.data)
        console.log(response, "data.....")
    } catch (error) {
        return NextResponse.json({"error": "The problem lies with the external server"}, {status: 400})
    }
    return NextResponse.json("Success", {status: 201})
}