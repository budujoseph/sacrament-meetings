import MeetingDetail from "@/Components/MeetingDetail";
import { getMeetings } from "@/lib/meetings-db";

export default async function CurrentMeetingPage() {
    const today = new Date();
    const sunday = new Date(today);

    sunday.setDate(today.getDate() - today.getDay());

    const currentSunday = [
        sunday.getFullYear(),
        String(sunday.getMonth() + 1).padStart(2, "0"),
        String(sunday.getDate()).padStart(2, "0"),
    ].join("-");

    const meetings = await getMeetings();

    const currentMeeting = meetings.find(
        (meeting) => meeting.date === currentSunday
    );

    if (!currentMeeting) {
        return (
            <p className="text-center text-slate-300">
                No meeting found for this Sunday.
            </p>
        );
    }

    return <MeetingDetail meeting={currentMeeting} />;
}