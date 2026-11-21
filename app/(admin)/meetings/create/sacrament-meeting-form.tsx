
'use client';

import { useActionState, useState } from 'react';
import type { State } from '@/app/lib/actions';

type Hymn = {
    number: number;
    title: string;
};

type Speaker = {
    name: string;
    topic: string;
    type: 'speaker' | 'musical-number';
};

type WardBusiness = {
    description: string;
};

type Meeting = {
    date: string;
    meetingType: string;
    presiding: string;
    conducting: string;
    announcements?: string[];
    openingHymn: Hymn;
    openingPrayer: string;
    wardBusiness: WardBusiness[];
    stakeBusiness: boolean;
    sacramentHymn: Hymn;
    speakers: Speaker[];
    closingHymn: Hymn;
    closingPrayer: string;
};

type MeetingFormProps = {
    action: (
        prevState: State,
        formData: FormData
    ) => Promise<State>;
    meeting?: Meeting;
};

const initialState: State = {
    message: null,
    errors: {},
};

const inputClass =
    'block w-full rounded-md border border-slate-300 px-3 py-2 text-sm text-blue-950 outline-none ring-blue-500 focus:ring-2';

const labelClass =
    'mb-2 block text-sm font-medium text-slate-700';

function FieldErrors({
    id,
    errors,
}: {
    id: string;
    errors?: string[];
}) {
    return (
        <div id={id} aria-live="polite" aria-atomic="true">
            {errors?.map((error) => (
                <p key={error} className="mt-1 text-sm text-red-600">
                    {error}
                </p>
            ))}
        </div>
    );
}

