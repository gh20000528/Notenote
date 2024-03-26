"use client";

import { cn } from "@/lib/utils";
import { ChevronsLeft, MenuIcon, PlusCircle, Search, Settings } from "lucide-react";
import { usePathname } from "next/navigation";
import { ElementRef, useEffect, useRef, useState } from "react";
import { useMediaQuery } from 'usehooks-ts';
import { UserItem } from "./user-item";
import axios from 'axios';
import { useUser } from "@clerk/clerk-react";
import { Item } from "./item";
import { useDocument } from "../_store/documentContext";
import { toast } from 'sonner';
import { DocumentList } from "./document-list";

export const Navigation = () => {
    const { user } = useUser();
    const pathname = usePathname();
    const isMobile = useMediaQuery("(max-width: 768px)");
    const { createNote } = useDocument();
    const isResizingRef = useRef(false);
    const sidebarRef = useRef<ElementRef<"aside">>(null);
    const navbarRef = useRef<ElementRef<"div">>(null);
    const [isResetting, setIsResetting] = useState(false);
    const [isCollapsed, setIsCollapsed] = useState(isMobile);
    const [alldocument, setAllDocument] = useState([])

    // fetch alldocument api
    const allDocument = async () => {
        const userId = user?.id;
        try {
            const res = await axios.post('http://localhost:3000/api/document/getsidebar',{userId})
            console.log(res.data.data);
            setAllDocument(res.data.data)
        } catch (error) {
            console.log(error);
        }
    }
    useEffect(() => {
        allDocument()
    },[])

    // add note
    const handlerClick = () => {
        const promise = createNote(user?.id)
        allDocument()
        toast.promise(promise, {
            loading: "新增筆記 ...",
            success: "成功新增！！",
            error: "新增出現錯誤"
        })
    }
    /*
     使用 useEffect 來監聽 isMobile 的變化，如果是移動設備，
     則執行 collapse 函數來折疊側邊欄，
     否則執行 resetWidth 函數來重置側邊欄和導航欄的寬度。
     */
    useEffect(() => {
        if (isMobile) {
            collapse();
        } else {
            resetWidth();
        }
    },[isMobile]);


    /*
     使用 useEffect 來監聽 pathname 和 isMobile 的變化，
     如果是移動設備，則執行 collapse 函數來折疊側邊欄。
    */
    useEffect(() => {
        if (isMobile) {
            collapse();
        }
    }, [pathname, isMobile]);

    // 定義 handleMouseDown 函數，當在側邊欄上按下滑鼠時，設置 isResizingRef 為 true 並添加滑鼠移動和滑鼠放開的事件監聽器。
    const handleMouseDown = (
        event: React.MouseEvent<HTMLDivElement, MouseEvent>
    ) => {
        event.preventDefault();
        event.stopPropagation();

        isResizingRef.current = true;
        document.addEventListener("mousemove", handlerMouseMove);
        document.addEventListener("mouseup", handlerMouseUp);
    }

    // 定義 handlerMouseMove 函數，當滑鼠移動時，計算並設置側邊欄的新寬度，並同時調整導航欄的位置和寬度。
    const handlerMouseMove = (e: MouseEvent) => {
        if (!isResizingRef.current) return;
        let newWidth = e.clientX;

        if (newWidth < 240) newWidth = 240;
        if (newWidth > 480) newWidth = 480;

        if (sidebarRef.current && navbarRef.current) {
            sidebarRef.current.style.width = `${newWidth}px`;
            navbarRef.current.style.setProperty("left", `${newWidth}px`);
            navbarRef.current.style.setProperty("width", `calc(100% - ${newWidth}px)`)
        }
    }

    // 定義 handlerMouseUp 函數，當滑鼠放開時，移除滑鼠移動和滑鼠放開的事件監聽器，並設置 isResizingRef 為 false。
    const handlerMouseUp = () => {
        isResizingRef.current = false;
        document.removeEventListener("mousemove", handlerMouseMove);
        document.removeEventListener("mouseup", handlerMouseUp); 
    }

    // 定義 resetWidth 函數，用於重置側邊欄和導航欄的寬度，並在移動設備上將側邊欄寬度設置為 100%，導航欄寬度設置為 0。
    const resetWidth = () => {
        if (sidebarRef.current && navbarRef.current) {
            setIsCollapsed(false);
            setIsResetting(true);

            sidebarRef.current.style.width = isMobile ? "100%" : "240px";
            navbarRef.current.style.setProperty(
                "width",
                isMobile ? "0" : "calc(100% -240px)"
            );
            navbarRef.current.style.setProperty(
                "left",
                isMobile ? "100%" : "240px"
            );
            setTimeout(() => setIsResetting(false), 300);
        }
    };

    // 定義 collapse 函數，用於折疊側邊欄，將側邊欄寬度設置為 0，並將導航欄寬度設置為 100%。
    const collapse = () => {
        if (sidebarRef.current && navbarRef.current) {
            setIsCollapsed(true);
            setIsResetting(true);

            sidebarRef.current.style.width = "0";
            navbarRef.current.style.setProperty("width", "100%");
            navbarRef.current.style.setProperty("left", "0");
            setTimeout(() => setIsResetting(false), 300);
        }
    }



    return (
        <>
            <aside 
                ref={sidebarRef}
                className={
                    cn("group/sidebar h-full bg-secondary overflow-y-auto relative flex w-60 flex-col z-[99999]",
                    isResetting && "transition-all ease-in-out duration-300",
                    isMobile && "w-0"
                )}>
                <div 
                    onClick={collapse}
                    role="button"
                    className={cn(
                        "h-6 w-6 text-muted-foreground rounded-sm hover:bg-neutral-300 dark:hover:bg-neutral-600 absolute top-3 right-2 opacity-0 group-hover/sidebar:opacity-100 transition",
                        isMobile && "opacity-100"
                    )}>
                    <ChevronsLeft className="h-6 w-6"/>
                </div>
                <div>
                    <UserItem />
                    <Item label="Seaarch" icon={Search} isSearch onClick={() => {}} />
                    <Item label="Setting" icon={Settings} onClick={() => {}} />
                    <Item onClick={handlerClick} label="New page" icon={PlusCircle} />
                </div>
                <div className="mt-4">
                    <DocumentList />
                </div>
                <div 
                    onMouseDown={handleMouseDown} 
                    onClick={() => {}} 
                    className="opacity-0 group-hover/sidebar:opacity-100 transition cursor-ew-resize absolute h-full w-1 bg-primary/10 right-0 top-0" 
                />
            </aside>
            <div
                ref={navbarRef}
                className={cn(
                    "absolute top-0 z-[99999] left-60 w-[calc(100%-240%)]",
                    isResetting && "transition-all ease-in-out duration-300",
                    isMobile && "left-0 w-full"
                )}
            >
                <nav className="bg-transparent px-3 pt-2 w-full">
                    {isCollapsed && <MenuIcon onClick={resetWidth} role="button" className="h-6 w-6 text-muted-foreground" />}
                </nav>
            </div>
        </>
    )
}