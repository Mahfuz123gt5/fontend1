import React, { useState } from 'react';
import { 
  ShieldCheck, 
  FileText, 
  Lock, 
  Globe, 
  CheckCircle2, 
  ArrowRight 
} from 'lucide-react';
import { MainTab } from '../../../types';

interface PrivacyTermsViewProps {
  onNavigate: (tab: MainTab) => void;
}

export const PrivacyTermsView: React.FC<PrivacyTermsViewProps> = ({ onNavigate }) => {
  const [activeTab, setActiveTab] = useState<'privacy' | 'terms' | 'gdpr'>('privacy');

  return (
    <div className="space-y-12 py-10 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
      
      {/* HEADER */}
      <div className="text-center space-y-4">
        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-xs font-bold">
          <ShieldCheck className="w-4 h-4" />
          <span>Security & Legal Compliance Center</span>
        </div>
        <h1 className="text-3xl sm:text-4xl font-black text-white">Privacy Policy, Terms & GDPR Compliance</h1>
        <p className="text-slate-400 text-xs">Last Updated: July 2026 • Effective for all Inboxes Email workspaces.</p>
      </div>

      {/* SUB TABS */}
      <div className="flex justify-center">
        <div className="inline-flex p-1.5 rounded-2xl bg-slate-900 border border-slate-800 gap-2">
          <button
            onClick={() => setActiveTab('privacy')}
            className={`px-5 py-2.5 rounded-xl text-xs font-extrabold transition-all ${
              activeTab === 'privacy' ? 'bg-indigo-600 text-white shadow-lg' : 'text-slate-400 hover:text-white'
            }`}
          >
            Privacy Policy
          </button>
          <button
            onClick={() => setActiveTab('terms')}
            className={`px-5 py-2.5 rounded-xl text-xs font-extrabold transition-all ${
              activeTab === 'terms' ? 'bg-indigo-600 text-white shadow-lg' : 'text-slate-400 hover:text-white'
            }`}
          >
            Terms of Service
          </button>
          <button
            onClick={() => setActiveTab('gdpr')}
            className={`px-5 py-2.5 rounded-xl text-xs font-extrabold transition-all ${
              activeTab === 'gdpr' ? 'bg-indigo-600 text-white shadow-lg' : 'text-slate-400 hover:text-white'
            }`}
          >
            GDPR & CCPA
          </button>
        </div>
      </div>

      {/* CONTENT BOX */}
      <div className="bg-slate-900 p-8 sm:p-10 rounded-3xl border border-slate-800 text-slate-300 text-xs leading-relaxed space-y-6 font-sans">
        
        {activeTab === 'privacy' && (
          <div className="space-y-6">
            <h2 className="text-xl font-black text-white">1. Information We Collect and How We Protect It</h2>
            <p>
              At Inboxes Email, we respect your privacy and process personal data in accordance with global data protection laws (GDPR, CCPA, CAN-SPAM Act).
            </p>
            
            <h3 className="text-sm font-bold text-white">1.1 Account Data</h3>
            <p>
              When registering, we collect your name, work email address, and connected domain details. OAuth credentials for Google Workspace and Microsoft 365 are encrypted using AES-256 standard and stored in secure hardware security modules.
            </p>

            <h3 className="text-sm font-bold text-white">1.2 Email Warmup & Peer Network Protection</h3>
            <p>
              During peer-to-peer email warmup, messages are generated dynamically by isolated AI models and exchanged exclusively with consenting peer accounts. We never read, index, or sell your private inbox emails.
            </p>

            <h3 className="text-sm font-bold text-white">1.3 Data Retention and Erasure</h3>
            <p>
              You may delete your connected inboxes or request complete account erasure at any time via Account Settings. All stored OAuth tokens and contact lists are permanently purged within 24 hours of deletion.
            </p>
          </div>
        )}

        {activeTab === 'terms' && (
          <div className="space-y-6">
            <h2 className="text-xl font-black text-white">2. Terms of Service & Acceptable Use Policy</h2>
            <p>
              By accessing Inboxes Email, you agree to abide by these terms. Our service is designed exclusively for legitimate B2B sales outreach and domain deliverability warmup.
            </p>

            <h3 className="text-sm font-bold text-white">2.1 Anti-Spam Policy</h3>
            <p>
              Users are strictly prohibited from sending unsolicited bulk consumer spam, purchasing unverified or illegally scraped email lists, or impersonating individuals or brands.
            </p>

            <h3 className="text-sm font-bold text-white">2.2 Service Availability SLA</h3>
            <p>
              We maintain 99.9% uptime for our peer warmup engine and lead verification endpoints. Scheduled maintenance windows are communicated at least 48 hours in advance.
            </p>
          </div>
        )}

        {activeTab === 'gdpr' && (
          <div className="space-y-6">
            <h2 className="text-xl font-black text-white">3. GDPR & CCPA Compliance Statement</h2>
            <p>
              Inboxes Email acts as a Data Processor for the prospect contact lists you import or discover using our search tools.
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
              <div className="bg-slate-950 p-4 rounded-xl border border-slate-800 space-y-1">
                <p className="font-extrabold text-emerald-400">Right to Access & Export</p>
                <p className="text-[11px] text-slate-400">Export all stored prospect lists and account history instantly as CSV or JSON.</p>
              </div>
              <div className="bg-slate-950 p-4 rounded-xl border border-slate-800 space-y-1">
                <p className="font-extrabold text-emerald-400">Right to be Forgotten</p>
                <p className="text-[11px] text-slate-400">One-click data erasure from our servers and backup databases.</p>
              </div>
            </div>

            <p className="pt-2">
              For questions regarding compliance or to contact our Data Protection Officer, email <span className="text-indigo-400 font-bold">privacy@inboxesemail.com</span>.
            </p>
          </div>
        )}

      </div>

    </div>
  );
};
