
import type { FC } from 'react';

interface ProgressBarProps {
  currentStep: number;
  totalSteps: number;
}

export const ProgressBar: FC<ProgressBarProps> = ({ currentStep, totalSteps }) => {
  const percentage = Math.round((currentStep / totalSteps) * 100);

  return (
    <div className="w-full space-y-2">
      <div className="flex items-center justify-between text-xs font-medium text-[#374151]">
        <span className="tracking-wide uppercase text-[11px] text-[#A9A094]">
          Question {currentStep} of {totalSteps}
        </span>
        <span className="font-mono text-[#1E3A5F] font-bold">{percentage}%</span>
      </div>
      <div className="w-full h-2 bg-[#E5E7EB] rounded-full overflow-hidden">
        <div
          className="h-full bg-[#1E3A5F] transition-all duration-300 rounded-full"
          style={{ width: `${percentage}%` }}
        ></div>
      </div>
    </div>
  );
};
