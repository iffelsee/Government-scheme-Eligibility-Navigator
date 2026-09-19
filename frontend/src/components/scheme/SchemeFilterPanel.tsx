import { useState } from 'react';
import type { Scheme } from '../../types';
import { Search, Filter, X, RotateCcw, ChevronDown, ChevronUp, SlidersHorizontal } from 'lucide-react';

export interface SchemeFilterState {
  search: string;
  level: 'all' | 'Central' | 'State';
  state: string;
  gender: 'all' | 'female' | 'male';
  ageGroup: 'all' | 'children' | 'youth' | 'adults' | 'seniors';
  casteCategory: 'all' | 'SC' | 'ST' | 'OBC' | 'Minority' | 'EWS_BPL' | 'General';
  incomeRange: 'all' | 'bpl_low' | 'mid' | 'upper_mid';
  targetGroup: 'all' | 'student' | 'farmer' | 'women' | 'senior' | 'pwd' | 'unemployed' | 'entrepreneur' | 'daily_wage' | 'artisan';
}

export const INITIAL_FILTER_STATE: SchemeFilterState = {
  search: '',
  level: 'all',
  state: '',
  gender: 'all',
  ageGroup: 'all',
  casteCategory: 'all',
  incomeRange: 'all',
  targetGroup: 'all',
};

/**
 * Validates whether a scheme meets all selected filter conditions.
 */
