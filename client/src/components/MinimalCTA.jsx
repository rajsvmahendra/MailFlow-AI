import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { ArrowRight, Sparkles } from "lucide-react";

const MinimalCTA = () => {
  return (
    <section className="py-32 px-4 sm:px-6 lg:px-8 bg-slate-50 overflow-hidden relative">
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.7 }}
        className="max-w-6xl mx-auto relative bg-gradient-to-br from-[#090D1A] via-[#121936] to-[#0A0F24] rounded-layout px-8 py-20 text-center overflow-hidden border border-slate-800/80 shadow-[0_24px_50px_rgba(10,15,36,0.15)]"
      >
        {/* Soft background glow orbs */}
        <div className="absolute top-0 right-0 -translate-y-1/3 translate-x-1/3 w-[450px] h-[450px] bg-brand-accent/20 rounded-full blur-[100px] pointer-events-none" />
        <div className="absolute bottom-0 left-0 translate-y-1/3 -translate-x-1/3 w-[450px] h-[450px] bg-sky-500/10 rounded-full blur-[100px] pointer-events-none" />

        <div className="relative z-10 max-w-3xl mx-auto flex flex-col items-center">
          {/* Small badge */}
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-slate-800/40 border border-slate-700/50 text-slate-300 text-xs font-bold uppercase tracking-wider mb-8">
            <Sparkles className="w-3.5 h-3.5 text-brand-accent animate-pulse" />
            No credit card required
          </div>

          <h2 className="text-4xl md:text-6xl font-black text-white mb-6 tracking-tight leading-[1.1]">
            Ready to reclaim <br className="hidden md:block" />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-brand-accent via-indigo-300 to-sky-200">
              your productive time?
            </span>
          </h2>
          
          <p className="text-base md:text-lg text-slate-300 mb-10 leading-relaxed max-w-2xl mx-auto font-medium">
            Join thousands of inbox power users who have upgraded their email game with MailFlow AI. 
            Draft context-aware replies instantly and never look at a blank screen again.
          </p>
          
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 w-full sm:w-auto">
            <Link
              to="/register"
              className="w-full sm:w-auto bg-white text-brand-primary hover:bg-slate-100 px-8 py-4.5 rounded-btn-large font-bold text-base hover:shadow-lg active:scale-[0.98] transition-all duration-300 flex items-center justify-center gap-2 group outline-none"
            >
              Get Started for Free
              <ArrowRight className="w-4 h-4 text-brand-primary group-hover:translate-x-1 transition-transform" />
            </Link>
            <Link
              to="/login"
              className="w-full sm:w-auto border border-slate-700 text-slate-200 hover:text-white hover:bg-white/5 px-8 py-4.5 rounded-btn-large font-bold text-base active:scale-[0.98] transition-all duration-300 flex items-center justify-center outline-none"
            >
              Sign In to Your Account
            </Link>
          </div>
        </div>
      </motion.div>
    </section>
  );
};

export default MinimalCTA;


