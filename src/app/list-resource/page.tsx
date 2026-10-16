'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useApp } from '@/context/AppContext';
import {
  MaterialCategory,
  ResourceType,
  MaterialGrade,
  MaterialCondition,
  ResourceListing,
} from '@/types';
import {
  PlusCircle,
  ArrowRight,
  ArrowLeft,
  CheckCircle2,
  UploadCloud,
  FileText,
  ShieldCheck,
  Eye,
  Bookmark,
  Layers,
  MapPin,
  Sparkles,
} from 'lucide-react';
import confetti from 'canvas-confetti';

const INDIAN_STATES = [
  'Telangana',
  'Andhra Pradesh',
  'Maharashtra',
  'Tamil Nadu',
  'Karnataka',
  'Gujarat',
  'Delhi NCR',
  'Rajasthan',
  'West Bengal',
  'Odisha',
];

const SAMPLE_PHOTO_PRESETS = [
  'https://images.unsplash.com/photo-1578575437130-527eed3abbec?auto=format&fit=crop&w=800&q=80',
  'https://images.unsplash.com/photo-1530587191325-3db32d826c18?auto=format&fit=crop&w=800&q=80',
  'https://images.unsplash.com/photo-1594938298603-c8148c4dae35?auto=format&fit=crop&w=800&q=80',
  'https://images.unsplash.com/photo-1563986768609-322da13575f3?auto=format&fit=crop&w=800&q=80',
  'https://images.unsplash.com/photo-1584308666744-24d5c474f2ae?auto=format&fit=crop&w=800&q=80',
];

