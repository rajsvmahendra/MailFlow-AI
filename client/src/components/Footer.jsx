import { Link } from "react-router-dom";
import { Github, Linkedin } from "lucide-react";
import { Logo } from "./Logo";

const Footer = () => {
  return (
    <footer className="bg-slate-50 py-12 px-4 sm:px-6 lg:px-8 border-t border-slate-100 relative">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-6">
        {/* Brand & Mission */}
        <div className="flex items-center gap-3">
          <Logo />
          <span className="text-slate-300 hidden sm:inline">|</span>
          <p className="text-slate-400 text-xs font-medium hidden sm:inline">
            Intelligent email composition and workflow orchestration.
          </p>
        </div>

        {/* Social & Professional Links */}
        <div className="flex items-center gap-4">
          <a
            href="https://github.com/rajsvmahendra"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="GitHub profile"
            className="p-2 bg-white border border-slate-200 text-slate-500 hover:text-brand-accent hover:border-brand-accent-light rounded-xl transition-all duration-300 shadow-sm flex items-center justify-center"
          >
            <Github className="w-4 h-4" />
          </a>
          <a
            href="https://www.linkedin.com/in/rajsvmahendra/"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="LinkedIn profile"
            className="p-2 bg-white border border-slate-200 text-slate-500 hover:text-brand-accent hover:border-brand-accent-light rounded-xl transition-all duration-300 shadow-sm flex items-center justify-center"
          >
            <Linkedin className="w-4 h-4" />
          </a>
        </div>
      </div>

      {/* Divider */}
      <div className="max-w-7xl mx-auto h-px bg-slate-200/60 my-6" />

      {/* Bottom Bar */}
      <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4">
        <p className="text-slate-400 text-[11px] font-semibold text-center sm:text-left">
          © 2026 Rajsv Mahendra. All rights reserved.
        </p>
        <div className="flex items-center gap-6 text-[11px] font-semibold">
          <a href="#" className="text-slate-400 hover:text-slate-600 transition-colors">Privacy Policy</a>
          <a href="#" className="text-slate-400 hover:text-slate-600 transition-colors">Terms of Service</a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;

