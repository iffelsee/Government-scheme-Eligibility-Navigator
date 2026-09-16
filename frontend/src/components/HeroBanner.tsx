
import { Search, Sparkles, CheckCircle2, Award, Users, BookOpen } from 'lucide-react';

interface HeroBannerProps {
  totalSchemes: number;
  onCheckEligibility: () => void;
  searchQuery: string;
  setSearchQuery: (q: string) => void;
}

export const HeroBanner = ({
  totalSchemes,
  onCheckEligibility,
  searchQuery,
  setSearchQuery,
}: HeroBannerProps) => {
  return (
    <div className="relative overflow-hidden bg-gradient-to-br from-blue-950 via-slate-900 to-indigo-950 text-white py-12 px-4 sm:px-6 lg:px-8 border-b border-slate-800">
      <div className="absolute inset-0 opacity-10 bg-[radial-gradient(#3b82f6_1px,transparent_1px)] [background-size:16px_16px]"></div>

      <div className="max-w-5xl mx-auto text-center relative z-10">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-500/10 border border-blue-400/20 text-blue-300 text-xs font-medium mb-4">
          <Sparkles className="w-3.5 h-3.5 text-blue-400" />
          Single Window Access to Welfare Schemes & Subsidies
        </div>

        <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold tracking-tight mb-4">
          Find Government Schemes <br className="hidden sm:block" />
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-sky-300 to-emerald-400">
            Tailored For You & Your Family
          </span>
        </h1>

        <p className="text-slate-300 text-sm sm:text-base max-w-2xl mx-auto mb-8">
          Navigate financial assistance, scholarships, agricultural subsidies, training, and healthcare benefits. Answer a few questions to see your exact eligibility.
        </p>

        {/* Big Search Bar on Mobile / Hero */}
        <div className="max-w-2xl mx-auto mb-8 flex flex-col sm:flex-row items-center gap-3">
          <div className="relative flex-1 w-full">
            <Search className="w-5 h-5 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search by keywords (e.g. stipend, kisan, scholarship, housing)..."
              className="w-full pl-11 pr-4 py-3 bg-white/10 text-white placeholder-slate-400 rounded-xl border border-white/20 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:bg-white/20 text-sm"
            />
          </div>
          <button
            onClick={onCheckEligibility}
            className="w-full sm:w-auto px-6 py-3 bg-emerald-600 hover:bg-emerald-500 text-white font-semibold rounded-xl text-sm transition-all shadow-lg hover:shadow-emerald-600/30 flex items-center justify-center gap-2 shrink-0"
          >
            <CheckCircle2 className="w-4 h-4" />
            Eligibility Check
          </button>
        </div>

        {/* Stats Row */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 max-w-3xl mx-auto pt-4 border-t border-white/10 text-slate-300 text-xs sm:text-sm">
          <div className="flex items-center justify-center gap-2">
            <Award className="w-4 h-4 text-blue-400" />
            <span><strong>{totalSchemes}+</strong> Schemes Indexed</span>
          </div>
          <div className="flex items-center justify-center gap-2">
            <BookOpen className="w-4 h-4 text-emerald-400" />
            <span><strong>Central & State</strong> Portals</span>
          </div>
          <div className="flex items-center justify-center gap-2">
            <Users className="w-4 h-4 text-amber-400" />
            <span><strong>All Demographics</strong> Supported</span>
          </div>
          <div className="flex items-center justify-center gap-2">
            <CheckCircle2 className="w-4 h-4 text-sky-400" />
            <span><strong>Instant</strong> Evaluation</span>
          </div>
        </div>
      </div>
    </div>
  );
};
