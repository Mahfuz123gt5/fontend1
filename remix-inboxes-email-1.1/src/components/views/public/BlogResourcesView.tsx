import React, { useState } from 'react';
import { 
  BookOpen, 
  Search, 
  Clock, 
  User, 
  ArrowRight, 
  Tag, 
  Sparkles, 
  X, 
  CheckCircle2, 
  Share2 
} from 'lucide-react';
import { MainTab } from '../../../types';

interface BlogResourcesViewProps {
  onNavigate: (tab: MainTab) => void;
}

interface Article {
  id: string;
  title: string;
  category: 'Deliverability' | 'Technical Setup' | 'Copywriting' | 'Lead Generation';
  readTime: string;
  author: string;
  date: string;
  summary: string;
  content: string;
}

export const BlogResourcesView: React.FC<BlogResourcesViewProps> = ({ onNavigate }) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [readingArticle, setReadingArticle] = useState<Article | null>(null);

  const articles: Article[] = [
    {
      id: 'art-1',
      title: 'Ultimate 2026 Guide to SPF, DKIM, DMARC & Custom Tracking Domains',
      category: 'Technical Setup',
      readTime: '8 min read',
      author: 'Mahfuz Hassan',
      date: 'July 24, 2026',
      summary: 'Step-by-step instructions for configuring DNS records on Cloudflare, Namecheap, and GoDaddy to guarantee 100% email authentication score.',
      content: `
### Why DNS Authentication is Mandatory in 2026

Google Workspace and Yahoo Mail now strictly enforce SPF, DKIM, and DMARC verification for all bulk sending domains. If any of these three DNS records are missing or misconfigured, your cold emails will be rejected immediately at the gateway.

#### 1. Setting Up SPF (Sender Policy Framework)
Add a TXT record to your root domain:
\`\`\`text
v=spf1 include:_spf.google.com ~all
\`\`\`

#### 2. Configuring DKIM (DomainKeys Identified Mail)
In Google Workspace Admin, generate a 2048-bit DKIM TXT record and add it to your DNS zone as \`google._domainkey\`.

#### 3. Enforcing DMARC
Start with a monitoring policy, then transition to quarantine or reject:
\`\`\`text
v=DMARC1; p=quarantine; rua=mailto:dmarc-reports@yourdomain.com;
\`\`\`

#### 4. Custom Tracking Domain Alignment
Avoid default tracking pixels that trigger spam filters. CNAME your tracking link (e.g. \`track.yourdomain.com\`) directly to your sending infrastructure.
      `
    },
    {
      id: 'art-2',
      title: '15 Cold Email Subject Lines with 80%+ Open Rates Tested on 1M Sent Emails',
      category: 'Copywriting',
      readTime: '6 min read',
      author: 'Alex Rivera',
      date: 'July 18, 2026',
      summary: 'Data-backed analysis of short, conversational, non-salesy subject lines that bypass Google’s Promotions tab.',
      content: `
### The Golden Rule of Cold Email Subject Lines

The best subject lines look like an internal message from a colleague or client. They are lowercase, 2 to 4 words long, and contain zero promotional triggers (e.g. "Free", "Discount", "Guaranteed").

#### Top Performing Subject Lines:
1. **"quick question re {{company}}"** (84.2% Open Rate)
2. **"idea for {{first_name}}"** (81.5% Open Rate)
3. **"{{first_name}} / feedback on launch"** (79.8% Open Rate)
4. **"saw your post about {{topic}}"** (78.3% Open Rate)
5. **"intro from {{mutual_connection}}"** (88.1% Open Rate)
      `
    },
    {
      id: 'art-3',
      title: 'How to Recover a Burned Sending Domain in 14 Days Using Peer Warmup',
      category: 'Deliverability',
      readTime: '10 min read',
      author: 'Elena Vance',
      date: 'July 10, 2026',
      summary: 'Step-by-step recovery process when your domain reputation drops below 80% or starts hitting spam folders.',
      content: `
### Domain Spam Recovery Protocol

If your domain suddenly drops below 80% inbox placement rate, follow this exact protocol:

1. **Pause All Outreach Campaigns Immediately**: Continuing to send cold outreach on a burned domain will permanently blacklist your IP.
2. **Verify DNS Health**: Ensure no new SPF/DMARC errors occurred.
3. **Enable Progressive AI Peer Warmup**: Set baseline to 5 emails/day, increasing by 2/day up to 40 max.
4. **Enforce Peer Auto-Replies**: Our AI peer network exchanges real positive human replies, proving to Google that users value your emails.
5. **Monitor Reputation Metric for 14 Days**: Resume outreach only after achieving 98%+ Primary inbox placement.
      `
    },
    {
      id: 'art-4',
      title: 'B2B Prospect Sourcing: Finding Verified Catch-all Emails Without Bouncing',
      category: 'Lead Generation',
      readTime: '5 min read',
      author: 'David Kim',
      date: 'July 02, 2026',
      summary: 'How to handle catch-all domains, avoid honeypot spam traps, and clean prospect lists before importing.',
      content: `
### What are Catch-All Email Addresses?

A catch-all server accepts emails for any username at that domain, even if the address doesn't exist. Standard verifiers mark them as risky.

#### Safe Catch-All Handling Strategy:
- Use real-time SMTP pinging and historical delivery pattern verification.
- Separate high-confidence catch-all leads from unverified lists.
- Limit catch-all prospect ratio in cold outreach campaigns to under 15%.
      `
    }
  ];

  const categories = ['All', 'Deliverability', 'Technical Setup', 'Copywriting', 'Lead Generation'];

  const filteredArticles = articles.filter(a => {
    const matchesCat = selectedCategory === 'All' || a.category === selectedCategory;
    const matchesSearch = a.title.toLowerCase().includes(searchQuery.toLowerCase()) || a.summary.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCat && matchesSearch;
  });

  return (
    <div className="space-y-16 py-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      
      {/* HEADER */}
      <div className="text-center max-w-3xl mx-auto space-y-4">
        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-indigo-500/10 border border-indigo-500/20 text-indigo-400 text-xs font-bold">
          <BookOpen className="w-4 h-4" />
          <span>Deliverability & Outreach Knowledge Base</span>
        </div>
        <h1 className="text-4xl sm:text-5xl font-black text-white tracking-tight">
          Master the Science of <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 via-cyan-400 to-emerald-400">Cold Email Deliverability</span>
        </h1>
        <p className="text-slate-300 text-sm sm:text-base font-medium">
          Tactical guides, DNS setup tutorials, and subject line formulas written by email infrastructure experts.
        </p>

        {/* Search Bar */}
        <div className="pt-2 max-w-xl mx-auto relative">
          <Search className="w-5 h-5 text-slate-500 absolute left-4 top-3.5" />
          <input 
            type="text"
            placeholder="Search articles, SPF setup, subject lines, warmup..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full bg-slate-900 border border-slate-800 rounded-2xl pl-12 pr-4 py-3.5 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-indigo-500 shadow-xl"
          />
        </div>
      </div>

      {/* CATEGORY FILTERS */}
      <div className="flex flex-wrap items-center justify-center gap-2">
        {categories.map(cat => (
          <button
            key={cat}
            onClick={() => setSelectedCategory(cat)}
            className={`px-4 py-2 rounded-xl text-xs font-extrabold transition-all ${
              selectedCategory === cat 
                ? 'bg-indigo-600 text-white shadow-lg' 
                : 'bg-slate-900 text-slate-400 hover:text-white border border-slate-800'
            }`}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* ARTICLES GRID */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {filteredArticles.map(art => (
          <div 
            key={art.id}
            className="bg-slate-900 p-8 rounded-3xl border border-slate-800 flex flex-col justify-between hover:border-indigo-500/50 transition-all group"
          >
            <div className="space-y-4">
              <div className="flex items-center justify-between text-xs">
                <span className="bg-indigo-500/10 text-indigo-400 border border-indigo-500/20 px-3 py-1 rounded-lg font-bold">
                  {art.category}
                </span>
                <span className="text-slate-400 font-semibold flex items-center gap-1">
                  <Clock className="w-3.5 h-3.5" /> {art.readTime}
                </span>
              </div>

              <h3 className="text-xl font-black text-white group-hover:text-indigo-400 transition-colors leading-snug">
                {art.title}
              </h3>

              <p className="text-slate-400 text-xs leading-relaxed">
                {art.summary}
              </p>
            </div>

            <div className="pt-6 mt-6 border-t border-slate-800/80 flex items-center justify-between">
              <span className="text-xs font-bold text-slate-300 flex items-center gap-1.5">
                <User className="w-3.5 h-3.5 text-indigo-400" /> {art.author} • {art.date}
              </span>
              <button
                onClick={() => setReadingArticle(art)}
                className="text-indigo-400 font-extrabold text-xs flex items-center gap-1 hover:underline"
              >
                Read Guide <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* ARTICLE READER MODAL */}
      {readingArticle && (
        <div className="fixed inset-0 z-50 bg-slate-950/80 backdrop-blur-md flex items-center justify-center p-4">
          <div className="bg-slate-900 border border-slate-800 w-full max-w-3xl max-h-[85vh] rounded-3xl overflow-hidden flex flex-col shadow-2xl animate-in zoom-in-95 duration-200">
            <div className="p-6 border-b border-slate-800 flex items-center justify-between">
              <span className="text-xs bg-indigo-500/10 text-indigo-400 px-3 py-1 rounded-lg font-bold">
                {readingArticle.category}
              </span>
              <button 
                onClick={() => setReadingArticle(null)}
                className="p-2 rounded-xl bg-slate-800 text-slate-400 hover:text-white"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="p-8 overflow-y-auto space-y-6 text-slate-300 text-xs leading-relaxed font-sans">
              <h2 className="text-2xl font-black text-white">{readingArticle.title}</h2>
              <div className="flex items-center gap-4 text-xs text-slate-400 pb-4 border-b border-slate-800">
                <span>By {readingArticle.author}</span>
                <span>• {readingArticle.date}</span>
                <span>• {readingArticle.readTime}</span>
              </div>
              <div className="whitespace-pre-line text-sm font-sans space-y-4">
                {readingArticle.content}
              </div>
            </div>

            <div className="p-6 border-t border-slate-800 bg-slate-950 flex justify-between items-center">
              <span className="text-xs text-slate-400">Share this guide with your outreach team</span>
              <button 
                onClick={() => setReadingArticle(null)}
                className="px-5 py-2.5 rounded-xl bg-indigo-600 text-white font-extrabold text-xs"
              >
                Close Article
              </button>
            </div>
          </div>
        </div>
      )}

    </div>
  );
};