export function filterScheme(scheme: Scheme, filters: SchemeFilterState): boolean {
  const full = (
    (scheme.scheme_name || '') + ' ' +
    (scheme.tags || '') + ' ' +
    (scheme.categories || '') + ' ' +
    (scheme.subcategories || '') + ' ' +
    (scheme.eligibility || '') + ' ' +
    (scheme.description || '') + ' ' +
    (scheme.brief_description || '') + ' ' +
    (scheme.benefits || '') + ' ' +
    (scheme.department || '')
  ).toLowerCase();

  // 1. Level filter
  if (filters.level === 'Central') {
    if (scheme.state && !scheme.level.toLowerCase().includes('central')) {
      return false;
    }
  } else if (filters.level === 'State') {
    if (!scheme.state && scheme.level.toLowerCase().includes('central')) {
      return false;
    }
  }

  // 2. State filter
  if (filters.state) {
    const isCentral = !scheme.state || scheme.level.toLowerCase().includes('central');
    if (filters.level === 'State') {
      if (!scheme.state || scheme.state.toLowerCase() !== filters.state.toLowerCase()) {
        return false;
      }
    } else {
      const matchesState = scheme.state && scheme.state.toLowerCase() === filters.state.toLowerCase();
      if (!matchesState && !isCentral) {
        return false;
      }
    }
  }

  // 3. Gender filter
  if (filters.gender === 'female') {
    if (full.includes('only male') || full.includes('men only')) {
      return false;
    }
    const isFemaleSpecific = full.includes('women') || full.includes('female') || full.includes('girl') || full.includes('maternity') || full.includes('widow') || full.includes('mother');
    const isGeneral = !full.includes('only male');
    if (!isFemaleSpecific && !isGeneral) {
      return false;
    }
  } else if (filters.gender === 'male') {
    const isFemaleOnly = full.includes('female only') || full.includes('women only') || full.includes('girl child') || full.includes('widow') || full.includes('pregnant') || full.includes('maternity');
    if (isFemaleOnly) {
      return false;
    }
  }

  // 4. Age group
  if (filters.ageGroup !== 'all') {
    if (filters.ageGroup === 'children') {
      const isChild = full.includes('child') || full.includes('minor') || full.includes('infant') || full.includes('school student') || full.includes('pre-matric') || full.includes('below 18');
      if (!isChild) return false;
    } else if (filters.ageGroup === 'youth') {
      const isYouth = full.includes('youth') || full.includes('student') || full.includes('college') || full.includes('higher education') || full.includes('apprentice') || full.includes('skill') || full.includes('below 35') || full.includes('18-35');
      if (!isYouth) return false;
    } else if (filters.ageGroup === 'seniors') {
      const isSenior = full.includes('senior citizen') || full.includes('old age') || full.includes('60 years') || full.includes('pension') || full.includes('elderly');
      if (!isSenior) return false;
    } else if (filters.ageGroup === 'adults') {
      const isChildOnly = (full.includes('child only') || full.includes('infant')) && !full.includes('adult');
      if (isChildOnly) return false;
    }
  }

  // 5. Social/Economic Category
  if (filters.casteCategory !== 'all') {
    if (filters.casteCategory === 'SC') {
      if (!/\b(sc|scheduled caste)\b/.test(full)) return false;
    } else if (filters.casteCategory === 'ST') {
      if (!/\b(st|scheduled tribe)\b/.test(full)) return false;
    } else if (filters.casteCategory === 'OBC') {
      if (!/\b(obc|other backward)\b/.test(full)) return false;
    } else if (filters.casteCategory === 'Minority') {
      if (!/\b(minority|minorities|muslim|christian|sikh|buddhist|jain|parsi)\b/.test(full)) return false;
    } else if (filters.casteCategory === 'EWS_BPL') {
      if (!/\b(bpl|poverty line|ration card|economically weaker|ews|antyodaya)\b/.test(full)) return false;
    } else if (filters.casteCategory === 'General') {
      const isExclusive = full.includes('only sc') || full.includes('only st') || full.includes('only minority');
      if (isExclusive) return false;
    }
  }

  // 6. Income Range
  if (filters.incomeRange !== 'all') {
    if (filters.incomeRange === 'bpl_low') {
      const isLow = full.includes('bpl') || full.includes('poverty line') || full.includes('ration card') || full.includes('₹1,00,000') || full.includes('₹24,000') || full.includes('low income');
      if (!isLow) return false;
    } else if (filters.incomeRange === 'mid') {
      const isMid = full.includes('₹2,50,000') || full.includes('₹3,00,000') || full.includes('2.5 lakh') || full.includes('3 lakh') || full.includes('bpl') || full.includes('₹1,00,000');
      if (!isMid) return false;
    } else if (filters.incomeRange === 'upper_mid') {
      const isUpperMid = full.includes('₹8,00,000') || full.includes('8 lakh') || full.includes('₹5,00,000') || full.includes('5 lakh') || full.includes('income');
      if (!isUpperMid) return false;
    }
  }

  // 7. Target Group / Beneficiary Type
  if (filters.targetGroup !== 'all') {
    if (filters.targetGroup === 'student') {
      if (!(full.includes('student') || full.includes('scholarship') || full.includes('education') || full.includes('school') || full.includes('college'))) return false;
    } else if (filters.targetGroup === 'farmer') {
      if (!(full.includes('farmer') || full.includes('agriculture') || full.includes('kisan') || full.includes('crop') || full.includes('dairy') || full.includes('fisheries'))) return false;
    } else if (filters.targetGroup === 'women') {
      if (!(full.includes('women') || full.includes('girl') || full.includes('female') || full.includes('maternity') || full.includes('widow') || full.includes('mother'))) return false;
    } else if (filters.targetGroup === 'senior') {
      if (!(full.includes('senior citizen') || full.includes('old age') || full.includes('pension') || full.includes('60 years'))) return false;
    } else if (filters.targetGroup === 'pwd') {
      if (!(full.includes('disability') || full.includes('divyang') || full.includes('pwd') || full.includes('handicap'))) return false;
    } else if (filters.targetGroup === 'unemployed') {
      if (!(full.includes('unemployed') || full.includes('job seeker') || full.includes('skill') || full.includes('training') || full.includes('apprenticeship'))) return false;
    } else if (filters.targetGroup === 'entrepreneur') {
      if (!(full.includes('business') || full.includes('entrepreneur') || full.includes('msme') || full.includes('startup') || full.includes('self-employed'))) return false;
    } else if (filters.targetGroup === 'daily_wage') {
      if (!(full.includes('construction') || full.includes('daily wage') || full.includes('unorganized') || full.includes('informal') || full.includes('e-shram') || full.includes('labour'))) return false;
    } else if (filters.targetGroup === 'artisan') {
      if (!(full.includes('artisan') || full.includes('weaver') || full.includes('craftsperson') || full.includes('vishwakarma') || full.includes('handicraft'))) return false;
    }
  }

  return true;
}

interface SchemeFilterPanelProps {
  filters: SchemeFilterState;
  setFilters: React.Dispatch<React.SetStateAction<SchemeFilterState>>;
  availableStates: string[];
  totalMatches: number;
  onClearAll: () => void;
}

