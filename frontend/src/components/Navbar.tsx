
import { Landmark, Bookmark, ShieldCheck, Compass, Search } from 'lucide-react';

interface NavbarProps {
  activeTab: 'all' | 'saved' | 'matched';
  setActiveTab: (tab: 'all' | 'saved' | 'matched') => void;
  savedCount: number;
  matchedCount: number;
  onOpenWizard: () => void;
  searchQuery: string;
  setSearchQuery: (q: string) => void;
}

export const Navbar = ({
  activeTab,
  setActiveTab,
  savedCount,
  matchedCount,
  onOpenWizard,
  searchQuery,
  setSearchQuery,
}: NavbarProps) => {
  return (
    <header className="sticky top-0 z-40 bg-white/95 backdrop-blur shadow-sm border-b border-slate-200">
      {/* Tricolor bar */}
      <div className="h-1.5 w-full flex">
        <div className="w-1/3 bg-[#FF9933]"></div>
        <div className="w-1/3 bg-white border-y border-slate-200"></div>
        <div className="w-1/3 bg-[#138808]"></div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 gap-4">
          {/* Brand */}
          <div className="flex items-center gap-3 cursor-pointer" onClick={() => setActiveTab('all')}>
            <div className="w-10 h-10 rounded-xl bg-blue-900 flex items-center justify-center text-white shadow-md">
              <Landmark className="w-6 h-6" />
            </div>
            <div>
              <div className="font-bold text-lg leading-tight text-slate-900 tracking-tight flex items-center gap-2">
                Scheme Navigator
                <span className="text-xs font-semibold px-2 py-0.5 rounded-full bg-blue-100 text-blue-800">
                  Govt. of India
                </span>
              </div>
              <p className="text-xs text-slate-500 hidden sm:block">
                Government Scheme Eligibility Navigator
              </p>
            </div>
          </div>

          {/* Search bar in nav */}
          <div className="hidden md:flex flex-1 max-w-md mx-4 relative">
            <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              placeholder="Search by scheme name, benefits, tags, department..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-9 pr-4 py-1.5 text-sm bg-slate-100 border border-transparent rounded-lg focus:outline-none focus:bg-white focus:border-blue-500 focus:ring-2 focus:ring-blue-100 transition-all"
            />
          </div>

          {/* Navigation Actions */}
          <div className="flex items-center gap-2 sm:gap-3">
            <button
              onClick={() => setActiveTab('all')}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-sm font-medium transition-colors ${
                activeTab === 'all'
                  ? 'bg-blue-50 text-blue-700'
                  : 'text-slate-600 hover:bg-slate-100'
              }`}
            >
              <Compass className="w-4 h-4" />
              <span className="hidden sm:inline">Browse</span>
            </button>

            <button
              onClick={() => setActiveTab('saved')}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-sm font-medium transition-colors relative ${
                activeTab === 'saved'
                  ? 'bg-blue-50 text-blue-700'
                  : 'text-slate-600 hover:bg-slate-100'
              }`}
            >
              <Bookmark className="w-4 h-4" />
              <span className="hidden sm:inline">Saved</span>
              {savedCount > 0 && (
                <span className="px-1.5 py-0.5 text-xs font-bold rounded-full bg-blue-600 text-white leading-none">
                  {savedCount}
                </span>
              )}
            </button>

            {matchedCount > 0 && (
              <button
                onClick={() => setActiveTab('matched')}
                className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-sm font-medium transition-colors ${
                  activeTab === 'matched'
                    ? 'bg-emerald-50 text-emerald-700 border border-emerald-300'
                    : 'bg-emerald-50/50 text-emerald-700 hover:bg-emerald-100'
                }`}
              >
                <ShieldCheck className="w-4 h-4 text-emerald-600" />
                <span className="hidden sm:inline">Eligible</span>
                <span className="px-1.5 py-0.5 text-xs font-bold rounded-full bg-emerald-600 text-white leading-none">
                  {matchedCount}
                </span>
              </button>
            )}

            <button
              onClick={onOpenWizard}
              className="flex items-center gap-2 px-3.5 py-1.5 bg-gradient-to-r from-blue-700 to-indigo-700 hover:from-blue-800 hover:to-indigo-800 text-white text-sm font-semibold rounded-lg shadow-sm hover:shadow transition-all"
            >
              <ShieldCheck className="w-4 h-4" />
              <span>Check Eligibility</span>
            </button>
          </div>
        </div>
      </div>
    </header>
  );
};
