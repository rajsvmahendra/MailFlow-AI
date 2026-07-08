import React from "react";

export const LogoIcon = ({ className = "w-6 h-6", isWhite = false }) => {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
    >
      <defs>
        <linearGradient id="mailflow-spark-gradient" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#6366F1" />
          <stop offset="100%" stopColor="#4F46E5" />
        </linearGradient>
      </defs>
      
      {/* Sleek geometric envelope body */}
      <rect 
        x="2" 
        y="4" 
        width="20" 
        height="16" 
        rx="4" 
        stroke={isWhite ? "currentColor" : "#0A0F24"} 
        strokeWidth="2" 
        strokeLinejoin="round"
        fill="none"
      />
      
      {/* Chiseled flap lines flowing to center */}
      <path
        d="M2 6.5L9.5 11"
        stroke={isWhite ? "currentColor" : "#0A0F24"}
        strokeWidth="2"
        strokeLinecap="round"
      />
      <path
        d="M22 6.5L14.5 11"
        stroke={isWhite ? "currentColor" : "#0A0F24"}
        strokeWidth="2"
        strokeLinecap="round"
      />
      
      {/* 4-pointed generative AI spark at the center */}
      <path
        d="M12 8.5C12 10.5 13.5 12 15.5 12C13.5 12 12 13.5 12 15.5C12 13.5 10.5 12 8.5 12C10.5 12 12 10.5 12 8.5Z"
        fill={isWhite ? "currentColor" : "url(#mailflow-spark-gradient)"}
        stroke={isWhite ? "currentColor" : "url(#mailflow-spark-gradient)"}
        strokeWidth="1"
        strokeLinejoin="round"
      />
    </svg>
  );
};

export const Logo = ({ className = "flex items-center gap-3", isWhite = false, showAiTag = true }) => {
  return (
    <div className={className}>
      <LogoIcon className="w-7 h-7 shrink-0" isWhite={isWhite} />
      <span className={`font-black text-xl tracking-tight flex items-center gap-1.5 ${isWhite ? "text-white" : "text-brand-primary"}`}>
        MailFlow
        {showAiTag && (
          <span className={`text-[10px] font-extrabold px-1.5 py-0.5 rounded uppercase tracking-widest border ${
            isWhite 
              ? "bg-white/10 text-white border-white/20" 
              : "bg-brand-accent/10 text-brand-accent border-brand-accent/20"
          }`}>
            AI
          </span>
        )}
      </span>
    </div>
  );
};

export default Logo;
