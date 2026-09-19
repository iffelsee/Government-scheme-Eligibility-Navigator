
import type { FC } from 'react';

interface ProgressBarProps {
  currentStep: number;
  totalSteps: number;
}

export const ProgressBar: FC<ProgressBarProps> = ({ currentStep, totalSteps }) => {
  const percentage = Math.round((currentStep / totalSteps) * 100);

  return (
    <div className="w-full space-y-2">
      <div className="flex items-center justify-between text-xs font-medium text-[#0F1A2B]">
        <span className="tracking-wide uppercase text-[11px] text-[#52677D] font-semibold">
          Question {currentStep} of {totalSteps}
        </span>
        <span className="font-mono text-[#0F1A2B] font-bold">{percentage}%</span>
      </div>
      <div className="w-full h-2 bg-[#BDC4D4]/40 border border-[#BDC4D4] rounded-full overflow-hidden relative">
        <div
          className="h-full bg-gradient-to-r from-[#0F1A2B] to-[#1C2E4A] transition-all duration-500 ease-out rounded-full relative"
          style={{ width: `${percentage}%` }}
        >
          <div className="absolute inset-0 bg-gradient-to-r from-transparent via-[#D1CFC9]/30 to-transparent"></div>
        </div>
      </div>
    </div>
  );
};
