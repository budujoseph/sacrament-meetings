'use client';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

export default function NavLinks() {
    const pathname = usePathname();

    return (
            <nav aria-label="Primary">
                <ul className="flex space-x-4 justify-center">
                    <li><Link href="/"
                    className={pathname === '/' ? 'active' : 'hover:text-black'}>
                        Home
                    </Link></li>
                    <li><Link href="/meetings" className={pathname === '/meetings' ? 'active' : 'hover:text-black'}>
                        Meetings
                    </Link></li>
                    <li><Link href="/meetings/current" className={pathname === '/meetings/current' ? 'active' : 'hover:text-black'}>
                        Current Meeting
                    </Link></li>
                </ul>
            </nav>
    )
}