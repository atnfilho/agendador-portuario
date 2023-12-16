import VehicleService from "@/service/vehicle";
import { NextResponse } from "next/server";

export async function GET(request: Request, context: any) {

    const { params } = context;
    const response = await VehicleService.byId(params.id);
    return NextResponse.json(response.data);

}