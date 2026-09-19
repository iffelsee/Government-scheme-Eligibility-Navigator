
import { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import type { CategoryInfo, Scheme } from '../types';
import { api } from '../services/api';
import { CategoryCard } from '../components/category/CategoryCard';
import { SchemeCard } from '../components/scheme/SchemeCard';
import { SchemeCarousel } from '../components/scheme/SchemeCarousel';
import { Button } from '../components/common/Button';
import { CountUp } from '../components/common/CountUp';
import { Search, ShieldCheck, CheckCircle2, ArrowRight, BookOpen, Users, Award, Lock, Sparkles } from 'lucide-react';

export const Home = () => {
  const navigate = useNavigate();
  const [categories, setCategories] = useState<CategoryInfo[]>([]);
  const [featuredSchemes, setFeaturedSchemes] = useState<Scheme[]>([]);
  const [carouselSchemes, setCarouselSchemes] = useState<Scheme[]>([]);
  const [searchQuery, setSearchQuery] = useState('');

  useEffect(() => {
    api.getCategories().then(setCategories);
    api.getFeaturedSchemes().then(setFeaturedSchemes);
    api.getCarouselSchemes().then(setCarouselSchemes);
  }, []);

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate(`/results?search=${encodeURIComponent(searchQuery.trim())}`);
    } else {
      navigate('/results');
    }
  };

  return (
    <div className="min-h-screen bg-[#E8E6E1] text-[#0F1A2B]">
      {/* Hero Section with Typography & Midnight Blue / Deep Navy Palette */}
      <section className="relative overflow-hidden bg-gradient-to-b from-[#0F1A2B] via-[#1C2E4A] to-[#0F1A2B] text-white py-18 sm:py-26 px-4 sm:px-6 lg:px-8 border-b border-[#52677D]/30">
        <div className="absolute inset-0 opacity-5 bg-[radial-gradient(#BDC4D4_1px,transparent_1px)] [background-size:24px_24px]"></div>

        <div className="max-w-4xl mx-auto text-center relative z-10">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/10 border border-[#BDC4D4]/30 text-[#D1CFC9] text-xs font-sans tracking-widest uppercase mb-6 animate-fade-up">
            <Sparkles className="w-3.5 h-3.5 text-[#BDC4D4]" />
            National Citizen Welfare Navigator
          </div>

          {/* High-Contrast Bold Serif "FORM" + Clean Sans "Meets Function" Typography */}
          <h1 className="text-3xl sm:text-5xl md:text-6xl font-serif font-extrabold tracking-tight mb-4 leading-tight text-[#D1CFC9] animate-fade-up stagger-1">
            Find Government Benefits
          </h1>
          <div className="text-2xl sm:text-3xl md:text-4xl font-sans font-light tracking-wide text-[#BDC4D4] mb-6 animate-fade-up stagger-2">
            That Matter To You
          </div>

          <p className="text-[#D1CFC9]/90 text-sm sm:text-base max-w-2xl mx-auto mb-10 leading-relaxed font-light animate-fade-up stagger-3">
            Discover schemes, scholarships, healthcare benefits, and agricultural subsidies. Answer a few questions and let our engine evaluate your eligibility.
          </p>

          {/* Primary CTA and Search Form */}
          <div className="max-w-2xl mx-auto mb-10 animate-fade-up stagger-4">
            <form onSubmit={handleSearchSubmit} className="flex flex-col sm:flex-row gap-3">
              <div className="relative flex-1 group">
                <Search className="w-5 h-5 text-[#BDC4D4]/60 group-focus-within:text-white transition-colors duration-200 absolute left-3.5 top-1/2 -translate-y-1/2" />
                <input
                  type="text"
                  placeholder="Search by keywords (e.g. stipend, scholarship, kisan, housing)..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-11 pr-4 py-3.5 bg-white/10 text-white placeholder-[#BDC4D4]/60 rounded-xl border border-white/20 focus:outline-none focus:ring-2 focus:ring-[#BDC4D4] focus:bg-white/20 focus:border-transparent text-sm font-sans transition-all duration-200"
                />
              </div>
              <button
                type="submit"
                className="px-6 py-3.5 bg-[#D1CFC9] hover:bg-[#BDC4D4] hover:-translate-y-0.5 active:translate-y-0 active:scale-[0.98] text-[#0F1A2B] font-semibold rounded-xl text-sm transition-all duration-150 shadow-md hover:shadow-lg flex items-center justify-center gap-2 shrink-0 cursor-pointer"
              >
                <Search className="w-4 h-4" /> Find Schemes
              </button>
            </form>

            <div className="mt-4 flex items-center justify-center gap-3">
              <span className="text-xs text-[#D1CFC9]/80">Or skip the search:</span>
              <button
                onClick={() => navigate('/questionnaire')}
                className="text-xs font-semibold text-white hover:text-[#D1CFC9] underline underline-offset-4 flex items-center gap-1 cursor-pointer transition-colors active:scale-95"
              >
                <ShieldCheck className="w-4 h-4 text-[#BDC4D4]" /> Start Questionnaire Wizard
              </button>
            </div>
          </div>

          {/* Trust Highlights */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 max-w-3xl mx-auto pt-8 border-t border-white/10 text-[#D1CFC9] text-xs sm:text-sm font-sans font-light animate-fade-up stagger-5">
            <div className="flex items-center justify-center gap-2">
              <Award className="w-4 h-4 text-[#BDC4D4]" />
              <span><strong><CountUp target={100} suffix="+" /></strong> Schemes</span>
            </div>
            <div className="flex items-center justify-center gap-2">
              <BookOpen className="w-4 h-4 text-[#BDC4D4]" />
              <span><strong><CountUp target={28} /> States</strong> & Central</span>
            </div>
            <div className="flex items-center justify-center gap-2">
              <Users className="w-4 h-4 text-[#BDC4D4]" />
              <span><strong>All Citizens</strong> Eligible</span>
            </div>
            <div className="flex items-center justify-center gap-2">
              <Lock className="w-4 h-4 text-[#BDC4D4]" />
              <span><strong><CountUp target={100} suffix="%" /> Free</strong> & Open</span>
            </div>
          </div>
        </div>
      </section>

      {/* Flagship Schemes Responsive Carousel / Slider */}
      {carouselSchemes.length > 0 && (
        <div className="border-b border-[#BDC4D4] bg-gradient-to-b from-[#E8E6E1] to-[#DFDCD5]">
          <SchemeCarousel schemes={carouselSchemes} />
        </div>
      )}

      {/* "What are you looking for?" Categories Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="text-center max-w-2xl mx-auto mb-12">
          <h2 className="font-serif text-2xl sm:text-3xl font-bold text-[#0F1A2B] mb-3">
            What are you looking for?
          </h2>
          <p className="text-sm text-[#52677D] font-light">
            Browse targeted schemes by sector, category, and government department.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {categories.map((category) => (
            <CategoryCard key={category.id} category={category} />
          ))}
        </div>

        <div className="text-center mt-10">
          <Link
            to="/categories"
            className="inline-flex items-center gap-1.5 text-sm font-semibold text-[#0F1A2B] hover:text-[#1C2E4A] border-b border-[#0F1A2B] pb-0.5"
          >
            View all categories <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </section>

      {/* "How It Works" 3-Step Section with Warm & Tactile Styling */}
      <section className="bg-[#DFDCD5] border-y border-[#BDC4D4] py-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-5xl mx-auto">
          <div className="text-center max-w-2xl mx-auto mb-12">
            <h2 className="font-serif text-2xl sm:text-3xl font-bold text-[#0F1A2B] mb-3">
              How It Works
            </h2>
            <p className="text-sm text-[#52677D] font-light">
              Three simple steps to discover welfare entitlements designed for you.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-[#F5F3EE] rounded-2xl p-7 border border-[#BDC4D4] relative shadow-xs">
              <div className="w-10 h-10 rounded-xl bg-[#0F1A2B] text-[#D1CFC9] font-serif font-bold flex items-center justify-center text-base mb-4 shadow-xs">
                1
              </div>
              <h3 className="font-serif font-bold text-[#0F1A2B] text-base mb-2">
                Tell us about yourself
              </h3>
              <p className="text-xs text-[#52677D] leading-relaxed font-light">
                Answer simple questions regarding your state, age, occupation, and socio-economic category in our quick wizard.
              </p>
            </div>

            <div className="bg-[#F5F3EE] rounded-2xl p-7 border border-[#BDC4D4] relative shadow-xs">
              <div className="w-10 h-10 rounded-xl bg-[#0F1A2B] text-[#D1CFC9] font-serif font-bold flex items-center justify-center text-base mb-4 shadow-xs">
                2
              </div>
              <h3 className="font-serif font-bold text-[#0F1A2B] text-base mb-2">
                We find matching schemes
              </h3>
              <p className="text-xs text-[#52677D] leading-relaxed font-light">
                Our eligibility engine cross-checks official criteria to present 🟢 Strong Matches and 🟡 Possible Matches.
              </p>
            </div>

            <div className="bg-[#F5F3EE] rounded-2xl p-7 border border-[#BDC4D4] relative shadow-xs">
              <div className="w-10 h-10 rounded-xl bg-[#0F1A2B] text-[#D1CFC9] font-serif font-bold flex items-center justify-center text-base mb-4 shadow-xs">
                3
              </div>
              <h3 className="font-serif font-bold text-[#0F1A2B] text-base mb-2">
                Explore and apply
              </h3>
              <p className="text-xs text-[#52677D] leading-relaxed font-light">
                Review required documents, benefits breakdown, step-by-step application instructions, and apply on official portals.
              </p>
            </div>
          </div>

          <div className="mt-12 text-center">
            <Button
              size="lg"
              variant="primary"
              onClick={() => navigate('/questionnaire')}
              className="shadow-sm"
            >
              <CheckCircle2 className="w-5 h-5" /> Start Eligibility Check Now
            </Button>
          </div>
        </div>
      </section>

      {/* Featured Schemes Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h2 className="font-serif text-2xl font-bold text-[#0F1A2B]">
              Popular Welfare Schemes
            </h2>
            <p className="text-xs sm:text-sm text-[#52677D] font-light">
              High-impact schemes active across Central and State portals.
            </p>
          </div>
          <Link
            to="/results"
            className="text-xs sm:text-sm font-semibold text-[#0F1A2B] hover:text-[#1C2E4A] flex items-center gap-1"
          >
            See all <ArrowRight className="w-4 h-4" />
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {featuredSchemes.map((scheme, index) => (
            <SchemeCard key={scheme.slug} scheme={scheme} staggerIndex={index} />
          ))}
        </div>
      </section>
    </div>
  );
};