export const SchemeFilterPanel = ({
  filters,
  setFilters,
  availableStates,
  totalMatches,
  onClearAll,
}: SchemeFilterPanelProps) => {
  const [mobileDrawerOpen, setMobileDrawerOpen] = useState(false);
  const [showAdvanced, setShowAdvanced] = useState(false);

  // Count active filters (excluding search)
  const activeFiltersCount = [
    filters.level !== 'all',
    Boolean(filters.state),
    filters.gender !== 'all',
    filters.ageGroup !== 'all',
    filters.casteCategory !== 'all',
    filters.incomeRange !== 'all',
    filters.targetGroup !== 'all',
  ].filter(Boolean).length;

  const hasAnyFilter = activeFiltersCount > 0 || Boolean(filters.search.trim());

  const filterControls = (
    <div className="space-y-4">
      {/* Primary Row: Level, State, Target Group */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
        {/* 1. Scheme Level */}
        <div>
          <label className="block text-xs font-semibold text-[#0F1A2B]/80 uppercase tracking-wider mb-1.5">
            Scheme Level
          </label>
          <select
            value={filters.level}
            onChange={(e) => setFilters((prev) => ({ ...prev, level: e.target.value as any }))}
            className="w-full p-2.5 text-xs bg-[#EBE8E1] border border-[#BDC4D4] rounded-xl focus:outline-none focus:ring-2 focus:ring-[#52677D] font-medium text-[#0F1A2B]"
          >
            <option value="all">All Levels (Central & State)</option>
            <option value="Central">Central Government Only</option>
            <option value="State">State Government Only</option>
          </select>
        </div>

        {/* 2. State */}
        <div>
          <label className="block text-xs font-semibold text-[#0F1A2B]/80 uppercase tracking-wider mb-1.5">
            State / UT
          </label>
          <select
            value={filters.state}
            onChange={(e) => setFilters((prev) => ({ ...prev, state: e.target.value }))}
            className="w-full p-2.5 text-xs bg-[#EBE8E1] border border-[#BDC4D4] rounded-xl focus:outline-none focus:ring-2 focus:ring-[#52677D] font-medium text-[#0F1A2B]"
          >
            <option value="">All States / Pan-India</option>
            {availableStates.map((st) => (
              <option key={st} value={st}>
                {st}
              </option>
            ))}
          </select>
        </div>

        {/* 7. Beneficiary Type / Target Group */}
        <div>
          <label className="block text-xs font-semibold text-[#0F1A2B]/80 uppercase tracking-wider mb-1.5">
            Target Group
          </label>
          <select
            value={filters.targetGroup}
            onChange={(e) => setFilters((prev) => ({ ...prev, targetGroup: e.target.value as any }))}
            className="w-full p-2.5 text-xs bg-[#EBE8E1] border border-[#BDC4D4] rounded-xl focus:outline-none focus:ring-2 focus:ring-[#52677D] font-medium text-[#0F1A2B]"
          >
            <option value="all">All Beneficiary Groups</option>
            <option value="student">🎓 Students & Education</option>
            <option value="farmer">🌾 Farmers & Agriculture</option>
            <option value="women">👩 Women & Mothers</option>
            <option value="senior">👴 Senior Citizens</option>
            <option value="pwd">♿ Persons with Disability (PwD)</option>
            <option value="unemployed">🔍 Unemployed & Job Seekers</option>
            <option value="entrepreneur">💼 Entrepreneurs & MSME</option>
            <option value="daily_wage">🔨 Daily Wage & Construction</option>
            <option value="artisan">🎨 Artisans & Weavers</option>
          </select>
        </div>
      </div>

      {/* Advanced / Secondary Filters Toggle for Desktop */}
      <div className="flex items-center justify-between pt-2">
        <button
          type="button"
          onClick={() => setShowAdvanced(!showAdvanced)}
          className="inline-flex items-center gap-1.5 text-xs font-semibold text-[#0F1A2B] hover:text-[#1C2E4A] cursor-pointer"
        >
          <SlidersHorizontal className="w-3.5 h-3.5 text-[#52677D]" />
          <span>{showAdvanced ? 'Hide Additional Criteria' : 'More Filters (Gender, Age, Category, Income)'}</span>
          {showAdvanced ? <ChevronUp className="w-3.5 h-3.5" /> : <ChevronDown className="w-3.5 h-3.5" />}
        </button>

        {hasAnyFilter && (
          <button
            type="button"
            onClick={onClearAll}
            className="inline-flex items-center gap-1 text-xs font-semibold text-[#52677D] hover:text-red-600 active:scale-95 transition-all duration-150 cursor-pointer"
          >
            <RotateCcw className="w-3.5 h-3.5" /> Clear All Filters
          </button>
        )}
      </div>

      {/* Advanced Row: Gender, Age Group, Social Category, Income Range with smooth expand/collapse */}
      <div
        className={`grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 border-t border-[#BDC4D4] transition-all duration-300 ease-out overflow-hidden ${
          showAdvanced ? 'max-h-96 opacity-100 pt-3' : 'max-h-0 opacity-0 pt-0 border-t-0 pointer-events-none'
        }`}
      >
        {/* 3. Beneficiary Gender */}
        <div>
          <label className="block text-xs font-semibold text-[#0F1A2B]/80 uppercase tracking-wider mb-1.5">
            Gender
          </label>
          <select
            value={filters.gender}
            onChange={(e) => setFilters((prev) => ({ ...prev, gender: e.target.value as any }))}
            className="w-full p-2.5 text-xs bg-[#EBE8E1] border border-[#BDC4D4] rounded-xl focus:outline-none focus:ring-2 focus:ring-[#52677D] font-medium text-[#0F1A2B]"
          >
            <option value="all">All / Any Gender</option>
            <option value="female">Female Only / Women</option>
            <option value="male">Male (General)</option>
          </select>
        </div>

        {/* 4. Age Group */}
        <div>
          <label className="block text-xs font-semibold text-[#0F1A2B]/80 uppercase tracking-wider mb-1.5">
            Age Group
          </label>
          <select
            value={filters.ageGroup}
            onChange={(e) => setFilters((prev) => ({ ...prev, ageGroup: e.target.value as any }))}
            className="w-full p-2.5 text-xs bg-[#EBE8E1] border border-[#BDC4D4] rounded-xl focus:outline-none focus:ring-2 focus:ring-[#52677D] font-medium text-[#0F1A2B]"
          >
            <option value="all">All Age Groups</option>
            <option value="children">Children (0 - 18 yrs)</option>
            <option value="youth">Youth & Students (18 - 35 yrs)</option>
            <option value="adults">Adults (Working Age)</option>
            <option value="seniors">Senior Citizens (60+ yrs)</option>
          </select>
        </div>

        {/* 5. Social/Economic Category */}
        <div>
          <label className="block text-xs font-semibold text-[#0F1A2B]/80 uppercase tracking-wider mb-1.5">
            Social Category
          </label>
          <select
            value={filters.casteCategory}
            onChange={(e) => setFilters((prev) => ({ ...prev, casteCategory: e.target.value as any }))}
            className="w-full p-2.5 text-xs bg-[#EBE8E1] border border-[#BDC4D4] rounded-xl focus:outline-none focus:ring-2 focus:ring-[#52677D] font-medium text-[#0F1A2B]"
          >
            <option value="all">All Categories</option>
            <option value="General">General Category</option>
            <option value="SC">Scheduled Caste (SC)</option>
            <option value="ST">Scheduled Tribe (ST)</option>
            <option value="OBC">Other Backward Classes (OBC)</option>
            <option value="Minority">Religious Minorities</option>
            <option value="EWS_BPL">BPL / EWS Low Income</option>
          </select>
        </div>

        {/* 6. Income Range */}
        <div>
          <label className="block text-xs font-semibold text-[#0F1A2B]/80 uppercase tracking-wider mb-1.5">
            Income Range
          </label>
          <select
            value={filters.incomeRange}
            onChange={(e) => setFilters((prev) => ({ ...prev, incomeRange: e.target.value as any }))}
            className="w-full p-2.5 text-xs bg-[#EBE8E1] border border-[#BDC4D4] rounded-xl focus:outline-none focus:ring-2 focus:ring-[#52677D] font-medium text-[#0F1A2B]"
          >
            <option value="all">All Income Bands</option>
            <option value="bpl_low">Under ₹1,00,000 / BPL</option>
            <option value="mid">₹1,00,000 to ₹3,00,000 / yr</option>
            <option value="upper_mid">₹3,00,000 to ₹8,00,000 / yr</option>
          </select>
        </div>
      </div>
    </div>
  );

  return (
    <div className="bg-[#F5F3EE] rounded-2xl border border-[#BDC4D4] p-5 sm:p-6 shadow-xs mb-8 space-y-4">
      {/* Top Bar: Search Input, Mobile Filter Button, and Match Counter */}
      <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3">
        {/* Integrated Search Input */}
        <div className="relative flex-1 group">
          <Search className="w-4 h-4 text-[#52677D] group-focus-within:text-[#0F1A2B] transition-colors duration-200 absolute left-3.5 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            placeholder="Search within this sector (e.g. loan, subsidy, stipend, kisan)..."
            value={filters.search}
            onChange={(e) => setFilters((prev) => ({ ...prev, search: e.target.value }))}
            className="w-full pl-10 pr-9 py-2.5 text-sm bg-[#EBE8E1] border border-[#BDC4D4] rounded-xl focus:outline-none focus:ring-2 focus:ring-[#52677D] focus:bg-[#FAF9F6] text-[#0F1A2B] transition-all duration-200"
          />
          {filters.search && (
            <button
              onClick={() => setFilters((prev) => ({ ...prev, search: '' }))}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-[#52677D] hover:text-[#0F1A2B] p-0.5 rounded cursor-pointer active:scale-90 transition-transform"
              title="Clear search"
            >
              <X className="w-4 h-4" />
            </button>
          )}
        </div>

        {/* Mobile Filters Button */}
        <div className="flex sm:hidden items-center justify-between gap-2">
          <button
            onClick={() => setMobileDrawerOpen(true)}
            className="flex-1 flex items-center justify-center gap-2 px-4 py-2.5 bg-[#EBE8E1] hover:bg-[#D1CFC9] active:scale-[0.98] text-[#0F1A2B] font-semibold rounded-xl text-xs border border-[#BDC4D4] transition-all"
          >
            <Filter className="w-4 h-4 text-[#52677D]" />
            <span>Filters {activeFiltersCount > 0 && `(${activeFiltersCount})`}</span>
          </button>

          {hasAnyFilter && (
            <button
              onClick={onClearAll}
              className="px-3 py-2.5 text-xs text-[#52677D] hover:text-red-600 font-medium active:scale-95 transition-all"
            >
              Clear
            </button>
          )}
        </div>

        {/* Results Count Badge */}
        <div className="hidden sm:flex items-center gap-2 text-xs font-semibold text-[#0F1A2B]/80 bg-[#EBE8E1] border border-[#BDC4D4] px-3.5 py-2.5 rounded-xl shrink-0 transition-all">
          <span className="w-2 h-2 rounded-full bg-[#52677D] animate-pulse"></span>
          <span>
            <strong className="text-[#0F1A2B] transition-all">{totalMatches}</strong> {totalMatches === 1 ? 'scheme' : 'schemes'} found
          </span>
        </div>
      </div>

      {/* Desktop Filter Panel */}
      <div className="hidden sm:block pt-1">
        {filterControls}
      </div>

      {/* Active Filter Chips / Badges */}
      {hasAnyFilter && (
        <div className="flex flex-wrap items-center gap-1.5 pt-2 border-t border-[#BDC4D4] text-xs animate-fade-in">
          <span className="text-[#52677D] font-medium mr-1">Active filters:</span>

          {filters.search.trim() && (
            <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full bg-[#0F1A2B] text-[#D1CFC9] font-medium border border-[#0F1A2B] animate-scale-in">
              Keyword: "{filters.search.trim()}"
              <button onClick={() => setFilters((p) => ({ ...p, search: '' }))} className="hover:text-white active:scale-90 transition-transform">
                <X className="w-3 h-3" />
              </button>
            </span>
          )}

          {filters.level !== 'all' && (
            <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full bg-[#0F1A2B] text-[#D1CFC9] font-medium border border-[#0F1A2B] animate-scale-in">
              Level: {filters.level}
              <button onClick={() => setFilters((p) => ({ ...p, level: 'all' }))} className="hover:text-white active:scale-90 transition-transform">
                <X className="w-3 h-3" />
              </button>
            </span>
          )}

          {filters.state && (
            <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full bg-[#0F1A2B] text-[#D1CFC9] font-medium border border-[#0F1A2B] animate-scale-in">
              State: {filters.state}
              <button onClick={() => setFilters((p) => ({ ...p, state: '' }))} className="hover:text-white active:scale-90 transition-transform">
                <X className="w-3 h-3" />
              </button>
            </span>
          )}

          {filters.targetGroup !== 'all' && (
            <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full bg-[#0F1A2B] text-[#D1CFC9] font-medium border border-[#0F1A2B] animate-scale-in">
              Target: {filters.targetGroup}
              <button onClick={() => setFilters((p) => ({ ...p, targetGroup: 'all' }))} className="hover:text-white active:scale-90 transition-transform">
                <X className="w-3 h-3" />
              </button>
            </span>
          )}

          {filters.gender !== 'all' && (
            <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full bg-[#0F1A2B] text-[#D1CFC9] font-medium border border-[#0F1A2B] animate-scale-in">
              Gender: {filters.gender}
              <button onClick={() => setFilters((p) => ({ ...p, gender: 'all' }))} className="hover:text-white active:scale-90 transition-transform">
                <X className="w-3 h-3" />
              </button>
            </span>
          )}

          {filters.ageGroup !== 'all' && (
            <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full bg-[#0F1A2B] text-[#D1CFC9] font-medium border border-[#0F1A2B] animate-scale-in">
              Age: {filters.ageGroup}
              <button onClick={() => setFilters((p) => ({ ...p, ageGroup: 'all' }))} className="hover:text-white active:scale-90 transition-transform">
                <X className="w-3 h-3" />
              </button>
            </span>
          )}

          {filters.casteCategory !== 'all' && (
            <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full bg-[#0F1A2B] text-[#D1CFC9] font-medium border border-[#0F1A2B] animate-scale-in">
              Category: {filters.casteCategory}
              <button onClick={() => setFilters((p) => ({ ...p, casteCategory: 'all' }))} className="hover:text-white active:scale-90 transition-transform">
                <X className="w-3 h-3" />
              </button>
            </span>
          )}

          {filters.incomeRange !== 'all' && (
            <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full bg-[#0F1A2B] text-[#D1CFC9] font-medium border border-[#0F1A2B] animate-scale-in">
              Income: {filters.incomeRange}
              <button onClick={() => setFilters((p) => ({ ...p, incomeRange: 'all' }))} className="hover:text-white active:scale-90 transition-transform">
                <X className="w-3 h-3" />
              </button>
            </span>
          )}

          <button
            onClick={onClearAll}
            className="text-xs font-semibold text-red-600 hover:text-red-800 ml-auto cursor-pointer active:scale-95 transition-all"
          >
            Clear all
          </button>
        </div>
      )}

      {/* Mobile Drawer */}
      {mobileDrawerOpen && (
        <div className="fixed inset-0 z-50 flex sm:hidden">
          {/* Backdrop */}
          <div
            className="fixed inset-0 bg-[#0F1A2B]/60 backdrop-blur-xs animate-fade-in transition-opacity"
            onClick={() => setMobileDrawerOpen(false)}
          ></div>

          {/* Drawer Panel */}
          <div className="relative ml-auto w-full max-w-xs bg-[#F5F3EE] h-full shadow-2xl p-6 overflow-y-auto flex flex-col justify-between animate-fade-up border-l border-[#BDC4D4]">
            <div className="space-y-5">
              <div className="flex items-center justify-between pb-3 border-b border-[#BDC4D4]">
                <div className="flex items-center gap-2 font-bold text-[#0F1A2B] text-sm">
                  <Filter className="w-4 h-4 text-[#52677D]" />
                  <span>Filter Schemes</span>
                </div>
                <button
                  onClick={() => setMobileDrawerOpen(false)}
                  className="p-1 rounded-lg text-[#52677D] hover:text-[#0F1A2B] active:scale-90 transition-transform"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              {/* Mobile Filter Controls */}
              {filterControls}
            </div>

            <div className="pt-6 border-t border-[#BDC4D4] space-y-2 mt-6">
              <button
                onClick={() => setMobileDrawerOpen(false)}
                className="w-full py-3 bg-[#0F1A2B] hover:bg-[#1C2E4A] active:scale-[0.98] text-[#D1CFC9] font-bold rounded-xl text-xs shadow-md transition-all cursor-pointer"
              >
                Apply Filters ({totalMatches} found)
              </button>

              {hasAnyFilter && (
                <button
                  onClick={() => {
                    onClearAll();
                    setMobileDrawerOpen(false);
                  }}
                  className="w-full py-2.5 bg-[#EBE8E1] hover:bg-[#D1CFC9] border border-[#BDC4D4] active:scale-[0.98] text-[#0F1A2B] font-semibold rounded-xl text-xs transition-all cursor-pointer"
                >
                  Clear All Filters
                </button>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
