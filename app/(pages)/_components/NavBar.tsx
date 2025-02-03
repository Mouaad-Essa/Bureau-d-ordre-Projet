"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import Image from "next/image";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { LogOut, User } from "lucide-react";

const NavBar = () => {
  const pathname = usePathname();

  // Function to check if the link is active
  const isActive = (path: string) => pathname === path;

  // Navigation links
  const navLinks = [
    { href: "/", label: "Home" },
    { href: "/arrivee", label: "Arrivée" },
    { href: "/depart", label: "Départ" },
    { href: "/statistique", label: "Statistiques" },
    { href: "/etablissement", label: "Etablissement" },
    { href: "/recherche", label: "Recherche" },
  ];

  return (
    <header className="w-full bg-blue-600/90 shadow-md">
      <div className="container mx-auto flex items-center justify-between px-6 py-4">
        {/* Clickable Logo & Title */}
        <Link
          href="/"
          className="flex items-center gap-3 transition-transform duration-300 ease-in-out hover:scale-105"
        >
          <div className="bg-white rounded-md p-1 shadow-sm">
            <Image
              src="/assets/img/logo.png"
              width={60}
              height={40}
              alt="Bureau d'ordre UCD Logo"
              className="object-contain"
            />
          </div>
          <p className="text-white text-lg font-bold">Bureau d'Ordre UCD</p>
        </Link>

        {/* Navigation Links */}
        <nav className="flex items-center gap-8">
          {navLinks.map((link, index) => (
            <Link
              key={index}
              href={link.href}
              className={`p-1 transition-all duration-300 ease-in-out ${
                isActive(link.href)
                  ? "text-white font-bold border-b-2 border-white scale-105"
                  : "text-gray-300 hover:text-gray-200 hover:scale-105"
              }`}
            >
              {link.label}
            </Link>
          ))}
        </nav>

        {/* Avatar Dropdown */}
        <DropdownMenu>
          <DropdownMenuTrigger asChild className="cursor-pointer">
            <Avatar>
              <AvatarImage src="" alt="@shadcn" />
              <AvatarFallback>CN</AvatarFallback>
            </Avatar>
          </DropdownMenuTrigger>
          <DropdownMenuContent className="w-40">
            <DropdownMenuItem>
              <Link href="/profil" className="flex items-center justify-center">
                <User className="w-4 h-4 mr-2" /> Profil
              </Link>
            </DropdownMenuItem>

            <DropdownMenuSeparator />
            <DropdownMenuItem className="text-red-500">
              <LogOut className="w-4 h-4 mr-2" /> Déconnexion
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </header>
  );
};

export default NavBar;
