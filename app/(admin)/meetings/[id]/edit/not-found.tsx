import Link from 'next/link';

export default function EditMeetingNotFound() {
    return (
        <main className="mx-auto flex max-w-2xl flex-col items-center gap-4 p-6 text-center">
            <h1 className="text-2xl font-bold text-slate-900">
                Meeting not found
            </h1>
            <p className="text-slate-600">
                The meeting may have been deleted or the address may be incorrect.
            </p>
            <Link
                href="/meetings"
                className="rounded-lg bg-blue-700 px-5 py-2 font-semibold text-white hover:bg-blue-800"
            >
                Back to Meetings
            </Link>
        </main>
    );
}
