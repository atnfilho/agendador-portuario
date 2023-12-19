import MotivationService from "@/service/motivation";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
    const response = await MotivationService.all();
    return NextResponse.json(response.items);
}


export async function POST(request: Request) {
    try {
        const data = await request.json();
        await MotivationService.save(data);
        return NextResponse.json({ ...data, status: true });
    } catch (error) {
        return NextResponse.error();
    }
}

