import React, { useState } from 'react';
import { 
  Mail, 
  Lock, 
  User, 
  Building2, 
  Globe, 
  CheckCircle2, 
  ArrowRight, 
  ShieldCheck, 
  Star, 
  Sparkles,
  LayoutDashboard
} from 'lucide-react';
import { MainTab } from '../../../types';

interface SignUpViewProps {
  onNavigate: (tab: MainTab) => void;
}

export const SignUpView: React.FC<SignUpViewProps> = ({ onNavigate }) => {
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [domain, setDomain] = useState('');
  const [companySize, setCompanySize] = useState('1-10');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setTimeout(() => {
      setIsSubmitting(false);
      onNavigate('inboxes'); // Redirect directly to live app dashboard
    }, 1000);
  };

  return (
    <div className="py-12 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
        
        {/* Left Side: Registration Form */}
        <div className="lg:col-span-7 bg-slate-900 p-8 sm:p-10 rounded-3xl border border-slate-800 shadow-2xl space-y-6">
          <div className="space-y-2">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-indigo-500/10 text-indigo-400 text-xs font-bold border border-indigo-500/20">
              <Sparkles className="w-3.5 h-3.5" />
              <span>14-Day Free Trial • No Credit Card Needed</span>
            </div>
            <h1 className="text-3xl font-black text-white">Create Your Inboxes Email Account</h1>
            <p className="text-slate-400 text-xs">Start warming up inboxes and discovering B2B leads in under 2 minutes.</p>
          </div>

          {/* Social Auth Buttons */}
          <div className="grid grid-cols-2 gap-3">
            <button 
              onClick={() => onNavigate('inboxes')}
              className="py-3 px-4 bg-slate-950 hover:bg-slate-800 border border-slate-800 rounded-xl text-xs font-bold text-white flex items-center justify-center gap-2 transition-colors"
            >
              <svg className="w-4 h-4" viewBox="0 0 24 24">
                <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
                <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
                <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z"/>
                <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z"/>
              </svg>
              <span>Google SSO</span>
            </button>

            <button 
              onClick={() => onNavigate('inboxes')}
              className="py-3 px-4 bg-slate-950 hover:bg-slate-800 border border-slate-800 rounded-xl text-xs font-bold text-white flex items-center justify-center gap-2 transition-colors"
            >
              <svg className="w-4 h-4" viewBox="0 0 23 23">
                <path fill="#f35325" d="M1 1h10v10H1z"/>
                <path fill="#81bc06" d="M12 1h10v10H12z"/>
                <path fill="#05a6f0" d="M1 12h10v10H1z"/>
                <path fill="#ffba08" d="M12 12h10v10H12z"/>
              </svg>
              <span>Microsoft 365</span>
            </button>
          </div>

          <div className="flex items-center gap-3 my-2">
            <div className="h-px bg-slate-800 flex-1" />
            <span className="text-[10px] font-bold uppercase text-slate-500">Or register with work email</span>
            <div className="h-px bg-slate-800 flex-1" />
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="text-xs font-bold text-slate-300 block mb-1">Full Name</label>
                <div className="relative">
                  <User className="w-4 h-4 text-slate-500 absolute left-3 top-3" />
                  <input 
                    type="text" 
                    required
                    placeholder="Mahfuz Hassan" 
                    value={fullName}
                    onChange={(e) => setFullName(e.target.value)}
                    className="w-full bg-slate-950 border border-slate-800 rounded-xl pl-9 pr-3 py-2.5 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-indigo-500"
                  />
                </div>
              </div>

              <div>
                <label className="text-xs font-bold text-slate-300 block mb-1">Work Email</label>
                <div className="relative">
                  <Mail className="w-4 h-4 text-slate-500 absolute left-3 top-3" />
                  <input 
                    type="email" 
                    required
                    placeholder="mahfuz@company.com" 
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full bg-slate-950 border border-slate-800 rounded-xl pl-9 pr-3 py-2.5 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-indigo-500"
                  />
                </div>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="text-xs font-bold text-slate-300 block mb-1">Password</label>
                <div className="relative">
                  <Lock className="w-4 h-4 text-slate-500 absolute left-3 top-3" />
                  <input 
                    type="password" 
                    required
                    placeholder="••••••••••••" 
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="w-full bg-slate-950 border border-slate-800 rounded-xl pl-9 pr-3 py-2.5 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-indigo-500"
                  />
                </div>
              </div>

              <div>
                <label className="text-xs font-bold text-slate-300 block mb-1">Sending Domain URL</label>
                <div className="relative">
                  <Globe className="w-4 h-4 text-slate-500 absolute left-3 top-3" />
                  <input 
                    type="text" 
                    placeholder="outreachdomain.com" 
                    value={domain}
                    onChange={(e) => setDomain(e.target.value)}
                    className="w-full bg-slate-950 border border-slate-800 rounded-xl pl-9 pr-3 py-2.5 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-indigo-500"
                  />
                </div>
              </div>
            </div>

            <div>
              <label className="text-xs font-bold text-slate-300 block mb-1">Company Size</label>
              <select 
                value={companySize}
                onChange={(e) => setCompanySize(e.target.value)}
                className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2.5 text-xs text-white font-bold"
              >
                <option value="1-10">1 - 10 Employees (Startup / Agency)</option>
                <option value="11-50">11 - 50 Employees (Growth Team)</option>
                <option value="51-200">51 - 200 Employees (Mid-Market)</option>
                <option value="200+">200+ Employees (Enterprise)</option>
              </select>
            </div>

            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full py-3.5 rounded-xl bg-gradient-to-r from-indigo-500 via-indigo-600 to-violet-600 text-white font-extrabold text-xs shadow-lg shadow-indigo-500/30 hover:scale-[1.01] active:scale-95 transition-all flex items-center justify-center gap-2"
            >
              {isSubmitting ? (
                <span>Setting Up Workspace...</span>
              ) : (
                <>
                  <span>Create Account & Start Free Trial</span>
                  <ArrowRight className="w-4 h-4" />
                </>
              )}
            </button>
          </form>

          <p className="text-center text-xs text-slate-400">
            Already have an account?{' '}
            <button 
              onClick={() => onNavigate('public-login')}
              className="text-indigo-400 font-extrabold hover:underline"
            >
              Log in here
            </button>
          </p>
        </div>

        {/* Right Side: Social Proof Benefits */}
        <div className="lg:col-span-5 space-y-6">
          <div className="bg-slate-900/60 p-6 rounded-3xl border border-slate-800/80 space-y-4">
            <h3 className="text-lg font-black text-white">Included in Your 14-Day Free Trial:</h3>
            <ul className="space-y-3 text-xs font-bold text-slate-300">
              <li className="flex items-center gap-2.5">
                <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" /> Unlimited Peer Email Warmup for 5 Inboxes
              </li>
              <li className="flex items-center gap-2.5">
                <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" /> 50 Free Verified Lead Search Credits
              </li>
              <li className="flex items-center gap-2.5">
                <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" /> Automated Multi-Inbox Campaign Rotation
              </li>
              <li className="flex items-center gap-2.5">
                <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" /> Continuous SPF, DKIM, DMARC Health Monitoring
              </li>
            </ul>
          </div>

          <div className="bg-gradient-to-b from-indigo-950/40 to-slate-900 p-6 rounded-3xl border border-slate-800 space-y-3">
            <div className="flex items-center gap-1 text-amber-400">
              {[...Array(5)].map((_, i) => (
                <Star key={i} className="w-4 h-4 fill-amber-400" />
              ))}
            </div>
            <p className="text-xs text-slate-300 italic leading-relaxed">
              &quot;Inboxes Email brought our primary inbox placement from 62% up to 99.1% in just two weeks. We booked 34 new enterprise demos last month alone.&quot;
            </p>
            <p className="text-xs font-extrabold text-white">— Marcus Vance, Head of Sales @ LeadScale</p>
          </div>
        </div>

      </div>
    </div>
  );
};
