
import { useState, useEffect } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import type { Scheme } from '../types';
import { api } from '../services/api';
import { useSavedSchemes } from '../context/SavedSchemesContext';
import { formatText } from '../utils/formatText';
import { Button } from '../components/common/Button';
import {
  ArrowLeft,
  Building2,
  MapPin,
  Bookmark,
  CheckCircle,
  FileText,
  Send,
  HelpCircle,
  ExternalLink,
  ShieldAlert,
  Sparkles,
} from 'lucide-react';

export const SchemeDetails = () => {
  const { slug } = useParams<{ slug: string }>();
  const navigate = useNavigate();
  const { isSaved, toggleSave } = useSavedSchemes();

  const [scheme, setScheme] = useState<Scheme | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!slug) return;
    setLoading(true);
    api.getSchemeBySlug(slug).then((s) => {
      setScheme(s);
      setLoading(false);
    });
  }, [slug]);

  if (loading) {
    return (
      <div className="min-h-screen bg-slate-50 flex items-center justify-center p-8">
        <div className="text-slate-500 text-sm font-medium">Loading scheme details...</div>
      </div>
    );
  }

  if (!scheme) {
    return (
      <div className="min-h-screen bg-slate-50 flex flex-col items-center justify-center p-8 text-center">
        <h2 className="text-xl font-bold text-slate-900 mb-2">Scheme Not Found</h2>
        <Button variant="outline" onClick={() => navigate('/results')}>
          Back to results
        </Button>
      </div>
    );
  }

  const saved = isSaved(scheme.slug);
  const isCentral = !scheme.state || scheme.level.toLowerCase().includes('central');

  return (
    <div className="min-h-screen bg-slate-50 py-10 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto space-y-6">
        {/* Back Link */}
        <Link
          to="/results"
          className="inline-flex items-center gap-1.5 text-xs font-bold text-slate-600 hover:text-slate-900"
        >
          <ArrowLeft className="w-4 h-4" /> Back to results
        </Link>

        {/* Scheme Header Card */}
        <div className="bg-white rounded-3xl border border-slate-200 p-8 shadow-sm">
          <div className="flex flex-wrap items-center justify-between gap-3 mb-4">
            <div className="flex flex-wrap gap-2">
              {isCentral ? (
                <span className="inline-flex items-center gap-1 px-3 py-1 rounded-full text-xs font-bold bg-indigo-100 text-indigo-800">
                  <Building2 className="w-3.5 h-3.5" /> Central Government Scheme
                </span>
              ) : (
                <span className="inline-flex items-center gap-1 px-3 py-1 rounded-full text-xs font-bold bg-emerald-100 text-emerald-800">
                  <MapPin className="w-3.5 h-3.5" /> State Scheme: {scheme.state}
                </span>
              )}

              {scheme.short_title && (
                <span className="px-2.5 py-1 rounded-full text-xs font-mono bg-slate-100 text-slate-700">
                  {scheme.short_title}
                </span>
              )}
            </div>

            <button
              onClick={() => toggleSave(scheme.slug)}
              className={`inline-flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                saved
                  ? 'bg-blue-100 text-blue-700 hover:bg-blue-200'
                  : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
              }`}
            >
              <Bookmark className={`w-4 h-4 ${saved ? 'fill-blue-700' : ''}`} />
              {saved ? 'Saved in My Schemes' : 'Save Scheme'}
            </button>
          </div>

          <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 leading-snug mb-3 font-serif">
            {scheme.scheme_name}
          </h1>

          {scheme.department && (
            <p className="text-xs text-slate-500 mb-6 flex items-center gap-1.5">
              <Building2 className="w-4 h-4 text-slate-400 shrink-0" />
              {scheme.department}
            </p>
          )}

          {/* About this scheme */}
          <div className="border-t border-slate-100 pt-6">
            <h2 className="text-sm font-bold uppercase tracking-wider text-slate-800 mb-2">
              About this scheme
            </h2>
            <p className="text-sm text-slate-600 leading-relaxed whitespace-pre-line font-light">
              {formatText(scheme.description || scheme.brief_description)}
            </p>
          </div>
        </div>

        {/* Benefits Section */}
        {scheme.benefits && (
          <div className="bg-white rounded-3xl border border-slate-200 p-8 shadow-sm">
            <h2 className="text-base font-bold text-slate-900 mb-4 flex items-center gap-2 font-serif">
              <CheckCircle className="w-5 h-5 text-emerald-600" />
              Benefits
            </h2>
            <div className="bg-emerald-50/60 border border-emerald-200 rounded-2xl p-5 text-sm text-emerald-950 leading-relaxed whitespace-pre-line font-light">
              {formatText(scheme.benefits)}
            </div>
          </div>
        )}

        {/* Why this matches you */}
        <div className="bg-white rounded-3xl border border-slate-200 p-8 shadow-sm">
          <h2 className="text-base font-bold text-slate-900 mb-4 flex items-center gap-2 font-serif">
            <Sparkles className="w-5 h-5 text-blue-600" />
            Why this matches you
          </h2>
          <div className="bg-blue-50/60 border border-blue-200 rounded-2xl p-5 text-sm text-blue-950 space-y-2">
            <div className="flex items-start gap-2">
              <span className="text-blue-600 font-bold">✓</span>
              <span>
                Matches state residency criteria: <strong>{scheme.state || 'All India / Central'}</strong>
              </span>
            </div>
            <div className="flex items-start gap-2">
              <span className="text-blue-600 font-bold">✓</span>
              <span>
                Target beneficiary category: <strong>{scheme.beneficiaries || 'Individuals & Families'}</strong>
              </span>
            </div>
            <div className="flex items-start gap-2">
              <span className="text-blue-600 font-bold">✓</span>
              <span>Direct government portal submission supported.</span>
            </div>
          </div>
        </div>

        {/* Documents commonly required */}
        <div className="bg-white rounded-3xl border border-slate-200 p-8 shadow-sm">
          <h2 className="text-base font-bold text-slate-900 mb-4 flex items-center gap-2 font-serif">
            <FileText className="w-5 h-5 text-indigo-600" />
            Documents commonly required
          </h2>
          <div className="text-sm text-slate-700 leading-relaxed whitespace-pre-line bg-slate-50 border border-slate-200 rounded-2xl p-5 font-light">
            {formatText(scheme.documents) || 'Standard Identity Proof (Aadhaar Card, Voter ID), Bank Account details, Passport size photo, and Income/Caste certificates if applicable.'}
          </div>
        </div>

        {/* How to apply */}
        <div className="bg-white rounded-3xl border border-slate-200 p-8 shadow-sm">
          <h2 className="text-base font-bold text-slate-900 mb-4 flex items-center gap-2 font-serif">
            <Send className="w-5 h-5 text-slate-700" />
            How to apply
          </h2>
          <div className="text-sm text-slate-700 leading-relaxed whitespace-pre-line bg-slate-50 border border-slate-200 rounded-2xl p-5 font-light">
            {formatText(scheme.application_process) || '1. Visit official online portal.\n2. Register and submit application form along with self-attested documents.\n3. Keep acknowledgement receipt for tracking.'}
          </div>
        </div>

        {/* FAQs if present */}
        {scheme.faqs && (
          <div className="bg-white rounded-3xl border border-slate-200 p-8 shadow-sm">
            <h2 className="text-base font-bold text-slate-900 mb-4 flex items-center gap-2 font-serif">
              <HelpCircle className="w-5 h-5 text-slate-700" />
              Frequently Asked Questions (FAQs)
            </h2>
            <div className="text-sm text-slate-700 leading-relaxed whitespace-pre-line bg-slate-50 border border-slate-200 rounded-2xl p-5 font-light">
              {formatText(scheme.faqs)}
            </div>
          </div>
        )}

        {/* Official Warning & External Apply Button */}
        <div className="bg-amber-50 rounded-3xl border border-amber-200 p-8 flex flex-col sm:flex-row items-center justify-between gap-6 shadow-sm">
          <div className="flex items-start gap-3 max-w-xl">
            <ShieldAlert className="w-6 h-6 text-amber-600 shrink-0 mt-0.5" />
            <p className="text-xs sm:text-sm text-amber-900 leading-relaxed font-medium">
              ⚠ Verify latest information and official terms on the official government website before submitting sensitive personal documents.
            </p>
          </div>

          <a
            href="https://www.myscheme.gov.in"
            target="_blank"
            rel="noopener noreferrer"
            className="w-full sm:w-auto px-6 py-3.5 bg-blue-700 hover:bg-blue-800 text-white font-bold rounded-xl text-sm flex items-center justify-center gap-2 shadow-md shrink-0 transition-all"
          >
            Apply on Official Website <ExternalLink className="w-4 h-4" />
          </a>
        </div>
      </div>
    </div>
  );
};
