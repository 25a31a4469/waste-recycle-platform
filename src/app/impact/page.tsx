'use client';

import React, { useState } from 'react';
import { useApp } from '@/context/AppContext';
import {
  Leaf,
  TrendingUp,
  FileText,
  AlertCircle,
  ShieldCheck,
  Droplets,
  Zap,
  Trees,
  Award,
  Download,
} from 'lucide-react';

export default function ImpactPage() {
  const { t, language, addToast } = useApp();

  const [simCategory, setSimCategory] = useState<'FLY_ASH' | 'PET_PLASTICS' | 'COPPER_SCRAP' | 'BAGASSE_PELLETS'>('FLY_ASH');
  const [simWeightTons, setSimWeightTons] = useState(100);

  // Carbon emission factor per ton of secondary material versus virgin equivalent
  const EMISSION_FACTORS = {
    FLY_ASH: { factor: 0.92, waterFactor: 240, label: 'IS 3812 Cement Blending' },
    PET_PLASTICS: { factor: 1.54, waterFactor: 850, label: 'Bottle-to-Fiber Extrusion' },
    COPPER_SCRAP: { factor: 2.85, waterFactor: 1200, label: 'Secondary Smelting vs Virgin Ore' },
    BAGASSE_PELLETS: { factor: 0.88, waterFactor: 310, label: 'Fossil Coal Boiler Replacement' },
  };

  const currentFactor = EMISSION_FACTORS[simCategory];
  const calculatedCo2Saved = Math.round(simWeightTons * currentFactor.factor);
  const calculatedWaterSaved = Math.round(simWeightTons * currentFactor.waterFactor);
  const treesEquivalent = Math.round(calculatedCo2Saved * 16.5);

  const handleDownloadEsgReport = () => {
    addToast(
      language === 'te'
        ? 'డిజిటల్ ESG కార్బన్ నివేదిక రూపొందించబడింది (డెమో డౌన్‌లోడ్).'
        : 'Scope 3 ESG Environmental Audit Summary generated and downloaded.',
      'success'
    );
  };

  return (
    <div className="flex-1 bg-[#06241a] text-stone-100 min-h-screen py-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto space-y-3">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-950 border border-emerald-500/40 text-xs font-bold text-lime-400">
            <Leaf className="w-3.5 h-3.5" />
            <span>{language === 'te' ? 'సుస్థిరత & ESG విశ్లేషణలు' : 'Environmental Accounting & Circularity'}</span>
          </div>
          <h1 className="text-3xl sm:text-5xl font-black text-white tracking-tight">
            {t('sustainabilityTitle')}
          </h1>
          <p className="text-xs sm:text-sm text-stone-300 leading-relaxed">
            {t('sustainabilitySubtitle')}
          </p>
        </div>

        {/* Methodology Disclosure Alert Banner */}
        <div className="p-4 rounded-2xl bg-forest-900/60 border border-emerald-800/40 flex items-start gap-3 text-xs text-stone-300">
          <AlertCircle className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
          <div className="space-y-1 leading-relaxed">
            <strong className="text-emerald-300">
              {language === 'te' ? 'గణన పారదర్శకత & విధానం' : 'Accounting Methodology & Clear Labeling'}:
            </strong>{' '}
            {t('calcFormulaDesc')}
            <span className="block text-[11px] text-stone-400 mt-1">
              {t('demoDataNotice')}. All figures represent simulated baseline aggregations for platform demonstration.
            </span>
          </div>
        </div>

        {/* Aggregate KPI Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          <div className="p-6 rounded-3xl bg-forest-950 border border-emerald-900/50 space-y-2">
            <span className="text-xs font-bold uppercase text-stone-400">{t('divertedTotal')}</span>
            <div className="text-3xl font-black text-white">28,450 MT</div>
            <div className="text-xs text-emerald-400">Zero-landfill diversion across 1,280+ lots</div>
          </div>
          <div className="p-6 rounded-3xl bg-forest-950 border border-emerald-900/50 space-y-2">
            <span className="text-xs font-bold uppercase text-stone-400">{t('co2Total')}</span>
            <div className="text-3xl font-black text-lime-400">34,120 MT CO₂e</div>
            <div className="text-xs text-stone-400">Calculated via CPCB & EPA WARM Factors</div>
          </div>
          <div className="p-6 rounded-3xl bg-forest-950 border border-emerald-900/50 space-y-2">
            <span className="text-xs font-bold uppercase text-stone-400">{t('waterTotal')}</span>
            <div className="text-3xl font-black text-teal-300">11.9M Liters</div>
            <div className="text-xs text-stone-400">Primary extraction process conserved</div>
          </div>
          <div className="p-6 rounded-3xl bg-forest-950 border border-emerald-900/50 space-y-2">
            <span className="text-xs font-bold uppercase text-stone-400">Cumulative Savings</span>
            <div className="text-3xl font-black text-amber-300">₹14.8 Cr</div>
            <div className="text-xs text-stone-400">Input material procurement discounts</div>
          </div>
        </div>

        {/* Interactive Material ESG Simulator */}
        <div className="p-8 rounded-3xl bg-forest-950 border border-emerald-800/50 shadow-2xl space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-emerald-900/60">
            <div>
              <h2 className="text-xl font-bold text-white flex items-center gap-2">
                <TrendingUp className="w-5 h-5 text-lime-400" />
                {language === 'te' ? 'లైవ్ కార్బన్ కాలిక్యులేటర్' : 'Live Industrial Carbon Abatement Simulator'}
              </h2>
              <p className="text-xs text-stone-400 mt-0.5">
                Calculate Scope 3 emissions avoided for a specific material volume.
              </p>
            </div>

            <button
              onClick={handleDownloadEsgReport}
              className="px-4 py-2 bg-forest-900 hover:bg-forest-800 border border-emerald-700/50 rounded-xl text-xs font-bold text-emerald-300 flex items-center gap-2 transition-colors self-start sm:self-auto"
            >
              <Download className="w-4 h-4" />
              <span>Download Audit Summary (PDF)</span>
            </button>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
            <div className="space-y-4 text-xs">
              <div>
                <label className="block text-stone-300 font-semibold mb-1">
                  Select Circular Material Stream:
                </label>
                <select
                  value={simCategory}
                  onChange={(e) => setSimCategory(e.target.value as any)}
                  className="w-full px-3 py-2.5 bg-forest-900 border border-emerald-800/40 rounded-xl text-white font-medium focus:outline-none"
                >
                  <option value="FLY_ASH">Dry Fly Ash (Cement Clinker Replacement)</option>
                  <option value="PET_PLASTICS">Post-Consumer PET Flakes (Polyester Spinning)</option>
                  <option value="COPPER_SCRAP">Copper Wire Scrap (Secondary Smelting)</option>
                  <option value="BAGASSE_PELLETS">Bagasse Bio-Pellets (Boiler Coal Offset)</option>
                </select>
                <span className="text-[10px] text-emerald-400 mt-1 block">
                  Application: {currentFactor.label}
                </span>
              </div>

              <div>
                <div className="flex justify-between font-semibold mb-1">
                  <span className="text-stone-300">Volume Exchanged:</span>
                  <span className="text-emerald-300 font-bold text-sm">{simWeightTons} Metric Tons</span>
                </div>
                <input
                  type="range"
                  min="10"
                  max="1000"
                  step="10"
                  value={simWeightTons}
                  onChange={(e) => setSimWeightTons(Number(e.target.value))}
                  className="w-full accent-emerald-500 bg-forest-900 h-2 rounded cursor-pointer"
                />
              </div>
            </div>

            {/* Simulated Live Outputs */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <div className="p-4 rounded-2xl bg-forest-900/60 border border-emerald-900/50 text-center space-y-1">
                <Zap className="w-5 h-5 text-lime-400 mx-auto" />
                <div className="text-2xl font-black text-white">{calculatedCo2Saved} MT</div>
                <div className="text-[11px] text-stone-300">CO₂e Abated</div>
              </div>

              <div className="p-4 rounded-2xl bg-forest-900/60 border border-emerald-900/50 text-center space-y-1">
                <Droplets className="w-5 h-5 text-teal-300 mx-auto" />
                <div className="text-2xl font-black text-white">{(calculatedWaterSaved / 1000).toFixed(1)} KL</div>
                <div className="text-[11px] text-stone-300">Water Conserved</div>
              </div>

              <div className="p-4 rounded-2xl bg-forest-900/60 border border-emerald-900/50 text-center space-y-1">
                <Trees className="w-5 h-5 text-emerald-400 mx-auto" />
                <div className="text-2xl font-black text-white">{treesEquivalent.toLocaleString('en-IN')}</div>
                <div className="text-[11px] text-stone-300">Tree Seedlings Equiv.</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
