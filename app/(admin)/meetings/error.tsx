'use client';

import MeetingsError, { type MeetingsErrorProps } from '@/Components/MeetingsError';

export default function AdminMeetingsError(props: MeetingsErrorProps) {
    return <MeetingsError {...props} />;
}
