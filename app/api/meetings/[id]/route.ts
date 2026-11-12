import { NextResponse } from "next/server";
import {getMeetingById} from "@/lib/meetings-db";

export async function GET(request: Request, { params }: { params: Promise<{ id: string }> }) {

    console.log("INDIVIDUAL MEETING API ROUTE WAS CALLED");
    
    const { id } = await params;
    const meetingId = Number(id);

    if (!Number.isInteger(meetingId) || meetingId <= 0) {
        return NextResponse.json(
            { error: "Invalid meeting ID" },
            {status: 400}
        );
    }

    const meeting = getMeetingById(meetingId);
    console.log("Requested meeting ID:", meetingId);
    console.log("Meeting found:", meeting);
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
}