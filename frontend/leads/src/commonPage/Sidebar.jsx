// commonPage/Sidebar.jsx — Full Tailwind version
import { NavLink } from "react-router-dom";

const NAV_ITEMS = [
  { to: "/", label: "Dashboard", icon: "⊞", end: true },
  { to: "/leads", label: "Leads", icon: "◈" },
  { to: "/leads/add", label: "Add Lead", icon: "⊕" },
  { to: "/reports", label: "Reports", icon: "▦" },
];

const Sidebar = ({ open, setOpen }) => {
  return (
    <aside
      className={`
        w-60 min-h-screen bg-slate-900 flex flex-col
        fixed top-0 left-0 z-50
        transition-transform duration-[250ms] ease-in-out
        ${open ? "translate-x-0" : "-translate-x-full"}
        md:translate-x-0
      `}
    >
      {/* Logo */}
      <div className="px-5 pt-6 pb-5 border-b border-white/[0.07] flex items-center gap-2.5">
        <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-teal-400 to-sky-500 flex items-center justify-center text-white font-extrabold text-lg shrink-0">
          A
        </div>
        <div>
          <div className="text-slate-100 font-bold text-[15px]">Acolyte</div>
          <div className="text-slate-500 text-[11px]">Lead Dashboard</div>
        </div>
      </div>

      {/* Nav Links */}
      <nav className="flex-1 px-3 py-4">
        <div className="text-slate-500 text-[10px] font-bold tracking-[0.08em] uppercase px-2 pb-3">
          Menu
        </div>

        {NAV_ITEMS.map((item) => (
          <NavLink
            key={item.to}
            to={item.to}
            end={item.end}
            onClick={() => setOpen(false)}
            className={({ isActive }) => `
              flex items-center gap-3 px-3 py-2.5 rounded-xl mb-1
              no-underline text-sm transition-all duration-150
              ${
                isActive
                  ? "bg-teal-500/15 text-teal-400 font-semibold"
                  : "text-slate-400 font-normal hover:bg-white/5 hover:text-slate-300"
              }
            `}
          >
            <span className="text-base w-5 text-center shrink-0">
              {item.icon}
            </span>
            {item.label}
          </NavLink>
        ))}
      </nav>

      {/* User Info */}
      <div className="px-5 py-4 border-t border-white/[0.07] flex items-center gap-2.5">
        <div className="w-[34px] h-[34px] rounded-full bg-gradient-to-br from-teal-400 to-sky-500 flex items-center justify-center text-white font-bold text-[13px] shrink-0">
          A
        </div>
        <div>
          <div className="text-slate-100 text-[13px] font-semibold">Admin</div>
          <div className="text-slate-500 text-[11px]">admin@acolyte.in</div>
        </div>
      </div>
    </aside>
  );
};

export default Sidebar;
