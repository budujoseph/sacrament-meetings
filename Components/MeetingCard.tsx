import Link from 'next/link';
import type { SacramentMeeting } from '@/lib/types';

interface MeetingCardProps {
  meeting: SacramentMeeting;
}

export default function MeetingCard({ meeting }: MeetingCardProps) {
    const formattedDate = new Date(meeting.date).toLocaleDateString('en-US', {
        weekday: 'long',
        year: 'numeric',
        month: 'long',
        day: 'numeric',
        timeZone: 'UTC' 
    });


    return (
        <article className="border rounded-lg p-4 shadow-md hover:shadow-lg transition-shadow duration-300 p-5 bg-slate-900 m-2">
            <div className="flex justify-between items-center mb-6">
                <span className="text-sm text-slate-300">
                    {meeting.meetingType.toUpperCase()}
                </span>
                <span className="text-sm text-slate-300">
                    {formattedDate}
                </span>
            </div>
            <h2 className="text-x text-white font-bold mb-4">Sacrament Meeting</h2>

            <div>

                <p className="mb-2 text-white">
                    Presiding:
                    <strong>{" "}
                        {meeting.presiding}
                    </strong>{" "}
                </p>

                <p className="mb-2 text-white">
                    Conducting:
                    <strong>
                        {meeting.conducting}
                    </strong>{" "}
                </p>

                <p className="mb-2 text-white">
                    Opening Hymn:
                    <strong>
                        {meeting.openingHymn.number} - {meeting.openingHymn.title}
                    </strong>{" "}
                </p>
                <p className="mb-2 text-white">
                    <strong>
                        Speakers:
                    </strong> {" "}
                    {meeting.speakers.length}
                </p>
           
            </div>
            <Link href={`/meetings/${meeting.id}`} className="mt-4 inline-block rounded-lg bg-blue-600 px-4 py-2 text-white hover:bg-blue-700 transition-colors duration-300">
                View Meeting Details
            </Link>
        </article>
    )
}