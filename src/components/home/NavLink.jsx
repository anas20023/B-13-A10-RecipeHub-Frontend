'use client'
import Link from "next/link"
import { usePathname } from "next/navigation"

const NavLink = ({ children, link, className = '', onClick }) => {
    const pathname = usePathname()
    const isActive = pathname === link

    return (
        <Link
            href={link}
            onClick={onClick}
            aria-current={isActive ? 'page' : undefined}
            className={`relative inline-block no-underline transition-all duration-300 py-1.5 px-1
                after:absolute after:bottom-0 after:left-1/2 after:-translate-x-1/2 after:h-0.75 after:rounded-full
                after:bg-orange-600 dark:after:bg-orange-500 after:transition-all after:duration-300
                ${isActive
                    ? 'text-orange-600 dark:text-orange-500 after:w-full'
                    : 'text-stone-700 dark:text-zinc-400 after:w-0 hover:text-orange-600 dark:hover:text-orange-500 hover:after:w-full'
                } ${className}`}
        >
            {children}
        </Link>
    )
}

export default NavLink