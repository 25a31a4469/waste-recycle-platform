'use client';

import React from 'react';
import Link from 'next/link';
import { useApp } from '@/context/AppContext';
import {
  Recycle,
  Factory,
  Store,
  ShieldAlert,
  Award,
  CheckCircle2,
  FileText,
  HelpCircle,
  Truck,
  ArrowRight,
  ShieldCheck,
} from 'lucide-react';

export default function HowItWorksPage() {
  const { t, language } = useApp();

  return (
    <div className="flex-1 bg-[#06241a] text-stone-100 min-h-screen py-10">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto space-y-3">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-950 border border-emerald-500/40 text-xs font-bold text-lime-400">
            <Recycle className="w-3.5 h-3.5" />
            <span>{language === 'te' ? 'పనితీరు & నిబంధనల మార్గదర్శి' : 'Platform Architecture & Operational Guide'}</span>
          </div>
          <h1 className="text-3xl sm:text-5xl font-black text-white tracking-tight">
            {t('navHowItWorks')}
          </h1>
          <p className="text-xs sm:text-sm text-stone-300 leading-relaxed">
            {language === 'te'
              ? 'సర్క్యువియా AI ద్వారా పారిశ్రామిక వ్యర్థాలను రసాయన మరియు చట్టపరమైన ప్రమాణాలతో సురక్షితంగా ఎలా మార్పిడి చేయాలో తెలుసుకోండి.'
              : 'Understand how CIRCUVIA AI facilitates verified industrial symbiosis, CPCB compliance, and reliable cross-sector resource transactions.'}
          </p>
        </div>

        {/* 3 Step Deep Dive */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="p-6 rounded-3xl bg-forest-950 border border-emerald-900/50 space-y-3">
            <div className="w-10 h-10 rounded-2xl bg-emerald-900/60 border border-emerald-500/40 flex items-center justify-center font-black text-emerald-300 text-base">
              01
            </div>
            <h3 className="font-bold text-base text-white">
              {language === 'te' ? 'వనరును లిస్ట్ చేయండి' : 'Residue Characterization'}
            </h3>
            <p className="text-xs text-stone-300 leading-relaxed">
              {language === 'te'
                ? 'భారీ ఫ్యాక్టరీలు తమ వద్ద ఉత్పన్నమయ్యే ఫ్లై యాష్, స్లాగ్, రసాయనాలను నాణ్యతా పరీక్షలు (NABL COA) మరియు పరిమాణాలతో నమోదు చేస్తాయి.'
                : 'Upstream facilities categorize physical forms (powder, slurry, bales), upload standard laboratory assays, and declare storage parameters.'}
            </p>
          </div>

          <div className="p-6 rounded-3xl bg-forest-950 border border-emerald-900/50 space-y-3">
            <div className="w-10 h-10 rounded-2xl bg-emerald-900/60 border border-emerald-500/40 flex items-center justify-center font-black text-emerald-300 text-base">
              02
            </div>
            <h3 className="font-bold text-base text-white">
              {language === 'te' ? 'AI మ్యాచింగ్ & కొటేషన్లు' : 'Autonomous AI Symbiosis'}
            </h3>
            <p className="text-xs text-stone-300 leading-relaxed">
              {language === 'te'
                ? 'మా మ్యాచింగ్ ఇంజిన్ రవాణా దూరం, రసాయన సహనం మరియు MOQ ఆధారంగా కొనుగోలుదారులను సరిపోలుస్తుంది.'
                : 'Algorithms match chemical compatibility against downstream manufacturing tolerances, calculating carbon abatement and route logistics.'}
            </p>
          </div>

          <div className="p-6 rounded-3xl bg-forest-950 border border-emerald-900/50 space-y-3">
            <div className="w-10 h-10 rounded-2xl bg-emerald-900/60 border border-emerald-500/40 flex items-center justify-center font-black text-emerald-300 text-base">
              03
            </div>
            <h3 className="font-bold text-base text-white">
              {language === 'te' ? 'రవాణా & సర్టిఫికేషన్' : 'Dispatch & Manifest Audit'}
            </h3>
            <p className="text-xs text-stone-300 leading-relaxed">
              {language === 'te'
                ? 'డిజిటల్ వేబిల్ రసీదు మరియు CPCB నిబంధనల ప్రకారం లెక్కింపబడిన Scope 3 ESG సర్టిఫికెట్ జారీ చేయబడుతుంది.'
                : 'Dispatches utilize digital QR weighbridge gate passes, automated Form 6 manifests, and ISO 14001 Scope 3 ESG emission reduction documentation.'}
            </p>
          </div>
        </div>

        {/* HAZARDOUS MATERIALS REGULATORY POLICY (ID: safety) */}
        <div id="safety" className="p-8 rounded-3xl bg-amber-950/20 border border-amber-800/40 space-y-4">
          <div className="flex items-center gap-2.5 text-amber-300 font-bold text-base">
            <ShieldAlert className="w-6 h-6 text-amber-400" />
            <span>
              {language === 'te'
                ? 'ప్రమాదకర వ్యర్థాల నియంత్రణ విధానం (CPCB Hazardous Waste Compliance)'
                : 'Strict Hazardous Materials Policy & CPCB Manifest Rules'}
            </span>
          </div>
          <p className="text-xs sm:text-sm text-stone-300 leading-relaxed">
            {language === 'te'
              ? 'భారతదేశ ప్రమాదకర వ్యర్థాల నిబంధనలు (Hazardous and Other Wastes Rules, 2016) ప్రకారం, షెడ్యూల్ I మరియు II కిందకు వచ్చే పారిశ్రామిక వ్యర్థాల రవాణాకు రాష్ట్ర కాలుష్య నియంత్రణ మండలి (SPCB) అనుమతులు మరియు అధికారిక ఫారమ్ 6 మేనిఫెస్ట్ తప్పనిసరి. విషపూరిత, రేడియోధార్మిక లేదా శుద్ధి చేయని బయో-మెడికల్ వ్యర్థాల ట్రేడింగ్ నిషేధం.'
              : 'Under the Hazardous and Other Wastes (Management and Transboundary Movement) Rules, 2016, any commercial transfer of scheduled residues requires valid State Pollution Control Board authorizations. CIRCUVIA AI enforces pre-verification of hazardous waste manifests before lot dispatch is authorized.'}
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2 text-xs">
            <div className="p-3 bg-forest-950/80 rounded-xl border border-amber-800/30 flex items-center gap-2 text-stone-200">
              <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
              <span>Fly Ash conforming to IS 3812 is fully non-hazardous</span>
            </div>
            <div className="p-3 bg-forest-950/80 rounded-xl border border-amber-800/30 flex items-center gap-2 text-stone-200">
              <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
              <span>Food-grade washed PET flakes conform to CIPET criteria</span>
            </div>
          </div>
        </div>

        {/* LAB TESTING & AUDIT GUIDANCE (ID: lab) */}
        <div id="lab" className="p-8 rounded-3xl bg-forest-950 border border-emerald-800/50 space-y-4">
          <div className="flex items-center gap-2.5 text-emerald-300 font-bold text-base">
            <Award className="w-6 h-6 text-emerald-400" />
            <span>
              {language === 'te'
                ? 'NABL ప్రయోగశాల పరీక్షా మార్గదర్శకాలు (Laboratory Testing Protocol)'
                : 'Accredited NABL Lab Testing Guidelines'}
            </span>
          </div>
          <p className="text-xs sm:text-sm text-stone-300 leading-relaxed">
            {language === 'te'
              ? 'నాణ్యమైన కొనుగోలుదారులను ఆకర్షించడానికి, విక్రేతలు గుర్తింపు పొందిన NABL ప్రయోగశాలల నుండి పరీక్షించిన సమగ్ర రసాయన నివేదికలను అప్‌లోడ్ చేయాలి. నమూనా సేకరణ సమయంలో స్ప్లిట్-శాంపిల్ పద్ధతిని పాటించాలి.'
              : 'Listings verified with accredited NABL laboratory assays gain 3x more buyer bids. Testing reports should specify Loss on Ignition (LOI), compressive index, intrinsic viscosity (IV), or heavy metal thresholds according to relevant Bureau of Indian Standards (BIS) specifications.'}
          </p>
        </div>

        {/* Call to action */}
        <div className="text-center pt-4">
          <Link
            href="/marketplace"
            className="px-6 py-3 bg-emerald-600 hover:bg-emerald-500 rounded-xl text-white font-bold text-sm inline-flex items-center gap-2 shadow-lg shadow-emerald-950/50"
          >
            <span>{t('heroExploreBtn')}</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </div>
    </div>
  );
}
