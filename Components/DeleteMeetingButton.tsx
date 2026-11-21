'use client';

import { useState, useTransition } from 'react';
import { deleteMeeting } from '@/app/lib/actions';

export default function DeleteMeetingButton({
    meetingId,
}: {
    meetingId: number;
}) {
    const [error, setError] = useState<string | null>(null);
    const [isPending, startTransition] = useTransition();

    function handleDelete() {
        if (!window.confirm('Delete this meeting? This cannot be undone.')) {
            return;
        }

        setError(null);
        startTransition(async () => {
            const result = await deleteMeeting(meetingId);
            if (result?.message) {
                setError(result.message);
            }
        });
    }

    return (
        <div>
            <button
                type="button"
                onClick={handleDelete}
                disabled={isPending}
                className="inline-flex rounded-lg bg-red-800 px-4 py-2 font-semibold text-white transition-colors duration-300 hover:bg-red-900 focus:outline-none focus:ring-4 focus:ring-red-200 disabled:cursor-not-allowed disabled:opacity-70"
            >
                {isPending ? 'Deleting...' : 'Delete Meeting'}
            </button>
            {error && (
                <p className="mt-2 text-sm text-red-600" role="alert">
                    {error}
                </p>
            )}
        </div>
    );
}
