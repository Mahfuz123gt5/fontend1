import React, { useState } from 'react';
import { 
  Flame, 
  ShieldCheck, 
  CheckCircle2, 
  ArrowRight, 
  Sliders, 
  Sparkles, 
  Zap, 
  RefreshCw, 
  AlertTriangle, 
  Server, 
  Cpu, 
  Activity,
  HelpCircle
} from 'lucide-react';
import { MainTab } from '../../../types';

interface EmailWarmupLandingViewProps {
  onNavigate: (tab: MainTab) => void;
}

export const EmailWarmupLandingView: React.FC<EmailWarmupLandingViewProps> = ({ onNavigate }) => {
  const [baseline, setBaseline] = useState(5);
  const [dailyIncrease, setDailyIncrease] = useState(2);
  const [maxEmails, setMaxEmails] = useState(40);
  const [replyRate, setReplyRate] = useState(30);

  // Calculate ramp-up timeline
  const daysToReachMax = Math.ceil((maxEmails - baseline) / dailyIncrease);

  return (
    <div className="space-y-20 py-10">
      
      {/* HERO SECTION */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto space-y-6">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-amber-500/10 border border-amber-500/20 text-amber-400 text-xs font-bold">
            <Flame className="w-4 h-4" />
            <span>AI Peer-to-Peer Warmup Engine</span>
          </div>

          <h1 className="text-4xl sm:text-5xl font-black text-white tracking-tight leading-tight">
            Build Unshakeable Domain Reputation & Escaping <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-400 via-rose-400 to-indigo-400">Spam Filters</span>
          </h1>

          <p className="text-slate-300 text-base sm:text-lg leading-relaxed font-medium">
            Automate daily peer email exchanges across 10,000+ real active domains. Protect new domains, revive burned inboxes, and guarantee 99%+ deliverability.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-2">
            <button
              onClick={() => onNavigate('public-signup')}
              className="px-7 py-4 rounded-2xl bg-gradient-to-r from-amber-500 via-indigo-600 to-violet-600 text-white font-extrabold text-sm shadow-xl hover:scale-105 transition-all flex items-center gap-2"
            >
              <span>Warm Up Your Inboxes Free</span>
              <ArrowRight className="w-4 h-4" />
            </button>
            <button
              onClick={() => onNavigate('inboxes-tester')}
              className="px-6 py-4 rounded-2xl bg-slate-900 border border-slate-800 text-slate-200 font-bold text-sm hover:border-slate-700 transition-colors"
            >
              Run Deliverability Test Now
            </button>
          </div>
        </div>
      </section>

      {/* RAMP UP ALGORITHM SIMULATOR */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-slate-900 rounded-3xl p-8 border border-slate-800 space-y-8">
          <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4 border-b border-slate-800 pb-6">
            <div>
              <h2 className="text-2xl font-black text-white flex items-center gap-2">
                <Sliders className="w-6 h-6 text-indigo-400" />
                Progressive Warmup Ramp-Up Configurator
              </h2>
              <p className="text-slate-400 text-xs">Simulate how our algorithm ramps up your inbox daily sending capacity safely.</p>
            </div>
            <div className="bg-indigo-500/10 text-indigo-400 border border-indigo-500/20 px-4 py-2 rounded-xl text-xs font-bold">
              Target Max Reached in: <span className="text-white font-extrabold">{daysToReachMax} Days</span>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
            
            {/* Controls */}
            <div className="lg:col-span-5 space-y-5 bg-slate-950 p-6 rounded-2xl border border-slate-800">
              <div>
                <div className="flex justify-between text-xs font-bold text-slate-300 mb-1">
                  <span>Starting Baseline (Day 1):</span>
                  <span className="text-amber-400 font-extrabold">{baseline} emails</span>
                </div>
                <input 
                  type="range" min="1" max="15" value={baseline} onChange={(e) => setBaseline(parseInt(e.target.value))}
                  className="w-full accent-amber-500"
                />
              </div>

              <div>
                <div className="flex justify-between text-xs font-bold text-slate-300 mb-1">
                  <span>Daily Increase Step:</span>
                  <span className="text-amber-400 font-extrabold">+{dailyIncrease} / day</span>
                </div>
                <input 
                  type="range" min="1" max="5" value={dailyIncrease} onChange={(e) => setDailyIncrease(parseInt(e.target.value))}
                  className="w-full accent-amber-500"
                />
              </div>

              <div>
                <div className="flex justify-between text-xs font-bold text-slate-300 mb-1">
                  <span>Maximum Daily Warmup Cap:</span>
                  <span className="text-amber-400 font-extrabold">{maxEmails} emails</span>
                </div>
                <input 
                  type="range" min="20" max="100" value={maxEmails} onChange={(e) => setMaxEmails(parseInt(e.target.value))}
                  className="w-full accent-amber-500"
                />
              </div>

              <div>
                <div className="flex justify-between text-xs font-bold text-slate-300 mb-1">
                  <span>Peer Auto-Reply Rate:</span>
                  <span className="text-indigo-400 font-extrabold">{replyRate}%</span>
                </div>
                <input 
                  type="range" min="15" max="50" value={replyRate} onChange={(e) => setReplyRate(parseInt(e.target.value))}
                  className="w-full accent-indigo-500"
                />
              </div>
            </div>

            {/* Ramp Chart Display */}
            <div className="lg:col-span-7 bg-slate-950 p-6 rounded-2xl border border-slate-800 flex flex-col justify-between">
              <h3 className="text-xs font-extrabold text-slate-400 uppercase tracking-wider mb-4">Simulated 14-Day Volume Projection</h3>
              <div className="grid grid-cols-7 gap-2 items-end h-48 pt-6 pb-2">
                {Array.from({ length: 14 }).map((_, i) => {
                  const dayNum = i + 1;
                  const dayVol = Math.min(baseline + (i * dailyIncrease), maxEmails);
                  const heightPercent = Math.round((dayVol / maxEmails) * 100);
                  return (
                    <div key={i} className="flex flex-col items-center gap-2 h-full justify-end">
                      <span className="text-[10px] font-bold text-amber-400">{dayVol}</span>
                      <div 
                        style={{ height: `${heightPercent}%` }}
                        className="w-full bg-gradient-to-t from-amber-600 via-indigo-600 to-cyan-400 rounded-t-lg transition-all duration-300"
                      />
                      <span className="text-[10px] font-bold text-slate-500">D{dayNum}</span>
                    </div>
                  );
                })}
              </div>
              <div className="pt-4 border-t border-slate-800/80 flex items-center justify-between text-xs text-slate-400">
                <span>Natural Human Sending Cadence</span>
                <span className="text-emerald-400 font-bold">100% Safe Domain Protection</span>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* 4 CORE WARMUP PILLARS */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
        <div className="text-center max-w-2xl mx-auto space-y-3">
          <h2 className="text-3xl font-black text-white">How Inboxes Email Protects Your Reputation</h2>
          <p className="text-slate-400 text-sm">Four automated layers engineered to bypass modern spam filters.</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <div className="bg-slate-900 p-6 rounded-2xl border border-slate-800 space-y-3">
            <div className="w-10 h-10 rounded-xl bg-amber-500/10 border border-amber-500/20 flex items-center justify-center text-amber-400">
              <RefreshCw className="w-5 h-5" />
            </div>
            <h3 className="font-extrabold text-white text-base">Spam Folder Rescue</h3>
            <p className="text-slate-400 text-xs leading-relaxed">
              If a peer email lands in spam, our automated network moves it to the Primary inbox, marks it as important, and replies.
            </p>
          </div>

          <div className="bg-slate-900 p-6 rounded-2xl border border-slate-800 space-y-3">
            <div className="w-10 h-10 rounded-xl bg-indigo-500/10 border border-indigo-500/20 flex items-center justify-center text-indigo-400">
              <Cpu className="w-5 h-5" />
            </div>
            <h3 className="font-extrabold text-white text-base">AI Peer Conversations</h3>
            <p className="text-slate-400 text-xs leading-relaxed">
              Emails are written by real LLM models using dynamic context, ensuring message content is unique and natural.
            </p>
          </div>

          <div className="bg-slate-900 p-6 rounded-2xl border border-slate-800 space-y-3">
            <div className="w-10 h-10 rounded-xl bg-cyan-500/10 border border-cyan-500/20 flex items-center justify-center text-cyan-400">
              <ShieldCheck className="w-5 h-5" />
            </div>
            <h3 className="font-extrabold text-white text-base">DNS Health Checks</h3>
            <p className="text-slate-400 text-xs leading-relaxed">
              Automatic monitoring for SPF, DKIM, DMARC, MX records, and 50+ global blacklists every 6 hours.
            </p>
          </div>

          <div className="bg-slate-900 p-6 rounded-2xl border border-slate-800 space-y-3">
            <div className="w-10 h-10 rounded-xl bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center text-emerald-400">
              <Activity className="w-5 h-5" />
            </div>
            <h3 className="font-extrabold text-white text-base">Smart Custom Schedules</h3>
            <p className="text-slate-400 text-xs leading-relaxed">
              Set sending hours matching your target time zones (e.g. 09:00 - 18:00 UTC) to mimic realistic work hours.
            </p>
          </div>
        </div>
      </section>

      {/* CTA BANNER */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-gradient-to-r from-amber-600 via-indigo-600 to-violet-600 rounded-3xl p-10 text-center text-white space-y-4">
          <h2 className="text-3xl font-black">Start Warming Up Your Inboxes Today</h2>
          <p className="text-slate-200 text-xs max-w-xl mx-auto">Connect Google Workspace, Outlook, or Custom SMTP in under 2 minutes.</p>
          <button
            onClick={() => onNavigate('public-signup')}
            className="px-8 py-3.5 rounded-xl bg-white text-slate-900 font-extrabold text-xs shadow-xl hover:bg-amber-50"
          >
            Start Free Warmup Now
          </button>
        </div>
      </section>

    </div>
  );
};
