
import type { FC } from 'react';
import { Link } from 'react-router-dom';
import type { Scheme, MatchType } from '../../types';
import { MatchBadge } from '../common/Badge';
import { Bookmark, Building2, MapPin, ArrowRight, CheckCircle2 } from 'lucide-react';
import { useSavedSchemes } from '../../context/SavedSchemesContext';
import { formatText } from '../../utils/formatText';

interface SchemeCardProps {
  scheme: Scheme;
  matchType?: MatchType;
  matchReasons?: string[];
}

export const SchemeCard: FC<SchemeCardProps> = ({
  scheme,
  matchType,
  matchReasons,
}) => {
  const { isSaved, toggleSave } = useSavedSchemes();
  const saved = isSaved(scheme.slug);
  const isCentral = !scheme.state || scheme.level.toLowerCase().includes('central');

  return (
    <div className="bg-white rounded-2xl border border-[#E5E7EB] hover:border-[#1E3A5F] hover:shadow-md transition-all flex flex-col justify-between overflow-hidden group">
      <div className="p-6">
        {/* Top Badges */}
        <div className="flex items-start justify-between gap-2 mb-3">
          <div className="flex flex-wrap gap-2 items-center">
            {matchType && <MatchBadge type={matchType} />}

            {isCentral ? (
              <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-xs font-semibold bg-[#F7F5F2] text-[#1E3A5F] border border-[#CFC8BE]">
                <Building2 className="w-3 h-3 text-[#1E3A5F]" /> Central Govt
              </span>
            ) : (
              <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-xs font-semibold bg-emerald-50 text-emerald-800 border border-emerald-200">
                <MapPin className="w-3 h-3" /> {scheme.state}
              </span>
            )}

            {scheme.short_title && (
              <span className="px-2 py-0.5 rounded-full text-xs font-mono bg-[#F7F5F2] text-[#374151] border border-[#E5E7EB]">
                {scheme.short_title}
              </span>
            )}
          </div>

          <button
            onClick={() => toggleSave(scheme.slug)}
            title={saved ? 'Remove bookmark' : 'Save scheme'}
            className={`p-2 rounded-xl transition-colors cursor-pointer ${
              saved
                ? 'text-[#1E3A5F] bg-[#F7F5F2] border border-[#CFC8BE]'
                : 'text-[#A9A094] hover:text-[#374151] hover:bg-[#F7F5F2]'
            }`}
          >
            <Bookmark className={`w-4 h-4 ${saved ? 'fill-[#1E3A5F]' : ''}`} />
          </button>
        </div>

        {/* Scheme Title in Editorial Serif */}
        <Link to={`/scheme/${scheme.slug}`}>
          <h3 className="font-serif font-bold text-[#1E3A5F] text-base sm:text-lg mb-2 group-hover:text-[#142842] transition-colors line-clamp-2 leading-snug">
            {scheme.scheme_name}
          </h3>
        </Link>

        {/* Department */}
        {scheme.department && (
          <p className="text-xs text-[#374151]/70 mb-3 line-clamp-1 flex items-center gap-1.5 font-light">
            <Building2 className="w-3.5 h-3.5 text-[#A9A094] shrink-0" />
            {scheme.department}
          </p>
        )}

        {/* Why this matches you */}
        {matchReasons && matchReasons.length > 0 && (
          <div className="bg-[#F7F5F2] border border-[#CFC8BE] rounded-xl p-3 mb-3 text-xs text-[#374151]">
            <div className="font-semibold text-[#1E3A5F] mb-1 flex items-center gap-1">
              <CheckCircle2 className="w-3.5 h-3.5 text-[#059669]" />
              Why this matches you:
            </div>
            <ul className="space-y-0.5">
              {matchReasons.map((r, i) => (
                <li key={i} className="flex items-start gap-1">
                  <span className="text-[#059669]">•</span>
                  <span>{r}</span>
                </li>
              ))}
            </ul>
          </div>
        )}

        {/* Brief Description */}
        <p className="text-xs text-[#374151] line-clamp-3 mb-4 leading-relaxed font-light">
          {formatText(scheme.brief_description || scheme.description)}
        </p>

        {/* Key benefits summary preview */}
        {scheme.benefits && (
          <div className="bg-[#F9FAFB] rounded-xl p-3 mb-4 border border-[#E5E7EB] text-xs text-[#374151]">
            <span className="font-semibold text-[#1E3A5F] block mb-1">Benefits Overview:</span>
            <span className="line-clamp-2 text-[#374151]/80 font-light">
              {formatText(scheme.benefits).replace(/[-*#]/g, '').trim()}
            </span>
          </div>
        )}
      </div>

      {/* Card Action Footer */}
      <div className="px-6 py-3.5 bg-[#F7F5F2]/60 border-t border-[#E5E7EB] flex items-center justify-between">
        <span className="text-xs text-[#374151]/70 font-light">
          Target: <strong className="text-[#1E3A5F] font-medium">{scheme.beneficiaries || 'Individuals'}</strong>
        </span>

        <Link
          to={`/scheme/${scheme.slug}`}
          className="inline-flex items-center gap-1 text-xs font-semibold text-[#1E3A5F] hover:text-[#142842] transition-colors"
        >
          View Scheme <ArrowRight className="w-3.5 h-3.5" />
        </Link>
      </div>
    </div>
  );
};
