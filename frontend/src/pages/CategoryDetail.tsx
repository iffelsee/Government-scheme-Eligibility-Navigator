
import { useState, useEffect, useMemo } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import type { Scheme, CategoryInfo } from '../types';
import { api } from '../services/api';
import { SchemeCard } from '../components/scheme/SchemeCard';
import { Button } from '../components/common/Button';
import { ArrowLeft, ShieldCheck, Filter } from 'lucide-react';
import {
  SchemeFilterPanel,
  filterScheme,
  INITIAL_FILTER_STATE,
  type SchemeFilterState,
} from '../components/scheme/SchemeFilterPanel';
import { scoreScheme } from '../utils/search';

export const CategoryDetail = () => {
  const { slug } = useParams<{ slug: string }>();
  const navigate = useNavigate();
  const [category, setCategory] = useState<CategoryInfo | null>(null);
  const [allCategorySchemes, setAllCategorySchemes] = useState<Scheme[]>([]);
  const [availableStates, setAvailableStates] = useState<string[]>([]);
  const [filters, setFilters] = useState<SchemeFilterState>(INITIAL_FILTER_STATE);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!slug) return;
    setLoading(true);

    Promise.all([
      api.getCategories(),
      api.getSchemesByCategory(slug),
      api.getAvailableStates(),
    ]).then(([cats, catSchemes, states]) => {
      const found = cats.find((c) => c.slug === slug);
      setCategory(found || null);
      setAllCategorySchemes(catSchemes);
      setAvailableStates(states);
      setLoading(false);
    });
  }, [slug]);

  // Compute filtered and search-ranked schemes
  const displayedSchemes = useMemo(() => {
    // 1. Filter by the 7 criteria (level, state, gender, age, category, income, targetGroup)
    let result = allCategorySchemes.filter((scheme) => filterScheme(scheme, filters));

    // 2. Filter & rank by search query if present
    if (filters.search.trim()) {
      result = result
        .map((scheme) => ({
          scheme,
          score: scoreScheme(scheme, filters.search),
        }))
        .filter((item) => item.score > 0)
        .sort((a, b) => b.score - a.score)
        .map((item) => item.scheme);
    }

    return result;
  }, [allCategorySchemes, filters]);

  const handleClearAll = () => {
    setFilters(INITIAL_FILTER_STATE);
  };

  if (!category && !loading) {
    return (
      <div className="max-w-4xl mx-auto py-16 px-4 text-center">
        <h2 className="text-xl font-bold text-slate-900 mb-2">Category Not Found</h2>
        <Link to="/categories" className="text-sm text-blue-600 hover:underline">
          Back to categories
        </Link>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#E8E6E1] py-10 px-4 sm:px-6 lg:px-8 text-[#0F1A2B]">
      <div className="max-w-7xl mx-auto">
        <Link
          to="/categories"
          className="inline-flex items-center gap-1.5 text-xs font-semibold text-[#52677D] hover:text-[#0F1A2B] mb-6"
        >
          <ArrowLeft className="w-4 h-4" /> All Categories
        </Link>

        {/* Hero Banner for Category */}
        <div className="bg-[#F5F3EE] rounded-3xl border border-[#BDC4D4] p-8 sm:p-10 mb-8 shadow-sm flex flex-col md:flex-row items-start md:items-center justify-between gap-6 animate-fade-up">
          <div className="space-y-3 max-w-2xl">
            <div className="text-4xl animate-scale-in">{category?.icon}</div>
            <h1 className="text-3xl font-serif font-bold text-[#0F1A2B] animate-fade-up stagger-1">
              {category?.name} Schemes
            </h1>
            <p className="text-sm text-[#52677D] leading-relaxed font-light animate-fade-up stagger-2">
              Find government {category?.name.toLowerCase()} schemes relevant to you. Answer our quick questionnaire to evaluate your eligibility.
            </p>
          </div>

          <Button
            size="lg"
            variant="primary"
            onClick={() => navigate(`/questionnaire?category=${slug}`)}
            className="shrink-0 shadow-sm"
          >
            <ShieldCheck className="w-5 h-5" /> Start Questionnaire
          </Button>
        </div>

        {/* Filter Section */}
        <SchemeFilterPanel
          filters={filters}
          setFilters={setFilters}
          availableStates={availableStates}
          totalMatches={displayedSchemes.length}
          onClearAll={handleClearAll}
        />

        {/* Schemes List Header */}
        <div className="flex items-center justify-between mb-6 animate-fade-in">
          <div>
            <h2 className="text-xl font-serif font-bold text-[#0F1A2B]">
              {category?.name} Schemes
            </h2>
            <p className="text-xs text-[#52677D] mt-0.5">
              Showing {displayedSchemes.length} of {allCategorySchemes.length} total schemes in this sector
            </p>
          </div>
          <Link
            to={`/results?category=${encodeURIComponent(category?.name || '')}`}
            className="text-xs font-semibold text-[#0F1A2B] hover:text-[#1C2E4A] transition-colors"
          >
            View in directory →
          </Link>
        </div>

        {/* Schemes Results Grid or Empty State */}
        {loading ? (
          <div className="p-16 text-center text-sm text-[#52677D] animate-pulse">Loading schemes...</div>
        ) : displayedSchemes.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {displayedSchemes.map((scheme, index) => (
              <SchemeCard key={scheme.slug} scheme={scheme} staggerIndex={index} />
            ))}
          </div>
        ) : (
          <div className="bg-[#F5F3EE] rounded-3xl border border-[#BDC4D4] p-12 text-center max-w-md mx-auto">
            <Filter className="w-12 h-12 text-[#52677D]/40 mx-auto mb-3" />
            <h3 className="font-serif font-bold text-[#0F1A2B] text-base mb-1">No Schemes Found</h3>
            <p className="text-xs text-[#52677D] mb-6">
              No schemes in {category?.name} matched your selected filters or search query. Try broadening your criteria or clearing filters.
            </p>
            <Button
              variant="outline"
              size="sm"
              onClick={handleClearAll}
            >
              Clear All Filters
            </Button>
          </div>
        )}
      </div>
    </div>
  );
};
