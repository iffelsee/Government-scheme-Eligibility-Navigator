
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

export interface EligibilityProfile {
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
  isGovernmentEmployee?: boolean;
  isPrivateEmployee?: boolean;
  isEntrepreneur?: boolean;
  isDailyWage?: boolean;
  isUnemployed?: boolean;
  isArtisan?: boolean;
}
