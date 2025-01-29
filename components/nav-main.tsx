"use client";

import { ChevronRight, type LucideIcon } from "lucide-react";
import Link from "next/link"; // Import Link from Next.js
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";
import {
  SidebarGroup,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarMenuSub,
  SidebarMenuSubButton,
  SidebarMenuSubItem,
} from "@/components/ui/sidebar";
import { useRouter, usePathname } from "next/navigation";

export function NavMain({
  items,
  menuName,
}: {
  items: {
    title: string;
    url: string;
    icon?: LucideIcon;
    items?: {
      title: string;
      url: string;
    }[];
  }[];
  menuName?: string;
}) {
  const router = useRouter();
  const pathname = usePathname(); // Get current path from Next.js router

  // Function to check if the current menu item matches the active URL
  const isActive = (url: string) => pathname === url;

  const handleMenuClick = (url: string) => {
    router.push(url);
  };

  return (
    <SidebarGroup>
      <SidebarGroupLabel>{menuName}</SidebarGroupLabel>
      <SidebarMenu>
        {items.map((item) => (
          <Collapsible
            key={item.title}
            asChild
            defaultOpen={pathname.startsWith(item.url)}
            className="group/collapsible"
          >
            <SidebarMenuItem>
              <CollapsibleTrigger asChild>
                <SidebarMenuButton
                  tooltip={item.title}
                  className={`flex items-center gap-2 rounded-lg px-2 py-2 ${
                    isActive(item.url)
                      ? "bg-[#192130] text-[#12B981]" // Active state styles
                      : "text-gray-400 hover:bg-[#192130] hover:text-gray-200" // Default and hover styles
                  }`}
                  onClick={() => handleMenuClick(item.url)}
                >
                  {item.icon && <item.icon />}
                  <span>{item.title}</span>
                  {item.items && (
                    <ChevronRight className="ml-auto transition-transform duration-200 group-data-[state=open]/collapsible:rotate-90" />
                  )}
                </SidebarMenuButton>
              </CollapsibleTrigger>
              {item.items && (
                <CollapsibleContent>
                  <SidebarMenuSub>
                    {item.items.map((subItem) => (
                      <SidebarMenuSubItem key={subItem.title}>
                        <SidebarMenuSubButton asChild>
                          <Link
                            href={subItem.url}
                            className={`flex items-center gap-2 rounded-lg px-2 py-2 ${
                              isActive(subItem.url)
                                ? "bg-[#192130] text-white" // Active state styles
                                : "text-gray-500 hover:bg-[#192130] hover:text-gray-200" // Default and hover styles
                            }`}
                          >
                            <span>{subItem.title}</span>
                          </Link>
                        </SidebarMenuSubButton>
                      </SidebarMenuSubItem>
                    ))}
                  </SidebarMenuSub>
                </CollapsibleContent>
              )}
            </SidebarMenuItem>
          </Collapsible>
        ))}
      </SidebarMenu>
    </SidebarGroup>
  );
}