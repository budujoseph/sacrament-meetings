
import {notFound} from 'next/navigation'
import MeetingDetail from '@/Components/MeetingDetail'
import { getMeetingById } from '@/lib/meetings-db';


interface MeetingPageProps {
    params: Promise<{
        id: string;
    }>;
}

export default async function MeetingPage({ params, }: MeetingPageProps) {
  const { id } = await params;
  const meetingId = Number(id);

  if (!Number.isInteger(meetingId) || meetingId <= 0) {
    notFound();
  }

  const meeting = await getMeetingById(meetingId);

  if (!meeting) {
    notFound();
  }

  return (
    <section>
      <MeetingDetail meeting={meeting} />
    </section>
  )
}
