import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
    Search,
    Trash2,
    Calendar,
    Mail as MailIcon,
    X,
    ChevronRight,
    User,
    Clock,
    Star,
    Copy,
    Plus,
    ArrowUpDown,
    Sparkles,
    Download,
    Check,
    MailOpen,
    ChevronLeft
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import DashboardLayout from "../components/DashboardLayout";
import { API_URL } from "../config";
import { useToast } from "../context/ToastContext";
import PageTransition from "../components/PageTransition";
import { HistorySkeleton } from "../components/Skeletons";

const EmailHistory = () => {
    const navigate = useNavigate();

    useEffect(() => {
        document.title = "Drafts Inventory | MailFlow AI";
    }, []);

    // Search, filter, and sort states
    const [search, setSearch] = useState("");
    const [emails, setEmails] = useState([]);
    const [loading, setLoading] = useState(true);
    const [tone, setTone] = useState("");
    const [sort, setSort] = useState("");

    // Selected email and notification states
    const [selectedEmail, setSelectedEmail] = useState(null);
    const { addToast } = useToast();

    // Favorites state persisted locally
    const [favorites, setFavorites] = useState(() => {
        try {
            return JSON.parse(localStorage.getItem("favorites") || "[]");
        } catch (e) {
            return [];
        }
    });

    const [showFavoritesOnly, setShowFavoritesOnly] = useState(false);

    useEffect(() => {
        const fetchEmails = async () => {
            try {
                const res = await fetch(
                    `${API_URL}/api/email?search=${search}&tone=${tone}&sort=${sort}`,
                    {
                        headers: {
                            Authorization: "Bearer " + localStorage.getItem("token")
                        }
                    }
                );

                let data;
                try {
                    data = await res.json();
                } catch (jsonErr) {
                    throw new Error("Unable to parse emails list from server.");
                }

                if (data.success) {
                    setEmails(data.emails);
                } else {
                    console.error("Fetch emails failed:", data.message);
                }
            } catch (error) {
                console.error("Error fetching emails:", error);
            } finally {
                setLoading(false);
            }
        };

        fetchEmails();
    }, [search, tone, sort]);

    const handleDelete = async (id, e) => {
        if (e) e.stopPropagation();
        const confirmDelete = window.confirm("Are you sure you want to delete this email draft?");
        if (!confirmDelete) return;

        try {
            const res = await fetch(`${API_URL}/api/email/${id}`, {
                method: "DELETE",
                headers: {
                    Authorization: "Bearer " + localStorage.getItem("token")
                }
            });

            let data;
            try {
                data = await res.json();
            } catch (jsonErr) {
                throw new Error("Unable to parse delete confirmation from server.");
            }

            if (data.success) {
                setEmails((prev) => prev.filter((email) => email._id !== id));
                if (selectedEmail?._id === id) setSelectedEmail(null);
                addToast("Draft deleted successfully", "success");
            } else {
                console.error("Delete email failed:", data.message);
                addToast(data.message || "Failed to delete email", "error");
            }
        } catch (error) {
            console.error("Error deleting email:", error);
            addToast("Error deleting email. Please try again.", "error");
        }
    };

    const toggleFavorite = (id, e) => {
        if (e) e.stopPropagation();
        const isFav = favorites.includes(id);
        setFavorites((prev) => {
            const updated = prev.includes(id)
                ? prev.filter((favId) => favId !== id)
                : [...prev, id];
            localStorage.setItem("favorites", JSON.stringify(updated));
            return updated;
        });
        addToast(isFav ? "Removed from Favorites" : "Added to Favorites", "info");
    };

    const handleCopyText = (text, e) => {
        if (e) e.stopPropagation();
        navigator.clipboard.writeText(text);
        addToast("Copied to clipboard!", "success");
    };

    // Filter list on frontend for favorites
    const displayedEmails = showFavoritesOnly
        ? emails.filter((email) => favorites.includes(email._id))
        : emails;

    const containerVariants = {
        hidden: { opacity: 0 },
        show: {
            opacity: 1,
            transition: {
                staggerChildren: 0.05
            }
        }
    };

    const itemVariants = {
        hidden: { opacity: 0, y: 10 },
        show: { opacity: 1, y: 0, transition: { type: "spring", stiffness: 120 } }
    };

    return (
        <DashboardLayout>
            <PageTransition>
                <div className="max-w-7xl mx-auto space-y-6">
                    {/* Header Block */}
                    <header className="pb-4 border-b border-slate-100 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                        <div>
                            <div className="flex items-center gap-2">
                                <h2 className="text-2xl font-bold text-brand-primary tracking-tight">Drafts Inventory</h2>
                                <span className="px-2 py-0.5 rounded bg-slate-100 border border-slate-200/50 text-[10px] font-bold text-slate-500">
                                    {displayedEmails.length} drafts
                                </span>
                            </div>
                            <p className="text-slate-400 text-xs font-semibold mt-1">Review, delete, copy, or favorite your previously generated output history.</p>
                        </div>
 
                        <button
                            onClick={() => navigate("/create-email")}
                            className="btn-primary btn-sm gap-2 shadow-sm rounded-xl shrink-0"
                        >
                            <Plus className="w-4 h-4" />
                            Compose Draft
                        </button>
                    </header>

                    {/* Filter Operations Workspace */}
                    <div className="bg-white border border-slate-100 rounded-2xl p-5 shadow-sm space-y-4">
                        <div className="flex flex-col lg:flex-row gap-4 items-center justify-between">
                            {/* Search query box */}
                            <div className="relative w-full lg:max-w-md">
                                <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400 z-10" />
                                <input
                                    id="searchHistory"
                                    type="text"
                                    placeholder="Search by subject key or draft body..."
                                    aria-label="Search by subject or content"
                                    value={search}
                                    onChange={(e) => setSearch(e.target.value)}
                                    className="input-accent-icon pr-10"
                                />
                                {search && (
                                    <button
                                        onClick={() => setSearch("")}
                                        className="absolute right-3 top-1/2 -translate-y-1/2 p-0.5 hover:bg-slate-100 rounded-full text-slate-400 hover:text-slate-600"
                                    >
                                        <X className="w-3.5 h-3.5" />
                                    </button>
                                )}
                            </div>

                            {/* Sort Switch */}
                            <div className="flex items-center gap-3 w-full lg:w-auto justify-between lg:justify-end border-t lg:border-t-0 pt-3 lg:pt-0 border-slate-50">
                                <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider flex items-center gap-1.5 shrink-0">
                                    <ArrowUpDown className="w-3.5 h-3.5" />
                                    Sort Order
                                </span>
                                <div className="bg-slate-50 border border-slate-100 rounded-xl p-1 flex">
                                    {[
                                        { value: "", label: "Newest" },
                                        { value: "oldest", label: "Oldest" },
                                        { value: "az", label: "A-Z" }
                                    ].map((option) => (
                                        <button
                                            key={option.value}
                                            onClick={() => setSort(option.value)}
                                            className={`px-3 py-1.5 rounded-lg text-[10px] font-bold capitalize transition-all outline-none ${sort === option.value
                                                ? "bg-white text-brand-primary shadow-sm border border-slate-100/50"
                                                : "text-slate-400 hover:text-slate-600"
                                                }`}
                                        >
                                            {option.label}
                                        </button>
                                    ))}
                                </div>
                            </div>
                        </div>

                        <div className="h-px bg-slate-50" />

                        {/* Interactive filter chips */}
                        <div className="flex flex-wrap items-center gap-2">
                            <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest mr-2">Tone:</span>

                            <button
                                onClick={() => { setTone(""); setShowFavoritesOnly(false); }}
                                className={`px-3 py-1.5 rounded-xl text-[10px] font-bold border transition-all outline-none ${tone === "" && !showFavoritesOnly
                                    ? "bg-brand-primary text-white border-brand-primary shadow-sm"
                                    : "bg-white text-slate-500 border-slate-100 hover:border-slate-200"
                                    }`}
                            >
                                All Tones
                            </button>

                            {["professional", "friendly", "formal", "assertive"].map((t) => (
                                <button
                                    key={t}
                                    onClick={() => { setTone(t); setShowFavoritesOnly(false); }}
                                    className={`px-3 py-1.5 rounded-xl text-[10px] font-bold border transition-all capitalize outline-none ${tone === t && !showFavoritesOnly
                                        ? "bg-brand-primary text-white border-brand-primary shadow-sm"
                                        : "bg-white text-slate-500 border-slate-100 hover:border-slate-200"
                                        }`}
                                >
                                    {t}
                                </button>
                            ))}

                            <div className="h-4 w-px bg-slate-200 mx-2" />

                            {/* Local Favorite toggle chip */}
                            <button
                                onClick={() => { setShowFavoritesOnly(!showFavoritesOnly); setTone(""); }}
                                className={`px-3 py-1.5 rounded-xl text-[10px] font-bold border transition-all outline-none flex items-center gap-1 ${showFavoritesOnly
                                    ? "bg-amber-500 text-white border-amber-500 shadow-sm"
                                    : "bg-white text-amber-500 border-slate-100 hover:border-slate-200"
                                    }`}
                            >
                                <Star className={`w-3.5 h-3.5 ${showFavoritesOnly ? "fill-white" : "fill-amber-500"}`} />
                                <span>Favorites Only</span>
                            </button>
                        </div>
                    </div>

                    {/* Lightweight Email Listing Panel */}
                    <div className="grid lg:grid-cols-12 gap-8 items-start">

                        {/* Left panel: List */}
                        <div className={`${selectedEmail ? "lg:col-span-6" : "lg:col-span-12"} space-y-3 transition-all duration-300`}>
                            {loading ? (
                                <HistorySkeleton />
                            ) : displayedEmails.length === 0 ? (
                                /* Illustrated Empty State */
                                <div className="text-center py-20 bg-white border border-slate-100 rounded-2xl p-8 max-w-md mx-auto flex flex-col items-center justify-center shadow-sm">
                                    <div className="w-16 h-16 rounded-full bg-indigo-50 border border-indigo-100 flex items-center justify-center text-brand-accent mb-6 shadow-sm">
                                        <MailIcon className="w-7 h-7" />
                                    </div>
                                    <h4 className="text-base font-bold text-slate-800 mb-1.5">No emails archived</h4>
                                    <p className="text-xs text-slate-400 max-w-sm mb-6 leading-relaxed font-semibold">
                                        You haven't generated any drafts matching these parameters yet. Let's create your first email draft.
                                    </p>
                                    <button
                                        onClick={() => navigate("/create-email")}
                                        className="px-4 py-2.5 bg-brand-primary hover:bg-brand-primary-hover text-white text-xs font-bold rounded-lg shadow-sm flex items-center gap-2 active:scale-95 transition-all outline-none"
                                    >
                                        <Plus className="w-4 h-4" />
                                        Compose First Email
                                    </button>
                                </div>
                            ) : (
                                <motion.div
                                    variants={containerVariants}
                                    initial="hidden"
                                    animate="show"
                                    className="space-y-3"
                                >
                                    {displayedEmails.map((email) => {
                                        const isFavorited = favorites.includes(email._id);
                                        const isSelected = selectedEmail?._id === email._id;

                                        // Clean snippet preview text
                                        const cleanPreview = email.generatedContent
                                            ? email.generatedContent.replace(/Subject:\s*.*\n/i, "").substring(0, 110).trim() + "..."
                                            : "No draft content available";

                                        const toneStyle =
                                            email.tone === "friendly"
                                                ? "bg-emerald-50 text-emerald-700 border-emerald-100"
                                                : email.tone === "formal"
                                                    ? "bg-blue-50 text-blue-700 border-blue-100"
                                                    : email.tone === "assertive"
                                                        ? "bg-rose-50 text-rose-700 border-rose-100"
                                                        : "bg-indigo-50 text-indigo-700 border-indigo-100";

                                        return (
                                            <motion.div
                                                key={email._id}
                                                variants={itemVariants}
                                                onClick={() => setSelectedEmail(email)}
                                                onKeyDown={(e) => {
                                                    if (e.key === "Enter" || e.key === " ") {
                                                        e.preventDefault();
                                                        setSelectedEmail(email);
                                                    }
                                                }}
                                                role="button"
                                                tabIndex={0}
                                                aria-label={`View email: ${email.subject || "Untitled Email"}`}
                                                className={`bg-white border rounded-2xl p-5 shadow-sm transition-all text-left relative group outline-none cursor-pointer flex flex-col md:flex-row md:items-center justify-between gap-4 ${isSelected
                                                    ? "border-brand-accent shadow-md bg-indigo-50/5"
                                                    : "border-slate-100/80 hover:border-indigo-100 hover:shadow-[0_4px_20px_rgba(0,0,0,0.015)]"
                                                    }`}
                                            >
                                                <div className="min-w-0 flex-1 space-y-2">
                                                    {/* Title and Favorites check */}
                                                    <div className="flex items-center gap-3">
                                                        <button
                                                            type="button"
                                                            onClick={(e) => toggleFavorite(email._id, e)}
                                                            className="p-1 rounded hover:bg-slate-50 transition-colors shrink-0 outline-none text-slate-300 hover:text-amber-500"
                                                            aria-label={isFavorited ? "Remove from Favorites" : "Add to Favorites"}
                                                        >
                                                            <Star className={`w-4 h-4 ${isFavorited ? "fill-amber-500 text-amber-500" : ""}`} />
                                                        </button>

                                                        <h4 className="text-sm font-bold text-slate-800 truncate pr-4 group-hover:text-brand-accent transition-colors">
                                                            {email.subject || "Untitled Email"}
                                                        </h4>
                                                    </div>

                                                    {/* Preview Snippet */}
                                                    <p className="text-xs text-slate-400 font-semibold line-clamp-1 pr-6 leading-relaxed">
                                                        {cleanPreview}
                                                    </p>

                                                    {/* Metadata row */}
                                                    <div className="flex flex-wrap items-center gap-2.5 text-[10px] font-bold text-slate-400">
                                                        <span className="flex items-center gap-1.5">
                                                            <Calendar className="w-3.5 h-3.5 text-slate-300" />
                                                            {new Date(email.createdAt).toLocaleDateString(undefined, { month: "short", day: "numeric", year: "numeric" })}
                                                        </span>
                                                        <span className="w-1 h-1 bg-slate-200 rounded-full" />
                                                        <span className={`text-[9px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-md border ${toneStyle}`}>
                                                            {email.tone || "General"}
                                                        </span>
                                                        <span className="w-1 h-1 bg-slate-200 rounded-full" />
                                                        <span className="flex items-center gap-1">
                                                            <Clock className="w-3.5 h-3.5 text-slate-300" />
                                                            {Math.max(1, Math.ceil(cleanPreview.split(/\s+/).length / 200))} min read
                                                        </span>
                                                    </div>
                                                </div>

                                                {/* Card Hover Quick Actions */}
                                                <div className="flex items-center gap-2.5 justify-end border-t border-slate-50 md:border-t-0 pt-3.5 md:pt-0 shrink-0 opacity-100 md:opacity-0 md:group-hover:opacity-100 transition-opacity">
                                                    <button
                                                        type="button"
                                                        onClick={(e) => handleCopyText(email.generatedContent, e)}
                                                        className="p-2 text-slate-400 hover:text-brand-accent bg-slate-50 hover:bg-indigo-50/50 rounded-xl transition-all outline-none"
                                                        title="Copy content"
                                                    >
                                                        <Copy className="w-3.5 h-3.5" />
                                                    </button>

                                                    <button
                                                        type="button"
                                                        onClick={(e) => handleDelete(email._id, e)}
                                                        className="p-2 text-slate-400 hover:text-rose-600 bg-slate-50 hover:bg-rose-50 rounded-xl transition-all outline-none"
                                                        title="Delete draft"
                                                    >
                                                        <Trash2 className="w-3.5 h-3.5" />
                                                    </button>

                                                    <button
                                                        type="button"
                                                        className="p-2 text-slate-300 hover:text-slate-600 bg-slate-50 rounded-xl transition-all outline-none cursor-not-allowed"
                                                        title="Download PDF Mockup"
                                                        disabled
                                                    >
                                                        <Download className="w-3.5 h-3.5" />
                                                    </button>

                                                    <div className="p-1.5 text-brand-accent">
                                                        <ChevronRight className="w-4 h-4" />
                                                    </div>
                                                </div>
                                            </motion.div>
                                        );
                                    })}
                                </motion.div>
                            )}
                        </div>

                        {/* Right panel: Details Slider panel */}
                        <AnimatePresence>
                            {selectedEmail && (
                                <motion.div
                                    key="detail-panel"
                                    initial={{ opacity: 0, x: 20 }}
                                    animate={{ opacity: 1, x: 0 }}
                                    exit={{ opacity: 0, x: 20 }}
                                    className="lg:col-span-6 bg-white border border-slate-100 rounded-2xl shadow-sm overflow-hidden flex flex-col max-h-[85vh] sticky top-6"
                                >
                                    {/* Header panel */}
                                    <div className="p-5 border-b border-slate-100 bg-slate-50/50 flex items-center justify-between gap-4">
                                        <div className="flex items-center gap-2">
                                            <span className="px-2 py-0.5 rounded-md bg-indigo-50 border border-indigo-100 text-brand-accent text-[9px] font-bold uppercase tracking-wider flex items-center gap-1">
                                                <Sparkles className="w-3 h-3" />
                                                AI Archive Record
                                            </span>
                                        </div>

                                        <button
                                            onClick={() => setSelectedEmail(null)}
                                            className="p-1.5 hover:bg-slate-100 rounded-lg text-slate-400 hover:text-slate-600 transition-colors outline-none"
                                            aria-label="Close details panel"
                                        >
                                            <X className="w-4 h-4" />
                                        </button>
                                    </div>

                                    {/* Details list scroll area */}
                                    <div className="p-6 overflow-y-auto space-y-6 flex-1 text-left">
                                        {/* Subject */}
                                        <div>
                                            <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest block mb-2">Subject</span>
                                            <h3 className="text-base font-bold text-slate-800">{selectedEmail.subject || "No Subject"}</h3>
                                        </div>

                                        {/* Metadata cards */}
                                        <div className="grid grid-cols-2 gap-3">
                                            <div className="bg-slate-50 border border-slate-100/50 p-4 rounded-xl">
                                                <span className="text-[9px] font-bold text-slate-400 block mb-1">Generated Date</span>
                                                <span className="text-xs font-bold text-slate-700">
                                                    {new Date(selectedEmail.createdAt).toLocaleDateString(undefined, { month: "short", day: "numeric", year: "numeric" })}
                                                </span>
                                            </div>
                                            <div className="bg-slate-50 border border-slate-100/50 p-4 rounded-xl">
                                                <span className="text-[9px] font-bold text-slate-400 block mb-1">Tone & Type settings</span>
                                                <span className="text-xs font-bold text-slate-700 capitalize">
                                                    {selectedEmail.tone || "General"} • {selectedEmail.type || "Direct"}
                                                </span>
                                            </div>
                                        </div>

                                        {selectedEmail.recipient && (
                                            <div className="bg-slate-50 border border-slate-100/50 p-4 rounded-xl flex items-center gap-3">
                                                <User className="w-4 h-4 text-brand-accent" />
                                                <div>
                                                    <span className="text-[9px] font-bold text-slate-400 block mb-0.5">Sent Recipient</span>
                                                    <span className="text-xs font-bold text-slate-700">{selectedEmail.recipient}</span>
                                                </div>
                                            </div>
                                        )}

                                        {/* Body Content */}
                                        <div>
                                            <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest block mb-2">Message Body</span>
                                            <div className="bg-slate-50/50 border border-slate-100/70 p-5 rounded-xl text-xs font-medium text-slate-600 whitespace-pre-wrap leading-relaxed">
                                                {selectedEmail.generatedContent?.replace(/Subject:\s*.*\n/i, "").trim()}
                                            </div>
                                        </div>
                                    </div>

                                    {/* Footer panel CTA actions */}
                                    <div className="p-5 bg-slate-50 border-t border-slate-100 flex items-center justify-between gap-3">
                                        <button
                                            type="button"
                                            onClick={(e) => handleDelete(selectedEmail._id, e)}
                                            className="px-3.5 py-2 hover:bg-rose-50 text-slate-400 hover:text-rose-600 rounded-lg text-xs font-bold transition-all outline-none"
                                        >
                                            Delete Draft
                                        </button>

                                        <div className="flex gap-2">
                                            <button
                                                type="button"
                                                onClick={(e) => handleCopyText(selectedEmail.generatedContent, e)}
                                                className="px-4 py-2 bg-brand-primary text-white hover:bg-brand-primary-hover rounded-xl text-xs font-bold transition-all outline-none flex items-center gap-1"
                                            >
                                                <Copy className="w-3.5 h-3.5" />
                                                <span>Copy Draft</span>
                                            </button>

                                            <button
                                                type="button"
                                                className="p-2 rounded-xl border border-slate-200 bg-white text-slate-400 hover:text-slate-600 transition-all outline-none cursor-not-allowed"
                                                title="Download PDF Mockup"
                                                disabled
                                            >
                                                <Download className="w-3.5 h-3.5" />
                                            </button>
                                        </div>
                                    </div>
                                </motion.div>
                            )}
                        </AnimatePresence>
                    </div>
                </div>
            </PageTransition>
        </DashboardLayout>
    );
};

export default EmailHistory;