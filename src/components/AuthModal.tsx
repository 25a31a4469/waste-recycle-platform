'use client';

import React, { useState } from 'react';
import { useApp } from '@/context/AppContext';
import { UserRole } from '@/types';
import {
  X,
  Lock,
  Mail,
  Building2,
  MapPin,
  CheckCircle2,
  ArrowRight,
  ShieldCheck,
} from 'lucide-react';

interface AuthModalProps {
  isOpen: boolean;
  onClose: () => void;
  initialMode?: 'signin' | 'signup';
}

const INDIAN_STATES = [
  'Telangana',
  'Andhra Pradesh',
  'Maharashtra',
  'Tamil Nadu',
  'Karnataka',
  'Gujarat',
  'Delhi NCR',
  'West Bengal',
  'Odisha',
  'Rajasthan',
  'Haryana',
  'Uttar Pradesh',
];

export function AuthModal({ isOpen, onClose, initialMode = 'signin' }: AuthModalProps) {
  const { setRole, addToast, language } = useApp();
  const [mode, setMode] = useState<'signin' | 'signup' | 'forgot'>(initialMode);

  // Form states
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [companyName, setCompanyName] = useState('');
  const [selectedRole, setSelectedRole] = useState<UserRole>('FACTORY');
  const [selectedState, setSelectedState] = useState('Telangana');
  const [city, setCity] = useState('Hyderabad');
  const [industryGoal, setIndustryGoal] = useState<'SELL_WASTE' | 'BUY_FEEDSTOCK' | 'BOTH'>('BOTH');
  const [forgotSuccess, setForgotSuccess] = useState(false);

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (mode === 'forgot') {
      setForgotSuccess(true);
      addToast(
        language === 'te'
          ? 'పాస్‌వర్డ్ రీసెట్ లింక్ మీ ఇమెయిల్‌కు పంపబడింది'
          : 'Password reset link sent to registered email',
        'info'
      );
      return;
    }

    if (mode === 'signup') {
      setRole(selectedRole);
      addToast(
        language === 'te'
          ? `స్వాగతం ${companyName}! మీ సర్క్యువియా ఖాతా సృష్టించబడింది.`
          : `Welcome ${companyName}! Account created and configured.`,
        'success'
      );
    } else {
      addToast(
        language === 'te' ? 'విజయవంతంగా లాగిన్ అయ్యారు' : 'Signed in successfully to CIRCUVIA AI',
        'success'
      );
    }
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-fadeIn">
      <div
        role="dialog"
        aria-modal="true"
        aria-labelledby="auth-modal-title"
        className="relative w-full max-w-lg bg-forest-950 border border-emerald-800/40 rounded-2xl shadow-2xl overflow-hidden p-6 text-white max-h-[92vh] overflow-y-auto"
      >
        {/* Header */}
        <div className="flex items-center justify-between pb-3 border-b border-emerald-900/40">
          <div>
            <h2 id="auth-modal-title" className="text-xl font-bold text-emerald-100 flex items-center gap-2">
              <ShieldCheck className="w-5 h-5 text-emerald-400" />
              {mode === 'signin' && (language === 'te' ? 'సర్క్యువియా లాగిన్' : 'Sign In to CIRCUVIA AI')}
              {mode === 'signup' && (language === 'te' ? 'వ్యాపార నమోదు (రిజిస్ట్రేషన్)' : 'Onboard Your Facility / Business')}
              {mode === 'forgot' && (language === 'te' ? 'పాస్‌వర్డ్ రీసెట్' : 'Reset Account Password')}
            </h2>
            <p className="text-xs text-stone-300 mt-0.5">
              {language === 'te'
                ? 'భారతదేశపు అతిపెద్ద సర్క్యులర్ రిసోర్స్ ఎక్స్ఛేంజ్ నెట్‌వర్క్'
                : 'India’s premier industrial circular resource exchange network'}
            </p>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-lg text-stone-400 hover:text-white hover:bg-forest-900 transition-colors"
            aria-label="Close dialog"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Tab switch for signin / signup */}
        {mode !== 'forgot' && (
          <div className="flex p-1 bg-forest-900/60 rounded-xl my-4 border border-emerald-900/40">
            <button
              type="button"
              onClick={() => setMode('signin')}
              className={`flex-1 py-1.5 text-xs font-semibold rounded-lg transition-all ${
                mode === 'signin' ? 'bg-emerald-600 text-white shadow-sm' : 'text-stone-300 hover:text-white'
              }`}
            >
              {language === 'te' ? 'లాగిన్' : 'Sign In'}
            </button>
            <button
              type="button"
              onClick={() => setMode('signup')}
              className={`flex-1 py-1.5 text-xs font-semibold rounded-lg transition-all ${
                mode === 'signup' ? 'bg-emerald-600 text-white shadow-sm' : 'text-stone-300 hover:text-white'
              }`}
            >
              {language === 'te' ? 'కొత్త ఖాతా సృష్టించండి' : 'Register New Facility'}
            </button>
          </div>
        )}

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-4">
          {mode === 'forgot' ? (
            forgotSuccess ? (
              <div className="py-6 text-center space-y-3">
                <CheckCircle2 className="w-12 h-12 text-emerald-400 mx-auto" />
                <p className="text-sm text-stone-200">
                  {language === 'te'
                    ? 'రీసెట్ సూచనలు మీ ఇమెయిల్‌కు పంపబడ్డాయి. దయచేసి ఇన్బాక్స్ తనిఖీ చేయండి.'
                    : 'Check your email inbox for a secure one-time password reset link.'}
                </p>
                <button
                  type="button"
                  onClick={() => {
                    setMode('signin');
                    setForgotSuccess(false);
                  }}
                  className="px-4 py-2 bg-emerald-600 rounded-lg text-xs font-semibold text-white"
                >
                  {language === 'te' ? 'తిరిగి లాగిన్‌కు వెళ్ళండి' : 'Back to Sign In'}
                </button>
              </div>
            ) : (
              <>
                <div>
                  <label className="block text-xs font-medium text-stone-300 mb-1">
                    {language === 'te' ? 'నమోదిత ఇమెయిల్' : 'Registered Work Email'}
                  </label>
                  <div className="relative">
                    <Mail className="w-4 h-4 text-stone-400 absolute left-3 top-3" />
                    <input
                      type="email"
                      required
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="procurement@factory.com"
                      className="w-full pl-9 pr-3 py-2 bg-forest-900 border border-emerald-800/40 rounded-xl text-sm text-white focus:outline-none focus:border-emerald-500"
                    />
                  </div>
                </div>
                <div className="flex gap-2 justify-end pt-2">
                  <button
                    type="button"
                    onClick={() => setMode('signin')}
                    className="px-4 py-2 text-xs font-semibold text-stone-300 hover:text-white"
                  >
                    {language === 'te' ? 'రద్దు చేయి' : 'Cancel'}
                  </button>
                  <button
                    type="submit"
                    className="px-5 py-2 bg-emerald-600 hover:bg-emerald-500 rounded-xl text-xs font-semibold text-white transition-colors"
                  >
                    {language === 'te' ? 'రీసెట్ లింక్ పంపు' : 'Send Reset Link'}
                  </button>
                </div>
              </>
            )
          ) : (
            <>
              {mode === 'signup' && (
                <>
                  <div>
                    <label className="block text-xs font-medium text-stone-300 mb-1">
                      {language === 'te' ? 'సంస్థ / ఫ్యాక్టరీ పేరు' : 'Company / Factory / Shop Name'}
                    </label>
                    <div className="relative">
                      <Building2 className="w-4 h-4 text-stone-400 absolute left-3 top-3" />
                      <input
                        type="text"
                        required
                        value={companyName}
                        onChange={(e) => setCompanyName(e.target.value)}
                        placeholder="e.g. Hyderabad Eco Polymers Pvt Ltd"
                        className="w-full pl-9 pr-3 py-2 bg-forest-900 border border-emerald-800/40 rounded-xl text-sm text-white focus:outline-none focus:border-emerald-500"
                      />
                    </div>
                  </div>

                  {/* Primary Business Role */}
                  <div>
                    <label className="block text-xs font-medium text-stone-300 mb-1">
                      {language === 'te' ? 'ప్రాథమిక వ్యాపార పాత్ర' : 'Primary Business Category'}
                    </label>
                    <select
                      value={selectedRole}
                      onChange={(e) => setSelectedRole(e.target.value as UserRole)}
                      className="w-full px-3 py-2 bg-forest-900 border border-emerald-800/40 rounded-xl text-sm text-white focus:outline-none focus:border-emerald-500"
                    >
                      <option value="FACTORY">{language === 'te' ? 'ఫ్యాక్టరీ / పరిశ్రమ (భారీ ఉత్పత్తి)' : 'Factory / Enterprise (Heavy Manufacturing)'}</option>
                      <option value="SMALL_BUSINESS">{language === 'te' ? 'చిన్న వ్యాపారం / వర్క్‌షాప్ (MSME)' : 'Small Business / Workshop (MSME)'}</option>
                      <option value="RECYCLER">{language === 'te' ? 'రీసైక్లర్ / స్క్రాప్ ప్రాసెసర్' : 'Recycler / Scrap Processor'}</option>
                      <option value="SUPPLIER">{language === 'te' ? 'ముడి సరుకు సరఫరాదారు' : 'Raw Material Supplier / Stockist'}</option>
                      <option value="BUYER">{language === 'te' ? 'కొనుగోలుదారు / తయారీదారు' : 'Procurement Buyer / Converter'}</option>
                    </select>
                  </div>

                  {/* Location (State & City) */}
                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <label className="block text-xs font-medium text-stone-300 mb-1">
                        {language === 'te' ? 'రాష్ట్రం' : 'State'}
                      </label>
                      <select
                        value={selectedState}
                        onChange={(e) => setSelectedState(e.target.value)}
                        className="w-full px-3 py-2 bg-forest-900 border border-emerald-800/40 rounded-xl text-sm text-white focus:outline-none focus:border-emerald-500"
                      >
                        {INDIAN_STATES.map((s) => (
                          <option key={s} value={s}>
                            {s}
                          </option>
                        ))}
                      </select>
                    </div>
                    <div>
                      <label className="block text-xs font-medium text-stone-300 mb-1">
                        {language === 'te' ? 'నగరం / వాడ' : 'City / Industrial Area'}
                      </label>
                      <div className="relative">
                        <MapPin className="w-4 h-4 text-stone-400 absolute left-3 top-3" />
                        <input
                          type="text"
                          required
                          value={city}
                          onChange={(e) => setCity(e.target.value)}
                          placeholder="e.g. Hyderabad"
                          className="w-full pl-9 pr-3 py-2 bg-forest-900 border border-emerald-800/40 rounded-xl text-sm text-white focus:outline-none focus:border-emerald-500"
                        />
                      </div>
                    </div>
                  </div>

                  {/* Primary Goal */}
                  <div>
                    <label className="block text-xs font-medium text-stone-300 mb-1">
                      {language === 'te' ? 'మీ ప్లాట్‌ఫారమ్ లక్ష్యం' : 'Platform Objectives'}
                    </label>
                    <div className="grid grid-cols-3 gap-2">
                      <button
                        type="button"
                        onClick={() => setIndustryGoal('SELL_WASTE')}
                        className={`py-1.5 px-2 rounded-lg text-xs font-medium border text-center transition-all ${
                          industryGoal === 'SELL_WASTE'
                            ? 'bg-emerald-900/60 border-emerald-400 text-emerald-200'
                            : 'border-emerald-900/40 text-stone-400'
                        }`}
                      >
                        {language === 'te' ? 'వ్యర్థాలు అమ్మడం' : 'Sell By-Products'}
                      </button>
                      <button
                        type="button"
                        onClick={() => setIndustryGoal('BUY_FEEDSTOCK')}
                        className={`py-1.5 px-2 rounded-lg text-xs font-medium border text-center transition-all ${
                          industryGoal === 'BUY_FEEDSTOCK'
                            ? 'bg-emerald-900/60 border-emerald-400 text-emerald-200'
                            : 'border-emerald-900/40 text-stone-400'
                        }`}
                      >
                        {language === 'te' ? 'సరుకు కొనడం' : 'Source Inputs'}
                      </button>
                      <button
                        type="button"
                        onClick={() => setIndustryGoal('BOTH')}
                        className={`py-1.5 px-2 rounded-lg text-xs font-medium border text-center transition-all ${
                          industryGoal === 'BOTH'
                            ? 'bg-emerald-900/60 border-emerald-400 text-emerald-200'
                            : 'border-emerald-900/40 text-stone-400'
                        }`}
                      >
                        {language === 'te' ? 'రెండూ' : 'Both (Sell & Buy)'}
                      </button>
                    </div>
                  </div>
                </>
              )}

              <div>
                <label className="block text-xs font-medium text-stone-300 mb-1">
                  {language === 'te' ? 'ఇమెయిల్ చిరునామా' : 'Business Email'}
                </label>
                <div className="relative">
                  <Mail className="w-4 h-4 text-stone-400 absolute left-3 top-3" />
                  <input
                    type="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="user@enterprise.in"
                    className="w-full pl-9 pr-3 py-2 bg-forest-900 border border-emerald-800/40 rounded-xl text-sm text-white focus:outline-none focus:border-emerald-500"
                  />
                </div>
              </div>

              <div>
                <div className="flex items-center justify-between mb-1">
                  <label className="block text-xs font-medium text-stone-300">
                    {language === 'te' ? 'రహస్య పదం (పాస్‌వర్డ్)' : 'Password'}
                  </label>
                  {mode === 'signin' && (
                    <button
                      type="button"
                      onClick={() => setMode('forgot')}
                      className="text-xs text-emerald-400 hover:text-emerald-300"
                    >
                      {language === 'te' ? 'పాస్‌వర్డ్ మర్చిపోయారా?' : 'Forgot password?'}
                    </button>
                  )}
                </div>
                <div className="relative">
                  <Lock className="w-4 h-4 text-stone-400 absolute left-3 top-3" />
                  <input
                    type="password"
                    required
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="••••••••••••"
                    className="w-full pl-9 pr-3 py-2 bg-forest-900 border border-emerald-800/40 rounded-xl text-sm text-white focus:outline-none focus:border-emerald-500"
                  />
                </div>
              </div>

              <button
                type="submit"
                className="w-full mt-4 py-2.5 bg-gradient-to-r from-emerald-600 to-emerald-500 hover:from-emerald-500 hover:to-emerald-400 text-white rounded-xl text-sm font-bold shadow-lg shadow-emerald-950/40 flex items-center justify-center gap-2 transition-all"
              >
                {mode === 'signin'
                  ? language === 'te'
                    ? 'లాగిన్ అవ్వండి'
                    : 'Sign In'
                  : language === 'te'
                  ? 'ఖాతా నమోదు పూర్తి చేయండి'
                  : 'Complete Onboarding & Enter'}
                <ArrowRight className="w-4 h-4" />
              </button>
            </>
          )}
        </form>

        {/* Demo Fast Login Switchers */}
        <div className="mt-5 pt-4 border-t border-emerald-900/40">
          <p className="text-[11px] text-stone-400 text-center mb-2">
            {language === 'te'
              ? 'డెమో కోసం శీఘ్ర లాగిన్ (ఒకే క్లిక్‌తో పాత్రను పరీక్షించండి):'
              : 'One-Click Instant Demo Login as:'}
          </p>
          <div className="flex flex-wrap gap-1.5 justify-center">
            {(['FACTORY', 'SMALL_BUSINESS', 'SUPPLIER', 'RECYCLER', 'BUYER', 'ADMIN'] as UserRole[]).map((r) => (
              <button
                key={r}
                type="button"
                onClick={() => {
                  setRole(r);
                  onClose();
                }}
                className="px-2.5 py-1 text-[11px] bg-forest-900/80 hover:bg-emerald-900/60 border border-emerald-800/30 rounded-lg text-stone-300 hover:text-emerald-300 transition-colors"
              >
                {r.replace('_', ' ')}
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
