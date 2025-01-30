"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";

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
    <header className="flex px-4 py-2 shadow-xl items-center w-full justify-center bg-blue-600/90 text-white">
      <span className="font-bold text-lg">LOGO</span>
      <nav className="flex justify-end items-center gap-10 container font-semibold">
        {navLinks.map((link, index) => (
          <Link
            key={index}
            href={link.href}
            className={`p-2 rounded ${
              isActive(link.href) ? "text-gray-800 font-bold" : "text-gray-300"
            }`}
          >
            {link.label}
          </Link>
        ))}
      </nav>
    </header>
  );
};

export default NavBar;
