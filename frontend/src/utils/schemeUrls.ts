import type { Scheme } from '../types';

export interface SchemeUrlInfo {
  applyUrl?: string;
  officialWebsite?: string;
  guidelinesUrl?: string;
  applicationType: 'online' | 'form' | 'portal' | 'offline';
  applyLabel?: string;
  isApplicationAvailable: boolean;
}

/**
 * Known broken, 404, or discontinued URLs identified in the dataset.
 * When a scheme references these URLs, they are excluded from being used as valid apply links.
 */
export const KNOWN_BROKEN_URLS = new Set<string>([
  'https://tribalwelfare.goa.gov.in/attachments/article/45/ATAL%20ASRA%20FORM%20(New).pdf',
  'https://tribalwelfare.goa.gov.in/attachments/article/45/ATAL ASRA FORM (New).pdf',
  'https://cms.tn.gov.in/sites/default/files/gos/tour-e-3-2008.pdf',
  'https://www.jkbocw.gov.in/downloads/circ.pdf',
  'https://ksb.gov.in/writereaddata/DownLoad/M-1.pdf',
  'https://sso.rajasthan.gov.in/register',
  'https://industry.py.gov.in/common-application-subsidies',
  'https://shikshaportal.mp.gov.in/',
  'https://bcdd.kerala.gov.in/wp-content/uploads/2021/07/pdf-3.pdf',
  'https://labour.mp.gov.in/Public/Registration/BeneficiaryRegistrationRequest.aspx',
  'https://wcd.py.gov.in/sites/default/files/aravanaippu-appl-tamil.pdf'
]);

/**
 * Safely cleans and encodes a URL string.
 */
export function sanitizeUrl(urlStr: string): string | undefined {
  if (!urlStr) return undefined;
  const trimmed = urlStr.trim().replace(/[>)"',;]+$/, '');
  if (!/^https?:\/\//i.test(trimmed)) return undefined;

  try {
    const parsed = new URL(trimmed);
    return parsed.href;
  } catch {
    return encodeURI(trimmed);
  }
}

/**
 * Parses and resolves scheme-specific URLs from references and application process text.
 * Never invents URLs or defaults to generic aggregate portals like MyScheme.
 * Validates against known broken/404 URLs and searches for working alternatives in data.
 */
export function resolveSchemeUrls(scheme: Scheme): Scheme {
  // If the scheme already has an explicit applyUrl defined and it is not in the broken list, preserve it
  if (scheme.applyUrl && !KNOWN_BROKEN_URLS.has(scheme.applyUrl)) {
    return scheme;
  }

  const refText = scheme.references || '';
  const lines = refText.split('\n').map((l) => l.trim()).filter(Boolean);

  const entries: { label: string; url: string }[] = [];
  lines.forEach((line) => {
    const m = line.match(/^([^:]+):\s*(https?:\/\/.+)$/i);
    if (m) {
      const cleanUrl = sanitizeUrl(m[2]);
      if (cleanUrl) {
        entries.push({ label: m[1].trim(), url: cleanUrl });
      }
    } else {
      const u = line.match(/(https?:\/\/[^\s]+)/i);
      if (u) {
        const cleanUrl = sanitizeUrl(u[1]);
        if (cleanUrl) {
          entries.push({ label: 'Reference', url: cleanUrl });
        }
      }
    }
  });

  // Patterns for explicit application links (portals, forms, direct apply/registration)
  const appPatterns = [
    /online\s*application\s*portal/i,
    /application\s*portal/i,
    /application\s*form/i,
    /\bapply\b/i,
    /\bregistration\b/i,
    /login\s*&\s*apply/i,
    /steps\s*to\s*apply/i,
    /user\s*manual.*application/i,
    /sanman\s*portal/i,
    /antyodaya-saral\s*portal/i,
    /national\s*scholarship\s*portal/i,
    /scheme\s*apply/i,
    /\blogin\b/i,
  ];

  // Patterns for official department / state portals (when not an application page)
  const portalPatterns = [
    /official\s*website/i,
    /\bwebsite\b/i,
    /\bportal\b/i,
    /department/i,
  ];

  let applyUrl: string | undefined;
  let applyLabel: string | undefined;

  // 1. First priority: Check references for explicit application URLs (skipping known broken ones)
  for (const pat of appPatterns) {
    const candidates = entries.filter((e) => pat.test(e.label));
    for (const cand of candidates) {
      if (!KNOWN_BROKEN_URLS.has(cand.url)) {
        applyUrl = cand.url;
        applyLabel = cand.label;
        break;
      }
    }
    if (applyUrl) break;
  }

  // 2. Second priority: If no valid application URL in references, check application_process
  if (!applyUrl && scheme.application_process) {
    const procUrls = scheme.application_process.match(/https?:\/\/[^\s)",]+/g) || [];
    for (const rawUrl of procUrls) {
      if (/register|login|apply|applicantCorner|BeneficiaryForms|RegistrationRequest/i.test(rawUrl)) {
        const clean = sanitizeUrl(rawUrl);
        if (clean && !KNOWN_BROKEN_URLS.has(clean)) {
          applyUrl = clean;
          applyLabel = 'Official Application Portal';
          break;
        }
      }
    }
  }

  // 3. Official Website / Department Portal (kept separate so we do NOT pretend it is an application page)
  let officialWebsite: string | undefined;
  for (const pat of portalPatterns) {
    const found = entries.find((e) => pat.test(e.label));
    if (found && found.url !== applyUrl && !KNOWN_BROKEN_URLS.has(found.url)) {
      officialWebsite = found.url;
      break;
    }
  }

  // 4. Guidelines URL
  const guidelineRef = entries.find((e) =>
    /guideline|charter|details|notification|standard\s*operating\s*procedure/i.test(e.label)
  );
  const guidelinesUrl = guidelineRef && !KNOWN_BROKEN_URLS.has(guidelineRef.url) ? guidelineRef.url : undefined;

  // Determine application type and availability
  let applicationType: 'online' | 'form' | 'portal' | 'offline' = 'offline';
  const isApplicationAvailable = Boolean(applyUrl);

  if (applyUrl) {
    const isForm =
      /\.pdf|\.doc|\.docx/i.test(applyUrl) ||
      (applyLabel ? /form/i.test(applyLabel) : false);
    applicationType = isForm ? 'form' : 'online';
  } else if (officialWebsite) {
    applicationType = 'portal';
  }

  return {
    ...scheme,
    applyUrl,
    officialWebsite,
    guidelinesUrl,
    applicationType,
    isApplicationAvailable,
  };
}
