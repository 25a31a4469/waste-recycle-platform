'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useApp } from '@/context/AppContext';
import { ResourceListing } from '@/types';
import { CircularFlowDiagram } from '@/components/CircularFlowDiagram';
import { ResourceCard } from '@/components/ResourceCard';
import { ResourceDetailModal } from '@/components/ResourceDetailModal';
import {
  Search,
  ArrowRight,
  TrendingUp,
  Leaf,
  ShieldCheck,
  Recycle,
  Factory,
  Store,
  Sparkles,
  CheckCircle2,
  HelpCircle,
  ChevronDown,
  Quote,
  Building2,
  FileCheck2,
  Layers,
} from 'lucide-react';

export default function HomePage() {
  const router = useRouter();
  const { t, language, listings } = useApp();
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedListing, setSelectedListing] = useState<ResourceListing | null>(null);
  const [activeFaq, setActiveFaq] = useState<number | null>(null);

  // Impact slider state
  const [sliderTons, setSliderTons] = useState(100);

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      router.push(`/marketplace?q=${encodeURIComponent(searchQuery)}`);
    } else {
      router.push('/marketplace');
    }
  };

  const featuredListings = listings.slice(0, 4);

  const industries = [
    {
      name: language === 'te' ? 'థర్మల్ విద్యుత్ కేంద్రాలు' : 'Thermal Power & Energy',
      desc: language === 'te' ? 'ఫ్లై యాష్, బాటమ్ యాష్ బదిలీ' : 'Bulk Fly Ash & Bottom Slag Offtake',
      icon: Factory,
      count: '1,400+ MT',
    },
    {
      name: language === 'te' ? 'స్టీల్ & ఫౌండ్రీలు' : 'Iron, Steel & Foundries',
      desc: language === 'te' ? 'GGBS స్లాగ్, మెటల్ టర్నింగ్స్' : 'Granulated Slag & High-grade Scrap',
      icon: Layers,
      count: '950+ MT',
    },
    {
      name: language === 'te' ? 'సిమెంట్ & నిర్మాణ పరిశ్రమ' : 'Green Cement & Concrete',
      desc: language === 'te' ? 'క్లింకర్ ప్రత్యామ్నాయాలు' : 'Pozzolanic Mineral Admixtures',
      icon: Building2,
      count: '820+ MT',
    },
    {
      name: language === 'te' ? 'ప్లాస్టిక్స్ & పాలిమర్ రీసైక్లింగ్' : 'Plastics & Polymers',
      desc: language === 'te' ? 'rPET, HDPE రీగ్రైండ్' : 'Clean Flakes, Pellets & Surplus Resin',
      icon: Recycle,
      count: '340+ MT',
    },
    {
      name: language === 'te' ? 'ఫార్మా & కెమికల్ సింథసిస్' : 'Pharma & Fine Chemicals',
      desc: language === 'te' ? 'రికవరీ ఎసిటోన్, ద్రావకాలు' : 'Distillation Recoverable Solvents',
      icon: FileCheck2,
      count: '120+ KL',
    },
    {
      name: language === 'te' ? 'టెక్స్‌టైల్స్ & స్పిన్నింగ్ మిల్లులు' : 'Textiles & Ginning Mills',
      desc: language === 'te' ? 'కాంబర్ నోయిల్, నూలు వ్యర్థాలు' : 'Pure Comber Noil & Fiber Waste',
      icon: Store,
      count: '180+ MT',
    },
  ];

  const sampleTestimonials = [
    {
      quote:
        language === 'te'
          ? 'సర్క్యువియా AI ద్వారా మా థర్మల్ ప్లాంట్ నుండి ప్రతి నెలా 800 టన్నుల ఫ్లై యాష్‌ను సమీపంలోని ఇటుక తయారీదారులకు విజయవంతంగా రవాణా చేస్తున్నాము. జీరో వేస్ట్ లక్ష్యం సాధ్యమైంది.'
          : 'CIRCUVIA AI helped our thermal facility divert over 800 MT of dry fly ash monthly to regional Fal-G brick clusters. Real-time CPCB manifest tracking eliminated compliance bottlenecks.',
      author: 'Rajeshwar Rao',
      role: 'General Manager (Operations)',
      company: 'NTPC Ramagundam Super Thermal Power',
      city: 'Ramagundam, Telangana',
    },
    {
      quote:
        language === 'te'
          ? 'మా చిన్న ఇటుకల తయారీ యూనిట్‌కు తక్కువ ధరలో నాణ్యమైన ఫ్లై యాష్ లభించింది. ఉత్పత్తి వ్యయం 35% తగ్గింది. సర్క్యువియా సేవలు అద్భుతం.'
          : 'As a small brick manufacturer, sourcing certified IS 3812 fly ash directly with transparent weighbridge rates reduced our input raw material cost by 35%.',
      author: 'P. Venkat Reddy',
      role: 'Managing Partner',
      company: 'Reddy Eco-Bricks & Pavers',
      city: 'Karimnagar, Telangana',
    },
    {
      quote:
        language === 'te'
          ? 'మా ప్లాస్టిక్ రీసైక్లింగ్ ప్లాంట్‌కు అవసరమైన ఫుడ్-గ్రేడ్ PET బాటిల్ వ్యర్థాలు సర్క్యువియా ద్వారా నిరంతరం సరఫరా అవుతున్నాయి.'
          : 'The platform’s chemical assay matching ensures our washing lines receive consistent post-consumer PET lots with verified PVC thresholds below 20 ppm.',
      author: 'K. Srinivasa Murthy',
      role: 'Managing Director',
      company: 'GreenCycle Polymers Pvt Ltd',
      city: 'Hyderabad, Telangana',
    },
  ];

  const faqs = [
    {
      q:
        language === 'te'
          ? 'సర్క్యువియాలో మెటీరియల్ నాణ్యతను ఎలా ధృవీకరిస్తారు?'
          : 'How are material quality and chemical compositions verified?',
      a:
        language === 'te'
          ? 'ప్రతి లిస్టింగ్‌లో NABL లేదా CPCB గుర్తింపు పొందిన ప్రయోగశాలల పరీక్ష పత్రాలు (COA/MTR) జతచేయబడతాయి. ల్యాబ్ నివేదిక ఉన్నవాటిని మాత్రమే "ల్యాబ్ పరీక్షిత సరుకు"గా గుర్తిస్తాము.'
          : 'Sellers upload authentic laboratory test certificates (MTR/TDS) from accredited NABL testing facilities. Listings are categorized with clear badges distinguishing lab-verified data from seller-provided self-reports.',
    },
    {
      q:
        language === 'te'
          ? 'చిన్న వ్యాపారాలు (MSMEలు) చిన్న పరిమాణాల్లో కొనుగోలు చేయవచ్చా?'
          : 'Can small businesses and artisans purchase smaller quantities (under 1 MT)?',
      a:
        language === 'te'
          ? 'ఖచ్చితంగా! మా మార్కెట్‌ప్లేస్‌లో MOQ (కనిష్ట ఆర్డర్ పరిమాణం) ఫిల్టర్ ద్వారా 500 కిలోలు లేదా 1 టన్ను లోపు విక్రయించే సరుకులను సులభంగా శోధించవచ్చు.'
          : 'Yes. CIRCUVIA AI is explicitly architected to support micro-enterprises and workshops. You can filter resources by low Minimum Order Quantity (MOQ), enabling small-lot purchases without wholesale penalties.',
    },
    {
      q:
        language === 'te'
          ? 'ప్రమాదకర వ్యర్థాలపై సర్క్యువియా నిబంధన ఏమిటి?'
          : 'What is the policy regarding hazardous industrial wastes?',
      a:
        language === 'te'
          ? 'భారతదేశ ప్రమాదకర వ్యర్థాల నిబంధనలు (Hazardous Waste Rules, 2016) ప్రకారం షెడ్యూల్ I కిందకు వచ్చే వ్యర్థాలకు స్టేట్ పొల్యూషన్ కంట్రోల్ బోర్డ్ అనుమతులు మరియు ఫారమ్ 6 ట్రాక్ తప్పనిసరి. విషపూరిత పదార్థాల నమోదు అనుమతించబడదు.'
          : 'All participants must adhere to Hazardous and Other Wastes Rules, 2016. Commercial exchange of Schedule I/II residues requires valid State Pollution Control Board authorizations. Direct listing of untreated toxic radioactive or hazardous biological wastes is strictly prohibited.',
    },
    {
      q:
        language === 'te'
          ? 'AI మ్యాచింగ్ ఎలా పనిచేస్తుంది?'
          : 'How does the AI Resource Matchmaker operate?',
      a:
        language === 'te'
          ? 'మా అల్గారిథమ్ రసాయన అనుకూలత, అవసరమైన పరిమాణం, రవాణా దూరం (కి.మీ.), మరియు ధృవీకరణ స్థాయిని విశ్లేషించి ఖచ్చితమైన మ్యాచ్ స్కోర్‌ను మరియు కారణాలను పారదర్శకంగా ప్రదర్శిస్తుంది.'
          : 'Our deterministic matching engine evaluates material technical compatibility, volume intake scales, geographic transit distances between Indian manufacturing hubs, and pricing alignment, providing transparent explainability bullet points for each suggested match.',
    },
  ];

  return (
    <div className="flex-1 flex flex-col">
      {/* 1. HERO SECTION */}
      <section className="relative pt-12 pb-20 md:pt-20 md:pb-28 bg-gradient-to-b from-forest-950 via-[#072a1e] to-forest-900 border-b border-emerald-900/40 text-white overflow-hidden">
        {/* Decorative Grid Lines */}
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#0d443215_1px,transparent_1px),linear-gradient(to_bottom,#0d443215_1px,transparent_1px)] bg-[size:4rem_4rem] pointer-events-none" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="text-center max-w-4xl mx-auto space-y-6">
            {/* Pill Badge */}
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-emerald-950/80 border border-emerald-500/40 text-emerald-300 text-xs font-bold tracking-wide shadow-lg shadow-emerald-950/50 backdrop-blur-md">
              <span className="w-2 h-2 rounded-full bg-lime-400 animate-ping" />
              <span>{t('heroBadge')}</span>
            </div>

            {/* Main Headline */}
            <h1 className="text-3xl sm:text-5xl lg:text-6xl font-black tracking-tight text-white leading-tight">
              {language === 'te' ? (
                <>
                  పారిశ్రామిక ఉప-ఉత్పత్తులను <br />
                  <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 via-teal-300 to-lime-400">
                    విలువైన ముడి సరుకులుగా
                  </span>{' '}
                  మార్చండి
                </>
              ) : (
                <>
                  Transform Industrial By-Products into{' '}
                  <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 via-teal-300 to-lime-400">
                    Valuable Feedstocks
                  </span>
                </>
              )}
            </h1>

            {/* Subtitle */}
            <p className="text-base sm:text-lg text-stone-300 max-w-2xl mx-auto leading-relaxed">
              {t('heroSubtitle')}
            </p>

            {/* Search Bar */}
            <form
              onSubmit={handleSearchSubmit}
              className="max-w-2xl mx-auto relative flex items-center p-1.5 sm:p-2 rounded-2xl bg-forest-900/90 border border-emerald-700/60 shadow-2xl backdrop-blur-md mt-6"
            >
              <Search className="w-5 h-5 text-emerald-400 ml-3 shrink-0" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder={t('heroSearchPlaceholder')}
                className="w-full px-3 py-2 bg-transparent text-sm text-white placeholder-stone-400 focus:outline-none"
              />
              <button
                type="submit"
                className="px-5 py-2.5 rounded-xl bg-gradient-to-r from-emerald-600 to-emerald-500 hover:from-emerald-500 hover:to-emerald-400 text-white font-bold text-xs sm:text-sm shrink-0 transition-all shadow-md shadow-emerald-950/50"
              >
                {language === 'te' ? 'వెతకండి' : 'Search'}
              </button>
            </form>

            {/* Action Buttons */}
            <div className="flex flex-wrap items-center justify-center gap-3 pt-3">
              <Link
                href="/marketplace"
                className="px-6 py-3 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-sm shadow-lg shadow-emerald-950/40 hover:-translate-y-0.5 transition-all flex items-center gap-2"
              >
                <span>{t('heroExploreBtn')}</span>
                <ArrowRight className="w-4 h-4" />
              </Link>
              <Link
                href="/list-resource"
                className="px-6 py-3 rounded-xl bg-forest-900/80 hover:bg-forest-800 border border-emerald-700/50 text-emerald-200 hover:text-white font-bold text-sm transition-all"
              >
                {t('heroListBtn')}
              </Link>
            </div>
          </div>

          {/* Platform Live Stats Grid */}
          <div className="mt-16 pt-10 border-t border-emerald-900/40">
            <div className="flex items-center justify-between mb-4">
              <span className="text-xs font-bold uppercase tracking-wider text-emerald-400 flex items-center gap-1.5">
                <TrendingUp className="w-4 h-4 text-lime-400" />
                {t('heroStatsTitle')}
              </span>
              <span className="text-[11px] text-stone-400">
                {t('demoDataNotice')}
              </span>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <div className="p-4 rounded-2xl bg-forest-900/50 border border-emerald-900/40 text-center">
                <div className="text-2xl sm:text-3xl font-black text-white">28,450 MT</div>
                <div className="text-xs text-stone-400 mt-1">{t('statDiverted')}</div>
              </div>
              <div className="p-4 rounded-2xl bg-forest-900/50 border border-emerald-900/40 text-center">
                <div className="text-2xl sm:text-3xl font-black text-emerald-400">34,120 MT</div>
                <div className="text-xs text-stone-400 mt-1">{t('statEmissions')}</div>
              </div>
              <div className="p-4 rounded-2xl bg-forest-900/50 border border-emerald-900/40 text-center">
                <div className="text-2xl sm:text-3xl font-black text-lime-400">1,280+</div>
                <div className="text-xs text-stone-400 mt-1">{t('statExchanges')}</div>
              </div>
              <div className="p-4 rounded-2xl bg-forest-900/50 border border-emerald-900/40 text-center">
                <div className="text-2xl sm:text-3xl font-black text-teal-300">₹14.8 Cr</div>
                <div className="text-xs text-stone-400 mt-1">{t('statSavings')}</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 2. CIRCULAR FLOW DIAGRAM */}
      <CircularFlowDiagram />

      {/* 3. HOW IT WORKS IN 3 STEPS */}
      <section className="py-16 bg-forest-900/40 text-white border-b border-emerald-900/40">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-12 space-y-2">
            <span className="text-xs font-bold uppercase tracking-wider text-lime-400">
              {language === 'te' ? 'సరళమైన 3 దశల ప్రక్రియ' : 'Seamless 3-Step Exchange'}
            </span>
            <h2 className="text-2xl sm:text-3xl font-black text-white">
              {language === 'te' ? 'సర్క్యువియా ఎలా పనిచేస్తుంది' : 'How CIRCUVIA Works'}
            </h2>
            <p className="text-xs sm:text-sm text-stone-300">
              {language === 'te'
                ? 'వ్యాపారాలు తమ వ్యర్థాలను సులభంగా లిస్ట్ చేయవచ్చు మరియు అవసరమైన ముడి పదార్థాలను వెంటనే ఆర్డర్ చేయవచ్చు.'
                : 'Connect industrial by-product streams directly to verified downstream buyers with complete regulatory compliance.'}
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="p-6 rounded-2xl bg-forest-950 border border-emerald-800/40 space-y-3 relative">
              <div className="w-10 h-10 rounded-xl bg-emerald-900/60 border border-emerald-500/40 flex items-center justify-center font-black text-emerald-300 text-lg">
                1
              </div>
              <h3 className="font-bold text-base text-stone-100">
                {language === 'te' ? 'వనరును జాబితా చేయండి' : 'List Residue or Post RFQ'}
              </h3>
              <p className="text-xs text-stone-300 leading-relaxed">
                {language === 'te'
                  ? 'మీ పరిశ్రమలో ఉత్పత్తి అయ్యే స్లాగ్, బూడిద లేదా రసాయనాలను వివరాలు, నాణ్యతా పరీక్ష నివేదికలతో నమోదు చేయండి.'
                  : 'Specify physical form, chemistry, available bulk or lot quantity, location, and attach third-party laboratory assay certificates.'}
              </p>
            </div>

            <div className="p-6 rounded-2xl bg-forest-950 border border-emerald-800/40 space-y-3 relative">
              <div className="w-10 h-10 rounded-xl bg-emerald-900/60 border border-emerald-500/40 flex items-center justify-center font-black text-emerald-300 text-lg">
                2
              </div>
              <h3 className="font-bold text-base text-stone-100">
                {language === 'te' ? 'AI మ్యాచింగ్ & కొటేషన్లు' : 'AI Matching & Negotiation'}
              </h3>
              <p className="text-xs text-stone-300 leading-relaxed">
                {language === 'te'
                  ? 'సర్క్యువియా అల్గారిథమ్ రవాణా దూరం మరియు రసాయన సరిపోలిక ఆధారంగా ఖచ్చితమైన కొనుగోలుదారులను సిఫార్సు చేస్తుంది.'
                  : 'Algorithms match technical tolerances and regional logistics proximity. Issue quotations, counter-offers, and reserve lots transparently.'}
              </p>
            </div>

            <div className="p-6 rounded-2xl bg-forest-950 border border-emerald-800/40 space-y-3 relative">
              <div className="w-10 h-10 rounded-xl bg-emerald-900/60 border border-emerald-500/40 flex items-center justify-center font-black text-emerald-300 text-lg">
                3
              </div>
              <h3 className="font-bold text-base text-stone-100">
                {language === 'te' ? 'డెలివరీ & కార్బన్ ఆదా సర్టిఫికెట్' : 'Dispatch & ESG Carbon Credits'}
              </h3>
              <p className="text-xs text-stone-300 leading-relaxed">
                {language === 'te'
                  ? 'డిజిటల్ వేబిల్ ద్వారా సురక్షిత రవాణా మరియు CPCB నిబంధనల ప్రకారం లెక్కింపబడిన కార్బన్ క్రెడిట్ ధృవీకరణ పొందండి.'
                  : 'Fulfill dispatches with digital weighbridge receipts, automated CPCB manifest tracking, and verified Scope 3 CO₂e reduction certificates.'}
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* 4. FEATURED RESOURCES CAROUSEL / GRID */}
      <section className="py-16 bg-forest-950 text-white border-b border-emerald-900/40">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-8">
            <div>
              <span className="text-xs font-bold uppercase tracking-wider text-emerald-400">
                {language === 'te' ? 'ప్రముఖ వనరులు' : 'Marketplace Spotlight'}
              </span>
              <h2 className="text-2xl sm:text-3xl font-black text-white mt-1">
                {language === 'te' ? 'అందుబాటులో ఉన్న తాజా ముడి సరుకులు' : 'High-Demand Industrial Feedstocks'}
              </h2>
            </div>
            <Link
              href="/marketplace"
              className="text-xs font-bold text-emerald-300 hover:text-white flex items-center gap-1 group"
            >
              <span>{t('heroExploreBtn')}</span>
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </Link>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {featuredListings.map((listing) => (
              <ResourceCard
                key={listing.id}
                listing={listing}
                onSelect={(item) => setSelectedListing(item)}
              />
            ))}
          </div>
        </div>
      </section>

      {/* 5. AI MATCHMAKING PREVIEW */}
      <section className="py-16 bg-gradient-to-r from-forest-900 via-emerald-950 to-forest-900 text-white border-b border-emerald-900/40">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 items-center">
            <div className="space-y-4">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-forest-950 border border-emerald-500/40 text-xs font-bold text-lime-400">
                <Sparkles className="w-3.5 h-3.5" />
                <span>{t('aiMatchTitle')}</span>
              </div>
              <h2 className="text-2xl sm:text-3xl font-black text-white leading-tight">
                {language === 'te'
                  ? 'కృత్రిమ మేధస్సుతో ఖచ్చితమైన వనరుల అనుసంధానం'
                  : 'Deterministic, Explainable AI Resource Matching'}
              </h2>
              <p className="text-xs sm:text-sm text-stone-300 leading-relaxed">
                {t('aiMatchSubtitle')}
              </p>

              <div className="space-y-2 pt-2 text-xs">
                <div className="flex items-center gap-2 text-emerald-300">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                  <span>{t('aiMatchCategoryFit')}</span>
                </div>
                <div className="flex items-center gap-2 text-emerald-300">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                  <span>{t('aiMatchDistanceFit')}</span>
                </div>
                <div className="flex items-center gap-2 text-emerald-300">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                  <span>{t('aiMatchQuantityFit')}</span>
                </div>
              </div>

              <div className="pt-4">
                <Link
                  href="/matchmaker"
                  className="px-6 py-3 rounded-xl bg-gradient-to-r from-emerald-600 to-emerald-500 hover:from-emerald-500 text-white font-bold text-xs sm:text-sm shadow-xl inline-flex items-center gap-2 transition-all"
                >
                  <span>{t('aiRunMatchBtn')}</span>
                  <ArrowRight className="w-4 h-4" />
                </Link>
              </div>
            </div>

            {/* Match Preview Card Graphic */}
            <div className="p-6 rounded-3xl bg-forest-950/90 border border-emerald-700/50 shadow-2xl space-y-4">
              <div className="flex items-center justify-between pb-3 border-b border-emerald-900/60">
                <div className="flex items-center gap-2">
                  <div className="w-8 h-8 rounded-xl bg-emerald-700/50 border border-emerald-400/40 flex items-center justify-center text-lime-400 font-black text-xs">
                    96%
                  </div>
                  <div>
                    <span className="font-bold text-xs text-white">Live AI Match Recommendation</span>
                    <span className="text-[10px] text-emerald-400 block">Direct Symbiosis Route</span>
                  </div>
                </div>
                <span className="text-xs font-mono text-lime-400 bg-forest-900 px-2 py-0.5 rounded border border-emerald-800/40">
                  Top Proximity Fit
                </span>
              </div>

              <div className="space-y-2 text-xs">
                <div className="p-3 bg-forest-900/60 rounded-xl border border-emerald-900/50 flex justify-between items-center">
                  <div>
                    <span className="text-stone-400 block text-[10px]">Generator Facility:</span>
                    <span className="font-bold text-stone-100">NTPC Ramagundam (Fly Ash Grade F)</span>
                  </div>
                  <span className="text-emerald-400 font-bold">650 MT Available</span>
                </div>

                <div className="p-3 bg-forest-900/60 rounded-xl border border-emerald-900/50 flex justify-between items-center">
                  <div>
                    <span className="text-stone-400 block text-[10px]">Consumer Plant:</span>
                    <span className="font-bold text-stone-100">Reddy Eco-Bricks (Karimnagar)</span>
                  </div>
                  <span className="text-lime-400 font-bold">65 km Distance</span>
                </div>
              </div>

              {/* Explainable reasons */}
              <div className="p-3 rounded-xl bg-emerald-950/40 border border-emerald-800/40 space-y-1 text-[11px] text-stone-300">
                <div className="font-bold text-emerald-300 mb-1">
                  {language === 'te' ? 'AI కారణాల విశ్లేషణ' : 'Key Algorithmic Rationale'}:
                </div>
                <div>• Local Cluster: 65 km distance saves ~84% transport emissions vs interstate cement clinker.</div>
                <div>• Technical: SiO₂ + Al₂O₃ {'>'} 70% meets IS 3812 compressive strength standards.</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 6. INDUSTRIES SERVED */}
      <section className="py-16 bg-forest-950 text-white border-b border-emerald-900/40">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-12 space-y-2">
            <span className="text-xs font-bold uppercase tracking-wider text-emerald-400">
              {language === 'te' ? 'పరిశ్రమల నెట్‌వర్క్' : 'Sectors in Circulation'}
            </span>
            <h2 className="text-2xl sm:text-3xl font-black text-white">
              {language === 'te' ? 'మేము సేవలందించే పరిశ్రమలు' : 'Key Industries Served Across India'}
            </h2>
            <p className="text-xs sm:text-sm text-stone-300">
              {language === 'te'
                ? 'భారీ ఫ్యాక్టరీల నుండి చిన్న కుటీర పరిశ్రమల వరకు విస్తృతమైన నెట్‌వర్క్.'
                : 'Facilitating cross-sector resource symbiosis across power, metals, chemicals, textiles, and green construction.'}
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {industries.map((ind, i) => {
              const Icon = ind.icon;
              return (
                <div
                  key={i}
                  className="p-5 rounded-2xl bg-forest-900/40 border border-emerald-900/40 hover:border-emerald-600/50 hover:bg-forest-900/80 transition-all flex items-start gap-4"
                >
                  <div className="p-3 rounded-xl bg-emerald-950 border border-emerald-600/30 text-emerald-400 shrink-0">
                    <Icon className="w-5 h-5" />
                  </div>
                  <div>
                    <h3 className="font-bold text-sm text-stone-100">{ind.name}</h3>
                    <p className="text-xs text-stone-400 mt-0.5">{ind.desc}</p>
                    <span className="inline-block mt-2 text-[10px] font-bold text-lime-400 bg-forest-950 px-2 py-0.5 rounded border border-emerald-900/60">
                      {ind.count} Active Exchange
                    </span>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* 7. SUSTAINABILITY IMPACT CALCULATOR PREVIEW */}
      <section className="py-16 bg-forest-900/30 text-white border-b border-emerald-900/40">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="p-8 rounded-3xl bg-gradient-to-br from-forest-950 to-emerald-950 border border-emerald-700/50 shadow-2xl">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
              <div className="space-y-4">
                <span className="text-xs font-bold uppercase tracking-wider text-lime-400 flex items-center gap-1.5">
                  <Leaf className="w-4 h-4" />
                  {t('sustainabilityTitle')}
                </span>
                <h2 className="text-2xl sm:text-3xl font-black text-white">
                  {language === 'te'
                    ? 'మీ పారిశ్రామిక ప్రభావ గణన (ESG Calculator)'
                    : 'Interactive ESG Carbon & Diversion Calculator'}
                </h2>
                <p className="text-xs sm:text-sm text-stone-300 leading-relaxed">
                  {language === 'te'
                    ? 'మీరు పునర్వినియోగం చేసే మెటీరియల్ పరిమాణాన్ని (టన్నుల్లో) ఎంచుకుని, ఆదా అయ్యే కార్బన్ మరియు పర్యావరణ ప్రయోజనాలను తక్షణమే చూడండి.'
                    : 'Slide the resource volume to simulate environmental savings for your facility based on Central Pollution Control Board (CPCB) benchmarks.'}
                </p>

                {/* Slider */}
                <div className="space-y-2 pt-2">
                  <div className="flex justify-between text-xs font-bold">
                    <span className="text-stone-300">
                      {language === 'te' ? 'పునర్వినియోగ పరిమాణం' : 'Material Diverted'}:
                    </span>
                    <span className="text-emerald-300 text-sm">{sliderTons} Metric Tons</span>
                  </div>
                  <input
                    type="range"
                    min="10"
                    max="1000"
                    step="10"
                    value={sliderTons}
                    onChange={(e) => setSliderTons(Number(e.target.value))}
                    className="w-full accent-emerald-500 bg-forest-900 h-2 rounded-lg cursor-pointer"
                  />
                  <div className="flex justify-between text-[10px] text-stone-400">
                    <span>10 MT (MSME Batch)</span>
                    <span>500 MT</span>
                    <span>1,000 MT (Heavy Enterprise)</span>
                  </div>
                </div>
              </div>

              {/* Calculated Outputs */}
              <div className="grid grid-cols-2 gap-4">
                <div className="p-5 rounded-2xl bg-forest-950 border border-emerald-800/60 text-center">
                  <div className="text-3xl font-black text-emerald-400">
                    {Math.round(sliderTons * 1.18).toLocaleString('en-IN')} MT
                  </div>
                  <div className="text-xs text-stone-300 mt-1 font-semibold">
                    {t('co2Total')}
                  </div>
                  <div className="text-[10px] text-stone-400 mt-0.5">~1.18 MT CO₂e / Ton Diverted</div>
                </div>

                <div className="p-5 rounded-2xl bg-forest-950 border border-emerald-800/60 text-center">
                  <div className="text-3xl font-black text-lime-400">
                    {(sliderTons * 1000).toLocaleString('en-IN')} kg
                  </div>
                  <div className="text-xs text-stone-300 mt-1 font-semibold">
                    {t('divertedTotal')}
                  </div>
                  <div className="text-[10px] text-stone-400 mt-0.5">100% Landfill Diversion</div>
                </div>

                <div className="p-5 rounded-2xl bg-forest-950 border border-emerald-800/60 text-center">
                  <div className="text-3xl font-black text-teal-300">
                    {Math.round(sliderTons * 420).toLocaleString('en-IN')} KL
                  </div>
                  <div className="text-xs text-stone-300 mt-1 font-semibold">
                    {t('waterTotal')}
                  </div>
                  <div className="text-[10px] text-stone-400 mt-0.5">Primary Processing Conserved</div>
                </div>

                <div className="p-5 rounded-2xl bg-forest-950 border border-emerald-800/60 text-center">
                  <div className="text-3xl font-black text-amber-300">
                    ₹{(sliderTons * 1250).toLocaleString('en-IN')}
                  </div>
                  <div className="text-xs text-stone-300 mt-1 font-semibold">
                    {language === 'te' ? 'అంచనా వ్యయ ఆదా' : 'Net Cost Savings'}
                  </div>
                  <div className="text-[10px] text-stone-400 mt-0.5">Compared to Virgin Material</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 8. SAMPLE TESTIMONIALS */}
      <section className="py-16 bg-forest-950 text-white border-b border-emerald-900/40">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-10 space-y-2">
            <span className="text-[11px] font-bold uppercase tracking-wider text-lime-400 bg-forest-900 px-3 py-1 rounded-full border border-emerald-800/40">
              Sample Content for Platform Demonstration
            </span>
            <h2 className="text-2xl sm:text-3xl font-black text-white mt-2">
              {language === 'te' ? 'వినియోగదారుల అనుభవాలు' : 'What Facilities & Recyclers Say'}
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {sampleTestimonials.map((tItem, i) => (
              <div
                key={i}
                className="p-6 rounded-2xl bg-forest-900/40 border border-emerald-900/40 flex flex-col justify-between space-y-4"
              >
                <div className="space-y-3">
                  <Quote className="w-6 h-6 text-emerald-500 opacity-60" />
                  <p className="text-xs sm:text-sm text-stone-300 italic leading-relaxed">
                    "{tItem.quote}"
                  </p>
                </div>
                <div className="pt-3 border-t border-emerald-950">
                  <div className="font-bold text-sm text-white">{tItem.author}</div>
                  <div className="text-xs text-emerald-400">{tItem.role}</div>
                  <div className="text-[11px] text-stone-400">{tItem.company}</div>
                  <div className="text-[10px] text-stone-400 mt-0.5">{tItem.city}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 9. FAQ ACCORDION */}
      <section className="py-16 bg-forest-900/30 text-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-10 space-y-2">
            <span className="text-xs font-bold uppercase tracking-wider text-emerald-400">
              {language === 'te' ? 'సందేహాలు & సమాధానాలు' : 'Questions & Support'}
            </span>
            <h2 className="text-2xl sm:text-3xl font-black text-white">
              {language === 'te' ? 'తరచుగా అడిగే ప్రశ్నలు (FAQ)' : 'Frequently Asked Questions'}
            </h2>
          </div>

          <div className="space-y-3">
            {faqs.map((faq, idx) => {
              const isOpen = activeFaq === idx;
              return (
                <div
                  key={idx}
                  className="rounded-2xl bg-forest-950 border border-emerald-900/50 overflow-hidden"
                >
                  <button
                    type="button"
                    onClick={() => setActiveFaq(isOpen ? null : idx)}
                    className="w-full p-4 sm:p-5 flex items-center justify-between gap-4 text-left transition-colors hover:bg-forest-900/40"
                  >
                    <span className="font-bold text-sm sm:text-base text-stone-100">{faq.q}</span>
                    <ChevronDown
                      className={`w-5 h-5 text-emerald-400 shrink-0 transition-transform ${
                        isOpen ? 'rotate-180' : ''
                      }`}
                    />
                  </button>
                  {isOpen && (
                    <div className="p-4 sm:p-5 pt-0 text-xs sm:text-sm text-stone-300 leading-relaxed border-t border-emerald-950/80 bg-forest-900/20">
                      {faq.a}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Resource Detail Modal */}
      {selectedListing && (
        <ResourceDetailModal
          listing={selectedListing}
          onClose={() => setSelectedListing(null)}
        />
      )}
    </div>
  );
}
