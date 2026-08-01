import React, { useState } from 'react';
import { 
  Users, 
  Search, 
  ShieldCheck, 
  CheckCircle2, 
  ArrowRight, 
  Building2, 
  Linkedin, 
  Globe, 
  Filter, 
  Download, 
  Database,
  Briefcase
} from 'lucide-react';
import { MainTab } from '../../../types';

interface LeadGenLandingViewProps {
  onNavigate: (tab: MainTab) => void;
}

export const LeadGenLandingView: React.FC<LeadGenLandingViewProps> = ({ onNavigate }) => {
  const [selectedIndustry, setSelectedIndustry] = useState('SaaS & Software');
  const [selectedRole, setSelectedRole] = useState('VP of Sales / Marketing');

  const sampleLeads = [
    { name: 'Alex Rivera', role: 'Head of Growth', company: 'Apex AI', location: 'San Francisco, CA', email: 'a.rivera@apex.ai', status: 'Valid (99%)' },
    { name: 'Elena Rostova', role: 'VP Marketing', company: 'DataSync Corp', location: 'Austin, TX', email: 'elena@datasync.io', status: 'Valid (98%)' },
    { name: 'David Kim', role: 'Chief Revenue Officer', company: 'ScaleFlow', location: 'New York, NY', email: 'd.kim@scaleflow.com', status: 'Valid (100%)' },
  ];

  return (
    <div className="space-y-20 py-10">
      
      {/* HERO SECTION */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto space-y-6">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-cyan-500/10 border border-cyan-500/20 text-cyan-400 text-xs font-bold">
            <Users className="w-4 h-4" />
            <span>250M+ B2B Prospect Database</span>
          </div>

          <h1 className="text-4xl sm:text-5xl font-black text-white tracking-tight leading-tight">
            Discover Verified B2B Decision Makers & <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-indigo-400 to-emerald-400">Export Fresh Leads</span>
          </h1>

          <p className="text-slate-300 text-base sm:text-lg leading-relaxed font-medium">
            Find targeted decision makers by job title, company size, revenue, tech stack, and LinkedIn profile. Verified real-time with zero bounce guarantee.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-2">
            <button
              onClick={() => onNavigate('public-signup')}
              className="px-7 py-4 rounded-2xl bg-gradient-to-r from-cyan-500 via-indigo-600 to-violet-600 text-white font-extrabold text-sm shadow-xl hover:scale-105 transition-all flex items-center gap-2"
            >
              <span>Get 50 Free Lead Credits</span>
              <ArrowRight className="w-4 h-4" />
            </button>
            <button
              onClick={() => onNavigate('lead-search')}
              className="px-6 py-4 rounded-2xl bg-slate-900 border border-slate-800 text-slate-200 font-bold text-sm hover:border-slate-700 transition-colors"
            >
              Try Live Lead Search Demo
            </button>
          </div>
        </div>
      </section>

      {/* INTERACTIVE LEAD SEARCH PREVIEW */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-slate-900 rounded-3xl p-8 border border-slate-800 space-y-6">
          <div className="flex items-center justify-between border-b border-slate-800 pb-4">
            <h2 className="text-xl font-black text-white flex items-center gap-2">
              <Search className="w-5 h-5 text-cyan-400" />
              Live Lead Database Filter Preview
            </h2>
            <span className="text-xs text-slate-400 font-bold">Updated July 2026</span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <label className="text-xs font-bold text-slate-400 block mb-1.5">Industry Target</label>
              <select 
                value={selectedIndustry}
                onChange={(e) => setSelectedIndustry(e.target.value)}
                className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2.5 text-xs text-white font-bold"
              >
                <option>SaaS & Software</option>
                <option>Fintech & Banking</option>
                <option>E-Commerce & Retail</option>
                <option>Healthcare & Biotech</option>
              </select>
            </div>

            <div>
              <label className="text-xs font-bold text-slate-400 block mb-1.5">Job Seniority & Role</label>
              <select 
                value={selectedRole}
                onChange={(e) => setSelectedRole(e.target.value)}
                className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2.5 text-xs text-white font-bold"
              >
                <option>VP of Sales / Marketing</option>
                <option>CEO / Founder / Managing Director</option>
                <option>Head of Engineering / Tech</option>
                <option>HR & Talent Directors</option>
              </select>
            </div>

            <div>
              <label className="text-xs font-bold text-slate-400 block mb-1.5">Verification Filter</label>
              <div className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2.5 text-xs text-emerald-400 font-bold flex items-center gap-2">
                <ShieldCheck className="w-4 h-4" />
                <span>100% Real-Time SMTP Verified</span>
              </div>
            </div>
          </div>

          {/* Results Table */}
          <div className="space-y-3 pt-2">
            <p className="text-xs font-bold text-slate-400">Sample Results Matching Filters:</p>
            <div className="space-y-2">
              {sampleLeads.map((lead, idx) => (
                <div key={idx} className="bg-slate-950 p-4 rounded-xl border border-slate-800 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                  <div className="flex items-center gap-3">
                    <div className="w-9 h-9 rounded-xl bg-indigo-600/20 text-indigo-400 font-black text-xs flex items-center justify-center">
                      {lead.name.split(' ').map(n=>n[0]).join('')}
                    </div>
                    <div>
                      <p className="text-xs font-extrabold text-white">{lead.name}</p>
                      <p className="text-[11px] text-slate-400">{lead.role} @ <span className="text-slate-200">{lead.company}</span> • {lead.location}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3 shrink-0">
                    <span className="text-xs bg-slate-900 border border-slate-800 text-slate-300 font-mono px-3 py-1 rounded-lg">
                      {lead.email}
                    </span>
                    <span className="text-[10px] bg-emerald-500/10 text-emerald-400 px-2.5 py-1 rounded-md font-bold border border-emerald-500/20">
                      {lead.status}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* EXTENSION & INTEGRATION FEATURES */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-1 md:grid-cols-3 gap-8">
        <div className="bg-slate-900 p-6 rounded-2xl border border-slate-800 space-y-3">
          <div className="w-10 h-10 rounded-xl bg-blue-500/10 text-blue-400 flex items-center justify-center border border-blue-500/20">
            <Linkedin className="w-5 h-5" />
          </div>
          <h3 className="font-extrabold text-white text-base">LinkedIn Sales Navigator Scraper</h3>
          <p className="text-slate-400 text-xs leading-relaxed">
            Extract verified email addresses and company details directly from LinkedIn search result pages with our Chrome Extension.
          </p>
        </div>

        <div className="bg-slate-900 p-6 rounded-2xl border border-slate-800 space-y-3">
          <div className="w-10 h-10 rounded-xl bg-cyan-500/10 text-cyan-400 flex items-center justify-center border border-cyan-500/20">
            <Globe className="w-5 h-5" />
          </div>
          <h3 className="font-extrabold text-white text-base">Domain & Company Email Finder</h3>
          <p className="text-slate-400 text-xs leading-relaxed">
            Enter any company domain URL (e.g. stripe.com) to reveal all key employee contact details and organizational hierarchy.
          </p>
        </div>

        <div className="bg-slate-900 p-6 rounded-2xl border border-slate-800 space-y-3">
          <div className="w-10 h-10 rounded-xl bg-emerald-500/10 text-emerald-400 flex items-center justify-center border border-emerald-500/20">
            <Download className="w-5 h-5" />
          </div>
          <h3 className="font-extrabold text-white text-base">1-Click Campaign Import</h3>
          <p className="text-slate-400 text-xs leading-relaxed">
            Push discovered prospect contact lists straight into your cold email outreach campaigns or export as clean CSV files.
          </p>
        </div>
      </section>

      {/* CTA BANNER */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-gradient-to-r from-cyan-600 via-indigo-600 to-violet-600 rounded-3xl p-10 text-center text-white space-y-4">
          <h2 className="text-3xl font-black">Find Your Ideal Customers Now</h2>
          <p className="text-slate-200 text-xs max-w-xl mx-auto">Access 250M+ verified decision makers with 50 free credits upon sign up.</p>
          <button
            onClick={() => onNavigate('public-signup')}
            className="px-8 py-3.5 rounded-xl bg-white text-slate-900 font-extrabold text-xs shadow-xl hover:bg-cyan-50"
          >
            Claim 50 Free Search Credits
          </button>
        </div>
      </section>

    </div>
  );
};
