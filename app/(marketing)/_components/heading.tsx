"use client";

import { Spinner } from "@/components/spinner";
import { Button } from "@/components/ui/button";
import { useConvexAuth } from "convex/react";
import { ArrowRight } from "lucide-react";
import Link from "next/link";

export const Heading = () => {
    const { isAuthenticated, isLoading } = useConvexAuth();
    return (
        <div className="max-w-3xl space-y-4">
            <h1 className="text-3xl sm:text-5xl md:text-6xl font-bold">
                您的創意、文件、計劃，統一呈現。歡迎來到 <span className="underline">Notenote</span>
            </h1>
            <h3 className="text-base sm:text-xl md:text-2xl font-medium">
                Notenote 是一個聯結的工作空間 <br/>，
                讓更好、更快的工作成為可能
            </h3>
            {isLoading && (
                <div className="w-full flex items-center justify-center">
                    <Spinner size="lg" />
                </div>
            )}

            {isAuthenticated && !isLoading && (
                <Button asChild>
                    <Link href="/documents">
                        Enter Notenote
                        <ArrowRight className="h-4 w-4 ml-2"/>
                    </Link>
                </Button>
            )}

        </div>
    )
}