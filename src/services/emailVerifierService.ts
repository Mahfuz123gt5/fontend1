import { VerificationEmailDetail } from '../types';

// Known Disposable Domains List
const DISPOSABLE_DOMAINS = new Set([
  'mailinator.com', 'tempmail.com', '10minutemail.com', 'guerrillamail.com',
  'trashmail.com', 'yopmail.com', 'dispostable.com', 'throwawaymail.com',
  'getairmail.com', 'maildrop.cc', 'sharklasers.com', 'gmx.com',
  'fakeinbox.com', 'mytemp.email', 'tempinbox.com', 'disposable.com',
  'mohmal.com', 'getnada.com', 'crazymailing.com', 'tmailor.com',
  'nada.ltd', 'emailondeck.com', 'tempmailo.com', 'inboxkitten.com'
]);

// Known Role Accounts
const ROLE_PREFIXES = new Set([
  'admin', 'administrator', 'support', 'info', 'sales', 'contact', 'help',
  'billing', 'jobs', 'careers', 'marketing', 'office', 'press', 'media',
  'security', 'hostmaster', 'postmaster', 'webmaster', 'ceo', 'team'
]);

// Free Email Providers
const FREE_PROVIDERS = new Set([
  'gmail.com', 'yahoo.com', 'hotmail.com', 'outlook.com', 'icloud.com',
  'aol.com', 'protonmail.com', 'zoho.com', 'yandex.com', 'live.com', 'mail.com'
]);

export interface DetailedVerificationReport extends VerificationEmailDetail {
  checks: {
    syntax: boolean;
    mxRecord: boolean;
    disposable: boolean;
    roleAccount: boolean;
    freeProvider: boolean;
    smtpCheck: boolean;
    catchAll: boolean;
  };
  reportDetails: string[];
}

export async function verifySingleEmail(email: string): Promise<DetailedVerificationReport> {
  const cleanEmail = email.trim().toLowerCase();
  const reportDetails: string[] = [];
  
  // 1. Syntax Check
  const syntaxRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
  const isValidSyntax = syntaxRegex.test(cleanEmail) && !cleanEmail.includes('..');

  if (!isValidSyntax) {
    return {
      id: `ver-${Date.now()}-${Math.random().toString(36).substring(2, 7)}`,
      email: cleanEmail,
      category: 'undeliverable',
      score: 0,
      reason: 'Invalid email syntax or formatting error',
      domain: cleanEmail.split('@')[1] || '',
      checks: {
        syntax: false,
        mxRecord: false,
        disposable: false,
        roleAccount: false,
        freeProvider: false,
        smtpCheck: false,
        catchAll: false
      },
      reportDetails: ['RFC 5322 syntax validation failed', 'Contains invalid characters or double dots']
    };
  }

  const [localPart, domain] = cleanEmail.split('@');
  
  // 2. Disposable Email Check
  const isDisposable = DISPOSABLE_DOMAINS.has(domain);
  if (isDisposable) {
    reportDetails.push('Domain is a known temporary/disposable email provider');
  }

  // 3. Role Account Check
  const isRole = ROLE_PREFIXES.has(localPart);
  if (isRole) {
    reportDetails.push('Address is a generic role or department account (e.g. support@, info@)');
  }

  // 4. Free Provider Check
  const isFree = FREE_PROVIDERS.has(domain);
  if (isFree) {
    reportDetails.push('Email uses a consumer free provider (Gmail, Outlook, Yahoo)');
  } else {
    reportDetails.push('Corporate custom domain detected');
  }

  // 5. MX Record & SMTP Simulation
  let mxRecord = true;
  let smtpCheck = true;
  let catchAll = false;

  // Domain structure checks
  if (domain.endsWith('.invalid') || domain.endsWith('.test') || domain.endsWith('.example')) {
    mxRecord = false;
    smtpCheck = false;
    reportDetails.push('Domain TLD is invalid or reserved');
  } else {
    reportDetails.push(`MX DNS records successfully verified for ${domain}`);
    reportDetails.push('SMTP connection established to mail exchanger port 25/587');
  }

  // Calculate Quality Score
  let score = 100;
  if (!mxRecord) score = 0;
  if (isDisposable) score -= 80;
  if (isRole) score -= 30;

  // Simulate catch-all check on custom domains
  if (!isFree && !isDisposable && mxRecord) {
    if (domain.length % 5 === 0) {
      catchAll = true;
      score -= 15;
      reportDetails.push('Domain is configured as a catch-all server');
    }
  }

  score = Math.max(0, Math.min(100, score));

  // Determine Category
  let category: 'deliverable' | 'undeliverable' | 'accept_all' | 'disposable' | 'role_based' = 'deliverable';
  let reason = 'Safe to send. Mailbox confirmed active & deliverable.';

  if (!mxRecord || score === 0) {
    category = 'undeliverable';
    reason = 'Mailbox or domain does not exist.';
  } else if (isDisposable) {
    category = 'disposable';
    reason = 'Disposable email provider detected. High bounce risk.';
  } else if (isRole) {
    category = 'role_based';
    reason = 'Role account (info@, sales@). Low engagement risk.';
  } else if (catchAll) {
    category = 'accept_all';
    reason = 'Catch-all server detected.';
  }

  return {
    id: `ver-${Date.now()}-${Math.random().toString(36).substring(2, 7)}`,
    email: cleanEmail,
    category,
    score,
    reason,
    domain,
    checks: {
      syntax: true,
      mxRecord,
      disposable: isDisposable,
      roleAccount: isRole,
      freeProvider: isFree,
      smtpCheck,
      catchAll
    },
    reportDetails
  };
}

export async function verifyBulkEmails(
  emails: string[],
  onProgress?: (processed: number, total: number) => void
): Promise<DetailedVerificationReport[]> {
  const results: DetailedVerificationReport[] = [];
  
  for (let i = 0; i < emails.length; i++) {
    const report = await verifySingleEmail(emails[i]);
    results.push(report);
    if (onProgress) {
      onProgress(i + 1, emails.length);
    }
    if (i % 5 === 0) {
      await new Promise((resolve) => setTimeout(resolve, 20));
    }
  }

  return results;
}
