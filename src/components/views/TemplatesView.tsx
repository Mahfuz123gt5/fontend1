import React, { useState } from 'react';
import { 
  FileText, 
  Plus, 
  Search, 
  Edit3, 
  Trash2, 
  ExternalLink,
  Code,
  Sparkles,
  Zap
} from 'lucide-react';
import { EmailTemplate, MainTab } from '../../types';

interface TemplatesViewProps {
  templates: EmailTemplate[];
  onNavigate: (tab: MainTab) => void;
  onCreateTemplate: (type: 'plain' | 'html') => void;
  onEditTemplate: (template: EmailTemplate) => void;
  onToggleWarmup: (id: string) => void;
  onDeleteTemplate: (id: string) => void;
  onSelectTemplate?: (template: EmailTemplate) => void;
}

export const TemplatesView: React.FC<TemplatesViewProps> = ({
  templates,
  onNavigate,
  onCreateTemplate,
  onEditTemplate,
  onToggleWarmup,
  onDeleteTemplate,
  onSelectTemplate
}) => {
  const [searchTerm, setSearchTerm] = useState('');

  const filtered = templates.filter(t => t.subject.toLowerCase().includes(searchTerm.toLowerCase()));

  if (templates.length === 0) {
    return (
      <div className="p-12 max-w-2xl mx-auto text-center space-y-5 my-12 bg-white rounded-3xl border border-slate-100 shadow-xl">
        <div className="w-16 h-16 rounded-2xl bg-gradient-to-tr from-violet-600 to-indigo-600 text-white flex items-center justify-center mx-auto shadow-lg shadow-violet-500/20">
          <FileText className="w-8 h-8" />
        </div>
        <h2 className="text-2xl font-black text-slate-900 tracking-tight">Craft your first email template</h2>
        <p className="text-xs text-slate-500 max-w-md mx-auto leading-relaxed">
          Shape deliverability warmup emails that sound human and authentic. Start with plain text or rich HTML layouts.
        </p>
        <div className="flex justify-center gap-3 pt-2">
          <button 
            onClick={() => onCreateTemplate('plain')}
            className="px-6 py-3 bg-gradient-to-r from-violet-600 to-indigo-600 hover:from-violet-700 hover:to-indigo-700 text-white font-extrabold rounded-2xl text-xs shadow-lg shadow-violet-500/20 transition-all cursor-pointer hover:scale-[1.02]"
          >
            Create Plain Text
          </button>
          <button 
            onClick={() => onCreateTemplate('html')}
            className="px-6 py-3 bg-white border border-slate-200 text-slate-800 hover:bg-slate-50 font-extrabold rounded-2xl text-xs shadow-2xs transition-all cursor-pointer"
          >
            Create HTML
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="p-8 space-y-8 max-w-7xl mx-auto">
      {/* Header Banner */}
      <div className="bg-gradient-to-r from-violet-900 via-indigo-900 to-slate-900 rounded-3xl p-8 text-white relative overflow-hidden shadow-2xl">
        <div className="absolute top-0 right-0 w-96 h-96 bg-violet-500/10 rounded-full blur-3xl pointer-events-none" />
        <div className="relative z-10 flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
          <div className="space-y-2">
            <div className="inline-flex items-center gap-2 px-3 py-1 bg-white/10 backdrop-blur-md rounded-full text-xs font-bold text-violet-200 border border-white/10">
              <Sparkles className="w-3.5 h-3.5 text-violet-400" />
              <span>Deliverability & Copy Engine</span>
            </div>
            <h1 className="text-3xl font-black tracking-tight text-white">Email Content Templates</h1>
            <p className="text-xs text-slate-300 max-w-xl leading-relaxed">
              Manage plain text and HTML email templates designed for human-like warmup conversations and cold outreach sequences.
            </p>
          </div>

          <div className="flex items-center gap-3">
            <button 
              onClick={() => onCreateTemplate('plain')}
              className="px-5 py-3 bg-gradient-to-r from-violet-500 to-indigo-500 hover:from-violet-600 hover:to-indigo-600 text-white font-extrabold rounded-2xl text-xs shadow-xl shadow-violet-500/25 flex items-center gap-2 transition-all cursor-pointer hover:scale-[1.02]"
            >
              <Plus className="w-4 h-4" />
              <span>Plain Text</span>
            </button>
            <button 
              onClick={() => onCreateTemplate('html')}
              className="px-5 py-3 bg-white/10 hover:bg-white/20 text-white font-extrabold rounded-2xl text-xs backdrop-blur-md border border-white/10 flex items-center gap-2 transition-all cursor-pointer"
            >
              <Code className="w-4 h-4" />
              <span>HTML Layout</span>
            </button>
          </div>
        </div>
      </div>

      {/* Filter and Table Card */}
      <div className="bg-white rounded-3xl border border-slate-100 shadow-xl overflow-hidden">
        <div className="p-5 border-b border-slate-100 flex justify-between items-center bg-slate-50/50">
          <div className="relative w-80">
            <Search className="w-4 h-4 absolute left-3.5 top-3 text-slate-400" />
            <input 
              type="text"
              placeholder="Search by email subject line..."
              value={searchTerm}
              onChange={e => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2 bg-white border border-slate-200 rounded-2xl text-xs text-slate-800 focus:outline-none focus:ring-2 focus:ring-violet-500/20 focus:border-violet-500 transition-all shadow-2xs"
            />
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs text-slate-600">
            <thead className="bg-slate-50 text-slate-400 font-extrabold border-b border-slate-100 uppercase tracking-wider text-[10px]">
              <tr>
                <th className="p-4 w-12 text-center">
                  <input type="checkbox" className="rounded-md border-slate-300 text-violet-600 focus:ring-violet-500 cursor-pointer" />
                </th>
                <th className="p-4">Warmup Mode</th>
                <th className="p-4 text-slate-900 font-black">Subject Line</th>
                <th className="p-4">Format</th>
                <th className="p-4">Assigned Nodes</th>
                <th className="p-4">Priority</th>
                <th className="p-4">Sends</th>
                <th className="p-4">Inbox Placement</th>
                <th className="p-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {filtered.map((tpl) => (
                <tr key={tpl.id} className="hover:bg-violet-50/30 transition-colors">
                  <td className="p-4 text-center">
                    <input type="checkbox" className="rounded-md border-slate-300 text-violet-600 focus:ring-violet-500 cursor-pointer" />
                  </td>
                  <td className="p-4">
                    <button 
                      onClick={() => onToggleWarmup(tpl.id)}
                      className={`w-10 h-6 rounded-full transition-all relative cursor-pointer ${tpl.warmupEnabled ? 'bg-gradient-to-r from-violet-600 to-indigo-600' : 'bg-slate-300'}`}
                    >
                      <span className={`w-4 h-4 rounded-full bg-white absolute top-1 transition-transform shadow-xs ${tpl.warmupEnabled ? 'right-1' : 'left-1'}`} />
                    </button>
                  </td>
                  <td className="p-4 font-bold text-slate-900">
                    <button 
                      onClick={() => onSelectTemplate && onSelectTemplate(tpl)}
                      className="flex items-center gap-2 hover:text-violet-600 text-left transition-colors group cursor-pointer"
                    >
                      <span className="font-extrabold text-sm group-hover:underline">{tpl.subject}</span>
                      <ExternalLink className="w-3.5 h-3.5 text-slate-300 group-hover:text-violet-600 transition-colors" />
                    </button>
                  </td>
                  <td className="p-4">
                    <span className="px-3 py-1 rounded-full bg-slate-100 text-slate-700 font-extrabold text-[10px] border border-slate-200 uppercase tracking-wider">
                      {tpl.type === 'plain' ? 'Plain Text' : 'HTML Code'}
                    </span>
                  </td>
                  <td className="p-4 font-bold text-slate-700">{tpl.inboxes}</td>
                  <td className="p-4">
                    <span className="inline-flex items-center gap-1 text-amber-700 font-extrabold bg-amber-50 px-2.5 py-0.5 rounded-full border border-amber-200/60 text-[11px]">
                      <Zap className="w-3 h-3 fill-amber-500 text-amber-500" />
                      {tpl.priority}
                    </span>
                  </td>
                  <td className="p-4 font-extrabold text-slate-900">{tpl.sentCount.toLocaleString()}</td>
                  <td className="p-4">
                    <span className="font-extrabold text-violet-600 text-sm">{tpl.inboxPlacement}%</span>
                  </td>
                  <td className="p-4 text-right">
                    <div className="flex items-center justify-end gap-1.5">
                      <button onClick={() => onEditTemplate(tpl)} className="p-2 rounded-xl hover:bg-slate-100 text-slate-500 hover:text-slate-900 transition-colors cursor-pointer" title="Edit Template">
                        <Edit3 className="w-4 h-4" />
                      </button>
                      <button onClick={() => onDeleteTemplate(tpl.id)} className="p-2 rounded-xl hover:bg-red-50 text-red-500 transition-colors cursor-pointer" title="Delete Template">
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};
