import React from "react";

export const SkeletonPulse = ({ className }) => (
  <div className={`shimmer rounded-xl ${className}`} />
);

export const PageSkeleton = () => (
  <div className="max-w-7xl mx-auto space-y-8 p-6">
    <div className="flex items-center justify-between pb-4 border-b border-slate-100">
      <div className="space-y-2">
        <SkeletonPulse className="h-8 w-48" />
        <SkeletonPulse className="h-4 w-64" />
      </div>
      <SkeletonPulse className="h-10 w-32" />
    </div>
    <div className="grid md:grid-cols-3 gap-6">
      <SkeletonPulse className="h-32" />
      <SkeletonPulse className="h-32" />
      <SkeletonPulse className="h-32" />
    </div>
    <SkeletonPulse className="h-64 w-full" />
  </div>
);

export const DashboardSkeleton = () => (
  <div className="space-y-8">
    <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-6 pb-2 border-b border-slate-100">
      <div className="space-y-2">
        <SkeletonPulse className="h-8 w-56" />
        <SkeletonPulse className="h-4 w-72" />
      </div>
      <SkeletonPulse className="h-11 w-44" />
    </div>
    
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
      <SkeletonPulse className="h-20" />
      <SkeletonPulse className="h-20" />
      <SkeletonPulse className="h-20" />
    </div>

    <div className="grid gap-6 sm:grid-cols-3">
      <SkeletonPulse className="h-36" />
      <SkeletonPulse className="h-36" />
      <SkeletonPulse className="h-36" />
    </div>

    <div className="grid lg:grid-cols-12 gap-6">
      <div className="lg:col-span-8">
        <SkeletonPulse className="h-64" />
      </div>
      <div className="lg:col-span-4">
        <SkeletonPulse className="h-64" />
      </div>
    </div>
  </div>
);

export const HistorySkeleton = () => (
  <div className="space-y-6">
    <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 pb-4 border-b border-slate-100">
      <div className="space-y-2">
        <SkeletonPulse className="h-8 w-44" />
        <SkeletonPulse className="h-4 w-64" />
      </div>
      <SkeletonPulse className="h-10 w-36" />
    </div>

    <div className="h-24 bg-white border border-slate-100 rounded-2xl p-5 flex flex-col md:flex-row gap-4 items-center justify-between">
      <SkeletonPulse className="h-8 w-72" />
      <div className="flex gap-2 w-full md:w-auto">
        <SkeletonPulse className="h-8 w-32" />
        <SkeletonPulse className="h-8 w-32" />
      </div>
    </div>

    <div className="grid gap-3">
      {[1, 2, 3, 4].map((i) => (
        <div key={i} className="bg-white border border-slate-100/80 rounded-2xl p-5 flex items-center justify-between gap-4">
          <div className="flex-1 space-y-2">
            <div className="flex items-center gap-2">
              <SkeletonPulse className="h-4 w-4" />
              <SkeletonPulse className="h-5 w-1/3" />
            </div>
            <SkeletonPulse className="h-4 w-3/4" />
            <div className="flex items-center gap-3">
              <SkeletonPulse className="h-3.5 w-16" />
              <SkeletonPulse className="h-3.5 w-12" />
              <SkeletonPulse className="h-3.5 w-16" />
            </div>
          </div>
          <SkeletonPulse className="h-8 w-8 rounded-lg shrink-0" />
        </div>
      ))}
    </div>
  </div>
);

export const ComposerSkeleton = () => (
  <div className="space-y-6">
    <div className="pb-4 border-b border-slate-100 flex items-center justify-between">
      <div className="space-y-2">
        <SkeletonPulse className="h-8 w-48" />
        <SkeletonPulse className="h-4 w-64" />
      </div>
      <SkeletonPulse className="h-7 w-28" />
    </div>

    <div className="grid lg:grid-cols-12 gap-8">
      <div className="lg:col-span-5 bg-white border border-slate-100 rounded-2xl p-6 space-y-6">
        <div className="space-y-4">
          <div className="space-y-2">
            <SkeletonPulse className="h-4 w-28" />
            <SkeletonPulse className="h-28 w-full" />
          </div>
          <div className="space-y-2">
            <SkeletonPulse className="h-4 w-20" />
            <SkeletonPulse className="h-10 w-full" />
          </div>
          <div className="space-y-2">
            <SkeletonPulse className="h-4 w-24" />
            <div className="grid grid-cols-3 gap-2">
              {[1, 2, 3, 4, 5, 6].map((i) => (
                <SkeletonPulse key={i} className="h-8" />
              ))}
            </div>
          </div>
        </div>
        <SkeletonPulse className="h-12 w-full" />
      </div>

      <div className="lg:col-span-7">
        <SkeletonPulse className="h-[460px] w-full" />
      </div>
    </div>
  </div>
);

export const FullPageLoader = () => (
  <div className="min-h-screen flex flex-col items-center justify-center bg-[#F8FAFC]">
    <div className="relative flex flex-col items-center gap-4">
      {/* Soft Glow */}
      <div className="absolute -inset-4 bg-brand-accent/10 rounded-full blur-2xl animate-pulse" />
      
      {/* Rotating gradient border ring */}
      <div className="relative w-16 h-16 rounded-2xl bg-white border border-slate-100 flex items-center justify-center shadow-[0_4px_24px_rgba(99,102,241,0.06)] overflow-hidden">
        {/* Animated rotating border */}
        <div className="absolute inset-0 bg-gradient-to-tr from-brand-accent to-indigo-400 opacity-20 animate-spin" style={{ animationDuration: '4s' }} />
        
        {/* LogoIcon inside */}
        <div className="relative z-10 p-3 bg-white rounded-xl">
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="#6366F1" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-8 h-8">
            <rect x="2" y="4" width="20" height="16" rx="4" stroke="#0A0F24" stroke-width="2" fill="none"/>
            <path d="M2 6.5L9.5 11" stroke="#0A0F24" stroke-width="2"/>
            <path d="M22 6.5L14.5 11" stroke="#0A0F24" stroke-width="2"/>
            <path d="M12 8.5C12 10.5 13.5 12 15.5 12C13.5 12 12 13.5 12 15.5C12 13.5 10.5 12 8.5 12C10.5 12 12 10.5 12 8.5Z" fill="#6366F1" stroke="#6366F1" stroke-width="1"/>
          </svg>
        </div>
      </div>

      <span className="font-extrabold text-[11px] text-brand-primary tracking-widest uppercase opacity-75 mt-1 z-10">
        MailFlow
      </span>
    </div>
  </div>
);
