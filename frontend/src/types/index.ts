
export interface Scheme {
  slug: string;
  scheme_id: string;
  scheme_name: string;
  short_title: string;
  state: string;
  department: string;
  level: string;
  categories: string;
  subcategories: string;
  tags: string;
  beneficiaries: string;
  brief_description: string;
  description: string;
  benefits: string;
  eligibility: string;
  application_process: string;
  documents: string;
  references: string;
  faqs: string;
  applyUrl?: string;
  officialWebsite?: string;
  guidelinesUrl?: string;
  applicationType?: 'online' | 'form' | 'portal' | 'offline';
  isApplicationAvailable?: boolean;
}

export type MatchType = 'STRONG_MATCH' | 'POSSIBLE_MATCH';

export interface MatchResult {
  scheme: Scheme;
  matchType: MatchType;
  matchScore: number;
  matchReasons: string[];
}

export interface QuestionnaireAnswers {
  state: string;
  gender: string;
  age: number | '';
  casteCategory: string;
  annualIncome: string;
  occupation: string;
  isStudent: boolean;
  isFarmer: boolean;
  isDisability: boolean;
  isBPL: boolean;
  categoryInterest?: string;
  isGovernmentEmployee?: boolean;
  isPrivateEmployee?: boolean;
  isEntrepreneur?: boolean;
  isDailyWage?: boolean;
  isUnemployed?: boolean;
  isArtisan?: boolean;
}

export interface QuestionOption {
  label: string;
  value: string;
  description?: string;
}

export interface Question {
  id: keyof QuestionnaireAnswers;
  title: string;
  subtitle: string;
  type: 'select' | 'radio' | 'number' | 'boolean' | 'multiselect';
  options?: QuestionOption[];
}

export interface CategoryInfo {
  id: string;
  slug: string;
  name: string;
  icon: string;
  description: string;
  schemesCount: number;
}

export interface User {
  id: string;
  name: string;
  email: string;
  state?: string;
  casteCategory?: string;
  occupation?: string;
}
