import Link from 'next/link';
import type { SacramentMeeting } from '@/lib/types';
import DeleteMeetingButton from './DeleteMeetingButton';

interface MeetingCardProps {
  meeting: SacramentMeeting;
  showManagementActions?: boolean;
}

export default function MeetingCard({
    meeting,
    showManagementActions = false,
}: MeetingCardProps) {
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
            <div className="mt-4 flex flex-wrap gap-2">
                <Link
                    href={`/meetings/${meeting.id}`}
                    className="inline-flex rounded-lg bg-blue-800 px-4 py-2 font-semibold text-white transition-colors duration-300 hover:bg-blue-900 focus:outline-none focus:ring-4 focus:ring-blue-300"
                >
                    View Meeting Details
                </Link>
                {showManagementActions && (
                    <>
                        <Link
                            href={`/meetings/${meeting.id}/edit`}
                            className="inline-flex rounded-lg bg-amber-700 px-4 py-2 text-white transition-colors duration-300 hover:bg-amber-800"
                        >
                            Update Meeting
                        </Link>
                        <DeleteMeetingButton meetingId={meeting.id} />
                    </>
                )}
            </div>
        </article>
    )
}