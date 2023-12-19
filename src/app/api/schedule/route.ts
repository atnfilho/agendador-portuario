import ScheduleService from "@/service/schedule";
import { NextResponse } from "next/server";

export async function GET() {
    const response = await ScheduleService.all();
    return NextResponse.json(response.items);
}

export async function POST(request: Request) {
    try {
        const data = await request.json();
        await ScheduleService.save(data);
        return NextResponse.json({ ...data, status: true });
    } catch (error) {
        return NextResponse.error();
    }
}