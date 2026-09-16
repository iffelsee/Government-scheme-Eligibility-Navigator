
import { useState, useEffect } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import type { QuestionnaireAnswers } from '../types';
import { api } from '../services/api';
import { ProgressBar } from '../components/common/ProgressBar';
import { Button } from '../components/common/Button';
import { ArrowLeft, ArrowRight, ShieldCheck, Check } from 'lucide-react';

export const Questionnaire = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const categoryParam = searchParams.get('category') || '';

  const [availableStates, setAvailableStates] = useState<string[]>([]);
  const [currentStep, setCurrentStep] = useState(1);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const [answers, setAnswers] = useState<QuestionnaireAnswers>({
    state: '',
    gender: 'female',
    age: 25,
    casteCategory: 'General',
    annualIncome: 'mid',
    occupation: 'Student',
    isStudent: false,
    isFarmer: false,
    isDisability: false,
    isBPL: false,
    categoryInterest: categoryParam,
  });

  useEffect(() => {
    api.getAvailableStates().then(setAvailableStates);
  }, []);

  const totalSteps = 6;

  const handleNext = () => {
    if (currentStep < totalSteps) {
      setCurrentStep(currentStep + 1);
    } else {
      handleSubmit();
    }
  };

  const handleBack = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
    } else {
      navigate(-1);
    }
  };

  const handleSubmit = async () => {
    setIsSubmitting(true);
    try {
      // Save answers in session/local storage
      sessionStorage.setItem('scheme_navigator_answers', JSON.stringify(answers));
      // Dispatch to API
      const results = await api.submitQuestionnaire(answers);
      sessionStorage.setItem('scheme_navigator_results', JSON.stringify(results));
      navigate('/results?source=questionnaire');
    } catch (e) {
      console.error(e);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 py-8 px-4 sm:px-6 lg:px-8 flex flex-col justify-center">
      <div className="max-w-2xl mx-auto w-full">
        {/* Navigation Top Header */}
        <div className="mb-6 flex items-center justify-between">
          <button
            onClick={handleBack}
            className="inline-flex items-center gap-1.5 text-xs font-bold text-slate-600 hover:text-slate-900 cursor-pointer"
          >
            <ArrowLeft className="w-4 h-4" /> Back
          </button>

          <div className="flex items-center gap-1.5 text-xs font-bold text-blue-700 bg-blue-50 px-3 py-1 rounded-full">
            <ShieldCheck className="w-3.5 h-3.5" />
            <span>Eligibility Questionnaire</span>
          </div>
        </div>

        {/* Progress Bar Card */}
        <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-sm mb-6">
          <ProgressBar currentStep={currentStep} totalSteps={totalSteps} />
        </div>

        {/* Question Interactive Screen */}
        <div className="bg-white rounded-3xl border border-slate-200 p-8 sm:p-10 shadow-lg mb-6">
          {/* Step 1: State */}
          {currentStep === 1 && (
            <div className="space-y-6">
              <div>
                <span className="text-xs font-bold uppercase tracking-wider text-blue-600">Location</span>
                <h2 className="text-2xl font-extrabold text-slate-900 mt-1">
                  Which State or UT do you live in?
                </h2>
                <p className="text-xs text-slate-500 mt-1">
                  State-sponsored schemes require residency in that particular state.
                </p>
              </div>

              <div>
                <select
                  value={answers.state}
                  onChange={(e) => setAnswers({ ...answers, state: e.target.value })}
                  className="w-full p-4 text-base border border-slate-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:outline-none bg-slate-50 font-medium"
                >
                  <option value="">All India / Central Schemes Only</option>
                  {availableStates.map((s) => (
                    <option key={s} value={s}>
                      {s}
                    </option>
                  ))}
                </select>
              </div>
            </div>
          )}

          {/* Step 2: Age */}
          {currentStep === 2 && (
            <div className="space-y-6">
              <div>
                <span className="text-xs font-bold uppercase tracking-wider text-blue-600">Demographics</span>
                <h2 className="text-2xl font-extrabold text-slate-900 mt-1">
                  What is your age?
                </h2>
                <p className="text-xs text-slate-500 mt-1">
                  Enter your age in years (e.g. 18, 25, 60).
                </p>
              </div>

              <div className="max-w-xs">
                <input
                  type="number"
                  min="1"
                  max="120"
                  value={answers.age}
                  onChange={(e) => setAnswers({ ...answers, age: e.target.value ? Number(e.target.value) : '' })}
                  className="w-full p-4 text-2xl font-bold border border-slate-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:outline-none text-center"
                  placeholder="25"
                  autoFocus
                />
              </div>
            </div>
          )}

          {/* Step 3: Gender */}
          {currentStep === 3 && (
            <div className="space-y-6">
              <div>
                <span className="text-xs font-bold uppercase tracking-wider text-blue-600">Demographics</span>
                <h2 className="text-2xl font-extrabold text-slate-900 mt-1">
                  What is your gender?
                </h2>
                <p className="text-xs text-slate-500 mt-1">
                  Women and girl children have access to targeted grants and maternity schemes.
                </p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {[
                  { value: 'female', label: 'Female', desc: 'Maternity, girl child scholarships, women entrepreneurship' },
                  { value: 'male', label: 'Male', desc: 'General & occupational schemes' },
                  { value: 'transgender', label: 'Transgender', desc: 'Special transgender empowerment programs' },
                  { value: 'all', label: 'Any / Prefer not to say', desc: 'Show all generic schemes' },
                ].map((opt) => (
                  <button
                    key={opt.value}
                    type="button"
                    onClick={() => setAnswers({ ...answers, gender: opt.value })}
                    className={`p-4 rounded-2xl border text-left transition-all cursor-pointer ${
                      answers.gender === opt.value
                        ? 'border-blue-600 bg-blue-50/70 ring-2 ring-blue-500/20'
                        : 'border-slate-200 hover:border-slate-300 bg-white'
                    }`}
                  >
                    <div className="flex items-center justify-between">
                      <span className="font-bold text-slate-900 text-sm">{opt.label}</span>
                      {answers.gender === opt.value && <Check className="w-4 h-4 text-blue-600" />}
                    </div>
                    <p className="text-xs text-slate-500 mt-1">{opt.desc}</p>
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Step 4: Social Category */}
          {currentStep === 4 && (
            <div className="space-y-6">
              <div>
                <span className="text-xs font-bold uppercase tracking-wider text-blue-600">Socio-Economic</span>
                <h2 className="text-2xl font-extrabold text-slate-900 mt-1">
                  Social Category / Caste
                </h2>
                <p className="text-xs text-slate-500 mt-1">
                  Required for reservations, scholarship bands, and subsidized loan schemes.
                </p>
              </div>

              <div className="space-y-2.5">
                {[
                  { value: 'General', label: 'General Category' },
                  { value: 'OBC', label: 'OBC (Other Backward Classes)' },
                  { value: 'SC', label: 'SC (Scheduled Caste)' },
                  { value: 'ST', label: 'ST (Scheduled Tribe)' },
                  { value: 'EWS', label: 'EWS (Economically Weaker Section)' },
                ].map((opt) => (
                  <button
                    key={opt.value}
                    type="button"
                    onClick={() => setAnswers({ ...answers, casteCategory: opt.value })}
                    className={`w-full p-4 rounded-xl border text-left flex items-center justify-between transition-all cursor-pointer ${
                      answers.casteCategory === opt.value
                        ? 'border-blue-600 bg-blue-50 text-blue-900 font-bold ring-2 ring-blue-500/20'
                        : 'border-slate-200 hover:border-slate-300 text-slate-700 font-medium'
                    }`}
                  >
                    <span className="text-sm">{opt.label}</span>
                    {answers.casteCategory === opt.value && <Check className="w-4 h-4 text-blue-600" />}
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Step 5: Income & BPL */}
          {currentStep === 5 && (
            <div className="space-y-6">
              <div>
                <span className="text-xs font-bold uppercase tracking-wider text-blue-600">Financial Profile</span>
                <h2 className="text-2xl font-extrabold text-slate-900 mt-1">
                  Family Annual Income
                </h2>
                <p className="text-xs text-slate-500 mt-1">
                  Select your approximate total household income bracket.
                </p>
              </div>

              <div className="space-y-3">
                {[
                  { value: 'low', label: 'Under ₹1,00,000 per year', desc: 'Eligible for maximum BPL welfare benefits' },
                  { value: 'mid', label: '₹1,00,000 - ₹3,00,000 per year', desc: 'Eligible for scholarships and housing subsidies' },
                  { value: 'upper_mid', label: '₹3,00,000 - ₹8,00,000 per year', desc: 'Eligible for EWS, MSME loans, and health schemes' },
                  { value: 'high', label: 'Above ₹8,00,000 per year', desc: 'General citizen programs' },
                ].map((opt) => (
                  <button
                    key={opt.value}
                    type="button"
                    onClick={() => setAnswers({ ...answers, annualIncome: opt.value })}
                    className={`w-full p-4 rounded-xl border text-left transition-all cursor-pointer ${
                      answers.annualIncome === opt.value
                        ? 'border-blue-600 bg-blue-50 ring-2 ring-blue-500/20'
                        : 'border-slate-200 hover:border-slate-300 bg-white'
                    }`}
                  >
                    <div className="flex items-center justify-between">
                      <span className="font-bold text-slate-900 text-sm">{opt.label}</span>
                      {answers.annualIncome === opt.value && <Check className="w-4 h-4 text-blue-600" />}
                    </div>
                    <p className="text-xs text-slate-500 mt-1">{opt.desc}</p>
                  </button>
                ))}
              </div>

              <div className="pt-4 border-t border-slate-200">
                <label className="flex items-center gap-3 p-3 bg-slate-50 rounded-xl cursor-pointer">
                  <input
                    type="checkbox"
                    checked={answers.isBPL}
                    onChange={(e) => setAnswers({ ...answers, isBPL: e.target.checked })}
                    className="w-5 h-5 text-blue-600 rounded border-slate-300"
                  />
                  <span className="text-xs sm:text-sm font-semibold text-slate-800">
                    My family holds a BPL / Antyodaya Ration Card
                  </span>
                </label>
              </div>
            </div>
          )}

          {/* Step 6: Occupation & Special Status */}
          {currentStep === 6 && (
            <div className="space-y-6">
              <div>
                <span className="text-xs font-bold uppercase tracking-wider text-blue-600">Occupation & Special Status</span>
                <h2 className="text-2xl font-extrabold text-slate-900 mt-1">
                  Which categories apply to you?
                </h2>
                <p className="text-xs text-slate-500 mt-1">
                  Select all that apply to unlock specialized subsidies and grants.
                </p>
              </div>

              <div className="space-y-3">
                <label className={`flex items-start gap-3 p-4 rounded-xl border cursor-pointer transition-all ${
                  answers.isStudent ? 'border-blue-600 bg-blue-50/50' : 'border-slate-200'
                }`}>
                  <input
                    type="checkbox"
                    checked={answers.isStudent}
                    onChange={(e) => setAnswers({ ...answers, isStudent: e.target.checked })}
                    className="w-5 h-5 mt-0.5 text-blue-600 rounded border-slate-300"
                  />
                  <div>
                    <span className="font-bold text-slate-900 text-sm block">🎓 Student / Enrolled in Education</span>
                    <span className="text-xs text-slate-500">Unlocks scholarships, fee remissions, and laptop/stipend schemes.</span>
                  </div>
                </label>

                <label className={`flex items-start gap-3 p-4 rounded-xl border cursor-pointer transition-all ${
                  answers.isFarmer ? 'border-blue-600 bg-blue-50/50' : 'border-slate-200'
                }`}>
                  <input
                    type="checkbox"
                    checked={answers.isFarmer}
                    onChange={(e) => setAnswers({ ...answers, isFarmer: e.target.checked })}
                    className="w-5 h-5 mt-0.5 text-blue-600 rounded border-slate-300"
                  />
                  <div>
                    <span className="font-bold text-slate-900 text-sm block">🌾 Farmer / Agriculture Worker</span>
                    <span className="text-xs text-slate-500">Unlocks PM Kisan, fertilizer subsidies, seeds, and equipment grants.</span>
                  </div>
                </label>

                <label className={`flex items-start gap-3 p-4 rounded-xl border cursor-pointer transition-all ${
                  answers.isDisability ? 'border-blue-600 bg-blue-50/50' : 'border-slate-200'
                }`}>
                  <input
                    type="checkbox"
                    checked={answers.isDisability}
                    onChange={(e) => setAnswers({ ...answers, isDisability: e.target.checked })}
                    className="w-5 h-5 mt-0.5 text-blue-600 rounded border-slate-300"
                  />
                  <div>
                    <span className="font-bold text-slate-900 text-sm block">♿ Person with Disability (PwD / Divyangjan)</span>
                    <span className="text-xs text-slate-500">Unlocks assistive aids, pensions, and specialized quotas.</span>
                  </div>
                </label>
              </div>
            </div>
          )}

          {/* Controls */}
          <div className="flex items-center justify-between pt-8 mt-8 border-t border-slate-200">
            <Button variant="ghost" onClick={handleBack} type="button">
              <ArrowLeft className="w-4 h-4" /> Back
            </Button>

            {currentStep < totalSteps ? (
              <Button variant="primary" onClick={handleNext} type="button">
                Next <ArrowRight className="w-4 h-4" />
              </Button>
            ) : (
              <Button
                variant="success"
                onClick={handleSubmit}
                isLoading={isSubmitting}
                type="button"
                className="shadow-lg shadow-emerald-700/20"
              >
                Submit & See Results <ShieldCheck className="w-4 h-4" />
              </Button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
