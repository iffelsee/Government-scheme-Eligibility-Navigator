
import { Link } from 'react-router-dom';
import { Landmark, ShieldAlert, Sparkles, ExternalLink } from 'lucide-react';

export const Footer = () => {
  return (
    <footer className="bg-[#142842] text-[#CFC8BE] text-xs border-t border-[#1E3A5F] mt-auto">
      {/* Official Disclaimer Banner */}
      <div className="bg-[#0e1c2e] border-b border-[#1E3A5F] py-3 px-4">
        <div className="max-w-7xl mx-auto flex items-center justify-center gap-2 text-center text-[#CFC8BE] text-xs font-sans tracking-wide">
          <ShieldAlert className="w-4 h-4 shrink-0 text-[#CFC8BE]" />
          <span>
            Independent citizen eligibility guide. Always verify terms and apply through official portals (e.g. myscheme.gov.in, india.gov.in).
          </span>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Brand Column */}
          <div className="space-y-3">
            <div className="flex items-center gap-2 text-white">
              <div className="w-8 h-8 rounded-lg bg-[#1E3A5F] border border-[#CFC8BE]/30 flex items-center justify-center text-white font-bold">
                <Landmark className="w-4 h-4" />
              </div>
              <span className="font-serif font-bold text-base tracking-tight text-white">Scheme Navigator</span>
            </div>
            <p className="text-[#CFC8BE]/80 text-xs leading-relaxed">
              Empowering citizens across all 28 States and 8 UTs to evaluate eligibility and discover government welfare programs.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-sans font-semibold text-white text-xs uppercase tracking-widest mb-3">
              Explore
            </h4>
            <ul className="space-y-2">
              <li>
                <Link to="/questionnaire" className="hover:text-white transition-colors">
                  Eligibility Questionnaire
                </Link>
              </li>
              <li>
                <Link to="/categories" className="hover:text-white transition-colors">
                  Scheme Categories
                </Link>
              </li>
              <li>
                <Link to="/results" className="hover:text-white transition-colors">
                  All Central & State Schemes
                </Link>
              </li>
              <li>
                <Link to="/dashboard" className="hover:text-white transition-colors">
                  Saved Bookmarks
                </Link>
              </li>
            </ul>
          </div>

          {/* Key Sectors */}
          <div>
            <h4 className="font-sans font-semibold text-white text-xs uppercase tracking-widest mb-3">
              Key Sectors
            </h4>
            <ul className="space-y-2">
              <li>
                <Link to="/category/agriculture" className="hover:text-white transition-colors">
                  🌾 Agriculture & Farmers
                </Link>
              </li>
              <li>
                <Link to="/category/education" className="hover:text-white transition-colors">
                  🎓 Scholarships & Education
                </Link>
              </li>
              <li>
                <Link to="/category/health" className="hover:text-white transition-colors">
                  🏥 Healthcare & Insurance
                </Link>
              </li>
              <li>
                <Link to="/category/women-and-child" className="hover:text-white transition-colors">
                  👩👧 Women & Child Welfare
                </Link>
              </li>
            </ul>
          </div>

          {/* Official Portals */}
          <div>
            <h4 className="font-sans font-semibold text-white text-xs uppercase tracking-widest mb-3">
              Official Resources
            </h4>
            <ul className="space-y-2">
              <li>
                <a
                  href="https://www.myscheme.gov.in"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-1 hover:text-white transition-colors"
                >
                  myScheme National Portal <ExternalLink className="w-3 h-3" />
                </a>
              </li>
              <li>
                <a
                  href="https://www.india.gov.in"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-1 hover:text-white transition-colors"
                >
                  National Portal of India <ExternalLink className="w-3 h-3" />
                </a>
              </li>
              <li>
                <a
                  href="https://scholarships.gov.in"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-1 hover:text-white transition-colors"
                >
                  National Scholarship Portal <ExternalLink className="w-3 h-3" />
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="pt-8 mt-8 border-t border-[#1E3A5F] flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-[#A9A094] text-[11px]">
            © {new Date().getFullYear()} Government Scheme Eligibility Navigator. Designed with precision & clarity.
          </p>
          <div className="flex items-center gap-2 text-[#CFC8BE] text-[11px]">
            <Sparkles className="w-3.5 h-3.5 text-[#CFC8BE]" />
            <span>Digital India & Open Governance</span>
          </div>
        </div>
      </div>
    </footer>
  );
};
