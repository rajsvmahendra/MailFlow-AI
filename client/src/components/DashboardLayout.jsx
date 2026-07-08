import { useState } from "react";
import DashboardSidebar from "./DashboardSidebar";
import DashboardNavbar from "./DashboardNavbar";
import CommandPalette from "./CommandPalette";

const DashboardLayout = ({ children }) => {
  const [isCollapsed, setIsCollapsed] = useState(() => {
    return localStorage.getItem("dashboard-sidebar-collapsed") === "true";
  });

  const [isMobileOpen, setIsMobileOpen] = useState(false);

  const toggleSidebar = () => {
    setIsCollapsed((prev) => {
      const next = !prev;
      localStorage.setItem("dashboard-sidebar-collapsed", String(next));
      return next;
    });
  };

  const toggleMobileSidebar = () => {
    setIsMobileOpen((prev) => !prev);
  };

  return (
    <div className="h-screen bg-[#F8FAFC] flex relative overflow-hidden">
      <CommandPalette />
      
      {/* Sidebar Component */}
      <DashboardSidebar 
        isCollapsed={isCollapsed} 
        toggleSidebar={toggleSidebar} 
        isMobileOpen={isMobileOpen}
        toggleMobileSidebar={toggleMobileSidebar}
      />
      
      {/* Overlay for mobile sidebar */}
      {isMobileOpen && (
        <div 
          onClick={toggleMobileSidebar}
          className="fixed inset-0 bg-slate-900/30 backdrop-blur-sm z-40 md:hidden"
        />
      )}

      {/* Main Workspace Area */}
      <div className="flex-1 flex flex-col h-screen min-w-0 overflow-hidden transition-all duration-300">
        <DashboardNavbar 
          toggleMobileSidebar={toggleMobileSidebar} 
          isCollapsed={isCollapsed}
          toggleSidebar={toggleSidebar}
        />
        <main className="flex-1 overflow-y-auto p-4 md:p-8">
          {children}
        </main>
      </div>
    </div>
  );
};

export default DashboardLayout;

