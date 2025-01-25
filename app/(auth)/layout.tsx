export default async function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div>
      Login layouy
      {children}
    </div>
  );
}
