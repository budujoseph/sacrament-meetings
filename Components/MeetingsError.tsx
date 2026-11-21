'use client';

import { useEffect } from 'react';
import Link from 'next/link';

export type MeetingsErrorProps = {
    error: Error & { digest?: string };
    reset: () => void;
};

export default function MeetingsError({ error, reset }: MeetingsErrorProps) {
    useEffect(() => {
        console.error(error);
    }, [error]);

    return (
        <main className="mx-auto flex max-w-2xl flex-col items-center gap-4 p-6 text-center">
            <h2 className="text-2xl font-bold text-slate-900">
                We couldn&apos;t load this meeting.
            </h2>
            <p className="text-slate-600">
                Something went wrong. Please try again or return to the meetings list.
            </p>
            <div className="flex flex-wrap justify-center gap-3">
                <button
                    type="button"
                    onClick={reset}
                    className="rounded-lg bg-blue-700 px-5 py-2 font-semibold text-white hover:bg-blue-800"
                >
                    Try Again
                </button>
                <Link
                    href="/meetings"
                    className="rounded-lg border border-slate-300 px-5 py-2 font-semibold text-slate-700 hover:bg-slate-100"
                >
                    Back to Meetings
                </Link>
            </div>
        </main>
    );
}
