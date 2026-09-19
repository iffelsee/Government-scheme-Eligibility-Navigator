
import type { ButtonHTMLAttributes, FC } from 'react';

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'outline' | 'ghost' | 'success';
  size?: 'sm' | 'md' | 'lg';
  isLoading?: boolean;
}

export const Button: FC<ButtonProps> = ({
  children,
  variant = 'primary',
  size = 'md',
  isLoading = false,
  className = '',
  disabled,
  ...props
}) => {
  const baseStyles = 'inline-flex items-center justify-center font-medium rounded-xl transition-all duration-150 ease-out focus:outline-none focus:ring-2 focus:ring-offset-1 active:scale-[0.98] disabled:opacity-50 disabled:cursor-not-allowed disabled:active:scale-100 cursor-pointer tracking-wide';

  const sizeStyles = {
    sm: 'px-3 py-1.5 text-xs gap-1.5',
    md: 'px-4 py-2.5 text-sm gap-2',
    lg: 'px-6 py-3.5 text-base gap-2.5 shadow-sm',
  }[size];

  const variantStyles = {
    primary: 'bg-[#0F1A2B] hover:bg-[#1C2E4A] text-[#D1CFC9] focus:ring-[#52677D] shadow-sm hover:shadow hover:-translate-y-0.5 active:translate-y-0',
    secondary: 'bg-[#52677D] hover:bg-[#435567] text-[#D1CFC9] border border-[#52677D] focus:ring-[#BDC4D4] hover:-translate-y-0.5 active:translate-y-0',
    outline: 'border border-[#52677D] hover:bg-[#BDC4D4]/30 text-[#0F1A2B] focus:ring-[#52677D] hover:-translate-y-0.5 active:translate-y-0',
    ghost: 'hover:bg-[#BDC4D4]/30 text-[#0F1A2B] focus:ring-[#BDC4D4]',
    success: 'bg-[#0F1A2B] hover:bg-[#1C2E4A] text-[#D1CFC9] border border-[#BDC4D4]/40 focus:ring-[#52677D] shadow-sm hover:shadow hover:-translate-y-0.5 active:translate-y-0',
  }[variant];

  return (
    <button
      className={`${baseStyles} ${sizeStyles} ${variantStyles} ${className}`}
      disabled={disabled || isLoading}
      {...props}
    >
      {isLoading ? (
        <>
          <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-current" fill="none" viewBox="0 0 24 24">
            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
          </svg>
          Loading...
        </>
      ) : (
        children
      )}
    </button>
  );
};
