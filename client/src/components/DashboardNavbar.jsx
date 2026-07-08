import { Link, useLocation, useNavigate } from "react-router-dom";
import { Bell, Search, Sun, Menu, Settings } from "lucide-react";
import { useEffect, useState } from "react";
import { useToast } from "../context/ToastContext";

const DashboardNavbar = ({ toggleMobileSidebar, isCollapsed, toggleSidebar }) => {
  const location = useLocation();
  const navigate = useNavigate();
  const { addToast } = useToast();

  const getBreadcrumb = () => {
    if (location.pathname === "/dashboard") return "Dashboard";
    if (location.pathname === "/create-email") return "Create Email";
    if (location.pathname === "/email-history") return "Email History";
    return "Portal";
  };

  const handleMockAction = (feature) => {
    if (feature === "notifications") {
      addToast("You have no new notifications.", "info");
    } else if (feature === "theme") {
      addToast("Dark mode support is coming soon!", "info");
    } else if (feature === "settings") {
      addToast("Workspace settings coming soon.", "info");
    }
  };

  return (
    <header className="h-16 bg-white border-b border-slate-100 flex items-center justify-between px-6 sticky top-0 z-30 shadow-[0_1px_2px_rgba(0,0,0,0.01)]">
      {/* Left: Current Page Title & Mobile Trigger */}
      <div className="flex items-center gap-3">
        {/* Mobile Menu Trigger */}
        <button
          type="button"
          onClick={toggleMobileSidebar}
          className="p-1.5 rounded-lg text-slate-500 hover:bg-slate-50 active:scale-95 transition-all md:hidden outline-none"
          title="Open menu"
        >
          <Menu className="w-5 h-5" />
        </button>

        {/* Current Page Title (no redundant MailFlow prefix) */}
        <span className="text-brand-primary font-bold text-sm tracking-tight">{getBreadcrumb()}</span>
      </div>

      {/* Center: Workspace Search (Mock) */}
      <div className="hidden md:flex items-center relative w-full max-w-sm mx-4">
        <Search className="w-4 h-4 text-slate-400 absolute left-3 pointer-events-none" />
        <input
          type="text"
          placeholder="Search..."
          className="w-full pl-9 pr-4 py-2 border border-slate-100 bg-slate-50/50 hover:bg-slate-50 focus:bg-white text-xs font-semibold rounded-lg outline-none transition-all placeholder:text-slate-400 focus:border-indigo-100 focus:ring-2 focus:ring-indigo-50"
        />
      </div>

      {/* Right: Action Controls (Notifications, Theme Toggle, Settings) */}
      <div className="flex items-center gap-1">
        {/* Theme Toggle */}
        <button
          type="button"
          title="Toggle Theme"
          onClick={() => handleMockAction("theme")}
          className="p-2 rounded-lg text-slate-400 hover:text-brand-primary hover:bg-slate-50 transition-all outline-none"
        >
          <Sun className="w-4 h-4" />
        </button>

        {/* Notifications Icon */}
        <button
          type="button"
          title="Notifications"
          onClick={() => handleMockAction("notifications")}
          className="p-2 rounded-lg text-slate-400 hover:text-brand-primary hover:bg-slate-50 transition-all relative outline-none"
        >
          <Bell className="w-4 h-4" />
          <span className="absolute top-2 right-2 w-1.5 h-1.5 bg-red-500 rounded-full"></span>
        </button>

        {/* Settings button */}
        <button
          type="button"
          title="Settings"
          onClick={() => handleMockAction("settings")}
          className="p-2 rounded-lg text-slate-400 hover:text-brand-primary hover:bg-slate-50 transition-all outline-none"
        >
          <Settings className="w-4 h-4" />
        </button>
      </div>
    </header>
  );
};

export default DashboardNavbar;
