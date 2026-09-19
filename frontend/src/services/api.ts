
import type { Scheme, MatchResult, QuestionnaireAnswers, CategoryInfo, Question } from '../types';
import rawSchemes from '../data/schemes.json';
import { evaluateEligibilityEngine } from './mockEngine';
import { resolveSchemeUrls } from '../utils/schemeUrls';

const schemes = (rawSchemes as Scheme[]).map(resolveSchemeUrls);

const CATEGORIES_DATA: CategoryInfo[] = [
  {
    id: 'agriculture',
    slug: 'agriculture',
    name: 'Agriculture & Rural',
    icon: '🌾',
    description: 'Crop insurance, farmer income support, seeds, fertilizers, and irrigation subsidies.',
    schemesCount: schemes.filter(s => s.categories.toLowerCase().includes('agriculture')).length || 18,
  },
  {
    id: 'education',
    slug: 'education',
    name: 'Education & Learning',
    icon: '🎓',
    description: 'Pre-matric and post-matric scholarships, fee concessions, hostel aid, and loan subsidies.',
    schemesCount: schemes.filter(s => s.categories.toLowerCase().includes('education')).length || 24,
  },
  {
    id: 'health',
    slug: 'health',
    name: 'Healthcare & Wellness',
    icon: '🏥',
    description: 'Medical insurance, tertiary hospital treatment coverage, maternal care, and free medicines.',
    schemesCount: schemes.filter(s => s.categories.toLowerCase().includes('health')).length || 14,
  },
  {
    id: 'housing',
    slug: 'housing',
    name: 'Housing & Shelter',
    icon: '🏠',
    description: 'Pucca house construction subsidies, affordable urban housing loans, and sanitation assistance.',
    schemesCount: schemes.filter(s => s.categories.toLowerCase().includes('housing')).length || 12,
  },
  {
    id: 'women',
    slug: 'women-and-child',
    name: 'Women & Child Welfare',
    icon: '👩👧',
    description: 'Direct cash assistance, nutrition programs, motherhood support, and girl child education.',
    schemesCount: schemes.filter(s => s.categories.toLowerCase().includes('women')).length || 16,
  },
  {
    id: 'skills',
    slug: 'skills-and-employment',
    name: 'Skills & Employment',
    icon: '💼',
    description: 'Vocational training stipends, free toolkits, startup seed funds, and job placement assistance.',
    schemesCount: schemes.filter(s => s.categories.toLowerCase().includes('skills')).length || 20,
  },
  {
    id: 'banking',
    slug: 'banking-and-finance',
    name: 'Banking & Finance',
    icon: '💰',
    description: 'Collateral-free business loans, zero-balance savings, pension plans, and accident insurance.',
    schemesCount: schemes.filter(s => s.categories.toLowerCase().includes('banking')).length || 15,
  },
  {
    id: 'social',
    slug: 'social-welfare',
    name: 'Social Welfare & Empowerment',
    icon: '♿',
    description: 'Disability stipends, senior citizen pensions, community empowerment, and rehabilitation aid.',
    schemesCount: schemes.filter(s => s.categories.toLowerCase().includes('social')).length || 22,
  },
];

