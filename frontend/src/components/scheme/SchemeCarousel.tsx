import { useState, useEffect, useRef, useCallback } from 'react';
import { Link } from 'react-router-dom';
import type { Scheme } from '../../types';
import { useSavedSchemes } from '../../context/SavedSchemesContext';
import { formatText } from '../../utils/formatText';
import {
  ChevronLeft,
  ChevronRight,
  Sparkles,
  Building2,
  MapPin,
  ArrowRight,
  Bookmark,
  Award,
} from 'lucide-react';

interface SchemeCarouselProps {
  schemes: Scheme[];
}

/**
 * Extracts a concise, impactful benefit snippet from scheme benefit text
 */
function extractKeyBenefit(benefitsText?: string): string {
  if (!benefitsText || !benefitsText.trim()) {
    return 'Government financial assistance and welfare empowerment support.';
  }
  const lines = benefitsText
    .split('\n')
    .map((l) => l.replace(/^[-*#\d.\s]+/, '').trim())
    .filter((l) => l.length > 5);

  return lines[0] || benefitsText.slice(0, 100);
}

/**
 * Maps a category name to a representative sector emoji
 */
function getCategoryIcon(categories?: string): string {
  const cat = (categories || '').toLowerCase();
  if (cat.includes('health')) return '🏥';
  if (cat.includes('agri') || cat.includes('farm')) return '🌾';
  if (cat.includes('edu') || cat.includes('learn')) return '🎓';
  if (cat.includes('women') || cat.includes('child')) return '👩👧';
  if (cat.includes('house') || cat.includes('shelter')) return '🏠';
  if (cat.includes('skill') || cat.includes('employ')) return '💼';
  if (cat.includes('bank') || cat.includes('finance')) return '💰';
  if (cat.includes('business') || cat.includes('entrepreneur')) return '🚀';
  return '🏛️';
}

export const SchemeCarousel = ({ schemes }: SchemeCarouselProps) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [cardsPerView, setCardsPerView] = useState(3);
  const [isPaused, setIsPaused] = useState(false);
  const touchStartX = useRef<number | null>(null);
  const touchStartY = useRef<number | null>(null);
  const { isSaved, toggleSave } = useSavedSchemes();

  // Responsive cards per view calculation
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth < 640) {
        setCardsPerView(1);
      } else if (window.innerWidth < 1024) {
        setCardsPerView(2);
      } else {
        setCardsPerView(3);
      }
    };

    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const maxIndex = Math.max(0, schemes.length - cardsPerView);
  const safeIndex = Math.min(currentIndex, maxIndex);

  const handlePrev = useCallback(() => {
    setCurrentIndex((prev) => {
      const clamped = Math.min(prev, maxIndex);
      return clamped <= 0 ? maxIndex : clamped - 1;
    });
  }, [maxIndex]);

  const handleNext = useCallback(() => {
    setCurrentIndex((prev) => {
      const clamped = Math.min(prev, maxIndex);
      return clamped >= maxIndex ? 0 : clamped + 1;
    });
  }, [maxIndex]);

  // Autoplay functionality with smooth pause on hover
  useEffect(() => {
    if (isPaused || schemes.length <= cardsPerView) return;

    const timer = setInterval(() => {
      handleNext();
    }, 6000);

    return () => clearInterval(timer);
  }, [isPaused, handleNext, schemes.length, cardsPerView]);

  // Touch Swipe Handlers for Mobile & Tablet
  const handleTouchStart = (e: React.TouchEvent) => {
    touchStartX.current = e.touches[0].clientX;
    touchStartY.current = e.touches[0].clientY;
    setIsPaused(true);
  };

  const handleTouchEnd = (e: React.TouchEvent) => {
    if (touchStartX.current === null || touchStartY.current === null) return;

    const deltaX = e.changedTouches[0].clientX - touchStartX.current;
    const deltaY = e.changedTouches[0].clientY - touchStartY.current;

    // Only swipe if horizontal movement is greater than vertical movement and exceeds threshold
    if (Math.abs(deltaX) > Math.abs(deltaY) && Math.abs(deltaX) > 40) {
      if (deltaX < 0) {
        handleNext();
      } else {
        handlePrev();
      }
    }

    touchStartX.current = null;
    touchStartY.current = null;
    setIsPaused(false);
  };

  if (!schemes || schemes.length === 0) return null;

  const totalDots = maxIndex + 1;

  return (
    <section
      className="py-12 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto overflow-hidden select-none"
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
      aria-label="Flagship Government Schemes Carousel"
    >
      {/* Section Header with Title, Badge, and Desktop Arrows */}
      <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-8">
        <div>
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#EBE8E1] border border-[#BDC4D4] text-[#0F1A2B] text-xs font-semibold uppercase tracking-wider mb-2">
            <Sparkles className="w-3.5 h-3.5 text-[#0F1A2B]" />
            <span>Spotlight Schemes</span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-serif font-bold text-[#0F1A2B]">
            Flagship Welfare Initiatives
          </h2>
          <p className="text-xs sm:text-sm text-[#52677D] mt-1 font-light max-w-2xl">
            Prominent national and state programs offering direct subsidies, education grants, healthcare protection, and enterprise support.
          </p>
        </div>

        {/* Desktop Navigation Arrows */}
        <div className="hidden sm:flex items-center gap-2 shrink-0">
          <button
            onClick={handlePrev}
            className="w-10 h-10 rounded-full border border-[#BDC4D4] bg-[#EBE8E1] hover:bg-[#D1CFC9] hover:border-[#0F1A2B] text-[#0F1A2B] flex items-center justify-center transition-all duration-200 shadow-xs active:scale-95 cursor-pointer"
            aria-label="Previous schemes"
            title="Previous schemes"
          >
            <ChevronLeft className="w-5 h-5" />
          </button>
          <button
            onClick={handleNext}
            className="w-10 h-10 rounded-full border border-[#BDC4D4] bg-[#EBE8E1] hover:bg-[#D1CFC9] hover:border-[#0F1A2B] text-[#0F1A2B] flex items-center justify-center transition-all duration-200 shadow-xs active:scale-95 cursor-pointer"
            aria-label="Next schemes"
            title="Next schemes"
          >
            <ChevronRight className="w-5 h-5" />
          </button>
        </div>
      </div>

      {/* Carousel Track Container */}
      <div
        className="relative overflow-hidden -mx-3 touch-pan-y"
        onTouchStart={handleTouchStart}
        onTouchEnd={handleTouchEnd}
      >
        <div
          className="flex transition-transform duration-500 ease-out will-change-transform"
          style={{
            transform: `translateX(-${safeIndex * (100 / cardsPerView)}%)`,
          }}
        >
          {schemes.map((scheme) => {
            const isCentral = !scheme.state || scheme.level.toLowerCase().includes('central');
            const saved = isSaved(scheme.slug);
            const categoryLabel = scheme.categories ? scheme.categories.split(',')[0].trim() : 'General Welfare';
            const categoryIcon = getCategoryIcon(scheme.categories);
            const keyBenefit = extractKeyBenefit(scheme.benefits);

            return (
              <div
                key={scheme.slug}
                className="w-full sm:w-1/2 lg:w-1/3 px-3 shrink-0 box-border"
                style={{ flexBasis: `${100 / cardsPerView}%` }}
              >
                <div className="h-full bg-[#F5F3EE] rounded-3xl border border-[#BDC4D4] hover:border-[#52677D] shadow-sm hover:shadow-md transition-all duration-300 p-6 flex flex-col justify-between group relative overflow-hidden">
                  {/* Card Header: Category & Level Badges + Bookmark Button */}
                  <div>
                    <div className="flex items-start justify-between gap-2 mb-3.5">
                      <div className="flex flex-wrap items-center gap-1.5">
                        <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-semibold bg-[#EBE8E1] text-[#0F1A2B] border border-[#BDC4D4]">
                          <span>{categoryIcon}</span>
                          <span className="truncate max-w-[130px]">{categoryLabel}</span>
                        </span>

                        {isCentral ? (
                          <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[11px] font-medium bg-[#EBE8E1] text-[#0F1A2B] border border-[#BDC4D4]">
                            <Building2 className="w-3 h-3 text-[#0F1A2B]" /> Central
                          </span>
                        ) : (
                          <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[11px] font-medium bg-emerald-50 text-emerald-800 border border-emerald-200">
                            <MapPin className="w-3 h-3" /> {scheme.state}
                          </span>
                        )}
                      </div>

                      <button
                        onClick={() => toggleSave(scheme.slug)}
                        title={saved ? 'Remove bookmark' : 'Save scheme'}
                        className={`p-2 rounded-xl transition-all duration-150 active:scale-90 cursor-pointer ${
                          saved
                            ? 'text-[#0F1A2B] bg-[#D1CFC9] border border-[#0F1A2B]/20'
                            : 'text-[#52677D] hover:text-[#0F1A2B] hover:bg-[#EBE8E1]'
                        }`}
                        aria-label={saved ? 'Remove bookmark' : 'Save scheme'}
                      >
                        <Bookmark className={`w-4 h-4 transition-transform duration-150 ${saved ? 'fill-[#0F1A2B] scale-105' : 'scale-100'}`} />
                      </button>
                    </div>

                    {/* Scheme Title */}
                    <Link to={`/scheme/${scheme.slug}`} className="block group-hover:text-[#1C2E4A]">
                      <h3 className="font-serif font-bold text-lg sm:text-xl text-[#0F1A2B] leading-snug mb-2.5 line-clamp-2 group-hover:underline underline-offset-2 transition-colors">
                        {scheme.scheme_name}
                      </h3>
                    </Link>

                    {/* Short Description */}
                    <p className="text-xs sm:text-sm text-[#52677D] leading-relaxed line-clamp-2 font-light mb-4">
                      {formatText(scheme.brief_description || scheme.description)}
                    </p>
                  </div>

                  {/* Key Benefit Highlight Box & Action Button */}
                  <div className="space-y-4 pt-2">
                    <div className="bg-[#EBE8E1] border border-[#BDC4D4] rounded-2xl p-3.5 flex items-start gap-2.5">
                      <div className="w-7 h-7 rounded-lg bg-[#D1CFC9] border border-[#BDC4D4] flex items-center justify-center shrink-0 text-[#0F1A2B] shadow-2xs mt-0.5">
                        <Award className="w-4 h-4 text-[#0F1A2B]" />
                      </div>
                      <div className="min-w-0 flex-1">
                        <span className="block text-[11px] font-bold uppercase tracking-wider text-[#0F1A2B]">
                          Key Benefit
                        </span>
                        <p className="text-xs text-[#0F1A2B] font-medium line-clamp-2 leading-relaxed mt-0.5">
                          {keyBenefit}
                        </p>
                      </div>
                    </div>

                    {/* Action Link */}
                    <Link
                      to={`/scheme/${scheme.slug}`}
                      className="w-full py-2.5 px-4 rounded-xl bg-[#0F1A2B] hover:bg-[#1C2E4A] active:scale-[0.98] text-[#D1CFC9] font-semibold text-xs flex items-center justify-center gap-2 shadow-xs transition-all duration-150 group/btn"
                    >
                      <span>View Scheme Details</span>
                      <ArrowRight className="w-3.5 h-3.5 group-hover/btn:translate-x-1 transition-transform" />
                    </Link>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Pagination Indicators / Dots & Mobile Controls */}
      <div className="flex items-center justify-between mt-6 pt-2">
        {/* Mobile-only Arrow Controls */}
        <button
          onClick={handlePrev}
          className="flex sm:hidden items-center justify-center w-8 h-8 rounded-full border border-[#BDC4D4] bg-[#EBE8E1] text-[#0F1A2B] active:scale-90"
          aria-label="Previous slide"
        >
          <ChevronLeft className="w-4 h-4" />
        </button>

        {/* Dots */}
        <div className="flex items-center justify-center gap-1.5 mx-auto">
          {Array.from({ length: totalDots }).map((_, index) => {
            const isActive = index === safeIndex;
            return (
              <button
                key={index}
                onClick={() => setCurrentIndex(index)}
                className={`transition-all duration-300 rounded-full cursor-pointer ${
                  isActive
                    ? 'w-7 h-2 bg-[#0F1A2B]'
                    : 'w-2 h-2 bg-[#BDC4D4] hover:bg-[#52677D]'
                }`}
                aria-label={`Go to slide ${index + 1}`}
              />
            );
          })}
        </div>

        {/* Mobile-only Arrow Controls */}
        <button
          onClick={handleNext}
          className="flex sm:hidden items-center justify-center w-8 h-8 rounded-full border border-[#BDC4D4] bg-[#EBE8E1] text-[#0F1A2B] active:scale-90"
          aria-label="Next slide"
        >
          <ChevronRight className="w-4 h-4" />
        </button>
      </div>
    </section>
  );
};
