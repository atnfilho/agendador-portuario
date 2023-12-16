import MotivationService from "@/service/motivation";
import { NextResponse } from "next/server";

export async function GET(request: Request, context: any) {

    const { params } = context;
    const response = await MotivationService.byId(params.id);
    return NextResponse.json(response.data);

}