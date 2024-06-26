"use client"

import { useScrollTop } from '@/hooks/use-scroll-top';
import { ModeToggle } from '@/components/mode-toggle';
import { cn } from '@/lib/utils';
import { useConvexAuth } from 'convex/react';
import { SignInButton, UserButton } from '@clerk/clerk-react';
import { Button } from '@/components/ui/button';
import { Spinner } from '@/components/spinner';
import Link from 'next/link';

export const Navbar = () => {
    const { isAuthenticated, isLoading } = useConvexAuth()
    const scrolled = useScrollTop();

    return (
        <div className={cn(
            "z-50 bg-background fixed top-0 flex items-center w-full p-6 dark:bg-[#1F1F1F]",
            scrolled && "border-b shadow-sm"
        )}>
            <span className='font-bold text-xl hidden md:flex items-center gap-x-2 dark:text-white'>Notenote</span>
            <div className='md:ml-auto md:justify-end justify-between w-full flex items-center gap-x-2'>
                <ModeToggle/>
                { isLoading && (
                    <Spinner />
                )}
                { !isAuthenticated && !isLoading && (
                    <>
                        <SignInButton mode='modal'>
                            <Button variant="ghost" size="sm">登入</Button>
                        </SignInButton>
                    </>
                )}
                { isAuthenticated && !isLoading && (
                    <>
                        <Button variant="ghost" size="sm" asChild>
                            <Link href="/documents">
                                Enter Notenote
                            </Link>
                        </Button>
                        <UserButton afterSignOutUrl='/' />
                    </>
                )}
            </div>
        </div>
    )
} 