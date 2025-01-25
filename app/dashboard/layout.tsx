import { ReactNode } from "react";

export default function DashboardLayout({ children }: { children: ReactNode }) {
  return (
    <div>
      this is from dashboard layout
      {children}
    </div>
  );
}
