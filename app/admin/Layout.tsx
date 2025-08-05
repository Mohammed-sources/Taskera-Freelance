export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div>
      <nav>Admin Sidebar</nav>
      <main>{children}</main>
    </div>
  );
}
