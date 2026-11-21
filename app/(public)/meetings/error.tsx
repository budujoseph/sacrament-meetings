'use client';

import MeetingsError, { type MeetingsErrorProps } from '@/Components/MeetingsError';

export default function PublicMeetingsError(props: MeetingsErrorProps) {
    return <MeetingsError {...props} />;
}
