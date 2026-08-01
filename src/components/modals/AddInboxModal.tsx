import React, { useState } from 'react';
import { X, Mail, Plus, Server, Lock, CheckCircle2, AlertCircle } from 'lucide-react';
import { Inbox } from '../../types';

interface AddInboxModalProps {
  isOpen: boolean;
  onClose: () => void;
  onAddInbox: (inboxData: Partial<Inbox>) => Promise<void> | void;
}

export const AddInboxModal: React.FC<AddInboxModalProps> = ({
  isOpen,
  onClose,
  onAddInbox
}) => {
  const [provider, setProvider] = useState<'google' | 'microsoft' | 'smtp'>('google');
  const [email, setEmail] = useState('');
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [password, setPassword] = useState('');
  const [plan, setPlan] = useState<'Basic' | 'Pro' | 'Max'>('Pro');

  // Custom SMTP / IMAP fields
  const [smtpHost, setSmtpHost] = useState('smtp.gmail.com');
  const [smtpPort, setSmtpPort] = useState(465);
  const [imapHost, setImapHost] = useState('imap.gmail.com');
  const [imapPort, setImapPort] = useState(993);

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  if (!isOpen) return null;

  const handleProviderChange = (p: 'google' | 'microsoft' | 'smtp') => {
    setProvider(p);
    if (p === 'google') {
      setSmtpHost('smtp.gmail.com');
      setSmtpPort(465);
      setImapHost('imap.gmail.com');
      setImapPort(993);
    } else if (p === 'microsoft') {
      setSmtpHost('smtp.office365.com');
      setSmtpPort(587);
      setImapHost('outlook.office365.com');
      setImapPort(993);
    } else {
      setSmtpHost('mail.yourdomain.com');
      setSmtpPort(465);
      setImapHost('mail.yourdomain.com');
      setImapPort(993);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    if (!email.trim() || !email.includes('@')) {
      setError('Please enter a valid email address');
      return;
    }

    setLoading(true);

    try {
      const newInboxPartial: Partial<Inbox> = {
        email: email.trim(),
        tags: [provider === 'google' ? 'Google Workspace' : provider === 'microsoft' ? 'Microsoft 365' : 'Custom SMTP'],
        plan,
        senderName: {
          firstName: firstName.trim() || email.split('@')[0],
          lastName: lastName.trim() || 'Node'
        },
        smtp: {
          username: email.trim(),
          host: smtpHost,
          port: Number(smtpPort),
          ssl: true
        },
        imap: {
          username: email.trim(),
          host: imapHost,
          port: Number(imapPort),
          ssl: true
        }
      };

      await onAddInbox(newInboxPartial);
      onClose();
      // Reset state
      setEmail('');
      setFirstName('');
      setLastName('');
      setPassword('');
    } catch (err: any) {
      setError(err.message || 'Failed to connect inbox');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-4 animate-in fade-in duration-200">
      <div className="bg-white rounded-3xl max-w-lg w-full shadow-2xl border border-slate-200 overflow-hidden">
        {/* Header */}
        <div className="px-6 py-5 border-b border-slate-100 flex items-center justify-between bg-slate-50/50">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-blue-600 text-white flex items-center justify-center shadow-md shadow-blue-500/20">
              <Plus className="w-5 h-5" />
            </div>
            <div>
              <h3 className="font-black text-slate-900 text-lg">Connect New Inbox</h3>
              <p className="text-xs font-medium text-slate-500">Add an email account to your warmup network</p>
            </div>
          </div>
          <button 
            onClick={onClose} 
            className="p-1.5 rounded-xl hover:bg-slate-200/60 text-slate-400 hover:text-slate-700 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Form Body */}
        <form onSubmit={handleSubmit} className="p-6 space-y-4 max-h-[80vh] overflow-y-auto">
          {error && (
            <div className="p-3.5 bg-rose-50 border border-rose-200/80 rounded-2xl text-rose-700 text-xs font-bold flex items-center gap-2.5">
              <AlertCircle className="w-4 h-4 shrink-0 text-rose-600" />
              <span>{error}</span>
            </div>
          )}

          {/* Provider Selection */}
          <div>
            <label className="block text-xs font-black text-slate-700 mb-2 uppercase tracking-wider">Select Provider</label>
            <div className="grid grid-cols-3 gap-2">
              <button
                type="button"
                onClick={() => handleProviderChange('google')}
                className={`p-3 rounded-2xl border text-center transition-all cursor-pointer ${
                  provider === 'google'
                    ? 'border-blue-600 bg-blue-50/60 text-blue-700 font-extrabold shadow-xs'
                    : 'border-slate-200 hover:border-slate-300 text-slate-600 font-bold'
                }`}
              >
                <p className="text-xs">Google</p>
                <p className="text-[10px] opacity-75 font-normal">Gmail / Workspace</p>
              </button>
              <button
                type="button"
                onClick={() => handleProviderChange('microsoft')}
                className={`p-3 rounded-2xl border text-center transition-all cursor-pointer ${
                  provider === 'microsoft'
                    ? 'border-blue-600 bg-blue-50/60 text-blue-700 font-extrabold shadow-xs'
                    : 'border-slate-200 hover:border-slate-300 text-slate-600 font-bold'
                }`}
              >
                <p className="text-xs">Microsoft</p>
                <p className="text-[10px] opacity-75 font-normal">Outlook / 365</p>
              </button>
              <button
                type="button"
                onClick={() => handleProviderChange('smtp')}
                className={`p-3 rounded-2xl border text-center transition-all cursor-pointer ${
                  provider === 'smtp'
                    ? 'border-blue-600 bg-blue-50/60 text-blue-700 font-extrabold shadow-xs'
                    : 'border-slate-200 hover:border-slate-300 text-slate-600 font-bold'
                }`}
              >
                <p className="text-xs">Custom SMTP</p>
                <p className="text-[10px] opacity-75 font-normal">IMAP / SMTP Node</p>
              </button>
            </div>
          </div>

          {/* Email Address */}
          <div className="space-y-1">
            <label className="block text-xs font-bold text-slate-700">Email Address</label>
            <div className="relative">
              <Mail className="w-4 h-4 absolute left-3.5 top-3 text-slate-400" />
              <input
                type="email"
                required
                placeholder="outreach.sales@company.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full pl-10 pr-4 py-2.5 bg-slate-50 border border-slate-200 rounded-2xl text-xs font-bold text-slate-800 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500/20"
              />
            </div>
          </div>

          {/* Sender Name */}
          <div className="grid grid-cols-2 gap-3">
            <div className="space-y-1">
              <label className="block text-xs font-bold text-slate-700">First Name</label>
              <input
                type="text"
                placeholder="Alex"
                value={firstName}
                onChange={(e) => setFirstName(e.target.value)}
                className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-2xl text-xs font-bold text-slate-800 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500/20"
              />
            </div>
            <div className="space-y-1">
              <label className="block text-xs font-bold text-slate-700">Last Name</label>
              <input
                type="text"
                placeholder="Rivera"
                value={lastName}
                onChange={(e) => setLastName(e.target.value)}
                className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-2xl text-xs font-bold text-slate-800 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500/20"
              />
            </div>
          </div>

          {/* App Password / Auth Secret */}
          <div className="space-y-1">
            <label className="block text-xs font-bold text-slate-700">App Password / Password</label>
            <div className="relative">
              <Lock className="w-4 h-4 absolute left-3.5 top-3 text-slate-400" />
              <input
                type="password"
                placeholder="•••• •••• •••• ••••"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full pl-10 pr-4 py-2.5 bg-slate-50 border border-slate-200 rounded-2xl text-xs font-bold text-slate-800 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500/20"
              />
            </div>
            <p className="text-[10px] text-slate-400">For Gmail/Outlook, generate an 16-digit App Password from security settings.</p>
          </div>

          {/* Server Config */}
          <div className="p-3.5 bg-slate-50 rounded-2xl border border-slate-200/80 space-y-3">
            <div className="flex items-center gap-2 text-xs font-bold text-slate-700">
              <Server className="w-4 h-4 text-blue-600" />
              <span>Server Connection Settings</span>
            </div>
            <div className="grid grid-cols-2 gap-2 text-xs">
              <div>
                <label className="block text-[10px] text-slate-500 font-semibold mb-1">SMTP Host</label>
                <input
                  type="text"
                  value={smtpHost}
                  onChange={(e) => setSmtpHost(e.target.value)}
                  className="w-full px-2.5 py-1.5 bg-white border border-slate-200 rounded-xl font-bold text-slate-800"
                />
              </div>
              <div>
                <label className="block text-[10px] text-slate-500 font-semibold mb-1">SMTP Port</label>
                <input
                  type="number"
                  value={smtpPort}
                  onChange={(e) => setSmtpPort(Number(e.target.value))}
                  className="w-full px-2.5 py-1.5 bg-white border border-slate-200 rounded-xl font-bold text-slate-800"
                />
              </div>
            </div>
          </div>

          {/* Plan Selection */}
          <div>
            <label className="block text-xs font-bold text-slate-700 mb-1.5">Warmup Plan Tier</label>
            <div className="grid grid-cols-3 gap-2">
              {(['Basic', 'Pro', 'Max'] as const).map((p) => (
                <button
                  key={p}
                  type="button"
                  onClick={() => setPlan(p)}
                  className={`py-2 px-3 rounded-xl border text-xs font-extrabold transition-all cursor-pointer ${
                    plan === p
                      ? 'border-blue-600 bg-blue-600 text-white shadow-sm'
                      : 'border-slate-200 bg-white text-slate-700 hover:bg-slate-50'
                  }`}
                >
                  {p} Plan
                </button>
              ))}
            </div>
          </div>

          {/* Submit */}
          <div className="pt-2">
            <button
              type="submit"
              disabled={loading}
              className="w-full py-3.5 bg-blue-600 hover:bg-blue-700 text-white font-extrabold rounded-2xl text-xs shadow-lg shadow-blue-500/20 transition-all flex items-center justify-center gap-2 cursor-pointer disabled:opacity-60"
            >
              {loading ? (
                <span>Connecting inbox to network...</span>
              ) : (
                <>
                  <CheckCircle2 className="w-4 h-4" />
                  <span>Connect Inbox & Start Warmup</span>
                </>
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
