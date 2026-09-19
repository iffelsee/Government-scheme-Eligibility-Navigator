
import { useState, useEffect, useMemo } from 'react';
import { useSearchParams, useNavigate } from 'react-router-dom';
import type { Scheme, MatchResult, MatchType } from '../types';
import { api } from '../services/api';
import { SchemeCard } from '../components/scheme/SchemeCard';
import { Button } from '../components/common/Button';
import { Search, Filter, ShieldCheck, RefreshCw } from 'lucide-react';
import { scoreScheme } from '../utils/search';

export const Results = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const querySearch = searchParams.get('search') || '';
  const queryCategory = searchParams.get('category') || '';

  const [allSchemes, setAllSchemes] = useState<Scheme[]>([]);
  const [matchedResults, setMatchedResults] = useState<MatchResult[]>([]);
  const [hasEvaluated, setHasEvaluated] = useState(false);
  const [loading, setLoading] = useState(true);

  // Filters
  const [search, setSearch] = useState(querySearch);
  const [selectedCategory, setSelectedCategory] = useState(queryCategory);
  const [selectedState, setSelectedState] = useState('');
  const [matchFilter, setMatchFilter] = useState<'all' | 'STRONG_MATCH' | 'POSSIBLE_MATCH'>('all');
  const [availableStates, setAvailableStates] = useState<string[]>([]);

  // Sync search state when querySearch parameter changes
  useEffect(() => {
    setSearch(querySearch);
  }, [querySearch]);

  useEffect(() => {
    setLoading(true);
    // Check if coming from questionnaire
    const storedResults = sessionStorage.getItem('scheme_navigator_results');
    if (storedResults) {
      try {
        const parsed = JSON.parse(storedResults);
        setMatchedResults(parsed);
        setHasEvaluated(true);
      } catch (e) {
        console.error(e);
      }
    }

    Promise.all([api.getAllSchemes(), api.getAvailableStates()]).then(([s, states]) => {
      setAllSchemes(s);
      setAvailableStates(states);
      setLoading(false);
    });
  }, []);

  // Compute displayed schemes and their match status
  const displayedItems = useMemo(() => {
    let items: { scheme: Scheme; matchType?: MatchType; matchReasons?: string[]; searchScore?: number }[] = [];

    if (hasEvaluated && matchedResults.length > 0) {
      items = matchedResults.map((m) => ({
        scheme: m.scheme,
        matchType: m.matchType,
        matchReasons: m.matchReasons,
      }));

      if (matchFilter !== 'all') {
        items = items.filter((item) => item.matchType === matchFilter);
      }
    } else {
      items = allSchemes.map((scheme) => ({
        scheme,
      }));
    }

    // Category filter
    if (selectedCategory) {
      items = items.filter((it) =>
        it.scheme.categories.toLowerCase().includes(selectedCategory.toLowerCase())
      );
    }

    // State filter
    if (selectedState) {
      if (selectedState === 'Central') {
        items = items.filter(
          (it) => !it.scheme.state || it.scheme.level.toLowerCase().includes('central')
        );
      } else {
        items = items.filter(
          (it) => it.scheme.state.toLowerCase() === selectedState.toLowerCase()
        );
      }
    }

    // Search query filter with fuzzy matching and relevance ranking
    if (search.trim()) {
      items = items
        .map((it) => ({
          ...it,
          searchScore: scoreScheme(it.scheme, search),
        }))
        .filter((it) => (it.searchScore ?? 0) > 0)
        .sort((a, b) => (b.searchScore ?? 0) - (a.searchScore ?? 0));
    }

    return items;
  }, [allSchemes, matchedResults, hasEvaluated, matchFilter, search, selectedCategory, selectedState]);

  const strongMatchesCount = matchedResults.filter((m) => m.matchType === 'STRONG_MATCH').length;
  const possibleMatchesCount = matchedResults.filter((m) => m.matchType === 'POSSIBLE_MATCH').length;

  return (
    <div className="min-h-screen bg-[#E8E6E1] py-10 px-4 sm:px-6 lg:px-8 text-[#0F1A2B]">
      <div className="max-w-7xl mx-auto">
        {/* Results Page Header */}
        <div className="mb-8">
          {hasEvaluated ? (
            <div className="bg-gradient-to-r from-[#0F1A2B] via-[#1C2E4A] to-[#0F1A2B] text-white rounded-3xl p-6 sm:p-8 shadow-md border border-[#52677D]/30">
              <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div>
                  <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/20 text-emerald-300 text-xs font-bold mb-2">
                    <ShieldCheck className="w-4 h-4 text-emerald-400" />
                    Evaluated by Eligibility Engine
                  </div>
                  <h1 className="text-2xl sm:text-3xl font-serif font-extrabold text-[#D1CFC9]">
                    Your Potential Matches
                  </h1>
                  <p className="text-xs sm:text-sm text-[#D1CFC9]/80 mt-1">
                    We found <strong>{matchedResults.length}</strong> matching schemes based on your questionnaire profile.
                  </p>
                </div>

                <div className="flex items-center gap-3">
                  <div className="px-4 py-2 bg-white/10 rounded-xl text-center border border-white/10">
                    <div className="text-xs text-[#D1CFC9]/80">Strong Matches</div>
                    <div className="text-xl font-extrabold text-emerald-400">{strongMatchesCount}</div>
                  </div>
                  <div className="px-4 py-2 bg-white/10 rounded-xl text-center border border-white/10">
                    <div className="text-xs text-[#D1CFC9]/80">Possible Matches</div>
                    <div className="text-xl font-extrabold text-amber-300">{possibleMatchesCount}</div>
                  </div>
                  <Button
                    variant="secondary"
                    size="sm"
                    onClick={() => navigate('/questionnaire')}
                    className="shrink-0"
                  >
                    <RefreshCw className="w-3.5 h-3.5" /> Retake
                  </Button>
                </div>
              </div>
            </div>
          ) : (
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-[#BDC4D4]">
              <div>
                <h1 className="text-2xl sm:text-3xl font-serif font-extrabold text-[#0F1A2B]">
                  Government Schemes Directory
                </h1>
                <p className="text-xs sm:text-sm text-[#52677D] mt-1">
                  Explore all active Central and State government welfare programs.
                </p>
              </div>
              <Button
                variant="primary"
                onClick={() => navigate('/questionnaire')}
              >
                <ShieldCheck className="w-4 h-4" /> Check My Eligibility
              </Button>
            </div>
          )}
        </div>

        {/* Filter and Search Bar */}
        <div className="bg-[#F5F3EE] rounded-2xl border border-[#BDC4D4] p-4 sm:p-5 shadow-xs mb-6 flex flex-col md:flex-row items-center gap-4 transition-all">
          <div className="relative flex-1 w-full group">
            <Search className="w-4 h-4 text-[#52677D] group-focus-within:text-[#0F1A2B] transition-colors duration-200 absolute left-3.5 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              placeholder="Search schemes by title, keywords, benefits..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full pl-10 pr-4 py-2.5 text-sm bg-[#EBE8E1] border border-[#BDC4D4] rounded-xl focus:outline-none focus:ring-2 focus:ring-[#52677D] focus:bg-[#FAF9F6] text-[#0F1A2B] transition-all duration-200"
            />
          </div>

          <div className="flex flex-wrap items-center gap-3 w-full md:w-auto">
            {/* Match Filter (only if questionnaire evaluated) */}
            {hasEvaluated && (
              <select
                value={matchFilter}
                onChange={(e) => setMatchFilter(e.target.value as any)}
                className="p-2.5 text-xs border border-[#BDC4D4] rounded-xl bg-[#EBE8E1] font-semibold text-[#0F1A2B] focus:outline-none focus:ring-2 focus:ring-[#52677D] transition-all cursor-pointer"
              >
                <option value="all">All Matches</option>
                <option value="STRONG_MATCH">🟢 Strong Match Only</option>
                <option value="POSSIBLE_MATCH">🟡 Possible Match Only</option>
              </select>
            )}

            {/* State Filter */}
            <select
              value={selectedState}
              onChange={(e) => setSelectedState(e.target.value)}
              className="p-2.5 text-xs border border-[#BDC4D4] rounded-xl bg-[#EBE8E1] font-semibold text-[#0F1A2B] focus:outline-none focus:ring-2 focus:ring-[#52677D] transition-all cursor-pointer"
            >
              <option value="">All States / Central</option>
              <option value="Central">Central Only</option>
              {availableStates.map((s) => (
                <option key={s} value={s}>
                  {s}
                </option>
              ))}
            </select>
          </div>
        </div>

        {/* Results Counter Badge */}
        {!loading && (
          <div className="flex items-center justify-between mb-6 animate-fade-in">
            <div className="text-xs font-semibold text-[#0F1A2B]/80 bg-[#EBE8E1] border border-[#BDC4D4] px-3.5 py-2 rounded-xl transition-all duration-200 inline-flex items-center gap-2 shadow-xs">
              <span className="w-2 h-2 rounded-full bg-[#52677D]"></span>
              <span>
                Showing <strong className="text-[#0F1A2B] transition-all">{displayedItems.length}</strong> {displayedItems.length === 1 ? 'scheme' : 'schemes'}
              </span>
            </div>
          </div>
        )}

        {/* Results Grid */}
        {loading ? (
          <div className="p-16 text-center text-sm text-[#52677D] animate-pulse">Loading results...</div>
        ) : displayedItems.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {displayedItems.map((item, index) => (
              <SchemeCard
                key={item.scheme.slug}
                scheme={item.scheme}
                matchType={item.matchType}
                matchReasons={item.matchReasons}
                staggerIndex={index}
              />
            ))}
          </div>
        ) : (
          <div className="bg-[#F5F3EE] rounded-3xl border border-[#BDC4D4] p-12 text-center max-w-md mx-auto">
            <Filter className="w-12 h-12 text-[#52677D]/40 mx-auto mb-3" />
            <h3 className="font-serif font-bold text-[#0F1A2B] text-base mb-1">No Schemes Found</h3>
            <p className="text-xs text-[#52677D] mb-6">
              No government schemes matched your filter conditions. Try clearing filters or taking the questionnaire.
            </p>
            <Button
              variant="outline"
              size="sm"
              onClick={() => {
                setSearch('');
                setSelectedCategory('');
                setSelectedState('');
                setMatchFilter('all');
              }}
            >
              Reset All Filters
            </Button>
          </div>
        )}
      </div>
    </div>
  );
};
