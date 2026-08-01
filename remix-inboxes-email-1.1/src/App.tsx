import React, { useState, useEffect } from 'react';
import { Sidebar } from './components/Sidebar';
import { ChatWidget } from './components/ChatWidget';
import { AddCreditModal } from './components/modals/AddCreditModal';
import { CreateContactListModal } from './components/modals/CreateContactListModal';
import { AuthModal } from './components/modals/AuthModal';
import { AddInboxModal } from './components/modals/AddInboxModal';

import { InboxesDashboardView } from './components/views/InboxesDashboardView';
import { InboxDetailView } from './components/views/InboxDetailView';
import { InboxSettingsView } from './components/views/InboxSettingsView';
import { InboxesTesterView } from './components/views/InboxesTesterView';
import { CampaignsListView } from './components/views/CampaignsListView';
import { CampaignDetailView } from './components/views/CampaignDetailView';
import { CampaignWizardView } from './components/views/CampaignWizardView';
import { TemplatesView } from './components/views/TemplatesView';
import { TemplateDetailView } from './components/views/TemplateDetailView';
import { TemplateEditorView } from './components/views/TemplateEditorView';
import { LeadSearchView } from './components/views/LeadSearchView';
import { ExtensionsView } from './components/views/ExtensionsView';
import { ContactsView } from './components/views/ContactsView';
import { ContactImportWizardView } from './components/views/ContactImportWizardView';
import { EmailVerifierView } from './components/views/EmailVerifierView';
import { AccountSettingsView } from './components/views/AccountSettingsView';

import { PublicLayout } from './components/views/public/PublicLayout';
import { MainHomePageView } from './components/views/public/MainHomePageView';
import { EmailWarmupLandingView } from './components/views/public/EmailWarmupLandingView';
import { LeadGenLandingView } from './components/views/public/LeadGenLandingView';
import { OutreachLandingView } from './components/views/public/OutreachLandingView';
import { SignUpView } from './components/views/public/SignUpView';
import { LoginView } from './components/views/public/LoginView';
import { PricingView } from './components/views/public/PricingView';
import { BlogResourcesView } from './components/views/public/BlogResourcesView';
import { PrivacyTermsView } from './components/views/public/PrivacyTermsView';

import { 
  initialInboxes, 
  initialCampaigns, 
  initialContactLists, 
  initialTemplates, 
  initialVerifications 
} from './mockData';
import { MainTab, Inbox, Campaign, ContactList, EmailTemplate, VerificationResult, TemplateType, AccountSettingsSubTab } from './types';
import { getTabFromUrl, updateUrlForTab } from './utils/router';
import { FlaskConical, CheckCircle2, User as UserIcon, LogIn, LogOut, ShieldCheck, Globe } from 'lucide-react';
import { 
  getAuthToken, 
  setAuthToken, 
  getCurrentUser, 
  fetchInboxes, 
  toggleInboxStatusApi, 
  updateInbox, 
  deleteInboxApi, 
  createInbox, 
  AuthResponse 
} from './services/api';

interface ToastNotification {
  id: string;
  message: string;
  type: 'success' | 'info' | 'warning';
}

