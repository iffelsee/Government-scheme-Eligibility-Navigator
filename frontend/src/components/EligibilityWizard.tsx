
import { useState } from 'react';
import type { EligibilityProfile } from '../types/scheme';
import { X, ShieldCheck, User, MapPin, Briefcase, ChevronRight, ChevronLeft, Sparkles } from 'lucide-react';

interface EligibilityWizardProps {
  isOpen: boolean;
  onClose: () => void;
  onApplyProfile: (profile: EligibilityProfile) => void;
  availableStates: string[];
}

export const EligibilityWizard = ({
  isOpen,
  onClose,
  onApplyProfile,
  availableStates,
}: EligibilityWizardProps) => {
  const [step, setStep] = useState(1);
  const [profile, setProfile] = useState<EligibilityProfile>({
    state: '',
    gender: 'all',
    age: 25,
    casteCategory: 'All',
    annualIncome: 'any',
    occupation: 'All',
    isStudent: false,
    isFarmer: false,
    isDisability: false,
    isBPL: false,
    isGovernmentEmployee: false,
    isPrivateEmployee: false,
    isEntrepreneur: false,
    isDailyWage: false,
    isUnemployed: false,
    isArtisan: false,
  });

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onApplyProfile(profile);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-[#0F1A2B]/60 backdrop-blur-sm flex items-center justify-center p-4 animate-fade-in">
      <div className="bg-[#F5F3EE] rounded-2xl max-w-xl w-full shadow-2xl border border-[#BDC4D4] overflow-hidden animate-scale-in">
        {/* Header */}
        <div className="p-6 bg-gradient-to-r from-[#0F1A2B] via-[#1C2E4A] to-[#0F1A2B] text-white relative border-b border-[#52677D]/30">
          <button
            onClick={onClose}
            className="absolute right-4 top-4 p-2 rounded-full text-[#D1CFC9]/70 hover:text-[#D1CFC9] hover:bg-white/10 transition-colors active:scale-90"
          >
            <X className="w-5 h-5" />
          </button>
          <div className="flex items-center gap-2 text-[#D1CFC9] text-xs font-semibold uppercase tracking-wider mb-1">
            <ShieldCheck className="w-4 h-4 text-[#BDC4D4]" /> Eligibility Assessment Wizard
          </div>
          <h2 className="text-xl font-serif font-bold text-white">Check Your Scheme Eligibility</h2>
          <p className="text-xs text-[#D1CFC9]/80 mt-1">Step {step} of 3 • Quick citizen profile questionnaire</p>
        </div>

        <form onSubmit={handleSubmit} className="p-6 space-y-6">
          {/* Step 1: Basic Info */}
          {step === 1 && (
            <div className="space-y-4 animate-in fade-in duration-150">
              <h3 className="font-serif font-bold text-[#0F1A2B] text-sm flex items-center gap-2">
                <MapPin className="w-4 h-4 text-[#52677D]" /> Location & Demographics
              </h3>

              <div>
                <label className="block text-xs font-semibold text-[#0F1A2B]/80 mb-1">
                  State / Union Territory of Residence
                </label>
                <select
                  value={profile.state}
                  onChange={(e) => setProfile({ ...profile, state: e.target.value })}
                  className="w-full p-2.5 text-sm border border-[#BDC4D4] bg-[#EBE8E1] text-[#0F1A2B] rounded-lg focus:ring-2 focus:ring-[#52677D] focus:outline-none"
                >
                  <option value="">All India / Central Only</option>
                  {availableStates.filter(Boolean).map((s) => (
                    <option key={s} value={s}>
                      {s}
                    </option>
                  ))}
                </select>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-[#0F1A2B]/80 mb-1">Gender</label>
                  <select
                    value={profile.gender}
                    onChange={(e) => setProfile({ ...profile, gender: e.target.value })}
                    className="w-full p-2.5 text-sm border border-[#BDC4D4] bg-[#EBE8E1] text-[#0F1A2B] rounded-lg focus:ring-2 focus:ring-[#52677D] focus:outline-none"
                  >
                    <option value="all">Any Gender</option>
                    <option value="female">Female</option>
                    <option value="male">Male</option>
                    <option value="transgender">Transgender</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-[#0F1A2B]/80 mb-1">Age</label>
                  <input
                    type="number"
                    min="1"
                    max="120"
                    value={profile.age}
                    onChange={(e) => setProfile({ ...profile, age: e.target.value ? Number(e.target.value) : '' })}
                    className="w-full p-2.5 text-sm border border-[#BDC4D4] bg-[#EBE8E1] text-[#0F1A2B] rounded-lg focus:ring-2 focus:ring-[#52677D] focus:outline-none"
                    placeholder="e.g. 28"
                  />
                </div>
              </div>
            </div>
          )}

          {/* Step 2: Socio-Economic Profile */}
          {step === 2 && (
            <div className="space-y-4 animate-in fade-in duration-150">
              <h3 className="font-serif font-bold text-[#0F1A2B] text-sm flex items-center gap-2">
                <User className="w-4 h-4 text-[#52677D]" /> Socio-Economic Profile
              </h3>

              <div>
                <label className="block text-xs font-semibold text-[#0F1A2B]/80 mb-1">
                  Social Category / Caste
                </label>
                <select
                  value={profile.casteCategory}
                  onChange={(e) => setProfile({ ...profile, casteCategory: e.target.value })}
                  className="w-full p-2.5 text-sm border border-[#BDC4D4] bg-[#EBE8E1] text-[#0F1A2B] rounded-lg focus:ring-2 focus:ring-[#52677D] focus:outline-none"
                >
                  <option value="All">All Categories</option>
                  <option value="General">General</option>
                  <option value="OBC">OBC (Other Backward Classes)</option>
                  <option value="SC">SC (Scheduled Caste)</option>
                  <option value="ST">ST (Scheduled Tribe)</option>
                  <option value="EWS">EWS (Economically Weaker Section)</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-semibold text-[#0F1A2B]/80 mb-1">
                  Annual Family Income
                </label>
                <select
                  value={profile.annualIncome}
                  onChange={(e) => setProfile({ ...profile, annualIncome: e.target.value })}
                  className="w-full p-2.5 text-sm border border-[#BDC4D4] bg-[#EBE8E1] text-[#0F1A2B] rounded-lg focus:ring-2 focus:ring-[#52677D] focus:outline-none"
                >
                  <option value="any">Any / Not Disclosed</option>
                  <option value="low">Less than ₹1,00,000 / annum</option>
                  <option value="mid">₹1,00,000 to ₹3,00,000 / annum</option>
                  <option value="high">Above ₹3,00,000 / annum</option>
                </select>
              </div>

              <div className="pt-2">
                <label className="flex items-center gap-2 text-sm text-[#0F1A2B] cursor-pointer">
                  <input
                    type="checkbox"
                    checked={profile.isBPL}
                    onChange={(e) => setProfile({ ...profile, isBPL: e.target.checked })}
                    className="w-4 h-4 text-[#0F1A2B] accent-[#0F1A2B] rounded border-[#BDC4D4] focus:ring-[#52677D]"
                  />
                  <span>Belongs to BPL (Below Poverty Line) / Holds Antyodaya / BPL Ration Card</span>
                </label>
              </div>
            </div>
          )}

          {/* Step 3: Occupation & Status */}
          {step === 3 && (
            <div className="space-y-4 animate-in fade-in duration-150">
              <h3 className="font-serif font-bold text-[#0F1A2B] text-sm flex items-center gap-2">
                <Briefcase className="w-4 h-4 text-[#52677D]" /> Occupation & Special Status
              </h3>

              <div>
                <label className="block text-xs font-semibold text-[#0F1A2B]/80 mb-1">
                  Primary Occupation / Category
                </label>
                <select
                  value={profile.occupation}
                  onChange={(e) => setProfile({ ...profile, occupation: e.target.value })}
                  className="w-full p-2.5 text-sm border border-[#BDC4D4] bg-[#EBE8E1] text-[#0F1A2B] rounded-lg focus:ring-2 focus:ring-[#52677D] focus:outline-none"
                >
                  <option value="All">All / General Citizen</option>
                  <option value="Student">Student / Enrolled in Education</option>
                  <option value="Farmer">Farmer / Agricultural Worker</option>
                  <option value="Government Employee">Government / Public Sector Employee</option>
                  <option value="Private Employee">Private Sector / Salaried Employee</option>
                  <option value="Business">Entrepreneur / Micro Enterprise Owner</option>
                  <option value="Construction Worker">Construction / Informal Worker</option>
                  <option value="Artisan">Artisan / Weaver / Craftsperson</option>
                  <option value="Unemployed">Unemployed Youth / Job Seeker</option>
                </select>
              </div>

              <div className="space-y-2.5 pt-2">
                <label className="flex items-center gap-2 text-sm text-[#0F1A2B] cursor-pointer">
                  <input
                    type="checkbox"
                    checked={profile.isStudent}
                    onChange={(e) => setProfile({ ...profile, isStudent: e.target.checked })}
                    className="w-4 h-4 text-[#0F1A2B] accent-[#0F1A2B] rounded border-[#BDC4D4] focus:ring-[#52677D]"
                  />
                  <span>🎓 Currently a Student seeking scholarships or fee assistance</span>
                </label>

                <label className="flex items-center gap-2 text-sm text-[#0F1A2B] cursor-pointer">
                  <input
                    type="checkbox"
                    checked={profile.isFarmer}
                    onChange={(e) => setProfile({ ...profile, isFarmer: e.target.checked })}
                    className="w-4 h-4 text-[#0F1A2B] accent-[#0F1A2B] rounded border-[#BDC4D4] focus:ring-[#52677D]"
                  />
                  <span>🌾 Farmer / Involved in agriculture, dairy, or allied farming</span>
                </label>

                <label className="flex items-center gap-2 text-sm text-[#0F1A2B] cursor-pointer">
                  <input
                    type="checkbox"
                    checked={profile.isGovernmentEmployee}
                    onChange={(e) => setProfile({ ...profile, isGovernmentEmployee: e.target.checked })}
                    className="w-4 h-4 text-[#0F1A2B] accent-[#0F1A2B] rounded border-[#BDC4D4] focus:ring-[#52677D]"
                  />
                  <span>🏛️ Government / Public Sector Employee</span>
                </label>

                <label className="flex items-center gap-2 text-sm text-[#0F1A2B] cursor-pointer">
                  <input
                    type="checkbox"
                    checked={profile.isPrivateEmployee}
                    onChange={(e) => setProfile({ ...profile, isPrivateEmployee: e.target.checked })}
                    className="w-4 h-4 text-[#0F1A2B] accent-[#0F1A2B] rounded border-[#BDC4D4] focus:ring-[#52677D]"
                  />
                  <span>🏢 Private Sector / Salaried Employee</span>
                </label>

                <label className="flex items-center gap-2 text-sm text-[#0F1A2B] cursor-pointer">
                  <input
                    type="checkbox"
                    checked={profile.isEntrepreneur}
                    onChange={(e) => setProfile({ ...profile, isEntrepreneur: e.target.checked })}
                    className="w-4 h-4 text-[#0F1A2B] accent-[#0F1A2B] rounded border-[#BDC4D4] focus:ring-[#52677D]"
                  />
                  <span>💼 Self-Employed / Business Owner / Entrepreneur</span>
                </label>

                <label className="flex items-center gap-2 text-sm text-[#0F1A2B] cursor-pointer">
                  <input
                    type="checkbox"
                    checked={profile.isDailyWage}
                    onChange={(e) => setProfile({ ...profile, isDailyWage: e.target.checked })}
                    className="w-4 h-4 text-[#0F1A2B] accent-[#0F1A2B] rounded border-[#BDC4D4] focus:ring-[#52677D]"
                  />
                  <span>🔨 Daily Wage Worker / Construction & Informal Sector</span>
                </label>

                <label className="flex items-center gap-2 text-sm text-[#0F1A2B] cursor-pointer">
                  <input
                    type="checkbox"
                    checked={profile.isUnemployed}
                    onChange={(e) => setProfile({ ...profile, isUnemployed: e.target.checked })}
                    className="w-4 h-4 text-[#0F1A2B] accent-[#0F1A2B] rounded border-[#BDC4D4] focus:ring-[#52677D]"
                  />
                  <span>🔍 Unemployed / Job Seeker</span>
                </label>

                <label className="flex items-center gap-2 text-sm text-[#0F1A2B] cursor-pointer">
                  <input
                    type="checkbox"
                    checked={profile.isArtisan}
                    onChange={(e) => setProfile({ ...profile, isArtisan: e.target.checked })}
                    className="w-4 h-4 text-[#0F1A2B] accent-[#0F1A2B] rounded border-[#BDC4D4] focus:ring-[#52677D]"
                  />
                  <span>🎨 Artisan / Weaver / Traditional Craftsperson</span>
                </label>

                <label className="flex items-center gap-2 text-sm text-[#0F1A2B] cursor-pointer">
                  <input
                    type="checkbox"
                    checked={profile.isDisability}
                    onChange={(e) => setProfile({ ...profile, isDisability: e.target.checked })}
                    className="w-4 h-4 text-[#0F1A2B] accent-[#0F1A2B] rounded border-[#BDC4D4] focus:ring-[#52677D]"
                  />
                  <span>♿ Person with Disability (PwD / Divyangjan)</span>
                </label>
              </div>
            </div>
          )}

          {/* Navigation Controls */}
          <div className="flex items-center justify-between pt-4 border-t border-[#BDC4D4]">
            {step > 1 ? (
              <button
                type="button"
                onClick={() => setStep(step - 1)}
                className="group flex items-center gap-1 px-4 py-2 text-xs font-semibold text-[#52677D] hover:text-[#0F1A2B] transition-colors cursor-pointer"
              >
                <ChevronLeft className="w-4 h-4 group-hover:-translate-x-0.5 transition-transform duration-150" /> Back
              </button>
            ) : (
              <div></div>
            )}

            {step < 3 ? (
              <button
                type="button"
                onClick={() => setStep(step + 1)}
                className="group flex items-center gap-1.5 px-5 py-2 bg-[#0F1A2B] hover:bg-[#1C2E4A] active:scale-[0.98] text-[#D1CFC9] rounded-lg text-xs font-semibold shadow-sm hover:shadow transition-all duration-150 cursor-pointer"
              >
                Next <ChevronRight className="w-4 h-4 group-hover:translate-x-0.5 transition-transform duration-150" />
              </button>
            ) : (
              <button
                type="submit"
                className="group flex items-center gap-1.5 px-6 py-2.5 bg-[#0F1A2B] hover:bg-[#1C2E4A] active:scale-[0.98] text-[#D1CFC9] rounded-lg text-xs font-bold shadow-md hover:shadow-lg transition-all duration-150 cursor-pointer"
              >
                <Sparkles className="w-4 h-4 group-hover:scale-110 transition-transform duration-150 text-[#BDC4D4]" /> Find Eligible Schemes
              </button>
            )}
          </div>
        </form>
      </div>
    </div>
  );
};
