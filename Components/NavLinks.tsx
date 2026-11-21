'use client';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

export default function NavLinks() {
    const pathname = usePathname();

    return (
            <nav aria-label="Primary" className="w-full lg:w-auto">
                <ul className="flex flex-wrap justify-center gap-2 lg:flex-nowrap">
                    <li>
                        <Link
                            href="/"
                            className={`inline-flex shrink-0 whitespace-nowrap rounded-lg px-4 py-2 font-medium transition-colors duration-200 ${
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
                            className={`inline-flex shrink-0 whitespace-nowrap rounded-lg px-4 py-2 font-medium transition-colors duration-200 ${
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
                            className={`inline-flex shrink-0 whitespace-nowrap rounded-lg px-4 py-2 font-medium transition-colors duration-200 ${
                            pathname === "/meetings/current"
                            ? "bg-white text-blue-700 shadow-sm"
                            : "text-white hover:bg-blue-800 hover:text-white"
                            }`}
                        >
                            Current Meeting
                        </Link>
                    </li>
                    
                
                      <li>
                        <Link
                            href="/meetings/create"
                            className={`inline-flex shrink-0 whitespace-nowrap rounded-lg px-4 py-2 font-medium transition-colors duration-200 ${
                            pathname === "/meetings/create"
                            ? "bg-white text-blue-700 shadow-sm"
                            : "text-white hover:bg-blue-800 hover:text-white"
                            }`}
                        >
                            Add Meeting
                        </Link>
                    </li>
                </ul>
            </nav>
    )
}