import { NextResponse } from "next/server";
import {getMeetingById} from "@/lib/meetings-db";

export async function GET(request: Request, { params }: { params: Promise<{ id: string }> }) {
    
    const { id } = await params;
    const meetingId = Number(id);

    if (!Number.isInteger(meetingId) || meetingId <= 0) {
        return NextResponse.json(
            { error: "Invalid meeting ID" },
            {status: 400}
        );
    }

    try {
        const meeting = await getMeetingById(meetingId);
        if (!meeting) {
            return NextResponse.json(
                { error: "Meeting not found" },
                { status: 404 }
            );
        }

        return NextResponse.json(
            meeting,
            { status: 200 }
        );
    } catch (error) {
        console.error("Error fetching meeting:", error);
        return NextResponse.json(
            { error: "Failed to fetch meeting" },
            { status: 500 }
        );
    }
}