
import { useState, useEffect } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import type { Scheme, CategoryInfo } from '../types';
import { api } from '../services/api';
import { SchemeCard } from '../components/scheme/SchemeCard';
import { Button } from '../components/common/Button';
import { ArrowLeft, ShieldCheck } from 'lucide-react';

export const CategoryDetail = () => {
  const { slug } = useParams<{ slug: string }>();
  const navigate = useNavigate();
  const [category, setCategory] = useState<CategoryInfo | null>(null);
  const [schemes, setSchemes] = useState<Scheme[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!slug) return;
    setLoading(true);
    api.getCategories().then((cats) => {
      const found = cats.find((c) => c.slug === slug);
      setCategory(found || null);
    });

    api.getPopularSchemesByCategory(slug).then((s) => {
      setSchemes(s);
      setLoading(false);
    });
  }, [slug]);

  if (!category && !loading) {
    return (
      <div className="max-w-4xl mx-auto py-16 px-4 text-center">
        <h2 className="text-xl font-bold text-slate-900 mb-2">Category Not Found</h2>
        <Link to="/categories" className="text-sm text-blue-600 hover:underline">
          Back to categories
        </Link>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-50 py-10 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <Link
          to="/categories"
          className="inline-flex items-center gap-1.5 text-xs font-semibold text-slate-500 hover:text-slate-800 mb-6"
        >
          <ArrowLeft className="w-4 h-4" /> All Categories
        </Link>

        {/* Hero Banner for Category */}
        <div className="bg-white rounded-3xl border border-slate-200 p-8 sm:p-10 mb-10 shadow-sm flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
          <div className="space-y-3 max-w-2xl">
            <div className="text-4xl">{category?.icon}</div>
            <h1 className="text-3xl font-extrabold text-slate-900">
              {category?.name} Schemes
            </h1>
            <p className="text-sm text-slate-600 leading-relaxed">
              Find government {category?.name.toLowerCase()} schemes relevant to you. Answer our quick questionnaire to evaluate your eligibility.
            </p>
          </div>

          <Button
            size="lg"
            variant="primary"
            onClick={() => navigate(`/questionnaire?category=${slug}`)}
            className="shrink-0 shadow-lg shadow-blue-700/20"
          >
            <ShieldCheck className="w-5 h-5" /> Start Questionnaire
          </Button>
        </div>

        {/* Popular Schemes List */}
        <div>
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-xl font-bold text-slate-900">
              Popular {category?.name} Schemes
            </h2>
            <Link
              to={`/results?category=${encodeURIComponent(category?.name || '')}`}
              className="text-xs font-semibold text-blue-700 hover:text-blue-900"
            >
              View all in sector →
            </Link>
          </div>

          {loading ? (
            <div className="p-12 text-center text-sm text-slate-500">Loading schemes...</div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {schemes.map((scheme) => (
                <SchemeCard key={scheme.slug} scheme={scheme} />
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
