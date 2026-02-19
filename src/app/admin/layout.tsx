import AdminHeader from "@/components/admin/header";
import { AdminSidebar } from "@/components/admin/sidebar";
import { SidebarInset, SidebarProvider } from "@/components/ui/sidebar";

export const dynamic = "force-dynamic";

export default function AdminLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <SidebarProvider>
            <AdminSidebar />
            <SidebarInset>
               <AdminHeader/>
                <div className="w-full p-7">
                    {children}
                </div>
            </SidebarInset>
        </SidebarProvider>
    );
}
