import Link from "next/link";

const NavBar = () => {
  const navLinks = [
    { href: "/", label: "Arrivée" },
    { href: "/", label: "Départ" },
    { href: "/statistique", label: "Statistiques" },
    { href: "/etablissement", label: "Etablissement" },
    { href: "/", label: "Recherche" },
  ];

  return (
    <header className="flex p-6  items-center shadow-xl  w-full bg-gray-900 text-white">
      <span className="">LOGO</span>
      <nav className="flex justify-end items-center gap-10 container font-semibold">
        {navLinks.map((link, index) => (
          <Link className="text-lg" key={index} href={link.href}>
            {link.label}
          </Link>
        ))}
      </nav>
    </header>
  );
};

export default NavBar;
