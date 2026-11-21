import { notFound } from 'next/navigation';
import MeetingForm from '../../create/sacrament-meeting-form';
import { updateMeeting } from '@/app/lib/actions';
import { getMeetingById } from '@/lib/meetings-db';

type EditMeetingPageProps = {
  params: Promise<{
    id: string;
  }>;
};

export default async function EditMeetingPage({ params }: EditMeetingPageProps) {
  const { id } = await params;
  const meetingId = Number(id);

  if (!Number.isInteger(meetingId) || meetingId <= 0) {
    notFound();
  }

  const meeting = await getMeetingById(meetingId);

  if (!meeting) {
    notFound();
  }

  const updateMeetingWithId = updateMeeting.bind(null, meetingId);

  return (
    <main className="mx-auto max-w-3xl space-y-6 p-6">
      <h1 className="text-2xl font-bold">Update Meeting</h1>
      <MeetingForm action={updateMeetingWithId} meeting={meeting} />
    </main>
  );
}