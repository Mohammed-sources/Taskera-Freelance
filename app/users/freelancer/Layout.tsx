export default function FreelancerLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div>
      <nav>Freelancer Sidebar</nav>
      <main>{children}</main>
    </div>
  );
}
