
import type { Scheme, EligibilityProfile } from '../types/scheme';

export function matchSchemes(schemes: Scheme[], profile: EligibilityProfile): Scheme[] {
  return schemes.filter(scheme => {
    // State match: Central applies to all, otherwise state must match
    const isCentral = !scheme.state || scheme.level.toLowerCase().includes('central');
    if (profile.state && !isCentral && scheme.state.toLowerCase() !== profile.state.toLowerCase()) {
      return false;
    }

    const text = (scheme.eligibility + ' ' + scheme.description + ' ' + scheme.tags + ' ' + scheme.categories).toLowerCase();

    // Gender check: if female-specific scheme
    if (profile.gender === 'male') {
      if (text.includes('only women') || text.includes('girl child') || text.includes('female only') || text.includes('pregnant women')) {
        return false;
      }
    }

    // Farmer check
    if (profile.isFarmer && (text.includes('farmer') || text.includes('agriculture') || text.includes('crop') || text.includes('kisan'))) {
      return true;
    }

    // Student check
    if (profile.isStudent && (text.includes('student') || text.includes('scholarship') || text.includes('education') || text.includes('school') || text.includes('college'))) {
      return true;
    }

    // Disability check
    if (profile.isDisability && (text.includes('disability') || text.includes('divyang') || text.includes('handicap') || text.includes('pwd'))) {
      return true;
    }

    // BPL check
    if (profile.isBPL && (text.includes('bpl') || text.includes('poverty line') || text.includes('ration card') || text.includes('low income'))) {
      return true;
    }

    // Age / Senior Citizen
    if (typeof profile.age === 'number') {
      if (profile.age >= 60 && (text.includes('senior citizen') || text.includes('old age') || text.includes('pension'))) {
        return true;
      }
      if (profile.age < 18 && (text.includes('children') || text.includes('child') || text.includes('minor'))) {
        return true;
      }
    }

    // Caste Category check
    if (profile.casteCategory && profile.casteCategory !== 'General' && profile.casteCategory !== 'All') {
      if (text.includes(profile.casteCategory.toLowerCase())) {
        return true;
      }
    }

    // Occupation keywords
    if (profile.occupation && text.includes(profile.occupation.toLowerCase())) {
      return true;
    }

    // Default match if it is general welfare in their state or central
    return text.includes('citizen') || text.includes('individual') || text.includes('resident') || isCentral;
  });
}
