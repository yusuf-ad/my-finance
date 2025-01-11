import Sidebar from "@/components/sidebar";

function DashboardLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="flex flex-col lg:flex-row min-h-screen">
      <Sidebar />

      <main className="h-screen w-full -order-1 lg:order-1 lg:overflow-y-scroll">
        <div className="flex-1 p-10 max-w-screen-2xl mx-auto h-full">
          {children}
        </div>
      </main>
    </div>
  );
}

export default DashboardLayout;
