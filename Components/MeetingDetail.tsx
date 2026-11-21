'use client'

import Link from 'next/link';
import type { SacramentMeeting } from '@/lib/types';
import DeleteMeetingButton from './DeleteMeetingButton';

interface MeetingDetailProps {
  meeting: SacramentMeeting;
}

export default function MeetingDetail({ meeting }: MeetingDetailProps) {
    const formattedDate = new Date(meeting.date).toLocaleDateString('en-US', {
        weekday: 'long',
        year: 'numeric',
        month: 'long',
        day: 'numeric',
        timeZone: 'UTC' 
    });

    return (
        <article className="mx-auto max-w-5xl px-4 py-8 sm:px-6 lg:px-8">
            <header className="mb-6 overflow-hidden rounded-xl border border-slate-800 bg-slate-900 p-6 text-white shadow-lg sm:p-8">
                <p className="mb-2 text-sm font-semibold uppercase tracking-widest text-blue-300">
                    {meeting.meetingType} meeting
                </p>
                <h1 className="font-playfair-display text-3xl font-bold sm:text-4xl">
                    Sacrament Meeting
                </h1>
                <p className="mt-3 text-slate-300">{formattedDate}</p>
            </header>

            <dl className="mb-6 grid gap-4 sm:grid-cols-2">
                <div className="rounded-lg border border-slate-700 bg-slate-800 p-5">
                    <dt className="text-xs font-semibold uppercase tracking-wide text-slate-400">
                        Presiding
                    </dt>
                    <dd className="mt-1 font-semibold text-white">{meeting.presiding}</dd>
                </div>
                <div className="rounded-lg border border-slate-700 bg-slate-800 p-5">
                    <dt className="text-xs font-semibold uppercase tracking-wide text-slate-400">
                        Conducting
                    </dt>
                    <dd className="mt-1 font-semibold text-white">{meeting.conducting}</dd>
                </div>
            </dl>

            {meeting.announcements && meeting.announcements.length > 0 && (
                <section className="mb-6 rounded-xl border border-slate-200 bg-white p-5 shadow-sm sm:p-6">
                    <h2 className="mb-3 text-xl font-bold text-blue-900">Announcements</h2>
                    <ul className="list-disc space-y-2 pl-5 text-slate-700">
                        {meeting.announcements.map((announcement, index) => (
                            <li key={index}>{announcement}</li>
                        ))}
                    </ul>
                </section>
            )}

            <div className="space-y-4">
                <section className="rounded-xl border border-slate-200 bg-white p-5 shadow-sm sm:p-6">
                    <h2 className="mb-2 text-sm font-bold uppercase tracking-wide text-slate-500">Opening Hymn</h2>
                    <p className="font-semibold text-slate-900">{meeting.openingHymn.number} - {meeting.openingHymn.title}</p>
                </section>
                <section className="rounded-xl border border-slate-200 bg-white p-5 shadow-sm sm:p-6">
                    <h2 className="mb-2 text-sm font-bold uppercase tracking-wide text-slate-500">Opening Prayer</h2>
                    <p className="font-semibold text-slate-900">{meeting.openingPrayer}</p>
                </section>
                <section className="rounded-xl border border-slate-200 bg-white p-5 shadow-sm sm:p-6">
                    <h2 className="mb-2 text-sm font-bold uppercase tracking-wide text-slate-500">Sacrament Hymn</h2>
                    <p className="font-semibold text-slate-900">{meeting.sacramentHymn.number} - {meeting.sacramentHymn.title}</p>
                </section>
                <section className="rounded-xl border border-slate-200 bg-white p-5 shadow-sm sm:p-6">
                    <h2 className="mb-2 text-sm font-bold uppercase tracking-wide text-slate-500">Closing Hymn</h2>
                    <p className="font-semibold text-slate-900">{meeting.closingHymn.number} - {meeting.closingHymn.title}</p>
                </section>
            </div>

            <section className="mt-6 space-y-4">
                <div className="rounded-xl border border-slate-200 bg-white p-5 shadow-sm sm:p-6">
                    <h2 className="mb-3 text-lg font-bold text-blue-900">Ward Business</h2>
                    {meeting.wardBusiness.length > 0 ? (
                        <ul className="list-disc space-y-2 pl-5 text-slate-700">
                            {meeting.wardBusiness.map((item, index) => (
                                <li key={index}>{item.description}</li>
                            ))}
                        </ul>
                    ) : (
                        <p className="text-sm italic text-slate-500">No ward business to report.</p>
                    )}
                </div>
                <div className="rounded-xl border border-slate-200 bg-white p-5 shadow-sm sm:p-6">
                    <h2 className="mb-3 text-lg font-bold text-blue-900">Stake Business</h2>
                    <p className="text-slate-700">
                        {meeting.stakeBusiness
                            ? 'There is stake business to report.'
                            : 'No stake business to report.'}
                    </p>
                </div>
            </section>

            <section className="mt-6 rounded-xl border border-slate-200 bg-white p-5 shadow-sm sm:p-6">
                <h2 className="mb-4 text-xl font-bold text-blue-900">Speakers and Musical Numbers</h2>
                {meeting.speakers.length > 0 ? (
                    <div className="space-y-4">
                        {meeting.speakers.map((item, index) => (
                            <div key={index} className="rounded-lg border border-slate-200 bg-slate-50 p-4">
                                <p className="font-semibold text-slate-900">
                                    {item.type === 'speaker' ? 'Speaker' : 'Musical Number'}: {item.name}
                                </p>
                                {item.topic && (
                                    <p className="mt-1 text-sm text-slate-600">Topic: {item.topic}</p>
                                )}
                            </div>
                        ))}
                    </div>
                ) : (
                    <p className="text-sm italic text-slate-500">No speakers or musical numbers listed.</p>
                )}
            </section>

            <section className="mt-6 rounded-xl border border-slate-200 bg-white p-5 shadow-sm sm:p-6">
                <h2 className="mb-2 text-sm font-bold uppercase tracking-wide text-slate-500">Closing Prayer</h2>
                <p className="font-semibold text-slate-900">{meeting.closingPrayer}</p>
            </section>

            <div className="mt-8 flex flex-wrap justify-center gap-3 print:hidden">
                <Link
                    href={`/meetings/${meeting.id}/edit`}
                    className="inline-flex rounded-lg bg-amber-700 px-6 py-3 font-semibold text-white transition hover:bg-amber-800"
                >
                    Update Meeting
                </Link>
                <DeleteMeetingButton meetingId={meeting.id} />
            </div>

            <div className="flex justify-center pt-4 print:hidden">
                <button
                type="button"
                onClick ={() => window.print()}
                 className="w-full rounded-lg bg-blue-700 px-6 py-3 font-semibold text-white shadow-md transition hover:bg-blue-800 focus:outline-none focus:ring-4 focus:ring-blue-300 sm:w-auto"
                >
                Print Meeting Details
                </button>
            </div>
        </article>
    )
}