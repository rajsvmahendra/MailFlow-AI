import { motion } from "framer-motion";
import {
  Zap,
  MessageSquare,
  Globe,
  ShieldCheck,
  MousePointer2,
  Layout,
  Check,
  Lock,
  Sparkles,
  ArrowRight
} from "lucide-react";
import { useState, useEffect } from "react";

const FeaturesGrid = () => {
  const [activeTone, setActiveTone] = useState("Professional");
  const tones = ["Professional", "Friendly", "Casual", "Urgent"];

  useEffect(() => {
    const interval = setInterval(() => {
      setActiveTone((prev) => {
        const nextIndex = (tones.indexOf(prev) + 1) % tones.length;
        return tones[nextIndex];
      });
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  return (
    <section id="features" className="py-32 bg-slate-50 relative overflow-hidden">
      {/* Decorative bg blobs */}
      <div className="absolute top-1/3 right-0 w-[400px] h-[400px] bg-brand-accent/5 rounded-full blur-[100px] pointer-events-none" />
      <div className="absolute bottom-10 left-0 w-[300px] h-[300px] bg-sky-500/5 rounded-full blur-[80px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
        {/* Header */}
        <div className="max-w-3xl mx-auto text-center mb-24">
          <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-indigo-50 border border-indigo-100 text-brand-accent text-xs font-bold uppercase tracking-wider mb-5">
            Core Capabilities
          </span>
          <h2 className="text-4xl md:text-5xl font-black text-brand-primary tracking-tight leading-tight mb-6">
            Next-generation features for <br className="hidden sm:block" />
            professional communicators
          </h2>
          <p className="text-lg text-slate-500 leading-relaxed max-w-2xl mx-auto">
            Experience the combination of high-performance speed, deep context understanding, 
            and total security. Craft email copies that build trust and convert.
          </p>
        </div>

        {/* Feature Grid: Asymmetrical Layout */}
        <div className="space-y-8">
          {/* Top Row: Two Large Featured Cards */}
          <div className="grid lg:grid-cols-12 gap-8">
            
            {/* Featured Card 1: Instant Generation */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.6 }}
              className="lg:col-span-7 bg-white rounded-card-lg border border-slate-100/80 shadow-[0_4px_30px_rgba(0,0,0,0.02)] p-10 hover:shadow-card-hover hover:border-brand-accent-light transition-all duration-300 relative overflow-hidden group flex flex-col justify-between min-h-[380px]"
            >
              <div className="absolute top-0 left-0 w-full h-[3px] bg-gradient-to-r from-brand-accent to-sky-400 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left" />
              
              <div className="grid md:grid-cols-12 gap-6 items-start">
                <div className="md:col-span-7 space-y-4">
                  <div className="w-12 h-12 rounded-xl bg-indigo-50 text-brand-accent flex items-center justify-center shadow-sm">
                    <Zap className="w-6 h-6" />
                  </div>
                  <h3 className="text-2xl font-bold text-brand-primary">Instant Generation</h3>
                  <p className="text-slate-500 text-sm leading-relaxed">
                    Generate polished, context-aware emails in less than 0.8 seconds. Our optimized inference engines ensure zero waiting time so you can compose and send on the fly.
                  </p>
                </div>

                {/* Custom Visual: Speedometer / Progress Bar */}
                <div className="md:col-span-5 bg-slate-50 border border-slate-100 rounded-2xl p-5 space-y-4 relative overflow-hidden h-fit">
                  <div className="flex items-center justify-between text-xs font-bold text-slate-500">
                    <span>Inference Speed</span>
                    <span className="text-emerald-500">0.8s (Ultra-fast)</span>
                  </div>
                  <div className="h-2 w-full bg-slate-200/60 rounded-full overflow-hidden">
                    <motion.div 
                      initial={{ width: "0%" }}
                      whileInView={{ width: "100%" }}
                      transition={{ duration: 1.5, repeat: Infinity, repeatDelay: 3 }}
                      className="h-full bg-brand-accent rounded-full"
                    />
                  </div>
                  <div className="space-y-2 pt-1">
                    <div className="flex items-center gap-2 text-xxs font-bold text-slate-400">
                      <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
                      Token generation complete
                    </div>
                    <div className="flex items-center gap-2 text-xxs font-bold text-slate-400">
                      <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
                      Optimized LLM model loaded
                    </div>
                  </div>
                </div>
              </div>

              <div className="mt-8 flex items-center gap-2 text-brand-accent text-xs font-bold uppercase tracking-wider">
                Powered by Gemini 1.5 Flash <ArrowRight className="w-3.5 h-3.5" />
              </div>
            </motion.div>

            {/* Featured Card 2: Context Awareness & Tone Adaptation */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="lg:col-span-5 bg-white rounded-card-lg border border-slate-100/80 shadow-[0_4px_30px_rgba(0,0,0,0.02)] p-10 hover:shadow-card-hover hover:border-brand-accent-light transition-all duration-300 relative overflow-hidden group flex flex-col justify-between min-h-[380px]"
            >
              <div className="absolute top-0 left-0 w-full h-[3px] bg-gradient-to-r from-brand-accent to-sky-400 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left" />
              
              <div className="space-y-5">
                <div className="w-12 h-12 rounded-xl bg-violet-50 text-violet-600 flex items-center justify-center shadow-sm">
                  <MessageSquare className="w-6 h-6" />
                </div>
                <h3 className="text-2xl font-bold text-brand-primary">Smart Tone Adaptation</h3>
                <p className="text-slate-500 text-sm leading-relaxed">
                  Adapt your content dynamically. Choose your tone preset and watch the AI write copy that perfectly matches your audience's expectations.
                </p>

                {/* Custom Visual: Dynamic Tone Tags Mockup */}
                <div className="bg-slate-50 border border-slate-100 rounded-2xl p-4 flex flex-wrap gap-2.5">
                  {tones.map((t) => (
                    <span
                      key={t}
                      className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all duration-300 ${
                        activeTone === t
                          ? "bg-brand-accent text-white shadow-sm scale-105"
                          : "bg-white border border-slate-200 text-slate-500"
                      }`}
                    >
                      {t}
                    </span>
                  ))}
                </div>
              </div>

              <div className="mt-8 flex items-center gap-2 text-violet-600 text-xs font-bold uppercase tracking-wider">
                Dynamic Tone Calibration <ArrowRight className="w-3.5 h-3.5" />
              </div>
            </motion.div>

          </div>

          {/* Bottom Row: Four Smaller Supporting Cards */}
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            
            {/* Card 3: Global Support */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="bg-white rounded-2xl border border-slate-100 p-7 shadow-sm hover:shadow-card-hover hover:border-brand-accent-light transition-all duration-300 relative group flex flex-col justify-between min-h-[260px]"
            >
              <div>
                <div className="w-10 h-10 rounded-xl bg-sky-50 text-sky-600 flex items-center justify-center mb-5 group-hover:scale-105 transition-transform">
                  <Globe className="w-5 h-5" />
                </div>
                <h4 className="text-lg font-bold text-brand-primary mb-2">Global Support</h4>
                <p className="text-slate-500 text-xs leading-relaxed">
                  Compose emails in over 30 languages with native-level fluency and correct regional contexts.
                </p>
              </div>
              
              {/* Custom Mini Visual: Language Flags/Chips */}
              <div className="flex gap-1.5 mt-4">
                <span className="text-[10px] font-bold text-slate-500 bg-slate-50 border border-slate-100 px-2 py-0.5 rounded-lg">EN</span>
                <span className="text-[10px] font-bold text-slate-500 bg-slate-50 border border-slate-100 px-2 py-0.5 rounded-lg">ES</span>
                <span className="text-[10px] font-bold text-slate-500 bg-slate-50 border border-slate-100 px-2 py-0.5 rounded-lg">FR</span>
                <span className="text-[10px] font-bold text-slate-500 bg-slate-50 border border-slate-100 px-2 py-0.5 rounded-lg">JA</span>
              </div>
            </motion.div>

            {/* Card 4: Privacy First */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.5, delay: 0.3 }}
              className="bg-white rounded-2xl border border-slate-100 p-7 shadow-sm hover:shadow-card-hover hover:border-brand-accent-light transition-all duration-300 relative group flex flex-col justify-between min-h-[260px]"
            >
              <div>
                <div className="w-10 h-10 rounded-xl bg-emerald-50 text-emerald-600 flex items-center justify-center mb-5 group-hover:scale-105 transition-transform">
                  <ShieldCheck className="w-5 h-5" />
                </div>
                <h4 className="text-lg font-bold text-brand-primary mb-2">Privacy First</h4>
                <p className="text-slate-500 text-xs leading-relaxed">
                  Your prompts and emails are fully encrypted. We never train model weights on your inputs.
                </p>
              </div>

              {/* Custom Mini Visual: Secure Lock Pulse */}
              <div className="mt-4 flex items-center gap-2">
                <span className="relative flex h-2 w-2">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
                </span>
                <span className="text-[10px] font-bold text-emerald-600 uppercase tracking-wide">AES-256 Secured</span>
              </div>
            </motion.div>

            {/* Card 5: Direct Integration */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.5, delay: 0.4 }}
              className="bg-white rounded-2xl border border-slate-100 p-7 shadow-sm hover:shadow-card-hover hover:border-brand-accent-light transition-all duration-300 relative group flex flex-col justify-between min-h-[260px]"
            >
              <div>
                <div className="w-10 h-10 rounded-xl bg-pink-50 text-pink-600 flex items-center justify-center mb-5 group-hover:scale-105 transition-transform">
                  <MousePointer2 className="w-5 h-5" />
                </div>
                <h4 className="text-lg font-bold text-brand-primary mb-2">Direct Integration</h4>
                <p className="text-slate-500 text-xs leading-relaxed">
                  Copy and paste into Gmail, Outlook, or Slack with formatting and subject titles preserved perfectly.
                </p>
              </div>

              {/* Custom Mini Visual: Clipboard Action Mockup */}
              <div className="mt-4 bg-slate-50 border border-slate-100 rounded-lg p-2 flex items-center justify-between text-xxs font-bold text-slate-500">
                <span>Copy Draft</span>
                <span className="flex items-center gap-1 text-emerald-500">
                  <Check className="w-3 h-3" /> Copied!
                </span>
              </div>
            </motion.div>

            {/* Card 6: Clean Experience */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.5, delay: 0.5 }}
              className="bg-white rounded-2xl border border-slate-100 p-7 shadow-sm hover:shadow-card-hover hover:border-brand-accent-light transition-all duration-300 relative group flex flex-col justify-between min-h-[260px]"
            >
              <div>
                <div className="w-10 h-10 rounded-xl bg-amber-50 text-amber-600 flex items-center justify-center mb-5 group-hover:scale-105 transition-transform">
                  <Layout className="w-5 h-5" />
                </div>
                <h4 className="text-lg font-bold text-brand-primary mb-2">Clean Experience</h4>
                <p className="text-slate-500 text-xs leading-relaxed">
                  Zero ads, zero clutter, and no complex settings. An interface that lets you write quickly and move on.
                </p>
              </div>

              {/* Custom Mini Visual: Clean wireframe line mockup */}
              <div className="mt-4 flex flex-col gap-1.5 opacity-55">
                <div className="h-1 bg-slate-200 rounded-full w-full" />
                <div className="h-1 bg-slate-200 rounded-full w-3/4" />
                <div className="h-1 bg-slate-100 rounded-full w-1/2" />
              </div>
            </motion.div>

          </div>
        </div>
      </div>
    </section>
  );
};

export default FeaturesGrid;

