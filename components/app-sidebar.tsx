"use client";

import * as React from "react";
import * as Lucide from "lucide-react";

import { NavMain } from "@/components/nav-main";
import { NavUser } from "@/components/nav-user";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarRail,
} from "@/components/ui/sidebar";
import { title } from "process";

// This is sample data.
const data = {
  user: {
    name: "Super Admin",
    email: "super.admin@ucd.ac.ma",
    avatar: "/avatars/shadcn.jpg",
  },
  navMain: [
    {
      title: "Accueil",
      url: "/dashboard",
      icon: Lucide.Home,
      isActive: true,
    },
    {
      title: "Utilisateurs",
      url: "/dashboard/users",
      icon: Lucide.UsersRound,
      isActive: false,
    },
    {
      title: "Logs",
      url: "#",
      icon: Lucide.FileClock,
    },
    {
      title: "Rôles",
      url: "#",
      icon: Lucide.UserRoundCog,
      isActive: false,
      items: [
        {
          title: "Rôles",
          url: "#",
        },
        {
          title: "Créer",
          url: "#",
        },
      ],
    },
    {
      title: "Etablissements",
      url: "#",
      icon: Lucide.Landmark,
      items: [
        {
          title: "Etablissements",
          url: "#",
        },
        {
          title: "Créer",
          url: "#",
        },
      ],
    },
    {
      title: "Pôles",
      url: "",
      icon: Lucide.Network,
      items: [
        {
          title: "Pôles",
          url: "/dashboard/poles",
        },
        {
          title: "Créer",
          url: "/dashboard/poles/ajouterpole",
        },
      ],
    },
    {
      title: "Divisions",
      url: "#",
      icon: Lucide.Workflow,
      items: [
        {
          title: "Divisions",
          url: "/dashboard/division",
        },
        {
          title: "Créer",
          url: "/dashboard/division/add",
        },
      ],
    },
    {
      title: "Services",
      url: "/dashboard/users",
      icon: Lucide.Building2,
      items: [
        {
          title: "Services",
          url: "#",
        },
        {
          title: "Créer",
          url: "#",
        },
      ],
    },
    {
      title: "Arrivées",
      url: "#",
      icon: Lucide.Mail,
    },
    {
      title: "Départs",
      url: "#",
      icon: Lucide.Send,
    },
    {
      title: "Statistiques",
      url: "#",
      icon: Lucide.LucideChartNoAxesCombined,
    },
  ],
};

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  return (
    <Sidebar collapsible="icon" {...props}>
      <SidebarHeader>
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton size="lg" asChild>
              <a href="#">
                <div className="flex aspect-square size-8 items-center justify-center rounded-lg bg-white text-sidebar-primary-foreground">
                  <img src="/assets/img/logo.png" className="size-7" />
                </div>
                <div className="flex flex-col gap-0.5 leading-none">
                  <span className="font-semibold">Bureau d'ordre</span>
                  <span className="">UCD</span>
                </div>
              </a>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarHeader>
      <SidebarContent>
        <NavMain items={data.navMain} menuName="Menu" />
      </SidebarContent>
      <SidebarFooter>
        <NavUser user={data.user} />
      </SidebarFooter>
      <SidebarRail />
    </Sidebar>
  );
}
