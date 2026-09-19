
import { useState } from 'react';
import type { Scheme } from '../types/scheme';
import { X, Building2, MapPin, Bookmark, CheckCircle, FileText, Send, HelpCircle, ExternalLink, ShieldAlert } from 'lucide-react';

interface SchemeDetailModalProps {
  scheme: Scheme | null;
  isOpen: boolean;
  onClose: () => void;
  isSaved: boolean;
  onToggleSave: (slug: string) => void;
}

export const SchemeDetailModal = ({
  scheme,
  isOpen,
  onClose,
  isSaved,
  onToggleSave,
}: SchemeDetailModalProps) => {
  const [activeTab, setActiveTab] = useState<'benefits' | 'eligibility' | 'process' | 'documents' | 'faqs'>('benefits');

  if (!isOpen || !scheme) return null;

  const isCentral = !scheme.state || scheme.level.toLowerCase().includes('central');

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-slate-900/60 backdrop-blur-sm flex items-center justify-center p-4 sm:p-6 animate-in fade-in duration-200">
      <div className="bg-white rounded-2xl max-w-3xl w-full shadow-2xl border border-slate-200 overflow-hidden flex flex-col max-h-[90vh]">
        {/* Modal Top Header */}
        <div className="p-6 bg-slate-50 border-b border-slate-200 relative">
          <button
            onClick={onClose}
            className="absolute right-4 top-4 p-2 rounded-full text-slate-400 hover:text-slate-600 hover:bg-slate-200 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>

          <div className="flex flex-wrap gap-2 mb-2">
            {isCentral ? (
              <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-xs font-semibold bg-indigo-100 text-indigo-800">
                <Building2 className="w-3 h-3" /> Central Govt Scheme
              </span>
            ) : (
              <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-xs font-semibold bg-emerald-100 text-emerald-800">
                <MapPin className="w-3 h-3" /> State Scheme: {scheme.state}
              </span>
            )}
            {scheme.short_title && (
              <span className="px-2.5 py-0.5 rounded-full text-xs font-mono bg-slate-200 text-slate-700">
                {scheme.short_title}
              </span>
            )}
          </div>

          <h2 className="text-xl sm:text-2xl font-bold text-slate-900 pr-8 leading-snug">
            {scheme.scheme_name}
          </h2>

          <div className="flex items-center gap-4 mt-2 text-xs text-slate-600">
            {scheme.department && (
              <span className="flex items-center gap-1">
                <Building2 className="w-3.5 h-3.5 text-slate-400" />
                {scheme.department}
              </span>
            )}
            <span>•</span>
            <span>Target: <strong>{scheme.beneficiaries || 'Individuals'}</strong></span>
          </div>
        </div>

        {/* Modal Tabs */}
        <div className="flex border-b border-slate-200 px-6 bg-white overflow-x-auto">
          <button
            onClick={() => setActiveTab('benefits')}
            className={`py-3 px-3 text-xs sm:text-sm font-semibold border-b-2 transition-colors whitespace-nowrap ${
              activeTab === 'benefits'
                ? 'border-blue-600 text-blue-600'
                : 'border-transparent text-slate-500 hover:text-slate-700'
            }`}
          >
            Benefits & Overview
          </button>
          <button
            onClick={() => setActiveTab('eligibility')}
            className={`py-3 px-3 text-xs sm:text-sm font-semibold border-b-2 transition-colors whitespace-nowrap ${
              activeTab === 'eligibility'
                ? 'border-blue-600 text-blue-600'
                : 'border-transparent text-slate-500 hover:text-slate-700'
            }`}
          >
            Eligibility Criteria
          </button>
          <button
            onClick={() => setActiveTab('process')}
            className={`py-3 px-3 text-xs sm:text-sm font-semibold border-b-2 transition-colors whitespace-nowrap ${
              activeTab === 'process'
                ? 'border-blue-600 text-blue-600'
                : 'border-transparent text-slate-500 hover:text-slate-700'
            }`}
          >
            Application Process
          </button>
          <button
            onClick={() => setActiveTab('documents')}
            className={`py-3 px-3 text-xs sm:text-sm font-semibold border-b-2 transition-colors whitespace-nowrap ${
              activeTab === 'documents'
                ? 'border-blue-600 text-blue-600'
                : 'border-transparent text-slate-500 hover:text-slate-700'
            }`}
          >
            Required Documents
          </button>
          {scheme.faqs && (
            <button
              onClick={() => setActiveTab('faqs')}
              className={`py-3 px-3 text-xs sm:text-sm font-semibold border-b-2 transition-colors whitespace-nowrap ${
                activeTab === 'faqs'
                  ? 'border-blue-600 text-blue-600'
                  : 'border-transparent text-slate-500 hover:text-slate-700'
              }`}
            >
              FAQs
            </button>
          )}
        </div>

        {/* Modal Tab Content */}
        <div className="p-6 overflow-y-auto space-y-4 text-sm text-slate-700 flex-1">
          {activeTab === 'benefits' && (
            <div className="space-y-4">
              <div>
                <h4 className="font-semibold text-slate-900 mb-2">Description</h4>
                <p className="leading-relaxed text-slate-600 whitespace-pre-line">
                  {scheme.description || scheme.brief_description}
                </p>
              </div>

              {scheme.benefits && (
                <div className="bg-blue-50/70 border border-blue-100 rounded-xl p-4">
                  <h4 className="font-semibold text-blue-900 mb-2 flex items-center gap-1.5">
                    <CheckCircle className="w-4 h-4 text-blue-600" /> Key Benefits & Entitlements
                  </h4>
                  <div className="text-blue-950 whitespace-pre-line leading-relaxed text-xs sm:text-sm">
                    {scheme.benefits}
                  </div>
                </div>
              )}
            </div>
          )}

          {activeTab === 'eligibility' && (
            <div className="space-y-4">
              <div className="bg-amber-50/70 border border-amber-200 rounded-xl p-4">
                <h4 className="font-semibold text-amber-900 mb-2 flex items-center gap-1.5">
                  <ShieldAlert className="w-4 h-4 text-amber-600" /> Eligibility Requirements
                </h4>
                <div className="text-amber-950 whitespace-pre-line leading-relaxed text-xs sm:text-sm">
                  {scheme.eligibility || 'Please review standard state/central residency criteria.'}
                </div>
              </div>
            </div>
          )}

          {activeTab === 'process' && (
            <div className="space-y-4">
              <div className="bg-slate-50 border border-slate-200 rounded-xl p-4">
                <h4 className="font-semibold text-slate-900 mb-2 flex items-center gap-1.5">
                  <Send className="w-4 h-4 text-slate-600" /> Step-by-Step Application Guide
                </h4>
                <div className="text-slate-700 whitespace-pre-line leading-relaxed text-xs sm:text-sm">
                  {scheme.application_process || 'Direct portal submission or visit designated department office.'}
                </div>
              </div>
            </div>
          )}

          {activeTab === 'documents' && (
            <div className="space-y-4">
              <div className="bg-emerald-50/70 border border-emerald-200 rounded-xl p-4">
                <h4 className="font-semibold text-emerald-900 mb-2 flex items-center gap-1.5">
                  <FileText className="w-4 h-4 text-emerald-600" /> Necessary Documents
                </h4>
                <div className="text-emerald-950 whitespace-pre-line leading-relaxed text-xs sm:text-sm">
                  {scheme.documents || 'Standard Identification (Aadhaar, Voter ID), Bank Account details, and Income/Caste certificates if applicable.'}
                </div>
              </div>
            </div>
          )}

          {activeTab === 'faqs' && (
            <div className="space-y-4">
              <div className="bg-slate-50 border border-slate-200 rounded-xl p-4">
                <h4 className="font-semibold text-slate-900 mb-2 flex items-center gap-1.5">
                  <HelpCircle className="w-4 h-4 text-slate-600" /> Frequently Asked Questions
                </h4>
                <div className="text-slate-700 whitespace-pre-line leading-relaxed text-xs sm:text-sm">
                  {scheme.faqs}
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Modal Bottom Footer */}
        <div className="p-4 bg-slate-50 border-t border-slate-200 flex items-center justify-between">
          <button
            onClick={() => onToggleSave(scheme.slug)}
            className={`flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-semibold transition-colors ${
              isSaved
                ? 'bg-blue-100 text-blue-700 hover:bg-blue-200'
                : 'bg-white border border-slate-300 text-slate-700 hover:bg-slate-100'
            }`}
          >
            <Bookmark className={`w-4 h-4 ${isSaved ? 'fill-blue-700' : ''}`} />
            {isSaved ? 'Saved in My Schemes' : 'Save Scheme'}
          </button>

          <div className="flex items-center gap-2">
            <button
              onClick={onClose}
              className="px-4 py-2 text-sm font-medium text-slate-600 hover:text-slate-800"
            >
              Close
            </button>
            {scheme.applyUrl ? (
              <a
                href={scheme.applyUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-1.5 px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg text-sm font-semibold shadow-sm transition-colors cursor-pointer"
              >
                {scheme.applicationType === 'form' ? 'Application Form' : 'Apply on Official Website'}{' '}
                <ExternalLink className="w-3.5 h-3.5" />
              </a>
            ) : scheme.officialWebsite ? (
              <a
                href={scheme.officialWebsite}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-1.5 px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg text-sm font-semibold shadow-sm transition-colors cursor-pointer"
              >
                Official Portal <ExternalLink className="w-3.5 h-3.5" />
              </a>
            ) : (
              <button
                disabled
                aria-disabled="true"
                className="flex items-center gap-1.5 px-4 py-2 bg-slate-200 text-slate-500 rounded-lg text-sm font-semibold cursor-not-allowed pointer-events-none select-none"
              >
                Online Application Unavailable
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
