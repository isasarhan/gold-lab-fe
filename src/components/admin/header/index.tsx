'use client'
import type { FC } from 'react';
import SearchInput from "@/components/common/searchInput";
import { Button } from "@/components/ui/button";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Separator } from "@/components/ui/separator";
import { SidebarTrigger } from "@/components/ui/sidebar";
import { RefreshCcw, Search } from "lucide-react";
import { usePathname, useRouter } from 'next/navigation';

interface AdminHeaderProps { }

const AdminHeader: FC<AdminHeaderProps> = () => {
    const router = useRouter()
    const pathName = usePathname()

    const handleRefresh = () =>{
        router.push(pathName)
    }
    
    return (
        <header className="flex h-16 justify-between shrink-0 items-center gap-2 border-b mx-4">
            <div className="flex items-center">
                <SidebarTrigger />
                <Separator orientation="vertical" className="mr-2 h-4" />
            </div>
            <div className="flex justify-start gap-5">
                <Popover>
                    <PopoverTrigger asChild>
                        <Button
                            variant={"default"} className='text-white'>
                            <Search className="ml-auto h-4 w-4 text-white" />
                        </Button>
                    </PopoverTrigger>
                    <PopoverContent className="w-auto p-0 me-2 mt-2" align="start">
                        <SearchInput className='w-full' handleSearch={(query) => router.push(`${pathName}?query=${query}`)} />
                    </PopoverContent>
                </Popover>
                <Button
                    variant={"default"} className='text-white' onClick={handleRefresh}>
                    <RefreshCcw className="ml-auto h-4 w-4 text-white" />
                </Button>
            </div>
        </header>
    );
}

export default AdminHeader;
