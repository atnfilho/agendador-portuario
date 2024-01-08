import ScheduleService from "@/service/schedule";
import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest, { params }: { params: { scheduleId: string } }) {
    const response = await ScheduleService.byId(Number(params.scheduleId));
    return NextResponse.json(response);
}

