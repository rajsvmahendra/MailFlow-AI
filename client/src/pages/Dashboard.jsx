import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import {
  Plus,
  Mail,
  FileText,
  TrendingUp,
  TrendingDown,
  ArrowUpRight,
  Activity,
  History,
  Send,
  Sparkles,
  ChevronRight,
  Settings,
  Clock
} from "lucide-react";
import DashboardLayout from "../components/DashboardLayout";
import { API_URL } from "../config";
import PageTransition from "../components/PageTransition";
import { DashboardSkeleton } from "../components/Skeletons";

const Dashboard = () => {
  const navigate = useNavigate();

  const [stats, setStats] = useState({
    totalEmails: 0,
    emailsThisWeek: 0,
    savedDrafts: 0,
  });
  const [activities, setActivities] = useState([]);
  const [userName, setUserName] = useState("User");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    document.title = "Dashboard | MailFlow AI";
    // Fetch user name
    const userData = localStorage.getItem("user");
    if (userData) {
      try {
        const parsed = JSON.parse(userData);
        if (parsed && parsed.name) {
          setUserName(parsed.name.split(" ")[0]); // Use first name
        }
      } catch (e) {
        console.error("Error parsing user data", e);
      }
    }

    const fetchStats = async () => {
      try {
        const res = await fetch(`${API_URL}/api/email/stats`, {
          headers: {
            Authorization: "Bearer " + localStorage.getItem("token"),
          },
        });
        let data;
        try {
          data = await res.json();
        } catch (jsonErr) {
          throw new Error("Unable to parse stats from server.");
        }
        if (data.success) {
          setStats({
            totalEmails: data.totalEmails,
            emailsThisWeek: data.emailsThisWeek,
            savedDrafts: data.savedDrafts,
          });
        } else {
          console.error("Fetch stats failed:", data.message);
        }
      } catch (error) {
        console.error("Error fetching stats:", error);
      }
    };

    const fetchActivity = async () => {
      try {
        const res = await fetch(`${API_URL}/api/email/activity`, {
          headers: {
            Authorization: "Bearer " + localStorage.getItem("token"),
          },
        });
        let data;
        try {
          data = await res.json();
        } catch (jsonErr) {
          throw new Error("Unable to parse activity from server.");
        }
        if (data.success) {
          setActivities(data.activities);
        } else {
          console.error("Fetch activity failed:", data.message);
        }
      } catch (error) {
        console.error("Error fetching activity:", error);
      }
    };

    const loadAll = async () => {
      setLoading(true);
      await Promise.all([fetchStats(), fetchActivity()]);
      setLoading(false);
    };
    loadAll();
  }, []);

  const containerVariants = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.08
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 15 },
    show: { opacity: 1, y: 0, transition: { type: "spring", stiffness: 100 } }
  };

  // Inline SVG Sparklines for stats cards
  const Sparkline = ({ strokeColor = "#6366f1", points }) => (
    <svg className="w-20 h-8 overflow-visible opacity-75 shrink-0" viewBox="0 0 100 30" fill="none">
      <path
        d={points}
        stroke={strokeColor}
        strokeWidth="2.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );

  const statCards = [
    {
      label: "Total Generated",
      value: stats.totalEmails,
      icon: <Mail className="w-5 h-5" />,
      color: "text-[#6366f1] border-indigo-100/60 bg-indigo-50/50",
      gradient: "from-indigo-500/5 to-violet-500/5",
      sparklinePoints: "M0,20 Q15,5 30,22 T60,8 T80,18 T100,5",
      strokeColor: "#6366f1",
      trend: "+12.4%",
      isPositive: true
    },
    {
      label: "Active This Week",
      value: stats.emailsThisWeek,
      icon: <TrendingUp className="w-5 h-5" />,
      color: "text-sky-600 border-sky-100/60 bg-sky-50/50",
      gradient: "from-sky-500/5 to-blue-500/5",
      sparklinePoints: "M0,25 Q15,18 30,12 T60,20 T80,8 T100,4",
      strokeColor: "#0ea5e9",
      trend: "+8.2%",
      isPositive: true
    },
    {
      label: "Saved Drafts",
      value: stats.savedDrafts,
      icon: <FileText className="w-5 h-5" />,
      color: "text-emerald-600 border-emerald-100/60 bg-emerald-50/50",
      gradient: "from-emerald-500/5 to-teal-500/5",
      sparklinePoints: "M0,8 Q15,12 30,20 T60,10 T80,18 T100,24",
      strokeColor: "#10b981",
      trend: "-1.5%",
      isPositive: false
    }
  ];

  // Mock weekly activity for bar chart
  const weeklyData = [
    { day: "Mon", count: Math.max(2, Math.floor(stats.emailsThisWeek * 0.1)) },
    { day: "Tue", count: Math.max(5, Math.floor(stats.emailsThisWeek * 0.25)) },
    { day: "Wed", count: Math.max(3, Math.floor(stats.emailsThisWeek * 0.15)) },
    { day: "Thu", count: Math.max(6, Math.floor(stats.emailsThisWeek * 0.3)) },
    { day: "Fri", count: Math.max(4, Math.floor(stats.emailsThisWeek * 0.2)) },
    { day: "Sat", count: Math.max(1, Math.floor(stats.emailsThisWeek * 0.05)) },
    { day: "Sun", count: Math.max(0, Math.floor(stats.emailsThisWeek * 0.02)) },
  ];
  const maxWeeklyCount = Math.max(...weeklyData.map(d => d.count), 1);

  return (
    <DashboardLayout>
      <PageTransition>
        {loading ? (
          <DashboardSkeleton />
        ) : (
          <div className="max-w-7xl mx-auto space-y-6">
        
        {/* Welcome Section */}
        <header className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 pb-4 border-b border-slate-100">
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
          >
            <h2 className="text-2xl font-bold text-brand-primary tracking-tight">
              Welcome back, {userName}
            </h2>
            <p className="text-slate-400 text-xs font-semibold mt-1">
              Analyze your generative outputs, draft records, and messaging metrics.
            </p>
          </motion.div>
 
          <motion.button
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            onClick={() => navigate("/create-email")}
            className="btn-primary btn-sm gap-2 shadow-sm rounded-xl shrink-0"
          >
            <Plus className="w-4 h-4" />
            Compose New Email
          </motion.button>
        </header>

        {/* Quick Actions Panel */}
        <section className="space-y-4">
          <h3 className="text-xs font-bold text-slate-400 uppercase tracking-widest">Quick Operations</h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <button
              onClick={() => navigate("/create-email")}
              className="flex items-center justify-between p-5 bg-white border border-slate-100 hover:border-indigo-200 rounded-2xl hover:shadow-[0_4px_20px_rgba(0,0,0,0.02)] transition-all text-left outline-none group"
            >
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-indigo-50 text-brand-accent flex items-center justify-center group-hover:scale-105 transition-transform">
                  <Plus className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="text-sm font-bold text-slate-800">Compose Draft</h4>
                  <p className="text-[10px] text-slate-400 font-semibold">Generate new AI email</p>
                </div>
              </div>
              <ChevronRight className="w-4 h-4 text-slate-300 group-hover:translate-x-1 transition-transform" />
            </button>

            <button
              onClick={() => navigate("/email-history")}
              className="flex items-center justify-between p-5 bg-white border border-slate-100 hover:border-indigo-200 rounded-2xl hover:shadow-[0_4px_20px_rgba(0,0,0,0.02)] transition-all text-left outline-none group"
            >
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-sky-50 text-sky-600 flex items-center justify-center group-hover:scale-105 transition-transform">
                  <History className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="text-sm font-bold text-slate-800">Draft History</h4>
                  <p className="text-[10px] text-slate-400 font-semibold">View previous drafts</p>
                </div>
              </div>
              <ChevronRight className="w-4 h-4 text-slate-300 group-hover:translate-x-1 transition-transform" />
            </button>
          </div>
        </section>

        {/* Stats Grid */}
        <motion.section
          variants={containerVariants}
          initial="hidden"
          animate="show"
          className="grid gap-6 sm:grid-cols-3"
        >
          {statCards.map((card, idx) => (
            <motion.div
              key={idx}
              variants={itemVariants}
              whileHover={{ y: -4, shadow: "0 12px 24px -10px rgba(10,15,36,0.08)" }}
              className={`bg-white border border-slate-100 rounded-2xl p-6 shadow-sm hover:border-indigo-100 transition-all duration-300 relative overflow-hidden group`}
            >
              {/* Subtle background glow */}
              <div className={`absolute inset-0 bg-gradient-to-br ${card.gradient} opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none`} />

              <div className="relative z-10 flex items-start justify-between">
                <div className="space-y-4">
                  <div className={`w-9 h-9 rounded-xl border flex items-center justify-center ${card.color}`}>
                    {card.icon}
                  </div>
                  <div className="space-y-1">
                    <p className="text-xs text-slate-400 font-bold uppercase tracking-wider">{card.label}</p>
                    <div className="flex items-baseline gap-2">
                      <span className="text-3xl font-black text-brand-primary">{card.value}</span>
                      
                      <span className={`inline-flex items-center gap-0.5 px-1.5 py-0.5 rounded text-[10px] font-bold ${
                        card.isPositive 
                          ? "bg-emerald-50 text-emerald-600" 
                          : "bg-rose-50 text-rose-600"
                      }`}>
                        {card.isPositive ? <ArrowUpRight className="w-2.5 h-2.5" /> : <TrendingDown className="w-2.5 h-2.5" />}
                        {card.trend}
                      </span>
                    </div>
                  </div>
                </div>

                {/* Inline SVG Sparkline */}
                <Sparkline strokeColor={card.strokeColor} points={card.sparklinePoints} />
              </div>
            </motion.div>
          ))}
        </motion.section>

        {/* Analytics Workspace section */}
        <section className="grid lg:grid-cols-12 gap-6">
          {/* Weekly usage barchart */}
          <div className="lg:col-span-8 bg-white border border-slate-100 rounded-2xl p-6 shadow-sm">
            <h3 className="text-sm font-bold text-brand-primary uppercase tracking-wider mb-6 flex items-center gap-2">
              <Activity className="w-4 h-4 text-brand-accent" />
              Weekly Usage Overview
            </h3>

            {/* Custom bar chart */}
            <div className="flex justify-between items-end h-48 pt-4">
              {weeklyData.map((data, idx) => {
                const heightPercent = `${(data.count / maxWeeklyCount) * 85}%`;
                return (
                  <div key={idx} className="flex flex-col items-center gap-2 group w-full">
                    <div className="relative w-8 bg-slate-50 border border-slate-100/50 rounded-lg h-36 flex items-end overflow-hidden">
                      <motion.div
                        initial={{ height: 0 }}
                        animate={{ height: heightPercent }}
                        transition={{ duration: 0.8, delay: idx * 0.08, ease: "easeOut" }}
                        className="w-full bg-gradient-to-t from-brand-accent to-indigo-400 rounded-b-lg rounded-t-sm"
                      />
                      {/* Tooltip on hover */}
                      <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-1.5 px-2.5 py-1 bg-slate-900 text-white text-[9px] rounded font-bold opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap pointer-events-none z-10 shadow-md">
                        {data.count} drafts
                      </div>
                    </div>
                    <span className="text-[10px] font-bold text-slate-400 uppercase">{data.day}</span>
                  </div>
                );
              })}
            </div>
          </div>

          {/* AI Usage Insights */}
          <div className="lg:col-span-4 bg-white border border-slate-100 rounded-2xl p-6 shadow-sm flex flex-col justify-between">
            <div>
              <h3 className="text-sm font-bold text-brand-primary uppercase tracking-wider mb-6 flex items-center gap-2">
                <Sparkles className="w-4 h-4 text-brand-accent" />
                AI Insights
              </h3>
              
              <div className="space-y-4">
                <div className="flex gap-3">
                  <span className="flex items-center justify-center w-6 h-6 rounded-lg bg-emerald-50 text-emerald-600 text-[10px] font-black shrink-0">
                    1
                  </span>
                  <p className="text-xs text-slate-500 leading-relaxed font-semibold">
                    Draft generation efficiency is up <strong className="text-slate-700">24%</strong>. Peak activity registered between <strong className="text-slate-700">10AM - 12PM</strong>.
                  </p>
                </div>
                <div className="flex gap-3">
                  <span className="flex items-center justify-center w-6 h-6 rounded-lg bg-indigo-50 text-indigo-600 text-[10px] font-black shrink-0">
                    2
                  </span>
                  <p className="text-xs text-slate-500 leading-relaxed font-semibold">
                    Your most drafted tone category is <strong className="text-slate-700">Friendly</strong>, representing <strong className="text-slate-700">46%</strong> of outputs.
                  </p>
                </div>
                <div className="flex gap-3">
                  <span className="flex items-center justify-center w-6 h-6 rounded-lg bg-sky-50 text-sky-600 text-[10px] font-black shrink-0">
                    3
                  </span>
                  <p className="text-xs text-slate-500 leading-relaxed font-semibold">
                    Inbox outreach success index peaks when emails are generated with <strong className="text-slate-700">Medium</strong> size configurations.
                  </p>
                </div>
              </div>
            </div>

            <div className="pt-4 border-t border-slate-50 mt-6 flex items-center justify-between text-[10px] font-bold text-slate-400 uppercase">
              <span>Next Audit</span>
              <span>Sunday, 00:00 UTC</span>
            </div>
          </div>
        </section>

        {/* Recent Activity Log Cards */}
        <section className="bg-white border border-slate-100 rounded-2xl p-6 shadow-sm space-y-6">
          <div className="flex items-center justify-between">
            <h3 className="text-sm font-bold text-brand-primary uppercase tracking-wider flex items-center gap-2">
              <Clock className="w-4 h-4 text-brand-accent" />
              Recent Generation Timeline
            </h3>
            <button
              type="button"
              onClick={() => navigate("/email-history")}
              className="text-brand-accent font-bold text-xs hover:text-brand-accent-hover transition-colors flex items-center gap-1 focus-visible:ring-2 focus-visible:ring-brand-accent focus-visible:ring-offset-2 outline-none rounded-md px-1.5 py-0.5"
            >
              View History
              <ArrowUpRight className="w-3.5 h-3.5" />
            </button>
          </div>

          {activities.length === 0 ? (
            /* Premium Empty State */
            <div className="text-center py-16 bg-slate-50/40 rounded-2xl border border-dashed border-slate-200 p-8 max-w-lg mx-auto flex flex-col items-center justify-center">
              <div className="w-16 h-16 rounded-full bg-indigo-50 border border-indigo-100 flex items-center justify-center text-brand-accent mb-6 shadow-sm">
                <Mail className="w-7 h-7" />
              </div>
              <h4 className="text-base font-bold text-slate-800 mb-1.5">No email activities found</h4>
              <p className="text-xs text-slate-400 max-w-sm mb-6 leading-relaxed font-semibold">
                It looks like you haven't drafted or sent any emails yet. Let's create your very first professional email draft.
              </p>
              <button
                onClick={() => navigate("/create-email")}
                className="px-5 py-2.5 bg-brand-primary hover:bg-brand-primary-hover text-white text-xs font-bold rounded-lg shadow-sm flex items-center gap-2 active:scale-95 transition-all outline-none"
              >
                <Plus className="w-4 h-4" />
                Compose First Email
              </button>
            </div>
          ) : (
            /* Timeline representation */
            <div className="relative pl-6 border-l border-slate-100 space-y-6">
              {activities.map((activity, index) => {
                const toneStyle = 
                  activity.emailId?.tone === "friendly" 
                    ? "bg-emerald-50 text-emerald-700 border-emerald-100" 
                    : activity.emailId?.tone === "formal"
                    ? "bg-blue-50 text-blue-700 border-blue-100"
                    : activity.emailId?.tone === "assertive"
                    ? "bg-rose-50 text-rose-700 border-rose-100"
                    : "bg-indigo-50 text-indigo-700 border-indigo-100";

                return (
                  <motion.div
                    key={activity._id}
                    initial={{ opacity: 0, x: -10 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.3, delay: index * 0.05 }}
                    className="relative group bg-white border border-slate-100/80 rounded-2xl p-5 hover:border-indigo-100 hover:shadow-[0_4px_20px_rgba(0,0,0,0.015)] transition-all flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4"
                  >
                    {/* Timeline Node Connector */}
                    <div className="absolute -left-[31px] top-6 w-2.5 h-2.5 bg-white border-2 border-brand-accent rounded-full group-hover:scale-125 transition-transform" />

                    <div className="flex items-start gap-4">
                      {/* Action Icon Indicator */}
                      <div className={`p-2.5 rounded-xl border shrink-0 ${
                        activity.action === "sent" 
                          ? "bg-emerald-50 text-emerald-600 border-emerald-100" 
                          : "bg-indigo-50 text-indigo-600 border-indigo-100"
                      }`}>
                        {activity.action === "sent" ? <Send className="w-4 h-4" /> : <FileText className="w-4 h-4" />}
                      </div>

                      <div className="min-w-0 space-y-1">
                        <h4 className="text-sm font-bold text-slate-800 truncate group-hover:text-brand-accent transition-colors max-w-sm md:max-w-xl">
                          {activity.emailId?.subject || "Polite follow-up email draft"}
                        </h4>
                        
                        <div className="flex flex-wrap items-center gap-2">
                          <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">{activity.action}</span>
                          <span className="w-1 h-1 bg-slate-200 rounded-full" />
                          <span className={`text-[9px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-md border ${toneStyle}`}>
                            {activity.emailId?.tone || "Friendly"}
                          </span>
                        </div>
                      </div>
                    </div>

                    {/* Metadata & Actions */}
                    <div className="flex items-center justify-between sm:justify-end gap-6 shrink-0 border-t border-slate-50 sm:border-t-0 pt-3 sm:pt-0">
                      <div className="text-left sm:text-right">
                        <p className="text-xs font-bold text-slate-700">
                          {new Date(activity.timestamp).toLocaleDateString(undefined, { month: "short", day: "numeric" })}
                        </p>
                        <p className="text-[10px] font-semibold text-slate-400 mt-0.5">
                          {new Date(activity.timestamp).toLocaleTimeString(undefined, { hour: "2-digit", minute: "2-digit" })}
                        </p>
                      </div>
                      
                      <button
                        onClick={() => navigate("/email-history")}
                        className="p-1.5 rounded-lg border border-slate-100 hover:border-brand-accent text-slate-400 hover:text-brand-accent hover:bg-slate-50 transition-all outline-none"
                        title="View details"
                      >
                        <ChevronRight className="w-4 h-4" />
                      </button>
                    </div>
                  </motion.div>
                );
              })}
            </div>
          )}
        </section>

      </div>
      )}
      </PageTransition>
    </DashboardLayout>
  );
};

export default Dashboard;