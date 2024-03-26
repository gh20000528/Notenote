"use client"

import { useParams, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import axios from 'axios';
import { useUser } from "@clerk/clerk-react";
import { Item } from "./item";
import { cn } from "@/lib/utils";
import { FileIcon } from "lucide-react";

interface DocumentListProps {
    parentDocumentId?: string;
    level?: number;
    data?: Document[];
}

interface Document {
    id: string;
    title: string;
    icon?: string;
    isArchived: boolean;
}

export const DocumentList = ({    
    parentDocumentId,
    level = 0
}: DocumentListProps) => {
    const { user } = useUser();
    const params = useParams();
    const router = useRouter();
    const [alldocument, setAllDocument] = useState<Document[]>([]);
    const [expanded, setExpanded] = useState<Record<string, boolean>>({});

    const onExpand = (documentId: string) => {
        setExpanded(prevExpanded => ({
            ...prevExpanded,
            [documentId]: !prevExpanded[documentId]
        }));
    };

    useEffect(() => {
        documents()
    },[])

    // fetch alldocument api
    const documents = async () => {
        const userId = user?.id;
        try {
            const res = await axios.post('http://localhost:3000/api/document/getsidebar',{userId, parentDocumentId})

            setAllDocument(res.data.data)
        } catch (error) {
            console.log(error);
        }
    }
    
    console.log(alldocument);
    

    const onRedirect = (documentId: string) => {
        router.push(`/documents/${documentId}`)
    }

    if (alldocument === undefined) {
        return (
            <>
                <Item.Skeleton level={level} />
                {level === 0 && (
                    <>
                        <Item.Skeleton level={level} />
                        <Item.Skeleton level={level} />
                    </>
                )}
            </>
        )
    }
    return (
        <>
            <p
                style={{
                    paddingLeft: level ? `${(level * 12) + 25}px` : undefined
                }}
                className={cn(
                    "hidden text-sm fot-medium text-muted-foreground/80",
                    expanded && "last:block",
                    level == 0 && "hidden"
                )}
            >
                No page inside
            </p>
            {
                alldocument.map((document) => (
                    <div key={document.id}>
                        <Item 
                            id={document.id}
                            onClick={() => onRedirect(document.id)}
                            label={document.title}
                            icon={FileIcon}
                            documentIcon={document.icon}
                            active={document.id === params?.documentId}
                            level={level}
                            onExpand={() => onExpand(document.id)}
                            expanded={expanded[document.id]}
                        />
                        {expanded[document.id] && (
                            <DocumentList 
                                parentDocumentId={document.id}
                                level={level + 1}
                            />
                        )}
                    </div>
                ))
            }
        </>
    )
}