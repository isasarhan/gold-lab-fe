import AccountHeader from "@/components/account/header";
import { AccountSidebar } from "@/components/account/sidebar";
import { SidebarInset, SidebarProvider } from "@/components/ui/sidebar";

export default function AdminLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <SidebarProvider>
            <AccountSidebar />
            <SidebarInset>
               <AccountHeader/>
                <div className="w-full p-7">
                    {children}
                </div>
            </SidebarInset>
        </SidebarProvider>
    );
}
