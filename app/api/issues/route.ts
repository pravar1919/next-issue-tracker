import { NextRequest, NextResponse } from "next/server";
import axios from "@/utils/api";
import { createIssueSchema } from "../../validationSchemas";

export async function POST(request: NextRequest) {
  let validation;
  try {
    const body = await request.json();
    validation = createIssueSchema.safeParse(body);
  } catch (error) {
    console.log(error);
    return NextResponse.json(
      { error: "This is a invalid request." },
      { status: 400 }
    );
  }
  if (!validation.success) {
    return NextResponse.json(validation.error.format(), { status: 400 });
  }
  try {
    console.log(validation.data);
    const response = await axios.post("/issues/create_issue", validation.data);
    console.log(response, "data.....");
  } catch (error) {
    return NextResponse.json(
      { error: "The problem lies with the external server" },
      { status: 400 }
    );
  }
  return NextResponse.json("Success", { status: 201 });
}
