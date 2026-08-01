import React, { useState } from 'react';
import { 
  Mail, 
  Flame, 
  Users, 
  Send, 
  CreditCard, 
  BookOpen, 
  ShieldCheck, 
  LogIn, 
  UserPlus, 
  ArrowRight, 
  CheckCircle2, 
  Menu, 
  X, 
  Globe, 
  LayoutDashboard,
  Sparkles,
  ChevronRight
} from 'lucide-react';
import { MainTab } from '../../../types';
import { TAB_TO_PATH } from '../../../utils/router';

interface PublicLayoutProps {
  currentTab: MainTab;
  onNavigate: (tab: MainTab) => void;
  children: React.ReactNode;
}

export const PublicLayout: React.FC<PublicLayoutProps> = ({ currentTab, onNavigate, children }) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navItems = [
    { id: 'public-home', label: 'Home', icon: Mail },
    { id: 'public-warmup', label: 'Email Warmup', icon: Flame },
    { id: 'public-leadgen', label: 'Lead Generation', icon: Users },
    { id: 'public-outreach', label: 'Email Outreach', icon: Send },
    { id: 'public-pricing', label: 'Pricing', icon: CreditCard },
    { id: 'public-blog', label: 'Blog & Guides', icon: BookOpen },
  ];

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col font-sans selection:bg-indigo-500 selection:text-white">
      {/* Top Banner Notice */}
      <div className="bg-gradient-to-r from-violet-600 via-indigo-600 to-blue-600 text-white text-xs font-semibold py-2 px-4 text-center flex items-center justify-center gap-2">
        <Sparkles className="w-3.5 h-3.5 text-amber-300 animate-pulse" />
        <span>Inboxes Email 2.0 Live: 10x Faster Deliverability Engine & AI Peer-to-Peer Warmup!</span>
        <button 
          onClick={() => onNavigate('public-pricing')}
          className="underline hover:text-amber-200 font-extrabold ml-1 flex items-center gap-0.5"
        >
          Claim 14-Day Free Trial <ChevronRight className="w-3 h-3" />
        </button>
      </div>

      {/* Main Header / Navbar */}
      <header className="sticky top-0 z-50 bg-slate-900/90 backdrop-blur-xl border-b border-slate-800/80">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between">
          
          {/* Logo Brand */}
          <a 
            href="#/"
            onClick={(e) => { e.preventDefault(); onNavigate('public-home'); }}
            className="flex items-center gap-3 cursor-pointer group"
          >
            <div className="w-11 h-11 rounded-2xl bg-gradient-to-tr from-blue-600 via-indigo-600 to-violet-600 flex items-center justify-center text-white shadow-lg shadow-indigo-500/25 group-hover:scale-105 transition-transform">
              <Mail className="w-6 h-6" />
            </div>
            <div>
              <span className="font-extrabold text-xl text-white tracking-tight flex items-center gap-1.5">
                Inboxes <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 to-cyan-400">Email</span>
              </span>
              <span className="text-[10px] text-slate-400 font-bold block -mt-1 tracking-wider uppercase">Deliverability & Outreach Platform</span>
            </div>
          </a>

          {/* Desktop Navigation Links */}
          <nav className="hidden md:flex items-center gap-1 bg-slate-800/50 p-1.5 rounded-2xl border border-slate-700/50">
            {navItems.map(item => {
              const Icon = item.icon;
              const isActive = currentTab === item.id;
              const path = TAB_TO_PATH[item.id as MainTab] || '/';
              return (
                <a
                  key={item.id}
                  href={'#' + path}
                  onClick={(e) => {
                    e.preventDefault();
                    onNavigate(item.id as MainTab);
                  }}
                  className={`flex items-center gap-2 px-3.5 py-2 rounded-xl text-xs font-bold transition-all ${
                    isActive 
                      ? 'bg-gradient-to-r from-indigo-600 to-violet-600 text-white shadow-md shadow-indigo-500/20' 
                      : 'text-slate-300 hover:text-white hover:bg-slate-700/50'
                  }`}
                >
                  <Icon className="w-3.5 h-3.5" />
                  <span>{item.label}</span>
                </a>
              );
            })}
          </nav>

          {/* Action Buttons */}
          <div className="hidden lg:flex items-center gap-3">
            <a
              href="#/app/inboxes"
              onClick={(e) => { e.preventDefault(); onNavigate('inboxes'); }}
              className="flex items-center gap-2 px-3.5 py-2 rounded-xl text-xs font-extrabold bg-slate-800 text-slate-200 border border-slate-700 hover:bg-slate-700 transition-colors"
              title="Switch to App Dashboard"
            >
              <LayoutDashboard className="w-4 h-4 text-cyan-400" />
              <span>App Dashboard</span>
            </a>

            <a
              href="#/login"
              onClick={(e) => { e.preventDefault(); onNavigate('public-login'); }}
              className="flex items-center gap-2 px-3.5 py-2 rounded-xl text-xs font-extrabold text-slate-300 hover:text-white hover:bg-slate-800 transition-colors"
            >
              <LogIn className="w-4 h-4 text-indigo-400" />
              <span>Log In</span>
            </a>

            <a
              href="#/signup"
              onClick={(e) => { e.preventDefault(); onNavigate('public-signup'); }}
              className="flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs font-extrabold bg-gradient-to-r from-indigo-500 via-indigo-600 to-violet-600 text-white shadow-lg shadow-indigo-500/30 hover:shadow-indigo-500/50 hover:scale-[1.02] active:scale-95 transition-all"
            >
              <UserPlus className="w-4 h-4" />
              <span>Start Free Trial</span>
            </a>
          </div>

          {/* Mobile menu trigger */}
          <button 
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden p-2 rounded-xl bg-slate-800 border border-slate-700 text-slate-300"
          >
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>

        {/* Mobile dropdown menu */}
        {mobileMenuOpen && (
          <div className="md:hidden bg-slate-900 border-b border-slate-800 px-4 pt-3 pb-6 space-y-2 animate-in slide-in-from-top duration-200">
            {navItems.map(item => {
              const Icon = item.icon;
              const path = TAB_TO_PATH[item.id as MainTab] || '/';
              return (
                <a
                  key={item.id}
                  href={'#' + path}
                  onClick={(e) => {
                    e.preventDefault();
                    onNavigate(item.id as MainTab);
                    setMobileMenuOpen(false);
                  }}
                  className="w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-bold text-slate-200 hover:bg-slate-800 text-left"
                >
                  <Icon className="w-4 h-4 text-indigo-400" />
                  <span>{item.label}</span>
                </a>
              );
            })}
            <div className="pt-3 border-t border-slate-800 flex flex-col gap-2">
              <a
                href="#/app/inboxes"
                onClick={(e) => { e.preventDefault(); onNavigate('inboxes'); setMobileMenuOpen(false); }}
                className="w-full flex items-center justify-center gap-2 px-4 py-3 rounded-xl text-xs font-extrabold bg-slate-800 text-slate-200 border border-slate-700"
              >
                <LayoutDashboard className="w-4 h-4 text-cyan-400" />
                <span>Go to App Dashboard</span>
              </a>
              <div className="grid grid-cols-2 gap-2 pt-1">
                <a
                  href="#/login"
                  onClick={(e) => { e.preventDefault(); onNavigate('public-login'); setMobileMenuOpen(false); }}
                  className="w-full py-2.5 rounded-xl text-xs font-bold bg-slate-800 text-slate-200 text-center block"
                >
                  Log In
                </a>
                <a
                  href="#/signup"
                  onClick={(e) => { e.preventDefault(); onNavigate('public-signup'); setMobileMenuOpen(false); }}
                  className="w-full py-2.5 rounded-xl text-xs font-bold bg-indigo-600 text-white text-center block"
                >
                  Start Free
                </a>
              </div>
            </div>
          </div>
        )}
      </header>

      {/* Main Page Content */}
      <main className="flex-1">
        {children}
      </main>

      {/* Public Page Footer */}
      <footer className="bg-slate-950 border-t border-slate-800/80 pt-16 pb-12 text-slate-400 text-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10 pb-12 border-b border-slate-800/80">
            
            {/* Column 1: Brand Info */}
            <div className="lg:col-span-2 space-y-4">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-2xl bg-gradient-to-tr from-blue-600 to-indigo-600 flex items-center justify-center text-white shadow-md">
                  <Mail className="w-5 h-5" />
                </div>
                <span className="font-extrabold text-xl text-white">Inboxes Email</span>
              </div>
              <p className="text-slate-400 text-xs leading-relaxed max-w-sm">
                The all-in-one deliverability warmup and cold email outreach platform. Protect domain reputation, land 99.4% of emails in the primary inbox, and discover verified B2B leads.
              </p>
              <div className="flex items-center gap-3 pt-2 text-xs font-bold text-slate-300">
                <span className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-slate-900 border border-slate-800">
                  <Globe className="w-3.5 h-3.5 text-indigo-400" /> Global Peer Network
                </span>
                <span className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-slate-900 border border-slate-800">
                  <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" /> SOC2 Compliant
                </span>
              </div>
            </div>

            {/* Column 2: Solutions */}
            <div>
              <h4 className="text-white font-extrabold text-xs uppercase tracking-wider mb-4">Platform Solutions</h4>
              <ul className="space-y-2.5 text-xs font-semibold">
                <li><a href="#/warmup" onClick={(e) => { e.preventDefault(); onNavigate('public-warmup'); }} className="hover:text-white transition-colors">AI Peer Email Warmup</a></li>
                <li><a href="#/leadgen" onClick={(e) => { e.preventDefault(); onNavigate('public-leadgen'); }} className="hover:text-white transition-colors">250M+ B2B Prospect Finder</a></li>
                <li><a href="#/outreach" onClick={(e) => { e.preventDefault(); onNavigate('public-outreach'); }} className="hover:text-white transition-colors">Multi-Inbox Cold Outreach</a></li>
                <li><a href="#/app/email-verifier" onClick={(e) => { e.preventDefault(); onNavigate('email-verifier'); }} className="hover:text-white transition-colors">Real-Time Email Verifier</a></li>
                <li><a href="#/app/deliverability" onClick={(e) => { e.preventDefault(); onNavigate('inboxes-tester'); }} className="hover:text-white transition-colors">Deliverability Tester Suite</a></li>
              </ul>
            </div>

            {/* Column 3: Resources */}
            <div>
              <h4 className="text-white font-extrabold text-xs uppercase tracking-wider mb-4">Resources & Guides</h4>
              <ul className="space-y-2.5 text-xs font-semibold">
                <li><a href="#/blog" onClick={(e) => { e.preventDefault(); onNavigate('public-blog'); }} className="hover:text-white transition-colors">Cold Email Deliverability Guide</a></li>
                <li><a href="#/blog" onClick={(e) => { e.preventDefault(); onNavigate('public-blog'); }} className="hover:text-white transition-colors">SPF, DKIM & DMARC Setup</a></li>
                <li><a href="#/pricing" onClick={(e) => { e.preventDefault(); onNavigate('public-pricing'); }} className="hover:text-white transition-colors">Pricing & Plans</a></li>
                <li><a href="#/app/extensions" onClick={(e) => { e.preventDefault(); onNavigate('extensions'); }} className="hover:text-white transition-colors">Chrome Extension Integration</a></li>
                <li><a href="#/privacy" onClick={(e) => { e.preventDefault(); onNavigate('public-privacy'); }} className="hover:text-white transition-colors">Privacy Policy & Terms</a></li>
              </ul>
            </div>

            {/* Column 4: Quick Sign up */}
            <div>
              <h4 className="text-white font-extrabold text-xs uppercase tracking-wider mb-4">Stay Connected</h4>
              <p className="text-xs text-slate-400 mb-3">Get weekly deliverability tips and cold email subject line templates.</p>
              <div className="flex gap-2">
                <input 
                  type="email" 
                  placeholder="Enter work email" 
                  className="w-full bg-slate-900 border border-slate-800 rounded-xl px-3 py-2 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-indigo-500"
                />
                <button 
                  onClick={() => onNavigate('public-signup')}
                  className="bg-indigo-600 hover:bg-indigo-500 text-white px-3 py-2 rounded-xl text-xs font-bold shrink-0"
                >
                  Join
                </button>
              </div>
            </div>

          </div>

          <div className="pt-8 flex flex-col sm:flex-row items-center justify-between text-xs text-slate-500 gap-4">
            <p>© 2026 Inboxes Email Inc. All rights reserved. Designed for elite sales & growth teams.</p>
            <div className="flex items-center gap-6">
              <button onClick={() => onNavigate('public-privacy')} className="hover:text-slate-300">Privacy Policy</button>
              <button onClick={() => onNavigate('public-privacy')} className="hover:text-slate-300">Terms of Service</button>
              <button onClick={() => onNavigate('public-privacy')} className="hover:text-slate-300">Security & GDPR</button>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};
