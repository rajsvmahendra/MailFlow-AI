import { useNavigate, useLocation, Link } from "react-router-dom";
import {
  LayoutDashboard,
  PenBox,
  History,
  LogOut,
  ChevronLeft,
  ChevronRight
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { useState, useEffect } from "react";
import { LogoIcon, Logo } from "./Logo";

const DashboardSidebar = ({ isCollapsed, toggleSidebar, isMobileOpen, toggleMobileSidebar }) => {
  const navigate = useNavigate();
  const location = useLocation();
  const [user, setUser] = useState({ name: "User", email: "user@mailflow.ai" });

  useEffect(() => {
    const userData = localStorage.getItem("user");
    if (userData) {
      try {
        const parsed = JSON.parse(userData);
        if (parsed) {
          setUser({
            name: parsed.name || "User",
            email: parsed.email || "user@mailflow.ai"
          });
        }
      } catch (e) {
        console.error(e);
      }
    }
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("isAuthenticated");
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    navigate("/login");
  };

  const menuItems = [
    { name: "Dashboard", path: "/dashboard", icon: LayoutDashboard },
    { name: "Create Email", path: "/create-email", icon: PenBox },
    { name: "Email History", path: "/email-history", icon: History },
  ];

  const getInitials = (name) => {
    if (!name) return "U";
    return name.split(" ").map(n => n[0]).join("").toUpperCase().substring(0, 2);
  };

  // Desktop sidebar JSX
  const desktopSidebar = (
    <motion.aside
      animate={{ width: isCollapsed ? 80 : 256 }}
      transition={{ duration: 0.3, ease: [0.25, 0.1, 0.25, 1] }}
      className="bg-white border-r border-slate-100 hidden md:flex flex-col py-6 px-4 h-full shadow-[4px_0_24px_rgba(10,15,36,0.01)] shrink-0 z-30 overflow-hidden"
    >
      {/* 1. Top Logo Header */}
      <div className={`flex items-center ${isCollapsed ? "justify-center" : "justify-between"} px-2 h-10 mb-8`}>
        {isCollapsed ? (
          <Link to="/dashboard" className="flex items-center justify-center outline-none hover:scale-105 transition-transform duration-300">
            <LogoIcon className="w-7 h-7" />
          </Link>
        ) : (
          <>
            <Link to="/dashboard" className="flex items-center outline-none">
              <Logo />
            </Link>
            <button 
              type="button" 
              onClick={(e) => { e.preventDefault(); e.stopPropagation(); toggleSidebar(); }} 
              className="p-1.5 rounded-lg border border-slate-100 text-slate-400 hover:text-brand-primary hover:bg-slate-50 transition-colors shrink-0"
              title="Collapse Sidebar"
            >
              <ChevronLeft className="w-4 h-4" />
            </button>
          </>
        )}
      </div>

      {/* 2. Navigation Menu */}
      <nav className="space-y-1.5">
        {menuItems.map((item) => {
          const isActive = location.pathname === item.path;
          return (
            <button
              type="button"
              key={item.path}
              onClick={() => navigate(item.path)}
              title={isCollapsed ? item.name : undefined}
              className={`w-full flex items-center px-3.5 py-3 gap-3 rounded-xl transition-all duration-200 group relative outline-none ${isActive
                ? "bg-brand-primary text-white shadow-md shadow-brand-primary/10 font-bold"
                : "text-slate-500 hover:bg-slate-50 hover:text-brand-primary font-semibold"
              }`}
            >
              <item.icon className={`w-5 h-5 shrink-0 ${isActive ? "text-white" : "text-slate-400 group-hover:text-brand-primary transition-colors"}`} />
              <AnimatePresence initial={false}>
                {!isCollapsed && (
                  <motion.span
                    initial={{ opacity: 0, width: 0 }}
                    animate={{ opacity: 1, width: "auto" }}
                    exit={{ opacity: 0, width: 0 }}
                    className="text-sm truncate font-semibold"
                  >
                    {item.name}
                  </motion.span>
                )}
              </AnimatePresence>
              {isActive && !isCollapsed && (
                <motion.div
                  layoutId="activeTabIndicator"
                  className="absolute right-0 w-1.5 h-5 bg-brand-accent rounded-l-full"
                />
              )}
            </button>
          );
        })}
      </nav>

      {/* 3. Spacer */}
      <div className="flex-1" />

      {/* 4. Bottom Section (Profile, Collapse triggers, Logout) */}
      <div className="space-y-4 pt-6 border-t border-slate-100">
        {/* User Profile */}
        <div className={`flex items-center ${isCollapsed ? "justify-center" : "gap-3"} px-2 h-10`}>
          <div className="w-10 h-10 rounded-full bg-indigo-50 border border-indigo-100 flex items-center justify-center text-brand-accent font-bold text-sm shrink-0">
            {getInitials(user.name)}
          </div>
          {!isCollapsed && (
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="min-w-0 flex-1"
            >
              <h4 className="text-xs font-bold text-brand-primary truncate">{user.name}</h4>
              <p className="text-[10px] font-semibold text-slate-400 truncate">{user.email}</p>
            </motion.div>
          )}
        </div>

        {/* Collapse trigger for collapsed state */}
        {isCollapsed && (
          <button 
            type="button" 
            onClick={toggleSidebar} 
            className="w-full py-1.5 rounded-lg border border-slate-100 text-slate-400 hover:text-brand-primary hover:bg-slate-50 transition-colors flex justify-center"
            title="Expand Sidebar"
          >
            <ChevronRight className="w-4 h-4" />
          </button>
        )}

        {/* Logout Button */}
        <button
          type="button"
          onClick={handleLogout}
          className="w-full flex items-center px-3.5 py-3 gap-3 rounded-xl text-red-500 hover:bg-red-50/55 hover:text-red-600 transition-all duration-200 outline-none"
          title={isCollapsed ? "Logout" : undefined}
        >
          <LogOut className="w-5 h-5 shrink-0" />
          {!isCollapsed && (
            <motion.span
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="font-bold text-sm"
            >
              Logout
            </motion.span>
          )}
        </button>
      </div>
    </motion.aside>
  );

  // Mobile sidebar JSX
  const mobileSidebar = (
    <aside className={`fixed inset-y-0 left-0 w-64 bg-white border-r border-slate-100 z-50 flex flex-col py-6 px-4 transition-transform duration-300 ease-in-out md:hidden shadow-2xl ${
      isMobileOpen ? "translate-x-0" : "-translate-x-full"
    }`}>
      {/* 1. Brand Header */}
      <div className="flex items-center justify-between px-2 h-10 mb-8">
        <Link to="/dashboard" onClick={toggleMobileSidebar} className="flex items-center outline-none rounded-lg">
          <Logo />
        </Link>
        <button 
          type="button" 
          onClick={toggleMobileSidebar} 
          className="p-1.5 rounded-lg border border-slate-100 text-slate-400 hover:text-brand-primary hover:bg-slate-50 transition-colors"
        >
          <ChevronLeft className="w-4 h-4" />
        </button>
      </div>

      {/* 2. Navigation Menu */}
      <nav className="space-y-1.5">
        {menuItems.map((item) => {
          const isActive = location.pathname === item.path;
          return (
            <button
              type="button"
              key={item.path}
              onClick={() => {
                navigate(item.path);
                toggleMobileSidebar();
              }}
              className={`w-full flex items-center px-4 py-3 gap-3 rounded-xl transition-all duration-200 outline-none ${isActive
                ? "bg-brand-primary text-white shadow-md shadow-brand-primary/10 font-bold"
                : "text-slate-500 hover:bg-slate-50 hover:text-brand-primary font-semibold"
              }`}
            >
              <item.icon className="w-5 h-5 shrink-0" />
              <span className="font-semibold text-sm">{item.name}</span>
            </button>
          );
        })}
      </nav>

      {/* 3. Spacer */}
      <div className="flex-grow" />

      {/* 4. Bottom Section */}
      <div className="space-y-4 pt-6 border-t border-slate-100">
        {/* User Profile */}
        <div className="flex items-center gap-3 px-2">
          <div className="w-10 h-10 rounded-full bg-indigo-50 border border-indigo-100 flex items-center justify-center text-brand-accent font-bold text-sm shrink-0">
            {getInitials(user.name)}
          </div>
          <div className="min-w-0 flex-1">
            <h4 className="text-xs font-bold text-brand-primary truncate">{user.name}</h4>
            <p className="text-[10px] font-semibold text-slate-400 truncate">{user.email}</p>
          </div>
        </div>

        {/* Logout Button */}
        <button
          type="button"
          onClick={() => {
            handleLogout();
            toggleMobileSidebar();
          }}
          className="w-full flex items-center px-4 py-3 gap-3 rounded-xl text-red-500 hover:bg-red-50/55 hover:text-red-600 transition-all duration-200 outline-none"
        >
          <LogOut className="w-5 h-5 shrink-0" />
          <span className="font-bold text-sm">Logout</span>
        </button>
      </div>
    </aside>
  );

  return (
    <>
      {desktopSidebar}
      {mobileSidebar}
    </>
  );
};

export default DashboardSidebar;
