import { NextResponse } from "next/server";
import { getMeetings } from "@/lib/meetings-db";

export async function GET() {
    try {
        const meetings = await getMeetings();
        return NextResponse.json( meetings, {status: 200 });

    } catch (error) {
        console.error("Error fetching meetings:", error);
        return NextResponse.json(
            { error: "Failed to fetch meetings" },
            { status: 500 }
        );
    }
}