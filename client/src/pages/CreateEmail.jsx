import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import {
  Sparkles,
  Send,
  Copy,
  Check,
  AlertCircle,
  RefreshCw,
  Mail,
  User,
  Info,
  Globe,
  Command,
  Download,
  Clock,
  RotateCcw,
  BookOpen,
  ArrowRight,
  History
} from "lucide-react";
import { API_URL } from "../config";
import DashboardLayout from "../components/DashboardLayout";
import { useToast } from "../context/ToastContext";
import PageTransition from "../components/PageTransition";

const CreateEmail = () => {
  const navigate = useNavigate();

  useEffect(() => {
    document.title = "AI Email Workspace | MailFlow AI";
  }, []);

  // Form State
  const [purpose, setPurpose] = useState("");
  const [tone, setTone] = useState("friendly");
  const [type, setType] = useState("direct");
  const [length, setLength] = useState("medium");
  const [keywords, setKeywords] = useState("");

  // Generation State
  const [isLoading, setIsLoading] = useState(false);
  const [loadingStage, setLoadingStage] = useState(0);
  const [generatedEmail, setGeneratedEmail] = useState("");
  const [currentEmailId, setCurrentEmailId] = useState(null);
  const [error, setError] = useState("");

  // Editing State
  const [editableSubject, setEditableSubject] = useState("");
  const [editableBody, setEditableBody] = useState("");
  const { addToast } = useToast();

  // Sending State
  const [receiverEmail, setReceiverEmail] = useState("");
  const [senderEmail, setSenderEmail] = useState("");
  const [isSending, setIsSending] = useState(false);
  const [sendSuccess, setSendSuccess] = useState(false);
  const [sendError, setSendError] = useState("");

  const stages = [
    "Analyzing prompt context...",
    "Planning draft structure...",
    "Writing subject line...",
    "Drafting body paragraphs...",
    "Polishing and refining tone...",
    "Ready!"
  ];

  // Shortcut Example Prompts
  const examplePrompts = [
    {
      label: "Request Update",
      text: "Write a polite follow-up email to the engineering team asking for an update on the API integration progress."
    },
    {
      label: "Reschedule Sync",
      text: "Write an email to a client requesting to reschedule our weekly sync meeting from Tuesday to Thursday afternoon."
    },
    {
      label: "Coffee Chat",
      text: "Write a short cold email to a product designer asking for a 15-minute coffee chat to discuss their career journey."
    }
  ];

  const toneChips = [
    "Professional", "Friendly", "Formal", "Confident", "Apologetic", "Persuasive", "Follow-up", "Interview", "Networking"
  ];

  const handleGenerate = async (e) => {
    if (e) e.preventDefault();
    if (!purpose.trim()) {
      setError("Please describe the purpose of the email");
      return;
    }

    setIsLoading(true);
    setLoadingStage(0);
    setError("");
    setGeneratedEmail("");
    setSendSuccess(false);
    setSendError("");

    // Start loader simulation
    const stageInterval = setInterval(() => {
      setLoadingStage((prev) => {
        if (prev < 4) return prev + 1;
        return prev;
      });
    }, 1200);

    try {
      const token = localStorage.getItem("token");
      const response = await fetch(`${API_URL}/api/email/generate`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`
        },
        body: JSON.stringify({
          purpose,
          tone,
          type,
          length,
          keywords
        })
      });

      let data;
      try {
        data = await response.json();
      } catch (jsonErr) {
        throw new Error("Unable to parse generated email from server.");
      }

      if (!response.ok) {
        throw new Error(data.message || "Failed to generate email");
      }

      // Fast-forward loader to completion
      clearInterval(stageInterval);
      setLoadingStage(5);

      setTimeout(() => {
        setGeneratedEmail(data.email);
        setCurrentEmailId(data.emailId);

        // Parse subject and body
        const subjectMatch = data.email.match(/Subject:\s*(.*)/i);
        if (subjectMatch && subjectMatch[1]) {
          setEditableSubject(subjectMatch[1].trim());
          setEditableBody(data.email.replace(/Subject:\s*.*\n/i, "").trim());
        } else {
          setEditableSubject("Generated Email");
          setEditableBody(data.email);
        }
        setIsLoading(false);
      }, 500);

    } catch (err) {
      clearInterval(stageInterval);
      setError(err.message || "Something went wrong. Please try again.");
      setIsLoading(false);
    }
  };

  const handleKeyDown = (e) => {
    if ((e.metaKey || e.ctrlKey) && e.key === "Enter") {
      handleGenerate(e);
    }
  };

  const handleCopy = () => {
    const fullText = `Subject: ${editableSubject}\n\n${editableBody}`;
    navigator.clipboard.writeText(fullText);
    addToast("Draft copied to clipboard!", "success");
  };

  const handleSendEmail = async () => {
    if (!receiverEmail.trim()) {
      addToast("Recipient email is required", "warning");
      return;
    }

    setIsSending(true);
    setSendSuccess(false);
    setSendError("");

    try {
      const token = localStorage.getItem("token");
      const response = await fetch(`${API_URL}/api/email/send`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`
        },
        body: JSON.stringify({
          to: receiverEmail,
          from: senderEmail,
          subject: editableSubject,
          body: editableBody,
          emailId: currentEmailId
        })
      });

      let data;
      try {
        data = await response.json();
      } catch (jsonErr) {
        throw new Error("Unable to parse send response from server.");
      }

      if (response.ok) {
        setSendSuccess(true);
        addToast("Email sent successfully out of the portal!", "success");
      } else {
        setSendError(data.message || "Failed to send email");
        addToast(data.message || "Failed to send email", "error");
      }
    } catch (error) {
      setSendError(error.message || "Network error. Please try again.");
      addToast(error.message || "Network error. Please try again.", "error");
    } finally {
      setIsSending(false);
    }
  };

  // Word count and reading time helpers
  const getWordCount = () => {
    const text = `${editableSubject} ${editableBody}`.trim();
    return text ? text.split(/\s+/).filter(Boolean).length : 0;
  };

  const getReadingTime = () => {
    const words = getWordCount();
    return Math.max(1, Math.ceil(words / 200));
  };

  return (
    <DashboardLayout>
      <PageTransition>
        <div className="max-w-7xl mx-auto space-y-6">
        
        {/* Header Title */}
        <header className="pb-4 border-b border-slate-100 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div>
            <h2 className="text-2xl font-bold text-brand-primary tracking-tight">AI Email Workspace</h2>
            <p className="text-slate-400 text-xs font-semibold mt-1">Configure draft settings and generate custom professional email responses.</p>
          </div>
          <button
            onClick={() => navigate("/email-history")}
            className="btn-primary btn-sm gap-2 shadow-sm rounded-xl shrink-0"
          >
            <History className="w-4 h-4" />
            View History
          </button>
        </header>

        {/* Responsive Workspace Grid */}
        <div className="grid lg:grid-cols-12 gap-8 items-start">
          
          {/* Left Column: AI Parameters */}
          <div className="lg:col-span-5 space-y-6">
            <div className="bg-white border border-slate-100 rounded-2xl p-6 shadow-sm space-y-6">
              <h3 className="text-sm font-bold text-brand-primary uppercase tracking-wider flex items-center gap-2">
                <Sparkles className="w-4 h-4 text-brand-accent" />
                Prompt & Context
              </h3>

              <div className="space-y-4">
                {/* Prompt textarea */}
                <div>
                  <div className="flex justify-between items-center mb-2">
                    <label htmlFor="purpose" className="text-xs font-bold text-slate-700 flex items-center gap-1.5">
                      Describe Purpose
                    </label>
                    <span className="text-[10px] font-bold text-slate-400">
                      {purpose.length} chars
                    </span>
                  </div>
                  <textarea
                    id="purpose"
                    value={purpose}
                    onChange={(e) => setPurpose(e.target.value.slice(0, 500))}
                    maxLength={500}
                    onKeyDown={handleKeyDown}
                    placeholder="E.g., request update on the API milestone, reschedule meeting to Thursday..."
                    className="textarea-accent min-h-[110px] resize-none"
                  />
                </div>

                {/* Example Quick Taps */}
                <div className="space-y-2">
                  <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wide block">Example Prompt Suggestions</span>
                  <div className="flex flex-wrap gap-2">
                    {examplePrompts.map((p, idx) => (
                      <button
                        key={idx}
                        type="button"
                        onClick={() => setPurpose(p.text)}
                        className="px-2.5 py-1 text-[10px] font-bold bg-slate-50 border border-slate-100 text-slate-500 rounded-lg hover:border-brand-accent-light hover:text-brand-accent hover:bg-indigo-50/30 transition-all outline-none"
                      >
                        {p.label}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Keywords Tagging */}
                <div>
                  <label htmlFor="keywords" className="block text-xs font-bold text-slate-700 mb-2">
                    Keywords (Optional)
                  </label>
                  <input
                    id="keywords"
                    type="text"
                    value={keywords}
                    onChange={(e) => setKeywords(e.target.value)}
                    onKeyDown={handleKeyDown}
                    placeholder="E.g., urgent, milestone, sync"
                    className="input-accent"
                  />
                </div>

                {/* Tone Grid Selection */}
                <div className="space-y-2">
                  <label className="block text-xs font-bold text-slate-700">
                    Tone Setting
                  </label>
                  <div className="grid grid-cols-3 gap-2">
                    {toneChips.map((t) => {
                      const isSelected = tone.toLowerCase() === t.toLowerCase();
                      return (
                        <button
                          key={t}
                          type="button"
                          onClick={() => setTone(t.toLowerCase())}
                          className={`px-2 py-2.5 rounded-xl text-[10px] font-bold border transition-all duration-200 outline-none ${
                            isSelected
                              ? "bg-brand-primary text-white border-brand-primary shadow-sm scale-[1.03]"
                              : "bg-white text-slate-500 border-slate-100 hover:border-slate-200 hover:text-slate-700"
                          }`}
                        >
                          {t}
                        </button>
                      );
                    })}
                  </div>
                </div>

                {/* Segmented Controls for Length & Type */}
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <label className="block text-xs font-bold text-slate-700">Length</label>
                    <div className="bg-slate-50 border border-slate-100/80 rounded-xl p-1 flex">
                      {["short", "medium", "long"].map((l) => (
                        <button
                          key={l}
                          type="button"
                          onClick={() => setLength(l)}
                          className={`flex-1 text-center py-2 rounded-lg text-[10px] font-bold capitalize transition-all outline-none ${
                            length === l
                              ? "bg-white text-brand-primary shadow-sm border border-slate-100/50"
                              : "text-slate-400 hover:text-slate-600"
                          }`}
                        >
                          {l}
                        </button>
                      ))}
                    </div>
                  </div>

                  <div className="space-y-2">
                    <label className="block text-xs font-bold text-slate-700">Format</label>
                    <div className="bg-slate-50 border border-slate-100/80 rounded-xl p-1 flex">
                      {["direct", "detailed", "creative"].map((t) => (
                        <button
                          key={t}
                          type="button"
                          onClick={() => setType(t)}
                          className={`flex-1 text-center py-2 rounded-lg text-[10px] font-bold capitalize transition-all outline-none ${
                            type === t
                              ? "bg-white text-brand-primary shadow-sm border border-slate-100/50"
                              : "text-slate-400 hover:text-slate-600"
                          }`}
                        >
                          {t}
                        </button>
                      ))}
                    </div>
                  </div>
                </div>
              </div>

              {error && (
                <div className="text-red-500 text-xs font-semibold bg-red-50/50 border border-red-100 p-3.5 rounded-xl flex items-center gap-2" role="alert">
                  <AlertCircle className="w-4 h-4" />
                  {error}
                </div>
              )}

              {/* Generate CTA Button */}
              <button
                onClick={(e) => handleGenerate(e)}
                disabled={isLoading}
                className="btn-primary btn-md w-full gap-2 rounded-xl"
              >
                {isLoading ? (
                  <>
                    <RefreshCw className="w-4 h-4 animate-spin" />
                    <span>Processing Stage...</span>
                  </>
                ) : (
                  <>
                    <Sparkles className="w-4 h-4" />
                    <span>Generate AI Email</span>
                  </>
                )}
              </button>
            </div>
          </div>

          {/* Right Column: Simulated Loader & Preview Panel */}
          <div className="lg:col-span-7">
            <AnimatePresence mode="wait">
              
              {/* State 1: Empty State */}
              {!generatedEmail && !isLoading && (
                <motion.div
                  key="empty"
                  initial={{ opacity: 0, scale: 0.98 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.98 }}
                  className="min-h-[460px] border border-dashed border-slate-200 bg-white rounded-2xl flex flex-col items-center justify-center p-8 text-center"
                >
                  <div className="w-16 h-16 rounded-full bg-slate-50 border border-slate-100 flex items-center justify-center text-slate-400 mb-6 shadow-sm">
                    <Mail className="w-7 h-7" />
                  </div>
                  <h3 className="text-base font-bold text-slate-800 mb-1.5">Draft Composer Ready</h3>
                  <p className="text-xs text-slate-400 max-w-sm mb-6 leading-relaxed font-semibold">
                    Set up your tone parameters and details on the left, then click generate to craft your customized draft.
                  </p>
                </motion.div>
              )}

              {/* State 2: Simulated Loader */}
              {isLoading && (
                <motion.div
                  key="loading"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="min-h-[460px] bg-white border border-slate-100 rounded-2xl flex flex-col items-center justify-center p-8 text-center shadow-sm"
                >
                  <div className="relative mb-8">
                    <motion.div
                      animate={{ scale: [1, 1.25, 1], opacity: [0.2, 0.4, 0.2] }}
                      transition={{ repeat: Infinity, duration: 1.8 }}
                      className="absolute -inset-6 bg-brand-accent-light rounded-full blur-xl"
                    />
                    <Sparkles className="w-10 h-10 text-brand-accent relative z-10 animate-bounce" />
                  </div>
                  <h3 className="text-lg font-bold text-brand-primary mb-4">Email Construction</h3>
                  
                  {/* Dynamic Workflow stages */}
                  <div className="space-y-2.5 w-full max-w-xs text-left bg-slate-50 border border-slate-100 p-4 rounded-xl">
                    {stages.map((stage, idx) => {
                      const isPast = loadingStage > idx;
                      const isCurrent = loadingStage === idx;
                      return (
                        <div key={idx} className="flex items-center gap-2 text-[10px] font-bold">
                          {isPast ? (
                            <Check className="w-3.5 h-3.5 text-emerald-500 shrink-0" />
                          ) : isCurrent ? (
                            <RefreshCw className="w-3.5 h-3.5 text-brand-accent animate-spin shrink-0" />
                          ) : (
                            <span className="w-3.5 h-3.5 rounded-full border border-slate-200 shrink-0" />
                          )}
                          <span className={`${isCurrent ? "text-slate-800" : isPast ? "text-slate-400" : "text-slate-300"}`}>
                            {stage}
                          </span>
                        </div>
                      );
                    })}
                  </div>
                </motion.div>
              )}

              {/* State 3: Generated Email Editor */}
              {generatedEmail && !isLoading && (
                <motion.div
                  key="content"
                  initial={{ opacity: 0, y: 15 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="bg-white border border-slate-100 rounded-2xl shadow-sm flex flex-col overflow-hidden relative"
                >
                  {/* Gmail Style Header Top bar */}
                  <div className="p-5 border-b border-slate-100 bg-slate-50/50 flex flex-wrap items-center justify-between gap-3">
                    <div className="flex items-center gap-2">
                      <span className="px-2.5 py-0.5 rounded-md bg-indigo-50 border border-indigo-100 text-brand-accent text-[9px] font-bold uppercase tracking-wider flex items-center gap-1">
                        <Sparkles className="w-3 h-3" />
                        AI Generated
                      </span>
                      <div className="h-4 w-px bg-slate-200" />
                      <div className="flex items-center gap-1.5 text-[10px] font-bold text-slate-400">
                        <BookOpen className="w-3.5 h-3.5" />
                        <span>{getReadingTime()} min read</span>
                        <span>•</span>
                        <span>{getWordCount()} words</span>
                      </div>
                    </div>

                    <div className="flex items-center gap-2">
                      {/* Copy Draft button */}
                      <button
                        type="button"
                        onClick={handleCopy}
                        className="px-3.5 py-2 rounded-lg border border-slate-200 bg-white text-slate-600 hover:text-brand-primary hover:border-brand-primary-hover text-xs font-bold transition-all flex items-center gap-1.5 active:scale-95 outline-none"
                      >
                        <Copy className="w-3.5 h-3.5" />
                        <span>Copy</span>
                      </button>

                      {/* Regenerate Button */}
                      <button
                        type="button"
                        onClick={() => handleGenerate()}
                        className="p-2 rounded-lg border border-slate-200 bg-white text-slate-500 hover:text-brand-primary hover:border-brand-primary-hover transition-all active:scale-95 outline-none"
                        title="Regenerate Draft"
                      >
                        <RotateCcw className="w-3.5 h-3.5" />
                      </button>

                      {/* Download PDF Placeholder */}
                      <button
                        type="button"
                        className="p-2 rounded-lg border border-slate-200 bg-white text-slate-400 hover:text-slate-600 transition-all outline-none"
                        title="Download PDF (Mockup)"
                      >
                        <Download className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </div>

                  {/* Gmail Style Email Fields */}
                  <div className="p-6 space-y-5">
                    {/* Subject line field */}
                    <div>
                      <div className="flex items-center gap-1 text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1.5">
                        Subject
                      </div>
                      <input
                        id="subject"
                        value={editableSubject}
                        onChange={(e) => setEditableSubject(e.target.value)}
                        className="w-full text-lg font-black text-slate-800 border-none focus:ring-0 p-0 placeholder-slate-300 outline-none rounded"
                        placeholder="Email Subject Line"
                      />
                    </div>

                    <div className="h-px bg-slate-100/70" />

                    {/* Email Body field */}
                    <div>
                      <div className="flex items-center gap-1 text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1.5">
                        Body Content
                      </div>
                      <textarea
                        id="body"
                        value={editableBody}
                        onChange={(e) => setEditableBody(e.target.value)}
                        className="w-full min-h-[220px] text-xs font-semibold text-slate-600 leading-relaxed border-none focus:ring-0 p-0 resize-none placeholder-slate-300 outline-none rounded"
                        placeholder="Compose email here..."
                      />
                    </div>
                  </div>

                  {/* Send Mail Setup Banner */}
                  <div className="p-6 border-t border-slate-100 bg-slate-50/30 space-y-4">
                    <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest block mb-2">Delivery Details</span>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="relative">
                        <Globe className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400 z-10" />
                        <input
                          id="recipientEmail"
                          type="email"
                          placeholder="Recipient Email Address"
                          aria-label="Recipient Email Address"
                          value={receiverEmail}
                          onChange={(e) => setReceiverEmail(e.target.value)}
                          className="input-accent-icon"
                        />
                      </div>
                      <div className="relative">
                        <User className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400 z-10" />
                        <input
                          id="senderName"
                          type="text"
                          placeholder="Sender Name (Optional)"
                          aria-label="Sender Name"
                          value={senderEmail}
                          onChange={(e) => setSenderEmail(e.target.value)}
                          className="input-accent-icon"
                        />
                      </div>
                    </div>

                    {sendSuccess && (
                      <div className="flex items-center gap-2 text-emerald-600 bg-emerald-50/40 border border-emerald-100 p-4 rounded-xl" role="alert">
                        <Check className="w-4 h-4" />
                        <span className="text-xs font-bold">Email sent successfully out of the portal!</span>
                      </div>
                    )}

                    {sendError && (
                      <div className="flex items-center gap-2 text-rose-600 bg-rose-50/40 border border-rose-100 p-4 rounded-xl" role="alert">
                        <AlertCircle className="w-4 h-4" />
                        <span className="text-xs font-bold">{sendError}</span>
                      </div>
                    )}

                    {/* Send trigger */}
                    <button
                      type="button"
                      onClick={handleSendEmail}
                      disabled={isSending}
                      className="btn-primary btn-md w-full gap-2 rounded-xl"
                    >
                      {isSending ? (
                        <>
                          <RefreshCw className="w-4 h-4 animate-spin" />
                          <span>Dispatching draft...</span>
                        </>
                      ) : (
                        <>
                          <Send className="w-4 h-4" />
                          <span>Send Draft Now</span>
                        </>
                      )}
                    </button>
                  </div>
                </motion.div>
              )}

            </AnimatePresence>
          </div>
        </div>
      </div>
      </PageTransition>
    </DashboardLayout>
  );
};

export default CreateEmail;

