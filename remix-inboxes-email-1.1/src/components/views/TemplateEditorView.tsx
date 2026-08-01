import React, { useState } from 'react';
import { 
  ChevronRight, 
  Bold, 
  Italic, 
  Underline, 
  Strikethrough, 
  Quote, 
  Link, 
  List, 
  ListOrdered, 
  AlignLeft, 
  AlignCenter, 
  AlignRight, 
  CheckCircle, 
  Sparkles,
  Save,
  X,
  Type,
  Code
} from 'lucide-react';
import { EmailTemplate, Inbox, MainTab, TemplateType } from '../../types';

interface TemplateEditorViewProps {
  initialTemplate?: EmailTemplate | null;
  defaultType?: TemplateType;
  inboxes: Inbox[];
  onNavigate: (tab: MainTab) => void;
  onSaveTemplate: (template: Partial<EmailTemplate>) => void;
}

export const TemplateEditorView: React.FC<TemplateEditorViewProps> = ({
  initialTemplate,
  defaultType = 'plain',
  inboxes,
  onNavigate,
  onSaveTemplate
}) => {
  const [templateType, setTemplateType] = useState<TemplateType>(initialTemplate?.type || defaultType);
  const [subject, setSubject] = useState(initialTemplate?.subject || '');
  const [selectedInboxes, setSelectedInboxes] = useState(initialTemplate?.inboxes || 'All Inboxes');
  const [priority, setPriority] = useState<'Low' | 'Medium' | 'High'>(initialTemplate?.priority || 'Medium');
  const [content, setContent] = useState(initialTemplate?.content || '');
  const [activeSubTab, setActiveSubTab] = useState<'visual' | 'html' | 'preview'>('visual');
  const [spamCheckResult, setSpamCheckResult] = useState<{
    score: number;
    status: 'safe' | 'warning' | 'risk';
    flaggedWords: string[];
    recommendations: string[];
  } | null>(null);

  const handleSave = () => {
    onSaveTemplate({
      id: initialTemplate?.id,
      subject: subject || 'Untitled template',
      type: templateType,
      inboxes: selectedInboxes,
      priority,
      content,
      warmupEnabled: true,
      sentCount: initialTemplate?.sentCount || 0,
      inboxPlacement: initialTemplate?.inboxPlacement || 0
    });
    onNavigate('templates');
  };

  const insertVariable = (varName: string) => {
    setContent(prev => prev + ` {{${varName}}}`);
  };

  const runSpamCheck = () => {
    const textToScan = `${subject} ${content}`.toLowerCase();
    
    const triggerWords = [
      '100% free', 'guaranteed', 'buy now', 'click here', 'make money', 
      'no risk', 'act now', 'urgent', 'cash bonus', 'winner', 'special promotion',
      'credit card', 'earn $', 'risk-free', 'unlimited'
    ];

    const foundTriggers = triggerWords.filter(w => textToScan.includes(w));
    const recommendations: string[] = [];

    let score = 100;
    
    if (foundTriggers.length > 0) {
      score -= foundTriggers.length * 15;
      recommendations.push(`Remove spam trigger phrase(s): ${foundTriggers.join(', ')}`);
    }

    if (subject.toUpperCase() === subject && subject.length > 3) {
      score -= 20;
      recommendations.push('Avoid ALL CAPS in subject line');
    }

    if (!subject.trim()) {
      score -= 30;
      recommendations.push('Subject line is missing');
    }

    const linkCount = (content.match(/https?:\/\//g) || []).length;
    if (linkCount > 2) {
      score -= 10;
      recommendations.push(`High link count (${linkCount} links). Consider limiting links to 1-2 per email.`);
    }

    if (!content.includes('{{first_name}}') && !content.includes('{{company}}')) {
      recommendations.push('Add personalization tags like {{first_name}} or {{company}} to improve open rates');
    }

    score = Math.max(0, Math.min(100, score));
    const status = score >= 80 ? 'safe' : score >= 50 ? 'warning' : 'risk';

    setSpamCheckResult({
      score,
      status,
      flaggedWords: foundTriggers,
      recommendations
    });
  };

  return (
    <div className="p-6 space-y-6 max-w-6xl mx-auto">
      {/* Breadcrumb Header */}
      <div>
        <div className="flex items-center gap-2 text-xs font-semibold text-slate-500 mb-1">
          <button onClick={() => onNavigate('templates')} className="hover:text-blue-600">Template</button>
          <ChevronRight className="w-3.5 h-3.5" />
          <span className="text-slate-800">
            {initialTemplate ? 'Edit template' : `Add ${templateType === 'plain' ? 'Plain Text' : 'HTML'} template`}
          </span>
        </div>
        <h1 className="text-2xl font-extrabold text-slate-900 tracking-tight">
          {initialTemplate ? 'Edit Template' : `Add ${templateType === 'plain' ? 'Plain Text' : 'HTML'} Template`}
        </h1>
      </div>

      {/* Top Controls Grid */}
      <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-2xs grid grid-cols-1 md:grid-cols-3 gap-4">
        <div>
          <label className="block text-xs font-bold text-slate-700 mb-1">Email Subject</label>
          <input 
            type="text" 
            placeholder="Email subject" 
            value={subject}
            onChange={e => setSubject(e.target.value)}
            className="w-full px-3.5 py-2 border border-slate-200 rounded-xl text-xs font-semibold text-slate-800 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        <div>
          <label className="block text-xs font-bold text-slate-700 mb-1">Inboxes</label>
          <select 
            value={selectedInboxes}
            onChange={e => setSelectedInboxes(e.target.value)}
            className="w-full px-3.5 py-2 border border-slate-200 rounded-xl text-xs font-semibold text-slate-800 focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option>All Inboxes</option>
            {inboxes.map(i => (
              <option key={i.id} value={i.email}>{i.email}</option>
            ))}
          </select>
        </div>

        <div>
          <label className="block text-xs font-bold text-slate-700 mb-1">Warmup Priority</label>
          <select 
            value={priority}
            onChange={e => setPriority(e.target.value as any)}
            className="w-full px-3.5 py-2 border border-slate-200 rounded-xl text-xs font-semibold text-slate-800 focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="Low">Low</option>
            <option value="Medium">Medium</option>
            <option value="High">High</option>
          </select>
        </div>
      </div>

      {/* Main Editor & Analysis Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        {/* Main Editor (2 cols) */}
        <div className="lg:col-span-2 bg-white rounded-2xl border border-slate-200 shadow-2xs overflow-hidden flex flex-col justify-between">
          <div>
            {/* Editor Sub-header Bar */}
            <div className="p-3 border-b border-slate-200 bg-slate-50 flex flex-wrap items-center justify-between gap-3">
              {templateType === 'html' ? (
                <div className="flex gap-1">
                  <button 
                    onClick={() => setActiveSubTab('visual')}
                    className={`px-3 py-1 rounded-lg text-xs font-bold ${activeSubTab === 'visual' ? 'bg-blue-600 text-white' : 'text-slate-600 hover:bg-slate-200'}`}
                  >
                    Visual
                  </button>
                  <button 
                    onClick={() => setActiveSubTab('html')}
                    className={`px-3 py-1 rounded-lg text-xs font-bold ${activeSubTab === 'html' ? 'bg-blue-600 text-white' : 'text-slate-600 hover:bg-slate-200'}`}
                  >
                    HTML
                  </button>
                  <button 
                    onClick={() => setActiveSubTab('preview')}
                    className={`px-3 py-1 rounded-lg text-xs font-bold ${activeSubTab === 'preview' ? 'bg-blue-600 text-white' : 'text-slate-600 hover:bg-slate-200'}`}
                  >
                    Preview
                  </button>
                </div>
              ) : (
                <span className="text-xs font-bold text-slate-700 px-2">Plain Text Mode</span>
              )}

              {/* Variables Menu */}
              <div className="flex items-center gap-1.5">
                <span className="text-[11px] font-bold text-slate-500">Insert Var:</span>
                {['first_name', 'last_name', 'company', 'email'].map(v => (
                  <button 
                    key={v}
                    onClick={() => insertVariable(v)}
                    className="px-2 py-0.5 bg-white border border-slate-200 rounded text-[11px] font-mono font-bold text-slate-700 hover:bg-slate-100"
                  >
                    {`{{${v}}}`}
                  </button>
                ))}
              </div>
            </div>

            {/* Rich Formatting Toolbar (for HTML mode) */}
            {templateType === 'html' && activeSubTab === 'visual' && (
              <div className="p-2 border-b border-slate-200 bg-white flex flex-wrap items-center gap-1 text-slate-600">
                <button className="p-1.5 rounded hover:bg-slate-100"><Bold className="w-3.5 h-3.5" /></button>
                <button className="p-1.5 rounded hover:bg-slate-100"><Italic className="w-3.5 h-3.5" /></button>
                <button className="p-1.5 rounded hover:bg-slate-100"><Underline className="w-3.5 h-3.5" /></button>
                <button className="p-1.5 rounded hover:bg-slate-100"><Strikethrough className="w-3.5 h-3.5" /></button>
                <div className="w-px h-4 bg-slate-200 mx-1" />
                <button className="p-1.5 rounded hover:bg-slate-100"><Quote className="w-3.5 h-3.5" /></button>
                <button className="p-1.5 rounded hover:bg-slate-100"><Link className="w-3.5 h-3.5" /></button>
                <button className="p-1.5 rounded hover:bg-slate-100"><List className="w-3.5 h-3.5" /></button>
                <button className="p-1.5 rounded hover:bg-slate-100"><ListOrdered className="w-3.5 h-3.5" /></button>
                <div className="w-px h-4 bg-slate-200 mx-1" />
                <button className="p-1.5 rounded hover:bg-slate-100"><AlignLeft className="w-3.5 h-3.5" /></button>
                <button className="p-1.5 rounded hover:bg-slate-100"><AlignCenter className="w-3.5 h-3.5" /></button>
                <button className="p-1.5 rounded hover:bg-slate-100"><AlignRight className="w-3.5 h-3.5" /></button>
              </div>
            )}

            {/* Textarea or Preview */}
            <div className="p-4">
              {activeSubTab === 'preview' ? (
                <div 
                  className="p-4 border border-slate-200 rounded-xl bg-white min-h-[250px] text-xs text-slate-800 prose prose-sm max-w-none"
                  dangerouslySetInnerHTML={{ __html: content || '<p className="text-slate-400">Empty message preview</p>' }}
                />
              ) : (
                <textarea 
                  rows={12}
                  value={content}
                  onChange={e => setContent(e.target.value)}
                  placeholder="Enter template body content here..."
                  className="w-full p-3 border border-slate-200 rounded-xl text-xs font-mono text-slate-800 focus:outline-none focus:ring-2 focus:ring-blue-500 bg-slate-50/30"
                />
              )}
            </div>
          </div>

          {/* Action Footer */}
          <div className="p-4 bg-slate-50 border-t border-slate-200 flex items-center justify-end gap-3">
            <button 
              onClick={() => onNavigate('templates')}
              className="px-4 py-2 text-xs font-bold text-slate-600 hover:bg-slate-200 rounded-xl"
            >
              Cancel
            </button>
            <button 
              onClick={handleSave}
              className="px-5 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-xl text-xs font-bold shadow-md shadow-blue-500/20 flex items-center gap-1.5"
            >
              <Save className="w-3.5 h-3.5" />
              <span>Save Template</span>
            </button>
          </div>
        </div>

        {/* Right Side Spam Check Analysis Panel */}
        <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-2xs space-y-4 h-fit">
          <div className="flex items-center gap-2 text-slate-900 font-bold text-sm">
            <Sparkles className="w-4 h-4 text-blue-600" />
            <span>Check Template Quality</span>
          </div>

          <p className="text-xs text-slate-500 leading-relaxed">
            Test your email body for spam triggers, link density, and readability score before sending.
          </p>

          <button 
            onClick={runSpamCheck}
            className="w-full py-2 bg-slate-900 hover:bg-slate-800 text-white rounded-xl text-xs font-bold shadow-sm transition-colors"
          >
            Check Template
          </button>

          {spamCheckResult && (
            <div className={`p-4 rounded-xl border space-y-3 animate-in fade-in ${
              spamCheckResult.status === 'safe' 
                ? 'bg-emerald-50/80 border-emerald-200 text-emerald-900' 
                : spamCheckResult.status === 'warning'
                  ? 'bg-amber-50/80 border-amber-200 text-amber-900'
                  : 'bg-rose-50/80 border-rose-200 text-rose-900'
            }`}>
              <div className="flex justify-between items-center border-b pb-2 border-slate-200/50">
                <span className="font-extrabold text-xs">Deliverability Score</span>
                <span className={`px-2.5 py-0.5 rounded-full font-mono font-black text-xs ${
                  spamCheckResult.status === 'safe'
                    ? 'bg-emerald-600 text-white'
                    : spamCheckResult.status === 'warning'
                      ? 'bg-amber-500 text-white'
                      : 'bg-rose-600 text-white'
                }`}>
                  {spamCheckResult.score} / 100
                </span>
              </div>

              {spamCheckResult.flaggedWords.length > 0 && (
                <div className="text-[11px] font-semibold space-y-1">
                  <span className="font-bold text-rose-700 block">Flagged Spam Phrases ({spamCheckResult.flaggedWords.length}):</span>
                  <div className="flex flex-wrap gap-1">
                    {spamCheckResult.flaggedWords.map((w, i) => (
                      <span key={i} className="px-1.5 py-0.5 bg-rose-200/80 text-rose-900 rounded font-mono font-bold text-[10px]">
                        "{w}"
                      </span>
                    ))}
                  </div>
                </div>
              )}

              {spamCheckResult.recommendations.length > 0 && (
                <div className="text-[11px] space-y-1 pt-1">
                  <span className="font-bold text-slate-800 block">Optimization Suggestions:</span>
                  <ul className="list-disc list-inside space-y-1 text-slate-700">
                    {spamCheckResult.recommendations.map((rec, idx) => (
                      <li key={idx} className="leading-snug">{rec}</li>
                    ))}
                  </ul>
                </div>
              )}
            </div>
          )}
        </div>

      </div>
    </div>
  );
};
