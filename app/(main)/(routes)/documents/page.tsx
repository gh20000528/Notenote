import { Button } from "@/components/ui/button";
import { useUser } from "@clerk/clerk-react";
import { PlusCircle } from "lucide-react";
import Image from "next/image";

const Documents = () => {
    // const { user } = useUser();
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
            <Button>
                <PlusCircle className="h-4 w-4 mr-2" />
                新增note
            </Button>
        </div>
    );
}

export default Documents;