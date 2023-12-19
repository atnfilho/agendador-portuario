import VehicleService from "@/service/vehicle";
import { NextResponse } from "next/server";

export async function GET() {
    const response = await VehicleService.all();
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