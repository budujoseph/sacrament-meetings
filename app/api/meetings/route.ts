import { NextResponse } from "next/server";
import { getMeetings } from "@/lib/meetings-db";

export async function GET(request: Request) {
    try {
        const { searchParams } = new URL(request.url);
        const date = searchParams.get("date");
        const meetings = getMeetings(date);
        return NextResponse.json( meetings, {status: 200 });

    } catch (error) {
        console.error("Error fetching meetings:", error);
        return NextResponse.json(
            { error: "Failed to fetch meetings" },
            { status: 500 }
        );
    }
}