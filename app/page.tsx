
import Link from "next/link";
import { getMeetings } from "@/lib/meetings-db";
import MeetingCard from "@/Components/MeetingCard";

export default function HomePage() {
  const meetings = getMeetings();

  // Get the latest three meetings
  const recentMeetings = [...meetings]
    .sort((a, b) => b.date.localeCompare(a.date))
    .slice(0, 3);

  return (
    <div className="space-y-12">

      <section className="rounded-xl mt-2 bg-blue-900 px-6 py-16 text-center text-white sm:px-12">
        <h1 className="text-3xl font-bold sm:text-5xl font-playfair-display">
          Sacrament Meetings
        </h1>

        <p className="mx-auto mt-4 max-w-2xl text-blue-100">
          Welcome to the Asamankese Ward Sacrament Meeting
          portal. Find meeting schedules, announcements,
          speakers, and hymn information in one place.
        </p>
      </section>
      <section>
        <div className="mb-6 flex flex-wrap items-center justify-between gap-4">
          <div>
            <h2 className="text-2xl font-bold">
              Recent Meetings
            </h2>

            <p className="mt-1 text-muted">
              Browse recently scheduled sacrament meetings.
            </p>
          </div>

          <Link
            href="/meetings"
            className="font-semibold text-primary hover:underline"
          >
            View All →
          </Link>
        </div>

        {recentMeetings.length > 0 ? (
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {recentMeetings.map((meeting) => (
              <MeetingCard
                key={meeting.id}
                meeting={meeting}
              />
            ))}
          </div>
        ) : (
          <p className="rounded-lg border border-border bg-white p-6 text-center text-muted">
            No meetings have been scheduled yet.
          </p>
        )}
      </section>
    </div>
  );
}
