'use client';

import React, { useState } from 'react';
import { useApp } from '@/context/AppContext';
import { ResourceListing } from '@/types';
import {
  X,
  MapPin,
  ShieldCheck,
  ShieldAlert,
  FileText,
  Truck,
  CheckCircle2,
  Bookmark,
  Share2,
  Calendar,
  Layers,
  Sparkles,
  MessageSquare,
  Send,
  Building,
} from 'lucide-react';
import confetti from 'canvas-confetti';

interface ResourceDetailModalProps {
  listing: ResourceListing | null;
  onClose: () => void;
}

export function ResourceDetailModal({ listing, onClose }: ResourceDetailModalProps) {
  const {
    t,
    language,
    savedListingIds,
    toggleSaveListing,
    currentUser,
    submitQuotation,
    createOrder,
    sendMessage,
    addToast,
  } = useApp();

  const [activeTab, setActiveTab] = useState<'specs' | 'logistics' | 'safety'>('specs');
  const [selectedImage, setSelectedImage] = useState(0);

  // Workflow states
  const [showQuoteForm, setShowQuoteForm] = useState(false);
  const [quoteQty, setQuoteQty] = useState(listing ? listing.minOrderQuantity : 10);
  const [targetPrice, setTargetPrice] = useState(listing ? listing.pricePerUnit : 500);
  const [quoteNotes, setQuoteNotes] = useState('');

  const [showOrderModal, setShowOrderModal] = useState(false);
  const [orderQty, setOrderQty] = useState(listing ? listing.minOrderQuantity : 10);
  const [transportMode, setTransportMode] = useState('DEDICATED_TRUCK');

  const [showContactForm, setShowContactForm] = useState(false);
  const [directMsg, setDirectMsg] = useState('');

  if (!listing) return null;

  const isSaved = savedListingIds.includes(listing.id);
  const title = language === 'te' && listing.titleTe ? listing.titleTe : listing.title;
  const description =
    language === 'te' && listing.descriptionTe ? listing.descriptionTe : listing.description;

  const handleSendQuotation = (e: React.FormEvent) => {
    e.preventDefault();
    submitQuotation({
      listingId: listing.id,
      listingTitle: listing.title,
      sellerId: listing.sellerId,
      sellerName: listing.sellerName,
      buyerId: currentUser.id,
      buyerName: currentUser.name,
      quantity: Number(quoteQty),
      unit: listing.unit,
      unitPrice: Number(targetPrice),
      totalPrice: Number(quoteQty) * Number(targetPrice),
      deliveryTerms: 'Standard FOR Site Transit Delivery',
      estDeliveryDays: 4,
      validUntil: '2026-11-30',
      notes: quoteNotes || 'Requesting commercial quote for immediate dispatch schedule.',
      status: 'PENDING',
    });
    try {
      confetti({ particleCount: 40, spread: 60, origin: { y: 0.6 } });
    } catch (_) {}
    setShowQuoteForm(false);
  };

  const handlePlaceOrder = (e: React.FormEvent) => {
    e.preventDefault();
    const qty = Number(orderQty);
    const totalAmount = qty * listing.pricePerUnit;
    const carbonSaved = Math.round(qty * (listing.unit === 'MT' ? 1000 : 1) * 0.92);

    createOrder({
      listingId: listing.id,
      listingTitle: listing.title,
      buyerId: currentUser.id,
      buyerName: currentUser.name,
      sellerId: listing.sellerId,
      sellerName: listing.sellerName,
      quantity: qty,
      unit: listing.unit,
      totalAmount,
      currency: 'INR',
      status: 'INQUIRY',
      originCity: listing.locationCity,
      originState: listing.locationState,
      destinationCity: currentUser.city,
      destinationState: currentUser.state,
      transportPartner: 'Regional Logistics Fleet (Pending Dispatch)',
      estimatedDelivery: '2026-10-24',
      carbonSavedKg: carbonSaved,
      wasteDivertedKg: qty * (listing.unit === 'MT' ? 1000 : 1),
    });

    try {
      confetti({ particleCount: 70, spread: 70, origin: { y: 0.5 } });
    } catch (_) {}
    setShowOrderModal(false);
    onClose();
  };

  const handleSendDirectMessage = (e: React.FormEvent) => {
    e.preventDefault();
    if (!directMsg.trim()) return;
    sendMessage(listing.sellerId, listing.sellerName, directMsg, listing.id, listing.title);
    setDirectMsg('');
    setShowContactForm(false);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-black/75 backdrop-blur-sm overflow-y-auto animate-fadeIn">
      <div
        role="dialog"
        aria-modal="true"
        aria-labelledby="resource-title"
        className="relative w-full max-w-4xl bg-forest-950 border border-emerald-800/50 rounded-3xl shadow-2xl overflow-hidden my-auto text-stone-100 max-h-[92vh] flex flex-col"
      >
        {/* Modal Top Bar */}
        <div className="flex items-center justify-between px-6 py-4 bg-forest-900/80 border-b border-emerald-900/50">
          <div className="flex items-center gap-2">
            <span className="px-2.5 py-1 rounded-lg text-xs font-bold uppercase tracking-wider bg-emerald-950 text-emerald-300 border border-emerald-600/30">
              {t(`cat_${listing.category}` as keyof typeof t)}
            </span>
            <span className="px-2.5 py-1 rounded-lg text-xs font-semibold bg-forest-950 text-lime-400 border border-emerald-800/40">
              {t(`type_${listing.resourceType}` as keyof typeof t)}
            </span>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={() => toggleSaveListing(listing.id)}
              className={`p-2 rounded-xl border transition-colors ${
                isSaved
                  ? 'bg-emerald-600 text-white border-emerald-500'
                  : 'bg-forest-900 text-stone-300 hover:text-white border-emerald-800/40'
              }`}
              title={isSaved ? t('savedItem') : t('saveItem')}
            >
              <Bookmark className="w-4 h-4" />
            </button>
            <button
              onClick={() => {
                if (navigator.clipboard) {
                  navigator.clipboard.writeText(window.location.href);
                  addToast(language === 'te' ? 'లింక్ కాపీ చేయబడింది' : 'Listing URL copied to clipboard', 'info');
                }
              }}
              className="p-2 rounded-xl bg-forest-900 hover:bg-forest-800 text-stone-300 hover:text-white border border-emerald-800/40 transition-colors"
              title="Share listing"
            >
              <Share2 className="w-4 h-4" />
            </button>
            <button
              onClick={onClose}
              className="p-2 rounded-xl bg-forest-900 hover:bg-forest-800 text-stone-400 hover:text-white border border-emerald-800/40 transition-colors"
              aria-label="Close dialog"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Modal Body */}
        <div className="flex-1 overflow-y-auto p-6 space-y-6">
          {/* Main Title & Key Metrics Header */}
          <div className="flex flex-col md:flex-row md:items-start justify-between gap-4">
            <div>
              <h2 id="resource-title" className="text-xl sm:text-2xl font-bold text-white tracking-tight">
                {title}
              </h2>
              <div className="flex flex-wrap items-center gap-3 mt-2 text-xs text-stone-300">
                <span className="flex items-center gap-1 text-emerald-400 font-medium">
                  <MapPin className="w-4 h-4" />
                  {listing.locationCity}, {listing.locationState}
                </span>
                <span>•</span>
                <span className="flex items-center gap-1 text-stone-300">
                  <Building className="w-4 h-4 text-stone-400" />
                  {listing.sellerName}
                </span>
                <span>•</span>
                <span>
                  Listed on {new Date(listing.createdAt).toLocaleDateString()}
                </span>
              </div>
            </div>

            {/* Price Badge */}
            <div className="p-4 rounded-2xl bg-gradient-to-br from-forest-900 to-emerald-950 border border-emerald-700/40 shadow-inner text-right">
              <div className="text-2xl font-black text-emerald-300">
                ₹{listing.pricePerUnit.toLocaleString('en-IN')}{' '}
                <span className="text-xs font-normal text-stone-300">
                  / {listing.unit}
                </span>
              </div>
              <div className="text-[11px] text-lime-400 font-medium mt-0.5">
                {listing.isNegotiable
                  ? language === 'te'
                    ? 'ధరపై చర్చలకు అవకాశం ఉంది'
                    : 'Negotiable for Bulk Volume'
                  : language === 'te'
                  ? 'స్థిర ధర'
                  : 'Fixed Pricing'}
              </div>
            </div>
          </div>

          {/* Image Showcase & Quick Stats */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* Images */}
            <div className="md:col-span-2 space-y-3">
              <div className="relative aspect-video rounded-2xl overflow-hidden border border-emerald-800/40 bg-black/40 shadow-lg">
                <img
                  src={listing.images[selectedImage] || listing.images[0]}
                  alt={listing.title}
                  className="w-full h-full object-cover"
                />
                {/* Verified Overlay Tag */}
                <div className="absolute top-3 left-3 flex flex-col gap-1.5">
                  {listing.hasLabTestReport ? (
                    <span className="inline-flex items-center gap-1 text-xs font-bold px-2.5 py-1 rounded-full bg-emerald-950/90 text-emerald-300 border border-emerald-400 shadow-md backdrop-blur-md">
                      <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
                      {t('verifiedMaterialBadge')}
                    </span>
                  ) : (
                    <span className="inline-flex items-center gap-1 text-xs font-medium px-2.5 py-1 rounded-full bg-amber-950/90 text-amber-300 border border-amber-500/40 shadow-md backdrop-blur-md">
                      <ShieldAlert className="w-3.5 h-3.5 text-amber-400" />
                      {t('sellerProvidedClaim')}
                    </span>
                  )}
                </div>
              </div>

              {/* Thumbnails */}
              {listing.images.length > 1 && (
                <div className="flex gap-2">
                  {listing.images.map((img, i) => (
                    <button
                      key={i}
                      onClick={() => setSelectedImage(i)}
                      className={`relative w-20 h-14 rounded-xl overflow-hidden border-2 transition-all ${
                        selectedImage === i
                          ? 'border-emerald-400 scale-105'
                          : 'border-emerald-900/60 opacity-60 hover:opacity-100'
                      }`}
                    >
                      <img src={img} alt="thumbnail" className="w-full h-full object-cover" />
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* Quick Spec Card */}
            <div className="p-4 rounded-2xl bg-forest-900/50 border border-emerald-800/40 space-y-3 text-xs">
              <h3 className="font-bold text-sm text-emerald-200 border-b border-emerald-900/50 pb-2">
                {language === 'te' ? 'సరుకు ముఖ్యాంశాలు' : 'Lot Summary'}
              </h3>
              <div className="flex justify-between py-1 border-b border-emerald-950">
                <span className="text-stone-400">{language === 'te' ? 'మొత్తం పరిమాణం' : 'Total Volume'}:</span>
                <span className="font-bold text-white">
                  {listing.quantity} {listing.unit}
                </span>
              </div>
              <div className="flex justify-between py-1 border-b border-emerald-950">
                <span className="text-stone-400">{t('moqLabel')}:</span>
                <span className="font-bold text-emerald-300">
                  {listing.minOrderQuantity} {listing.unit}
                </span>
              </div>
              <div className="flex justify-between py-1 border-b border-emerald-950">
                <span className="text-stone-400">{t('fieldGrade')}:</span>
                <span className="font-bold text-white">{listing.grade.replace('_', ' ')}</span>
              </div>
              <div className="flex justify-between py-1 border-b border-emerald-950">
                <span className="text-stone-400">{t('fieldCondition')}:</span>
                <span className="font-bold text-white">{t(`cond_${listing.condition}` as keyof typeof t)}</span>
              </div>
              <div className="flex justify-between py-1 border-b border-emerald-950">
                <span className="text-stone-400">{language === 'te' ? 'సెల్లర్ స్థితి' : 'Seller Verification'}:</span>
                <span className="font-bold text-emerald-400 flex items-center gap-1">
                  <CheckCircle2 className="w-3.5 h-3.5" /> Verified Facility
                </span>
              </div>

              {/* Delivery Flags */}
              <div className="pt-2 flex flex-col gap-1.5">
                <div className="flex items-center gap-2 text-stone-300">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                  <span>{t('fieldPickup')}</span>
                </div>
                <div className="flex items-center gap-2 text-stone-300">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                  <span>{t('fieldDelivery')}</span>
                </div>
              </div>
            </div>
          </div>

          {/* Description */}
          <div className="space-y-2">
            <h3 className="text-sm font-bold text-emerald-200">
              {language === 'te' ? 'మెటీరియల్ వివరణ' : 'Resource Overview & Context'}
            </h3>
            <p className="text-xs sm:text-sm text-stone-300 leading-relaxed bg-forest-900/30 p-4 rounded-2xl border border-emerald-900/40">
              {description}
            </p>
          </div>

          {/* Tabs for Technical Specs / Logistics / Safety */}
          <div className="space-y-4">
            <div className="flex border-b border-emerald-900/50 gap-2">
              <button
                type="button"
                onClick={() => setActiveTab('specs')}
                className={`pb-2.5 px-3 text-xs font-bold transition-all border-b-2 ${
                  activeTab === 'specs'
                    ? 'border-emerald-400 text-emerald-300'
                    : 'border-transparent text-stone-400 hover:text-stone-200'
                }`}
              >
                {t('specificationsTab')}
              </button>
              <button
                type="button"
                onClick={() => setActiveTab('logistics')}
                className={`pb-2.5 px-3 text-xs font-bold transition-all border-b-2 ${
                  activeTab === 'logistics'
                    ? 'border-emerald-400 text-emerald-300'
                    : 'border-transparent text-stone-400 hover:text-stone-200'
                }`}
              >
                {t('logisticsTab')}
              </button>
              <button
                type="button"
                onClick={() => setActiveTab('safety')}
                className={`pb-2.5 px-3 text-xs font-bold transition-all border-b-2 ${
                  activeTab === 'safety'
                    ? 'border-emerald-400 text-emerald-300'
                    : 'border-transparent text-stone-400 hover:text-stone-200'
                }`}
              >
                {t('safetyDocsTab')}
              </button>
            </div>

            {/* Tab 1: Specs */}
            {activeTab === 'specs' && (
              <div className="p-4 bg-forest-900/40 rounded-2xl border border-emerald-900/40 space-y-3 text-xs">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <span className="text-stone-400 block mb-1">
                      {language === 'te' ? 'రసాయన కూర్పు / పరీక్ష ఫలితాలు' : 'Chemical Assay & Technical Formula'}
                    </span>
                    <p className="font-mono text-emerald-200 bg-forest-950 p-2.5 rounded-xl border border-emerald-900/50">
                      {listing.chemicalComposition || 'Specific assay provided upon NABL lab sheet review.'}
                    </p>
                  </div>
                  <div>
                    <span className="text-stone-400 block mb-1">
                      {language === 'te' ? 'మూల పరిశ్రమ' : 'Source Industry / Process'}
                    </span>
                    <p className="text-stone-200 bg-forest-950 p-2.5 rounded-xl border border-emerald-900/50">
                      {listing.sellerRole === 'FACTORY'
                        ? 'Continuous Heavy Industrial Manufacturing'
                        : listing.sellerRole === 'RECYCLER'
                        ? 'Certified Secondary Plastics/Metals Processing Plant'
                        : 'Wholesale Certified Feedstock Depot'}
                    </p>
                  </div>
                </div>

                <div className="p-3 bg-amber-950/30 border border-amber-800/30 rounded-xl text-amber-200 text-[11px] flex items-start gap-2">
                  <ShieldAlert className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />
                  <span>{t('cautionSafetyNote')}</span>
                </div>
              </div>
            )}

            {/* Tab 2: Logistics */}
            {activeTab === 'logistics' && (
              <div className="p-4 bg-forest-900/40 rounded-2xl border border-emerald-900/40 space-y-3 text-xs">
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                  <div className="p-3 bg-forest-950 rounded-xl border border-emerald-900/50">
                    <span className="text-stone-400 block">{t('locationLabel')}</span>
                    <span className="font-bold text-white text-sm">
                      {listing.locationCity}, {listing.locationState}
                    </span>
                  </div>
                  <div className="p-3 bg-forest-950 rounded-xl border border-emerald-900/50">
                    <span className="text-stone-400 block">{language === 'te' ? 'రవాణా సౌలభ్యం' : 'Transit Modes'}</span>
                    <span className="font-bold text-emerald-300 text-sm">
                      Bulk Tippers / Freight Containers
                    </span>
                  </div>
                  <div className="p-3 bg-forest-950 rounded-xl border border-emerald-900/50">
                    <span className="text-stone-400 block">{language === 'te' ? 'డెలివరీ గడువు' : 'Lead Time'}</span>
                    <span className="font-bold text-lime-400 text-sm">
                      2 - 4 Business Days (Intra-Zone)
                    </span>
                  </div>
                </div>
              </div>
            )}

            {/* Tab 3: Safety & Documents */}
            {activeTab === 'safety' && (
              <div className="p-4 bg-forest-900/40 rounded-2xl border border-emerald-900/40 space-y-3 text-xs">
                <div className="flex items-center justify-between p-3 bg-forest-950 rounded-xl border border-emerald-900/50">
                  <div className="flex items-center gap-3">
                    <FileText className="w-6 h-6 text-emerald-400" />
                    <div>
                      <div className="font-bold text-white">
                        {listing.hasLabTestReport
                          ? 'Standard Material Test Report (MTR / COA)'
                          : 'Seller Declaration of Non-Hazardous Status'}
                      </div>
                      <div className="text-[11px] text-stone-400">
                        {listing.hasLabTestReport ? t('labReportAttached') : t('noLabReport')}
                      </div>
                    </div>
                  </div>
                  {listing.hasLabTestReport && (
                    <button
                      onClick={() => addToast('Opening verified test certificate document...', 'info')}
                      className="px-3 py-1.5 bg-emerald-700 hover:bg-emerald-600 rounded-lg text-white font-semibold text-xs transition-colors"
                    >
                      {language === 'te' ? 'చూడండి (PDF)' : 'View Certificate'}
                    </button>
                  )}
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Footer Actions */}
        <div className="p-4 sm:p-6 bg-forest-900/90 border-t border-emerald-900/60 flex flex-wrap items-center justify-between gap-3">
          <div className="flex items-center gap-2">
            <button
              onClick={() => setShowContactForm(true)}
              className="px-4 py-2.5 rounded-xl bg-forest-950 hover:bg-forest-800 border border-emerald-700/50 text-stone-200 text-xs font-semibold flex items-center gap-2 transition-colors"
            >
              <MessageSquare className="w-4 h-4 text-emerald-400" />
              {t('contactSellerBtn')}
            </button>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={() => setShowQuoteForm(true)}
              className="px-4 py-2.5 rounded-xl bg-forest-800 hover:bg-forest-700 border border-emerald-600/40 text-emerald-200 text-xs font-bold transition-colors"
            >
              {t('requestQuoteBtn')}
            </button>
            <button
              onClick={() => setShowOrderModal(true)}
              className="px-5 py-2.5 rounded-xl bg-gradient-to-r from-emerald-600 to-emerald-500 hover:from-emerald-500 hover:to-emerald-400 text-white text-xs font-extrabold shadow-lg shadow-emerald-950/40 transition-all hover:scale-[1.02]"
            >
              {t('reserveLotBtn')}
            </button>
          </div>
        </div>

        {/* --- Request Quotation Modal Sub-Dialog --- */}
        {showQuoteForm && (
          <div className="absolute inset-0 bg-forest-950/95 z-50 p-6 flex flex-col justify-center max-w-lg mx-auto overflow-y-auto">
            <div className="flex items-center justify-between pb-3 border-b border-emerald-900/50">
              <h3 className="font-bold text-base text-emerald-200">
                {t('requestQuoteBtn')} - {listing.title}
              </h3>
              <button
                onClick={() => setShowQuoteForm(false)}
                className="p-1 rounded-lg text-stone-400 hover:text-white"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
            <form onSubmit={handleSendQuotation} className="space-y-3 mt-4 text-xs">
              <div>
                <label className="block text-stone-300 font-medium mb-1">
                  {language === 'te' ? 'కావాల్సిన పరిమాణం' : 'Required Quantity'} ({listing.unit})
                </label>
                <input
                  type="number"
                  min={listing.minOrderQuantity}
                  max={listing.quantity}
                  value={quoteQty}
                  onChange={(e) => setQuoteQty(Number(e.target.value))}
                  className="w-full px-3 py-2 bg-forest-900 border border-emerald-800/50 rounded-xl text-white"
                  required
                />
                <span className="text-[10px] text-stone-400">
                  {t('moqLabel')}: {listing.minOrderQuantity} {listing.unit}
                </span>
              </div>
              <div>
                <label className="block text-stone-300 font-medium mb-1">
                  {language === 'te' ? 'మీ ప్రతిపాదిత ధర (₹/యూనిట్)' : 'Target Offered Price (₹/unit)'}
                </label>
                <input
                  type="number"
                  value={targetPrice}
                  onChange={(e) => setTargetPrice(Number(e.target.value))}
                  className="w-full px-3 py-2 bg-forest-900 border border-emerald-800/50 rounded-xl text-white"
                  required
                />
              </div>
              <div>
                <label className="block text-stone-300 font-medium mb-1">
                  {language === 'te' ? 'ప్రత్యేక నిబంధనలు లేదా గమనికలు' : 'Delivery & Packaging Terms'}
                </label>
                <textarea
                  rows={3}
                  value={quoteNotes}
                  onChange={(e) => setQuoteNotes(e.target.value)}
                  placeholder="e.g. Need deliveries in two weekly tranches via pneumatic tankers..."
                  className="w-full px-3 py-2 bg-forest-900 border border-emerald-800/50 rounded-xl text-white"
                />
              </div>
              <div className="flex gap-2 justify-end pt-2">
                <button
                  type="button"
                  onClick={() => setShowQuoteForm(false)}
                  className="px-4 py-2 text-stone-300 hover:text-white"
                >
                  {t('cancelAction')}
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 bg-emerald-600 hover:bg-emerald-500 rounded-xl font-bold text-white shadow-md"
                >
                  {language === 'te' ? 'కొటేషన్ పంపండి' : 'Dispatch Quotation Request'}
                </button>
              </div>
            </form>
          </div>
        )}

        {/* --- Purchase / Reserve Order Modal Sub-Dialog --- */}
        {showOrderModal && (
          <div className="absolute inset-0 bg-forest-950/95 z-50 p-6 flex flex-col justify-center max-w-lg mx-auto overflow-y-auto">
            <div className="flex items-center justify-between pb-3 border-b border-emerald-900/50">
              <h3 className="font-bold text-base text-emerald-200">
                {t('reserveLotBtn')} - {listing.title}
              </h3>
              <button
                onClick={() => setShowOrderModal(false)}
                className="p-1 rounded-lg text-stone-400 hover:text-white"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
            <form onSubmit={handlePlaceOrder} className="space-y-4 mt-4 text-xs">
              <div className="p-3 rounded-xl bg-forest-900/60 border border-emerald-900/50 space-y-1">
                <div className="flex justify-between">
                  <span className="text-stone-400">{language === 'te' ? 'యూనిట్ ధర' : 'Rate'}:</span>
                  <span className="font-bold text-white">
                    ₹{listing.pricePerUnit} / {listing.unit}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-stone-400">{language === 'te' ? 'ప్రారంభ స్థలం' : 'Origin'}:</span>
                  <span className="text-emerald-300">
                    {listing.locationCity}, {listing.locationState}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-stone-400">{language === 'te' ? 'చేరు స్థలం' : 'Destination'}:</span>
                  <span className="text-emerald-300">
                    {currentUser.city}, {currentUser.state}
                  </span>
                </div>
              </div>

              <div>
                <label className="block text-stone-300 font-medium mb-1">
                  {language === 'te' ? 'ఆర్డర్ పరిమాణం' : 'Order Quantity'} ({listing.unit})
                </label>
                <input
                  type="number"
                  min={listing.minOrderQuantity}
                  max={listing.quantity}
                  value={orderQty}
                  onChange={(e) => setOrderQty(Number(e.target.value))}
                  className="w-full px-3 py-2 bg-forest-900 border border-emerald-800/50 rounded-xl text-white font-bold"
                  required
                />
              </div>

              <div>
                <label className="block text-stone-300 font-medium mb-1">
                  {language === 'te' ? 'రవాణా ఎంపిక' : 'Logistics Partner Option'}
                </label>
                <select
                  value={transportMode}
                  onChange={(e) => setTransportMode(e.target.value)}
                  className="w-full px-3 py-2 bg-forest-900 border border-emerald-800/50 rounded-xl text-white"
                >
                  <option value="DEDICATED_TRUCK">
                    {language === 'te' ? 'ప్రత్యేక ట్రక్ రవాణా (Dedicated Tipper)' : 'Dedicated Multi-Axle Freight Truck'}
                  </option>
                  <option value="SELF_PICKUP">
                    {language === 'te' ? 'కొనుగోలుదారు వాహనం (Ex-Works Self Pickup)' : 'Ex-Works Facility Self-Pickup'}
                  </option>
                </select>
              </div>

              <div className="p-3 bg-emerald-950/60 border border-emerald-800/50 rounded-xl space-y-1">
                <div className="flex justify-between text-sm">
                  <span className="text-stone-300">{language === 'te' ? 'మొత్తం చెల్లింపు అంచనా' : 'Estimated Value'}:</span>
                  <span className="font-black text-emerald-300">
                    ₹{(Number(orderQty) * listing.pricePerUnit).toLocaleString('en-IN')}
                  </span>
                </div>
                <div className="text-[10px] text-lime-400">
                  {language === 'te'
                    ? 'ధృవీకరించిన తర్వాత డిజిటల్ QR వేబిల్ మరియు ఫ్యాక్టరీ గేట్ పాస్ జారీ చేయబడుతుంది.'
                    : 'Dispatch authorization & digital QR manifest will be issued upon facility confirmation.'}
                </div>
              </div>

              <div className="flex gap-2 justify-end pt-2">
                <button
                  type="button"
                  onClick={() => setShowOrderModal(false)}
                  className="px-4 py-2 text-stone-300 hover:text-white"
                >
                  {t('cancelAction')}
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 bg-emerald-600 hover:bg-emerald-500 rounded-xl font-bold text-white shadow-md"
                >
                  {language === 'te' ? 'ఆర్డర్ నమోదు చేయండి' : 'Confirm Order Reservation'}
                </button>
              </div>
            </form>
          </div>
        )}

        {/* --- Direct Contact Seller Sub-Dialog --- */}
        {showContactForm && (
          <div className="absolute inset-0 bg-forest-950/95 z-50 p-6 flex flex-col justify-center max-w-lg mx-auto">
            <div className="flex items-center justify-between pb-3 border-b border-emerald-900/50">
              <h3 className="font-bold text-base text-emerald-200">
                {t('contactSellerBtn')} - {listing.sellerName}
              </h3>
              <button
                onClick={() => setShowContactForm(false)}
                className="p-1 rounded-lg text-stone-400 hover:text-white"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
            <form onSubmit={handleSendDirectMessage} className="space-y-4 mt-4 text-xs">
              <p className="text-stone-300">
                {language === 'te'
                  ? 'మీ సందేశం నేరుగా ఫ్యాక్టరీ సాంకేతిక డెస్క్‌కు పంపబడుతుంది.'
                  : 'Send a message directly to the seller facility operations manager.'}
              </p>
              <textarea
                rows={4}
                required
                value={directMsg}
                onChange={(e) => setDirectMsg(e.target.value)}
                placeholder="Inquire regarding batch testing, monthly supply contract, or inspection visit..."
                className="w-full px-3 py-2 bg-forest-900 border border-emerald-800/50 rounded-xl text-white"
              />
              <div className="flex gap-2 justify-end">
                <button
                  type="button"
                  onClick={() => setShowContactForm(false)}
                  className="px-4 py-2 text-stone-300 hover:text-white"
                >
                  {t('cancelAction')}
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 bg-emerald-600 hover:bg-emerald-500 rounded-xl font-bold text-white flex items-center gap-1.5 shadow-md"
                >
                  <Send className="w-3.5 h-3.5" />
                  {language === 'te' ? 'పంపండి' : 'Send Direct Message'}
                </button>
              </div>
            </form>
          </div>
        )}
      </div>
    </div>
  );
}
