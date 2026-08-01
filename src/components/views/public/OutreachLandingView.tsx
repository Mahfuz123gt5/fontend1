import React, { useState } from 'react';
import { 
  Send, 
  Layers, 
  Sparkles, 
  CheckCircle2, 
  ArrowRight, 
  RefreshCw, 
  Clock, 
  Mail, 
  Zap, 
  Inbox, 
  BarChart3,
  Bot
} from 'lucide-react';
import { MainTab } from '../../../types';

interface OutreachLandingViewProps {
  onNavigate: (tab: MainTab) => void;
}

export const OutreachLandingView: React.FC<OutreachLandingViewProps> = ({ onNavigate }) => {
  const [activeStep, setActiveStep] = useState(1);

  return (
    <div className="space-y-20 py-10">
      
      {/* HERO SECTION */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto space-y-6">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-xs font-bold">
            <Send className="w-4 h-4" />
            <span>Multi-Inbox Automated Cold Email Engine</span>
          </div>

          <h1 className="text-4xl sm:text-5xl font-black text-white tracking-tight leading-tight">
            Scale Cold Email Volume with <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 via-teal-400 to-indigo-400">Smart Domain Rotation</span>
          </h1>

          <p className="text-slate-300 text-base sm:text-lg leading-relaxed font-medium">
            Send thousands of personalized emails daily without triggering spam filters. Automatically rotate across multiple sender accounts, generate AI spintax, and book meetings on autopilot.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-2">
            <button
              onClick={() => onNavigate('public-signup')}
              className="px-7 py-4 rounded-2xl bg-gradient-to-r from-emerald-500 via-indigo-600 to-violet-600 text-white font-extrabold text-sm shadow-xl hover:scale-105 transition-all flex items-center gap-2"
            >
              <span>Launch First Campaign Free</span>
              <ArrowRight className="w-4 h-4" />
            </button>
            <button
              onClick={() => onNavigate('campaigns')}
              className="px-6 py-4 rounded-2xl bg-slate-900 border border-slate-800 text-slate-200 font-bold text-sm hover:border-slate-700 transition-colors"
            >
              View Campaign Builder Demo
            </button>
          </div>
        </div>
      </section>

      {/* INTERACTIVE SEQUENCE BUILDER PREVIEW */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-slate-900 rounded-3xl p-8 border border-slate-800 space-y-8">
          <div className="flex items-center justify-between border-b border-slate-800 pb-4">
            <div>
              <h2 className="text-xl font-black text-white flex items-center gap-2">
                <Layers className="w-5 h-5 text-emerald-400" />
                Multi-Step Outreach Sequence Simulator
              </h2>
              <p className="text-xs text-slate-400">Click sequence steps to preview automated follow-up triggers.</p>
            </div>
            <span className="text-xs font-bold text-emerald-400 bg-emerald-500/10 px-3 py-1 rounded-full border border-emerald-500/20">
              AI Spintax Enabled
            </span>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
            {/* Step Selection List */}
            <div className="lg:col-span-4 space-y-3">
              {[
                { step: 1, title: 'Step 1: Initial Hook Email', delay: 'Day 1 (Immediate)', icon: Mail },
                { step: 2, title: 'Step 2: Value Case Follow-up', delay: 'Wait 3 Days', icon: Clock },
                { step: 3, title: 'Step 3: Social Proof & Demo Link', delay: 'Wait 4 Days', icon: Sparkles },
                { step: 4, title: 'Step 4: Breakup & Final Check-in', delay: 'Wait 5 Days', icon: Send },
              ].map(s => {
                const Icon = s.icon;
                const isSelected = activeStep === s.step;
                return (
                  <button
                    key={s.step}
                    onClick={() => setActiveStep(s.step)}
                    className={`w-full text-left p-4 rounded-2xl border transition-all flex items-center justify-between ${
                      isSelected 
                        ? 'bg-gradient-to-r from-emerald-600/20 to-indigo-600/20 border-emerald-500 text-white shadow-lg' 
                        : 'bg-slate-950 border-slate-800 text-slate-400 hover:border-slate-700'
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      <div className={`w-8 h-8 rounded-xl flex items-center justify-center font-bold text-xs ${isSelected ? 'bg-emerald-500 text-slate-950' : 'bg-slate-900 text-slate-400'}`}>
                        {s.step}
                      </div>
                      <div>
                        <p className="text-xs font-extrabold text-white">{s.title}</p>
                        <p className="text-[10px] text-slate-400">{s.delay}</p>
                      </div>
                    </div>
                    <Icon className="w-4 h-4 text-emerald-400" />
                  </button>
                );
              })}
            </div>

            {/* Step Content Preview */}
            <div className="lg:col-span-8 bg-slate-950 p-6 rounded-2xl border border-slate-800 space-y-4">
              <div className="flex items-center justify-between pb-3 border-b border-slate-800">
                <span className="text-xs font-bold text-slate-400">Step {activeStep} Preview</span>
                <span className="text-[10px] bg-indigo-500/10 text-indigo-400 px-2.5 py-1 rounded-md font-bold">
                  Dynamic Variables: {'{{first_name}}'}, {'{{company}}'}
                </span>
              </div>

              {activeStep === 1 && (
                <div className="space-y-3">
                  <p className="text-xs font-bold text-indigo-400">Subject: Quick question regarding {'{{company}}'}&apos;s email infrastructure</p>
                  <div className="p-4 bg-slate-900 rounded-xl border border-slate-800 text-xs text-slate-300 leading-relaxed font-mono whitespace-pre-line">
                    {`Hi {{first_name}},

I noticed {{company}} has been expanding sales outreach recently. Are you currently experiencing deliverability drops or emails landing in spam?

We built Inboxes Email to help teams like yours achieve 99.4% inbox placement automatically...

Best,
Alex`}
                  </div>
                </div>
              )}

              {activeStep === 2 && (
                <div className="space-y-3">
                  <p className="text-xs font-bold text-indigo-400">Subject: Re: Quick question regarding {'{{company}}'}&apos;s email infrastructure</p>
                  <div className="p-4 bg-slate-900 rounded-xl border border-slate-800 text-xs text-slate-300 leading-relaxed font-mono whitespace-pre-line">
                    {`Hi {{first_name}},

Following up on my previous note. Most growth teams waste 30%+ of their cold emails due to bad warmup and missing SPF/DKIM checks.

Would you be open to a 5-minute audit of your sending domains this week?`}
                  </div>
                </div>
              )}

              {activeStep === 3 && (
                <div className="space-y-3">
                  <p className="text-xs font-bold text-indigo-400">Subject: Case study: How CloudScale generated 140+ meetings</p>
                  <div className="p-4 bg-slate-900 rounded-xl border border-slate-800 text-xs text-slate-300 leading-relaxed font-mono whitespace-pre-line">
                    {`Hi {{first_name}},

Thought you might find this interesting — CloudScale increased their booked meeting rate by 310% in 30 days using our multi-inbox rotation...

Here is a 2-minute video breakdown of their setup: [Link]`}
                  </div>
                </div>
              )}

              {activeStep === 4 && (
                <div className="space-y-3">
                  <p className="text-xs font-bold text-indigo-400">Subject: Permission to close your file?</p>
                  <div className="p-4 bg-slate-900 rounded-xl border border-slate-800 text-xs text-slate-300 leading-relaxed font-mono whitespace-pre-line">
                    {`Hi {{first_name}},

I assume email deliverability isn't a priority for {{company}} right now. I won't bug you again. Feel free to reach out if priorities shift!`}
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* OUTREACH FEATURES GRID */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-1 md:grid-cols-3 gap-8">
        <div className="bg-slate-900 p-6 rounded-2xl border border-slate-800 space-y-3">
          <div className="w-10 h-10 rounded-xl bg-emerald-500/10 text-emerald-400 flex items-center justify-center border border-emerald-500/20">
            <RefreshCw className="w-5 h-5" />
          </div>
          <h3 className="font-extrabold text-white text-base">Smart Inbox Rotation</h3>
          <p className="text-slate-400 text-xs leading-relaxed">
            Distribute campaign volume dynamically across 10+ sender accounts so no single inbox sends more than 30-50 emails per day.
          </p>
        </div>

        <div className="bg-slate-900 p-6 rounded-2xl border border-slate-800 space-y-3">
          <div className="w-10 h-10 rounded-xl bg-indigo-500/10 text-indigo-400 flex items-center justify-center border border-indigo-500/20">
            <Bot className="w-5 h-5" />
          </div>
          <h3 className="font-extrabold text-white text-base">AI Spintax Generator</h3>
          <p className="text-slate-400 text-xs leading-relaxed">
            Automatically create hundreds of unique message variations to ensure spam filters never detect repetitive email body patterns.
          </p>
        </div>

        <div className="bg-slate-900 p-6 rounded-2xl border border-slate-800 space-y-3">
          <div className="w-10 h-10 rounded-xl bg-cyan-500/10 text-cyan-400 flex items-center justify-center border border-cyan-500/20">
            <Inbox className="w-5 h-5" />
          </div>
          <h3 className="font-extrabold text-white text-base">Unified Master Inbox</h3>
          <p className="text-slate-400 text-xs leading-relaxed">
            Read and reply to interested prospect responses across all connected sending accounts from a single centralized dashboard.
          </p>
        </div>
      </section>

      {/* CTA BANNER */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-gradient-to-r from-emerald-600 via-indigo-600 to-violet-600 rounded-3xl p-10 text-center text-white space-y-4">
          <h2 className="text-3xl font-black">Supercharge Your Cold Email Campaigns</h2>
          <p className="text-slate-200 text-xs max-w-xl mx-auto">Get started with multi-inbox outreach in minutes with our 14-day free trial.</p>
          <button
            onClick={() => onNavigate('public-signup')}
            className="px-8 py-3.5 rounded-xl bg-white text-slate-900 font-extrabold text-xs shadow-xl hover:bg-emerald-50"
          >
            Start Cold Outreach Trial
          </button>
        </div>
      </section>

    </div>
  );
};
