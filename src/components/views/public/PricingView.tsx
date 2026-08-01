import React, { useState } from 'react';
import { 
  Check, 
  Sparkles, 
  Zap, 
  HelpCircle, 
  ArrowRight, 
  ShieldCheck, 
  Sliders 
} from 'lucide-react';
import { MainTab } from '../../../types';

interface PricingViewProps {
  onNavigate: (tab: MainTab) => void;
}

export const PricingView: React.FC<PricingViewProps> = ({ onNavigate }) => {
  const [isAnnual, setIsAnnual] = useState(true);
  const [extraInboxes, setExtraInboxes] = useState(0);

  const discountMultiplier = isAnnual ? 0.8 : 1.0;

  const plans = [
    {
      id: 'starter',
      name: 'Starter Warmup',
      basePrice: 29,
      description: 'Ideal for solopreneurs & founders launching new outreach domains.',
      popular: false,
      features: [
        'Up to 5 Connected Inboxes',
        'AI Peer-to-Peer Warmup Engine',
        'Spam Folder Automated Rescue',
        '500 Verified Lead Search Credits / mo',
        'Single Inbox Outreach Campaigns',
        'SPF, DKIM, DMARC Health Monitoring',
        'Standard Email Support'
      ]
    },
    {
      id: 'pro',
      name: 'Growth & Agency Pro',
      basePrice: 79,
      description: 'Built for sales teams scaling cold email outreach volume safely.',
      popular: true,
      features: [
        'Up to 25 Connected Inboxes',
        'AI Peer-to-Peer Warmup Engine',
        'Automated Multi-Inbox Rotation',
        'AI Spintax Generator',
        '2,500 Verified Lead Search Credits / mo',
        'Unified Master Response Inbox',
        'LinkedIn Extension Integration',
        'Priority 24/7 Live Chat Support'
      ]
    },
    {
      id: 'enterprise',
      name: 'Enterprise Scale',
      basePrice: 199,
      description: 'For high-volume lead agencies and revenue teams with custom requirements.',
      popular: false,
      features: [
        'Unlimited Connected Inboxes',
        'Custom Dedicated IP Pool Warmup',
        '10,000 Verified Lead Search Credits / mo',
        'Custom API & Webhooks Access',
        'Dedicated Account Manager',
        'Custom Deliverability SLA (99.5%+)',
        'Team Seats & Roles Permissions'
      ]
    }
  ];

  return (
    <div className="space-y-20 py-10">
      
      {/* HEADER SECTION */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-6">
        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-indigo-500/10 border border-indigo-500/20 text-indigo-400 text-xs font-bold">
          <Sparkles className="w-4 h-4 text-amber-300" />
          <span>Transparent & Predictable Pricing</span>
        </div>

        <h1 className="text-4xl sm:text-5xl font-black text-white tracking-tight">
          Simple Plans for <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 via-cyan-400 to-emerald-400">Unstoppable Sales Growth</span>
        </h1>

        <p className="text-slate-300 text-sm sm:text-base max-w-2xl mx-auto font-medium">
          Choose the plan that fits your outreach goals. All plans include a 14-day free trial with no credit card required.
        </p>

        {/* Annual / Monthly Toggle */}
        <div className="pt-2 flex items-center justify-center gap-3">
          <span className={`text-xs font-bold ${!isAnnual ? 'text-white' : 'text-slate-400'}`}>Monthly Billing</span>
          <button
            onClick={() => setIsAnnual(!isAnnual)}
            className="w-14 h-8 rounded-full bg-indigo-600 p-1 flex items-center transition-all cursor-pointer relative"
          >
            <div className={`w-6 h-6 rounded-full bg-white shadow-md transition-transform ${isAnnual ? 'translate-x-6' : 'translate-x-0'}`} />
          </button>
          <div className="flex items-center gap-1.5">
            <span className={`text-xs font-bold ${isAnnual ? 'text-white' : 'text-slate-400'}`}>Annual Billing</span>
            <span className="text-[10px] bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 px-2 py-0.5 rounded-full font-extrabold uppercase">
              Save 20%
            </span>
          </div>
        </div>
      </section>

      {/* PRICING CARDS GRID */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {plans.map(plan => {
            const finalPrice = Math.round(plan.basePrice * discountMultiplier);
            return (
              <div
                key={plan.id}
                className={`rounded-3xl p-8 flex flex-col justify-between border relative transition-all ${
                  plan.popular 
                    ? 'bg-gradient-to-b from-indigo-950/60 to-slate-900 border-indigo-500 shadow-2xl shadow-indigo-500/20 scale-105 z-10' 
                    : 'bg-slate-900 border-slate-800'
                }`}
              >
                {plan.popular && (
                  <div className="absolute -top-4 left-1/2 -translate-x-1/2 bg-gradient-to-r from-indigo-500 to-violet-600 text-white text-[10px] uppercase font-black px-4 py-1.5 rounded-full shadow-lg">
                    Most Popular Choice
                  </div>
                )}

                <div className="space-y-6">
                  <div>
                    <h3 className="text-xl font-black text-white">{plan.name}</h3>
                    <p className="text-xs text-slate-400 mt-1">{plan.description}</p>
                  </div>

                  <div className="flex items-baseline gap-1">
                    <span className="text-4xl font-black text-white">${finalPrice}</span>
                    <span className="text-xs text-slate-400 font-bold">/ month</span>
                    {isAnnual && <span className="text-[10px] text-emerald-400 font-bold ml-1">(Billed annually)</span>}
                  </div>

                  <button
                    onClick={() => onNavigate('public-signup')}
                    className={`w-full py-3.5 rounded-xl text-xs font-extrabold transition-all flex items-center justify-center gap-2 ${
                      plan.popular
                        ? 'bg-gradient-to-r from-indigo-500 via-indigo-600 to-violet-600 text-white shadow-lg shadow-indigo-500/30 hover:scale-[1.02]'
                        : 'bg-slate-800 hover:bg-slate-700 text-slate-200 border border-slate-700'
                    }`}
                  >
                    <span>Start 14-Day Free Trial</span>
                    <ArrowRight className="w-4 h-4" />
                  </button>

                  <div className="pt-4 border-t border-slate-800 space-y-3">
                    <p className="text-xs font-bold text-slate-400 uppercase tracking-wider">What&apos;s Included:</p>
                    {plan.features.map((feat, idx) => (
                      <div key={idx} className="flex items-start gap-2.5 text-xs text-slate-300 font-medium">
                        <Check className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                        <span>{feat}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* FAQ SECTION */}
      <section className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6">
        <h2 className="text-2xl font-black text-white text-center">Frequently Asked Pricing Questions</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          <div className="bg-slate-900 p-5 rounded-2xl border border-slate-800 space-y-2">
            <h4 className="text-sm font-extrabold text-white">Can I upgrade or downgrade anytime?</h4>
            <p className="text-xs text-slate-400 leading-relaxed">Yes, you can upgrade or adjust your inbox limits at any point directly inside your Account Billing tab.</p>
          </div>
          <div className="bg-slate-900 p-5 rounded-2xl border border-slate-800 space-y-2">
            <h4 className="text-sm font-extrabold text-white">What happens after the 14-day trial?</h4>
            <p className="text-xs text-slate-400 leading-relaxed">Your account simply pauses sending until you choose a plan. We never auto-charge without your confirmation.</p>
          </div>
        </div>
      </section>

    </div>
  );
};
