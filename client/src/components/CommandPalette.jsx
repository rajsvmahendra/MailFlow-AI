import React, { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import {
  LayoutDashboard,
  PlusCircle,
  History,
  LogOut,
  Search,
  CornerDownLeft,
  X
} from "lucide-react";

const CommandPalette = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [query, setQuery] = useState("");
  const [selectedIndex, setSelectedIndex] = useState(0);
  const navigate = useNavigate();
  const inputRef = useRef(null);

  const actions = [
    {
      id: "dashboard",
      title: "Go to Dashboard",
      subtitle: "Overview of your generative activities and statistics",
      icon: <LayoutDashboard className="w-4 h-4" />,
      perform: () => navigate("/dashboard")
    },
    {
      id: "compose",
      title: "Compose New Email",
      subtitle: "Generate a custom draft using generative intelligence",
      icon: <PlusCircle className="w-4 h-4" />,
      perform: () => navigate("/create-email")
    },
    {
      id: "history",
      title: "View Email History",
      subtitle: "Search, filter, or delete previous AI drafts",
      icon: <History className="w-4 h-4" />,
      perform: () => navigate("/email-history")
    },
    {
      id: "logout",
      title: "Log Out Account",
      subtitle: "Securely sign out of your MailFlow workspace session",
      icon: <LogOut className="w-4 h-4 text-rose-500" />,
      perform: () => {
        localStorage.removeItem("token");
        localStorage.removeItem("user");
        navigate("/login");
      }
    }
  ];

  // Filter actions based on query search
  const filteredActions = actions.filter((action) =>
    action.title.toLowerCase().includes(query.toLowerCase()) ||
    action.subtitle.toLowerCase().includes(query.toLowerCase())
  );

  useEffect(() => {
    const handleKeyDown = (e) => {
      // Toggle Ctrl+K / Cmd+K
      if ((e.ctrlKey || e.metaKey) && e.key === "k") {
        e.preventDefault();
        setIsOpen((prev) => !prev);
      }

      if (!isOpen) return;

      // Close on Esc
      if (e.key === "Escape") {
        e.preventDefault();
        setIsOpen(false);
      }

      // Arrow navigation
      if (e.key === "ArrowDown") {
        e.preventDefault();
        setSelectedIndex((prev) =>
          prev < filteredActions.length - 1 ? prev + 1 : 0
        );
      }
      if (e.key === "ArrowUp") {
        e.preventDefault();
        setSelectedIndex((prev) =>
          prev > 0 ? prev - 1 : filteredActions.length - 1
        );
      }

      // Trigger selection on Enter
      if (e.key === "Enter" && filteredActions[selectedIndex]) {
        e.preventDefault();
        filteredActions[selectedIndex].perform();
        setIsOpen(false);
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isOpen, selectedIndex, filteredActions]);

  // Focus input when opened
  useEffect(() => {
    if (isOpen) {
      setQuery("");
      setSelectedIndex(0);
      setTimeout(() => inputRef.current?.focus(), 80);
    }
  }, [isOpen]);

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-[9999] flex items-start justify-center pt-[15vh] px-4">
          {/* Backdrop Overlay */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setIsOpen(false)}
            className="fixed inset-0 bg-brand-primary/30 backdrop-blur-sm"
          />

          {/* Dialog Body */}
          <motion.div
            initial={{ opacity: 0, scale: 0.97, y: -8 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.97, y: -8 }}
            transition={{ duration: 0.18 }}
            className="bg-white w-full max-w-xl rounded-2xl border border-slate-100 shadow-[0_20px_50px_rgba(0,0,0,0.12)] relative overflow-hidden flex flex-col max-h-[480px]"
          >
            {/* Search Input bar */}
            <div className="relative p-4 border-b border-slate-100 flex items-center gap-3">
              <Search className="w-5 h-5 text-slate-400 shrink-0" />
              <input
                ref={inputRef}
                type="text"
                placeholder="Type a command or page destination..."
                value={query}
                onChange={(e) => {
                  setQuery(e.target.value);
                  setSelectedIndex(0);
                }}
                className="w-full text-xs font-semibold text-slate-800 bg-transparent border-none outline-none focus:ring-0 p-0 placeholder-slate-400"
              />
              <button
                onClick={() => setIsOpen(false)}
                className="p-1 hover:bg-slate-100 rounded-lg text-slate-400 hover:text-slate-600 transition-colors"
                aria-label="Close Command Palette"
              >
                <X className="w-3.5 h-3.5" />
              </button>
            </div>

            {/* List Operations */}
            <div className="p-2 overflow-y-auto flex-1 space-y-0.5">
              {filteredActions.length === 0 ? (
                <div className="py-8 text-center text-xs font-bold text-slate-400">
                  No matching operations found
                </div>
              ) : (
                filteredActions.map((action, idx) => {
                  const isSelected = selectedIndex === idx;
                  return (
                    <button
                      key={action.id}
                      onClick={() => {
                        action.perform();
                        setIsOpen(false);
                      }}
                      onMouseEnter={() => setSelectedIndex(idx)}
                      className={`w-full text-left p-3.5 rounded-xl flex items-center justify-between transition-all outline-none ${
                        isSelected
                          ? "bg-slate-50 border border-slate-100/50"
                          : "bg-transparent border border-transparent"
                      }`}
                    >
                      <div className="flex items-center gap-3.5">
                        <div className={`p-2 rounded-lg ${
                          isSelected ? "bg-white text-brand-accent shadow-sm" : "bg-slate-50 text-slate-400"
                        }`}>
                          {action.icon}
                        </div>
                        <div>
                          <h4 className="text-xs font-bold text-slate-700">{action.title}</h4>
                          <p className="text-[10px] text-slate-400 font-semibold mt-0.5">{action.subtitle}</p>
                        </div>
                      </div>
                      
                      {isSelected && (
                        <div className="flex items-center gap-1 text-[9px] font-black text-slate-400 uppercase bg-white border border-slate-100 px-2 py-1 rounded shadow-sm">
                          <span>Select</span>
                          <CornerDownLeft className="w-2.5 h-2.5" />
                        </div>
                      )}
                    </button>
                  );
                })
              )}
            </div>

            {/* Footer guide */}
            <div className="bg-slate-50 px-4 py-2.5 border-t border-slate-100 flex justify-between items-center text-[9px] font-bold text-slate-400 uppercase">
              <div className="flex items-center gap-3">
                <span>↑↓ navigate</span>
                <span>⏎ select</span>
                <span>esc close</span>
              </div>
              <span>Command Menu</span>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};

export default CommandPalette;
