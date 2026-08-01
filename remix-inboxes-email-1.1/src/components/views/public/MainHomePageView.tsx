import React, { useState } from 'react';
import { 
  Mail, 
  Flame, 
  Users, 
  Send, 
  ShieldCheck, 
  ArrowRight, 
  CheckCircle2, 
  Sparkles, 
  Star, 
  BarChart3, 
  TrendingUp, 
  Zap, 
  Layers, 
  Bot, 
  Lock, 
  HelpCircle,
  Globe,
  Sliders,
  Play
} from 'lucide-react';
import { MainTab } from '../../../types';

interface MainHomePageViewProps {
  onNavigate: (tab: MainTab) => void;
}

export const MainHomePageView: React.FC<MainHomePageViewProps> = ({ onNavigate }) => {
  const [warmupVolume, setWarmupVolume] = useState(30);
  const [activeFeatureTab, setActiveFeatureTab] = useState<'warmup' | 'leadgen' | 'outreach'>('warmup');
  const [openFaq, setOpenFaq] = useState<number | null>(0);

  // ROI Calculator inputs
  const [inboxesCount, setInboxesCount] = useState(5);
  const [emailsPerInbox, setEmailsPerInbox] = useState(40);

  const totalMonthlyEmails = inboxesCount * emailsPerInbox * 22; // 22 work days
  const estimatedInboxPlacement = 99.2;
  const estimatedReplies = Math.round(totalMonthlyEmails * 0.045); // 4.5% reply rate

  return (
    <div className="space-y-24 py-10">
      
      {/* HERO SECTION */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          
          {/* Hero Left Text */}
          <div className="lg:col-span-7 space-y-6">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-indigo-500/10 border border-indigo-500/20 text-indigo-400 text-xs font-bold">
              <Sparkles className="w-4 h-4 text-amber-300" />
              <span>Next-Gen Cold Email Infrastructure for 2026</span>
            </div>

            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black text-white tracking-tight leading-[1.1]">
              Never Hit the <span className="text-transparent bg-clip-text bg-gradient-to-r from-rose-400 via-indigo-400 to-cyan-400">Spam Folder</span> Again.
            </h1>

            <p className="text-slate-300 text-base sm:text-lg leading-relaxed font-medium max-w-2xl">
              Automate email warmup with a global peer network, discover 250M+ verified B2B leads, and launch high-converting cold email campaigns across unlimited inboxes.
            </p>

            <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-4 pt-2">
              <button
                onClick={() => onNavigate('public-signup')}
                className="flex items-center justify-center gap-3 px-7 py-4 rounded-2xl bg-gradient-to-r from-indigo-500 via-indigo-600 to-violet-600 text-white font-extrabold text-sm shadow-xl shadow-indigo-500/30 hover:scale-105 active:scale-95 transition-all"
              >
                <span>Start 14-Day Free Trial</span>
                <ArrowRight className="w-4 h-4" />
              </button>

              <button
                onClick={() => onNavigate('inboxes')}
                className="flex items-center justify-center gap-2 px-6 py-4 rounded-2xl bg-slate-900 border border-slate-800 hover:border-slate-700 text-slate-200 font-bold text-sm transition-colors"
              >
                <Play className="w-4 h-4 text-cyan-400 fill-cyan-400" />
                <span>Explore Live App Demo</span>
              </button>
            </div>

            {/* Quick Badges */}
            <div className="pt-4 flex flex-wrap items-center gap-6 text-xs text-slate-400 font-semibold border-t border-slate-800/80">
              <span className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-400" /> No Credit Card Required
              </span>
              <span className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-400" /> 1-Click Google & Outlook Sync
              </span>
              <span className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-400" /> 99.4% Primary Inbox Rate
              </span>
            </div>
          </div>

          {/* Hero Right Interactive Widget */}
          <div className="lg:col-span-5">
            <div className="bg-gradient-to-b from-slate-900 to-slate-950 rounded-3xl p-6 border border-slate-800 shadow-2xl relative overflow-hidden group">
              <div className="absolute top-0 right-0 w-64 h-64 bg-indigo-600/10 rounded-full blur-3xl -mr-20 -mt-20 pointer-events-none" />

              <div className="flex items-center justify-between pb-4 border-b border-slate-800">
                <div className="flex items-center gap-3">
                  <div className="w-3 h-3 rounded-full bg-emerald-500 animate-ping" />
                  <span className="text-xs font-extrabold text-white">Live Warmup Engine Simulator</span>
                </div>
                <span className="text-[10px] bg-emerald-500/10 text-emerald-400 px-2.5 py-1 rounded-full font-bold border border-emerald-500/20">
                  Status: 100% Healthy
                </span>
              </div>

              {/* Score Indicator */}
              <div className="my-6 text-center space-y-2">
                <div className="inline-flex items-center justify-center w-28 h-28 rounded-full bg-gradient-to-tr from-emerald-500/20 to-teal-500/10 border-2 border-emerald-500/40 text-emerald-400 font-black text-3xl shadow-inner">
                  99.4%
                </div>
                <p className="text-xs font-bold text-slate-300">Reputation & Inbox Deliverability Score</p>
              </div>

              {/* Interactive Slider */}
              <div className="bg-slate-900 p-4 rounded-2xl border border-slate-800/80 space-y-3">
                <div className="flex justify-between items-center text-xs">
                  <span className="font-bold text-slate-400 flex items-center gap-1.5">
                    <Sliders className="w-3.5 h-3.5 text-indigo-400" /> Daily Peer Warmup Emails
                  </span>
                  <span className="font-extrabold text-indigo-400 bg-indigo-500/10 px-2.5 py-0.5 rounded-lg border border-indigo-500/20">
                    {warmupVolume} / day
                  </span>
                </div>
                <input 
                  type="range" 
                  min="5" 
                  max="80" 
                  value={warmupVolume}
                  onChange={(e) => setWarmupVolume(parseInt(e.target.value))}
                  className="w-full accent-indigo-500 cursor-pointer"
                />
                <div className="grid grid-cols-3 gap-2 text-center text-[11px] pt-1">
                  <div className="bg-slate-950 p-2 rounded-xl border border-slate-800">
                    <p className="text-slate-500 font-bold">Spam Saved</p>
                    <p className="text-emerald-400 font-extrabold">{Math.round(warmupVolume * 0.28)} / day</p>
                  </div>
                  <div className="bg-slate-950 p-2 rounded-xl border border-slate-800">
                    <p className="text-slate-500 font-bold">Auto Replies</p>
                    <p className="text-cyan-400 font-extrabold">{Math.round(warmupVolume * 0.35)} / day</p>
                  </div>
                  <div className="bg-slate-950 p-2 rounded-xl border border-slate-800">
                    <p className="text-slate-500 font-bold">SPF/DKIM</p>
                    <p className="text-amber-400 font-extrabold">Verified</p>
                  </div>
                </div>
              </div>

              <div className="mt-4 pt-4 border-t border-slate-800/80 flex items-center justify-between text-xs text-slate-400">
                <span>Simulated over 10,000+ active domains</span>
                <button 
                  onClick={() => onNavigate('public-warmup')}
                  className="text-indigo-400 font-bold hover:underline flex items-center gap-1"
                >
                  Deep Warmup Details <ArrowRight className="w-3 h-3" />
                </button>
              </div>

            </div>
          </div>

        </div>
      </section>

      {/* STATS BAR */}
      <section className="bg-slate-900/60 border-y border-slate-800/80 py-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
            <div className="space-y-1">
              <p className="text-3xl sm:text-4xl font-black text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 to-cyan-400">10,000+</p>
              <p className="text-xs font-bold text-slate-400 uppercase tracking-wider">Domains Warmed Up</p>
            </div>
            <div className="space-y-1">
              <p className="text-3xl sm:text-4xl font-black text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 to-teal-400">99.4%</p>
              <p className="text-xs font-bold text-slate-400 uppercase tracking-wider">Primary Inbox Placement</p>
            </div>
            <div className="space-y-1">
              <p className="text-3xl sm:text-4xl font-black text-transparent bg-clip-text bg-gradient-to-r from-violet-400 to-purple-400">250M+</p>
              <p className="text-xs font-bold text-slate-400 uppercase tracking-wider">Verified B2B Leads</p>
            </div>
            <div className="space-y-1">
              <p className="text-3xl sm:text-4xl font-black text-transparent bg-clip-text bg-gradient-to-r from-amber-400 to-rose-400">45M+</p>
              <p className="text-xs font-bold text-slate-400 uppercase tracking-wider">Emails Processed Daily</p>
            </div>
          </div>
        </div>
      </section>

      {/* CORE FEATURES TABS SECTION */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
        <div className="text-center max-w-3xl mx-auto space-y-4">
          <h2 className="text-3xl sm:text-4xl font-black text-white tracking-tight">
            Everything You Need for <span className="text-indigo-400">Scalable Cold Outreach</span>
          </h2>
          <p className="text-slate-400 text-sm sm:text-base font-medium">
            From domain warmup to verified prospect discovery and automated multi-inbox rotation, Inboxes Email powers your entire sales pipeline.
          </p>
        </div>

        {/* Tab Buttons */}
        <div className="flex justify-center">
          <div className="inline-flex p-1.5 rounded-2xl bg-slate-900 border border-slate-800 gap-2">
            <button
              onClick={() => setActiveFeatureTab('warmup')}
              className={`flex items-center gap-2 px-5 py-3 rounded-xl text-xs font-extrabold transition-all ${
                activeFeatureTab === 'warmup'
                  ? 'bg-gradient-to-r from-indigo-600 to-violet-600 text-white shadow-lg'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              <Flame className="w-4 h-4 text-amber-400" />
              <span>1. Email Warmup Engine</span>
            </button>
            <button
              onClick={() => setActiveFeatureTab('leadgen')}
              className={`flex items-center gap-2 px-5 py-3 rounded-xl text-xs font-extrabold transition-all ${
                activeFeatureTab === 'leadgen'
                  ? 'bg-gradient-to-r from-indigo-600 to-violet-600 text-white shadow-lg'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              <Users className="w-4 h-4 text-cyan-400" />
              <span>2. B2B Lead Search</span>
            </button>
            <button
              onClick={() => setActiveFeatureTab('outreach')}
              className={`flex items-center gap-2 px-5 py-3 rounded-xl text-xs font-extrabold transition-all ${
                activeFeatureTab === 'outreach'
                  ? 'bg-gradient-to-r from-indigo-600 to-violet-600 text-white shadow-lg'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              <Send className="w-4 h-4 text-emerald-400" />
              <span>3. Cold Outreach Campaigns</span>
            </button>
          </div>
        </div>

        {/* Feature Tab Content */}
        <div className="bg-slate-900 rounded-3xl p-8 border border-slate-800">
          {activeFeatureTab === 'warmup' && (
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 items-center">
              <div className="space-y-5">
                <div className="w-12 h-12 rounded-2xl bg-amber-500/10 border border-amber-500/20 flex items-center justify-center text-amber-400">
                  <Flame className="w-6 h-6" />
                </div>
                <h3 className="text-2xl font-black text-white">Peer-to-Peer Warmup Engine</h3>
                <p className="text-slate-300 text-sm leading-relaxed">
                  Connect your Google Workspace, Outlook, or Custom SMTP accounts. Our smart algorithm exchanges human-like emails across a real network of 10,000+ active domains, removing emails from Spam folders automatically and building pristine domain reputation.
                </p>
                <ul className="space-y-3 text-xs font-bold text-slate-300">
                  <li className="flex items-center gap-2.5">
                    <CheckCircle2 className="w-4 h-4 text-emerald-400" /> Automated Spam Folder Recovery
                  </li>
                  <li className="flex items-center gap-2.5">
                    <CheckCircle2 className="w-4 h-4 text-emerald-400" /> Real Peer Auto-Replies & Smart Threading
                  </li>
                  <li className="flex items-center gap-2.5">
                    <CheckCircle2 className="w-4 h-4 text-emerald-400" /> Instant SPF, DKIM & DMARC Health Monitoring
                  </li>
                </ul>
                <button 
                  onClick={() => onNavigate('public-warmup')}
                  className="inline-flex items-center gap-2 px-5 py-3 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white font-extrabold text-xs transition-colors"
                >
                  <span>Learn About Warmup Page</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
              <div className="bg-slate-950 p-6 rounded-2xl border border-slate-800 space-y-4">
                <div className="flex items-center justify-between pb-3 border-b border-slate-800">
                  <span className="text-xs font-bold text-slate-400">Warmup Breakdown</span>
                  <span className="text-xs font-extrabold text-emerald-400">Active Ramp Up</span>
                </div>
                <div className="space-y-3">
                  <div>
                    <div className="flex justify-between text-xs mb-1">
                      <span className="text-slate-300 font-bold">Inbox Rate</span>
                      <span className="text-emerald-400 font-extrabold">98.5%</span>
                    </div>
                    <div className="w-full h-2 bg-slate-800 rounded-full overflow-hidden">
                      <div className="h-full bg-emerald-500 w-[98.5%]" />
                    </div>
                  </div>
                  <div>
                    <div className="flex justify-between text-xs mb-1">
                      <span className="text-slate-300 font-bold">Category (Promotions/Updates)</span>
                      <span className="text-amber-400 font-extrabold">1.2%</span>
                    </div>
                    <div className="w-full h-2 bg-slate-800 rounded-full overflow-hidden">
                      <div className="h-full bg-amber-500 w-[1.2%]" />
                    </div>
                  </div>
                  <div>
                    <div className="flex justify-between text-xs mb-1">
                      <span className="text-slate-300 font-bold">Spam Folder</span>
                      <span className="text-rose-400 font-extrabold">0.3%</span>
                    </div>
                    <div className="w-full h-2 bg-slate-800 rounded-full overflow-hidden">
                      <div className="h-full bg-rose-500 w-[0.3%]" />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {activeFeatureTab === 'leadgen' && (
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 items-center">
              <div className="space-y-5">
                <div className="w-12 h-12 rounded-2xl bg-cyan-500/10 border border-cyan-500/20 flex items-center justify-center text-cyan-400">
                  <Users className="w-6 h-6" />
                </div>
                <h3 className="text-2xl font-black text-white">250M+ B2B Prospect Search Engine</h3>
                <p className="text-slate-300 text-sm leading-relaxed">
                  Search targeted decision makers by job title, company size, revenue, technology stack, location, and LinkedIn profile. Verify email addresses in real-time before export to protect your bounce rate.
                </p>
                <ul className="space-y-3 text-xs font-bold text-slate-300">
                  <li className="flex items-center gap-2.5">
                    <CheckCircle2 className="w-4 h-4 text-emerald-400" /> Real-time SMTP & Catch-all Verification
                  </li>
                  <li className="flex items-center gap-2.5">
                    <CheckCircle2 className="w-4 h-4 text-emerald-400" /> LinkedIn Sales Navigator Scraper Extension
                  </li>
                  <li className="flex items-center gap-2.5">
                    <CheckCircle2 className="w-4 h-4 text-emerald-400" /> Direct 1-Click Export to Outreach Campaigns
                  </li>
                </ul>
                <button 
                  onClick={() => onNavigate('public-leadgen')}
                  className="inline-flex items-center gap-2 px-5 py-3 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white font-extrabold text-xs transition-colors"
                >
                  <span>Explore Lead Gen Features</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
              <div className="bg-slate-950 p-6 rounded-2xl border border-slate-800 space-y-3">
                <p className="text-xs font-bold text-slate-400 uppercase tracking-wider">Sample Lead Preview</p>
                <div className="p-3 bg-slate-900 rounded-xl border border-slate-800 flex items-center justify-between">
                  <div>
                    <p className="text-xs font-extrabold text-white">Sarah Jenkins</p>
                    <p className="text-[11px] text-slate-400">VP of Growth @ CloudScale</p>
                  </div>
                  <span className="text-[10px] bg-emerald-500/10 text-emerald-400 px-2.5 py-1 rounded-md font-bold">
                    s.jenkins@cloudscale.io (Valid)
                  </span>
                </div>
                <div className="p-3 bg-slate-900 rounded-xl border border-slate-800 flex items-center justify-between">
                  <div>
                    <p className="text-xs font-extrabold text-white">Michael Chen</p>
                    <p className="text-[11px] text-slate-400">Head of Sales @ TechStack</p>
                  </div>
                  <span className="text-[10px] bg-emerald-500/10 text-emerald-400 px-2.5 py-1 rounded-md font-bold">
                    m.chen@techstack.com (Valid)
                  </span>
                </div>
              </div>
            </div>
          )}

          {activeFeatureTab === 'outreach' && (
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 items-center">
              <div className="space-y-5">
                <div className="w-12 h-12 rounded-2xl bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center text-emerald-400">
                  <Send className="w-6 h-6" />
                </div>
                <h3 className="text-2xl font-black text-white">Multi-Inbox Cold Email Outreach</h3>
                <p className="text-slate-300 text-sm leading-relaxed">
                  Rotate campaigns across multiple sending domains seamlessly. Use AI spintax generator, dynamic liquid tags, custom schedules, and automated follow-up sequences to maximize reply rates.
                </p>
                <ul className="space-y-3 text-xs font-bold text-slate-300">
                  <li className="flex items-center gap-2.5">
                    <CheckCircle2 className="w-4 h-4 text-emerald-400" /> Smart Multi-Domain Rotation & Throttle Limits
                  </li>
                  <li className="flex items-center gap-2.5">
                    <CheckCircle2 className="w-4 h-4 text-emerald-400" /> AI Spintax Generator to prevent template fatigue
                  </li>
                  <li className="flex items-center gap-2.5">
                    <CheckCircle2 className="w-4 h-4 text-emerald-400" /> Unified Master Inbox for instant response handling
                  </li>
                </ul>
                <button 
                  onClick={() => onNavigate('public-outreach')}
                  className="inline-flex items-center gap-2 px-5 py-3 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white font-extrabold text-xs transition-colors"
                >
                  <span>Explore Outreach Features</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
              <div className="bg-slate-950 p-6 rounded-2xl border border-slate-800 space-y-4">
                <p className="text-xs font-bold text-slate-400 uppercase tracking-wider">Outreach Campaign Pipeline</p>
                <div className="grid grid-cols-2 gap-3 text-center">
                  <div className="bg-slate-900 p-4 rounded-xl border border-slate-800">
                    <p className="text-2xl font-black text-indigo-400">4,280</p>
                    <p className="text-[11px] text-slate-400 font-bold">Emails Sent</p>
                  </div>
                  <div className="bg-slate-900 p-4 rounded-xl border border-slate-800">
                    <p className="text-2xl font-black text-emerald-400">8.4%</p>
                    <p className="text-[11px] text-slate-400 font-bold">Reply Rate</p>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </section>

      {/* ROI CALCULATOR SECTION */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-gradient-to-tr from-slate-900 via-indigo-950/40 to-slate-900 rounded-3xl p-8 sm:p-12 border border-slate-800">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
            
            <div className="lg:col-span-6 space-y-6">
              <span className="text-xs font-extrabold text-indigo-400 uppercase tracking-wider bg-indigo-500/10 px-3 py-1 rounded-lg border border-indigo-500/20">
                Interactive Deliverability Calculator
              </span>
              <h2 className="text-3xl font-black text-white">Calculate Your Monthly Sales Pipeline Potential</h2>
              <p className="text-slate-300 text-sm leading-relaxed">
                See how combining multi-inbox rotation with 99%+ deliverability transforms your cold email volume into booked sales meetings.
              </p>

              <div className="space-y-4 pt-2">
                <div>
                  <div className="flex justify-between text-xs font-bold text-slate-300 mb-1">
                    <span>Number of Connected Inboxes:</span>
                    <span className="text-indigo-400 font-extrabold">{inboxesCount} inboxes</span>
                  </div>
                  <input 
                    type="range" 
                    min="1" 
                    max="25" 
                    value={inboxesCount} 
                    onChange={(e) => setInboxesCount(parseInt(e.target.value))}
                    className="w-full accent-indigo-500 cursor-pointer"
                  />
                </div>

                <div>
                  <div className="flex justify-between text-xs font-bold text-slate-300 mb-1">
                    <span>Daily Emails per Inbox:</span>
                    <span className="text-indigo-400 font-extrabold">{emailsPerInbox} emails/day</span>
                  </div>
                  <input 
                    type="range" 
                    min="10" 
                    max="100" 
                    value={emailsPerInbox} 
                    onChange={(e) => setEmailsPerInbox(parseInt(e.target.value))}
                    className="w-full accent-indigo-500 cursor-pointer"
                  />
                </div>
              </div>
            </div>

            <div className="lg:col-span-6 bg-slate-950 p-6 sm:p-8 rounded-2xl border border-slate-800 space-y-6">
              <h3 className="text-xs font-extrabold text-slate-400 uppercase tracking-wider">Estimated Monthly Performance</h3>
              <div className="grid grid-cols-2 gap-4">
                <div className="bg-slate-900 p-4 rounded-xl border border-slate-800">
                  <p className="text-xs font-bold text-slate-400">Total Emails Sent</p>
                  <p className="text-3xl font-black text-white mt-1">{totalMonthlyEmails.toLocaleString()}</p>
                </div>
                <div className="bg-slate-900 p-4 rounded-xl border border-slate-800">
                  <p className="text-xs font-bold text-slate-400">Inbox Placement</p>
                  <p className="text-3xl font-black text-emerald-400 mt-1">{estimatedInboxPlacement}%</p>
                </div>
              </div>
              <div className="bg-slate-900 p-4 rounded-xl border border-slate-800 flex items-center justify-between">
                <div>
                  <p className="text-xs font-bold text-slate-400">Estimated Warm Interested Replies</p>
                  <p className="text-xs text-slate-500">Based on standard 4.5% conversion rate</p>
                </div>
                <p className="text-3xl font-black text-transparent bg-clip-text bg-gradient-to-r from-amber-400 to-indigo-400">
                  ~{estimatedReplies}
                </p>
              </div>

              <button
                onClick={() => onNavigate('public-signup')}
                className="w-full py-3.5 rounded-xl bg-gradient-to-r from-indigo-500 to-violet-600 text-white text-xs font-extrabold shadow-lg hover:scale-[1.01] transition-transform"
              >
                Scale Your Outreach Today
              </button>
            </div>

          </div>
        </div>
      </section>

      {/* FAQ ACCORDION */}
      <section className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        <div className="text-center space-y-3">
          <h2 className="text-3xl font-black text-white">Frequently Asked Questions</h2>
          <p className="text-slate-400 text-sm">Everything you need to know about Inboxes Email deliverability and warmup.</p>
        </div>

        <div className="space-y-3">
          {[
            {
              q: "How does the AI peer-to-peer warmup work?",
              a: "Inboxes Email connects your inbox to a curated network of over 10,000 real domain accounts. We automatically send, open, reply to, and mark emails as important in a natural human-like cadence, proving to Google and Outlook that your domain is trustworthy."
            },
            {
              q: "Can I connect multiple domain inboxes?",
              a: "Yes! Depending on your plan, you can connect unlimited Google Workspace, Microsoft 365, Zoho, or Custom IMAP/SMTP accounts and rotate them inside campaigns."
            },
            {
              q: "Are the lead search emails verified in real-time?",
              a: "Absolutely. Our lead search engine verifies emails via real-time SMTP pinging and catch-all analysis before you export or send, guaranteeing under 2% bounce rate."
            },
            {
              q: "How fast can I recover a domain that hit spam?",
              a: "Most domains see noticeable inbox placement improvements within 7 to 14 days of progressive peer warmup and DNS alignment."
            }
          ].map((item, idx) => (
            <div 
              key={idx}
              className="bg-slate-900 border border-slate-800 rounded-2xl overflow-hidden transition-all"
            >
              <button
                onClick={() => setOpenFaq(openFaq === idx ? null : idx)}
                className="w-full text-left p-5 flex items-center justify-between font-extrabold text-sm text-white hover:text-indigo-400"
              >
                <span>{item.q}</span>
                <HelpCircle className={`w-5 h-5 text-indigo-400 transition-transform ${openFaq === idx ? 'rotate-180' : ''}`} />
              </button>
              {openFaq === idx && (
                <div className="px-5 pb-5 text-xs text-slate-300 leading-relaxed border-t border-slate-800/60 pt-3">
                  {item.a}
                </div>
              )}
            </div>
          ))}
        </div>
      </section>

      {/* FINAL CTA BANNER */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-gradient-to-r from-indigo-600 via-indigo-700 to-violet-700 rounded-3xl p-10 sm:p-14 text-center text-white space-y-6 shadow-2xl relative overflow-hidden">
          <div className="max-w-2xl mx-auto space-y-4">
            <h2 className="text-3xl sm:text-4xl font-black tracking-tight">Ready to Land 99.4% of Emails in Primary Inbox?</h2>
            <p className="text-indigo-100 text-sm font-medium">
              Join 10,000+ sales teams, agencies, and founders scaling cold email outreach with zero deliverability anxiety.
            </p>
          </div>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <button
              onClick={() => onNavigate('public-signup')}
              className="px-8 py-4 rounded-2xl bg-white text-indigo-900 font-black text-sm shadow-xl hover:bg-indigo-50 hover:scale-105 active:scale-95 transition-all"
            >
              Get Started Free (14-Day Trial)
            </button>
            <button
              onClick={() => onNavigate('public-pricing')}
              className="px-6 py-4 rounded-2xl bg-indigo-900/50 border border-white/20 text-white font-bold text-sm hover:bg-indigo-900/80 transition-colors"
            >
              View Pricing Plans
            </button>
          </div>
        </div>
      </section>

    </div>
  );
};
