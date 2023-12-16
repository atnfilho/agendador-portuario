import VehicleService from "@/service/vehicle";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {

    const id = req.nextUrl.searchParams.get('id');
    const limit = req.nextUrl.searchParams.get('limit');

    const response = await VehicleService.all({id, limit});
    return NextResponse.json(response.items);
}


export async function POST(request: Request) {
    try {
        const data = await request.json();
        await VehicleService.save(data);
        return NextResponse.json({ ...data, status: true });
    } catch (error) {
        return NextResponse.error();
    }
}