const QUESTIONS_DATA: Question[] = [
  {
    id: 'state',
    title: 'Where do you live?',
    subtitle: 'Select your state or union territory to find state-specific welfare benefits.',
    type: 'select',
  },
  {
    id: 'age',
    title: 'What is your age?',
    subtitle: 'Many government schemes have age-specific criteria for youth, children, or senior citizens.',
    type: 'number',
  },
  {
    id: 'gender',
    title: 'What is your gender?',
    subtitle: 'Certain schemes are exclusively dedicated to women, girl children, or specific groups.',
    type: 'radio',
    options: [
      { label: 'Female', value: 'female', description: 'Access women-centric welfare & maternity schemes' },
      { label: 'Male', value: 'male', description: 'General & occupational schemes' },
      { label: 'Transgender', value: 'transgender', description: 'Access dedicated empowerment welfare' },
      { label: 'Prefer not to say', value: 'all', description: 'Show all applicable schemes' },
    ],
  },
  {
    id: 'casteCategory',
    title: 'Which social category do you belong to?',
    subtitle: 'Government schemes frequently provide reservation or fee concessions for specific social categories.',
    type: 'radio',
    options: [
      { label: 'General', value: 'General' },
      { label: 'OBC (Other Backward Classes)', value: 'OBC' },
      { label: 'SC (Scheduled Caste)', value: 'SC' },
      { label: 'ST (Scheduled Tribe)', value: 'ST' },
      { label: 'EWS (Economically Weaker Section)', value: 'EWS' },
    ],
  },
  {
    id: 'annualIncome',
    title: 'What is your approximate family annual income?',
    subtitle: 'Income criteria determines eligibility for subsidized housing, scholarships, and free healthcare.',
    type: 'radio',
    options: [
      { label: 'Under ₹1,00,000 / year', value: 'low', description: 'Eligible for maximum welfare & BPL benefits' },
      { label: '₹1,00,000 to ₹3,00,000 / year', value: 'mid', description: 'Eligible for major subsidy & scholarship bands' },
      { label: '₹3,00,000 to ₹8,00,000 / year', value: 'upper_mid', description: 'Eligible for EWS, credit-linked housing loans' },
      { label: 'Above ₹8,00,000 / year', value: 'high', description: 'General welfare, tax benefits, and loans' },
    ],
  },
  {
    id: 'occupation',
    title: 'What best describes your current profile?',
    subtitle: 'Select any special profile status that applies to you.',
    type: 'multiselect',
  },
];

export const api = {
  // Get all schemes
  async getAllSchemes(): Promise<Scheme[]> {
    return Promise.resolve(schemes);
  },

  // Get categories
  async getCategories(): Promise<CategoryInfo[]> {
    return Promise.resolve(CATEGORIES_DATA);
  },

  // Get popular schemes by category
  async getPopularSchemesByCategory(categorySlug: string): Promise<Scheme[]> {
    const words = categorySlug.split('-').filter(w => w !== 'and');
    const filtered = schemes.filter(s => words.some(w => s.categories.toLowerCase().includes(w)));
    return Promise.resolve(filtered.slice(0, 6));
  },

  // Get all schemes by category
  async getSchemesByCategory(categorySlug: string): Promise<Scheme[]> {
    const words = categorySlug.split('-').filter(w => w !== 'and');
    const filtered = schemes.filter(s => words.some(w => s.categories.toLowerCase().includes(w)));
    return Promise.resolve(filtered);
  },

  // Get question definitions
  async getQuestions(): Promise<Question[]> {
    return Promise.resolve(QUESTIONS_DATA);
  },

  // Get scheme by slug
  async getSchemeBySlug(slug: string): Promise<Scheme | null> {
    const found = schemes.find(s => s.slug === slug);
    return Promise.resolve(found || null);
  },

  // Core rule: Frontend delegates eligibility evaluation to the backend API service
  async submitQuestionnaire(answers: QuestionnaireAnswers): Promise<MatchResult[]> {
    // Simulated network delay for realism
    await new Promise(r => setTimeout(r, 400));
    return evaluateEligibilityEngine(answers);
  },

  // Get featured schemes for homepage
  async getFeaturedSchemes(): Promise<Scheme[]> {
    return Promise.resolve(schemes.slice(0, 6));
  },

  // Get curated flagship schemes across varied sectors for the homepage carousel
  async getCarouselSchemes(): Promise<Scheme[]> {
    const selectedSlugs = [
      'ab-pmjay',       // Health & Wellness: Ayushman Bharat
      'aaby',           // Social Welfare: Aam Aadmi Bima Yojana
      'aay-goa',        // Housing & Shelter: Atal Asra Yojana
      'aabssobpmbos',   // Agriculture: Advanced Animal Breeding Scheme
      '15dsugt',        // Skills & Employment: 15 Days Skill Up-gradation Training
      'a-pudu',         // Women & Child: ARAVANAIPPU
      'aaelss',         // Education & Banking: Assam Abhinandan Education Loan Subsidy
      '25-ciss',        // Business & Entrepreneurship: 25% Capital Investment Subsidy
    ];
    const found = selectedSlugs
      .map(slug => schemes.find(s => s.slug === slug))
      .filter(Boolean) as Scheme[];

    return Promise.resolve(found.length > 0 ? found : schemes.slice(0, 8));
  },

  // Get all unique states
  async getAvailableStates(): Promise<string[]> {
    const set = new Set<string>();
    schemes.forEach(s => {
      if (s.state && s.state.trim()) set.add(s.state.trim());
    });
    return Promise.resolve(Array.from(set).sort());
  }
};
