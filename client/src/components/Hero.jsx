import { Link } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { Sparkles, ArrowRight, CheckCircle, Mail, Shield, Zap, Copy, RefreshCw } from "lucide-react";
import { useState, useEffect } from "react";
import { LogoIcon } from "./Logo";

const Hero = () => {
  const [simStep, setSimStep] = useState(0); // 0: prompt typing, 1: generating, 2: email writing, 3: completed

  useEffect(() => {
    let t1, t2, t3, t4;
    const runSimulation = () => {
      setSimStep(0);
      t1 = setTimeout(() => {
        setSimStep(1); // generating
        t2 = setTimeout(() => {
          setSimStep(2); // email writing
          t3 = setTimeout(() => {
            setSimStep(3); // completed/success
            t4 = setTimeout(() => {
              runSimulation();
            }, 6000);
          }, 3500);
        }, 1500);
      }, 3500);
    };
    runSimulation();
    return () => {
      clearTimeout(t1);
      clearTimeout(t2);
      clearTimeout(t3);
      clearTimeout(t4);
    };
  }, []);

  // Text data for simulation
  const promptText = "Write a polite follow-up email to the engineering team asking for an update on the API integration progress.";
  const emailSubject = "Follow-up: API Integration Progress Update";
  const emailBody = `Hi Team,

I hope you're having a great week. 

Just following up to see if there are any updates regarding the API integration. Let me know if you need any resources from my side to help move this forward.

Best,
Alex`;

  return (
    <section className="relative pt-40 pb-28 lg:pt-48 lg:pb-36 overflow-hidden bg-white">
      {/* Background Gradients & Grid Pattern */}
      <div className="absolute inset-0 bg-[linear-gradient(to_bottom,rgba(255,255,255,0)_70%,#f8fafc_100%)] pointer-events-none" />
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-7xl h-full -z-10 blur-[140px] opacity-40 pointer-events-none">
        <div className="absolute top-[-5%] left-[8%] w-[450px] h-[450px] bg-brand-accent/15 rounded-full animate-pulse duration-[12000ms]" />
        <div className="absolute top-[10%] right-[8%] w-[500px] h-[500px] bg-sky-400/15 rounded-full animate-pulse duration-[8000ms]" />
        <div className="absolute bottom-[10%] left-[20%] w-[400px] h-[400px] bg-violet-400/10 rounded-full" />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
        <div className="text-center max-w-4xl mx-auto mb-16 lg:mb-20">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            {/* Sleek Trust Badge / Social Proof */}
            <div className="inline-flex items-center gap-3 px-4.5 py-2.5 rounded-full bg-slate-50 border border-slate-100/80 shadow-[0_2px_12px_rgba(0,0,0,0.02)] mb-8 animate-fade-in">
              <div className="flex -space-x-2">
                <img className="w-6.5 h-6.5 rounded-full border-2 border-white object-cover" src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=64&h=64&q=80" alt="User 1" />
                <img className="w-6.5 h-6.5 rounded-full border-2 border-white object-cover" src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=64&h=64&q=80" alt="User 2" />
                <img className="w-6.5 h-6.5 rounded-full border-2 border-white object-cover" src="https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=64&h=64&q=80" alt="User 3" />
                <img className="w-6.5 h-6.5 rounded-full border-2 border-white object-cover" src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&w=64&h=64&q=80" alt="User 4" />
              </div>
              <div className="h-4 w-px bg-slate-200" />
              <div className="flex items-center gap-1.5 text-xs font-semibold text-slate-700">
                <span className="flex text-amber-500">★★★★★</span>
                <span className="text-slate-500 font-medium">Trusted by 10k+ inbox power users</span>
              </div>
            </div>

            <h1 className="text-5xl md:text-7xl font-extrabold text-brand-primary tracking-tight leading-[1.08] mb-8">
              Write professional emails <br className="hidden md:block" />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-brand-accent via-indigo-500 to-sky-500">
                10x faster with AI
              </span>
            </h1>

            <p className="text-lg md:text-xl text-slate-500 mb-10 leading-relaxed max-w-2xl mx-auto font-medium">
              The premium AI companion designed for your inbox. Craft perfectly toned, professional 
              messages for every situation in seconds, not hours.
            </p>

            <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-14">
              <Link
                to="/register"
                className="w-full sm:w-auto px-8 py-4.5 bg-brand-primary hover:bg-brand-primary-hover text-white font-bold text-base rounded-btn-large flex items-center justify-center gap-2 shadow-[0_10px_25px_-5px_rgba(10,15,36,0.15)] hover:shadow-[0_15px_30px_-5px_rgba(10,15,36,0.22)] active:scale-[0.98] transition-all duration-300 group"
              >
                Get Started for Free
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </Link>
              <a 
                href="#features"
                className="w-full sm:w-auto px-8 py-4.5 bg-white border border-slate-200 hover:border-slate-300 text-slate-700 hover:text-brand-primary font-bold text-base rounded-btn-large flex items-center justify-center gap-2 active:scale-[0.98] transition-all duration-300 shadow-sm"
              >
                Explore Features
              </a>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 text-left max-w-3xl mx-auto pt-8 border-t border-slate-100">
              <div className="flex items-center justify-center sm:justify-start gap-2.5 text-slate-600 font-semibold text-sm">
                <span className="flex items-center justify-center w-5 h-5 rounded-full bg-emerald-50 text-emerald-500 shrink-0">
                  <CheckCircle className="w-3.5 h-3.5" />
                </span>
                No credit card required
              </div>
              <div className="flex items-center justify-center sm:justify-start gap-2.5 text-slate-600 font-semibold text-sm">
                <span className="flex items-center justify-center w-5 h-5 rounded-full bg-emerald-50 text-emerald-500 shrink-0">
                  <CheckCircle className="w-3.5 h-3.5" />
                </span>
                100% Privacy focused
              </div>
              <div className="flex items-center justify-center sm:justify-start gap-2.5 text-slate-600 font-semibold text-sm">
                <span className="flex items-center justify-center w-5 h-5 rounded-full bg-emerald-50 text-emerald-500 shrink-0">
                  <CheckCircle className="w-3.5 h-3.5" />
                </span>
                Smart tone adapter
              </div>
            </div>
          </motion.div>
        </div>

        {/* Floating Preview Element (High-Fidelity macOS Mockup) */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.3 }}
          className="relative px-2 lg:px-8 max-w-6xl mx-auto"
        >
          {/* Glassmorphic Shadow Ring */}
          <div className="absolute -inset-1 bg-gradient-to-tr from-brand-accent/20 to-blue-500/20 rounded-[2.6rem] blur-2xl opacity-75 -z-10" />
          
          <div className="relative bg-white rounded-layout border border-gray-100 shadow-2xl overflow-hidden p-1.5 md:p-3">
            {/* macOS Title Bar */}
            <div className="flex items-center justify-between px-6 py-4 bg-gray-50/80 backdrop-blur-sm border-b border-gray-100 rounded-t-[2.2rem]">
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 bg-red-400 rounded-full" />
                <div className="w-3 h-3 bg-yellow-400 rounded-full" />
                <div className="w-3 h-3 bg-green-400 rounded-full" />
              </div>
              <div className="text-xs font-bold text-gray-500 uppercase tracking-widest flex items-center gap-1.5">
                <LogoIcon className="w-3.5 h-3.5 text-brand-accent" />
                MailFlow Composer AI
              </div>
              <div className="w-16" />
            </div>

            {/* Mockup Workspace */}
            <div className="bg-[#FAFBFD] p-4 md:p-8 rounded-b-[2.2rem] grid md:grid-cols-3 gap-6 md:gap-8 items-start min-h-[460px]">
              
              {/* Left Column: AI Settings Panel */}
              <div className="md:col-span-1 bg-white p-5 rounded-2xl border border-gray-100 shadow-sm space-y-4">
                <h4 className="text-sm font-bold text-brand-primary uppercase tracking-wider mb-2 flex items-center gap-2">
                  <Sparkles className="w-4 h-4 text-brand-accent" />
                  AI Settings
                </h4>
                
                <div className="space-y-3">
                  <div>
                    <span className="block text-xs font-bold text-gray-500 uppercase mb-1.5">Purpose</span>
                    <div className="w-full min-h-[90px] p-3 rounded-xl border border-gray-100 bg-gray-50/50 text-xs font-semibold text-brand-primary leading-relaxed relative overflow-hidden">
                      {simStep >= 0 && (
                        <motion.span
                          initial={{ opacity: 0 }}
                          animate={{ opacity: 1 }}
                          transition={{ duration: 1.5 }}
                        >
                          {simStep === 0 ? (
                            <motion.span
                              animate={{ opacity: [1, 0, 1] }}
                              transition={{ repeat: Infinity, duration: 0.8 }}
                              className="border-r-2 border-brand-accent pr-0.5"
                            >
                              {promptText.substring(0, Math.floor(promptText.length * 0.7))}
                            </motion.span>
                          ) : promptText}
                        </motion.span>
                      )}
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-2">
                    <div>
                      <span className="block text-xs font-bold text-gray-500 uppercase mb-1.5">Tone</span>
                      <div className="px-3 py-2 rounded-xl border border-gray-100 bg-gray-50 text-xs font-bold text-brand-primary">
                        Professional
                      </div>
                    </div>
                    <div>
                      <span className="block text-xs font-bold text-gray-500 uppercase mb-1.5">Tone Style</span>
                      <div className="px-3 py-2 rounded-xl border border-gray-100 bg-gray-50 text-xs font-bold text-brand-primary">
                        Friendly
                      </div>
                    </div>
                  </div>

                  <div className="pt-2">
                    <button
                      type="button"
                      className={`w-full py-3 rounded-xl text-xs font-bold flex items-center justify-center gap-2 transition-all duration-300 shadow-sm ${
                        simStep === 1 
                          ? "bg-brand-accent text-white" 
                          : "bg-brand-primary text-white"
                      }`}
                    >
                      {simStep === 1 ? (
                        <>
                          <RefreshCw className="w-4 h-4 animate-spin" />
                          Generating...
                        </>
                      ) : (
                        <>
                          <Sparkles className="w-4 h-4" />
                          Compose Draft
                        </>
                      )}
                    </button>
                  </div>
                </div>
              </div>

              {/* Right Column: AI Output Panel */}
              <div className="md:col-span-2 bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden flex flex-col min-h-[350px] relative">
                <div className="p-4 border-b border-gray-50 bg-gray-50/50 flex items-center justify-between">
                  <span className="text-xs font-bold text-brand-primary flex items-center gap-2">
                    <Mail className="w-4 h-4 text-brand-accent" />
                    AI Generated Draft
                  </span>
                  <button type="button" className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-gray-200 text-xs font-bold text-gray-600 hover:border-brand-accent-light transition-all">
                    <Copy className="w-3.5 h-3.5" />
                    Copy
                  </button>
                </div>

                <div className="p-6 space-y-4 flex-1 flex flex-col justify-start">
                  {simStep >= 2 ? (
                    <motion.div
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ duration: 0.5 }}
                      className="space-y-4"
                    >
                      <div>
                        <span className="text-xxs font-bold text-gray-400 uppercase tracking-wider block mb-1">Subject</span>
                        <h5 className="text-sm font-bold text-brand-primary">
                          {simStep === 2 ? (
                            <motion.span
                              animate={{ opacity: [1, 0, 1] }}
                              transition={{ repeat: Infinity, duration: 0.8 }}
                              className="border-r-2 border-brand-accent pr-0.5"
                            >
                              {emailSubject.substring(0, Math.floor(emailSubject.length * 0.8))}
                            </motion.span>
                          ) : emailSubject}
                        </h5>
                      </div>
                      
                      <div className="h-px bg-gray-100" />
                      
                      <div>
                        <span className="text-xxs font-bold text-gray-400 uppercase tracking-wider block mb-1">Body</span>
                        <p className="text-xs text-gray-600 whitespace-pre-wrap leading-relaxed">
                          {simStep === 2 ? (
                            <motion.span
                              animate={{ opacity: [1, 0, 1] }}
                              transition={{ repeat: Infinity, duration: 0.8 }}
                              className="border-r-2 border-brand-accent pr-0.5"
                            >
                              {emailBody.substring(0, Math.floor(emailBody.length * 0.7))}
                            </motion.span>
                          ) : emailBody}
                        </p>
                      </div>
                    </motion.div>
                  ) : (
                    <div className="flex-1 flex flex-col items-center justify-center text-center p-8">
                      {simStep === 1 ? (
                        <div className="space-y-3">
                          <RefreshCw className="w-8 h-8 text-brand-accent animate-spin mx-auto" />
                          <p className="text-xs font-bold text-brand-primary">Drafting with Gemini...</p>
                        </div>
                      ) : (
                        <div className="space-y-2">
                          <Mail className="w-8 h-8 text-gray-300 mx-auto" />
                          <p className="text-xs text-gray-400 font-medium">Waiting to compose...</p>
                        </div>
                      )}
                    </div>
                  )}

                  {/* Success notification popup */}
                  <AnimatePresence>
                    {simStep === 3 && (
                      <motion.div
                        initial={{ opacity: 0, y: 15, scale: 0.95 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        exit={{ opacity: 0, y: 15 }}
                        className="absolute bottom-6 right-6 bg-brand-primary text-white px-4 py-3 rounded-xl flex items-center gap-2.5 shadow-xl border border-gray-700/50"
                      >
                        <CheckCircle className="w-4 h-4 text-green-400 shrink-0" />
                        <span className="text-xs font-bold">Email Generated!</span>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              </div>
            </div>
          </div>

          {/* Decorative floating badge 1 */}
          <motion.div
            animate={{ y: [0, -10, 0] }}
            transition={{ repeat: Infinity, duration: 4, ease: "easeInOut" }}
            className="absolute -top-10 -left-6 bg-white p-4 rounded-2xl shadow-xl flex items-center gap-3 border border-gray-100/80 backdrop-blur-sm z-20"
          >
            <div className="p-2.5 bg-yellow-50 rounded-xl"><Zap className="w-5 h-5 text-yellow-500" /></div>
            <div>
              <div className="text-xxs font-bold text-gray-400 uppercase tracking-widest">Speed</div>
              <div className="text-xs font-bold text-brand-primary">Generated in 0.8s</div>
            </div>
          </motion.div>

          {/* Decorative floating badge 2 */}
          <motion.div
            animate={{ y: [0, 10, 0] }}
            transition={{ repeat: Infinity, duration: 4, delay: 1, ease: "easeInOut" }}
            className="absolute -bottom-6 -right-6 bg-white p-4 rounded-2xl shadow-xl flex items-center gap-3 border border-gray-100/80 backdrop-blur-sm z-20"
          >
            <div className="p-2.5 bg-blue-50 rounded-xl"><Shield className="w-5 h-5 text-blue-500" /></div>
            <div>
              <div className="text-xxs font-bold text-gray-400 uppercase tracking-widest">Security</div>
              <div className="text-xs font-bold text-brand-primary">100% Privacy Focused</div>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};

export default Hero;
