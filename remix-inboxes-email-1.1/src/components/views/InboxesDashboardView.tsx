import React, { useState } from 'react';
import { 
  Inbox as InboxIcon, 
  Search, 
  Play, 
  Pause, 
  Settings, 
  Trash2, 
  Plus,
  CheckCircle2
} from 'lucide-react';
import { Inbox, MainTab } from '../../types';

interface InboxesDashboardViewProps {
  inboxes: Inbox[];
  onSelectInbox: (inbox: Inbox) => void;
  onNavigate: (tab: MainTab) => void;
  onToggleStatus: (id: string) => void;
  onDeleteInbox?: (id: string) => void;
  onShowToast?: (message: string, type?: 'success' | 'info' | 'warning') => void;
  onOpenAddInbox?: () => void;
}

export const InboxesDashboardView: React.FC<InboxesDashboardViewProps> = ({
  inboxes,
  onSelectInbox,
  onNavigate,
  onToggleStatus,
  onDeleteInbox,
  onShowToast,
  onOpenAddInbox
}) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedTag, setSelectedTag] = useState<string>('all');

  const filteredInboxes = inboxes.filter(i => {
    const matchesSearch = i.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          i.plan.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesTag = selectedTag === 'all' || i.tags.includes(selectedTag);
    return matchesSearch && matchesTag;
  });

  const totalSent = inboxes.reduce((acc, curr) => acc + curr.emailsSent, 0);
  const avgInbox = Math.round(inboxes.reduce((acc, curr) => acc + curr.inboxRate, 0) / (inboxes.length || 1));
  const avgSpam = (inboxes.reduce((acc, curr) => acc + curr.spamRate, 0) / (inboxes.length || 1)).toFixed(2);
  const avgCategory = (inboxes.reduce((acc, curr) => acc + curr.categoryRate, 0) / (inboxes.length || 1)).toFixed(2);
  const runningCount = inboxes.filter(i => i.status === 'running').length;
  const pausedCount = inboxes.filter(i => i.status === 'paused').length;

  return (
    <div className="p-8 space-y-6 max-w-7xl mx-auto">
      {/* Primary Purple Banner Container */}
      <div className="bg-gradient-to-r from-[#4338ca] via-[#3b82f6] to-[#2563eb] rounded-3xl p-8 text-white shadow-xl relative overflow-hidden">
        {/* Subtle decorative glow */}
        <div className="absolute -right-16 -top-16 w-80 h-80 bg-white/10 rounded-full blur-3xl pointer-events-none"></div>

        {/* Top Banner Row */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6 relative z-10">
          <div className="space-y-3">
            <span className="bg-white/20 text-white text-[10px] font-black px-3.5 py-1 rounded-full uppercase tracking-wider backdrop-blur-md border border-white/20 inline-block">
              ENTERPRISE WARMUP SUITE
            </span>
            <h1 className="text-3xl font-black tracking-tight text-white">Email Deliverability & Warmup Hub</h1>
            <p className="text-blue-100 text-xs font-medium max-w-xl leading-relaxed">
              Protect your sender reputation, automate daily warmups, and maximize inbox placement across Gmail, Outlook, and custom SMTP nodes.
            </p>
          </div>

          <button 
            onClick={() => {
              if (onOpenAddInbox) {
                onOpenAddInbox();
              } else {
                onNavigate('inbox-settings');
              }
            }}
            className="bg-white text-[#2563eb] hover:bg-blue-50 font-extrabold px-6 py-3 rounded-full text-xs shadow-lg transition-all transform hover:scale-[1.02] flex items-center gap-1.5 shrink-0 cursor-pointer"
          >
            <Plus className="w-4 h-4 text-[#2563eb]" />
            <span>Connect New Inbox</span>
          </button>
        </div>

        {/* 6 Metric Cards Row - Nested inside the Purple Banner */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4 mt-8 relative z-10">
          <div className="bg-white p-5 rounded-2xl shadow-sm text-left flex flex-col justify-between">
            <p className="text-[10px] font-black text-slate-400 uppercase tracking-wider">EMAILS SENT</p>
            <p className="text-2xl font-black text-slate-900 mt-2">{totalSent.toLocaleString()}</p>
          </div>
          <div className="bg-white p-5 rounded-2xl shadow-sm text-left flex flex-col justify-between">
            <p className="text-[10px] font-black text-slate-400 uppercase tracking-wider">INBOX RATE</p>
            <p className="text-2xl font-black text-blue-600 mt-2">{avgInbox}%</p>
          </div>
          <div className="bg-white p-5 rounded-2xl shadow-sm text-left flex flex-col justify-between">
            <p className="text-[10px] font-black text-slate-400 uppercase tracking-wider">SPAM RATE</p>
            <p className="text-2xl font-black text-amber-600 mt-2">{avgSpam}%</p>
          </div>
          <div className="bg-white p-5 rounded-2xl shadow-sm text-left flex flex-col justify-between">
            <p className="text-[10px] font-black text-slate-400 uppercase tracking-wider">CATEGORY</p>
            <p className="text-2xl font-black text-purple-600 mt-2">{avgCategory}%</p>
          </div>
          <div className="bg-white p-5 rounded-2xl shadow-sm text-left flex flex-col justify-between">
            <p className="text-[10px] font-black text-slate-400 uppercase tracking-wider">RUNNING</p>
            <p className="text-2xl font-black text-emerald-600 mt-2">{runningCount}</p>
          </div>
          <div className="bg-white p-5 rounded-2xl shadow-sm text-left flex flex-col justify-between">
            <p className="text-[10px] font-black text-slate-400 uppercase tracking-wider">PAUSED</p>
            <p className="text-2xl font-black text-amber-500 mt-2">{pausedCount}</p>
          </div>
        </div>
      </div>

      {/* Table & Filters Card Container */}
      <div className="bg-white rounded-3xl border border-slate-100 shadow-sm overflow-hidden">
        {/* Table Top Filter Actions */}
        <div className="p-5 border-b border-slate-100 flex flex-col sm:flex-row items-center justify-between gap-4 bg-slate-50/30">
          <div className="flex items-center gap-3 w-full sm:w-auto">
            <select className="px-4 py-2 bg-slate-100/80 border border-slate-200/80 rounded-full text-xs font-bold text-slate-700 focus:outline-none cursor-pointer">
              <option>Bulk Actions</option>
              <option>Start Warmup</option>
              <option>Pause Warmup</option>
              <option>Delete Selected</option>
            </select>
          </div>

          <div className="flex items-center gap-3 w-full sm:w-auto justify-end">
            <div className="relative w-full sm:w-80">
              <Search className="w-4 h-4 absolute left-3.5 top-2.5 text-slate-400" />
              <input 
                type="text" 
                placeholder="Search by email or plan..." 
                value={searchTerm}
                onChange={e => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-2 bg-white border border-slate-200/80 rounded-full text-xs text-slate-800 placeholder-slate-400 font-medium focus:outline-none focus:ring-2 focus:ring-blue-500/20" 
              />
            </div>
            <select 
              value={selectedTag}
              onChange={e => setSelectedTag(e.target.value)}
              className="px-4 py-2 bg-slate-100/80 border border-slate-200/80 rounded-full text-xs font-bold text-slate-700 focus:outline-none cursor-pointer"
            >
              <option value="all">Tags: All</option>
              <option value="Primary">Primary</option>
              <option value="Outreach">Outreach</option>
              <option value="Sales">Sales</option>
              <option value="Growth">Growth</option>
            </select>
          </div>
        </div>

        {/* Data Table */}
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs text-slate-600">
            <thead className="bg-slate-50/50 text-slate-400 font-black border-b border-slate-100 uppercase tracking-wider text-[10px]">
              <tr>
                <th className="p-4 w-12 text-center"><input type="checkbox" className="rounded border-slate-300 text-blue-600 focus:ring-blue-500" /></th>
                <th className="p-4">EMAIL & TAGS</th>
                <th className="p-4">STATUS</th>
                <th className="p-4">REPUTATION</th>
                <th className="p-4">EMAILS SENT</th>
                <th className="p-4">INBOX RATE</th>
                <th className="p-4">SPAM RATE</th>
                <th className="p-4 text-right">ACTIONS</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {filteredInboxes.map((inbox) => {
                const statusBadge = inbox.status === 'running' ? (
                  <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[11px] font-black bg-emerald-50 text-emerald-700 border border-emerald-200/60">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse"></span> Running
                  </span>
                ) : (
                  <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[11px] font-black bg-amber-50 text-amber-700 border border-amber-200/60">
                    <span className="w-1.5 h-1.5 rounded-full bg-amber-500"></span> Paused
                  </span>
                );

                return (
                  <tr key={inbox.id} className="hover:bg-slate-50/60 transition-colors">
                    <td className="p-4 text-center"><input type="checkbox" className="rounded border-slate-300 text-blue-600" /></td>
                    <td className="p-4">
                      <div 
                        className="font-black text-slate-900 text-sm cursor-pointer hover:text-blue-600 transition-colors"
                        onClick={() => {
                          onSelectInbox(inbox);
                          onNavigate('inbox-detail');
                        }}
                      >
                        {inbox.email}
                      </div>
                      <div className="flex items-center gap-1.5 mt-1">
                        {inbox.tags.map((t, idx) => (
                          <span key={idx} className="px-2 py-0.5 rounded-md text-[10px] font-bold bg-slate-100 text-slate-600 border border-slate-200/60">
                            {t}
                          </span>
                        ))}
                        <span className="text-[11px] text-slate-400 font-medium">• {inbox.plan} Plan</span>
                      </div>
                    </td>
                    <td className="p-4">{statusBadge}</td>
                    <td className="p-4 font-black text-emerald-600 text-sm">{inbox.reputationScore}%</td>
                    <td className="p-4 font-black text-slate-800">{inbox.emailsSent.toLocaleString()}</td>
                    <td className="p-4 font-black text-blue-600">{inbox.inboxRate}%</td>
                    <td className="p-4 font-black text-amber-600">{inbox.spamRate}%</td>
                    <td className="p-4 text-right">
                      <div className="flex items-center justify-end gap-2">
                        <button 
                          onClick={() => {
                            onToggleStatus(inbox.id);
                            onShowToast?.(`Inbox ${inbox.email} is now ${inbox.status === 'running' ? 'paused' : 'running'}`, 'success');
                          }} 
                          className="w-8 h-8 rounded-full border border-slate-200/80 hover:bg-slate-100 flex items-center justify-center transition-all cursor-pointer" 
                          title={inbox.status === 'running' ? 'Pause' : 'Start'}
                        >
                          {inbox.status === 'running' ? <Pause className="w-3.5 h-3.5 text-amber-600" /> : <Play className="w-3.5 h-3.5 text-emerald-600" />}
                        </button>
                        <button 
                          onClick={() => {
                            onSelectInbox(inbox);
                            onNavigate('inbox-detail');
                          }} 
                          className="w-8 h-8 rounded-full border border-slate-200/80 hover:bg-slate-100 flex items-center justify-center text-slate-500 transition-all cursor-pointer" 
                          title="Settings & Strategy"
                        >
                          <Settings className="w-3.5 h-3.5" />
                        </button>
                        <button 
                          onClick={() => {
                            if (onDeleteInbox) {
                              onDeleteInbox(inbox.id);
                              onShowToast?.('Inbox removed successfully', 'info');
                            }
                          }} 
                          className="w-8 h-8 rounded-full border border-slate-200/80 hover:bg-rose-50 flex items-center justify-center text-rose-500 transition-all cursor-pointer" 
                          title="Delete"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

