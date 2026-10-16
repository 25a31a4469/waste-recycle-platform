'use client';

import React, { useState } from 'react';
import { useApp } from '@/context/AppContext';
import {
  Factory,
  Cpu,
  Recycle,
  Store,
  ArrowRight,
  Sparkles,
  TrendingUp,
  Leaf,
  ShieldCheck,
} from 'lucide-react';

export function CircularFlowDiagram() {
  const { t, language } = useApp();
  const [activeStage, setActiveStage] = useState<number>(1);

  const stages = [
    {
      id: 0,
      title: language === 'te' ? '1. అప్‌స్ట్రీమ్ కర్మాగారాలు' : '1. Upstream Industrial Origin',
      role: language === 'te' ? 'భారీ పరిశ్రమలు & థర్మల్ ప్లాంట్లు' : 'Heavy Factories & Power Stations',
      icon: Factory,
      iconColor: 'text-amber-400 bg-amber-950/60 border-amber-500/30',
      description:
        language === 'te'
          ? 'థర్మల్ స్టేషన్లు, ఫౌండరీలు, ఫార్మా పార్కులు ప్రతిరోజూ టన్నుల కొద్దీ ఫ్లై యాష్, స్లాగ్, రసాయన ద్రావకాలు మరియు మెటల్ స్క్రాప్‌లను ఉత్పత్తి చేస్తాయి.'
          : 'Thermal stations, steel foundries, and chemical synthesis parks generate tons of unutilized fly ash, molten slag, spent solvents, and metal turnings.',
      materials: ['Fly Ash Grade F', 'Granulated Slag', 'Spent Acetone', 'Millberry Copper'],
      metric: language === 'te' ? '450+ MT నిల్వ లభ్యత' : '450+ MT Daily Residue',
    },
    {
      id: 1,
      title: language === 'te' ? '2. సర్క్యువియా AI మ్యాచింగ్' : '2. CIRCUVIA AI Intelligence',
      role: language === 'te' ? 'అల్గారిథమ్ & ల్యాబ్ ధృవీకరణ' : 'Chemical Compatibility & Logistics Engine',
      icon: Cpu,
      iconColor: 'text-emerald-400 bg-emerald-950/60 border-emerald-500/30',
      description:
        language === 'te'
          ? 'సర్క్యువియా AI రసాయన నిర్మాణం, NABL ల్యాబ్ నివేదికలు, మరియు భౌగోళిక రవాణా దూరాన్ని విశ్లేషించి సరైన కొనుగోలుదారులను జతచేస్తుంది.'
          : 'Algorithms analyze chemical assay (SiO₂, IV, LOI), verified lab certificates, CPCB regulatory manifests, and geographic transit corridors.',
      materials: ['Autonomous Matching', 'NABL Lab Verification', 'Logistics Radius Tuning', 'Carbon Accounting'],
      metric: language === 'te' ? '96% మ్యాచింగ్ ఖచ్చితత్వం' : '96% Compatibility Index',
    },
    {
      id: 2,
      title: language === 'te' ? '3. రీసైక్లింగ్ ప్రాసెసింగ్' : '3. Secondary Processing',
      role: language === 'te' ? 'అధీకృత రీసైక్లర్లు' : 'Washing, Extrusion & Refining Facilities',
      icon: Recycle,
      iconColor: 'text-lime-400 bg-lime-950/60 border-lime-500/30',
      description:
        language === 'te'
          ? 'రీసైక్లర్లు మరియు ప్రాసెసర్లు వ్యర్థాలను హాట్ వాషింగ్, పెల్లెటైజింగ్ లేదా డిస్టిలేషన్ ద్వారా పరిశుద్ధమైన ముడి సరుకులుగా మారుస్తారు.'
          : 'Certified processors convert waste into high-grade rPET flakes, fractional distilled solvents, and crumb rubber conforming to industrial standards.',
      materials: ['Hot Washed PET Flakes', 'Crumb Rubber 30-Mesh', 'Pure Recovered Solvents', 'Cotton Comber Noil'],
      metric: language === 'te' ? '88% ముడిసరుకు రికవరీ' : '88% Material Yield',
    },
    {
      id: 3,
      title: language === 'te' ? '4. డౌన్‌స్ట్రీమ్ వినియోగం' : '4. Downstream Production',
      role: language === 'te' ? 'MSMEలు & తయారీదారులు' : 'Small Workshops, Cement & Tech Mills',
      icon: Store,
      iconColor: 'text-teal-400 bg-teal-950/60 border-teal-500/30',
      description:
        language === 'te'
          ? 'ఇటుకల తయారీదారులు, స్పిన్నింగ్ మిల్లులు, మరియు చిన్న వర్క్‌షాప్‌లు తక్కువ ధరలో ప్రీమియం ఉత్పత్తులను తయారు చేస్తాయి.'
          : 'Green brick makers, yarn spinning mills, and precision fabricators utilize secondary feedstocks, saving up to 40% on production inputs.',
      materials: ['Eco-Bricks (Fal-G)', 'Sustainable Yarn', 'Road Bitumen', 'Precision Casting Billets'],
      metric: language === 'te' ? '38% ఖర్చు ఆదా' : '38% Input Cost Reduction',
    },
  ];

  return (
    <section className="py-16 bg-forest-950 text-white relative overflow-hidden border-y border-emerald-900/40">
      {/* Background glow effects */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-emerald-600/10 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Title */}
        <div className="text-center max-w-3xl mx-auto space-y-3 mb-12">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-950 border border-emerald-500/30 text-emerald-300 text-xs font-bold tracking-wide">
            <Sparkles className="w-3.5 h-3.5 text-lime-400" />
            <span>{language === 'te' ? 'వృత్తాకార వనరుల చక్రం' : 'Continuous Circular Lifecycle'}</span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
            {t('loopTitle')}
          </h2>
          <p className="text-sm text-stone-300 leading-relaxed">
            {t('loopSubtitle')}
          </p>
        </div>

        {/* 4 Interactive Flow Stages */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
          {stages.map((stage) => {
            const isCurrent = activeStage === stage.id;
            const Icon = stage.icon;
            return (
              <button
                key={stage.id}
                type="button"
                onClick={() => setActiveStage(stage.id)}
                className={`relative p-5 rounded-2xl border text-left transition-all duration-300 flex flex-col justify-between ${
                  isCurrent
                    ? 'bg-gradient-to-b from-forest-900 to-emerald-950 border-emerald-400 shadow-xl shadow-emerald-950/60 scale-[1.02]'
                    : 'bg-forest-900/30 border-emerald-900/30 hover:border-emerald-700/60 hover:bg-forest-900/60'
                }`}
              >
                <div>
                  <div className="flex items-center justify-between mb-3">
                    <div className={`p-2.5 rounded-xl border ${stage.iconColor}`}>
                      <Icon className="w-5 h-5" />
                    </div>
                    <span className="text-[11px] font-mono px-2 py-0.5 rounded bg-forest-950 text-stone-400 border border-emerald-900/50">
                      Step {stage.id + 1}
                    </span>
                  </div>
                  <h3 className="font-bold text-sm text-stone-100">{stage.title}</h3>
                  <div className="text-xs text-emerald-400 font-medium mt-0.5">{stage.role}</div>
                </div>

                <div className="mt-4 pt-3 border-t border-emerald-950 flex items-center justify-between text-[11px]">
                  <span className="text-stone-400">{stage.metric}</span>
                  {isCurrent && <span className="text-lime-400 font-bold">● Active View</span>}
                </div>
              </button>
            );
          })}
        </div>

        {/* Active Stage Deep-Dive Card */}
        <div className="p-6 sm:p-8 rounded-3xl bg-gradient-to-r from-forest-900/90 to-emerald-950/90 border border-emerald-700/40 shadow-2xl backdrop-blur-md">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 items-center">
            <div className="lg:col-span-2 space-y-4">
              <div className="flex items-center gap-2 text-lime-400 text-xs font-bold uppercase tracking-wider">
                <Sparkles className="w-4 h-4" />
                <span>
                  {language === 'te'
                    ? `దశ ${activeStage + 1} వివరాలు`
                    : `Circular Symbiosis Stage ${activeStage + 1} Breakdown`}
                </span>
              </div>
              <h3 className="text-xl sm:text-2xl font-bold text-white">
                {stages[activeStage].title}
              </h3>
              <p className="text-xs sm:text-sm text-stone-300 leading-relaxed">
                {stages[activeStage].description}
              </p>

              {/* Exchanged Materials Pills */}
              <div className="pt-2">
                <span className="text-xs font-semibold text-emerald-300 block mb-2">
                  {language === 'te' ? 'ఈ దశలో బదిలీ అయ్యే పదార్థాలు' : 'Materials Exchanged at this Stage'}:
                </span>
                <div className="flex flex-wrap gap-2">
                  {stages[activeStage].materials.map((mat, i) => (
                    <span
                      key={i}
                      className="px-3 py-1 rounded-xl bg-forest-950 border border-emerald-800/60 text-xs font-medium text-stone-200 flex items-center gap-1.5"
                    >
                      <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
                      {mat}
                    </span>
                  ))}
                </div>
              </div>
            </div>

            {/* Impact Metric Box */}
            <div className="p-6 rounded-2xl bg-forest-950 border border-emerald-800/60 space-y-4">
              <div className="flex items-center gap-2 text-xs font-bold text-emerald-300">
                <TrendingUp className="w-4 h-4 text-lime-400" />
                <span>
                  {language === 'te' ? 'ఆర్థిక & పర్యావరణ ప్రయోజనం' : 'Calculated Circular Value'}
                </span>
              </div>
              <div className="space-y-3 text-xs">
                <div className="flex justify-between py-1.5 border-b border-emerald-950">
                  <span className="text-stone-400">{language === 'te' ? 'లక్ష్యం' : 'Network Role'}:</span>
                  <span className="font-semibold text-white">{stages[activeStage].role}</span>
                </div>
                <div className="flex justify-between py-1.5 border-b border-emerald-950">
                  <span className="text-stone-400">{language === 'te' ? 'ధృవీకరణ' : 'Compliance'}:</span>
                  <span className="font-semibold text-emerald-400 flex items-center gap-1">
                    <ShieldCheck className="w-3.5 h-3.5" /> ISO 14001 / CPCB
                  </span>
                </div>
                <div className="flex justify-between py-1.5">
                  <span className="text-stone-400">{language === 'te' ? 'ముడిసరుకు ఆదా' : 'Net CO₂e Saved'}:</span>
                  <span className="font-bold text-lime-400">~1.24 MT CO₂e / Ton</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
