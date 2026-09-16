
import type { Scheme } from '../types/scheme';
import { Bookmark, Building2, MapPin, ArrowRight, CheckCircle, Tag } from 'lucide-react';

interface SchemeCardProps {
  scheme: Scheme;
  isSaved: boolean;
  onToggleSave: (slug: string) => void;
  onViewDetails: (scheme: Scheme) => void;
}

export const SchemeCard = ({
  scheme,
  isSaved,
  onToggleSave,
  onViewDetails,
}: SchemeCardProps) => {
  const isCentral = !scheme.state || scheme.level.toLowerCase().includes('central');

  return (
    <div className="bg-white rounded-xl border border-slate-200 hover:border-blue-400 hover:shadow-md transition-all flex flex-col justify-between overflow-hidden group">
      <div className="p-5">
        {/* Header Tags */}
        <div className="flex items-start justify-between gap-3 mb-3">
          <div className="flex flex-wrap gap-1.5">
            {isCentral ? (
              <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-xs font-semibold bg-indigo-50 text-indigo-700 border border-indigo-200">
                <Building2 className="w-3 h-3" /> Central Govt
              </span>
            ) : (
              <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-xs font-semibold bg-emerald-50 text-emerald-700 border border-emerald-200">
                <MapPin className="w-3 h-3" /> {scheme.state}
              </span>
            )}

            {scheme.short_title && (
              <span className="px-2 py-0.5 rounded-full text-xs font-mono bg-slate-100 text-slate-600">
                {scheme.short_title}
              </span>
            )}
          </div>

          <button
            onClick={() => onToggleSave(scheme.slug)}
            title={isSaved ? 'Remove from saved' : 'Save scheme'}
            className={`p-1.5 rounded-lg transition-colors ${
              isSaved
                ? 'text-blue-600 bg-blue-50 hover:bg-blue-100'
                : 'text-slate-400 hover:text-slate-600 hover:bg-slate-100'
            }`}
          >
            <Bookmark className={`w-4 h-4 ${isSaved ? 'fill-blue-600' : ''}`} />
          </button>
        </div>

        {/* Title */}
        <h3 className="font-semibold text-slate-900 text-base mb-2 group-hover:text-blue-600 transition-colors line-clamp-2">
          {scheme.scheme_name}
        </h3>

        {/* Department */}
        {scheme.department && (
          <p className="text-xs text-slate-500 mb-3 line-clamp-1 flex items-center gap-1">
            <Building2 className="w-3.5 h-3.5 shrink-0 text-slate-400" />
            {scheme.department}
          </p>
        )}

        {/* Brief Description */}
        <p className="text-xs text-slate-600 line-clamp-3 mb-4 leading-relaxed">
          {scheme.brief_description || scheme.description}
        </p>

        {/* Key Benefits Preview */}
        {scheme.benefits && (
          <div className="bg-slate-50 rounded-lg p-2.5 mb-4 border border-slate-100">
            <div className="text-[11px] font-semibold text-slate-700 mb-1 flex items-center gap-1">
              <CheckCircle className="w-3 h-3 text-emerald-600" />
              Key Benefits
            </div>
            <p className="text-xs text-slate-600 line-clamp-2">
              {scheme.benefits.replace(/[-*#]/g, '').trim()}
            </p>
          </div>
        )}

        {/* Categories / Tags */}
        <div className="flex flex-wrap gap-1">
          {scheme.categories &&
            scheme.categories.split(',').slice(0, 2).map((cat, i) => (
              <span
                key={i}
                className="inline-flex items-center gap-1 px-2 py-0.5 text-[11px] rounded bg-slate-100 text-slate-600 font-medium"
              >
                <Tag className="w-2.5 h-2.5 text-slate-400" />
                {cat.trim()}
              </span>
            ))}
        </div>
      </div>

      {/* Footer */}
      <div className="px-5 py-3 bg-slate-50 border-t border-slate-100 flex items-center justify-between">
        <span className="text-xs font-medium text-slate-500">
          Beneficiaries: <span className="text-slate-700">{scheme.beneficiaries || 'Individual'}</span>
        </span>
        <button
          onClick={() => onViewDetails(scheme)}
          className="inline-flex items-center gap-1 text-xs font-semibold text-blue-600 hover:text-blue-700 transition-colors"
        >
          Details & Apply <ArrowRight className="w-3.5 h-3.5" />
        </button>
      </div>
    </div>
  );
};
