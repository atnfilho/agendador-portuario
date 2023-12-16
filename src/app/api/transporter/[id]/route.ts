import TransporterService from "@/service/transporter";
import { NextResponse } from "next/server";

export async function GET(request: Request, context: any) {

    const { params } = context;
    const response = await TransporterService.byId(params.id);
    return NextResponse.json(response.data);

}