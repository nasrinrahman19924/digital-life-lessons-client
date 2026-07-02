import Sidebar from "@/components/Dashboard/Sidebar";
import MainNavbar from "@/components/Navbar/Navbar";

export default function DashboardLayout({ children }) {
  return (
    <>
      <MainNavbar />

      <section className="bg-gray-100 min-h-screen">
        <div className="max-w-7xl mx-auto py-10 px-5 grid lg:grid-cols-12 gap-8">
          <div className="lg:col-span-3">
            <Sidebar />
          </div>

          <div className="lg:col-span-9">{children}</div>
        </div>
      </section>
    </>
  );
}
