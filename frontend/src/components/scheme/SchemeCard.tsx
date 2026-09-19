
import { useState, type FC } from 'react';
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
  staggerIndex?: number;
}

export const SchemeCard: FC<SchemeCardProps> = ({
  scheme,
  matchType,
  matchReasons,
  staggerIndex = 0,
}) => {
  const { isSaved, toggleSave } = useSavedSchemes();
  const saved = isSaved(scheme.slug);
  const isCentral = !scheme.state || scheme.level.toLowerCase().includes('central');
  const [popping, setPopping] = useState(false);

  const handleBookmarkClick = () => {
    setPopping(true);
    toggleSave(scheme.slug);
    setTimeout(() => setPopping(false), 300);
  };

  const delayMs = Math.min(staggerIndex * 40, 360);

  return (
    <div
      style={{ animationDelay: `${delayMs}ms` }}
      className="bg-[#F5F3EE] rounded-2xl border border-[#BDC4D4] hover:border-[#52677D] hover:shadow-lg hover:-translate-y-1 transition-all duration-200 ease-out flex flex-col justify-between overflow-hidden group animate-fade-up"
    >
      <div className="p-6">
        {/* Top Badges */}
        <div className="flex items-start justify-between gap-2 mb-3">
          <div className="flex flex-wrap gap-2 items-center">
            {matchType && <MatchBadge type={matchType} />}

            {isCentral ? (
              <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-xs font-semibold bg-[#EBE8E1] text-[#0F1A2B] border border-[#BDC4D4]">
                <Building2 className="w-3 h-3 text-[#0F1A2B]" /> Central Govt
              </span>
            ) : (
              <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-xs font-semibold bg-emerald-50 text-emerald-800 border border-emerald-200">
                <MapPin className="w-3 h-3" /> {scheme.state}
              </span>
            )}

            {scheme.short_title && (
              <span className="px-2 py-0.5 rounded-full text-xs font-mono bg-[#EBE8E1] text-[#0F1A2B] border border-[#BDC4D4]">
                {scheme.short_title}
              </span>
            )}
          </div>

          <button
            onClick={handleBookmarkClick}
            title={saved ? 'Remove bookmark' : 'Save scheme'}
            className={`p-2 rounded-xl transition-all duration-200 active:scale-90 cursor-pointer ${
              popping ? 'animate-pop' : ''
            } ${
              saved
                ? 'text-[#0F1A2B] bg-[#D1CFC9] border border-[#0F1A2B]/20'
                : 'text-[#52677D] hover:text-[#0F1A2B] hover:bg-[#EBE8E1]'
            }`}
          >
            <Bookmark className={`w-4 h-4 transition-transform duration-200 ${saved ? 'fill-[#0F1A2B] scale-105' : 'scale-100'}`} />
          </button>
        </div>

        {/* Scheme Title in Editorial Serif */}
        <Link to={`/scheme/${scheme.slug}`}>
          <h3 className="font-serif font-bold text-[#0F1A2B] text-base sm:text-lg mb-2 group-hover:text-[#1C2E4A] transition-colors line-clamp-2 leading-snug">
            {scheme.scheme_name}
          </h3>
        </Link>

        {/* Department */}
        {scheme.department && (
          <p className="text-xs text-[#52677D] mb-3 line-clamp-1 flex items-center gap-1.5 font-medium">
            <Building2 className="w-3.5 h-3.5 text-[#52677D] shrink-0" />
            {scheme.department}
          </p>
        )}

        {/* Why this matches you */}
        {matchReasons && matchReasons.length > 0 && (
          <div className="bg-[#EBE8E1] border border-[#BDC4D4] rounded-xl p-3 mb-3 text-xs text-[#0F1A2B]">
            <div className="font-semibold text-[#0F1A2B] mb-1 flex items-center gap-1">
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
        <p className="text-xs text-[#52677D] line-clamp-3 mb-4 leading-relaxed font-light">
          {formatText(scheme.brief_description || scheme.description)}
        </p>

        {/* Key benefits summary preview */}
        {scheme.benefits && (
          <div className="bg-[#EBE8E1]/70 rounded-xl p-3 mb-4 border border-[#BDC4D4] text-xs text-[#52677D]">
            <span className="font-semibold text-[#0F1A2B] block mb-1">Benefits Overview:</span>
            <span className="line-clamp-2 text-[#52677D] font-normal">
              {formatText(scheme.benefits).replace(/[-*#]/g, '').trim()}
            </span>
          </div>
        )}
      </div>

      {/* Card Action Footer */}
      <div className="px-6 py-3.5 bg-[#EBE8E1] border-t border-[#BDC4D4] flex items-center justify-between">
        <span className="text-xs text-[#52677D] font-light">
          Target: <strong className="text-[#0F1A2B] font-semibold">{scheme.beneficiaries || 'Individuals'}</strong>
        </span>

        <Link
          to={`/scheme/${scheme.slug}`}
          className="inline-flex items-center gap-1 text-xs font-semibold text-[#0F1A2B] hover:text-[#1C2E4A] transition-colors"
        >
          View Scheme <ArrowRight className="w-3.5 h-3.5" />
        </Link>
      </div>
    </div>
  );
};
