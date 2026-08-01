import { MainTab } from '../types';

export const TAB_TO_PATH: Record<MainTab, string> = {
  'public-home': '/',
  'public-warmup': '/warmup',
  'public-leadgen': '/leadgen',
  'public-outreach': '/outreach',
  'public-pricing': '/pricing',
  'public-blog': '/blog',
  'public-signup': '/signup',
  'public-login': '/login',
  'public-privacy': '/privacy',
  'inboxes': '/app/inboxes',
  'inbox-detail': '/app/inbox-detail',
  'inbox-settings': '/app/inbox-settings',
  'inboxes-tester': '/app/deliverability',
  'campaigns': '/app/campaigns',
  'campaign-detail': '/app/campaign-detail',
  'campaign-new': '/app/campaign-new',
  'templates': '/app/templates',
  'template-detail': '/app/template-detail',
  'template-new': '/app/template-new',
  'lead-search': '/app/lead-search',
  'email-verifier': '/app/email-verifier',
  'contacts': '/app/contacts',
  'contact-import': '/app/contact-import',
  'extensions': '/app/extensions',
  'account-settings': '/app/settings',
};

export const PATH_TO_TAB: Record<string, MainTab> = Object.entries(TAB_TO_PATH).reduce(
  (acc, [tab, path]) => {
    acc[path] = tab as MainTab;
    return acc;
  },
  {} as Record<string, MainTab>
);

export function getTabFromUrl(): MainTab {
  const hash = window.location.hash.replace(/^#/, '');
  const pathname = window.location.pathname;

  // Check hash first (e.g. #/pricing or #pricing)
  if (hash) {
    const cleanHash = hash.startsWith('/') ? hash : '/' + hash;
    if (PATH_TO_TAB[cleanHash]) {
      return PATH_TO_TAB[cleanHash];
    }
    // Also check without / e.g. #pricing
    const hashWithSlash = '/' + hash.replace(/^\//, '');
    if (PATH_TO_TAB[hashWithSlash]) {
      return PATH_TO_TAB[hashWithSlash];
    }
  }

  // Check pathname (e.g. /pricing or /app/inboxes)
  if (pathname && PATH_TO_TAB[pathname]) {
    return PATH_TO_TAB[pathname];
  }

  // Default to public home or inboxes if hash or path is unrecognized
  return 'public-home';
}

export function updateUrlForTab(tab: MainTab) {
  const path = TAB_TO_PATH[tab] || '/';
  const newHash = '#' + path;
  
  // Update both history pushState and hash so location bar reflects url cleanly
  if (window.location.hash !== newHash) {
    try {
      window.history.pushState({ tab }, '', path === '/' ? '/' + newHash : path);
    } catch {
      window.location.hash = newHash;
    }
  }
}
