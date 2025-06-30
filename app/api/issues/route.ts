import { NextRequest, NextResponse } from "next/server";
import axios from '@/utils/api'

export async function POST(request: NextRequest){
    const data = await request.json()
    const response = await axios.post("/issues/create_issue", data)
    console.log(response, "data.....")
    return NextResponse.json("Success", {status: 201})
}