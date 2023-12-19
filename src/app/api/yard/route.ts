import yardService from "@/service/yard";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
    const response = await yardService.all();
    return NextResponse.json(response.items);
}


export async function POST(request: Request) {
    try {
        const data = await request.json();
        await yardService.save(data);
        return NextResponse.json({ ...data, status: true });
    } catch (error) {
        return NextResponse.error();
    }
}
