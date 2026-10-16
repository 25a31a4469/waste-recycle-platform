'use client';

import React from 'react';
import { useApp } from '@/context/AppContext';
import { UserRole } from '@/types';
import {
  Factory,
  Store,
  Truck,
  Recycle,
  ShoppingCart,
  ShieldCheck,
  X,
  Check,
} from 'lucide-react';

interface RoleSwitcherModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export function RoleSwitcherModal({ isOpen, onClose }: RoleSwitcherModalProps) {
  const { currentRole, setRole, t, language } = useApp();

  if (!isOpen) return null;

  const roles: {
    key: UserRole;
    icon: React.ComponentType<{ className?: string }>;
    accentColor: string;
  }[] = [
    { key: 'FACTORY', icon: Factory, accentColor: 'text-amber-400 border-amber-500/30' },
    { key: 'SMALL_BUSINESS', icon: Store, accentColor: 'text-emerald-400 border-emerald-500/30' },
    { key: 'SUPPLIER', icon: Truck, accentColor: 'text-blue-400 border-blue-500/30' },
    { key: 'RECYCLER', icon: Recycle, accentColor: 'text-lime-400 border-lime-500/30' },
    { key: 'BUYER', icon: ShoppingCart, accentColor: 'text-teal-400 border-teal-500/30' },
    { key: 'ADMIN', icon: ShieldCheck, accentColor: 'text-purple-400 border-purple-500/30' },
  ];

  const handleSelectRole = (role: UserRole) => {
    setRole(role);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-fadeIn">
      <div
        role="dialog"
        aria-modal="true"
        aria-labelledby="role-modal-title"
        className="relative w-full max-w-2xl bg-forest-950 border border-emerald-800/40 rounded-2xl shadow-2xl overflow-hidden p-6 text-white"
      >
        {/* Header */}
        <div className="flex items-center justify-between pb-4 border-b border-emerald-900/40">
          <div>
            <h2 id="role-modal-title" className="text-xl font-bold text-emerald-100 flex items-center gap-2">
              <Recycle className="w-5 h-5 text-emerald-400" />
              {t('switchRole')}
            </h2>
            <p className="text-xs text-stone-300 mt-1">
              {language === 'te'
                ? 'మీ వ్యాపార అవసరాలకు అనుగుణంగా తగిన పాత్రను ఎంచుకోండి. ప్రతి పాత్రకు ప్రత్యేక డాష్‌బోర్డ్ మరియు అధికారాలు ఉంటాయి.'
                : 'Select an active perspective to experience role-specific dashboards, workflows, and commercial permissions.'}
            </p>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-lg text-stone-400 hover:text-white hover:bg-forest-900 transition-colors"
            aria-label="Close modal"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Roles Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3 mt-5">
          {roles.map(({ key, icon: Icon, accentColor }) => {
            const isSelected = currentRole === key;
            const roleTitle = t(`role_${key}` as keyof typeof t);
            const roleDesc = t(`roleDesc_${key}` as keyof typeof t);

            return (
              <button
                key={key}
                onClick={() => handleSelectRole(key)}
                className={`relative flex items-start gap-3 p-4 rounded-xl border text-left transition-all ${
                  isSelected
                    ? 'bg-emerald-900/40 border-emerald-400 shadow-lg shadow-emerald-950/40'
                    : 'bg-forest-900/40 border-emerald-900/30 hover:border-emerald-700/60 hover:bg-forest-900/80'
                }`}
              >
                <div
                  className={`p-2.5 rounded-xl border bg-forest-950 ${accentColor} shrink-0 mt-0.5`}
                >
                  <Icon className="w-5 h-5" />
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between gap-1">
                    <span className="font-semibold text-sm text-stone-100">{roleTitle}</span>
                    {isSelected && (
                      <span className="inline-flex items-center gap-1 text-[11px] font-bold text-emerald-400 bg-emerald-950/80 px-2 py-0.5 rounded-full border border-emerald-500/30">
                        <Check className="w-3 h-3" /> Active
                      </span>
                    )}
                  </div>
                  <p className="text-xs text-stone-400 mt-1 leading-relaxed line-clamp-2">
                    {roleDesc}
                  </p>
                </div>
              </button>
            );
          })}
        </div>

        {/* Footer note */}
        <div className="mt-5 pt-3 border-t border-emerald-900/40 flex items-center justify-between text-xs text-stone-400">
          <span>{t('demoDataNotice')}</span>
          <button
            onClick={onClose}
            className="px-4 py-1.5 rounded-lg bg-emerald-600 hover:bg-emerald-500 text-white font-medium text-xs transition-colors"
          >
            {t('confirmAction')}
          </button>
        </div>
      </div>
    </div>
  );
}
