'use client'

import type { SacramentMeeting } from '@/lib/types';

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
        <article className='mx-auto max-w-5xl px-4 py-8 sm:px-6 lg:px-8'>
            <header  className='mb-8 overflow-hidden rounded-2xl bg-gradient-to-r from-blue-900 to-blue-700 p-6 text-white shadow-lg sm:p-10 font-bold'>
                <h1 className="mb-3 text-3xl font-bold sm:text-4xl">
                    Sacrament Meeting
                </h1>
                <p className="text-blue-100">
                    {formattedDate}
                </p>
                <p className="mt-4 inline-block rounded-full bg-white/20 px-4 py-1.5 text-sm font-medium capitalize">
                    {meeting.meetingType} Meeting
                </p>
            </header>

            <section className="mb-6 grid gap-4 sm:grid-cols-2">
                <p className="mb-6 grid gap-4 sm:grid-cols-2">
                    <strong  className="text-sm uppercase tracking-wide text-gray-500">Presiding:</strong> {meeting.presiding}
                </p>
                <p className="block mt-2 text-lg font-semibold text-gray-500">
                    <strong  className="text-sm uppercase tracking-wide text-gray-500">Conducting:</strong> {meeting.conducting}
                </p>
            </section>

            {meeting.announcements && meeting.announcements.length > 0 && (
                <section className="rounded-xl border p-6">
                    <h2 className="mb-3 text-xl font-bold">Announcements</h2>
                    <ul className="list-inside list-disc space-y-2">
                        {meeting.announcements.map((announcement, index) => (
                            <li key={index}>{announcement}</li>
                        ))}
                    </ul>
                </section>
            )}

            <section  className="rounded-xl mt-2 border border-gray-200 p-6 shadow-sm">
                <h2 className="mb-3 text-lg font-bold">Opening Hymn</h2>
                <p className="text-gray-700">
                    {meeting.openingHymn.number} - {meeting.openingHymn.title}
                </p>
            </section>

            <section className="rounded-xl mt-2 border border-gray-200 bg-white p-6 shadow-sm">
                <h2 className="mb-3 text-lg font-bold text-blue-900">Opening Prayer</h2>
                <p className="text-gray-700">
                    {meeting.openingPrayer}
                </p>
            </section>

            <section className="rounded-xl mt-2 border border-gray-200 bg-white p-6 shadow-sm">
                <h2 className="mb-3 text-lg font-bold text-blue-900">Ward Business</h2>
                {meeting.wardBusiness.length > 0 ? (
                    <ul className="list-inside list-disc space-y-2 text-gray-700">
                        {meeting.wardBusiness.map((item, index) => (
                            <li key={index}>{item.description}</li>
                        ))}
                    </ul>
                ) : (
                    <p className="text-sm italic text-gray-500 text-muted">No ward business to report.</p>
                )}
            </section>

            <section className="rounded-xl mt-2 border border-gray-200 bg-white p-6 shadow-sm">
                <h2 className="mb-3 text-lg font-bold text-blue-900">Stake Business</h2>
                <p className="text-gray-700">
                    {meeting.stakeBusiness ? 'There is stake business to report.' : 'No stake business to report.'}
                </p>
            </section>

            <section  className="rounded-xl mt-2 border border-gray-200 bg-white p-6 shadow-sm">
                <h2 className="mb-3 text-lg font-bold text-blue-900">Sacrament Hymn</h2>
                <p className="text-gray-700">
                    {meeting.sacramentHymn.number} - {meeting.sacramentHymn.title}
                </p>
            </section>

            <section className="rounded-xl mt-2 border border-gray-200 bg-white p-6 shadow-sm">
                <h2 className="mb-4 text-lg font-bold text-blue-900">Speakers and Musical numbers</h2>
                <div className="space-y-4 sm:grid sm:grid-cols-2 sm:gap-4 sm:space-y-0">
                    {meeting.speakers.map((item, index) => (
                        <div key={index} className="rounded-lg bg-gray-50 p-4">
                            {item.type === "speaker" ? (
                             <>
                                <p className="font-semibold text-gray-900">
                                    Speaker: {item.name}
                                </p>

                                <p className="text-muted mt-1 text-sm text-gray-600">
                                    Topic: {item.topic}
                                </p>
                                 </>
                            ) : (
                             <>
                                <p className="font-semibold text-gray-900">
                                    Musical Number: {item.name}
                                </p>

                                {item.topic && (
                                    <p className="text-muted mt-1 text-sm text-gray-600">
                                        {item.topic}
                                    </p>
                                )}
                            </>
                        )}
                    </div>
                ))}
                </div>
            </section>

            <section  className="rounded-xl mt-2 border border-gray-200 bg-white p-6 shadow-sm">
                <h2 className="mb-3 text-lg font-bold text-blue-900">Closing Hymn</h2>
                <p  className="text-gray-700">
                    {meeting.closingHymn.number} - {meeting.closingHymn.title}
                </p>
            </section>

            <section className="rounded-xl mt-2 border border-gray-200 bg-white p-6 shadow-sm">
                <h2 className="mb-3 text-lg font-bold text-blue-900">Closing Prayer</h2>
                <p className="text-gray-700">
                    {meeting.closingPrayer}
                </p>
            </section>

            <div className="flex justify-center pt-4 print:hidden">
                <button
                type="button"
                onClick ={() => window.print()}
                 className="w-full rounded-lg bg-blue-700 px-6 py-3 font-semibold text-white shadow-md transition hover:bg-blue-800 
                            focus:outline-none focus:ring-4 focus:ring-blue-300 sm:w-auto"
                >
                Print Meeting Details
                </button>
            </div>
        </article>
    )
}