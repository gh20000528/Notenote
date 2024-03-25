"use client"

import { Button } from "@/components/ui/button";
import { useMutation } from "convex/react";
import { api } from '@/convex/_generated/api';
import { toast } from 'sonner';
import axios from 'axios';
import { PlusCircle } from "lucide-react";
import Image from "next/image";
import { useUser } from "@clerk/clerk-react";

const Documents = () => {
    // egt user info
    const { user } = useUser();
    // fetch new note api
    const createNote = async () => {
        const notedata = {
            title: "Untitled",
            userId: `${user?.id}`,
            parentdocumentId: null
        }
        try {
            const res = await axios.post('http://localhost:3000/api/document/create', {notedata})

        } catch (error) {
            console.log(error);
        }
    }

    // add note click
    const handlerClick = () => {
        const promise = createNote()

        toast.promise(promise, {
            loading: "新增筆記 ...",
            success: "成功新增！！",
            error: "新增出現錯誤"
        })
    }
    return (
        <div className="h-full flex flex-col items-center justify-center space-y-4">
            <Image
                src="/empty.png"
                height="300"
                width="300"
                alt="Empty"
                className="dark:hidden"
            />
            <Image
                src="/empty-dark.png"
                height="300"
                width="300"
                alt="Empty"
                className="hidden dark:block"
            />
            <h2>
                {/* 歡迎{user?.firstName}&apos;的 Notenote */}
            </h2>
            <Button onClick={handlerClick}>
                <PlusCircle className="h-4 w-4 mr-2" />
                新增note
            </Button>
        </div>
    );
}

export default Documents;