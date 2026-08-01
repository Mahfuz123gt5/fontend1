import React, { useState } from 'react';
import { 
  Mail, 
  Lock, 
  ArrowRight, 
  ShieldCheck, 
  Sparkles,
  LayoutDashboard
} from 'lucide-react';
import { MainTab } from '../../../types';

interface LoginViewProps {
  onNavigate: (tab: MainTab) => void;
}

export const LoginView: React.FC<LoginViewProps> = ({ onNavigate }) => {
  const [email, setEmail] = useState('ruhoms06@gmail.com');
  const [password, setPassword] = useState('demo123456');
  const [rememberMe, setRememberMe] = useState(true);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onNavigate('inboxes'); // Redirects to live app dashboard
  };

  return (
    <div className="py-16 max-w-md mx-auto px-4 sm:px-6">
      <div className="bg-slate-900 p-8 sm:p-10 rounded-3xl border border-slate-800 shadow-2xl space-y-6">
        
        <div className="text-center space-y-2">
          <div className="w-12 h-12 rounded-2xl bg-gradient-to-tr from-blue-600 via-indigo-600 to-violet-600 flex items-center justify-center text-white mx-auto shadow-lg shadow-indigo-500/30">
            <Mail className="w-6 h-6" />
          </div>
          <h1 className="text-2xl font-black text-white">Welcome Back</h1>
          <p className="text-xs text-slate-400">Sign in to manage domain warmups, leads, and outreach.</p>
        </div>

        {/* Demo Account Banner */}
        <div className="bg-indigo-500/10 border border-indigo-500/20 p-3 rounded-2xl flex items-center justify-between text-xs">
          <div>
            <p className="font-bold text-indigo-300">Live Demo Credentials Pre-filled</p>
            <p className="text-[10px] text-slate-400">Click Log In below to access demo workspace</p>
          </div>
          <button 
            onClick={() => onNavigate('inboxes')}
            className="px-3 py-1.5 rounded-lg bg-indigo-600 text-white font-extrabold text-[11px] hover:bg-indigo-500 shrink-0"
          >
            Instant Log In
          </button>
        </div>

        {/* Social Auth */}
        <div className="grid grid-cols-2 gap-3">
          <button 
            onClick={() => onNavigate('inboxes')}
            className="py-2.5 px-3 bg-slate-950 hover:bg-slate-800 border border-slate-800 rounded-xl text-xs font-bold text-white flex items-center justify-center gap-2"
          >
            <svg className="w-4 h-4" viewBox="0 0 24 24">
              <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
              <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
              <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z"/>
              <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z"/>
            </svg>
            <span>Google</span>
          </button>

          <button 
            onClick={() => onNavigate('inboxes')}
            className="py-2.5 px-3 bg-slate-950 hover:bg-slate-800 border border-slate-800 rounded-xl text-xs font-bold text-white flex items-center justify-center gap-2"
          >
            <svg className="w-4 h-4" viewBox="0 0 23 23">
              <path fill="#f35325" d="M1 1h10v10H1z"/>
              <path fill="#81bc06" d="M12 1h10v10H1z"/>
              <path fill="#05a6f0" d="M1 12h10v10H1z"/>
              <path fill="#ffba08" d="M12 12h10v10H12z"/>
            </svg>
            <span>Microsoft</span>
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="text-xs font-bold text-slate-300 block mb-1">Work Email</label>
            <div className="relative">
              <Mail className="w-4 h-4 text-slate-500 absolute left-3 top-3" />
              <input 
                type="email" 
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full bg-slate-950 border border-slate-800 rounded-xl pl-9 pr-3 py-2.5 text-xs text-white focus:outline-none focus:border-indigo-500"
              />
            </div>
          </div>

          <div>
            <div className="flex justify-between items-center mb-1">
              <label className="text-xs font-bold text-slate-300">Password</label>
              <button type="button" className="text-[11px] text-indigo-400 font-bold hover:underline">
                Forgot password?
              </button>
            </div>
            <div className="relative">
              <Lock className="w-4 h-4 text-slate-500 absolute left-3 top-3" />
              <input 
                type="password" 
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full bg-slate-950 border border-slate-800 rounded-xl pl-9 pr-3 py-2.5 text-xs text-white focus:outline-none focus:border-indigo-500"
              />
            </div>
          </div>

          <div className="flex items-center gap-2 text-xs text-slate-400">
            <input 
              type="checkbox" 
              id="remember"
              checked={rememberMe}
              onChange={(e) => setRememberMe(e.target.checked)}
              className="accent-indigo-500 rounded"
            />
            <label htmlFor="remember" className="cursor-pointer font-medium">Keep me logged in for 30 days</label>
          </div>

          <button
            type="submit"
            className="w-full py-3.5 rounded-xl bg-gradient-to-r from-indigo-500 via-indigo-600 to-violet-600 text-white font-extrabold text-xs shadow-lg shadow-indigo-500/30 hover:scale-[1.01] active:scale-95 transition-all flex items-center justify-center gap-2"
          >
            <span>Sign In to Dashboard</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </form>

        <p className="text-center text-xs text-slate-400">
          Don&apos;t have an account yet?{' '}
          <button 
            onClick={() => onNavigate('public-signup')}
            className="text-indigo-400 font-extrabold hover:underline"
          >
            Start 14-day free trial
          </button>
        </p>

      </div>
    </div>
  );
};