export default function App() {
  const [currentTab, setCurrentTab] = useState<MainTab>(getTabFromUrl);
  const [accountSubTab, setAccountSubTab] = useState<AccountSettingsSubTab>('profile');

  // Unified navigation handler that updates state and URL
  const handleNavigate = (tab: MainTab, subTab?: AccountSettingsSubTab) => {
    if (subTab) setAccountSubTab(subTab);
    if (tab === 'campaign-new') setEditingCampaign(null);
    if (tab === 'template-new') setEditingTemplate(null);
    setCurrentTab(tab);
    updateUrlForTab(tab);
  };

  // Listen to browser popstate and hashchange for URL back/forward navigation
  useEffect(() => {
    const handleUrlSync = () => {
      const tabFromUrl = getTabFromUrl();
      setCurrentTab(tabFromUrl);
    };

    updateUrlForTab(currentTab);

    window.addEventListener('popstate', handleUrlSync);
    window.addEventListener('hashchange', handleUrlSync);
    return () => {
      window.removeEventListener('popstate', handleUrlSync);
      window.removeEventListener('hashchange', handleUrlSync);
    };
  }, []);

  // Auth State
  const [currentUser, setCurrentUser] = useState<AuthResponse['user'] | null>(null);
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);
  const [authModalMode, setAuthModalMode] = useState<'login' | 'register'>('login');
  const [isLoadingUser, setIsLoadingUser] = useState(true);

  // Toasts
  const [toasts, setToasts] = useState<ToastNotification[]>([]);

  const showToast = (message: string, type: 'success' | 'info' | 'warning' = 'success') => {
    const id = `toast-${Date.now()}-${Math.random()}`;
    setToasts(prev => [...prev, { id, message, type }]);
    setTimeout(() => {
      setToasts(prev => prev.filter(t => t.id !== id));
    }, 3800);
  };

  // Main Datasets
  const [inboxes, setInboxes] = useState<Inbox[]>(initialInboxes);
  const [selectedInboxId, setSelectedInboxId] = useState<string>(initialInboxes[0].id);

  const [campaigns, setCampaigns] = useState<Campaign[]>(initialCampaigns);
  const [selectedCampaignId, setSelectedCampaignId] = useState<string>(initialCampaigns[0]?.id || 'c1');
  const [editingCampaign, setEditingCampaign] = useState<Campaign | null>(null);

  const [contactLists, setContactLists] = useState<ContactList[]>(initialContactLists);
  const [templates, setTemplates] = useState<EmailTemplate[]>(initialTemplates);
  const [selectedTemplateId, setSelectedTemplateId] = useState<string>(initialTemplates[0]?.id || 't1');
  const [editingTemplate, setEditingTemplate] = useState<EmailTemplate | null>(null);
  const [defaultTemplateType, setDefaultTemplateType] = useState<TemplateType>('plain');

  const [verifications, setVerifications] = useState<VerificationResult[]>(initialVerifications);

  // Modals
  const [isAddCreditModalOpen, setIsAddCreditModalOpen] = useState(false);
  const [isCreateContactListModalOpen, setIsCreateContactListModalOpen] = useState(false);
  const [isAddInboxModalOpen, setIsAddInboxModalOpen] = useState(false);

  const handleAddInbox = async (newInboxData: Partial<Inbox>) => {
    const fullInbox: Inbox = {
      id: `inbox-${Date.now()}`,
      email: newInboxData.email || 'new.inbox@domain.com',
      tags: newInboxData.tags || ['Outreach'],
      status: 'running',
      rotation: true,
      plan: newInboxData.plan || 'Pro',
      reputationScore: 100,
      emailsSent: 0,
      inboxRate: 100,
      spamRate: 0,
      spamCount: 0,
      categoryRate: 0,
      categoryCount: 0,
      connectedSince: 'Just now',
      senderName: newInboxData.senderName || { firstName: 'Alex', lastName: 'Rivera' },
      strategy: 'Progressive',
      baseline: 5,
      increasePerDay: 2,
      maxPerDay: 40,
      replyRatePercent: 30,
      timeZone: '(UTC+06:00) Dhaka / Asia',
      deliveryDays: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri'],
      deliveryPeriod: { from: '09:00', to: '18:00' },
      smtp: newInboxData.smtp || {
        username: newInboxData.email || 'new.inbox@domain.com',
        host: 'smtp.gmail.com',
        port: 465,
        ssl: true,
      },
      imap: newInboxData.imap || {
        username: newInboxData.email || 'new.inbox@domain.com',
        host: 'imap.gmail.com',
        port: 993,
        ssl: true,
      },
      healthChecks: {
        spf: true,
        domainBlacklists: true,
        dmarc: true,
        mxRecords: true,
        warmupAgeDays: 1,
      },
      ...newInboxData
    };

    if (getAuthToken()) {
      try {
        const createdFromApi = await createInbox(fullInbox);
        if (createdFromApi && createdFromApi.id) {
          setInboxes(prev => [createdFromApi, ...prev]);
          setSelectedInboxId(createdFromApi.id);
          showToast(`Inbox ${createdFromApi.email} connected & saved to Replit live API!`, 'success');
          return;
        }
      } catch (err: any) {
        console.error('Failed to create inbox on API:', err);
        showToast(`API note: ${err.message}`, 'warning');
      }
    }

    setInboxes(prev => [fullInbox, ...prev]);
    setSelectedInboxId(fullInbox.id);
    showToast(`Inbox ${fullInbox.email} connected successfully!`, 'success');
  };

  // Load User and Inboxes on startup / token check
  const loadLiveData = async () => {
    const token = getAuthToken();
    if (token) {
      try {
        const user = await getCurrentUser();
        setCurrentUser(user);
        const liveInboxes = await fetchInboxes();
        if (Array.isArray(liveInboxes) && liveInboxes.length > 0) {
          setInboxes(liveInboxes);
          setSelectedInboxId(liveInboxes[0].id);
        }
      } catch (err: any) {
        console.warn('API error during initialization:', err);
      }
    }
    setIsLoadingUser(false);
  };

  useEffect(() => {
    loadLiveData();
  }, []);

  const handleAuthSuccess = async (user: AuthResponse['user']) => {
    setCurrentUser(user);
    showToast(`Welcome back, ${user.name}! Connected to Replit live API.`, 'success');
    try {
      const liveInboxes = await fetchInboxes();
      if (Array.isArray(liveInboxes) && liveInboxes.length > 0) {
        setInboxes(liveInboxes);
        setSelectedInboxId(liveInboxes[0].id);
      }
    } catch (err) {
      console.error('Error fetching live inboxes:', err);
    }
  };

  const handleLogout = () => {
    setAuthToken(null);
    setCurrentUser(null);
    showToast('Logged out successfully', 'info');
  };

  const selectedInbox = inboxes.find(i => i.id === selectedInboxId) || inboxes[0];

  // Inbox Status Toggles & Updates (calling Live API)
  const handleToggleInboxStatus = async (id: string) => {
    const inbox = inboxes.find(i => i.id === id);
    const newStatus = inbox?.status === 'running' ? 'paused' : 'running';
    setInboxes(inboxes.map(i => i.id === id ? { ...i, status: newStatus } : i));
    showToast(`Inbox ${inbox?.email || ''} is now ${newStatus}`);

    if (getAuthToken()) {
      try {
        await toggleInboxStatusApi(id, newStatus);
      } catch (err: any) {
        console.error('Failed to update status on API:', err);
        showToast(`API sync error: ${err.message}`, 'warning');
      }
    }
  };

  const handleUpdateInbox = async (updated: Inbox) => {
    setInboxes(inboxes.map(i => i.id === updated.id ? updated : i));
    showToast(`Inbox settings saved successfully!`);

    if (getAuthToken()) {
      try {
        await updateInbox(updated.id, updated);
      } catch (err: any) {
        console.error('Failed to update inbox on API:', err);
        showToast(`API sync error: ${err.message}`, 'warning');
      }
    }
  };

  const handleDeleteInbox = async (id: string) => {
    setInboxes(inboxes.filter(i => i.id !== id));
    showToast('Inbox removed successfully', 'info');

    if (getAuthToken()) {
      try {
        await deleteInboxApi(id);
      } catch (err: any) {
        console.error('Failed to delete inbox on API:', err);
      }
    }
  };

  // Campaign Actions
  const handleToggleCampaignStatus = (id: string) => {
    const campaign = campaigns.find(c => c.id === id);
    const newStatus = campaign?.status === 'running' ? 'paused' : 'running';
    setCampaigns(campaigns.map(c => c.id === id ? { ...c, status: newStatus } : c));
    showToast(`Campaign ${campaign?.name || ''} is now ${newStatus}`);
  };

  const handleDeleteCampaign = (id: string) => {
    setCampaigns(campaigns.filter(c => c.id !== id));
    showToast('Campaign deleted', 'info');
  };

  const handleSaveCampaign = (campaignPartial: Partial<Campaign>) => {
    if (editingCampaign) {
      setCampaigns(campaigns.map(c => c.id === editingCampaign.id ? { ...c, ...campaignPartial } as Campaign : c));
      setEditingCampaign(null);
      showToast('Campaign updated successfully');
    } else {
      const newCamp: Campaign = {
        id: `camp-${Date.now()}`,
        name: campaignPartial.name || 'Untitled campaign',
        status: 'running',
        sentPercent: 0,
        sentCount: 0,
        sentTotal: 14,
        repliedPercent: 0,
        repliedCount: 0,
        repliedTotal: 14,
        contactListId: campaignPartial.contactListId,
        senderEmail: campaignPartial.senderEmail,
        sequenceSteps: campaignPartial.sequenceSteps || [],
        schedule: campaignPartial.schedule || {
          timeZone: '(GMT+06:00) Dhaka',
          days: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'],
          fromTime: '09:00 AM',
          toTime: '05:00 PM',
          maxPerDay: 10
        }
      };
      setCampaigns([newCamp, ...campaigns]);
      showToast('Campaign created successfully');
    }
  };

  // Template Actions
  const handleToggleTemplateWarmup = (id: string) => {
    setTemplates(templates.map(t => t.id === id ? { ...t, warmupEnabled: !t.warmupEnabled } : t));
  };

  const handleDeleteTemplate = (id: string) => {
    setTemplates(templates.filter(t => t.id !== id));
    showToast('Template deleted', 'info');
  };

  const handleSaveTemplate = (tplPartial: Partial<EmailTemplate>) => {
    if (tplPartial.id) {
      setTemplates(templates.map(t => t.id === tplPartial.id ? { ...t, ...tplPartial } as EmailTemplate : t));
      showToast('Template updated successfully');
    } else {
      const newTpl: EmailTemplate = {
        id: `tpl-${Date.now()}`,
        subject: tplPartial.subject || 'New Template',
        type: tplPartial.type || 'plain',
        inboxes: tplPartial.inboxes || 'All Inboxes',
        priority: tplPartial.priority || 'Medium',
        sentCount: 0,
        inboxPlacement: 0,
        warmupEnabled: true,
        content: tplPartial.content || ''
      };
      setTemplates([newTpl, ...templates]);
      showToast('New template created successfully');
    }
    setEditingTemplate(null);
  };

  // Contact List Actions
  const handleCreateContactList = (newList: ContactList) => {
    setContactLists([newList, ...contactLists]);
    showToast('Contact list created successfully');
  };

  // Helper for Topbar Title & Badge
  const getTopBarInfo = () => {
    switch (currentTab) {
      case 'inboxes':
      case 'inbox-detail':
        return { title: 'Inboxes Overview', badge: `${inboxes.length} Active Nodes` };
      case 'inbox-settings':
        return { title: 'Connect New Inbox', badge: 'SMTP/IMAP Setup' };
      case 'inboxes-tester':
        return { title: 'Deliverability Suite', badge: 'SMTP & DNS Diagnostics' };
      case 'campaigns':
      case 'campaign-detail':
      case 'campaign-new':
        return { title: 'Outreach Campaigns', badge: `${campaigns.length} Active Sequences` };
      case 'templates':
      case 'template-detail':
      case 'template-new':
        return { title: 'AI Email Templates', badge: `${templates.length} Templates` };
      case 'lead-search':
        return { title: 'B2B Lead Search', badge: 'Verified DB' };
      case 'email-verifier':
        return { title: 'Email Verifier', badge: 'Real-time SMTP Check' };
      case 'contacts':
      case 'contact-import':
        return { title: 'Contacts Directory', badge: `${contactLists.length} Records` };
      case 'extensions':
        return { title: 'Integrations & Webhooks', badge: 'API & CRM Sync' };
      case 'account-settings':
        return { title: 'Account Settings', badge: 'Profile & Workspace' };
      case 'public-home':
        return { title: 'Main Home Page', badge: 'Public Site' };
      case 'public-warmup':
        return { title: 'Email Warm-up Landing Page', badge: 'Public Site' };
      case 'public-leadgen':
        return { title: 'Lead Generation Landing Page', badge: 'Public Site' };
      case 'public-outreach':
        return { title: 'Email Outreach Landing Page', badge: 'Public Site' };
      case 'public-signup':
        return { title: 'Sign-up / Registration Page', badge: 'Public Site' };
      case 'public-login':
        return { title: 'Login Page', badge: 'Public Site' };
      case 'public-pricing':
        return { title: 'Pricing & Plans Page', badge: 'Public Site' };
      case 'public-blog':
        return { title: 'Blog & Knowledge Base', badge: 'Public Site' };
      case 'public-privacy':
        return { title: 'Privacy Policy & Terms Page', badge: 'Public Site' };
      default:
        return { title: 'Inboxes Overview', badge: 'Warmup Hub' };
    }
  };

  const topBarInfo = getTopBarInfo();

  if (currentTab.startsWith('public-')) {
    return (
      <div id="app-root-public" className="min-h-screen w-full overflow-y-auto bg-slate-950 text-slate-100 font-sans selection:bg-indigo-500 selection:text-white flex flex-col">
        {currentTab === 'public-home' && (
          <PublicLayout currentTab={currentTab} onNavigate={handleNavigate}>
            <MainHomePageView onNavigate={handleNavigate} />
          </PublicLayout>
        )}

        {currentTab === 'public-warmup' && (
          <PublicLayout currentTab={currentTab} onNavigate={handleNavigate}>
            <EmailWarmupLandingView onNavigate={handleNavigate} />
          </PublicLayout>
        )}

        {currentTab === 'public-leadgen' && (
          <PublicLayout currentTab={currentTab} onNavigate={handleNavigate}>
            <LeadGenLandingView onNavigate={handleNavigate} />
          </PublicLayout>
        )}

        {currentTab === 'public-outreach' && (
          <PublicLayout currentTab={currentTab} onNavigate={handleNavigate}>
            <OutreachLandingView onNavigate={handleNavigate} />
          </PublicLayout>
        )}

        {currentTab === 'public-signup' && (
          <PublicLayout currentTab={currentTab} onNavigate={handleNavigate}>
            <SignUpView onNavigate={handleNavigate} />
          </PublicLayout>
        )}

        {currentTab === 'public-login' && (
          <PublicLayout currentTab={currentTab} onNavigate={handleNavigate}>
            <LoginView onNavigate={handleNavigate} />
          </PublicLayout>
        )}

        {currentTab === 'public-pricing' && (
          <PublicLayout currentTab={currentTab} onNavigate={handleNavigate}>
            <PricingView onNavigate={handleNavigate} />
          </PublicLayout>
        )}

        {currentTab === 'public-blog' && (
          <PublicLayout currentTab={currentTab} onNavigate={handleNavigate}>
            <BlogResourcesView onNavigate={handleNavigate} />
          </PublicLayout>
        )}

        {currentTab === 'public-privacy' && (
          <PublicLayout currentTab={currentTab} onNavigate={handleNavigate}>
            <PrivacyTermsView onNavigate={handleNavigate} />
          </PublicLayout>
        )}

        {/* Floating Chat Widget */}
        <ChatWidget />

        {/* Toast Notification Container */}
        <div id="toast-container" className="fixed bottom-6 right-6 z-50 flex flex-col gap-2 pointer-events-none">
          {toasts.map(toast => (
            <div 
              key={toast.id}
              className={`${
                toast.type === 'success' 
                  ? 'bg-gradient-to-r from-emerald-600 to-teal-600' 
                  : 'bg-gradient-to-r from-violet-600 to-indigo-600'
              } text-white px-5 py-3.5 rounded-2xl shadow-2xl text-xs font-bold flex items-center gap-3 transition-all duration-300 border border-white/10 backdrop-blur-md pointer-events-auto animate-in fade-in slide-in-from-bottom-3`}
            >
              <CheckCircle2 className="w-4 h-4 text-emerald-300 shrink-0" />
              <span>{toast.message}</span>
            </div>
          ))}
        </div>
      </div>
    );
  }

  return (
    <div id="app-root" className="flex h-screen overflow-hidden bg-[#f8fafc] text-slate-800 antialiased font-sans">
      {/* Sidebar Navigation */}
      <Sidebar 
        currentTab={currentTab} 
        onNavigate={handleNavigate} 
      />

      {/* Main Content Wrapper */}
      <main className="flex-1 flex flex-col overflow-hidden bg-[#f8fafc]">
        {/* Top App Header */}
        <header className="h-20 bg-white border-b border-slate-100 px-8 flex items-center justify-between shrink-0 shadow-2xs z-20">
          <div className="flex items-center gap-4">
            <h2 id="topbar-title" className="text-xl font-black text-slate-900 tracking-tight">
              {topBarInfo.title}
            </h2>
            <span id="topbar-badge" className="text-xs bg-blue-50 text-blue-600 px-3 py-1 rounded-full font-bold border border-blue-100">
              {topBarInfo.badge}
            </span>
          </div>
          <div className="flex items-center gap-3">
            <button 
              onClick={() => {
                setCurrentTab('public-home');
                showToast('Switched to Live Public Website!', 'info');
              }} 
              className="px-3.5 py-2.5 bg-indigo-50 border border-indigo-200/80 hover:bg-indigo-100 text-indigo-700 font-bold rounded-2xl text-xs flex items-center gap-2 transition-all cursor-pointer"
              title="View Public Website Landing Page"
            >
              <Globe className="w-4 h-4 text-indigo-600" />
              <span className="hidden sm:inline">Public Website</span>
            </button>

            {/* Live API Auth Button / Indicator */}
            {currentUser ? (
              <div className="flex items-center gap-2 bg-emerald-50 border border-emerald-200/80 px-3 py-1.5 rounded-2xl">
                <div className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                <span className="text-xs font-bold text-emerald-950 flex items-center gap-1">
                  <UserIcon className="w-3.5 h-3.5 text-emerald-600" />
                  <span>{currentUser.name}</span>
                </span>
                <button
                  onClick={handleLogout}
                  title="Sign Out"
                  className="ml-1 p-1 hover:bg-emerald-200/50 rounded-lg text-emerald-800 transition-colors cursor-pointer"
                >
                  <LogOut className="w-3.5 h-3.5" />
                </button>
              </div>
            ) : (
              <button
                onClick={() => { setAuthModalMode('login'); setIsAuthModalOpen(true); }}
                className="px-3.5 py-2 bg-blue-600 hover:bg-blue-700 text-white font-extrabold rounded-2xl text-xs flex items-center gap-1.5 transition-all shadow-md shadow-blue-500/20 cursor-pointer"
              >
                <LogIn className="w-4 h-4" />
                <span>Live API Auth</span>
              </button>
            )}

            <button 
              onClick={() => {
                setCurrentTab('inboxes-tester');
                showToast('Deliverability diagnostics launched!', 'info');
              }} 
              className="px-4 py-2.5 bg-slate-50 border border-slate-200 hover:bg-slate-100 text-slate-700 font-bold rounded-2xl text-xs flex items-center gap-2 transition-all cursor-pointer"
            >
              <FlaskConical className="w-4 h-4 text-emerald-500" />
              <span>Run Diagnostics</span>
            </button>
          </div>
        </header>

        {/* Dynamic Viewport Body */}
        <div id="viewport-body" className="flex-1 overflow-y-auto custom-scrollbar">
          {currentTab === 'inboxes' && (
            <InboxesDashboardView 
              inboxes={inboxes}
              onSelectInbox={(inbox) => setSelectedInboxId(inbox.id)}
              onNavigate={setCurrentTab}
              onToggleStatus={handleToggleInboxStatus}
              onDeleteInbox={handleDeleteInbox}
              onShowToast={showToast}
              onOpenAddInbox={() => setIsAddInboxModalOpen(true)}
            />
          )}

          {currentTab === 'inbox-detail' && (
            <InboxDetailView 
              inbox={selectedInbox}
              onNavigate={setCurrentTab}
              onNavigateSettings={() => setCurrentTab('inbox-settings')}
              onToggleStatus={handleToggleInboxStatus}
            />
          )}

          {currentTab === 'inbox-settings' && (
            <InboxSettingsView 
              inbox={selectedInbox}
              onNavigate={setCurrentTab}
              onOpenAddCredit={() => setIsAddCreditModalOpen(true)}
              onUpdateInbox={handleUpdateInbox}
              onDeleteInbox={handleDeleteInbox}
            />
          )}

          {currentTab === 'inboxes-tester' && (
            <InboxesTesterView inboxes={inboxes} />
          )}

          {currentTab === 'campaigns' && (
            <CampaignsListView 
              campaigns={campaigns}
              onNavigate={setCurrentTab}
              onEditCampaign={(camp) => {
                setEditingCampaign(camp);
                setCurrentTab('campaign-new');
              }}
              onToggleStatus={handleToggleCampaignStatus}
              onDeleteCampaign={handleDeleteCampaign}
              onSelectCampaign={(camp) => {
                setSelectedCampaignId(camp.id);
                setCurrentTab('campaign-detail');
              }}
            />
          )}

          {currentTab === 'campaign-detail' && (
            <CampaignDetailView 
              campaign={campaigns.find(c => c.id === selectedCampaignId) || campaigns[0] || {
                id: 'c1',
                name: 'Series A Investor Outreach Q3',
                status: 'running',
                sentPercent: 82,
                sentCount: 1620,
                sentTotal: 1970,
                repliedPercent: 24,
                repliedCount: 385,
                repliedTotal: 1620,
                sequenceSteps: [],
                schedule: { timeZone: 'UTC', days: [], fromTime: '09:00 AM', toTime: '05:00 PM', maxPerDay: 150 }
              }}
              onNavigate={setCurrentTab}
              onEditCampaign={(camp) => {
                setEditingCampaign(camp);
                setCurrentTab('campaign-new');
              }}
              onToggleStatus={handleToggleCampaignStatus}
            />
          )}

          {currentTab === 'campaign-new' && (
            <CampaignWizardView 
              contactLists={contactLists}
              inboxes={inboxes}
              onNavigate={setCurrentTab}
              onSaveCampaign={handleSaveCampaign}
              onCreateContactListModal={() => setIsCreateContactListModalOpen(true)}
            />
          )}

          {currentTab === 'templates' && (
            <TemplatesView 
              templates={templates}
              onNavigate={setCurrentTab}
              onCreateTemplate={(type) => {
                setDefaultTemplateType(type);
                setEditingTemplate(null);
                setCurrentTab('template-new');
              }}
              onEditTemplate={(tpl) => {
                setEditingTemplate(tpl);
                setCurrentTab('template-new');
              }}
              onToggleWarmup={handleToggleTemplateWarmup}
              onDeleteTemplate={handleDeleteTemplate}
              onSelectTemplate={(tpl) => {
                setSelectedTemplateId(tpl.id);
                setCurrentTab('template-detail');
              }}
            />
          )}

          {currentTab === 'template-detail' && (
            <TemplateDetailView 
              template={templates.find(t => t.id === selectedTemplateId) || templates[0] || {
                id: 't1',
                subject: 'Feedback on recent product update',
                type: 'plain',
                inboxes: 'All active inboxes',
                priority: 'High',
                sentCount: 3420,
                inboxPlacement: 98,
                warmupEnabled: true,
                content: 'Hi {{first_name}},\n\nI hope you\'re having a great week! I noticed your team recently launched a major update to {{product_name}}...'
              }}
              onNavigate={setCurrentTab}
              onEditTemplate={(tpl) => {
                setEditingTemplate(tpl);
                setCurrentTab('template-new');
              }}
            />
          )}

          {currentTab === 'template-new' && (
            <TemplateEditorView 
              initialTemplate={editingTemplate}
              defaultType={defaultTemplateType}
              inboxes={inboxes}
              onNavigate={setCurrentTab}
              onSaveTemplate={handleSaveTemplate}
            />
          )}

          {currentTab === 'lead-search' && (
            <LeadSearchView />
          )}

          {currentTab === 'extensions' && (
            <ExtensionsView />
          )}

          {currentTab === 'contacts' && (
            <ContactsView 
              contactLists={contactLists}
              onNavigate={setCurrentTab}
              onOpenImportWizard={() => setCurrentTab('contact-import')}
              onCreateContactListModal={() => setIsCreateContactListModalOpen(true)}
            />
          )}

          {currentTab === 'contact-import' && (
            <ContactImportWizardView 
              onNavigate={setCurrentTab}
              onImportComplete={handleCreateContactList}
            />
          )}

          {currentTab === 'email-verifier' && (
            <EmailVerifierView 
              verifications={verifications}
              onOpenImportWizard={() => setCurrentTab('contact-import')}
            />
          )}

          {currentTab === 'account-settings' && (
            <AccountSettingsView 
              initialSubTab={accountSubTab}
              onNavigate={setCurrentTab}
              currentUser={currentUser}
              onOpenAuth={() => setIsAuthModalOpen(true)}
              onLogout={handleLogout}
            />
          )}
        </div>
      </main>

      {/* Floating Chat Widget */}
      <ChatWidget />

      {/* Toast Notification Container */}
      <div id="toast-container" className="fixed bottom-6 right-6 z-50 flex flex-col gap-2 pointer-events-none">
        {toasts.map(toast => (
          <div 
            key={toast.id}
            className={`${
              toast.type === 'success' 
                ? 'bg-gradient-to-r from-emerald-600 to-teal-600' 
                : 'bg-gradient-to-r from-violet-600 to-indigo-600'
            } text-white px-5 py-3.5 rounded-2xl shadow-2xl text-xs font-bold flex items-center gap-3 transition-all duration-300 border border-white/10 backdrop-blur-md pointer-events-auto animate-in fade-in slide-in-from-bottom-3`}
          >
            <CheckCircle2 className="w-4 h-4 text-emerald-300 shrink-0" />
            <span>{toast.message}</span>
          </div>
        ))}
      </div>

      {/* Modals */}
      <AddInboxModal
        isOpen={isAddInboxModalOpen}
        onClose={() => setIsAddInboxModalOpen(false)}
        onAddInbox={handleAddInbox}
      />

      <AuthModal 
        isOpen={isAuthModalOpen}
        onClose={() => setIsAuthModalOpen(false)}
        onSuccess={handleAuthSuccess}
        initialMode={authModalMode}
      />

      <AddCreditModal 
        isOpen={isAddCreditModalOpen}
        onClose={() => setIsAddCreditModalOpen(false)}
        onAddCredit={(amount) => {
          showToast(`Successfully added ${amount} warmup credits!`);
        }}
      />

      <CreateContactListModal 
        isOpen={isCreateContactListModalOpen}
        onClose={() => setIsCreateContactListModalOpen(false)}
        onCreateList={handleCreateContactList}
      />
    </div>
  );
}

