'use client';

import React, { useState } from 'react';
import { useApp } from '@/context/AppContext';
import { ResourceListing } from '@/types';
import { ResourceCard } from '@/components/ResourceCard';
import { ResourceDetailModal } from '@/components/ResourceDetailModal';
import {
  Layers,
  Sparkles,
  Truck,
  Percent,
  CheckCircle2,
  Scale,
  Package,
  ArrowRight,
  ShieldCheck,
  X,
  FileSpreadsheet,
} from 'lucide-react';

export default function RawMaterialsHubPage() {
  const { t, language, listings, addToast } = useApp();
  const [selectedSubtype, setSelectedSubtype] = useState<'ALL' | 'VIRGIN_RAW' | 'RECYCLED_FEEDSTOCK' | 'BY_PRODUCT' | 'SMALL_BATCH'>('ALL');
  const [activeListing, setActiveListing] = useState<ResourceListing | null>(null);

  // Supplier Comparison Modal State
  const [compareModalOpen, setCompareModalOpen] = useState(false);
  const [selectedForCompare, setSelectedForCompare] = useState<string[]>(['list_1', 'list_2']);

  // Sample Request Modal State
  const [sampleModalListing, setSampleModalListing] = useState<ResourceListing | null>(null);
  const [sampleAddress, setSampleAddress] = useState('');
  const [sampleTestingGoal, setSampleTestingGoal] = useState('');

  const rawMaterialListings = listings.filter((item) => {
    if (selectedSubtype === 'ALL') {
      return (
        item.resourceType === 'VIRGIN_RAW' ||
        item.resourceType === 'RECYCLED_FEEDSTOCK' ||
        item.resourceType === 'SURPLUS' ||
        item.resourceType === 'BY_PRODUCT'
      );
    }
    if (selectedSubtype === 'SMALL_BATCH') {
      return item.minOrderQuantity <= 5;
    }
    return item.resourceType === selectedSubtype;
  });

  const handleToggleCompare = (id: string) => {
    setSelectedForCompare((prev) => {
      if (prev.includes(id)) {
        return prev.filter((item) => item !== id);
      }
      if (prev.length >= 3) {
        addToast(
          language === 'te'
            ? 'గరిష్టంగా 3 మెటీరియల్స్ మాత్రమే పోల్చగలరు'
            : 'You can compare up to 3 materials simultaneously',
          'info'
        );
        return prev;
      }
      return [...prev, id];
    });
  };

  const handleSampleRequestSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!sampleModalListing) return;
    addToast(
      language === 'te'
        ? `${sampleModalListing.title} కోసం నమూనా అభ్యర్థన నమోదు చేయబడింది. ల్యాబ్ శాంపిల్ కొరియర్ వివరాలు SMS చేయబడతాయి.`
        : `Sample dispatch request logged for ${sampleModalListing.title}. Courier tracking reference will follow.`,
      'success'
    );
    setSampleModalListing(null);
  };

  const compareListings = listings.filter((l) => selectedForCompare.includes(l.id));

  return (
    <div className="flex-1 bg-[#06241a] text-stone-100 min-h-screen py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 pb-6 border-b border-emerald-900/40">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-950 border border-emerald-500/40 text-xs font-bold text-emerald-300 mb-2">
              <Layers className="w-3.5 h-3.5 text-lime-400" />
              <span>{language === 'te' ? 'పారిశ్రామిక సేకరణ కేంద్రం' : 'Factory & MSME Procurement Hub'}</span>
            </div>
            <h1 className="text-2xl sm:text-4xl font-black text-white tracking-tight">
              {t('rawHubTitle')}
            </h1>
            <p className="text-xs sm:text-sm text-stone-300 mt-1 max-w-2xl leading-relaxed">
              {t('rawHubSubtitle')}
            </p>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={() => setCompareModalOpen(true)}
              className="px-4 py-2.5 rounded-xl bg-forest-900 hover:bg-forest-800 border border-emerald-700/50 text-emerald-200 text-xs font-bold flex items-center gap-2 transition-colors shadow-md"
            >
              <Scale className="w-4 h-4 text-lime-400" />
              <span>
                {t('compareSuppliers')} ({selectedForCompare.length})
              </span>
            </button>
          </div>
        </div>

        {/* Wholesale Bulk Tier Value Banner */}
        <div className="p-6 rounded-3xl bg-gradient-to-r from-forest-950 via-emerald-950 to-forest-900 border border-emerald-700/50 shadow-xl grid grid-cols-1 md:grid-cols-4 gap-4 text-xs">
          <div className="space-y-1">
            <span className="text-[10px] uppercase font-bold text-lime-400 flex items-center gap-1">
              <Percent className="w-3 h-3" /> Tier 1
            </span>
            <div className="font-extrabold text-sm text-white">1 - 5 MT (Spot Orders)</div>
            <p className="text-stone-400 text-[11px]">Standard marketplace base rate with instant dispatch booking.</p>
          </div>
          <div className="space-y-1">
            <span className="text-[10px] uppercase font-bold text-lime-400 flex items-center gap-1">
              <Percent className="w-3 h-3" /> Tier 2 (5% Off)
            </span>
            <div className="font-extrabold text-sm text-emerald-300">5 - 20 MT (Semi-Bulk)</div>
            <p className="text-stone-400 text-[11px]">Free quality re-test certificate included with lot documentation.</p>
          </div>
          <div className="space-y-1">
            <span className="text-[10px] uppercase font-bold text-lime-400 flex items-center gap-1">
              <Percent className="w-3 h-3" /> Tier 3 (10% Off)
            </span>
            <div className="font-extrabold text-sm text-lime-400">20 - 50 MT (Wholesale)</div>
            <p className="text-stone-400 text-[11px]">Coordinated freight logistics and dedicated multi-axle trailers.</p>
          </div>
          <div className="space-y-1">
            <span className="text-[10px] uppercase font-bold text-lime-400 flex items-center gap-1">
              <Percent className="w-3 h-3" /> Tier 4 (15% Off)
            </span>
            <div className="font-extrabold text-sm text-teal-300">50+ MT (Annual Contracts)</div>
            <p className="text-stone-400 text-[11px]">Direct factory pipeline agreement with scheduled monthly off-takes.</p>
          </div>
        </div>

        {/* Subtype Filter Tabs */}
        <div className="flex flex-wrap gap-2 pt-2">
          <button
            onClick={() => setSelectedSubtype('ALL')}
            className={`px-4 py-2 rounded-xl text-xs font-bold transition-all border ${
              selectedSubtype === 'ALL'
                ? 'bg-emerald-600 border-emerald-400 text-white shadow-md'
                : 'bg-forest-900/60 border-emerald-900/40 text-stone-300 hover:text-white'
            }`}
          >
            {language === 'te' ? 'అన్ని ముడి సరుకులు' : 'All Industrial Feedstocks'}
          </button>
          <button
            onClick={() => setSelectedSubtype('RECYCLED_FEEDSTOCK')}
            className={`px-4 py-2 rounded-xl text-xs font-bold transition-all border ${
              selectedSubtype === 'RECYCLED_FEEDSTOCK'
                ? 'bg-emerald-600 border-emerald-400 text-white shadow-md'
                : 'bg-forest-900/60 border-emerald-900/40 text-stone-300 hover:text-white'
            }`}
          >
            {t('type_RECYCLED_FEEDSTOCK')}
          </button>
          <button
            onClick={() => setSelectedSubtype('BY_PRODUCT')}
            className={`px-4 py-2 rounded-xl text-xs font-bold transition-all border ${
              selectedSubtype === 'BY_PRODUCT'
                ? 'bg-emerald-600 border-emerald-400 text-white shadow-md'
                : 'bg-forest-900/60 border-emerald-900/40 text-stone-300 hover:text-white'
            }`}
          >
            {t('type_BY_PRODUCT')}
          </button>
          <button
            onClick={() => setSelectedSubtype('VIRGIN_RAW')}
            className={`px-4 py-2 rounded-xl text-xs font-bold transition-all border ${
              selectedSubtype === 'VIRGIN_RAW'
                ? 'bg-emerald-600 border-emerald-400 text-white shadow-md'
                : 'bg-forest-900/60 border-emerald-900/40 text-stone-300 hover:text-white'
            }`}
          >
            {t('type_VIRGIN_RAW')}
          </button>
          <button
            onClick={() => setSelectedSubtype('SMALL_BATCH')}
            className={`px-4 py-2 rounded-xl text-xs font-bold transition-all border ${
              selectedSubtype === 'SMALL_BATCH'
                ? 'bg-lime-500 border-lime-400 text-forest-950 shadow-md font-black'
                : 'bg-forest-900/60 border-emerald-900/40 text-lime-400 hover:text-white'
            }`}
          >
            {t('smallQuantityFriendly')}
          </button>
        </div>

        {/* Material Listings Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {rawMaterialListings.map((listing) => {
            const isComparing = selectedForCompare.includes(listing.id);
            return (
              <div key={listing.id} className="relative flex flex-col">
                <ResourceCard
                  listing={listing}
                  onSelect={(item) => setActiveListing(item)}
                />
                <div className="mt-2 flex gap-2">
                  <button
                    type="button"
                    onClick={() => handleToggleCompare(listing.id)}
                    className={`flex-1 py-1.5 rounded-lg text-[11px] font-semibold border transition-colors flex items-center justify-center gap-1 ${
                      isComparing
                        ? 'bg-emerald-950 border-emerald-500 text-emerald-300'
                        : 'bg-forest-900/80 border-emerald-900/50 text-stone-400 hover:text-white'
                    }`}
                  >
                    <Scale className="w-3 h-3" />
                    <span>{isComparing ? 'Comparing' : 'Compare'}</span>
                  </button>
                  <button
                    type="button"
                    onClick={() => setSampleModalListing(listing)}
                    className="flex-1 py-1.5 rounded-lg text-[11px] font-semibold bg-forest-900 hover:bg-emerald-900/60 border border-emerald-800/40 text-stone-300 hover:text-white transition-colors flex items-center justify-center gap-1"
                  >
                    <Package className="w-3 h-3 text-lime-400" />
                    <span>{language === 'te' ? 'శాంపిల్ అడగండి' : 'Request Sample'}</span>
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* --- Compare Suppliers Modal --- */}
      {compareModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/75 backdrop-blur-sm animate-fadeIn">
          <div className="relative w-full max-w-4xl bg-forest-950 border border-emerald-800/60 rounded-3xl p-6 text-white max-h-[90vh] overflow-y-auto space-y-5">
            <div className="flex items-center justify-between pb-3 border-b border-emerald-900/60">
              <h3 className="font-bold text-lg text-emerald-200 flex items-center gap-2">
                <Scale className="w-5 h-5 text-lime-400" />
                {t('compareSuppliers')}
              </h3>
              <button
                onClick={() => setCompareModalOpen(false)}
                className="p-1 rounded-lg text-stone-400 hover:text-white"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {compareListings.length === 0 ? (
              <p className="text-xs text-stone-400 text-center py-8">
                {language === 'te'
                  ? 'దయచేసి పోల్చడానికి కనీసం రెండు ముడి సరుకులను ఎంచుకోండి.'
                  : 'Please select 2 or 3 materials from the list to compare specifications and commercial rates.'}
              </p>
            ) : (
              <div className="overflow-x-auto">
                <table className="w-full text-xs text-left border-collapse">
                  <thead>
                    <tr className="border-b border-emerald-900 text-stone-400">
                      <th className="p-3">Specification / Metric</th>
                      {compareListings.map((item) => (
                        <th key={item.id} className="p-3 text-white font-bold min-w-[200px]">
                          {language === 'te' && item.titleTe ? item.titleTe : item.title}
                        </th>
                      ))}
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-emerald-950 text-stone-300">
                    <tr>
                      <td className="p-3 font-medium text-stone-400">Supplier & Facility</td>
                      {compareListings.map((item) => (
                        <td key={item.id} className="p-3 text-emerald-300 font-semibold">
                          {item.sellerName}
                        </td>
                      ))}
                    </tr>
                    <tr>
                      <td className="p-3 font-medium text-stone-400">Price per Unit</td>
                      {compareListings.map((item) => (
                        <td key={item.id} className="p-3 text-base font-black text-white">
                          ₹{item.pricePerUnit} / {item.unit}
                        </td>
                      ))}
                    </tr>
                    <tr>
                      <td className="p-3 font-medium text-stone-400">Min Order Quantity (MOQ)</td>
                      {compareListings.map((item) => (
                        <td key={item.id} className="p-3 font-bold text-lime-400">
                          {item.minOrderQuantity} {item.unit}
                        </td>
                      ))}
                    </tr>
                    <tr>
                      <td className="p-3 font-medium text-stone-400">Location & Hub</td>
                      {compareListings.map((item) => (
                        <td key={item.id} className="p-3">
                          {item.locationCity}, {item.locationState}
                        </td>
                      ))}
                    </tr>
                    <tr>
                      <td className="p-3 font-medium text-stone-400">Quality Grade</td>
                      {compareListings.map((item) => (
                        <td key={item.id} className="p-3">
                          {item.grade}
                        </td>
                      ))}
                    </tr>
                    <tr>
                      <td className="p-3 font-medium text-stone-400">Lab Test Report</td>
                      {compareListings.map((item) => (
                        <td key={item.id} className="p-3">
                          {item.hasLabTestReport ? (
                            <span className="text-emerald-400 font-bold flex items-center gap-1">
                              <ShieldCheck className="w-4 h-4" /> Attached (PDF)
                            </span>
                          ) : (
                            <span className="text-stone-400">Self-Reported</span>
                          )}
                        </td>
                      ))}
                    </tr>
                    <tr>
                      <td className="p-3 font-medium text-stone-400">Chemical Composition</td>
                      {compareListings.map((item) => (
                        <td key={item.id} className="p-3 font-mono text-[11px] text-emerald-200">
                          {item.chemicalComposition || 'Standard industrial specs'}
                        </td>
                      ))}
                    </tr>
                  </tbody>
                </table>
              </div>
            )}
          </div>
        </div>
      )}

      {/* --- Request Material Sample Modal --- */}
      {sampleModalListing && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/75 backdrop-blur-sm animate-fadeIn">
          <div className="relative w-full max-w-md bg-forest-950 border border-emerald-800/60 rounded-3xl p-6 text-white space-y-4">
            <div className="flex items-center justify-between pb-3 border-b border-emerald-900/60">
              <h3 className="font-bold text-base text-emerald-200 flex items-center gap-2">
                <Package className="w-5 h-5 text-lime-400" />
                {t('requestSample')}
              </h3>
              <button
                onClick={() => setSampleModalListing(null)}
                className="p-1 rounded-lg text-stone-400 hover:text-white"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <p className="text-xs text-stone-300">
              {language === 'te'
                ? `మీ ఫ్యాక్టరీ లేదా ల్యాబ్ టెస్టింగ్ కోసం ${sampleModalListing.title} నమూనాను (2-5 kg) అభ్యర్థించండి.`
                : `Request a qualified 2-5 kg laboratory evaluation sample for ${sampleModalListing.title}.`}
            </p>

            <form onSubmit={handleSampleRequestSubmit} className="space-y-3 text-xs">
              <div>
                <label className="block text-stone-300 mb-1">
                  {language === 'te' ? 'ల్యాబ్ / ఫ్యాక్టరీ డెలివరీ చిరునామా' : 'Testing Laboratory / Plant Address'}
                </label>
                <textarea
                  rows={2}
                  required
                  value={sampleAddress}
                  onChange={(e) => setSampleAddress(e.target.value)}
                  placeholder="Plot No 44, Industrial Development Area..."
                  className="w-full px-3 py-2 bg-forest-900 border border-emerald-800/40 rounded-xl text-white"
                />
              </div>

              <div>
                <label className="block text-stone-300 mb-1">
                  {language === 'te' ? 'ల్యాబ్ టెస్టింగ్ లక్ష్యం' : 'Test Scope & Intended Target Application'}
                </label>
                <input
                  type="text"
                  required
                  value={sampleTestingGoal}
                  onChange={(e) => setSampleTestingGoal(e.target.value)}
                  placeholder="e.g. Tensile strength evaluation for yarn extrusion"
                  className="w-full px-3 py-2 bg-forest-900 border border-emerald-800/40 rounded-xl text-white"
                />
              </div>

              <div className="p-3 bg-forest-900/50 rounded-xl border border-emerald-900/50 text-[11px] text-stone-400">
                Sample dispatch fee is covered under CIRCUVIA MSME Subsidized Testing program for verified buyers.
              </div>

              <div className="flex gap-2 justify-end pt-2">
                <button
                  type="button"
                  onClick={() => setSampleModalListing(null)}
                  className="px-4 py-2 text-stone-300 hover:text-white"
                >
                  {t('cancelAction')}
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 bg-emerald-600 hover:bg-emerald-500 rounded-xl font-bold text-white shadow-md"
                >
                  {language === 'te' ? 'నమూనాను ఆర్డర్ చేయండి' : 'Dispatch Sample Request'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

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
