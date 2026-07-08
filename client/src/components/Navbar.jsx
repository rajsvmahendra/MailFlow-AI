import { Link } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X } from "lucide-react";
import { useEffect, useState } from "react";
import { LogoIcon, Logo } from "./Logo";

const Navbar = () => {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <motion.nav
      initial={{ y: -30, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 h-16 ${
        scrolled 
          ? "bg-white/85 backdrop-blur-md border-b border-gray-100/80 shadow-[0_2px_20px_rgba(31,42,55,0.03)]" 
          : "bg-white/50 backdrop-blur-md border-b border-transparent"
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-full">
        <div className="flex items-center justify-between h-full">
          {/* Logo */}
          <Link to="/" aria-label="MailFlow AI Home" className="flex items-center group focus-visible:ring-2 focus-visible:ring-brand-primary focus-visible:ring-offset-2 outline-none rounded-xl">
            <Logo />
          </Link>

          {/* Navigation Links */}
          <div className="hidden md:flex items-center space-x-8">
            <a
              href="#features"
              className="text-sm font-semibold text-gray-600 hover:text-brand-primary transition-all duration-200 focus-visible:ring-2 focus-visible:ring-brand-primary focus-visible:ring-offset-2 outline-none rounded-md px-2 py-1"
            >
              Features
            </a>
            <a
              href="#how-it-works"
              className="text-sm font-semibold text-gray-600 hover:text-brand-primary transition-all duration-200 focus-visible:ring-2 focus-visible:ring-brand-primary focus-visible:ring-offset-2 outline-none rounded-md px-2 py-1"
            >
              How it Works
            </a>
            <div className="h-6 w-px bg-gray-200 mx-2" />
            <Link
              to="/login"
              className="text-sm font-semibold text-gray-600 hover:text-brand-primary transition-all duration-200 focus-visible:ring-2 focus-visible:ring-brand-primary focus-visible:ring-offset-2 outline-none rounded-md px-2 py-1"
            >
              Log in
            </Link>
            <Link
              to="/register"
              className="btn-primary btn-sm px-6 shadow-md hover:bg-brand-primary-hover active:scale-95"
            >
              Get Started
            </Link>
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden">
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 text-gray-600 hover:text-brand-primary focus:ring-2 focus:ring-brand-primary rounded-xl outline-none transition-colors"
              aria-label="Toggle menu"
              aria-expanded={mobileMenuOpen}
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Navigation Dropdown */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.2 }}
            className="md:hidden bg-white/95 backdrop-blur-lg border-b border-gray-100 px-4 pt-2 pb-6 space-y-3 shadow-lg"
          >
            <a
              href="#features"
              onClick={() => setMobileMenuOpen(false)}
              className="block text-sm font-semibold text-gray-600 hover:text-brand-primary hover:bg-slate-50 px-3 py-2 rounded-lg transition-all"
            >
              Features
            </a>
            <a
              href="#how-it-works"
              onClick={() => setMobileMenuOpen(false)}
              className="block text-sm font-semibold text-gray-600 hover:text-brand-primary hover:bg-slate-50 px-3 py-2 rounded-lg transition-all"
            >
              How it Works
            </a>
            <div className="h-px bg-gray-100 my-2" />
            <Link
              to="/login"
              onClick={() => setMobileMenuOpen(false)}
              className="block text-sm font-semibold text-gray-600 hover:text-brand-primary hover:bg-slate-50 px-3 py-2 rounded-lg transition-all"
            >
              Log in
            </Link>
            <Link
              to="/register"
              onClick={() => setMobileMenuOpen(false)}
              className="block btn-primary btn-sm w-full text-center py-2.5 px-6 shadow-md hover:bg-brand-primary-hover active:scale-95 mt-2"
            >
              Get Started
            </Link>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.nav>
  );
};

export default Navbar;

