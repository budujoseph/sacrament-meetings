'use client';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

export default function NavLinks() {
    const pathname = usePathname();
    console.log("Pathname:", pathname);

    return (
            <nav aria-label="Primary">
                <ul className="flex space-x-4 justify-center justify-center gap-2">
                    <li>
                        <Link
                            href="/"
                            className={`rounded-lg px-4 py-2 font-medium transition-colors duration-200 ${
                            pathname === "/"
                            ? "bg-white text-blue-700 shadow-sm"
                            : "text-white hover:bg-blue-800 hover:text-white"
                            }`}
                        >
                            Home
                        </Link>
                    </li>
                    
                    <li>
                        <Link
                            href="/meetings"
                            className={`rounded-lg px-4 py-2 font-medium transition-colors duration-200 ${
                            pathname === "/meetings"
                            ? "bg-white text-blue-700 shadow-sm"
                            : "text-white hover:bg-blue-800 hover:text-white"
                            }`}
                        >
                            Meetings
                        </Link>
                    </li>
                
                    <li>
                        <Link
                            href="/meetings/current"
                            className={`rounded-lg px-4 py-2 font-medium transition-colors duration-200 ${
                            pathname === "/meetings/current"
                            ? "bg-white text-blue-700 shadow-sm"
                            : "text-white hover:bg-blue-800 hover:text-white"
                            }`}
                        >
                            Current Meeting
                        </Link>
                    </li>
                </ul>
            </nav>
    )
}