export default function MeetingForm({
    action,
    meeting,
}: MeetingFormProps) {

    const [state, formAction, isPending] = useActionState(
        action,
        initialState
    );

    // Dynamic form fields
    const [announcements, setAnnouncements] = useState<string[]>(
        meeting?.announcements ?? ['']
    );

    const [speakers, setSpeakers] = useState<Speaker[]>(
        meeting?.speakers?.map((speaker) => ({
            ...speaker,
            type: speaker.type ?? 'speaker',
        })) ?? [{ name: '', topic: '', type: 'speaker' }]
    );

    const [wardBusiness, setWardBusiness] = useState<WardBusiness[]>(
        meeting?.wardBusiness ?? [{ description: '' }]
    );

    const [openingHymn, setOpeningHymn] = useState<Hymn>(
        meeting?.openingHymn ?? { number: 0, title: '' }
    );
    const [sacramentHymn, setSacramentHymn] = useState<Hymn>(
        meeting?.sacramentHymn ?? { number: 0, title: '' }
    );
    const [closingHymn, setClosingHymn] = useState<Hymn>(
        meeting?.closingHymn ?? { number: 0, title: '' }
    );

    // Add and remove announcements
    function addAnnouncement() {
        setAnnouncements([...announcements, '']);
    }

    function removeAnnouncement(index: number) {
        setAnnouncements(
            announcements.filter((_, i) => i !== index)
        );
    }

    // Add and remove speakers
    function addSpeaker() {
        setSpeakers([
            ...speakers,
            { name: '', topic: '', type: 'speaker' },
        ]);
    }

    function removeSpeaker(index: number) {
        setSpeakers(speakers.filter((_, i) => i !== index));
    }

    // Add and remove ward business
    function addWardBusiness() {
        setWardBusiness([
            ...wardBusiness,
            { description: '' },
        ]);
    }

    function removeWardBusiness(index: number) {
        setWardBusiness(
            wardBusiness.filter((_, i) => i !== index)
        );
    }

    return (
        <form
            action={formAction}
            noValidate
            className="space-y-6 rounded-lg border border-slate-200 bg-white p-6 shadow-sm"
        >
            <input type="hidden" name="announcements" value={announcements.join('\n')} />
            <input type="hidden" name="openingHymn" value={JSON.stringify(openingHymn)} />
            <input type="hidden" name="wardBusiness" value={JSON.stringify(wardBusiness)} />
            <input type="hidden" name="sacramentHymn" value={JSON.stringify(sacramentHymn)} />
            <input type="hidden" name="speakers" value={JSON.stringify(speakers)} />
            <input type="hidden" name="closingHymn" value={JSON.stringify(closingHymn)} />

            {/* Meeting Information */}
            <section className="space-y-4">
                <h2 className="text-lg font-semibold text-slate-800">
                    Meeting Information
                </h2>

                <div>
                    <label htmlFor="date" className={labelClass}>
                        Meeting Date
                    </label>
                    <input
                        id="date"
                        name="date"
                        type="date"
                        defaultValue={meeting?.date}
                        required
                        aria-describedby="date-error"
                        className={inputClass}
                    />
                    <FieldErrors id="date-error" errors={state.errors?.date} />
                </div>

                <div>
                    <label htmlFor="meetingType" className={labelClass}>
                        Meeting Type
                    </label>
                    <select
                        id="meetingType"
                        name="meetingType"
                        defaultValue={meeting?.meetingType ?? 'regular'}
                        required
                        aria-describedby="meetingType-error"
                        className={inputClass}
                    >
                        <option value="regular">Regular</option>
                        <option value="testimony">Testimony</option>
                        <option value="stake">Stake</option>
                        <option value="general">General</option>
                    </select>
                    <FieldErrors id="meetingType-error" errors={state.errors?.meetingType} />
                </div>

                <div>
                    <label htmlFor="presiding" className={labelClass}>
                        Presiding
                    </label>
                    <input
                        id="presiding"
                        name="presiding"
                        defaultValue={meeting?.presiding}
                        required
                        aria-describedby="presiding-error"
                        className={inputClass}
                    />
                    <FieldErrors id="presiding-error" errors={state.errors?.presiding} />
                </div>

                <div>
                    <label htmlFor="conducting" className={labelClass}>
                        Conducting
                    </label>
                    <input
                        id="conducting"
                        name="conducting"
                        defaultValue={meeting?.conducting}
                        required
                        aria-describedby="conducting-error"
                        className={inputClass}
                    />
                    <FieldErrors id="conducting-error" errors={state.errors?.conducting} />
                </div>
            </section>

            {/* Announcements */}
            <section className="space-y-4">
                <h2 className="text-lg font-semibold text-slate-800">
                    Announcements
                </h2>

                {announcements.map((announcement, index) => (
                    <div key={index} className="space-y-2">
                        <label htmlFor={`announcement-${index}`} className={labelClass}>
                            Announcement {index + 1}
                        </label>
                        <div className="flex gap-2">
                            <input
                                id={`announcement-${index}`}
                                value={announcement}
                                onChange={(e) => {
                                    const updated = [...announcements];
                                    updated[index] = e.target.value;
                                    setAnnouncements(updated);
                                }}
                                placeholder={`Announcement ${index + 1}`}
                                aria-describedby={`announcements-error-${index}`}
                                className={inputClass}
                            />

                            {announcements.length > 1 && (
                                <button
                                    type="button"
                                    onClick={() => removeAnnouncement(index)}
                                    className="rounded-md bg-red-100 px-3 text-red-700 hover:bg-red-200"
                                    aria-label={`Remove announcement ${index + 1}`}
                                >
                                    Remove
                                </button>
                            )}
                        </div>
                        <FieldErrors
                            id={`announcements-error-${index}`}
                            errors={state.errors?.announcements}
                        />
                    </div>
                ))}

                <button
                    type="button"
                    onClick={addAnnouncement}
                    className="rounded-md bg-blue-100 px-4 py-2 text-sm font-semibold text-blue-700 hover:bg-blue-200"
                >
                    + Add Announcement
                </button>
            </section>

            {/* Opening */}
            <section className="space-y-4">
                <h2 className="text-lg font-semibold text-slate-800">
                    Opening
                </h2>

                <div>
                    <label htmlFor="openingHymnNumber" className={labelClass}>
                        Opening Hymn Number
                    </label>
                    <input
                        id="openingHymnNumber"
                        type="number"
                        min="1"
                        value={openingHymn.number || ''}
                        onChange={(e) => setOpeningHymn({
                            ...openingHymn,
                            number: Number(e.target.value) || 0,
                        })}
                        required
                        aria-describedby="openingHymnNumber-error"
                        className={inputClass}
                    />
                    <FieldErrors
                        id="openingHymnNumber-error"
                        errors={state.errors?.openingHymn}
                    />
                </div>

                <div>
                    <label htmlFor="openingHymnTitle" className={labelClass}>
                        Opening Hymn Title
                    </label>
                    <input
                        id="openingHymnTitle"
                        value={openingHymn.title}
                        onChange={(e) => setOpeningHymn({
                            ...openingHymn,
                            title: e.target.value,
                        })}
                        required
                        aria-describedby="openingHymnTitle-error"
                        className={inputClass}
                    />
                    <FieldErrors
                        id="openingHymnTitle-error"
                        errors={state.errors?.openingHymn}
                    />
                </div>

                <div>
                    <label htmlFor="openingPrayer" className={labelClass}>
                        Opening Prayer
                    </label>
                    <input
                        id="openingPrayer"
                        name="openingPrayer"
                        defaultValue={meeting?.openingPrayer}
                        required
                        aria-describedby="openingPrayer-error"
                        className={inputClass}
                    />
                    <FieldErrors id="openingPrayer-error" errors={state.errors?.openingPrayer} />
                </div>
            </section>

            {/* Ward Business */}
            <section className="space-y-4">
                <h2 className="text-lg font-semibold text-slate-800">
                    Ward Business
                </h2>

                {wardBusiness.map((business, index) => (
                    <div key={index} className="space-y-2">
                        <label htmlFor={`ward-business-${index}`} className={labelClass}>
                            Ward Business {index + 1}
                        </label>
                        <div className="flex gap-2">
                            <input
                                id={`ward-business-${index}`}
                                value={business.description}
                                onChange={(e) => {
                                    const updated = [...wardBusiness];
                                    updated[index] = {
                                        description: e.target.value,
                                    };
                                    setWardBusiness(updated);
                                }}
                                placeholder={`Ward business ${index + 1}`}
                                required
                                aria-describedby={`wardBusiness-error-${index}`}
                                className={inputClass}
                            />

                            {wardBusiness.length > 1 && (
                                <button
                                    type="button"
                                    onClick={() => removeWardBusiness(index)}
                                    className="rounded-md bg-red-100 px-3 text-red-700 hover:bg-red-200"
                                    aria-label={`Remove ward business ${index + 1}`}
                                >
                                    Remove
                                </button>
                            )}
                        </div>
                        <FieldErrors
                            id={`wardBusiness-error-${index}`}
                            errors={state.errors?.wardBusiness}
                        />
                    </div>
                ))}

                <button
                    type="button"
                    onClick={addWardBusiness}
                    className="rounded-md bg-blue-100 px-4 py-2 text-sm font-semibold text-blue-700 hover:bg-blue-200"
                >
                    + Add Ward Business
                </button>

                <label htmlFor="stakeBusiness" className="flex items-center gap-2 text-sm text-slate-700">
                    <input
                        id="stakeBusiness"
                        name="stakeBusiness"
                        type="checkbox"
                        value="true"
                        defaultChecked={meeting?.stakeBusiness ?? false}
                        aria-describedby="stakeBusiness-error"
                        className="h-4 w-4 rounded border-slate-300"
                    />
                    Stake business scheduled
                </label>
                <FieldErrors id="stakeBusiness-error" errors={state.errors?.stakeBusiness} />
            </section>

            {/* Sacrament */}
            <section className="space-y-4">
                <h2 className="text-lg font-semibold text-slate-800">
                    Sacrament
                </h2>

                <div>
                    <label htmlFor="sacramentHymnNumber" className={labelClass}>
                        Sacrament Hymn Number
                    </label>
                    <input
                        id="sacramentHymnNumber"
                        type="number"
                        min="1"
                        value={sacramentHymn.number || ''}
                        onChange={(e) => setSacramentHymn({
                            ...sacramentHymn,
                            number: Number(e.target.value) || 0,
                        })}
                        required
                        aria-describedby="sacramentHymnNumber-error"
                        className={inputClass}
                    />
                    <FieldErrors
                        id="sacramentHymnNumber-error"
                        errors={state.errors?.sacramentHymn}
                    />
                </div>

                <div>
                    <label htmlFor="sacramentHymnTitle" className={labelClass}>
                        Sacrament Hymn Title
                    </label>
                    <input
                        id="sacramentHymnTitle"
                        value={sacramentHymn.title}
                        onChange={(e) => setSacramentHymn({
                            ...sacramentHymn,
                            title: e.target.value,
                        })}
                        required
                        aria-describedby="sacramentHymnTitle-error"
                        className={inputClass}
                    />
                    <FieldErrors
                        id="sacramentHymnTitle-error"
                        errors={state.errors?.sacramentHymn}
                    />
                </div>
            </section>

            {/* Speakers and Musical Numbers */}
            <section className="space-y-4">
                <h2 className="text-lg font-semibold text-slate-800">
                    Speakers and Musical Numbers
                </h2>

                {speakers.map((speaker, index) => (
                    <div
                        key={index}
                        className="space-y-3 rounded-md border border-slate-200 p-4"
                    >
                        <h3 className="font-medium text-slate-700">
                            Item {index + 1}
                        </h3>

                        <div>
                            <label htmlFor={`speaker-name-${index}`} className={labelClass}>
                                Name
                            </label>
                            <input
                                id={`speaker-name-${index}`}
                                value={speaker.name}
                                onChange={(e) => {
                                    const updated = [...speakers];
                                    updated[index] = {
                                        ...speaker,
                                        name: e.target.value,
                                    };
                                    setSpeakers(updated);
                                }}
                                className={inputClass}
                                required
                                aria-describedby={`speakers-error-${index}`}
                            />
                            <FieldErrors
                                id={`speakers-error-${index}`}
                                errors={state.errors?.speakers}
                            />
                        </div>

                        <div>
                            <label htmlFor={`speaker-topic-${index}`} className={labelClass}>
                                Topic
                            </label>
                            <input
                                id={`speaker-topic-${index}`}
                                value={speaker.topic}
                                onChange={(e) => {
                                    const updated = [...speakers];
                                    updated[index] = {
                                        ...speaker,
                                        topic: e.target.value,
                                    };
                                    setSpeakers(updated);
                                }}
                                className={inputClass}
                                aria-describedby={`speakers-error-${index}`}
                            />
                        </div>

                        <div>
                            <label htmlFor={`speaker-type-${index}`} className={labelClass}>
                                Type
                            </label>
                            <select
                                id={`speaker-type-${index}`}
                                value={speaker.type}
                                onChange={(e) => {
                                    const updated = [...speakers];
                                    updated[index] = {
                                        ...speaker,
                                        type: e.target.value as Speaker['type'],
                                    };
                                    setSpeakers(updated);
                                }}
                                className={inputClass}
                                aria-describedby={`speakers-error-${index}`}
                            >
                                <option value="speaker">Speaker</option>
                                <option value="musical-number">Musical Number</option>
                            </select>
                        </div>

                        {speakers.length > 1 && (
                            <button
                                type="button"
                                onClick={() => removeSpeaker(index)}
                                className="rounded-md bg-red-100 px-4 py-2 text-sm font-semibold text-red-700 hover:bg-red-200"
                                aria-label={`Remove speaker or musical number ${index + 1}`}
                            >
                                Remove Item
                            </button>
                        )}
                    </div>
                ))}

                <button
                    type="button"
                    onClick={addSpeaker}
                    className="rounded-md bg-blue-100 px-4 py-2 text-sm font-semibold text-blue-700 hover:bg-blue-200"
                >
                    + Add Speaker / Musical Number
                </button>
            </section>

            {/* Closing */}
            <section className="space-y-4">
                <h2 className="text-lg font-semibold text-slate-800">
                    Closing
                </h2>

                <div>
                    <label htmlFor="closingHymnNumber" className={labelClass}>
                        Closing Hymn Number
                    </label>
                    <input
                        id="closingHymnNumber"
                        type="number"
                        min="1"
                        value={closingHymn.number || ''}
                        onChange={(e) => setClosingHymn({
                            ...closingHymn,
                            number: Number(e.target.value) || 0,
                        })}
                        required
                        aria-describedby="closingHymnNumber-error"
                        className={inputClass}
                    />
                    <FieldErrors
                        id="closingHymnNumber-error"
                        errors={state.errors?.closingHymn}
                    />
                </div>

                <div>
                    <label htmlFor="closingHymnTitle" className={labelClass}>
                        Closing Hymn Title
                    </label>
                    <input
                        id="closingHymnTitle"
                        value={closingHymn.title}
                        onChange={(e) => setClosingHymn({
                            ...closingHymn,
                            title: e.target.value,
                        })}
                        required
                        aria-describedby="closingHymnTitle-error"
                        className={inputClass}
                    />
                    <FieldErrors
                        id="closingHymnTitle-error"
                        errors={state.errors?.closingHymn}
                    />
                </div>

                <div>
                    <label htmlFor="closingPrayer" className={labelClass}>
                        Closing Prayer
                    </label>
                    <input
                        id="closingPrayer"
                        name="closingPrayer"
                        defaultValue={meeting?.closingPrayer}
                        required
                        aria-describedby="closingPrayer-error"
                        className={inputClass}
                    />
                    <FieldErrors id="closingPrayer-error" errors={state.errors?.closingPrayer} />
                </div>
            </section>

            {/* General Error */}
            {state.message && (
                <p className="text-sm text-red-600" aria-live="polite">
                    {state.message}
                </p>
            )}

            {/* Submit */}
            <button
                type="submit"
                disabled={isPending}
                className="rounded-md bg-blue-600 px-4 py-2 text-sm font-semibold text-white transition hover:bg-blue-700 disabled:cursor-not-allowed disabled:opacity-60"
            >
                {isPending
                    ? 'Saving...'
                    : meeting
                        ? 'Update Meeting'
                        : 'Save Meeting'}
            </button>
        </form>
    );
}
