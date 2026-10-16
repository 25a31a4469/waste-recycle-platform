'use client';

import React, { useState } from 'react';
import { useApp } from '@/context/AppContext';
import { RFQItem, Quotation, QuotationStatus, MaterialCategory } from '@/types';
import {
  FileText,
  PlusCircle,
  Clock,
  MapPin,
  Building2,
  CheckCircle2,
  XCircle,
  Scale,
  Calendar,
  X,
  Download,
  AlertCircle,
} from 'lucide-react';
import confetti from 'canvas-confetti';

const INDIAN_STATES = [
  'Telangana',
  'Andhra Pradesh',
  'Maharashtra',
  'Tamil Nadu',
  'Karnataka',
  'Gujarat',
];

export default function RfqCenterPage() {
  const {
    t,
    language,
    currentUser,
    rfqs,
    createRFQ,
    quotations,
    updateQuotationStatus,
    addToast,
  } = useApp();

  const [activeTab, setActiveTab] = useState<'open_rfqs' | 'my_rfqs' | 'received_quotes'>('open_rfqs');
  const [createModalOpen, setCreateModalOpen] = useState(false);
  const [compareRfqId, setCompareRfqId] = useState<string | null>(null);

  // New RFQ Form States
  const [title, setTitle] = useState('');
  const [category, setCategory] = useState<MaterialCategory>('INDUSTRIAL_SLAG_ASH');
  const [requiredQuantity, setRequiredQuantity] = useState(100);
  const [unit, setUnit] = useState('MT');
  const [targetPrice, setTargetPrice] = useState(800);
  const [destinationCity, setDestinationCity] = useState(currentUser.city || 'Karimnagar');
  const [destinationState, setDestinationState] = useState(currentUser.state || 'Telangana');
  const [specifications, setSpecifications] = useState('');
  const [deadline, setDeadline] = useState('2026-11-20');

  const handleCreateRfq = (e: React.FormEvent) => {
    e.preventDefault();
    createRFQ({
      title,
      category,
      requiredQuantity: Number(requiredQuantity),
      unit,
      targetPricePerUnit: Number(targetPrice),
      destinationCity,
      destinationState,
      specifications: specifications || 'Conforming to standard commercial technical purity tolerances.',
      deadline,
      buyerId: currentUser.id,
      buyerName: currentUser.name,
      buyerCompany: currentUser.companyName,
      status: 'OPEN',
    });

    try {
      confetti({ particleCount: 50, spread: 60, origin: { y: 0.6 } });
    } catch (_) {}

    setCreateModalOpen(false);
    setTitle('');
    setSpecifications('');
  };

  const myRfqs = rfqs.filter((r) => r.buyerId === currentUser.id);

  // Quotations for a specific RFQ for side-by-side comparison
  const rfqQuotations = compareRfqId
    ? quotations.filter((q) => q.rfqId === compareRfqId)
    : [];

  return (
    <div className="flex-1 bg-[#06241a] text-stone-100 min-h-screen py-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 pb-6 border-b border-emerald-900/40">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-950 border border-emerald-500/40 text-xs font-bold text-emerald-300 mb-2">
              <FileText className="w-3.5 h-3.5 text-lime-400" />
              <span>{language === 'te' ? 'కేంద్రీకృత సేకరణ పోర్టల్' : 'Enterprise Procurement Hub'}</span>
            </div>
            <h1 className="text-2xl sm:text-4xl font-black text-white tracking-tight">
              {t('rfqTitle')}
            </h1>
            <p className="text-xs sm:text-sm text-stone-300 mt-1 max-w-2xl leading-relaxed">
              {t('rfqSubtitle')}
            </p>
          </div>

          <button
            onClick={() => setCreateModalOpen(true)}
            className="px-5 py-2.5 rounded-xl bg-gradient-to-r from-emerald-600 to-emerald-500 hover:from-emerald-500 text-white font-bold text-xs sm:text-sm flex items-center gap-2 shadow-lg shadow-emerald-950/40 transition-all hover:-translate-y-0.5"
          >
            <PlusCircle className="w-4 h-4" />
            <span>{t('rfqCreateBtn')}</span>
          </button>
        </div>

        {/* Tab Navigation */}
        <div className="flex gap-2 border-b border-emerald-900/50 pb-2">
          <button
            onClick={() => setActiveTab('open_rfqs')}
            className={`px-4 py-2 rounded-xl text-xs font-bold transition-all ${
              activeTab === 'open_rfqs'
                ? 'bg-emerald-600 text-white shadow-md'
                : 'text-stone-300 hover:text-white hover:bg-forest-900'
            }`}
          >
            {language === 'te' ? 'యాక్టివ్ RFQలు' : 'Open Procurement RFQs'} ({rfqs.length})
          </button>
          <button
            onClick={() => setActiveTab('my_rfqs')}
            className={`px-4 py-2 rounded-xl text-xs font-bold transition-all ${
              activeTab === 'my_rfqs'
                ? 'bg-emerald-600 text-white shadow-md'
                : 'text-stone-300 hover:text-white hover:bg-forest-900'
            }`}
          >
            {language === 'te' ? 'నా RFQలు' : 'My Posted Requirements'} ({myRfqs.length})
          </button>
          <button
            onClick={() => setActiveTab('received_quotes')}
            className={`px-4 py-2 rounded-xl text-xs font-bold transition-all ${
              activeTab === 'received_quotes'
                ? 'bg-emerald-600 text-white shadow-md'
                : 'text-stone-300 hover:text-white hover:bg-forest-900'
            }`}
          >
            {t('rfqReceivedQuotes')} ({quotations.length})
          </button>
        </div>

        {/* TAB 1: Open RFQs */}
        {activeTab === 'open_rfqs' && (
          <div className="space-y-4">
            {rfqs.map((rfq) => (
              <div
                key={rfq.id}
                className="p-6 rounded-3xl bg-forest-950 border border-emerald-900/50 hover:border-emerald-600/50 shadow-xl transition-all space-y-4"
              >
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-3 border-b border-emerald-900/60">
                  <div>
                    <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-emerald-950 text-emerald-300 border border-emerald-600/30">
                      {t(`cat_${rfq.category}` as keyof typeof t)}
                    </span>
                    <h3 className="text-base sm:text-lg font-bold text-white mt-1">
                      {rfq.title}
                    </h3>
                    <div className="flex items-center gap-2 text-xs text-stone-400 mt-0.5">
                      <Building2 className="w-3.5 h-3.5 text-stone-400" />
                      <span>{rfq.buyerCompany}</span>
                      <span>•</span>
                      <MapPin className="w-3.5 h-3.5 text-emerald-400" />
                      <span>
                        {rfq.destinationCity}, {rfq.destinationState}
                      </span>
                    </div>
                  </div>

                  <div className="text-right self-start sm:self-auto">
                    <span className="text-xs text-stone-400 block">{language === 'te' ? 'అవసరమైన పరిమాణం' : 'Target Volume'}:</span>
                    <span className="text-lg font-black text-emerald-300">
                      {rfq.requiredQuantity} {rfq.unit}
                    </span>
                  </div>
                </div>

                <div className="text-xs text-stone-300 leading-relaxed bg-forest-900/30 p-3.5 rounded-2xl border border-emerald-950">
                  <strong className="text-emerald-400">Specifications:</strong> {rfq.specifications}
                </div>

                <div className="flex flex-wrap items-center justify-between gap-3 pt-2 text-xs">
                  <div className="flex items-center gap-4 text-stone-400">
                    <span className="flex items-center gap-1">
                      <Calendar className="w-3.5 h-3.5 text-emerald-400" />
                      Deadline: {rfq.deadline}
                    </span>
                    {rfq.targetPricePerUnit && (
                      <span>Budget: ~₹{rfq.targetPricePerUnit}/{rfq.unit}</span>
                    )}
                  </div>

                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => setCompareRfqId(rfq.id)}
                      className="px-3.5 py-1.5 rounded-xl bg-forest-900 hover:bg-forest-800 border border-emerald-800/40 text-stone-200 font-semibold flex items-center gap-1.5 transition-colors"
                    >
                      <Scale className="w-3.5 h-3.5 text-lime-400" />
                      <span>{t('compareSuppliers')}</span>
                    </button>
                    <button
                      onClick={() =>
                        addToast(
                          language === 'te'
                            ? 'కొటేషన్ సమర్పించడానికి విక్రేత డాష్‌బోర్డ్‌లోకి లాగిన్ అవ్వండి.'
                            : 'To bid on this RFQ, submit a response via your Seller Dashboard.',
                          'info'
                        )
                      }
                      className="px-4 py-1.5 rounded-xl bg-emerald-600 hover:bg-emerald-500 font-bold text-white shadow-md"
                    >
                      {language === 'te' ? 'బిడ్ వేయండి' : 'Submit Quotation Bid'}
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* TAB 2: My RFQs */}
        {activeTab === 'my_rfqs' && (
          <div className="space-y-4">
            {myRfqs.length === 0 ? (
              <div className="p-12 text-center bg-forest-950/60 border border-emerald-900/40 rounded-3xl space-y-3">
                <p className="text-sm text-stone-400">
                  {language === 'te'
                    ? 'మీరు ఇంకా ఎటువంటి సేకరణ RFQని సృష్టించలేదు.'
                    : 'You have not broadcasted any procurement RFQ yet.'}
                </p>
                <button
                  onClick={() => setCreateModalOpen(true)}
                  className="px-4 py-2 bg-emerald-600 hover:bg-emerald-500 text-white rounded-xl text-xs font-bold"
                >
                  {t('rfqCreateBtn')}
                </button>
              </div>
            ) : (
              myRfqs.map((rfq) => (
                <div
                  key={rfq.id}
                  className="p-5 rounded-2xl bg-forest-950 border border-emerald-800/40 space-y-3"
                >
                  <div className="flex justify-between items-start">
                    <div>
                      <h3 className="font-bold text-white text-base">{rfq.title}</h3>
                      <div className="text-xs text-stone-400 mt-0.5">
                        {rfq.requiredQuantity} {rfq.unit} • Destination: {rfq.destinationCity}
                      </div>
                    </div>
                    <span className="px-2.5 py-1 rounded-full text-xs font-bold bg-emerald-950 text-emerald-300 border border-emerald-500/40">
                      {rfq.status}
                    </span>
                  </div>
                  <div className="flex justify-between items-center pt-2 text-xs border-t border-emerald-950">
                    <span className="text-stone-400">Deadline: {rfq.deadline}</span>
                    <button
                      onClick={() => setCompareRfqId(rfq.id)}
                      className="text-xs text-lime-400 font-bold hover:underline"
                    >
                      Compare {quotations.filter((q) => q.rfqId === rfq.id).length} Supplier Bids →
                    </button>
                  </div>
                </div>
              ))
            )}
          </div>
        )}

        {/* TAB 3: Received Quotations */}
        {activeTab === 'received_quotes' && (
          <div className="space-y-4">
            {quotations.map((quote) => (
              <div
                key={quote.id}
                className="p-6 rounded-3xl bg-forest-950 border border-emerald-800/40 space-y-4"
              >
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-3 border-b border-emerald-900/60">
                  <div>
                    <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-forest-900 text-stone-300 border border-emerald-900/50">
                      Quote Ref #{quote.id}
                    </span>
                    <h3 className="text-base font-bold text-white mt-1">
                      {quote.listingTitle}
                    </h3>
                    <div className="text-xs text-emerald-400">
                      Submitted by: <strong>{quote.sellerName}</strong>
                    </div>
                  </div>

                  <div className="text-right">
                    <div className="text-xs text-stone-400">{language === 'te' ? 'మొత్తం కోట్ విలువ' : 'Offered Rate'}:</div>
                    <div className="text-lg font-black text-emerald-300">
                      ₹{quote.unitPrice} / {quote.unit}
                    </div>
                    <div className="text-[11px] text-stone-400 font-medium">
                      Total: ₹{quote.totalPrice.toLocaleString('en-IN')}
                    </div>
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs bg-forest-900/40 p-3 rounded-2xl border border-emerald-950">
                  <div>
                    <span className="text-stone-400 block">Delivery Terms:</span>
                    <span className="text-stone-200">{quote.deliveryTerms}</span>
                  </div>
                  <div>
                    <span className="text-stone-400 block">Lead Time:</span>
                    <span className="text-emerald-300 font-bold">~{quote.estDeliveryDays} Days</span>
                  </div>
                </div>

                <div className="flex items-center justify-between pt-2 text-xs">
                  <span className="text-stone-400">
                    Status:{' '}
                    <strong className="text-white uppercase">{quote.status}</strong>
                  </span>
                  <div className="flex gap-2">
                    {quote.status !== 'ACCEPTED' && (
                      <button
                        onClick={() => updateQuotationStatus(quote.id, 'ACCEPTED')}
                        className="px-4 py-1.5 bg-emerald-600 hover:bg-emerald-500 rounded-xl text-white font-bold transition-colors"
                      >
                        Accept Quotation
                      </button>
                    )}
                    {quote.status !== 'REJECTED' && (
                      <button
                        onClick={() => updateQuotationStatus(quote.id, 'REJECTED')}
                        className="px-3 py-1.5 bg-forest-900 hover:bg-rose-950/80 border border-rose-800/40 rounded-xl text-rose-300 font-semibold transition-colors"
                      >
                        Decline
                      </button>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* --- Create New RFQ Dialog Modal --- */}
        {createModalOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/75 backdrop-blur-sm animate-fadeIn">
            <div className="relative w-full max-w-lg bg-forest-950 border border-emerald-800/60 rounded-3xl p-6 text-white max-h-[92vh] overflow-y-auto space-y-4">
              <div className="flex items-center justify-between pb-3 border-b border-emerald-900/60">
                <h3 className="font-bold text-lg text-emerald-200 flex items-center gap-2">
                  <PlusCircle className="w-5 h-5 text-emerald-400" />
                  {t('rfqCreateBtn')}
                </h3>
                <button
                  onClick={() => setCreateModalOpen(false)}
                  className="p-1 rounded-lg text-stone-400 hover:text-white"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              <form onSubmit={handleCreateRfq} className="space-y-3.5 text-xs">
                <div>
                  <label className="block text-stone-300 font-semibold mb-1">
                    {t('rfqTitleField')} *
                  </label>
                  <input
                    type="text"
                    required
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    placeholder="e.g. Monthly Requirement of Dry Fly Ash Grade F (150 MT)"
                    className="w-full px-3 py-2 bg-forest-900 border border-emerald-800/40 rounded-xl text-white placeholder-stone-500 focus:outline-none"
                  />
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="block text-stone-300 font-semibold mb-1">
                      {t('fieldCategory')}
                    </label>
                    <select
                      value={category}
                      onChange={(e) => setCategory(e.target.value as MaterialCategory)}
                      className="w-full px-3 py-2 bg-forest-900 border border-emerald-800/40 rounded-xl text-white"
                    >
                      <option value="INDUSTRIAL_SLAG_ASH">{t('cat_INDUSTRIAL_SLAG_ASH')}</option>
                      <option value="PLASTICS">{t('cat_PLASTICS')}</option>
                      <option value="METALS">{t('cat_METALS')}</option>
                      <option value="TEXTILES">{t('cat_TEXTILES')}</option>
                      <option value="CHEMICALS_SOLVENTS">{t('cat_CHEMICALS_SOLVENTS')}</option>
                      <option value="RUBBER">{t('cat_RUBBER')}</option>
                      <option value="AGRO_WASTE">{t('cat_AGRO_WASTE')}</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-stone-300 font-semibold mb-1">
                      {language === 'te' ? 'కావాల్సిన పరిమాణం' : 'Required Volume'} *
                    </label>
                    <div className="flex gap-2">
                      <input
                        type="number"
                        min="1"
                        required
                        value={requiredQuantity}
                        onChange={(e) => setRequiredQuantity(Number(e.target.value))}
                        className="w-full px-3 py-2 bg-forest-900 border border-emerald-800/40 rounded-xl text-white font-bold"
                      />
                      <select
                        value={unit}
                        onChange={(e) => setUnit(e.target.value)}
                        className="w-24 px-2 py-2 bg-forest-900 border border-emerald-800/40 rounded-xl text-white"
                      >
                        <option value="MT">MT</option>
                        <option value="kg">kg</option>
                        <option value="Liters">Liters</option>
                        <option value="Drums">Drums</option>
                      </select>
                    </div>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="block text-stone-300 font-semibold mb-1">
                      {t('rfqTargetPrice')}
                    </label>
                    <input
                      type="number"
                      value={targetPrice}
                      onChange={(e) => setTargetPrice(Number(e.target.value))}
                      className="w-full px-3 py-2 bg-forest-900 border border-emerald-800/40 rounded-xl text-white"
                    />
                  </div>

                  <div>
                    <label className="block text-stone-300 font-semibold mb-1">
                      {t('rfqDeadline')} *
                    </label>
                    <input
                      type="date"
                      required
                      value={deadline}
                      onChange={(e) => setDeadline(e.target.value)}
                      className="w-full px-3 py-2 bg-forest-900 border border-emerald-800/40 rounded-xl text-white"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="block text-stone-300 font-semibold mb-1">
                      {language === 'te' ? 'గమ్యస్థాన నగరం' : 'Destination City'}
                    </label>
                    <input
                      type="text"
                      required
                      value={destinationCity}
                      onChange={(e) => setDestinationCity(e.target.value)}
                      className="w-full px-3 py-2 bg-forest-900 border border-emerald-800/40 rounded-xl text-white"
                    />
                  </div>

                  <div>
                    <label className="block text-stone-300 font-semibold mb-1">
                      {language === 'te' ? 'రాష్ట్రం' : 'State'}
                    </label>
                    <select
                      value={destinationState}
                      onChange={(e) => setDestinationState(e.target.value)}
                      className="w-full px-3 py-2 bg-forest-900 border border-emerald-800/40 rounded-xl text-white"
                    >
                      {INDIAN_STATES.map((s) => (
                        <option key={s} value={s}>
                          {s}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>

                <div>
                  <label className="block text-stone-300 font-semibold mb-1">
                    {t('rfqSpecsField')} *
                  </label>
                  <textarea
                    rows={3}
                    required
                    value={specifications}
                    onChange={(e) => setSpecifications(e.target.value)}
                    placeholder="Conforming to IS 3812 Part 1, moisture < 2%, Blaine fineness > 300 m²/kg..."
                    className="w-full px-3 py-2 bg-forest-900 border border-emerald-800/40 rounded-xl text-white placeholder-stone-500"
                  />
                </div>

                <div className="flex gap-2 justify-end pt-3 border-t border-emerald-950">
                  <button
                    type="button"
                    onClick={() => setCreateModalOpen(false)}
                    className="px-4 py-2 text-stone-300 hover:text-white"
                  >
                    {t('cancelAction')}
                  </button>
                  <button
                    type="submit"
                    className="px-5 py-2 bg-emerald-600 hover:bg-emerald-500 rounded-xl font-bold text-white shadow-md"
                  >
                    {language === 'te' ? 'RFQను ప్రచురించండి' : 'Broadcast RFQ to Suppliers'}
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}

        {/* --- Compare Supplier Quotations Modal --- */}
        {compareRfqId && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/75 backdrop-blur-sm animate-fadeIn">
            <div className="relative w-full max-w-3xl bg-forest-950 border border-emerald-800/60 rounded-3xl p-6 text-white space-y-4">
              <div className="flex items-center justify-between pb-3 border-b border-emerald-900/60">
                <h3 className="font-bold text-base text-emerald-200 flex items-center gap-2">
                  <Scale className="w-5 h-5 text-lime-400" />
                  {t('rfqCompareModalTitle')}
                </h3>
                <button
                  onClick={() => setCompareRfqId(null)}
                  className="p-1 rounded-lg text-stone-400 hover:text-white"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              {rfqQuotations.length === 0 ? (
                <div className="py-8 text-center text-xs text-stone-400 space-y-2">
                  <p>
                    {language === 'te'
                      ? 'ఈ RFQ కోసం ఇంకా కొటేషన్లు అందలేదు. సరఫరాదారుల బిడ్‌ల కోసం వేచి ఉండండి.'
                      : 'No supplier quotations received for this requirement yet.'}
                  </p>
                </div>
              ) : (
                <div className="space-y-3">
                  {rfqQuotations.map((q) => (
                    <div
                      key={q.id}
                      className="p-4 rounded-2xl bg-forest-900/60 border border-emerald-900/50 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3 text-xs"
                    >
                      <div className="space-y-1">
                        <div className="font-bold text-white text-sm">{q.sellerName}</div>
                        <div className="text-stone-400">{q.deliveryTerms}</div>
                        <div className="text-emerald-400">Lead Time: ~{q.estDeliveryDays} Days</div>
                      </div>
                      <div className="text-right flex sm:flex-col items-center sm:items-end justify-between w-full sm:w-auto">
                        <div className="text-base font-black text-emerald-300">
                          ₹{q.unitPrice} / {q.unit}
                        </div>
                        <button
                          onClick={() => {
                            updateQuotationStatus(q.id, 'ACCEPTED');
                            setCompareRfqId(null);
                          }}
                          className="mt-1 px-4 py-1.5 bg-emerald-600 hover:bg-emerald-500 rounded-lg text-white font-bold"
                        >
                          Award & Order
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
