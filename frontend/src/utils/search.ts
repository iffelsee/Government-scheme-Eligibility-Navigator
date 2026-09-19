import type { Scheme } from '../types';

/**
 * Computes Levenshtein edit distance between two strings.
 */
export function levenshtein(a: string, b: string): number {
  if (a === b) return 0;
  if (!a.length) return b.length;
  if (!b.length) return a.length;

  const matrix: number[][] = [];
  for (let i = 0; i <= b.length; i++) {
    matrix[i] = [i];
  }
  for (let j = 0; j <= a.length; j++) {
    matrix[0][j] = j;
  }

  for (let i = 1; i <= b.length; i++) {
    for (let j = 1; j <= a.length; j++) {
      if (b.charAt(i - 1) === a.charAt(j - 1)) {
        matrix[i][j] = matrix[i - 1][j - 1];
      } else {
        matrix[i][j] = Math.min(
          matrix[i - 1][j - 1] + 1, // substitution
          matrix[i][j - 1] + 1,     // insertion
          matrix[i - 1][j] + 1      // deletion
        );
      }
    }
  }
  return matrix[b.length][a.length];
}

const STOP_WORDS = new Set([
  'a', 'an', 'and', 'are', 'as', 'at', 'be', 'by', 'for', 'from',
  'has', 'he', 'in', 'is', 'it', 'its', 'of', 'on', 'that', 'the',
  'to', 'was', 'were', 'will', 'with'
]);

/**
 * Splits text into normalized alphanumeric tokens.
 */
export function tokenize(text: string): string[] {
  if (!text) return [];
  return text
    .toLowerCase()
    .replace(/[^\w\s]/g, ' ')
    .split(/\s+/)
    .filter((t) => t.length > 0);
}

/**
 * Matches a single query token against an array of words in a field.
 * Returns a score between 0.0 (no match) and 1.0 (exact match).
 */
export function matchTokenInWords(token: string, words: string[]): number {
  let bestScore = 0;
  for (const word of words) {
    // Exact word match
    if (word === token) {
      return 1.0;
    }

    // Prefix match: scheme word starts with query token (e.g. "ariv" -> "arivu", "educat" -> "education")
    if (token.length >= 3 && word.startsWith(token)) {
      const score = 0.85;
      if (score > bestScore) bestScore = score;
    }
    // Inflection match: query token starts with scheme word (e.g. "scholarships" -> "scholar")
    else if (word.length >= 4 && token.startsWith(word) && token.length - word.length <= 3) {
      const score = 0.8;
      if (score > bestScore) bestScore = score;
    }
    // Substring match: scheme word contains query token
    else if (token.length >= 4 && word.includes(token)) {
      const score = 0.7;
      if (score > bestScore) bestScore = score;
    }
    // Fuzzy Levenshtein match: handle minor typos/spelling variations
    else if (token.length >= 4 && word.length >= 4 && Math.abs(token.length - word.length) <= 2) {
      const maxDist = token.length <= 5 ? 1 : 2;
      const dist = levenshtein(token, word);
      if (dist <= maxDist) {
        const similarity = 1.0 - dist / Math.max(token.length, word.length);
        const score = similarity * 0.75;
        if (score > bestScore) bestScore = score;
      }
    }
  }
  return bestScore;
}

interface SchemeField {
  name: string;
  text: string;
  weight: number;
}

/**
 * Calculates a relevance score for a given scheme against a search query.
 * Higher scores indicate stronger relevance.
 * Returns 0 if the query does not match.
 */
export function scoreScheme(scheme: Scheme, query: string): number {
  const cleanQuery = query.trim().toLowerCase();
  if (!cleanQuery) return 0;

  const rawTokens = tokenize(cleanQuery);
  if (rawTokens.length === 0) return 0;

  // Filter stop-words if multi-word query
  const queryTokens = rawTokens.length > 1
    ? rawTokens.filter((t) => !STOP_WORDS.has(t) || rawTokens.length <= 2)
    : rawTokens;

  // Field definitions with weights
  const fields: SchemeField[] = [
    { name: 'scheme_name', text: scheme.scheme_name || '', weight: 150 },
    { name: 'short_title', text: scheme.short_title || '', weight: 120 },
    { name: 'tags', text: scheme.tags || '', weight: 70 },
    { name: 'categories', text: `${scheme.categories || ''} ${scheme.subcategories || ''}`, weight: 50 },
    { name: 'benefits', text: scheme.benefits || '', weight: 40 },
    { name: 'brief_description', text: scheme.brief_description || '', weight: 30 },
    { name: 'description', text: scheme.description || '', weight: 20 },
    { name: 'eligibility', text: scheme.eligibility || '', weight: 15 },
    { name: 'department', text: scheme.department || '', weight: 10 },
  ];

  // Pre-tokenize fields
  const fieldWords = fields.map((f) => ({
    ...f,
    words: tokenize(f.text),
    lowerText: (f.text || '').toLowerCase(),
  }));

  let totalScore = 0;
  const tokenMatchedAnywhere = new Array(queryTokens.length).fill(false);
  const tokenMatchedInName = new Array(queryTokens.length).fill(false);

  // Exact full query phrase matches
  const nameField = fieldWords.find((f) => f.name === 'scheme_name');
  if (nameField) {
    if (nameField.lowerText === cleanQuery) {
      totalScore += 2500; // Perfect full name match
    } else if (nameField.lowerText.includes(cleanQuery)) {
      totalScore += 1000; // Full phrase in name
    }
  }

  // Check token matches across fields
  for (let i = 0; i < queryTokens.length; i++) {
    const qt = queryTokens[i];
    let bestTokenScore = 0;

    for (const field of fieldWords) {
      if (!field.words.length) continue;
      const matchQuality = matchTokenInWords(qt, field.words);
      if (matchQuality > 0) {
        tokenMatchedAnywhere[i] = true;
        if (field.name === 'scheme_name') {
          tokenMatchedInName[i] = true;
        }
        const fieldScore = matchQuality * field.weight;
        if (fieldScore > bestTokenScore) {
          bestTokenScore = fieldScore;
        }
      }
    }
    totalScore += bestTokenScore;
  }

  // Token coverage
  const matchedTokensCount = tokenMatchedAnywhere.filter(Boolean).length;
  if (matchedTokensCount === 0) return 0;

  const coverageRatio = matchedTokensCount / queryTokens.length;

  // Boost when all tokens matched
  if (coverageRatio === 1) {
    totalScore *= 2.5;

    // Extra boost if all tokens are in scheme_name
    const allInName = tokenMatchedInName.every(Boolean);
    if (allInName) {
      totalScore += 800;
    }
  } else {
    // Penalize missing tokens proportionally
    totalScore *= Math.pow(coverageRatio, 1.8);
  }

  return totalScore;
}

/**
 * Searches and ranks schemes based on query relevance.
 */
export function searchSchemes(schemes: Scheme[], query: string): Scheme[] {
  return schemes
    .map((scheme) => ({ scheme, score: scoreScheme(scheme, query) }))
    .filter((item) => item.score > 0)
    .sort((a, b) => b.score - a.score)
    .map((item) => item.scheme);
}
