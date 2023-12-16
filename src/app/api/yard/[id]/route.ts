import yardService from "@/service/yard";
import { NextResponse } from "next/server";

export async function GET(request: Request, context: any) {

    const { params } = context;
    const response = await yardService.byId(params.id);
    return NextResponse.json(response.data);

}