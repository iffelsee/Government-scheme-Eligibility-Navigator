
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
  ChevronDown,
  ChevronUp,
  Download,
} from 'lucide-react';

export const SchemeDetails = () => {
  const { slug } = useParams<{ slug: string }>();
  const navigate = useNavigate();
  const { isSaved, toggleSave } = useSavedSchemes();

  const [scheme, setScheme] = useState<Scheme | null>(null);
  const [loading, setLoading] = useState(true);
  const [popping, setPopping] = useState(false);
  const [faqsOpen, setFaqsOpen] = useState(true);

  const handleBookmarkClick = () => {
    if (!scheme) return;
    setPopping(true);
    toggleSave(scheme.slug);
    setTimeout(() => setPopping(false), 300);
  };

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
      <div className="min-h-screen bg-[#E8E6E1] flex items-center justify-center p-8">
        <div className="text-[#52677D] text-sm font-medium animate-pulse">Loading scheme details...</div>
      </div>
    );
  }

  if (!scheme) {
    return (
      <div className="min-h-screen bg-[#E8E6E1] flex flex-col items-center justify-center p-8 text-center animate-fade-in">
        <h2 className="text-xl font-bold text-[#0F1A2B] mb-2">Scheme Not Found</h2>
        <Button variant="outline" onClick={() => navigate('/results')}>
          Back to results
        </Button>
      </div>
    );
  }

  const saved = isSaved(scheme.slug);
  const isCentral = !scheme.state || scheme.level.toLowerCase().includes('central');

  return (
    <div className="min-h-screen bg-[#E8E6E1] py-10 px-4 sm:px-6 lg:px-8 text-[#0F1A2B]">
      <div className="max-w-4xl mx-auto space-y-6">
        {/* Back Link */}
        <Link
          to="/results"
          className="group inline-flex items-center gap-1.5 text-xs font-bold text-[#52677D] hover:text-[#0F1A2B] transition-colors"
        >
          <ArrowLeft className="w-4 h-4 group-hover:-translate-x-0.5 transition-transform duration-150" /> Back to results
        </Link>

        {/* Scheme Header Card */}
        <div className="bg-[#F5F3EE] rounded-3xl border border-[#BDC4D4] p-8 shadow-sm animate-fade-up">
          <div className="flex flex-wrap items-center justify-between gap-3 mb-4">
            <div className="flex flex-wrap gap-2">
              {isCentral ? (
                <span className="inline-flex items-center gap-1 px-3 py-1 rounded-full text-xs font-bold bg-[#EBE8E1] text-[#0F1A2B] border border-[#BDC4D4] animate-scale-in">
                  <Building2 className="w-3.5 h-3.5 text-[#0F1A2B]" /> Central Government Scheme
                </span>
              ) : (
                <span className="inline-flex items-center gap-1 px-3 py-1 rounded-full text-xs font-bold bg-emerald-50 text-emerald-800 border border-emerald-200 animate-scale-in">
                  <MapPin className="w-3.5 h-3.5" /> State Scheme: {scheme.state}
                </span>
              )}

              {scheme.short_title && (
                <span className="px-2.5 py-1 rounded-full text-xs font-mono bg-[#EBE8E1] text-[#0F1A2B] border border-[#BDC4D4]">
                  {scheme.short_title}
                </span>
              )}
            </div>

            <button
              onClick={handleBookmarkClick}
              className={`inline-flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-bold transition-all duration-150 active:scale-90 cursor-pointer ${
                popping ? 'animate-pop' : ''
              } ${
                saved
                  ? 'bg-[#D1CFC9] text-[#0F1A2B] border border-[#0F1A2B]/20'
                  : 'bg-[#EBE8E1] text-[#52677D] hover:text-[#0F1A2B] hover:bg-[#D1CFC9] border border-[#BDC4D4]'
              }`}
            >
              <Bookmark className={`w-4 h-4 transition-transform duration-150 ${saved ? 'fill-[#0F1A2B] scale-105' : 'scale-100'}`} />
              {saved ? 'Saved in My Schemes' : 'Save Scheme'}
            </button>
          </div>

          <h1 className="text-2xl sm:text-3xl font-extrabold text-[#0F1A2B] leading-snug mb-3 font-serif">
            {scheme.scheme_name}
          </h1>

          {scheme.department && (
            <p className="text-xs text-[#52677D] mb-6 flex items-center gap-1.5 font-medium">
              <Building2 className="w-4 h-4 text-[#52677D] shrink-0" />
              {scheme.department}
            </p>
          )}

          {/* About this scheme */}
          <div className="border-t border-[#BDC4D4] pt-6">
            <h2 className="text-sm font-bold uppercase tracking-wider text-[#0F1A2B] mb-2">
              About this scheme
            </h2>
            <p className="text-sm text-[#52677D] leading-relaxed whitespace-pre-line font-light">
              {formatText(scheme.description || scheme.brief_description)}
            </p>
          </div>
        </div>

        {/* Benefits Section */}
        {scheme.benefits && (
          <div className="bg-[#F5F3EE] rounded-3xl border border-[#BDC4D4] p-8 shadow-sm animate-fade-up stagger-1">
            <h2 className="text-base font-bold text-[#0F1A2B] mb-4 flex items-center gap-2 font-serif">
              <CheckCircle className="w-5 h-5 text-emerald-600" />
              Benefits
            </h2>
            <div className="bg-emerald-50/60 border border-emerald-200 rounded-2xl p-5 text-sm text-emerald-950 leading-relaxed whitespace-pre-line font-light">
              {formatText(scheme.benefits)}
            </div>
          </div>
        )}

        {/* Why this matches you */}
        <div className="bg-[#F5F3EE] rounded-3xl border border-[#BDC4D4] p-8 shadow-sm animate-fade-up stagger-2">
          <h2 className="text-base font-bold text-[#0F1A2B] mb-4 flex items-center gap-2 font-serif">
            <Sparkles className="w-5 h-5 text-[#52677D]" />
            Why this matches you
          </h2>
          <div className="bg-[#EBE8E1] border border-[#BDC4D4] rounded-2xl p-5 text-sm text-[#0F1A2B] space-y-2">
            <div className="flex items-start gap-2">
              <span className="text-[#0F1A2B] font-bold">✓</span>
              <span>
                Matches state residency criteria: <strong>{scheme.state || 'All India / Central'}</strong>
              </span>
            </div>
            <div className="flex items-start gap-2">
              <span className="text-[#0F1A2B] font-bold">✓</span>
              <span>
                Target beneficiary category: <strong>{scheme.beneficiaries || 'Individuals & Families'}</strong>
              </span>
            </div>
            <div className="flex items-start gap-2">
              <span className="text-[#0F1A2B] font-bold">✓</span>
              <span>Direct government portal submission supported.</span>
            </div>
          </div>
        </div>

        {/* Documents commonly required */}
        <div className="bg-[#F5F3EE] rounded-3xl border border-[#BDC4D4] p-8 shadow-sm animate-fade-up stagger-3">
          <h2 className="text-base font-bold text-[#0F1A2B] mb-4 flex items-center gap-2 font-serif">
            <FileText className="w-5 h-5 text-[#52677D]" />
            Documents commonly required
          </h2>
          <div className="text-sm text-[#52677D] leading-relaxed whitespace-pre-line bg-[#EBE8E1] border border-[#BDC4D4] rounded-2xl p-5 font-light">
            {formatText(scheme.documents) || 'Standard Identity Proof (Aadhaar Card, Voter ID), Bank Account details, Passport size photo, and Income/Caste certificates if applicable.'}
          </div>
        </div>

        {/* How to apply */}
        <div className="bg-[#F5F3EE] rounded-3xl border border-[#BDC4D4] p-8 shadow-sm animate-fade-up stagger-4">
          <h2 className="text-base font-bold text-[#0F1A2B] mb-4 flex items-center gap-2 font-serif">
            <Send className="w-5 h-5 text-[#52677D]" />
            How to apply
          </h2>
          <div className="text-sm text-[#52677D] leading-relaxed whitespace-pre-line bg-[#EBE8E1] border border-[#BDC4D4] rounded-2xl p-5 font-light">
            {formatText(scheme.application_process) || '1. Visit official online portal.\n2. Register and submit application form along with self-attested documents.\n3. Keep acknowledgement receipt for tracking.'}
          </div>
        </div>

        {/* FAQs if present (collapsible accordion) */}
        {scheme.faqs && (
          <div className="bg-[#F5F3EE] rounded-3xl border border-[#BDC4D4] p-8 shadow-sm animate-fade-up stagger-5">
            <button
              onClick={() => setFaqsOpen(!faqsOpen)}
              className="w-full flex items-center justify-between cursor-pointer group text-left"
            >
              <h2 className="text-base font-bold text-[#0F1A2B] flex items-center gap-2 font-serif">
                <HelpCircle className="w-5 h-5 text-[#52677D]" />
                Frequently Asked Questions (FAQs)
              </h2>
              <div className="p-1 rounded-lg text-[#52677D] group-hover:text-[#0F1A2B] transition-colors">
                {faqsOpen ? <ChevronUp className="w-5 h-5" /> : <ChevronDown className="w-5 h-5" />}
              </div>
            </button>
            <div
              className={`transition-all duration-300 ease-out overflow-hidden ${
                faqsOpen ? 'max-h-96 opacity-100 mt-4' : 'max-h-0 opacity-0 mt-0 pointer-events-none'
              }`}
            >
              <div className="text-sm text-[#52677D] leading-relaxed whitespace-pre-line bg-[#EBE8E1] border border-[#BDC4D4] rounded-2xl p-5 font-light">
                {formatText(scheme.faqs)}
              </div>
            </div>
          </div>
        )}

        {/* Official Warning & External Apply Button */}
        <div className="bg-[#EBE8E1] rounded-3xl border border-[#BDC4D4] p-8 flex flex-col sm:flex-row items-center justify-between gap-6 shadow-sm animate-fade-up stagger-5">
          <div className="flex items-start gap-3 max-w-xl">
            <ShieldAlert className="w-6 h-6 text-amber-600 shrink-0 mt-0.5" />
            <p className="text-xs sm:text-sm text-[#0F1A2B] leading-relaxed font-medium">
              ⚠ Verify latest information and official terms on the official government website before submitting sensitive personal documents.
            </p>
          </div>

          <div className="flex flex-col sm:flex-row items-center gap-3 w-full sm:w-auto shrink-0">
            {scheme.applyUrl ? (
              <>
                {scheme.officialWebsite && (
                  <a
                    href={scheme.officialWebsite}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-full sm:w-auto px-4 py-3.5 bg-[#F5F3EE] hover:bg-[#E8E6E1] text-[#0F1A2B] font-semibold rounded-xl text-xs flex items-center justify-center gap-1.5 border border-[#BDC4D4] transition-all cursor-pointer shadow-xs"
                  >
                    Department Portal <ExternalLink className="w-3.5 h-3.5 text-[#52677D]" />
                  </a>
                )}
                <a
                  href={scheme.applyUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full sm:w-auto px-6 py-3.5 bg-[#0F1A2B] hover:bg-[#1C2E4A] hover:-translate-y-0.5 active:translate-y-0 active:scale-[0.98] text-[#D1CFC9] font-bold rounded-xl text-sm flex items-center justify-center gap-2 shadow-md hover:shadow-lg shrink-0 transition-all duration-150 cursor-pointer"
                >
                  {scheme.applicationType === 'form' ? (
                    <>
                      Download Application Form <Download className="w-4 h-4" />
                    </>
                  ) : (
                    <>
                      Apply on Official Website <ExternalLink className="w-4 h-4" />
                    </>
                  )}
                </a>
              </>
            ) : (
              <>
                {scheme.officialWebsite && (
                  <a
                    href={scheme.officialWebsite}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-full sm:w-auto px-4 py-3.5 bg-[#F5F3EE] hover:bg-[#E8E6E1] text-[#0F1A2B] font-semibold rounded-xl text-xs flex items-center justify-center gap-1.5 border border-[#BDC4D4] transition-all cursor-pointer shadow-xs"
                  >
                    Visit Official Portal <ExternalLink className="w-3.5 h-3.5 text-[#52677D]" />
                  </a>
                )}
                {scheme.guidelinesUrl && !scheme.officialWebsite && (
                  <a
                    href={scheme.guidelinesUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-full sm:w-auto px-4 py-3.5 bg-[#F5F3EE] hover:bg-[#E8E6E1] text-[#0F1A2B] font-semibold rounded-xl text-xs flex items-center justify-center gap-1.5 border border-[#BDC4D4] transition-all cursor-pointer shadow-xs"
                  >
                    View Official Guidelines <ExternalLink className="w-3.5 h-3.5 text-[#52677D]" />
                  </a>
                )}
                <button
                  type="button"
                  disabled
                  aria-disabled="true"
                  title="An official online application link is currently unavailable for this scheme. Please refer to the 'How to apply' section above for submission details."
                  className="w-full sm:w-auto px-6 py-3.5 bg-[#D1CFC9]/50 text-[#52677D] font-medium rounded-xl text-sm flex items-center justify-center gap-2 cursor-not-allowed border border-[#BDC4D4]/60 pointer-events-none select-none opacity-80"
                >
                  Online Application Unavailable
                </button>
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
