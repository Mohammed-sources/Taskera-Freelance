export default function ClientLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div>
      <nav>Client Sidebar</nav>
      <main>{children}</main>
    </div>
  );
}
