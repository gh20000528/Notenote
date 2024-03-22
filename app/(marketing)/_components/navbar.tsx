"use client"

import { useScrollTop } from '@/hooks/use-scroll-top';
import { ModeToggle } from '@/components/mode-toggle';
import { cn } from '@/lib/utils';

export const Navbar = () => {
    const scrolled = useScrollTop();

    return (
        <div className={cn(
            "z-50 bg-background fixed top-0 flex items-center w-full p-6 dark:bg-[#1F1F1F]",
            scrolled && "border-b shadow-sm"
        )}>
            <span className='font-bold text-xl hidden md:flex items-center gap-x-2 dark:text-white'>Notenote</span>
            <div className='md:ml-auto md:justify-end justify-between w-full flex items-center gap-x-2'>
                <ModeToggle/>
                Login
            </div>
        </div>
    )
} 