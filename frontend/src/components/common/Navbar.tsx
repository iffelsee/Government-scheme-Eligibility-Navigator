
import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Landmark, Bookmark, ShieldCheck, Compass, User, LogOut, Menu, X } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import { useSavedSchemes } from '../../context/SavedSchemesContext';

export const Navbar = () => {
  const navigate = useNavigate();
  const { user, isAuthenticated, logout } = useAuth();
  const { savedCount } = useSavedSchemes();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <header className="sticky top-0 z-40 bg-white/95 backdrop-blur-md border-b border-[#E5E7EB]">
      {/* Indian National Tricolor Subtle Accent Bar */}
      <div className="h-1 w-full flex">
        <div className="w-1/3 bg-[#FF9933]"></div>
        <div className="w-1/3 bg-white border-y border-[#E5E7EB]"></div>
        <div className="w-1/3 bg-[#138808]"></div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 gap-4">
          {/* Brand Logo with Serif "FORM Meets Function" Elegance */}
          <Link to="/" className="flex items-center gap-3 group">
            <div className="w-10 h-10 rounded-xl bg-[#1E3A5F] group-hover:bg-[#142842] transition-colors flex items-center justify-center text-white shadow-xs">
              <Landmark className="w-5 h-5 text-white" />
            </div>
            <div>
              <div className="font-serif text-lg leading-tight text-[#1E3A5F] font-bold tracking-tight flex items-center gap-2">
                Scheme Navigator
                <span className="text-[10px] uppercase font-sans tracking-widest font-semibold px-1.5 py-0.5 rounded bg-[#F7F5F2] text-[#1E3A5F] border border-[#CFC8BE]">
                  India
                </span>
              </div>
              <p className="text-[11px] text-[#A9A094] font-sans tracking-wide uppercase hidden sm:block">
                Government Scheme Eligibility Navigator
              </p>
            </div>
          </Link>

          {/* Desktop Nav Links */}
          <nav className="hidden md:flex items-center gap-1 sm:gap-2">
            <Link
              to="/"
              className="px-3 py-2 text-sm font-medium text-[#374151] hover:text-[#1E3A5F] hover:bg-[#F7F5F2] rounded-lg transition-colors"
            >
              Home
            </Link>

            <Link
              to="/categories"
              className="flex items-center gap-1.5 px-3 py-2 text-sm font-medium text-[#374151] hover:text-[#1E3A5F] hover:bg-[#F7F5F2] rounded-lg transition-colors"
            >
              <Compass className="w-4 h-4" />
              Categories
            </Link>

            <Link
              to="/results"
              className="px-3 py-2 text-sm font-medium text-[#374151] hover:text-[#1E3A5F] hover:bg-[#F7F5F2] rounded-lg transition-colors"
            >
              All Schemes
            </Link>

            <Link
              to="/dashboard"
              className="flex items-center gap-1.5 px-3 py-2 text-sm font-medium text-[#374151] hover:text-[#1E3A5F] hover:bg-[#F7F5F2] rounded-lg transition-colors relative"
            >
              <Bookmark className="w-4 h-4" />
              Saved
              {savedCount > 0 && (
                <span className="px-1.5 py-0.5 text-[10px] font-bold rounded-full bg-[#1E3A5F] text-white">
                  {savedCount}
                </span>
              )}
            </Link>
          </nav>

          {/* Actions & Auth */}
          <div className="hidden md:flex items-center gap-3">
            <button
              onClick={() => navigate('/questionnaire')}
              className="flex items-center gap-2 px-4 py-2 bg-[#1E3A5F] hover:bg-[#142842] text-white text-xs sm:text-sm font-medium rounded-xl shadow-xs transition-all cursor-pointer tracking-wide"
            >
              <ShieldCheck className="w-4 h-4" />
              <span>Check Eligibility</span>
            </button>

            {isAuthenticated ? (
              <div className="flex items-center gap-2 border-l border-[#E5E7EB] pl-3">
                <Link
                  to="/dashboard"
                  className="flex items-center gap-2 p-1.5 hover:bg-[#F7F5F2] rounded-lg text-xs font-semibold text-[#374151]"
                >
                  <div className="w-7 h-7 rounded-full bg-[#F7F5F2] text-[#1E3A5F] border border-[#CFC8BE] flex items-center justify-center font-bold">
                    {user?.name?.[0] || 'U'}
                  </div>
                  <span className="max-w-[100px] truncate">{user?.name}</span>
                </Link>
                <button
                  onClick={logout}
                  title="Log out"
                  className="p-1.5 text-[#A9A094] hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors cursor-pointer"
                >
                  <LogOut className="w-4 h-4" />
                </button>
              </div>
            ) : (
              <Link
                to="/login"
                className="flex items-center gap-1.5 px-3.5 py-2 text-xs sm:text-sm font-medium text-[#374151] hover:text-[#1E3A5F] hover:bg-[#F7F5F2] rounded-xl transition-colors border border-transparent hover:border-[#E5E7EB]"
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
              className="px-2.5 py-1.5 bg-[#1E3A5F] text-white text-xs font-medium rounded-lg"
            >
              Eligibility
            </button>
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 rounded-lg text-[#374151] hover:bg-[#F7F5F2]"
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="md:hidden border-t border-[#E5E7EB] bg-white px-4 pt-3 pb-6 space-y-3">
          <Link
            to="/"
            onClick={() => setMobileMenuOpen(false)}
            className="block py-2 text-sm font-medium text-[#374151]"
          >
            Home
          </Link>
          <Link
            to="/categories"
            onClick={() => setMobileMenuOpen(false)}
            className="block py-2 text-sm font-medium text-[#374151]"
          >
            Browse Categories
          </Link>
          <Link
            to="/results"
            onClick={() => setMobileMenuOpen(false)}
            className="block py-2 text-sm font-medium text-[#374151]"
          >
            All Schemes
          </Link>
          <Link
            to="/dashboard"
            onClick={() => setMobileMenuOpen(false)}
            className="flex items-center justify-between py-2 text-sm font-medium text-[#374151]"
          >
            <span>Saved Schemes</span>
            {savedCount > 0 && (
              <span className="px-2 py-0.5 text-xs font-bold rounded-full bg-[#1E3A5F] text-white">
                {savedCount}
              </span>
            )}
          </Link>

          <div className="pt-2 border-t border-[#E5E7EB]">
            {isAuthenticated ? (
              <div className="flex items-center justify-between py-2">
                <span className="text-sm font-semibold text-[#1E3A5F]">{user?.name}</span>
                <button onClick={logout} className="text-xs text-red-600 font-medium">
                  Log Out
                </button>
              </div>
            ) : (
              <Link
                to="/login"
                onClick={() => setMobileMenuOpen(false)}
                className="block text-center py-2 px-4 bg-[#F7F5F2] text-[#1E3A5F] border border-[#CFC8BE] rounded-lg text-sm font-medium"
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
