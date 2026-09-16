
import type { Scheme, MatchResult, QuestionnaireAnswers } from '../types';
import rawSchemes from '../data/schemes.json';

const allSchemes = rawSchemes as Scheme[];

export function evaluateEligibilityEngine(answers: QuestionnaireAnswers): MatchResult[] {
  const results: MatchResult[] = [];

  for (const scheme of allSchemes) {
    let score = 0;
    const reasons: string[] = [];

    const isCentral = !scheme.state || scheme.level.toLowerCase().includes('central');
    const text = (
      scheme.scheme_name + ' ' +
      scheme.categories + ' ' +
      scheme.tags + ' ' +
      scheme.eligibility + ' ' +
      scheme.description + ' ' +
      scheme.beneficiaries
    ).toLowerCase();

    // 1. Geographic eligibility
    if (answers.state) {
      if (scheme.state && scheme.state.toLowerCase() === answers.state.toLowerCase()) {
        score += 30;
        reasons.push(`Specifically for residents of ${answers.state}`);
      } else if (isCentral) {
        score += 25;
        reasons.push('Pan-India Central Government Scheme');
      } else {
        // State mismatch for state-specific scheme
        continue;
      }
    } else {
      score += 20;
    }

    // 2. Category interest
    if (answers.categoryInterest && answers.categoryInterest !== 'all') {
      if (scheme.categories.toLowerCase().includes(answers.categoryInterest.toLowerCase())) {
        score += 25;
        reasons.push(`Matches your interest in ${answers.categoryInterest}`);
      }
    }

    // 3. Gender specific filters
    if (answers.gender === 'male') {
      if (text.includes('female only') || text.includes('girl child') || text.includes('pregnant women') || text.includes('widow')) {
        continue;
      }
    } else if (answers.gender === 'female') {
      if (text.includes('women') || text.includes('girl') || text.includes('mahila') || text.includes('maternity')) {
        score += 25;
        reasons.push('Special provisions & benefits for women');
      }
    }

    // 4. Occupation & Special criteria
    if (answers.isFarmer && (text.includes('farmer') || text.includes('kisan') || text.includes('agriculture') || text.includes('crop'))) {
      score += 35;
      reasons.push('Targeted support for farmers & agricultural livelihoods');
    }

    if (answers.isStudent && (text.includes('student') || text.includes('scholarship') || text.includes('education') || text.includes('school') || text.includes('college'))) {
      score += 35;
      reasons.push('Educational grants, fee waivers, or student scholarships');
    }

    if (answers.isDisability && (text.includes('disability') || text.includes('divyang') || text.includes('pwd') || text.includes('handicap'))) {
      score += 40;
      reasons.push('Assistive support for Persons with Disabilities (PwD)');
    }

    if (answers.isBPL && (text.includes('bpl') || text.includes('poverty') || text.includes('ration card') || text.includes('economically weaker') || text.includes('antyodaya'))) {
      score += 30;
      reasons.push('Priority welfare for BPL / low-income households');
    }

    // 5. Age evaluation
    if (typeof answers.age === 'number' && answers.age > 0) {
      if (answers.age >= 60 && (text.includes('senior citizen') || text.includes('old age') || text.includes('pension'))) {
        score += 35;
        reasons.push('Special benefits for senior citizens (60+ years)');
      } else if (answers.age < 25 && (text.includes('youth') || text.includes('skill') || text.includes('employment') || text.includes('trainee'))) {
        score += 20;
        reasons.push('Youth skill development & apprenticeship initiative');
      }
    }

    // 6. Caste category match
    if (answers.casteCategory && answers.casteCategory !== 'General' && answers.casteCategory !== 'All') {
      if (text.includes(answers.casteCategory.toLowerCase())) {
        score += 30;
        reasons.push(`Reserved benefits for ${answers.casteCategory} community`);
      }
    }

    // 7. General citizen applicability
    if (reasons.length === 0) {
      if (text.includes('citizen') || text.includes('individual') || text.includes('resident') || text.includes('all workers')) {
        score += 15;
        reasons.push('Broad eligibility for eligible residents');
      }
    }

    if (reasons.length > 0 && score >= 20) {
      results.push({
        scheme,
        matchType: score >= 50 ? 'STRONG_MATCH' : 'POSSIBLE_MATCH',
        matchScore: score,
        matchReasons: reasons.slice(0, 3),
      });
    }
  }

  // Sort: Strongest matches first
  return results.sort((a, b) => b.matchScore - a.matchScore);
}
