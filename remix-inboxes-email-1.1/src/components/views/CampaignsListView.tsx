import React, { useState } from 'react';
import { 
  Send, 
  Plus, 
  Search, 
  Play, 
  Pause, 
  Edit3, 
  Trash2, 
  ExternalLink,
  ChevronLeft,
  ChevronRight,
  TrendingUp,
  Sparkles
} from 'lucide-react';
import { Campaign, MainTab } from '../../types';

interface CampaignsListViewProps {
  campaigns: Campaign[];
  onNavigate: (tab: MainTab) => void;
  onEditCampaign: (campaign: Campaign) => void;
  onToggleStatus: (id: string) => void;
  onDeleteCampaign: (id: string) => void;
  onSelectCampaign?: (campaign: Campaign) => void;
}

export const CampaignsListView: React.FC<CampaignsListViewProps> = ({
  campaigns,
  onNavigate,
  onEditCampaign,
  onToggleStatus,
  onDeleteCampaign,
  onSelectCampaign
}) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedIds, setSelectedIds] = useState<string[]>([]);

  const filteredCampaigns = campaigns.filter(c => 
    c.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const toggleSelectAll = () => {
    if (selectedIds.length === filteredCampaigns.length) {
      setSelectedIds([]);
    } else {
      setSelectedIds(filteredCampaigns.map(c => c.id));
    }
  };

  const toggleSelectOne = (id: string) => {
    if (selectedIds.includes(id)) {
      setSelectedIds(selectedIds.filter(i => i !== id));
    } else {
      setSelectedIds([...selectedIds, id]);
    }
  };

  if (campaigns.length === 0) {
    return (
      <div className="p-12 max-w-2xl mx-auto text-center space-y-5 my-12 bg-white rounded-3xl border border-slate-100 shadow-xl">
        <div className="w-16 h-16 rounded-2xl bg-gradient-to-tr from-violet-600 to-indigo-600 text-white flex items-center justify-center mx-auto shadow-lg shadow-violet-500/20">
          <Send className="w-8 h-8" />
        </div>
        <h2 className="text-2xl font-black text-slate-900 tracking-tight">Launch your first campaign</h2>
        <p className="text-xs text-slate-500 max-w-md mx-auto leading-relaxed">
          Reach prospects with personalized AI sequences and automated follow-up schedules that land directly in primary inboxes.
        </p>
        <div className="pt-2">
          <button 
            onClick={() => onNavigate('campaign-new')}
            className="px-6 py-3 bg-gradient-to-r from-violet-600 to-indigo-600 hover:from-violet-700 hover:to-indigo-700 text-white font-extrabold rounded-2xl text-xs shadow-lg shadow-violet-500/20 inline-flex items-center gap-2 transition-all cursor-pointer hover:scale-[1.02]"
          >
            <Plus className="w-4 h-4" />
            <span>Create Campaign</span>
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="p-8 space-y-8 max-w-7xl mx-auto">
      {/* Top Banner Row */}
      <div className="bg-gradient-to-r from-violet-900 via-indigo-900 to-slate-900 rounded-3xl p-8 text-white relative overflow-hidden shadow-2xl">
        <div className="absolute top-0 right-0 w-96 h-96 bg-violet-500/10 rounded-full blur-3xl pointer-events-none" />
        <div className="relative z-10 flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
          <div className="space-y-2">
            <div className="inline-flex items-center gap-2 px-3 py-1 bg-white/10 backdrop-blur-md rounded-full text-xs font-bold text-violet-200 border border-white/10">
              <Sparkles className="w-3.5 h-3.5 text-violet-400" />
              <span>Smart Sequence Automation</span>
            </div>
            <h1 className="text-3xl font-black tracking-tight text-white">Outreach Campaigns</h1>
            <p className="text-xs text-slate-300 max-w-xl leading-relaxed">
              Automate cold email sequences, personalize step intervals, and maximize primary inbox delivery across all connected sender accounts.
            </p>
          </div>

          <button 
            onClick={() => onNavigate('campaign-new')}
            className="px-6 py-3.5 bg-gradient-to-r from-violet-500 to-indigo-500 hover:from-violet-600 hover:to-indigo-600 text-white font-extrabold rounded-2xl text-xs shadow-xl shadow-violet-500/25 flex items-center gap-2 transition-all cursor-pointer hover:scale-[1.02]"
          >
            <Plus className="w-4 h-4" />
            <span>Create Campaign</span>
          </button>
        </div>
      </div>

      {/* Filter and Table Card */}
      <div className="bg-white rounded-3xl border border-slate-100 shadow-xl overflow-hidden">
        {/* Bulk Action and Search Row */}
        <div className="p-5 border-b border-slate-100 flex flex-col sm:flex-row items-center justify-between gap-4 bg-slate-50/50">
          <div className="flex items-center gap-2">
            <button className="px-4 py-2 bg-white border border-slate-200 rounded-2xl text-xs font-bold text-slate-700 shadow-2xs hover:bg-slate-50 flex items-center gap-2 transition-all cursor-pointer">
              <Pause className="w-3.5 h-3.5 text-amber-600" />
              <span>Pause Selected</span>
            </button>
            <button className="px-4 py-2 bg-white border border-slate-200 rounded-2xl text-xs font-bold text-slate-700 shadow-2xs hover:bg-slate-50 flex items-center gap-2 transition-all cursor-pointer">
              <Play className="w-3.5 h-3.5 text-emerald-600" />
              <span>Start Selected</span>
            </button>
          </div>

          <div className="relative w-full sm:w-80">
            <Search className="w-4 h-4 absolute left-3.5 top-3 text-slate-400" />
            <input 
              type="text" 
              placeholder="Search campaigns by name..."
              value={searchTerm}
              onChange={e => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2 bg-white border border-slate-200 rounded-2xl text-xs text-slate-800 focus:outline-none focus:ring-2 focus:ring-violet-500/20 focus:border-violet-500 transition-all shadow-2xs"
            />
          </div>
        </div>

        {/* Data Table */}
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs text-slate-600">
            <thead className="bg-slate-50 text-slate-400 font-extrabold border-b border-slate-100 uppercase tracking-wider text-[10px]">
              <tr>
                <th className="p-4 w-12 text-center">
                  <input 
                    type="checkbox" 
                    checked={selectedIds.length === filteredCampaigns.length && filteredCampaigns.length > 0} 
                    onChange={toggleSelectAll}
                    className="rounded-md border-slate-300 text-violet-600 focus:ring-violet-500 cursor-pointer" 
                  />
                </th>
                <th className="p-4 text-slate-900 font-black">Campaign Name</th>
                <th className="p-4">Status</th>
                <th className="p-4">Sent Deliveries</th>
                <th className="p-4">Replied Leads</th>
                <th className="p-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {filteredCampaigns.map((camp) => (
                <tr key={camp.id} className="hover:bg-violet-50/30 transition-colors">
                  <td className="p-4 text-center">
                    <input 
                      type="checkbox" 
                      checked={selectedIds.includes(camp.id)}
                      onChange={() => toggleSelectOne(camp.id)}
                      className="rounded-md border-slate-300 text-violet-600 focus:ring-violet-500 cursor-pointer" 
                    />
                  </td>
                  <td className="p-4 font-bold text-slate-900">
                    <button 
                      onClick={() => onSelectCampaign && onSelectCampaign(camp)}
                      className="flex items-center gap-2 hover:text-violet-600 text-left transition-colors group cursor-pointer"
                    >
                      <span className="font-extrabold group-hover:underline text-sm">{camp.name}</span>
                      <ExternalLink className="w-3.5 h-3.5 text-slate-300 group-hover:text-violet-600 transition-colors" />
                    </button>
                  </td>
                  <td className="p-4">
                    <span className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[11px] font-extrabold border ${
                      camp.status === 'running'
                        ? 'bg-emerald-50 text-emerald-700 border-emerald-200'
                        : 'bg-amber-50 text-amber-700 border-amber-200'
                    }`}>
                      <span className={`w-2 h-2 rounded-full ${camp.status === 'running' ? 'bg-emerald-500 animate-pulse' : 'bg-amber-500'}`} />
                      {camp.status.toUpperCase()}
                    </span>
                  </td>
                  <td className="p-4 w-52">
                    <div className="space-y-1.5">
                      <div className="flex justify-between text-[11px] font-bold text-slate-700">
                        <span>{camp.sentPercent}%</span>
                        <span className="text-slate-400">({camp.sentCount} / {camp.sentTotal})</span>
                      </div>
                      <div className="w-full h-2 bg-slate-100 rounded-full overflow-hidden p-0.5">
                        <div className="h-full bg-gradient-to-r from-violet-600 to-indigo-600 rounded-full transition-all duration-500" style={{ width: `${camp.sentPercent}%` }} />
                      </div>
                    </div>
                  </td>
                  <td className="p-4 w-52">
                    <div className="space-y-1.5">
                      <div className="flex justify-between text-[11px] font-bold text-slate-700">
                        <span className="text-emerald-600 font-extrabold">{camp.repliedPercent}%</span>
                        <span className="text-slate-400">({camp.repliedCount} / {camp.repliedTotal})</span>
                      </div>
                      <div className="w-full h-2 bg-slate-100 rounded-full overflow-hidden p-0.5">
                        <div className="h-full bg-gradient-to-r from-emerald-500 to-teal-500 rounded-full transition-all duration-500" style={{ width: `${camp.repliedPercent}%` }} />
                      </div>
                    </div>
                  </td>
                  <td className="p-4 text-right">
                    <div className="flex items-center justify-end gap-1.5">
                      <button 
                        onClick={() => onToggleStatus(camp.id)}
                        className="p-2 rounded-xl hover:bg-slate-100 text-slate-500 hover:text-slate-900 transition-colors cursor-pointer"
                        title={camp.status === 'running' ? 'Pause Campaign' : 'Start Campaign'}
                      >
                        {camp.status === 'running' ? <Pause className="w-4 h-4 text-amber-600" /> : <Play className="w-4 h-4 text-emerald-600" />}
                      </button>
                      <button 
                        onClick={() => onEditCampaign(camp)}
                        className="p-2 rounded-xl hover:bg-slate-100 text-slate-500 hover:text-slate-900 transition-colors cursor-pointer"
                        title="Edit Campaign"
                      >
                        <Edit3 className="w-4 h-4" />
                      </button>
                      <button 
                        onClick={() => onDeleteCampaign(camp.id)}
                        className="p-2 rounded-xl hover:bg-red-50 text-red-500 transition-colors cursor-pointer"
                        title="Delete Campaign"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Footer Pagination */}
        <div className="p-4 bg-slate-50/80 border-t border-slate-100 flex items-center justify-between text-xs text-slate-500 font-semibold">
          <span>Showing 1 to {filteredCampaigns.length} of {filteredCampaigns.length} campaigns</span>
          <div className="flex items-center gap-2">
            <button className="p-2 rounded-xl bg-white border border-slate-200 text-slate-400 cursor-not-allowed">
              <ChevronLeft className="w-4 h-4" />
            </button>
            <span className="px-3 py-1.5 rounded-xl bg-gradient-to-r from-violet-600 to-indigo-600 text-white font-extrabold shadow-sm">1</span>
            <button className="p-2 rounded-xl bg-white border border-slate-200 text-slate-400 cursor-not-allowed">
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        </div>

      </div>
    </div>
  );
};

