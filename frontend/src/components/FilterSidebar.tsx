
import { Filter, RotateCcw } from 'lucide-react';

interface FilterSidebarProps {
  selectedCategory: string;
  setSelectedCategory: (cat: string) => void;
  selectedState: string;
  setSelectedState: (state: string) => void;
  selectedBeneficiary: string;
  setSelectedBeneficiary: (ben: string) => void;
  categories: string[];
  states: string[];
  beneficiaries: string[];
  onReset: () => void;
}

export const FilterSidebar = ({
  selectedCategory,
  setSelectedCategory,
  selectedState,
  setSelectedState,
  selectedBeneficiary,
  setSelectedBeneficiary,
  categories,
  states,
  beneficiaries,
  onReset,
}: FilterSidebarProps) => {
  const hasActiveFilters = selectedCategory || selectedState || selectedBeneficiary;

  return (
    <div className="bg-white rounded-xl border border-slate-200 p-5 space-y-6">
      <div className="flex items-center justify-between pb-3 border-b border-slate-100">
        <div className="flex items-center gap-2 font-semibold text-slate-900 text-sm">
          <Filter className="w-4 h-4 text-blue-600" />
          <span>Filters</span>
        </div>
        {hasActiveFilters && (
          <button
            onClick={onReset}
            className="flex items-center gap-1 text-xs text-blue-600 hover:text-blue-800 font-medium"
          >
            <RotateCcw className="w-3 h-3" /> Reset
          </button>
        )}
      </div>

      {/* State Filter */}
      <div>
        <label className="block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-2">
          State / Central
        </label>
        <select
          value={selectedState}
          onChange={(e) => setSelectedState(e.target.value)}
          className="w-full p-2 text-xs border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 bg-slate-50"
        >
          <option value="">All (Central + All States)</option>
          <option value="Central">Central Schemes Only</option>
          {states.filter(Boolean).map((st) => (
            <option key={st} value={st}>
              {st}
            </option>
          ))}
        </select>
      </div>

      {/* Categories Filter */}
      <div>
        <label className="block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-2">
          Sectors & Categories
        </label>
        <div className="space-y-1 max-h-56 overflow-y-auto pr-1">
          <button
            onClick={() => setSelectedCategory('')}
            className={`w-full text-left px-2.5 py-1.5 rounded-lg text-xs font-medium transition-colors ${
              selectedCategory === ''
                ? 'bg-blue-50 text-blue-700 font-semibold'
                : 'text-slate-600 hover:bg-slate-50'
            }`}
          >
            All Categories
          </button>
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`w-full text-left px-2.5 py-1.5 rounded-lg text-xs font-medium transition-colors truncate ${
                selectedCategory === cat
                  ? 'bg-blue-50 text-blue-700 font-semibold'
                  : 'text-slate-600 hover:bg-slate-50'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      {/* Beneficiary Filter */}
      <div>
        <label className="block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-2">
          Target Beneficiaries
        </label>
        <select
          value={selectedBeneficiary}
          onChange={(e) => setSelectedBeneficiary(e.target.value)}
          className="w-full p-2 text-xs border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 bg-slate-50"
        >
          <option value="">All Beneficiaries</option>
          {beneficiaries.filter(Boolean).map((ben) => (
            <option key={ben} value={ben}>
              {ben}
            </option>
          ))}
        </select>
      </div>
    </div>
  );
};
