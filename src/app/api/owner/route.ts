import OwnerService from "@/service/owner";
import { NextResponse } from "next/server";

export async function GET() {
    const response = await OwnerService.all();
    return NextResponse.json(response.items);
}


export async function POST(request: Request) {
    try {
        const data = await request.json();
        await OwnerService.save(data);
        return NextResponse.json({ ...data, status: true });
    } catch (error) {
        return NextResponse.error();
    }
}