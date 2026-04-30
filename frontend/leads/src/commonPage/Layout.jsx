// commonPage/Layout.jsx — Tailwind version
import { Outlet } from "react-router-dom";
import Sidebar from "./Sidebar";
import { useState } from "react";

const Layout = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <div className="flex min-h-screen bg-slate-100">
      {/* Mobile overlay */}
      {sidebarOpen && (
        <div
          onClick={() => setSidebarOpen(false)}
          className="fixed inset-0 bg-black/45 z-40 md:hidden"
        />
      )}

      {/* Sidebar */}
      <Sidebar open={sidebarOpen} setOpen={setSidebarOpen} />

      {/* Main Content */}
      <div className="flex-1 md:ml-60 min-w-0 flex flex-col">
        {/* Mobile Topbar */}
        <header className="flex md:hidden items-center gap-3 h-14 px-4 bg-white border-b border-slate-200 sticky top-0 z-30">
          <button
            onClick={() => setSidebarOpen((o) => !o)}
            className="text-slate-500 text-2xl bg-transparent border-none cursor-pointer p-1"
          >
            ☰
          </button>
          <span className="font-bold text-base text-slate-800">
            Acolyte CRM
          </span>
        </header>

        {/* Page Content */}
        <main className="flex-1 p-6">
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default Layout;
