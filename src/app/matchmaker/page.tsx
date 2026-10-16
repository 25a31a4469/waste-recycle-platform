'use client';

import React, { useState } from 'react';
import { useApp } from '@/context/AppContext';
import { ResourceListing, MatchRecommendation } from '@/types';
import { findTopMatches } from '@/lib/aiMatchmaker';
import { ResourceDetailModal } from '@/components/ResourceDetailModal';
import {
  Sparkles,
  Search,
  Filter,
  CheckCircle2,
  MapPin,
  TrendingUp,
  Leaf,
  Layers,
  ArrowRight,
  ShieldCheck,
  Building,
  RotateCcw,
} from 'lucide-react';

const INDIAN_CITIES = [
  'Ramagundam',
  'Karimnagar',
  'Hyderabad',
  'Visakhapatnam',
  'Guntur',
  'Vijayawada',
  'Bengaluru',
  'Coimbatore',
  'Chennai',
  'Mumbai',
  'Pune',
  'Ahmedabad',
];

export default function MatchmakerPage() {
  const { t, language, listings, currentUser } = useApp();

  const [targetCategory, setTargetCategory] = useState<string>('INDUSTRIAL_SLAG_ASH');
  const [userCity, setUserCity] = useState<string>(currentUser.city || 'Hyderabad');
  const [requiredQuantity, setRequiredQuantity] = useState<number>(50);
  const [maxDistanceKm, setMaxDistanceKm] = useState<number>(500);
  const [activeListing, setActiveListing] = useState<ResourceListing | null>(null);

  const matches: MatchRecommendation[] = findTopMatches(listings, {
    targetCategory,
    userCity,
    requiredQuantity,
    maxDistanceKm,
  });

  return (
    <div className="flex-1 bg-[#06241a] text-stone-100 min-h-screen py-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        {/* Header */}
        <div className="space-y-3 max-w-3xl">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-950 border border-emerald-500/40 text-xs font-bold text-lime-400">
            <Sparkles className="w-3.5 h-3.5" />
            <span>{t('aiMatchTitle')}</span>
          </div>
          <h1 className="text-2xl sm:text-4xl font-black text-white tracking-tight">
            {language === 'te'
              ? 'AI వృత్తాకార వనరుల సరిపోలిక ఇంజిన్'
              : 'Deterministic Industrial Symbiosis Engine'}
          </h1>
          <p className="text-xs sm:text-sm text-stone-300 leading-relaxed">
            {t('aiMatchSubtitle')}
          </p>
        </div>

        {/* Matchmaker Controls Bar */}
        <div className="p-6 rounded-3xl bg-forest-950 border border-emerald-800/50 shadow-2xl space-y-4">
          <div className="flex items-center justify-between pb-3 border-b border-emerald-900/60">
            <span className="text-xs font-bold uppercase tracking-wider text-emerald-300 flex items-center gap-1.5">
              <Filter className="w-4 h-4" />
              {language === 'te' ? 'లక్ష్య అవసరాల ఎంపిక' : 'Target Procurement Profile'}
            </span>
            <span className="text-xs text-stone-400">
              {matches.length} {language === 'te' ? 'అనుకూల మ్యాచ్‌లు కనుగొనబడ్డాయి' : 'Candidate Matches Discovered'}
            </span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 text-xs">
            <div>
              <label className="block text-stone-300 font-semibold mb-1">
                {t('filterCategory')}
              </label>
              <select
                value={targetCategory}
                onChange={(e) => setTargetCategory(e.target.value)}
                className="w-full px-3 py-2 bg-forest-900 border border-emerald-800/40 rounded-xl text-white focus:outline-none"
              >
                <option value="INDUSTRIAL_SLAG_ASH">{t('cat_INDUSTRIAL_SLAG_ASH')}</option>
                <option value="PLASTICS">{t('cat_PLASTICS')}</option>
                <option value="METALS">{t('cat_METALS')}</option>
                <option value="TEXTILES">{t('cat_TEXTILES')}</option>
                <option value="CHEMICALS_SOLVENTS">{t('cat_CHEMICALS_SOLVENTS')}</option>
                <option value="RUBBER">{t('cat_RUBBER')}</option>
                <option value="AGRO_WASTE">{t('cat_AGRO_WASTE')}</option>
                <option value="PAPER_CARDBOARD">{t('cat_PAPER_CARDBOARD')}</option>
              </select>
            </div>

            <div>
              <label className="block text-stone-300 font-semibold mb-1">
                {language === 'te' ? 'మీ కర్మాగార నగరం' : 'Your Facility Location'}
              </label>
              <select
                value={userCity}
                onChange={(e) => setUserCity(e.target.value)}
                className="w-full px-3 py-2 bg-forest-900 border border-emerald-800/40 rounded-xl text-white focus:outline-none"
              >
                {INDIAN_CITIES.map((c) => (
                  <option key={c} value={c}>
                    {c}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-stone-300 font-semibold mb-1">
                {language === 'te' ? 'అవసరమైన పరిమాణం' : 'Monthly Demand (MT)'}
              </label>
              <input
                type="number"
                min="5"
                max="1000"
                value={requiredQuantity}
                onChange={(e) => setRequiredQuantity(Number(e.target.value))}
                className="w-full px-3 py-2 bg-forest-900 border border-emerald-800/40 rounded-xl text-white"
              />
            </div>

            <div>
              <div className="flex justify-between text-stone-300 font-semibold mb-1">
                <span>{language === 'te' ? 'గరిష్ట రవాణా దూరం' : 'Max Transit Radius'}:</span>
                <span className="text-lime-400 font-bold">{maxDistanceKm} km</span>
              </div>
              <input
                type="range"
                min="50"
                max="1500"
                step="50"
                value={maxDistanceKm}
                onChange={(e) => setMaxDistanceKm(Number(e.target.value))}
                className="w-full accent-emerald-500 bg-forest-900 h-2 rounded cursor-pointer mt-1"
              />
            </div>
          </div>
        </div>

        {/* Match Cards List */}
        <div className="space-y-6">
          {matches.map((match) => {
            const item = match.listing;
            const title = language === 'te' && item.titleTe ? item.titleTe : item.title;
            const reasons = language === 'te' && match.reasonsTe ? match.reasonsTe : match.reasons;

            return (
              <div
                key={match.id}
                className="p-6 rounded-3xl bg-forest-950 border border-emerald-800/50 hover:border-emerald-500/60 shadow-xl transition-all space-y-4"
              >
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-4 border-b border-emerald-900/60">
                  <div className="flex items-center gap-4">
                    <img
                      src={item.images[0]}
                      alt={item.title}
                      className="w-20 h-20 rounded-2xl object-cover border border-emerald-700/40 shrink-0"
                    />
                    <div>
                      <div className="flex items-center gap-2">
                        <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-emerald-950 text-emerald-300 border border-emerald-600/30">
                          {t(`cat_${item.category}` as keyof typeof t)}
                        </span>
                        <span className="text-[10px] font-medium bg-forest-900 text-lime-400 px-2 py-0.5 rounded">
                          {t(`type_${item.resourceType}` as keyof typeof t)}
                        </span>
                      </div>
                      <h3
                        onClick={() => setActiveListing(item)}
                        className="text-base sm:text-lg font-bold text-white hover:text-emerald-300 cursor-pointer transition-colors mt-1"
                      >
                        {title}
                      </h3>
                      <div className="flex items-center gap-2 text-xs text-stone-400 mt-0.5">
                        <span className="flex items-center gap-1 text-emerald-400 font-medium">
                          <MapPin className="w-3.5 h-3.5" />
                          {item.locationCity}, {item.locationState}
                        </span>
                        <span>•</span>
                        <span>{item.sellerName}</span>
                      </div>
                    </div>
                  </div>

                  {/* Match Score Badge */}
                  <div className="flex items-center gap-3 self-end md:self-center">
                    <div className="text-right">
                      <div className="text-[10px] uppercase font-bold text-stone-400">
                        {t('aiMatchScore')}
                      </div>
                      <div className="text-3xl font-black text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 to-lime-400">
                        {match.matchScore}%
                      </div>
                    </div>
                    <div className="w-14 h-14 rounded-2xl bg-emerald-950 border-2 border-emerald-500/50 flex items-center justify-center text-lime-400 font-extrabold text-sm shadow-md">
                      FIT
                    </div>
                  </div>
                </div>

                {/* Algorithmic Explainability Reasons */}
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 items-center pt-1">
                  <div className="lg:col-span-2 space-y-2">
                    <div className="text-xs font-bold text-emerald-300">
                      {t('aiWhyMatch')}
                    </div>
                    <div className="space-y-1.5 text-xs text-stone-300">
                      {reasons.map((r, idx) => (
                        <div key={idx} className="flex items-start gap-2">
                          <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 shrink-0 mt-0.5" />
                          <span>{r}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Projected Benefits */}
                  <div className="p-4 rounded-2xl bg-forest-900/60 border border-emerald-900/60 space-y-2 text-xs">
                    <div className="flex justify-between py-1 border-b border-emerald-950">
                      <span className="text-stone-400">{t('aiProximityLabel')}:</span>
                      <span className="font-bold text-white">~{match.proximityKm} km</span>
                    </div>
                    <div className="flex justify-between py-1 border-b border-emerald-950">
                      <span className="text-stone-400">{t('aiCarbonOffset')}:</span>
                      <span className="font-bold text-emerald-300">
                        {(match.carbonOffsetEstimateKg / 1000).toFixed(1)} MT CO₂e
                      </span>
                    </div>
                    <div className="flex justify-between py-1">
                      <span className="text-stone-400">{t('aiCostSavings')}:</span>
                      <span className="font-bold text-lime-400">
                        ₹{match.costSavingsEstimateInr.toLocaleString('en-IN')}
                      </span>
                    </div>
                  </div>
                </div>

                {/* Bottom Actions */}
                <div className="pt-3 border-t border-emerald-950 flex justify-end gap-3">
                  <button
                    type="button"
                    onClick={() => setActiveListing(item)}
                    className="px-4 py-2 bg-forest-900 hover:bg-forest-800 text-stone-200 border border-emerald-800/50 rounded-xl text-xs font-bold transition-colors"
                  >
                    {t('viewDetailsBtn')}
                  </button>
                  <button
                    type="button"
                    onClick={() => setActiveListing(item)}
                    className="px-5 py-2 bg-gradient-to-r from-emerald-600 to-emerald-500 hover:from-emerald-500 text-white rounded-xl text-xs font-bold shadow-md shadow-emerald-950/40"
                  >
                    {t('requestQuoteBtn')}
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Resource Detail Modal */}
      {activeListing && (
        <ResourceDetailModal
          listing={activeListing}
          onClose={() => setActiveListing(null)}
        />
      )}
    </div>
  );
}
