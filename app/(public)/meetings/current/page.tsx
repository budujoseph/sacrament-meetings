import MeetingDetail from "@/Components/MeetingDetail";
import { getMeetingByDate } from "@/lib/meetings-db";

export default async function CurrentMeetingPage() {
    const today = new Date();
    const daysUntilSunday = (7 - today.getUTCDay()) % 7;
    const upcomingSunday = new Date(
        Date.UTC(
            today.getUTCFullYear(),
            today.getUTCMonth(),
            today.getUTCDate() + daysUntilSunday
        )
    );
    const upcomingSundayDate = [
        upcomingSunday.getUTCFullYear(),
        String(upcomingSunday.getUTCMonth() + 1).padStart(2, "0"),
        String(upcomingSunday.getUTCDate()).padStart(2, "0"),
    ].join("-");

    const currentMeeting = await getMeetingByDate(upcomingSundayDate);

    if (!currentMeeting) {
        return (
            <p className="text-center text-slate-600">
                No meeting found for Sunday, {upcomingSundayDate}.
            </p>
        );
    }

    return <MeetingDetail meeting={currentMeeting} />;
}