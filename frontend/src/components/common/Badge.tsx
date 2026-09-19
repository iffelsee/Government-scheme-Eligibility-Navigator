
import type { FC } from 'react';
import type { MatchType } from '../../types';

interface MatchBadgeProps {
  type: MatchType;
}

export const MatchBadge: FC<MatchBadgeProps> = ({ type }) => {
  if (type === 'STRONG_MATCH') {
    return (
      <span className="inline-flex items-center gap-1.5 px-3 py-0.5 rounded-full text-xs font-semibold bg-emerald-50 text-emerald-800 border border-emerald-200">
        <span className="w-1.5 h-1.5 rounded-full bg-emerald-600 animate-pulse"></span>
        🟢 Strong Match
      </span>
    );
  }

  return (
    <span className="inline-flex items-center gap-1.5 px-3 py-0.5 rounded-full text-xs font-semibold bg-amber-50 text-amber-800 border border-amber-200">
      <span className="w-1.5 h-1.5 rounded-full bg-amber-600"></span>
      🟡 Possible Match
    </span>
  );
};

export const SectorBadge: FC<{ label: string }> = ({ label }) => {
  return (
    <span className="inline-flex items-center px-2.5 py-0.5 rounded-md text-xs font-medium bg-[#EBE8E1] text-[#0F1A2B] border border-[#BDC4D4]">
      {label}
    </span>
  );
};
