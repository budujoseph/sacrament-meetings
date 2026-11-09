
import { getMeetings } from "@/lib/meetings-db";
import MeetingCard from "@/Components/MeetingCard";

export default function MeetingsPage() {
    const meetings = getMeetings();

    return (
        <section className="mx-auto max-w-6xl px-4 py-10">
            <h1 className="mb-3 text-3xl font-bold">
                Sacrament Meetings
            </h1>

            <p className="mb-8 text-muted">
                View all scheduled sacrament meetings.
            </p>

            {meetings.length > 0 ? (
                <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
                    {meetings.map((meeting) => (
                        <MeetingCard
                            key={meeting.id}
                            meeting={meeting}
                        />
                    ))}
                </div>
            ) : (
                <p>No meetings have been scheduled.</p>
            )}
        </section>
    );
}
