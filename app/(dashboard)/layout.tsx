import Sidebar from "@/components/sidebar";

function DashboardLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="flex flex-col lg:flex-row">
      <Sidebar />

      <main className="min-h-screen w-full -order-1 lg:order-1">
        <div className="flex-1 p-10 max-w-screen-2xl mx-auto">{children}</div>
      </main>
    </div>
  );
}

export default DashboardLayout;
