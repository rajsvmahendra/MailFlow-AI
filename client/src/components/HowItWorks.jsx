import { motion } from "framer-motion";
import { Keyboard, Cpu, Mail, Send, CheckCircle2 } from "lucide-react";
import { useState, useEffect } from "react";

const HowItWorks = () => {
  const [activeStep, setActiveStep] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setActiveStep((prev) => (prev + 1) % 4);
    }, 2500);
    return () => clearInterval(interval);
  }, []);

  const steps = [
    {
      title: "User Input",
      description: "Define the recipient, context, and desired tone constraints in the composer input field.",
      icon: <Keyboard className="w-6 h-6" />,
      color: "bg-blue-50 text-blue-600 border-blue-100",
      pill: "bg-blue-500/10 text-blue-700"
    },
    {
      title: "AI Processing",
      description: "Gemini AI analyzes context, intent, and tone rules to draft high-fidelity responses.",
      icon: <Cpu className="w-6 h-6" />,
      color: "bg-indigo-50 text-indigo-600 border-indigo-100",
      pill: "bg-indigo-500/10 text-indigo-700"
    },
    {
      title: "Generated Email",
      description: "Review a beautifully structured and professional email draft crafted in under a second.",
      icon: <Mail className="w-6 h-6" />,
      color: "bg-violet-50 text-violet-600 border-violet-100",
      pill: "bg-violet-500/10 text-violet-700"
    },
    {
      title: "Copy & Send",
      description: "Instantly copy the finished draft and paste it into your favorite email client with one click.",
      icon: <Send className="w-6 h-6" />,
      color: "bg-emerald-50 text-emerald-600 border-emerald-100",
      pill: "bg-emerald-500/10 text-emerald-700"
    }
  ];

  return (
    <section id="how-it-works" className="py-32 bg-white relative overflow-hidden">
      {/* Decorative gradients */}
      <div className="absolute top-1/2 left-0 -translate-y-1/2 w-[350px] h-[350px] bg-indigo-50 rounded-full blur-[120px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="text-center max-w-3xl mx-auto mb-24">
          <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-violet-50 border border-violet-100 text-brand-accent text-xs font-bold uppercase tracking-wider mb-5">
            The Workflow
          </span>
          <h2 className="text-4xl md:text-5xl font-black text-brand-primary tracking-tight leading-tight mb-6">
            From spark to send in seconds
          </h2>
          <p className="text-lg text-slate-500 leading-relaxed">
            Stop starting from scratch. Our streamlined, high-performance workflow handles the 
            heavy lifting so you can communicate effortlessly.
          </p>
        </div>

        {/* Workflow Map */}
        <div className="relative">
          {/* Connecting SVG Path - Desktop (Horizontal) */}
          <div className="absolute top-16 left-[10%] right-[10%] h-1 z-0 hidden lg:block pointer-events-none">
            <svg className="w-full h-8 overflow-visible" fill="none">
              <path
                d="M 0 4 H 1000"
                stroke="#e2e8f0"
                strokeWidth="2"
                strokeDasharray="6,4"
              />
              <motion.path
                d="M 0 4 H 1000"
                stroke="#6366f1"
                strokeWidth="2.5"
                strokeDasharray="6,4"
                className="animate-dash"
              />
            </svg>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-4 gap-8 relative z-10">
            {steps.map((step, index) => {
              const isCurrent = activeStep === index;
              return (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-60px" }}
                  transition={{ duration: 0.5, delay: index * 0.15 }}
                  onClick={() => setActiveStep(index)}
                  className={`cursor-pointer bg-white group p-8 rounded-2xl border transition-all duration-300 flex flex-col justify-between min-h-[300px] ${
                    isCurrent
                      ? "border-brand-accent shadow-card-hover scale-[1.03]"
                      : "border-slate-100 shadow-sm hover:border-slate-200"
                  }`}
                >
                  <div className="space-y-6">
                    {/* Top row: step number and status indicator */}
                    <div className="flex items-center justify-between">
                      <span className={`text-[10px] font-black uppercase tracking-wider px-2 py-0.5 rounded-md ${step.pill}`}>
                        Step 0{index + 1}
                      </span>
                      
                      {/* Active status pulse */}
                      {isCurrent && (
                        <span className="flex h-2.5 w-2.5 relative">
                          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-brand-accent opacity-75" />
                          <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-brand-accent" />
                        </span>
                      )}
                    </div>

                    <div className={`w-12 h-12 rounded-xl ${step.color} border flex items-center justify-center shadow-sm group-hover:scale-105 transition-transform duration-300`}>
                      {step.icon}
                    </div>

                    <div>
                      <h4 className="text-xl font-bold text-brand-primary mb-3">{step.title}</h4>
                      <p className="text-slate-500 text-xs leading-relaxed">
                        {step.description}
                      </p>
                    </div>
                  </div>

                  <div className="mt-8 flex items-center gap-2 text-[10px] font-bold text-slate-400 uppercase tracking-widest">
                    <CheckCircle2 className={`w-4 h-4 ${isCurrent ? "text-brand-accent" : "text-slate-200"}`} />
                    {isCurrent ? "Active Processing" : "Idle"}
                  </div>
                </motion.div>
              );
            })}
          </div>

          {/* Desktop connecting arrow accents between elements */}
          <div className="absolute top-[3.75rem] left-[23%] w-[4%] h-[2px] hidden lg:block z-0 pointer-events-none opacity-40">
            <span className="flex h-3 w-3 bg-brand-accent rounded-full animate-ping" />
          </div>
          <div className="absolute top-[3.75rem] left-[48%] w-[4%] h-[2px] hidden lg:block z-0 pointer-events-none opacity-40">
            <span className="flex h-3 w-3 bg-indigo-500 rounded-full animate-ping" />
          </div>
          <div className="absolute top-[3.75rem] left-[73%] w-[4%] h-[2px] hidden lg:block z-0 pointer-events-none opacity-40">
            <span className="flex h-3 w-3 bg-violet-500 rounded-full animate-ping" />
          </div>
        </div>
      </div>
    </section>
  );
};

export default HowItWorks;

