import React, { createContext, useContext, useState, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { CheckCircle, AlertCircle, AlertTriangle, Info, X } from "lucide-react";

const ToastContext = createContext(null);

export const useToast = () => {
  const context = useContext(ToastContext);
  if (!context) {
    throw new Error("useToast must be used within a ToastProvider");
  }
  return context;
};

export const ToastProvider = ({ children }) => {
  const [toasts, setToasts] = useState([]);

  const addToast = useCallback((message, type = "info", duration = 4000) => {
    const id = Date.now() + Math.random().toString(36).substring(2, 9);
    setToasts((prev) => [...prev, { id, message, type }]);

    if (duration > 0) {
      setTimeout(() => {
        setToasts((prev) => prev.filter((t) => t.id !== id));
      }, duration);
    }
  }, []);

  const removeToast = useCallback((id) => {
    setToasts((prev) => prev.filter((t) => t.id !== id));
  }, []);

  return (
    <ToastContext.Provider value={{ addToast, removeToast }}>
      {children}
      <div className="fixed top-6 right-6 z-[9999] flex flex-col gap-3 max-w-sm w-full pointer-events-none">
        <AnimatePresence>
          {toasts.map((toast) => (
            <motion.div
              key={toast.id}
              layout
              initial={{ opacity: 0, y: -20, scale: 0.9 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, scale: 0.85, transition: { duration: 0.2 } }}
              className="pointer-events-auto bg-white border border-slate-100/80 rounded-xl p-4 shadow-[0_10px_30px_-5px_rgba(0,0,0,0.08)] flex items-start gap-3 relative overflow-hidden"
            >
              <div className={`absolute left-0 top-0 bottom-0 w-1 ${
                toast.type === "success" ? "bg-emerald-500" :
                toast.type === "error" ? "bg-rose-500" :
                toast.type === "warning" ? "bg-amber-500" :
                "bg-indigo-500"
              }`} />

              <div className="shrink-0 mt-0.5">
                {toast.type === "success" && <CheckCircle className="w-4 h-4 text-emerald-500" />}
                {toast.type === "error" && <AlertCircle className="w-4 h-4 text-rose-500" />}
                {toast.type === "warning" && <AlertTriangle className="w-4 h-4 text-amber-500" />}
                {toast.type === "info" && <Info className="w-4 h-4 text-indigo-500" />}
              </div>

              <div className="flex-1 text-[11px] font-bold text-slate-600 leading-relaxed pr-6 text-left">
                {toast.message}
              </div>

              <button
                onClick={() => removeToast(toast.id)}
                className="absolute right-3 top-3 text-slate-400 hover:text-slate-600 rounded-lg p-0.5"
                aria-label="Dismiss Alert"
              >
                <X className="w-3.5 h-3.5" />
              </button>
            </motion.div>
          ))}
        </AnimatePresence>
      </div>
    </ToastContext.Provider>
  );
};
