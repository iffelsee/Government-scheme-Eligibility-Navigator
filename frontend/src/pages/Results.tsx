
import { useState, useEffect, useMemo } from 'react';
import { useSearchParams, useNavigate } from 'react-router-dom';
import type { Scheme, MatchResult, MatchType } from '../types';
import { api } from '../services/api';
import { SchemeCard } from '../components/scheme/SchemeCard';
import { Button } from '../components/common/Button';
import { Search, Filter, ShieldCheck, RefreshCw } from 'lucide-react';

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
    let items: { scheme: Scheme; matchType?: MatchType; matchReasons?: string[] }[] = [];

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

    // Search query filter
    if (search.trim()) {
      const q = search.toLowerCase();
      items = items.filter(
        (it) =>
          it.scheme.scheme_name.toLowerCase().includes(q) ||
          it.scheme.short_title.toLowerCase().includes(q) ||
          it.scheme.tags.toLowerCase().includes(q) ||
          it.scheme.categories.toLowerCase().includes(q) ||
          it.scheme.description.toLowerCase().includes(q)
      );
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

    return items;
  }, [allSchemes, matchedResults, hasEvaluated, matchFilter, search, selectedCategory, selectedState]);

  const strongMatchesCount = matchedResults.filter((m) => m.matchType === 'STRONG_MATCH').length;
  const possibleMatchesCount = matchedResults.filter((m) => m.matchType === 'POSSIBLE_MATCH').length;

  return (
    <div className="min-h-screen bg-slate-50 py-10 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        {/* Results Page Header */}
        <div className="mb-8">
          {hasEvaluated ? (
            <div className="bg-gradient-to-r from-blue-900 to-indigo-900 text-white rounded-3xl p-6 sm:p-8 shadow-md">
              <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div>
                  <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/20 text-emerald-300 text-xs font-bold mb-2">
                    <ShieldCheck className="w-4 h-4 text-emerald-400" />
                    Evaluated by Eligibility Engine
                  </div>
                  <h1 className="text-2xl sm:text-3xl font-extrabold">
                    Your Potential Matches
                  </h1>
                  <p className="text-xs sm:text-sm text-blue-200 mt-1">
                    We found <strong>{matchedResults.length}</strong> matching schemes based on your questionnaire profile.
                  </p>
                </div>

                <div className="flex items-center gap-3">
                  <div className="px-4 py-2 bg-white/10 rounded-xl text-center">
                    <div className="text-xs text-blue-200">Strong Matches</div>
                    <div className="text-xl font-extrabold text-emerald-400">{strongMatchesCount}</div>
                  </div>
                  <div className="px-4 py-2 bg-white/10 rounded-xl text-center">
                    <div className="text-xs text-blue-200">Possible Matches</div>
                    <div className="text-xl font-extrabold text-amber-400">{possibleMatchesCount}</div>
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
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-slate-200">
              <div>
                <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900">
                  Government Schemes Directory
                </h1>
                <p className="text-xs sm:text-sm text-slate-600 mt-1">
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
        <div className="bg-white rounded-2xl border border-slate-200 p-4 sm:p-5 shadow-xs mb-8 flex flex-col md:flex-row items-center gap-4">
          <div className="relative flex-1 w-full">
            <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              placeholder="Search schemes by title, keywords, benefits..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full pl-10 pr-4 py-2 text-sm bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <div className="flex flex-wrap items-center gap-3 w-full md:w-auto">
            {/* Match Filter (only if questionnaire evaluated) */}
            {hasEvaluated && (
              <select
                value={matchFilter}
                onChange={(e) => setMatchFilter(e.target.value as any)}
                className="p-2 text-xs border border-slate-200 rounded-xl bg-slate-50 font-semibold text-slate-700"
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
              className="p-2 text-xs border border-slate-200 rounded-xl bg-slate-50 font-semibold text-slate-700"
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

        {/* Results Grid */}
        {loading ? (
          <div className="p-16 text-center text-sm text-slate-500">Loading results...</div>
        ) : displayedItems.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {displayedItems.map((item) => (
              <SchemeCard
                key={item.scheme.slug}
                scheme={item.scheme}
                matchType={item.matchType}
                matchReasons={item.matchReasons}
              />
            ))}
          </div>
        ) : (
          <div className="bg-white rounded-3xl border border-slate-200 p-12 text-center max-w-md mx-auto">
            <Filter className="w-12 h-12 text-slate-300 mx-auto mb-3" />
            <h3 className="font-bold text-slate-800 text-base mb-1">No Schemes Found</h3>
            <p className="text-xs text-slate-500 mb-6">
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
