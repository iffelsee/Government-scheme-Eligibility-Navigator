
import { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import type { Scheme } from '../types';
import { api } from '../services/api';
import { useAuth } from '../context/AuthContext';
import { useSavedSchemes } from '../context/SavedSchemesContext';
import { SchemeCard } from '../components/scheme/SchemeCard';
import { Button } from '../components/common/Button';
import { Bookmark, ShieldCheck, Compass } from 'lucide-react';

export const Dashboard = () => {
  const navigate = useNavigate();
  const { user, isAuthenticated } = useAuth();
  const { savedSlugs } = useSavedSchemes();

  const [savedSchemes, setSavedSchemes] = useState<Scheme[]>([]);
  const [recommendations, setRecommendations] = useState<Scheme[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);
    api.getAllSchemes().then((all) => {
      const saved = all.filter((s) => savedSlugs.includes(s.slug));
      setSavedSchemes(saved);
      // Recommend 3 schemes
      setRecommendations(all.slice(10, 13));
      setLoading(false);
    });
  }, [savedSlugs]);

  return (
    <div className="min-h-screen bg-[#E8E6E1] py-10 px-4 sm:px-6 lg:px-8 text-[#0F1A2B]">
      <div className="max-w-7xl mx-auto space-y-8">
        {/* Profile Card Header */}
        <div className="bg-[#F5F3EE] rounded-3xl border border-[#BDC4D4] p-8 shadow-xs flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
          <div className="flex items-center gap-4">
            <div className="w-16 h-16 rounded-2xl bg-[#0F1A2B] text-[#D1CFC9] border border-[#BDC4D4]/30 font-bold text-2xl flex items-center justify-center shadow-md">
              {user?.name?.[0] || 'C'}
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h1 className="text-2xl font-serif font-bold text-[#0F1A2B]">
                  {isAuthenticated ? user?.name : 'Citizen Profile'}
                </h1>
                <span className="px-2.5 py-0.5 rounded-full text-xs font-bold bg-emerald-500/10 text-emerald-800 border border-emerald-500/20">
                  Active
                </span>
              </div>
              <p className="text-xs text-[#52677D] mt-1 font-light">
                {isAuthenticated ? user?.email : 'Anonymous citizen session'} • State of residence:{' '}
                <strong className="text-[#0F1A2B]">{user?.state || 'Andhra Pradesh / All India'}</strong>
              </p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <Button variant="primary" onClick={() => navigate('/questionnaire')}>
              <ShieldCheck className="w-4 h-4" /> Retake Eligibility Assessment
            </Button>
          </div>
        </div>

        {/* Saved Schemes Section */}
        <div>
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-lg bg-[#EBE8E1] text-[#0F1A2B] border border-[#BDC4D4] flex items-center justify-center">
                <Bookmark className="w-4 h-4 fill-[#0F1A2B]" />
              </div>
              <h2 className="text-xl font-serif font-bold text-[#0F1A2B]">
                Bookmarked Schemes ({savedSchemes.length})
              </h2>
            </div>
            <Link to="/results" className="text-xs font-semibold text-[#0F1A2B] hover:text-[#52677D] hover:underline">
              Browse More Schemes →
            </Link>
          </div>

          {loading ? (
            <div className="p-12 text-center text-sm text-[#52677D]">Loading saved items...</div>
          ) : savedSchemes.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {savedSchemes.map((scheme) => (
                <SchemeCard key={scheme.slug} scheme={scheme} />
              ))}
            </div>
          ) : (
            <div className="bg-[#F5F3EE] rounded-3xl border border-[#BDC4D4] p-10 text-center">
              <Bookmark className="w-10 h-10 text-[#0F1A2B]/30 mx-auto mb-2" />
              <h3 className="font-serif font-bold text-[#0F1A2B] text-sm mb-1">No Schemes Saved Yet</h3>
              <p className="text-xs text-[#52677D] mb-4 font-light">
                Bookmark schemes while exploring to easily review and compare them here.
              </p>
              <Button size="sm" variant="outline" onClick={() => navigate('/results')}>
                Explore Schemes
              </Button>
            </div>
          )}
        </div>

        {/* Recommendations for You */}
        <div>
          <div className="flex items-center gap-2 mb-4">
            <div className="w-8 h-8 rounded-lg bg-[#EBE8E1] text-[#0F1A2B] border border-[#BDC4D4] flex items-center justify-center">
              <Compass className="w-4 h-4" />
            </div>
            <h2 className="text-xl font-serif font-bold text-[#0F1A2B]">Recommended For You</h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {recommendations.map((scheme) => (
              <SchemeCard key={scheme.slug} scheme={scheme} />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
