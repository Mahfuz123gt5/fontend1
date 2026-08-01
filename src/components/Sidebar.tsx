import React, { useState } from 'react';
import { 
  Inbox, 
  FlaskConical, 
  Send, 
  FileText, 
  Magnet, 
  Puzzle, 
  Users, 
  MailCheck, 
  ChevronDown, 
  ChevronRight, 
  ChevronLeft, 
  User, 
  CreditCard, 
  Bell, 
  Gift, 
  Key, 
  LogOut,
  Mail,
  ShieldCheck,
  Globe,
  Flame,
  BookOpen,
  UserPlus,
  LogIn
} from 'lucide-react';
import { AccountSettingsSubTab, MainTab } from '../types';
import { TAB_TO_PATH } from '../utils/router';

interface SidebarProps {
  currentTab: MainTab;
  onNavigate: (tab: MainTab, accountSubTab?: AccountSettingsSubTab) => void;
}

export const Sidebar: React.FC<SidebarProps> = ({ currentTab, onNavigate }) => {
  const [collapsed, setCollapsed] = useState(false);
  const [warmupOpen, setWarmupOpen] = useState(true);
  const [outreachOpen, setOutreachOpen] = useState(true);
  const [leadGenOpen, setLeadGenOpen] = useState(true);
  const [contactsOpen, setContactsOpen] = useState(true);
  const [publicPagesOpen, setPublicPagesOpen] = useState(false);
  const [accountMenuOpen, setAccountMenuOpen] = useState(false);

  const isActive = (tabs: MainTab[]) => tabs.includes(currentTab);

  const getNavBtnClass = (tabs: MainTab[]) => {
    const active = isActive(tabs);
    if (active) {
      return 'bg-violet-600/10 text-violet-600 font-extrabold border-l-4 border-violet-600 shadow-xs';
    }
    return 'text-slate-500 hover:bg-slate-100/80 font-semibold';
  };

  return (
    <aside 
      id="sidebar" 
      className={`bg-white text-slate-600 flex flex-col justify-between h-screen transition-all duration-300 relative border-r border-slate-100 ${
        collapsed ? 'w-20' : 'w-64'
      } shrink-0 select-none z-30 shadow-xs`}
    >
      <div>
        {/* Top Brand Header */}
        <div className={`h-20 flex items-center border-b border-slate-100 transition-all ${
          collapsed ? 'px-2 justify-center relative' : 'px-5 justify-between'
        }`}>
          {collapsed ? (
            <button 
              onClick={() => setCollapsed(false)}
              className="flex items-center justify-center w-10 h-10 rounded-xl bg-gradient-to-tr from-blue-600 via-indigo-600 to-violet-600 text-white shadow-md shadow-blue-500/20 font-black relative group cursor-pointer"
              title="Expand sidebar"
            >
              <Mail className="w-5 h-5 transition-all group-hover:scale-0 group-hover:opacity-0" />
              <ChevronRight className="w-5 h-5 absolute transition-all scale-0 opacity-0 group-hover:scale-100 group-hover:opacity-100" />
            </button>
          ) : (
            <>
              <div 
                className="flex items-center gap-2.5 cursor-pointer shrink-0" 
                onClick={() => onNavigate('inboxes')}
                title="Inboxes Email"
              >
                <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-blue-600 via-indigo-600 to-violet-600 flex items-center justify-center text-white shrink-0 shadow-md shadow-blue-500/20 font-black text-base">
                  <Mail className="w-4.5 h-4.5" />
                </div>
                <span id="brand-title" className="font-extrabold text-slate-900 text-base tracking-tight whitespace-nowrap overflow-hidden text-ellipsis">
                  Inboxes Email
                </span>
              </div>
              <button 
                onClick={() => setCollapsed(true)}
                className="p-1.5 rounded-lg hover:bg-slate-100 text-slate-400 hover:text-slate-700 transition-all shrink-0 cursor-pointer"
                title="Collapse sidebar"
              >
                <ChevronLeft className="w-4 h-4" />
              </button>
            </>
          )}
        </div>

        {/* Navigation Links */}
        <div className={`space-y-2 overflow-y-auto max-h-[calc(100vh-160px)] custom-scrollbar text-xs font-semibold ${
          collapsed ? 'p-2' : 'p-3'
        }`}>
          
          {/* WARMUP ENGINE SECTION */}
          <div>
            {!collapsed ? (
              <button 
                onClick={() => setWarmupOpen(!warmupOpen)}
                className="w-full flex items-center justify-between px-3 py-2 text-[10px] font-black uppercase text-slate-400 tracking-wider hover:text-slate-600"
              >
                <span>Warmup Engine</span>
                {warmupOpen ? <ChevronDown className="w-3.5 h-3.5" /> : <ChevronRight className="w-3.5 h-3.5" />}
              </button>
            ) : (
              <div className="h-px bg-slate-100 my-2" />
            )}

            {(warmupOpen || collapsed) && (
              <div className="mt-1 space-y-1">
                <button
                  id="nav-inboxes"
                  onClick={() => onNavigate('inboxes')}
                  className={`w-full flex items-center ${collapsed ? 'justify-center px-2' : 'gap-3 px-3.5'} py-2.5 rounded-2xl transition-all ${getNavBtnClass(['inboxes', 'inbox-detail', 'inbox-settings'])}`}
                  title="Inboxes Overview"
                >
                  <Inbox className="w-4 h-4 shrink-0" />
                  {!collapsed && <span className="nav-text text-xs">Inboxes Overview</span>}
                </button>

                <button
                  id="nav-tester"
                  onClick={() => onNavigate('inboxes-tester')}
                  className={`w-full flex items-center ${collapsed ? 'justify-center px-2' : 'gap-3 px-3.5'} py-2.5 rounded-2xl transition-all ${getNavBtnClass(['inboxes-tester'])}`}
                  title="Deliverability Suite"
                >
                  <FlaskConical className="w-4 h-4 shrink-0" />
                  {!collapsed && <span className="nav-text text-xs">Deliverability Suite</span>}
                </button>
              </div>
            )}
          </div>

          {/* OUTREACH SECTION */}
          <div>
            {!collapsed ? (
              <button 
                onClick={() => setOutreachOpen(!outreachOpen)}
                className="w-full flex items-center justify-between px-3 py-2 text-[10px] font-black uppercase text-slate-400 tracking-wider hover:text-slate-600"
              >
                <span>Outreach</span>
                {outreachOpen ? <ChevronDown className="w-3.5 h-3.5" /> : <ChevronRight className="w-3.5 h-3.5" />}
              </button>
            ) : (
              <div className="h-px bg-slate-100 my-2" />
            )}

            {(outreachOpen || collapsed) && (
              <div className="mt-1 space-y-1">
                <button
                  id="nav-campaigns"
                  onClick={() => onNavigate('campaigns')}
                  className={`w-full flex items-center ${collapsed ? 'justify-center px-2' : 'gap-3 px-3.5'} py-2.5 rounded-2xl transition-all ${getNavBtnClass(['campaigns', 'campaign-new', 'campaign-detail'])}`}
                  title="Campaigns"
                >
                  <Send className="w-4 h-4 shrink-0" />
                  {!collapsed && <span className="nav-text text-xs">Campaigns</span>}
                </button>

                <button
                  id="nav-templates"
                  onClick={() => onNavigate('templates')}
                  className={`w-full flex items-center ${collapsed ? 'justify-center px-2' : 'gap-3 px-3.5'} py-2.5 rounded-2xl transition-all ${getNavBtnClass(['templates', 'template-new', 'template-detail'])}`}
                  title="AI Templates"
                >
                  <FileText className="w-4 h-4 shrink-0" />
                  {!collapsed && <span className="nav-text text-xs">AI Templates</span>}
                </button>
              </div>
            )}
          </div>

          {/* LEAD GENERATION SECTION */}
          <div>
            {!collapsed ? (
              <button 
                onClick={() => setLeadGenOpen(!leadGenOpen)}
                className="w-full flex items-center justify-between px-3 py-2 text-[10px] font-black uppercase text-slate-400 tracking-wider hover:text-slate-600"
              >
                <span>Lead Generation</span>
                {leadGenOpen ? <ChevronDown className="w-3.5 h-3.5" /> : <ChevronRight className="w-3.5 h-3.5" />}
              </button>
            ) : (
              <div className="h-px bg-slate-100 my-2" />
            )}

            {(leadGenOpen || collapsed) && (
              <div className="mt-1 space-y-1">
                <button
                  id="nav-leadsearch"
                  onClick={() => onNavigate('lead-search')}
                  className={`w-full flex items-center ${collapsed ? 'justify-center px-2' : 'gap-3 px-3.5'} py-2.5 rounded-2xl transition-all ${getNavBtnClass(['lead-search'])}`}
                  title="Lead Search"
                >
                  <Magnet className="w-4 h-4 shrink-0" />
                  {!collapsed && <span className="nav-text text-xs">Lead Search</span>}
                </button>

                <button
                  id="nav-verifier"
                  onClick={() => onNavigate('email-verifier')}
                  className={`w-full flex items-center ${collapsed ? 'justify-center px-2' : 'gap-3 px-3.5'} py-2.5 rounded-2xl transition-all ${getNavBtnClass(['email-verifier'])}`}
                  title="Email Verifier"
                >
                  <ShieldCheck className="w-4 h-4 shrink-0" />
                  {!collapsed && <span className="nav-text text-xs">Email Verifier</span>}
                </button>
              </div>
            )}
          </div>

          {/* CONTACTS & TOOLS SECTION */}
          <div>
            {!collapsed ? (
              <button 
                onClick={() => setContactsOpen(!contactsOpen)}
                className="w-full flex items-center justify-between px-3 py-2 text-[10px] font-black uppercase text-slate-400 tracking-wider hover:text-slate-600"
              >
                <span>Contacts & Tools</span>
                {contactsOpen ? <ChevronDown className="w-3.5 h-3.5" /> : <ChevronRight className="w-3.5 h-3.5" />}
              </button>
            ) : (
              <div className="h-px bg-slate-100 my-2" />
            )}

            {(contactsOpen || collapsed) && (
              <div className="mt-1 space-y-1">
                <button
                  id="nav-contacts"
                  onClick={() => onNavigate('contacts')}
                  className={`w-full flex items-center ${collapsed ? 'justify-center px-2' : 'gap-3 px-3.5'} py-2.5 rounded-2xl transition-all ${getNavBtnClass(['contacts', 'contact-import'])}`}
                  title="Contacts Directory"
                >
                  <Users className="w-4 h-4 shrink-0" />
                  {!collapsed && <span className="nav-text text-xs">Contacts Directory</span>}
                </button>

                <button
                  id="nav-extensions"
                  onClick={() => onNavigate('extensions')}
                  className={`w-full flex items-center ${collapsed ? 'justify-center px-2' : 'gap-3 px-3.5'} py-2.5 rounded-2xl transition-all ${getNavBtnClass(['extensions'])}`}
                  title="Integrations"
                >
                  <Puzzle className="w-4 h-4 shrink-0" />
                  {!collapsed && <span className="nav-text text-xs">Integrations</span>}
                </button>
              </div>
            )}
          </div>

          {/* PUBLIC & MARKETING PAGES */}
          <div>
            {!collapsed ? (
              <button 
                onClick={() => setPublicPagesOpen(!publicPagesOpen)}
                className="w-full flex items-center justify-between px-3 py-2 text-[10px] font-black uppercase text-indigo-500 tracking-wider hover:text-indigo-700"
              >
                <span className="flex items-center gap-1.5"><Globe className="w-3 h-3" /> Public & Marketing</span>
                {publicPagesOpen ? <ChevronDown className="w-3.5 h-3.5" /> : <ChevronRight className="w-3.5 h-3.5" />}
              </button>
            ) : (
              <div className="h-px bg-slate-100 my-2" />
            )}

            {(publicPagesOpen || collapsed) && (
              <div className={`mt-1 space-y-1 ${collapsed ? '' : 'pl-1'}`}>
                <a
                  href="#/"
                  onClick={(e) => { e.preventDefault(); onNavigate('public-home'); }}
                  className={`w-full flex items-center ${collapsed ? 'justify-center px-2' : 'gap-2.5 px-3'} py-2 rounded-xl text-xs transition-all ${getNavBtnClass(['public-home'])}`}
                  title="Main Home Page"
                >
                  <Globe className="w-3.5 h-3.5 shrink-0 text-indigo-500" />
                  {!collapsed && <span className="truncate">Main Home Page</span>}
                </a>
                <a
                  href="#/warmup"
                  onClick={(e) => { e.preventDefault(); onNavigate('public-warmup'); }}
                  className={`w-full flex items-center ${collapsed ? 'justify-center px-2' : 'gap-2.5 px-3'} py-2 rounded-xl text-xs transition-all ${getNavBtnClass(['public-warmup'])}`}
                  title="Email Warmup Page"
                >
                  <Flame className="w-3.5 h-3.5 shrink-0 text-amber-500" />
                  {!collapsed && <span className="truncate">Email Warmup Page</span>}
                </a>
                <a
                  href="#/leadgen"
                  onClick={(e) => { e.preventDefault(); onNavigate('public-leadgen'); }}
                  className={`w-full flex items-center ${collapsed ? 'justify-center px-2' : 'gap-2.5 px-3'} py-2 rounded-xl text-xs transition-all ${getNavBtnClass(['public-leadgen'])}`}
                  title="Lead Generation Page"
                >
                  <Users className="w-3.5 h-3.5 shrink-0 text-cyan-500" />
                  {!collapsed && <span className="truncate">Lead Gen Page</span>}
                </a>
                <a
                  href="#/outreach"
                  onClick={(e) => { e.preventDefault(); onNavigate('public-outreach'); }}
                  className={`w-full flex items-center ${collapsed ? 'justify-center px-2' : 'gap-2.5 px-3'} py-2 rounded-xl text-xs transition-all ${getNavBtnClass(['public-outreach'])}`}
                  title="Email Outreach Page"
                >
                  <Send className="w-3.5 h-3.5 shrink-0 text-emerald-500" />
                  {!collapsed && <span className="truncate">Email Outreach Page</span>}
                </a>
                <a
                  href="#/pricing"
                  onClick={(e) => { e.preventDefault(); onNavigate('public-pricing'); }}
                  className={`w-full flex items-center ${collapsed ? 'justify-center px-2' : 'gap-2.5 px-3'} py-2 rounded-xl text-xs transition-all ${getNavBtnClass(['public-pricing'])}`}
                  title="Pricing Page"
                >
                  <CreditCard className="w-3.5 h-3.5 shrink-0 text-purple-500" />
                  {!collapsed && <span className="truncate">Pricing Page</span>}
                </a>
                <a
                  href="#/blog"
                  onClick={(e) => { e.preventDefault(); onNavigate('public-blog'); }}
                  className={`w-full flex items-center ${collapsed ? 'justify-center px-2' : 'gap-2.5 px-3'} py-2 rounded-xl text-xs transition-all ${getNavBtnClass(['public-blog'])}`}
                  title="Blog & Guides Page"
                >
                  <BookOpen className="w-3.5 h-3.5 shrink-0 text-blue-500" />
                  {!collapsed && <span className="truncate">Blog / Knowledge Base</span>}
                </a>
                <a
                  href="#/signup"
                  onClick={(e) => { e.preventDefault(); onNavigate('public-signup'); }}
                  className={`w-full flex items-center ${collapsed ? 'justify-center px-2' : 'gap-2.5 px-3'} py-2 rounded-xl text-xs transition-all ${getNavBtnClass(['public-signup'])}`}
                  title="Sign-up Page"
                >
                  <UserPlus className="w-3.5 h-3.5 shrink-0 text-violet-500" />
                  {!collapsed && <span className="truncate">Sign-Up / Register</span>}
                </a>
                <a
                  href="#/login"
                  onClick={(e) => { e.preventDefault(); onNavigate('public-login'); }}
                  className={`w-full flex items-center ${collapsed ? 'justify-center px-2' : 'gap-2.5 px-3'} py-2 rounded-xl text-xs transition-all ${getNavBtnClass(['public-login'])}`}
                  title="Login Page"
                >
                  <LogIn className="w-3.5 h-3.5 shrink-0 text-indigo-500" />
                  {!collapsed && <span className="truncate">Login Page</span>}
                </a>
                <a
                  href="#/privacy"
                  onClick={(e) => { e.preventDefault(); onNavigate('public-privacy'); }}
                  className={`w-full flex items-center ${collapsed ? 'justify-center px-2' : 'gap-2.5 px-3'} py-2 rounded-xl text-xs transition-all ${getNavBtnClass(['public-privacy'])}`}
                  title="Privacy & Terms Page"
                >
                  <ShieldCheck className="w-3.5 h-3.5 shrink-0 text-teal-500" />
                  {!collapsed && <span className="truncate">Privacy Policy & Terms</span>}
                </a>
              </div>
            )}
          </div>

        </div>
      </div>

      {/* Sidebar Footer User Card */}
      <div className={`border-t border-slate-100 relative ${collapsed ? 'p-2' : 'p-3'}`}>
        {accountMenuOpen && (
          <div className={`absolute bg-white border border-slate-200 rounded-2xl shadow-2xl py-2 z-50 text-slate-700 animate-in fade-in slide-in-from-bottom-2 duration-200 ${
            collapsed ? 'bottom-2 left-16 w-56 ml-1' : 'bottom-16 left-3 right-3'
          }`}>
            <div className="px-3 py-2 border-b border-slate-100 mb-1">
              <p className="text-[10px] font-bold text-slate-400 uppercase">Signed in as</p>
              <p className="text-xs font-extrabold truncate text-slate-900">ruhoms06@gmail.com</p>
            </div>
            <button 
              onClick={() => { onNavigate('account-settings', 'profile'); setAccountMenuOpen(false); }}
              className="w-full text-left px-3 py-2 text-xs hover:bg-slate-50 flex items-center gap-2.5 font-bold transition-colors text-slate-700"
            >
              <User className="w-4 h-4 text-violet-600" />
              <span>Your Account</span>
            </button>
            <button 
              onClick={() => { onNavigate('account-settings', 'billing'); setAccountMenuOpen(false); }}
              className="w-full text-left px-3 py-2 text-xs hover:bg-slate-50 flex items-center gap-2.5 font-bold transition-colors text-slate-700"
            >
              <CreditCard className="w-4 h-4 text-violet-600" />
              <span>Billing & Subscription</span>
            </button>
            <button 
              onClick={() => { onNavigate('account-settings', 'alerts'); setAccountMenuOpen(false); }}
              className="w-full text-left px-3 py-2 text-xs hover:bg-slate-50 flex items-center gap-2.5 font-bold transition-colors text-slate-700"
            >
              <Bell className="w-4 h-4 text-violet-600" />
              <span>Alerts & Deliverability Reports</span>
            </button>
            <button 
              onClick={() => { onNavigate('account-settings', 'referral'); setAccountMenuOpen(false); }}
              className="w-full text-left px-3 py-2 text-xs hover:bg-slate-50 flex items-center gap-2.5 font-bold transition-colors text-slate-700"
            >
              <Gift className="w-4 h-4 text-violet-600" />
              <span>Referral Program</span>
            </button>
            <button 
              onClick={() => { onNavigate('account-settings', 'api-key'); setAccountMenuOpen(false); }}
              className="w-full text-left px-3 py-2 text-xs hover:bg-slate-50 flex items-center gap-2.5 font-bold transition-colors text-slate-700"
            >
              <Key className="w-4 h-4 text-violet-600" />
              <span>API key</span>
            </button>
            <div className="h-px bg-slate-100 my-1" />
            <button 
              onClick={() => setAccountMenuOpen(false)}
              className="w-full text-left px-3 py-2 text-xs hover:bg-rose-50 text-rose-600 flex items-center gap-2.5 font-bold transition-colors"
            >
              <LogOut className="w-4 h-4" />
              <span>Log Out</span>
            </button>
          </div>
        )}

        <div className={`bg-slate-50 rounded-2xl border border-slate-100 flex items-center ${
          collapsed ? 'p-1.5 justify-center' : 'p-2.5 justify-between'
        }`}>
          <button 
            onClick={() => setAccountMenuOpen(!accountMenuOpen)}
            className={`flex items-center gap-3 text-left w-full overflow-hidden ${
              collapsed ? 'justify-center' : ''
            }`}
            title="Mahfuz Hassan (Pro Workspace)"
          >
            <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-blue-600 to-indigo-600 flex items-center justify-center font-black text-white text-xs shadow-md shrink-0">
              MH
            </div>
            {!collapsed && (
              <div className="overflow-hidden">
                <div className="text-xs font-extrabold text-slate-900 truncate">Mahfuz Hassan</div>
                <div className="text-[10px] text-emerald-600 font-bold">Pro Workspace</div>
              </div>
            )}
          </button>
          {!collapsed && (
            <button 
              onClick={() => setAccountMenuOpen(!accountMenuOpen)}
              className="text-slate-400 hover:text-slate-700 p-1 rounded-lg shrink-0"
            >
              <ChevronDown className={`w-3.5 h-3.5 transition-transform ${accountMenuOpen ? 'rotate-180' : ''}`} />
            </button>
          )}
        </div>
      </div>
    </aside>
  );
};

