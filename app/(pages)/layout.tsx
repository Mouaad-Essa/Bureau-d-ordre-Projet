import { ReactNode } from "react";
import NavBar from "./_components/NavBar";
import Footer from "./_components/Footer";

export default function PagesgLayout({ children }: { children: ReactNode }) {
  return (
    <div>
      <NavBar />
      <main className="min-h-screen container mx-auto p-4">{children}</main>
      <Footer />
    </div>
  );
}
