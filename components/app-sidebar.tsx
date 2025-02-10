import { Building2, Calendar, HandPlatter, Home, Inbox, InboxIcon, Logs, PersonStanding, Search, Settings, Split } from "lucide-react"

import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar"


const items = [
  {
    title: "Home",
    url: "#",
    icon: Home,
  },
  {
    title: "users",
    url: "/users",
    icon: PersonStanding,
  },
  {
    title: "logs",
    url: "/logs",
    icon: Logs ,
  },
  {
    title: "roles",
    url: "/roles",
    icon: PersonStanding,
  },
  {
    title: "poles",
    url: "#",
    icon: Building2,
  },
  {
    title: "services",
    url: "/services",
    icon: HandPlatter,
  },{
    title: "etablissements",
    url: "/listetablissements",
    icon: Building2,
  },
  {
    title: "arrives",
    url: "/listarrivees",
    icon: InboxIcon,
  }, 
  {
    title: "departs",
    url: "/listdepart",
    icon: InboxIcon,
  }, 
  {
    title: "divisions",
    url: "#",
    icon: Split,
  },
]

export function AppSidebar() {
  return (
    <Sidebar>
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel>Application</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {items.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton asChild>
                    <a href={item.url}>
                      <item.icon />
                      <span>{item.title}</span>
                    </a>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
    </Sidebar>
  )
}
