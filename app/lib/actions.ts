'use server'

import { z } from 'zod';
import { redirect } from 'next/navigation';
import { revalidatePath } from 'next/cache';

import {
    addMeeting,
    updateMeeting as updateMeetingInDB,
    deleteMeeting as deleteMeetingFromDB
} from '@/lib/meetings-db';

const HymnSchema = z.object({
    number: z.coerce.number().int().positive(),
    title: z.string().min(1, 'Hymn title is required'),
});

const SpeakerSchema = z.object({
    name: z.string().min(1, 'Name is required'),
    topic: z.string(),
    type: z.enum(['speaker', 'musical-number']).default('speaker'),
})

const wardBusinessSchema = z.array(
    z.object({
        description: z.string().min(1),
    })
);

function parseJSON(value: unknown) {
    if (typeof value !== 'string') return value;

    try {
        return JSON.parse(value);
    } catch {
        return value;
    }
}

const MeetingFormSchema = z.object({
    date: z.string()
        .min(1, 'Date is required')
        .pipe(z.iso.date('Date must be a valid calendar date')),

    meetingType: z.enum([
        'testimony',
        'regular',
        'stake',
        'general',
    ]),

    presiding: z.string().min(1, 'Presiding is required'),
    conducting: z.string().min(1, 'Conducting is rquired'),

    announcements: z.preprocess(
        (value) =>
            typeof value === 'string'
                ? value.split('\n').map((item) => item.trim()).filter(Boolean)
                : value,
        z.array(z.string())
    ),

    openingHymn: z.preprocess(
        parseJSON,
        HymnSchema
    ),

    openingPrayer: z.string().min(1, 'Opening prayer is required'),

    wardBusiness: z.preprocess(
        parseJSON,
        wardBusinessSchema
    ),

    stakeBusiness: z.preprocess(
        (value) => value === 'on' || value === 'true' || value === true,
        z.boolean()
    ),

    sacramentHymn: z.preprocess(
        parseJSON,
        HymnSchema
    ),

    speakers: z.preprocess(
        parseJSON,
        z.array(SpeakerSchema)
    ),

    closingHymn: z.preprocess(
        parseJSON,
        HymnSchema
    ),

    closingPrayer: z.string().min(1),

});

export type State = {
    errors?: {
        date?: string[],
        meetingType?: string[];
        presiding?: string[];
        conducting?: string[];
        announcements?: string[];
        openingHymn?: string[];
        openingPrayer?: string[];
        wardBusiness?: string[];
        stakeBusiness?: string[];
        sacramentHymn?: string[];
        speakers?: string[];
        closingHymn?: string[];
        closingPrayer?: string[];
    };

    message?: string | null; 
}

export async function createMeeting(
    prevState: State,
    formData: FormData
    ): Promise<State> {

    const validatedFields = MeetingFormSchema.safeParse({
        date: formData.get('date'),
        meetingType: formData.get('meetingType'),
        presiding: formData.get('presiding'),
        conducting: formData.get('conducting'),
        announcements: formData.get('announcements'),
        openingHymn: formData.get('openingHymn'),
        openingPrayer: formData.get('openingPrayer'),
        wardBusiness: formData.get('wardBusiness'),
        stakeBusiness: formData.get('stakeBusiness'),
        sacramentHymn: formData.get('sacramentHymn'),
        speakers: formData.get('speakers'),
        closingHymn: formData.get('closingHymn'),
        closingPrayer: formData.get('closingPrayer'),
    });

    if (!validatedFields.success) {
        return {
            errors: z.flattenError(validatedFields.error).fieldErrors,
            message: 'Missing or invalid fields. Failed to create meeting',
        };
    }

    try {
        await addMeeting(validatedFields.data)
    } catch (error) {
        console.error('Error creating meeting', error);
        return {
            message: 'Failed to create meeting. Please check form fields and try again',
        }
    }

    revalidatePath('/meetings');
    revalidatePath('/');

    redirect('/meetings');
}

export async function updateMeeting(
    id: number,
    prevState: State,
    formData: FormData
): Promise<State> {

    const validatedFields = MeetingFormSchema.safeParse({
        date: formData.get('date'),
        meetingType: formData.get('meetingType'),
        presiding: formData.get('presiding'),
        conducting: formData.get('conducting'),
        announcements: formData.get('announcements'),
        openingHymn: formData.get('openingHymn'),
        openingPrayer: formData.get('openingPrayer'),
        wardBusiness: formData.get('wardBusiness'),
        stakeBusiness: formData.get('stakeBusiness'),
        sacramentHymn: formData.get('sacramentHymn'),
        speakers: formData.get('speakers'),
        closingHymn: formData.get('closingHymn'),
        closingPrayer: formData.get('closingPrayer'),
    });

    if (!validatedFields.success) {
         return {
            errors: z.flattenError(validatedFields.error).fieldErrors,
            message: 'Missing or invalid fields. Failed to update meeting',
        };
    }

    try {
        const updateMeeting = await updateMeetingInDB(id, validatedFields.data);
        if (!updateMeeting) {
            return {
                message: 'Meeting not found'
            };
        }
    } catch (error) {
        console.error('Failed to update meeting', error)
        return {
            message: 'Failed to update meeting. Please check form fields and try again',
        }
    }

    revalidatePath('/meetings');
    revalidatePath('/');
    revalidatePath(`/meetings/${id}`);

    redirect('/meetings');
}

export async function deleteMeeting(id: number) {
    try {
        const deleted = await deleteMeetingFromDB(id);

        if (!deleted) {
            return {
                message: 'Meeting not found or could not be deleted.',
            };
        }
    } catch (error) {
        console.error('Error deleting meeting:', error);

        return {
            message: 'Failed to delete meeting. Please try again.',
        };
    }

    revalidatePath('/meetings');
    revalidatePath('/');

    redirect('/meetings');
}
