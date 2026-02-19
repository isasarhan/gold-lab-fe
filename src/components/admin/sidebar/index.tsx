"use client";
import * as React from "react";
import { ChevronRight, GalleryVerticalEnd } from "lucide-react";

import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarMenuSub,
  SidebarRail,
} from "@/components/ui/sidebar";
import { usePathname } from "next/navigation";
import { generateSidebar } from "./data";
import { Button } from "../../ui/button";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";
import Link from "next/link";
import { signOut, useSession } from "next-auth/react";

export function AdminSidebar({
  ...props
}: React.ComponentProps<typeof Sidebar>) {
  const pathName = usePathname();
  const data = generateSidebar(pathName);
  return (
    <Sidebar {...props}>
      <SidebarHeader>
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton size="lg" asChild>
              <Link href={"/admin/dashboard"}>
                <Button variant="default" size="icon">
                  <GalleryVerticalEnd />
                </Button>
                <div className="flex flex-col gap-0.5 leading-none">
                  <span className="font-semibold">Gold Lab Management App</span>
                </div>
              </Link>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarHeader>
      <SidebarContent>
        <SidebarGroup>
          <SidebarMenu>
            {data.navMain.map((item) => (
              <Collapsible
                key={item.title}
                title={item.title}
                defaultOpen
                className="group/collapsible"
              >
                <SidebarGroup>
                  <SidebarGroupLabel
                    asChild
                    className="group/label text-sm text-sidebar-foreground hover:bg-sidebar-accent hover:text-sidebar-accent-foreground"
                  >
                    <CollapsibleTrigger>
                      <SidebarMenuButton asChild>
                        <Link href={item.url}>
                          {"icon" in item && item.icon} {item.title}
                        </Link>
                      </SidebarMenuButton>

                      {item?.items && (
                        <ChevronRight className="ml-auto transition-transform group-data-[state=open]/collapsible:rotate-90" />
                      )}
                    </CollapsibleTrigger>
                  </SidebarGroupLabel>
                  {item?.items && (
                    <CollapsibleContent>
                      <SidebarGroupContent>
                        <SidebarMenuSub>
                          {item?.items?.map((item) => (
                            <SidebarMenuItem
                              key={item.title}
                              className="my-1.5 "
                            >
                              <SidebarMenuButton
                                asChild
                                isActive={item.isActive}
                              >
                                <Link href={item.url}>
                                  {"icon" in item && item.icon}
                                  <span> {item.title}</span>
                                </Link>
                              </SidebarMenuButton>
                            </SidebarMenuItem>
                          ))}
                        </SidebarMenuSub>
                      </SidebarGroupContent>
                    </CollapsibleContent>
                  )}
                </SidebarGroup>
              </Collapsible>
            ))}
          </SidebarMenu>
        </SidebarGroup>
      </SidebarContent>
      <SidebarRail />
      <SidebarFooter>
        <Button className="m-4" onClick={() => signOut()}>
          LOGOUT
        </Button>
      </SidebarFooter>
    </Sidebar>
  );
}