export default function ListResourcePage() {
  const router = useRouter();
  const { t, language, currentUser, addListing, addToast } = useApp();
  const [step, setStep] = useState(1);

  // Form Fields
  const [category, setCategory] = useState<MaterialCategory>('INDUSTRIAL_SLAG_ASH');
  const [resourceType, setResourceType] = useState<ResourceType>('BY_PRODUCT');
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');

  const [quantity, setQuantity] = useState<number>(100);
  const [unit, setUnit] = useState<string>('MT');
  const [pricePerUnit, setPricePerUnit] = useState<number>(850);
  const [isNegotiable, setIsNegotiable] = useState(true);
  const [minOrderQuantity, setMinOrderQuantity] = useState<number>(10);

  const [grade, setGrade] = useState<MaterialGrade>('GRADE_A');
  const [condition, setCondition] = useState<MaterialCondition>('CLEAN_PROCESSED');
  const [chemicalComposition, setChemicalComposition] = useState('');

  const [locationCity, setLocationCity] = useState(currentUser.city || 'Hyderabad');
  const [locationState, setLocationState] = useState(currentUser.state || 'Telangana');
  const [pickupAvailable, setPickupAvailable] = useState(true);
  const [deliveryAvailable, setDeliveryAvailable] = useState(true);
  const [hasLabTestReport, setHasLabTestReport] = useState(true);
  const [selectedImage, setSelectedImage] = useState(SAMPLE_PHOTO_PRESETS[0]);

  // Validation
  const isStep1Valid = title.trim().length >= 5 && description.trim().length >= 10;
  const isStep2Valid = quantity > 0 && pricePerUnit > 0 && minOrderQuantity > 0;

  const handleNext = () => {
    if (step === 1 && !isStep1Valid) {
      addToast(
        language === 'te'
          ? 'దయచేసి వస్తువు శీర్షిక మరియు వివరణను సరిగ్గా నమోదు చేయండి'
          : 'Please enter a valid title and descriptive summary',
        'error'
      );
      return;
    }
    if (step === 2 && !isStep2Valid) {
      addToast(
        language === 'te' ? 'పరిమాణం మరియు ధర వివరాలను నమోదు చేయండి' : 'Please provide positive quantity and pricing values',
        'error'
      );
      return;
    }
    setStep((prev) => Math.min(prev + 1, 5));
  };

  const handlePublish = () => {
    addListing({
      title,
      description,
      category,
      resourceType,
      grade,
      condition,
      quantity,
      unit,
      pricePerUnit,
      isNegotiable,
      minOrderQuantity,
      locationCity,
      locationState,
      pickupAvailable,
      deliveryAvailable,
      chemicalComposition: chemicalComposition || 'Standard certified assay.',
      hasLabTestReport,
      isVerifiedSeller: currentUser.verificationStatus === 'VERIFIED',
      isVerifiedMaterial: hasLabTestReport,
      images: [selectedImage],
      sellerId: currentUser.id,
      sellerName: currentUser.companyName,
      sellerRole: currentUser.role,
      status: 'ACTIVE',
    });

    try {
      confetti({ particleCount: 80, spread: 80, origin: { y: 0.5 } });
    } catch (_) {}

    router.push('/marketplace');
  };

  const handleSaveDraft = () => {
    addToast(language === 'te' ? 'చిత్తుప్రతిగా భద్రపరచబడింది' : 'Listing draft saved to your account', 'info');
  };

  return (
    <div className="flex-1 bg-[#06241a] text-stone-100 min-h-screen py-10">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        {/* Wizard Header */}
        <div className="space-y-2 text-center max-w-2xl mx-auto">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-950 border border-emerald-500/40 text-xs font-bold text-emerald-300">
            <PlusCircle className="w-3.5 h-3.5 text-lime-400" />
            <span>{language === 'te' ? 'వనరుల నమోదు ప్రక్రియ' : 'Resource Listing Wizard'}</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-black text-white tracking-tight">
            {t('wizardTitle')}
          </h1>
          <p className="text-xs sm:text-sm text-stone-300">
            {language === 'te'
              ? 'మీ పారిశ్రామిక ఉప-ఉత్పత్తులు లేదా ద్వితీయ ముడి పదార్థాలను నెట్‌వర్క్‌లో చేర్చి ధృవీకృత కొనుగోలుదారులను ఆకర్షించండి.'
              : 'Index by-products, virgin surpluses, or recycled feedstocks into the AI Circular network with certified credentials.'}
          </p>
        </div>

        {/* Progress Bar (5 Steps) */}
        <div className="p-4 bg-forest-950/80 rounded-2xl border border-emerald-900/50">
          <div className="flex items-center justify-between text-[11px] font-bold text-stone-300 mb-2">
            <span className={step >= 1 ? 'text-emerald-400' : 'text-stone-500'}>1. Basic</span>
            <span className={step >= 2 ? 'text-emerald-400' : 'text-stone-500'}>2. Commercials</span>
            <span className={step >= 3 ? 'text-emerald-400' : 'text-stone-500'}>3. Quality</span>
            <span className={step >= 4 ? 'text-emerald-400' : 'text-stone-500'}>4. Logistics</span>
            <span className={step >= 5 ? 'text-lime-400 font-black' : 'text-stone-500'}>5. Publish</span>
          </div>
          <div className="w-full bg-forest-900 h-2 rounded-full overflow-hidden">
            <div
              className="bg-gradient-to-r from-emerald-500 to-lime-400 h-full transition-all duration-300"
              style={{ width: `${(step / 5) * 100}%` }}
            />
          </div>
        </div>

        {/* Wizard Form Card */}
        <div className="p-6 sm:p-8 bg-forest-950 rounded-3xl border border-emerald-800/50 shadow-2xl space-y-6">
          {/* STEP 1: Basic Info & Category */}
          {step === 1 && (
            <div className="space-y-4 animate-fadeIn">
              <h2 className="text-lg font-bold text-emerald-200 border-b border-emerald-900/60 pb-2">
                {t('wizardStep1')}
              </h2>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-stone-300 mb-1">
                    {t('fieldCategory')} *
                  </label>
                  <select
                    value={category}
                    onChange={(e) => setCategory(e.target.value as MaterialCategory)}
                    className="w-full px-3 py-2 bg-forest-900 border border-emerald-800/40 rounded-xl text-xs text-white focus:outline-none"
                  >
                    <option value="INDUSTRIAL_SLAG_ASH">{t('cat_INDUSTRIAL_SLAG_ASH')}</option>
                    <option value="PLASTICS">{t('cat_PLASTICS')}</option>
                    <option value="METALS">{t('cat_METALS')}</option>
                    <option value="TEXTILES">{t('cat_TEXTILES')}</option>
                    <option value="CHEMICALS_SOLVENTS">{t('cat_CHEMICALS_SOLVENTS')}</option>
                    <option value="PAPER_CARDBOARD">{t('cat_PAPER_CARDBOARD')}</option>
                    <option value="RUBBER">{t('cat_RUBBER')}</option>
                    <option value="AGRO_WASTE">{t('cat_AGRO_WASTE')}</option>
                    <option value="GLASS">{t('cat_GLASS')}</option>
                    <option value="ELECTRONICS_EWALL">{t('cat_ELECTRONICS_EWALL')}</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-stone-300 mb-1">
                    {t('fieldType')} *
                  </label>
                  <select
                    value={resourceType}
                    onChange={(e) => setResourceType(e.target.value as ResourceType)}
                    className="w-full px-3 py-2 bg-forest-900 border border-emerald-800/40 rounded-xl text-xs text-white focus:outline-none"
                  >
                    <option value="BY_PRODUCT">{t('type_BY_PRODUCT')}</option>
                    <option value="RECYCLED_FEEDSTOCK">{t('type_RECYCLED_FEEDSTOCK')}</option>
                    <option value="SURPLUS">{t('type_SURPLUS')}</option>
                    <option value="WASTE">{t('type_WASTE')}</option>
                    <option value="VIRGIN_RAW">{t('type_VIRGIN_RAW')}</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-stone-300 mb-1">
                  {t('fieldTitle')} *
                </label>
                <input
                  type="text"
                  required
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  placeholder={t('fieldTitlePlaceholder')}
                  className="w-full px-3 py-2.5 bg-forest-900 border border-emerald-800/40 rounded-xl text-sm text-white placeholder-stone-500 focus:outline-none focus:border-emerald-500"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-stone-300 mb-1">
                  {t('fieldDescription')} *
                </label>
                <textarea
                  rows={4}
                  required
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  placeholder={t('fieldDescPlaceholder')}
                  className="w-full px-3 py-2 bg-forest-900 border border-emerald-800/40 rounded-xl text-xs text-white placeholder-stone-500 focus:outline-none focus:border-emerald-500"
                />
              </div>

              {/* Photo Preset Selector */}
              <div>
                <label className="block text-xs font-semibold text-stone-300 mb-1.5">
                  {language === 'te' ? 'చిత్రం ఎంపిక (ఫోటో)' : 'Listing Representative Photo'}
                </label>
                <div className="flex gap-3 overflow-x-auto pb-2">
                  {SAMPLE_PHOTO_PRESETS.map((p, i) => (
                    <button
                      key={i}
                      type="button"
                      onClick={() => setSelectedImage(p)}
                      className={`relative w-24 h-16 rounded-xl overflow-hidden border-2 transition-all shrink-0 ${
                        selectedImage === p ? 'border-emerald-400 scale-105' : 'border-emerald-900/60 opacity-60'
                      }`}
                    >
                      <img src={p} alt="preset" className="w-full h-full object-cover" />
                    </button>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* STEP 2: Pricing & Quantities */}
          {step === 2 && (
            <div className="space-y-4 animate-fadeIn">
              <h2 className="text-lg font-bold text-emerald-200 border-b border-emerald-900/60 pb-2">
                {t('wizardStep2')}
              </h2>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-stone-300 mb-1">
                    {t('fieldQuantity')} *
                  </label>
                  <input
                    type="number"
                    min="1"
                    required
                    value={quantity}
                    onChange={(e) => setQuantity(Number(e.target.value))}
                    className="w-full px-3 py-2 bg-forest-900 border border-emerald-800/40 rounded-xl text-xs text-white"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-stone-300 mb-1">
                    {t('fieldUnit')} *
                  </label>
                  <select
                    value={unit}
                    onChange={(e) => setUnit(e.target.value)}
                    className="w-full px-3 py-2 bg-forest-900 border border-emerald-800/40 rounded-xl text-xs text-white"
                  >
                    <option value="MT">Metric Tons (MT)</option>
                    <option value="kg">Kilograms (kg)</option>
                    <option value="Liters">Liters (L)</option>
                    <option value="Drums">Drums (200 L)</option>
                    <option value="Pieces">Pieces / Units</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-stone-300 mb-1">
                    {t('fieldPrice')} *
                  </label>
                  <input
                    type="number"
                    min="0"
                    required
                    value={pricePerUnit}
                    onChange={(e) => setPricePerUnit(Number(e.target.value))}
                    className="w-full px-3 py-2 bg-forest-900 border border-emerald-800/40 rounded-xl text-xs text-white"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-stone-300 mb-1">
                    {t('fieldMoq')} *
                  </label>
                  <input
                    type="number"
                    min="1"
                    max={quantity}
                    required
                    value={minOrderQuantity}
                    onChange={(e) => setMinOrderQuantity(Number(e.target.value))}
                    className="w-full px-3 py-2 bg-forest-900 border border-emerald-800/40 rounded-xl text-xs text-white"
                  />
                  <span className="text-[10px] text-stone-400">
                    {language === 'te' ? 'చిన్న ఆర్డర్ల కోసం తక్కువ MOQ ఉంచండి.' : 'Keep low for small business accessibility.'}
                  </span>
                </div>
              </div>

              <div className="pt-2">
                <label className="flex items-center gap-2 cursor-pointer text-xs text-stone-200">
                  <input
                    type="checkbox"
                    checked={isNegotiable}
                    onChange={(e) => setIsNegotiable(e.target.checked)}
                    className="rounded accent-emerald-500"
                  />
                  <span>{t('fieldNegotiable')}</span>
                </label>
              </div>
            </div>
          )}

          {/* STEP 3: Composition & Quality */}
          {step === 3 && (
            <div className="space-y-4 animate-fadeIn">
              <h2 className="text-lg font-bold text-emerald-200 border-b border-emerald-900/60 pb-2">
                {t('wizardStep3')}
              </h2>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-stone-300 mb-1">
                    {t('fieldGrade')}
                  </label>
                  <select
                    value={grade}
                    onChange={(e) => setGrade(e.target.value as MaterialGrade)}
                    className="w-full px-3 py-2 bg-forest-900 border border-emerald-800/40 rounded-xl text-xs text-white"
                  >
                    <option value="GRADE_A">Grade A (High Purity / Premium)</option>
                    <option value="GRADE_B">Grade B (Standard Commercial)</option>
                    <option value="GRADE_C">Grade C (Mixed Feedstock)</option>
                    <option value="OFF_SPEC">Off-Spec Production Residue</option>
                    <option value="VIRGIN">Virgin Factory Surplus</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-stone-300 mb-1">
                    {t('fieldCondition')}
                  </label>
                  <select
                    value={condition}
                    onChange={(e) => setCondition(e.target.value as MaterialCondition)}
                    className="w-full px-3 py-2 bg-forest-900 border border-emerald-800/40 rounded-xl text-xs text-white"
                  >
                    <option value="CLEAN_PROCESSED">{t('cond_CLEAN_PROCESSED')}</option>
                    <option value="PELLETIZED">{t('cond_PELLETIZED')}</option>
                    <option value="BALED">{t('cond_BALED')}</option>
                    <option value="SHREDDED">{t('cond_SHREDDED')}</option>
                    <option value="LIQUID_DRUMMED">{t('cond_LIQUID_DRUMMED')}</option>
                    <option value="RAW_UNSORTED">{t('cond_RAW_UNSORTED')}</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-stone-300 mb-1">
                  {t('fieldChemical')}
                </label>
                <input
                  type="text"
                  value={chemicalComposition}
                  onChange={(e) => setChemicalComposition(e.target.value)}
                  placeholder={t('fieldChemicalPlaceholder')}
                  className="w-full px-3 py-2 bg-forest-900 border border-emerald-800/40 rounded-xl text-xs text-white"
                />
              </div>

              <div className="p-3 bg-forest-900/50 rounded-xl border border-emerald-900/50 text-[11px] text-stone-400">
                Detailed chemical assays allow the CIRCUVIA AI Matchmaker to automatically discover downstream plants whose process tolerances match your residue.
              </div>
            </div>
          )}

          {/* STEP 4: Logistics & Verification Documents */}
          {step === 4 && (
            <div className="space-y-4 animate-fadeIn">
              <h2 className="text-lg font-bold text-emerald-200 border-b border-emerald-900/60 pb-2">
                {t('wizardStep4')}
              </h2>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-stone-300 mb-1">
                    {t('fieldCity')} *
                  </label>
                  <input
                    type="text"
                    required
                    value={locationCity}
                    onChange={(e) => setLocationCity(e.target.value)}
                    placeholder="e.g. Ramagundam, Visakhapatnam..."
                    className="w-full px-3 py-2 bg-forest-900 border border-emerald-800/40 rounded-xl text-xs text-white"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-stone-300 mb-1">
                    {t('fieldState')} *
                  </label>
                  <select
                    value={locationState}
                    onChange={(e) => setLocationState(e.target.value)}
                    className="w-full px-3 py-2 bg-forest-900 border border-emerald-800/40 rounded-xl text-xs text-white"
                  >
                    {INDIAN_STATES.map((s) => (
                      <option key={s} value={s}>
                        {s}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              <div className="space-y-2 pt-2">
                <label className="flex items-center gap-2 cursor-pointer text-xs text-stone-200">
                  <input
                    type="checkbox"
                    checked={pickupAvailable}
                    onChange={(e) => setPickupAvailable(e.target.checked)}
                    className="rounded accent-emerald-500"
                  />
                  <span>{t('fieldPickup')}</span>
                </label>

                <label className="flex items-center gap-2 cursor-pointer text-xs text-stone-200">
                  <input
                    type="checkbox"
                    checked={deliveryAvailable}
                    onChange={(e) => setDeliveryAvailable(e.target.checked)}
                    className="rounded accent-emerald-500"
                  />
                  <span>{t('fieldDelivery')}</span>
                </label>

                <label className="flex items-center gap-2 cursor-pointer text-xs text-stone-200 pt-2 border-t border-emerald-950">
                  <input
                    type="checkbox"
                    checked={hasLabTestReport}
                    onChange={(e) => setHasLabTestReport(e.target.checked)}
                    className="rounded accent-emerald-500"
                  />
                  <span className="font-semibold text-emerald-300">{t('fieldHasLabTest')}</span>
                </label>
              </div>
            </div>
          )}

          {/* STEP 5: Review & Publish Preview */}
          {step === 5 && (
            <div className="space-y-5 animate-fadeIn">
              <h2 className="text-lg font-bold text-emerald-200 border-b border-emerald-900/60 pb-2">
                {t('wizardStep5')}
              </h2>

              <p className="text-xs text-stone-300">
                {language === 'te'
                  ? 'క్రింద మీ సరుకు మార్కెట్‌ప్లేస్‌లో కనిపించే రూపాన్ని సమీక్షించండి. ప్రచురించిన వెంటనే కొనుగోలుదారులు మరియు AI మ్యాచింగ్ ఇంజిన్‌కు అందుబాటులోకి వస్తుంది.'
                  : 'Review how your resource card and technical specifications will appear across the CIRCUVIA exchange network.'}
              </p>

              {/* Preview Card Mockup */}
              <div className="max-w-md mx-auto p-4 rounded-3xl bg-forest-900/60 border border-emerald-700/60 shadow-xl space-y-3">
                <div className="aspect-video rounded-xl overflow-hidden relative">
                  <img src={selectedImage} alt="preview" className="w-full h-full object-cover" />
                  <div className="absolute top-2 left-2 flex gap-1">
                    <span className="px-2 py-0.5 rounded bg-emerald-950 text-emerald-300 text-[10px] font-bold border border-emerald-500/40">
                      {t(`cat_${category}` as keyof typeof t)}
                    </span>
                    <span className="px-2 py-0.5 rounded bg-forest-950 text-lime-400 text-[10px] font-bold">
                      {t(`type_${resourceType}` as keyof typeof t)}
                    </span>
                  </div>
                </div>

                <div className="space-y-1">
                  <div className="text-[11px] text-emerald-400 flex items-center gap-1">
                    <MapPin className="w-3.5 h-3.5" /> {locationCity}, {locationState}
                  </div>
                  <h3 className="font-bold text-base text-white">{title || 'Untitled Resource'}</h3>
                  <p className="text-xs text-stone-400 line-clamp-2">{description}</p>
                </div>

                <div className="pt-2 border-t border-emerald-950 flex justify-between items-center text-xs">
                  <div>
                    <span className="text-base font-extrabold text-emerald-300">
                      ₹{pricePerUnit}
                    </span>{' '}
                    <span className="text-[10px] text-stone-400">/ {unit}</span>
                  </div>
                  <div className="text-right text-[11px] text-stone-300">
                    <span className="font-bold text-white">{quantity} {unit}</span> Total (MOQ: {minOrderQuantity})
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Navigation Controls */}
          <div className="pt-6 border-t border-emerald-900/50 flex items-center justify-between">
            {step > 1 ? (
              <button
                type="button"
                onClick={() => setStep((prev) => prev - 1)}
                className="px-4 py-2 bg-forest-900 hover:bg-forest-800 text-stone-300 rounded-xl text-xs font-semibold flex items-center gap-1.5 transition-colors"
              >
                <ArrowLeft className="w-4 h-4" />
                <span>{language === 'te' ? 'వెనుకకు' : 'Previous Step'}</span>
              </button>
            ) : (
              <button
                type="button"
                onClick={handleSaveDraft}
                className="px-4 py-2 bg-forest-900 text-stone-400 hover:text-white rounded-xl text-xs font-semibold"
              >
                {t('saveDraftBtn')}
              </button>
            )}

            {step < 5 ? (
              <button
                type="button"
                onClick={handleNext}
                className="px-6 py-2.5 bg-gradient-to-r from-emerald-600 to-emerald-500 hover:from-emerald-500 text-white rounded-xl text-xs font-bold flex items-center gap-1.5 shadow-md shadow-emerald-950/40"
              >
                <span>{language === 'te' ? 'తదుపరి' : 'Continue'}</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            ) : (
              <button
                type="button"
                onClick={handlePublish}
                className="px-7 py-2.5 bg-gradient-to-r from-emerald-600 via-teal-500 to-lime-500 hover:from-emerald-500 text-forest-950 font-black rounded-xl text-xs shadow-xl flex items-center gap-2 transform hover:scale-105 transition-all"
              >
                <Sparkles className="w-4 h-4" />
                <span>{t('publishBtn')}</span>
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
