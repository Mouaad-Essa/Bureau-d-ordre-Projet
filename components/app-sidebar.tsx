"use client";

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

} from "@/components/ui/sidebar"
import { title } from "process"
import Link from "next/link"
import { useEffect, useState } from "react";
import jwtDecode from "jsonwebtoken";

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {

  const [superAdminData, setSuperAdminData] = useState({
    nom: "",
    prenom: "",
    email: "",
    roleId: "",
    isSuperAdmin: false,
    privileges: [],
  });

    //fetch super admin data
    /*useEffect(() => {
        const token = localStorage.getItem("token");

        if (token) {
          try {
            // Decode the token payload
            const decoded: any = jwtDecode.decode(token);
            setSuperAdminData({ email: decoded.email });
          } catch (error) {
            console.error("Invalid token:", error);
          }
        }
    }, []);*/

    useEffect(() => {
      async function fetchUser() {
        try {
          const res = await fetch("/api/userData");
          if (!res.ok) throw new Error("Failed to fetch user data");
            const data = await res.json();
            console.log(data);
            setSuperAdminData(data.user);
        } catch (err) {
          console.error("Erreur");
        }
      }
  
      fetchUser();
    }, []);

  const data = {
    user: {
      name: "Super Admin",
      email: superAdminData.email,
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
            url: "/dashboard/roles",
          },
          {
            title: "Créer",
            url: "/dashboard/roles/create",
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
            url: "/dashboard/etablissement",
          },
          {
            title: "Créer",
            url: "/dashboard/etablissement/add",
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
            url: "/dashboard/poles/add",
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
        url: "#",
        icon: Lucide.Building2,
        items: [
          {
            title: "Services",
  
            url: "/dashboard/service",
          },
          {
            title: "Créer",
            url: "/dashboard/service/add",
  
          },
        ],
      },
      {
        title: "Arrivées",
        url: "",
        icon: Lucide.Mail,
        items: [
          {
            title: "Arrivées",
            url: "/dashboard/arrivees",
          },
          {
            title: "Créer une Arrivée",
            url: "/dashboard/arrivees/add",
          },
          {
            title: "Courriers Transférés",
            url: "/dashboard/arrivees/transferts",
          },
        ],
      },
      {
        title: "Départs",
        url: "",
        icon: Lucide.Send,
        items: [
          {
            title: "Départs",
            url: "/dashboard/departs",
          },
          {
            title: "Créer un Départ",
            url: "/dashboard/departs/add",
          },
        ],
      },
      {
        title: "Statistiques",
        url: "/dashboard/statistiques",
        icon: Lucide.LucideChartNoAxesCombined,
      },
    ],
  };

  return (
    <Sidebar collapsible="icon" {...props}>
      <SidebarHeader>

        <SidebarMenu className="bg-[#192130] rounded-md text-white">
            <SidebarMenuItem>
              <SidebarMenuButton size="lg" asChild>
                <Link href="#">
                  <div className="flex aspect-square size-8 items-center justify-center rounded-lg bg-white text-sidebar-primary-foreground">
                  
                    <img src="/assets/img/logo.png" className="size-7" />
                  </div>
                  <div className="flex flex-col gap-0.5 leading-none">
                    <span className="font-semibold">Bureau d'ordre</span>
                    <span className="">UCD</span>
                  </div>
                </Link>
              </SidebarMenuButton>
            </SidebarMenuItem>

        </SidebarMenu>
      </SidebarHeader>
      <SidebarContent>
        <NavMain items={data.navMain} menuName="Menu"/>
      </SidebarContent>
      <SidebarFooter>
        <NavUser user={data.user} />
      </SidebarFooter>
      <SidebarRail />
    </Sidebar>
  );
}
