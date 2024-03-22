import { Button } from '@/components/ui/button';

export const Footer = () => {
    return (
        <div className="flex items-center w-full  p-6 bg-background z-50 dark:bg-[#1F1F1F]">
            <span className="font-bold hidden md:flex items-center gap-x-2 dark:text-white">Notenote</span>
            <div className='md:ml-auto w-full justify-between md:justify-end flex items-center gap-x-2 text-muted-foreground'>
                <Button variant="ghost" size="sm">
                    隱私權政策
                </Button>
                <Button variant="ghost" size="sm">
                    條款與條件
                </Button>
            </div>
        </div>
    )   
}