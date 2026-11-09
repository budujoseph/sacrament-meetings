import type { SacramentMeeting } from './types';


export default function getNextSundayDate(weeksAhead: number = 0) {
    const today = new Date();
    const sunday = new Date(today);

    // Get the next Sunday (or today if today is Sunday)
    sunday.setDate(today.getDate() + (7 - today.getDay()) % 7);

     // Move forward by the requested number of weeks
    sunday.setDate(sunday.getDate() + weeksAhead * 7);

    return [
        sunday.getFullYear(),
        String(sunday.getMonth() + 1).padStart(2, "0"),
        String(sunday.getDate()).padStart(2, "0"),
    ].join("-");
}


const meetings: SacramentMeeting[] = [
  {
    id: 1,
    date: getNextSundayDate(0),
    meetingType: 'regular',
    presiding: 'Bishop Smith',
    conducting: 'Brother Jones',
    openingHymn: { number: 2, title: 'The Spirit of God' },
    openingPrayer: 'Sister Williams',
    wardBusiness: [{ description: 'Sustaining of new Primary president' }],
    stakeBusiness: false,
    sacramentHymn: { number: 169, title: "In Remembrance of Thy Suffering" },
    speakers: [
      { name: 'Sister Brown', topic: 'Faith in Jesus Christ', type: 'speaker' },
      { name: 'Youth Choir', topic: '', type: 'musical-number' }
    ],
    closingHymn: { number: 31, title: 'O God, Our Help in Ages Past' },
    closingPrayer: 'Brother Davis',
    announcements: ['Ward temple night: May 10']
    },
    {
        id: 2,
        date: getNextSundayDate(1),
        meetingType: 'stake',
        presiding: 'Stake President Johnson',
        conducting: 'Brother Lee',
        openingHymn: { number: 3, title: 'Now Let Us Rejoice' },
        openingPrayer: 'Brother Wilson',
        wardBusiness: [],
        stakeBusiness: true,
        sacramentHymn: { number: 169, title: "In Remembrance of Thy Suffering" },
        speakers: [
            { name: 'Stake President Johnson', topic: 'Leadership in the Church', type: 'speaker' },
            { name: 'Sister Martinez', topic: 'Service and Charity', type: 'speaker' }
        ],
        closingHymn: { number: 31, title: 'O God, Our Help in Ages Past' },
        closingPrayer: 'Brother Lee',
        announcements: ['Stake conference: May 10-12']
    },
    {
        id: 3,
        date: getNextSundayDate(2),
        meetingType: 'testimony',
        presiding: 'Bishop Smith',
        conducting: 'Brother Jones',
        openingHymn: { number: 4, title: 'Come, Follow Me' },
        openingPrayer: 'Sister Brown',
        wardBusiness: [],
        stakeBusiness: false,
        sacramentHymn: { number: 169, title: "In Remembrance of Thy Suffering" },
        speakers: [
            { name: 'Sister Brown', topic: 'Faith in Jesus Christ', type: 'speaker' }
        ],
        closingHymn: { number: 31, title: 'O God, Our Help in Ages Past' },
        closingPrayer: 'Brother Jones',
        announcements: ['Testimony meeting: May 17']
    },
    {
        id: 4,
        date: getNextSundayDate(3),
        meetingType: 'general',
        presiding: 'Bishop Smith',
        conducting: 'Brother Lee',
        openingHymn: { number: 5, title: 'The Spirit of God' },
        openingPrayer: 'Sister Martinez',
        wardBusiness: [],
        stakeBusiness: false,
        sacramentHymn: { number: 169, title: "In Remembrance of Thy Suffering" },
        speakers: [
            { name: 'Brother Lee', topic: 'The Importance of Prayer', type: 'speaker' }
        ],
        closingHymn: { number: 31, title: 'O God, Our Help in Ages Past' },
        closingPrayer: 'Brother Lee',
        announcements: ['General conference: May 24-26']
    },
    {
        id: 5,
        date: getNextSundayDate(4),
        meetingType: 'regular',
        presiding: 'Bishop Smith',
        conducting: 'Brother Davis',
        openingHymn: { number: 6, title: 'Come, Follow Me' },
        openingPrayer: 'Sister Williams',
        wardBusiness: [{ description: 'Sustaining of new Relief Society president' }],
        stakeBusiness: false,
        sacramentHymn: { number: 169, title: "In Remembrance of Thy Suffering" },
        speakers: [
            { name: 'Sister Williams', topic: 'The Importance of Service', type: 'speaker' }
        ],
        closingHymn: { number: 31, title: 'O God, Our Help in Ages Past' },
        closingPrayer: 'Brother Davis',
        announcements: ['Regular meeting: May 31']
    }
];

export function getMeetings(date?: string | null): SacramentMeeting[] {
  if (date) return meetings.filter(m => m.date === date);
  return meetings;
}

export function getMeetingById(id: number): SacramentMeeting | null {
  return meetings.find(m => m.id === id) ?? null;
}