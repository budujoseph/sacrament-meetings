import { createMeeting } from '@/app/lib/actions';
import MeetingForm from './sacrament-meeting-form';

export default function CreateMeetingPage() {
    return (
        <main className="mx-auto max-w-3xl space-y-6 p-6">
            <h1 className="text-2xl font-bold">Create Meeting</h1>
            <MeetingForm action={createMeeting} />
        </main>
    );
}