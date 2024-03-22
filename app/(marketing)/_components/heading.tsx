"use client";

import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";

export const Heading = () => {
    return (
        <div className="max-w-3xl space-y-4">
            <h1 className="text-3xl sm:text-5xl md:text-6xl font-bold">
                您的創意、文件、計劃，統一呈現。歡迎來到 <span className="underline">Notenote</span>
            </h1>
            <h3 className="text-base sm:text-xl md:text-2xl font-medium">
                Notenote 是一個聯結的工作空間 <br/>，
                讓更好、更快的工作成為可能
            </h3>
            <Button>
                Enter Notenote
                <ArrowRight className="h-4 w-4 ml-2"/>
            </Button>
        </div>
    )
}