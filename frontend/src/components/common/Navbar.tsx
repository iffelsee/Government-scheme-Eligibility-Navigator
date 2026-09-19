
import { useState } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { Landmark, Bookmark, ShieldCheck, Compass, User, LogOut, Menu, X } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import { useSavedSchemes } from '../../context/SavedSchemesContext';

export const Navbar = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { user, isAuthenticated, logout } = useAuth();
  const { savedCount } = useSavedSchemes();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const isActive = (path: string) => {
    if (path === '/') return location.pathname === '/';
    return location.pathname.startsWith(path);
  };

  return (
    <header className="sticky top-0 z-40 bg-gradient-to-r from-[#0F1A2B] via-[#1C2E4A] to-[#0F1A2B] border-b border-[#52677D]/30 text-[#D1CFC9] transition-colors shadow-md">
      {/* Indian National Tricolor Subtle Accent Bar */}
      <div className="h-1 w-full flex">
        <div className="w-1/3 bg-[#FF9933]"></div>
        <div className="w-1/3 bg-[#D1CFC9] border-y border-[#0F1A2B]"></div>
        <div className="w-1/3 bg-[#138808]"></div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 gap-4">
          {/* Brand Logo */}
          <Link to="/" className="flex items-center gap-3 group transition-transform active:scale-[0.99]">
            <div className="w-10 h-10 rounded-xl bg-[#D1CFC9] group-hover:bg-[#FAF9F6] transition-colors flex items-center justify-center text-[#0F1A2B] shadow-xs">
              <Landmark className="w-5 h-5 text-[#0F1A2B]" />
            </div>
            <div>
              <div className="font-serif text-lg leading-tight text-[#D1CFC9] font-bold tracking-tight flex items-center gap-2">
                Scheme Navigator
                <span className="text-[10px] uppercase font-sans tracking-widest font-semibold px-1.5 py-0.5 rounded bg-white/10 text-[#D1CFC9] border border-[#BDC4D4]/30">
                  India
                </span>
              </div>
              <p className="text-[11px] text-[#D1CFC9]/70 font-sans tracking-wide uppercase hidden sm:block">
                Government Scheme Eligibility Navigator
              </p>
            </div>
          </Link>

          {/* Desktop Nav Links */}
          <nav className="hidden md:flex items-center gap-1 sm:gap-2">
            <Link
              to="/"
              className={`px-3 py-2 text-sm font-medium rounded-lg transition-all duration-150 ${
                isActive('/') && location.pathname === '/'
                  ? 'text-[#0F1A2B] bg-[#D1CFC9] font-bold shadow-xs'
                  : 'text-[#D1CFC9]/80 hover:text-[#FAF9F6] hover:bg-white/10'
              }`}
            >
              Home
            </Link>

            <Link
              to="/categories"
              className={`flex items-center gap-1.5 px-3 py-2 text-sm font-medium rounded-lg transition-all duration-150 ${
                isActive('/categories') || isActive('/category')
                  ? 'text-[#0F1A2B] bg-[#D1CFC9] font-bold shadow-xs'
                  : 'text-[#D1CFC9]/80 hover:text-[#FAF9F6] hover:bg-white/10'
              }`}
            >
              <Compass className="w-4 h-4" />
              Categories
            </Link>

            <Link
              to="/results"
              className={`px-3 py-2 text-sm font-medium rounded-lg transition-all duration-150 ${
                isActive('/results')
                  ? 'text-[#0F1A2B] bg-[#D1CFC9] font-bold shadow-xs'
                  : 'text-[#D1CFC9]/80 hover:text-[#FAF9F6] hover:bg-white/10'
              }`}
            >
              All Schemes
            </Link>

            <Link
              to="/dashboard"
              className={`flex items-center gap-1.5 px-3 py-2 text-sm font-medium rounded-lg transition-all duration-150 relative ${
                isActive('/dashboard')
                  ? 'text-[#0F1A2B] bg-[#D1CFC9] font-bold shadow-xs'
                  : 'text-[#D1CFC9]/80 hover:text-[#FAF9F6] hover:bg-white/10'
              }`}
            >
              <Bookmark className="w-4 h-4" />
              Saved
              {savedCount > 0 && (
                <span className={`px-1.5 py-0.5 text-[10px] font-bold rounded-full animate-scale-in ${
                  isActive('/dashboard') ? 'bg-[#0F1A2B] text-[#D1CFC9]' : 'bg-[#D1CFC9] text-[#0F1A2B]'
                }`}>
                  {savedCount}
                </span>
              )}
            </Link>
          </nav>

          {/* Actions & Auth */}
          <div className="hidden md:flex items-center gap-3">
            <button
              onClick={() => navigate('/questionnaire')}
              className="flex items-center gap-2 px-4 py-2 bg-[#D1CFC9] hover:bg-[#BDC4D4] active:scale-[0.98] text-[#0F1A2B] text-xs sm:text-sm font-bold rounded-xl shadow-xs hover:shadow transition-all duration-150 cursor-pointer tracking-wide"
            >
              <ShieldCheck className="w-4 h-4 text-[#0F1A2B]" />
              <span>Check Eligibility</span>
            </button>

            {isAuthenticated ? (
              <div className="flex items-center gap-2 border-l border-white/15 pl-3">
                <Link
                  to="/dashboard"
                  className="flex items-center gap-2 p-1.5 hover:bg-white/10 rounded-lg text-xs font-semibold text-[#D1CFC9] transition-colors"
                >
                  <div className="w-7 h-7 rounded-full bg-[#D1CFC9] text-[#0F1A2B] flex items-center justify-center font-bold">
                    {user?.name?.[0] || 'U'}
                  </div>
                  <span className="max-w-[100px] truncate text-[#D1CFC9]">{user?.name}</span>
                </Link>
                <button
                  onClick={logout}
                  title="Log out"
                  className="p-1.5 text-[#D1CFC9]/70 hover:text-red-400 hover:bg-red-500/20 rounded-lg transition-colors cursor-pointer active:scale-95"
                >
                  <LogOut className="w-4 h-4" />
                </button>
              </div>
            ) : (
              <Link
                to="/login"
                className="flex items-center gap-1.5 px-3.5 py-2 text-xs sm:text-sm font-medium text-[#D1CFC9] hover:text-[#FAF9F6] hover:bg-white/10 rounded-xl transition-all duration-150 border border-[#BDC4D4]/30 active:scale-[0.98]"
              >
                <User className="w-4 h-4" />
                <span>Citizen Login</span>
              </Link>
            )}
          </div>

          {/* Mobile Menu Toggle */}
          <div className="flex md:hidden items-center gap-2">
            <button
              onClick={() => navigate('/questionnaire')}
              className="px-2.5 py-1.5 bg-[#D1CFC9] hover:bg-[#BDC4D4] active:scale-95 text-[#0F1A2B] text-xs font-bold rounded-lg transition-all"
            >
              Eligibility
            </button>
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 rounded-lg text-[#D1CFC9] hover:bg-white/10 transition-colors active:scale-95"
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="md:hidden border-t border-[#52677D]/30 bg-[#0F1A2B] px-4 pt-3 pb-6 space-y-3 animate-fade-in text-[#D1CFC9]">
          <Link
            to="/"
            onClick={() => setMobileMenuOpen(false)}
            className={`block py-2 text-sm font-medium transition-colors ${
              isActive('/') && location.pathname === '/' ? 'text-white font-bold' : 'text-[#D1CFC9]/80 hover:text-white'
            }`}
          >
            Home
          </Link>
          <Link
            to="/categories"
            onClick={() => setMobileMenuOpen(false)}
            className={`block py-2 text-sm font-medium transition-colors ${
              isActive('/categories') || isActive('/category') ? 'text-white font-bold' : 'text-[#D1CFC9]/80 hover:text-white'
            }`}
          >
            Browse Categories
          </Link>
          <Link
            to="/results"
            onClick={() => setMobileMenuOpen(false)}
            className={`block py-2 text-sm font-medium transition-colors ${
              isActive('/results') ? 'text-white font-bold' : 'text-[#D1CFC9]/80 hover:text-white'
            }`}
          >
            All Schemes
          </Link>
          <Link
            to="/dashboard"
            onClick={() => setMobileMenuOpen(false)}
            className="flex items-center justify-between py-2 text-sm font-medium text-[#D1CFC9]/80 hover:text-white transition-colors"
          >
            <span>Saved Schemes</span>
            {savedCount > 0 && (
              <span className="px-2 py-0.5 text-xs font-bold rounded-full bg-[#D1CFC9] text-[#0F1A2B]">
                {savedCount}
              </span>
            )}
          </Link>

          <div className="pt-2 border-t border-white/10">
            {isAuthenticated ? (
              <div className="flex items-center justify-between py-2">
                <span className="text-sm font-semibold text-[#D1CFC9]">{user?.name}</span>
                <button onClick={logout} className="text-xs text-red-400 font-medium hover:underline">
                  Log Out
                </button>
              </div>
            ) : (
              <Link
                to="/login"
                onClick={() => setMobileMenuOpen(false)}
                className="block text-center py-2 px-4 bg-[#D1CFC9] text-[#0F1A2B] hover:bg-[#BDC4D4] active:scale-[0.98] rounded-lg text-sm font-bold transition-all shadow-xs"
              >
                Citizen Login
              </Link>
            )}
          </div>
        </div>
      )}
    </header>
  );
};
