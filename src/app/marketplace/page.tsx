'use client';

import React, { useState, useMemo, useEffect, Suspense } from 'react';
import { useSearchParams } from 'next/navigation';
import { useApp } from '@/context/AppContext';
import { ResourceListing, MaterialCategory, ResourceType, MaterialCondition, MaterialGrade } from '@/types';
import { ResourceCard } from '@/components/ResourceCard';
import { ResourceDetailModal } from '@/components/ResourceDetailModal';
import {
  Search,
  Filter,
  SlidersHorizontal,
  X,
  LayoutGrid,
  List,
  Bookmark,
  CheckCircle2,
  ShieldCheck,
  MapPin,
  RefreshCw,
  PlusCircle,
  ArrowUpDown,
  Sparkles,
} from 'lucide-react';
import Link from 'next/link';

const INDIAN_STATES = [
  'All States',
  'Telangana',
  'Andhra Pradesh',
  'Maharashtra',
  'Tamil Nadu',
  'Karnataka',
  'Gujarat',
];

function MarketplaceContent() {
  const searchParams = useSearchParams();
  const initialQuery = searchParams.get('q') || '';
  const initialCategory = searchParams.get('cat') || 'ALL';

  const { t, language, listings, savedListingIds } = useApp();

  // Search & Filter States
  const [search, setSearch] = useState(initialQuery);
  const [selectedCategory, setSelectedCategory] = useState<string>(initialCategory);
  const [selectedType, setSelectedType] = useState<string>('ALL');
  const [selectedCondition, setSelectedCondition] = useState<string>('ALL');
  const [selectedGrade, setSelectedGrade] = useState<string>('ALL');
  const [selectedState, setSelectedState] = useState<string>('All States');
  const [maxPrice, setMaxPrice] = useState<number>(10000);
  const [maxMoq, setMaxMoq] = useState<number>(100);
  const [verifiedSellerOnly, setVerifiedSellerOnly] = useState(false);
  const [labTestedOnly, setLabTestedOnly] = useState(false);
  const [showSavedOnly, setShowSavedOnly] = useState(false);

  // Layout & Sorting
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [sortBy, setSortBy] = useState<'newest' | 'price_low' | 'price_high' | 'qty_high'>('newest');
  const [mobileFilterOpen, setMobileFilterOpen] = useState(false);

  // Active detail modal
  const [activeListing, setActiveListing] = useState<ResourceListing | null>(null);

  // Update query when URL params change
  useEffect(() => {
    if (initialQuery) setSearch(initialQuery);
    if (initialCategory) setSelectedCategory(initialCategory);
  }, [initialQuery, initialCategory]);

  const categories: { key: string; label: string }[] = [
    { key: 'ALL', label: t('cat_ALL') },
    { key: 'INDUSTRIAL_SLAG_ASH', label: t('cat_INDUSTRIAL_SLAG_ASH') },
    { key: 'PLASTICS', label: t('cat_PLASTICS') },
    { key: 'METALS', label: t('cat_METALS') },
    { key: 'PAPER_CARDBOARD', label: t('cat_PAPER_CARDBOARD') },
    { key: 'TEXTILES', label: t('cat_TEXTILES') },
    { key: 'CHEMICALS_SOLVENTS', label: t('cat_CHEMICALS_SOLVENTS') },
    { key: 'RUBBER', label: t('cat_RUBBER') },
    { key: 'AGRO_WASTE', label: t('cat_AGRO_WASTE') },
    { key: 'GLASS', label: t('cat_GLASS') },
    { key: 'ELECTRONICS_EWALL', label: t('cat_ELECTRONICS_EWALL') },
  ];

  const clearFilters = () => {
    setSearch('');
    setSelectedCategory('ALL');
    setSelectedType('ALL');
    setSelectedCondition('ALL');
    setSelectedGrade('ALL');
    setSelectedState('All States');
    setMaxPrice(10000);
    setMaxMoq(100);
    setVerifiedSellerOnly(false);
    setLabTestedOnly(false);
    setShowSavedOnly(false);
  };

  // Filter & sort logic
  const filteredListings = useMemo(() => {
    return listings
      .filter((item) => {
        // Status filter
        if (item.status !== 'ACTIVE') return false;

        // Saved only tab
        if (showSavedOnly && !savedListingIds.includes(item.id)) return false;

        // Search text
        if (search.trim()) {
          const q = search.toLowerCase();
          const matchTitle = item.title.toLowerCase().includes(q) || (item.titleTe && item.titleTe.toLowerCase().includes(q));
          const matchDesc = item.description.toLowerCase().includes(q) || (item.descriptionTe && item.descriptionTe.toLowerCase().includes(q));
          const matchLoc = item.locationCity.toLowerCase().includes(q) || item.locationState.toLowerCase().includes(q);
          const matchSeller = item.sellerName.toLowerCase().includes(q);
          if (!matchTitle && !matchDesc && !matchLoc && !matchSeller) return false;
        }

        // Category
        if (selectedCategory !== 'ALL' && item.category !== selectedCategory) return false;

        // Resource Type
        if (selectedType !== 'ALL' && item.resourceType !== selectedType) return false;

        // Condition
        if (selectedCondition !== 'ALL' && item.condition !== selectedCondition) return false;

        // Grade
        if (selectedGrade !== 'ALL' && item.grade !== selectedGrade) return false;

        // State
        if (selectedState !== 'All States' && item.locationState !== selectedState) return false;

        // Price
        if (item.pricePerUnit > maxPrice) return false;

        // MOQ
        if (item.minOrderQuantity > maxMoq) return false;

        // Verified seller
        if (verifiedSellerOnly && !item.isVerifiedSeller) return false;

        // Lab tested
        if (labTestedOnly && !item.hasLabTestReport) return false;

        return true;
      })
      .sort((a, b) => {
        if (sortBy === 'price_low') return a.pricePerUnit - b.pricePerUnit;
        if (sortBy === 'price_high') return b.pricePerUnit - a.pricePerUnit;
        if (sortBy === 'qty_high') return b.quantity - a.quantity;
        return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();
      });
  }, [
    listings,
    search,
    selectedCategory,
    selectedType,
    selectedCondition,
    selectedGrade,
    selectedState,
    maxPrice,
    maxMoq,
    verifiedSellerOnly,
    labTestedOnly,
    showSavedOnly,
    savedListingIds,
    sortBy,
  ]);

  return (
    <div className="flex-1 bg-[#06241a] text-stone-100 min-h-screen py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6">
        {/* Marketplace Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 pb-4 border-b border-emerald-900/40">
          <div>
            <h1 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
              {t('marketplaceTitle')}
            </h1>
            <p className="text-xs sm:text-sm text-stone-300 mt-1">
              {t('marketplaceSubtitle')}
            </p>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={() => setShowSavedOnly(!showSavedOnly)}
              className={`px-3.5 py-2 rounded-xl text-xs font-bold flex items-center gap-1.5 transition-all border ${
                showSavedOnly
                  ? 'bg-emerald-600 border-emerald-400 text-white'
                  : 'bg-forest-900 border-emerald-800/40 text-stone-300 hover:text-white'
              }`}
            >
              <Bookmark className="w-3.5 h-3.5" />
              <span>{language === 'te' ? 'భద్రపరచినవి' : 'Saved'} ({savedListingIds.length})</span>
            </button>

            <Link
              href="/list-resource"
              className="px-4 py-2 rounded-xl bg-gradient-to-r from-emerald-600 to-emerald-500 hover:from-emerald-500 text-white text-xs font-bold flex items-center gap-1.5 shadow-md shadow-emerald-950/40"
            >
              <PlusCircle className="w-4 h-4" />
              <span>{t('navListResource')}</span>
            </Link>
          </div>
        </div>

        {/* Category Filter Pills (Horizontal Scroll) */}
        <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-none">
          {categories.map((cat) => {
            const isSelected = selectedCategory === cat.key;
            return (
              <button
                key={cat.key}
                type="button"
                onClick={() => setSelectedCategory(cat.key)}
                className={`px-3 py-1.5 rounded-xl text-xs font-semibold whitespace-nowrap transition-all border ${
                  isSelected
                    ? 'bg-emerald-600 border-emerald-400 text-white shadow-md shadow-emerald-950/50'
                    : 'bg-forest-900/60 border-emerald-900/40 text-stone-300 hover:text-white hover:bg-forest-900'
                }`}
              >
                {cat.label}
              </button>
            );
          })}
        </div>

        {/* Main Grid: Filters Sidebar + Listings Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6 items-start">
          {/* Mobile Filter Toggle Button */}
          <div className="lg:hidden flex items-center justify-between">
            <button
              onClick={() => setMobileFilterOpen(!mobileFilterOpen)}
              className="px-4 py-2 bg-forest-900 border border-emerald-800/50 rounded-xl text-xs font-bold text-emerald-300 flex items-center gap-2"
            >
              <Filter className="w-4 h-4" />
              <span>{t('filterTitle')}</span>
            </button>

            <span className="text-xs text-stone-400">
              {filteredListings.length} {t('searchResultCount')}
            </span>
          </div>

          {/* Sidebar Filters */}
          <aside
            className={`space-y-5 p-5 bg-forest-950/90 border border-emerald-900/50 rounded-2xl ${
              mobileFilterOpen ? 'block' : 'hidden lg:block'
            }`}
          >
            <div className="flex items-center justify-between pb-3 border-b border-emerald-900/50">
              <h2 className="text-sm font-bold text-white flex items-center gap-2">
                <SlidersHorizontal className="w-4 h-4 text-emerald-400" />
                {t('filterTitle')}
              </h2>
              <button
                type="button"
                onClick={clearFilters}
                className="text-xs text-emerald-400 hover:text-emerald-300 font-medium"
              >
                {t('filterClear')}
              </button>
            </div>

            {/* Keyword Search */}
            <div>
              <label className="block text-xs font-medium text-stone-300 mb-1">
                {language === 'te' ? 'కీవర్డ్ శోధన' : 'Search Term'}
              </label>
              <div className="relative">
                <Search className="w-3.5 h-3.5 text-stone-400 absolute left-3 top-2.5" />
                <input
                  type="text"
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  placeholder="Fly ash, PET, Cotton..."
                  className="w-full pl-8 pr-3 py-1.5 bg-forest-900 border border-emerald-800/40 rounded-xl text-xs text-white placeholder-stone-500 focus:outline-none focus:border-emerald-500"
                />
              </div>
            </div>

            {/* Resource Type */}
            <div>
              <label className="block text-xs font-medium text-stone-300 mb-1">
                {t('filterType')}
              </label>
              <select
                value={selectedType}
                onChange={(e) => setSelectedType(e.target.value)}
                className="w-full px-2.5 py-1.5 bg-forest-900 border border-emerald-800/40 rounded-xl text-xs text-white focus:outline-none"
              >
                <option value="ALL">All Classifications</option>
                <option value="BY_PRODUCT">{t('type_BY_PRODUCT')}</option>
                <option value="RECYCLED_FEEDSTOCK">{t('type_RECYCLED_FEEDSTOCK')}</option>
                <option value="SURPLUS">{t('type_SURPLUS')}</option>
                <option value="WASTE">{t('type_WASTE')}</option>
                <option value="VIRGIN_RAW">{t('type_VIRGIN_RAW')}</option>
              </select>
            </div>

            {/* State / Region */}
            <div>
              <label className="block text-xs font-medium text-stone-300 mb-1">
                {t('filterState')}
              </label>
              <select
                value={selectedState}
                onChange={(e) => setSelectedState(e.target.value)}
                className="w-full px-2.5 py-1.5 bg-forest-900 border border-emerald-800/40 rounded-xl text-xs text-white focus:outline-none"
              >
                {INDIAN_STATES.map((s) => (
                  <option key={s} value={s}>
                    {s}
                  </option>
                ))}
              </select>
            </div>

            {/* Condition / Physical Form */}
            <div>
              <label className="block text-xs font-medium text-stone-300 mb-1">
                {t('filterCondition')}
              </label>
              <select
                value={selectedCondition}
                onChange={(e) => setSelectedCondition(e.target.value)}
                className="w-full px-2.5 py-1.5 bg-forest-900 border border-emerald-800/40 rounded-xl text-xs text-white focus:outline-none"
              >
                <option value="ALL">All Physical States</option>
                <option value="CLEAN_PROCESSED">{t('cond_CLEAN_PROCESSED')}</option>
                <option value="PELLETIZED">{t('cond_PELLETIZED')}</option>
                <option value="BALED">{t('cond_BALED')}</option>
                <option value="SHREDDED">{t('cond_SHREDDED')}</option>
                <option value="LIQUID_DRUMMED">{t('cond_LIQUID_DRUMMED')}</option>
              </select>
            </div>

            {/* Max Price Slider */}
            <div>
              <div className="flex justify-between text-xs mb-1">
                <span className="text-stone-300">{t('filterPrice')}:</span>
                <span className="font-bold text-emerald-300">₹{maxPrice.toLocaleString('en-IN')}</span>
              </div>
              <input
                type="range"
                min="50"
                max="10000"
                step="50"
                value={maxPrice}
                onChange={(e) => setMaxPrice(Number(e.target.value))}
                className="w-full accent-emerald-500 bg-forest-900 h-1.5 rounded cursor-pointer"
              />
            </div>

            {/* Max MOQ Slider (Small Business Friendly) */}
            <div>
              <div className="flex justify-between text-xs mb-1">
                <span className="text-stone-300">
                  {language === 'te' ? 'గరిష్ట MOQ పరిమితి' : 'Max MOQ Threshold'}:
                </span>
                <span className="font-bold text-lime-400">{maxMoq} Units/MT</span>
              </div>
              <input
                type="range"
                min="1"
                max="100"
                step="1"
                value={maxMoq}
                onChange={(e) => setMaxMoq(Number(e.target.value))}
                className="w-full accent-lime-400 bg-forest-900 h-1.5 rounded cursor-pointer"
              />
              <span className="text-[10px] text-stone-400">
                {language === 'te' ? 'చిన్న వ్యాపారాలకు సులభతర కొనుగోలు' : 'Filter lots accessible for MSME micro-orders'}
              </span>
            </div>

            {/* Checkbox Toggles */}
            <div className="pt-2 border-t border-emerald-900/50 space-y-2.5">
              <label className="flex items-center gap-2 cursor-pointer text-xs text-stone-300 hover:text-white">
                <input
                  type="checkbox"
                  checked={verifiedSellerOnly}
                  onChange={(e) => setVerifiedSellerOnly(e.target.checked)}
                  className="rounded accent-emerald-500"
                />
                <span>{t('filterVerifiedOnly')}</span>
              </label>

              <label className="flex items-center gap-2 cursor-pointer text-xs text-stone-300 hover:text-white">
                <input
                  type="checkbox"
                  checked={labTestedOnly}
                  onChange={(e) => setLabTestedOnly(e.target.checked)}
                  className="rounded accent-emerald-500"
                />
                <span>{t('filterLabReportOnly')}</span>
              </label>
            </div>
          </aside>

          {/* Listings Container */}
          <main className="lg:col-span-3 space-y-4">
            {/* Sorting & Views Bar */}
            <div className="p-3 bg-forest-950/80 border border-emerald-900/50 rounded-2xl flex flex-wrap items-center justify-between gap-3 text-xs">
              <div className="text-stone-300 font-medium">
                <span className="font-bold text-white text-sm">{filteredListings.length}</span>{' '}
                {t('searchResultCount')}
              </div>

              <div className="flex items-center gap-3">
                {/* Sort Dropdown */}
                <div className="flex items-center gap-1.5">
                  <ArrowUpDown className="w-3.5 h-3.5 text-stone-400" />
                  <select
                    value={sortBy}
                    onChange={(e) => setSortBy(e.target.value as any)}
                    className="bg-forest-900 border border-emerald-800/40 rounded-xl px-2.5 py-1 text-xs text-stone-200 focus:outline-none"
                  >
                    <option value="newest">{t('sortNewest')}</option>
                    <option value="price_low">{t('sortPriceLow')}</option>
                    <option value="price_high">{t('sortPriceHigh')}</option>
                    <option value="qty_high">{t('sortQtyHigh')}</option>
                  </select>
                </div>

                {/* Grid / List Switcher */}
                <div className="flex items-center bg-forest-900 rounded-xl border border-emerald-900/40 p-0.5">
                  <button
                    type="button"
                    onClick={() => setViewMode('grid')}
                    className={`p-1.5 rounded-lg transition-colors ${
                      viewMode === 'grid' ? 'bg-emerald-600 text-white' : 'text-stone-400 hover:text-white'
                    }`}
                    title={t('viewGrid')}
                  >
                    <LayoutGrid className="w-3.5 h-3.5" />
                  </button>
                  <button
                    type="button"
                    onClick={() => setViewMode('list')}
                    className={`p-1.5 rounded-lg transition-colors ${
                      viewMode === 'list' ? 'bg-emerald-600 text-white' : 'text-stone-400 hover:text-white'
                    }`}
                    title={t('viewList')}
                  >
                    <List className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            </div>

            {/* Empty State */}
            {filteredListings.length === 0 ? (
              <div className="p-12 text-center bg-forest-950/60 border border-emerald-900/40 rounded-3xl space-y-4">
                <div className="w-12 h-12 rounded-2xl bg-forest-900 border border-emerald-800/40 flex items-center justify-center mx-auto text-stone-400">
                  <Search className="w-6 h-6" />
                </div>
                <h3 className="text-base font-bold text-white">
                  {t('emptyListingsTitle')}
                </h3>
                <p className="text-xs text-stone-400 max-w-md mx-auto">
                  {t('emptyListingsDesc')}
                </p>
                <div className="flex justify-center gap-3 pt-2">
                  <button
                    onClick={clearFilters}
                    className="px-4 py-2 rounded-xl bg-forest-900 hover:bg-forest-800 text-xs font-semibold text-stone-200 border border-emerald-800/40"
                  >
                    {t('filterClear')}
                  </button>
                  <Link
                    href="/rfq-center"
                    className="px-4 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-xs font-bold text-white"
                  >
                    {t('createRfqBtn')}
                  </Link>
                </div>
              </div>
            ) : viewMode === 'grid' ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
                {filteredListings.map((listing) => (
                  <ResourceCard
                    key={listing.id}
                    listing={listing}
                    onSelect={(item) => setActiveListing(item)}
                  />
                ))}
              </div>
            ) : (
              /* List View */
              <div className="space-y-3">
                {filteredListings.map((listing) => {
                  const title = language === 'te' && listing.titleTe ? listing.titleTe : listing.title;
                  return (
                    <div
                      key={listing.id}
                      onClick={() => setActiveListing(listing)}
                      className="p-4 rounded-2xl bg-forest-950/90 border border-emerald-900/50 hover:border-emerald-500/60 shadow-md hover:shadow-xl transition-all cursor-pointer flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4"
                    >
                      <div className="flex items-center gap-4">
                        <img
                          src={listing.images[0]}
                          alt={listing.title}
                          className="w-20 h-16 rounded-xl object-cover border border-emerald-800/40 shrink-0"
                        />
                        <div className="space-y-1">
                          <div className="flex items-center gap-2">
                            <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-emerald-950 text-emerald-300 border border-emerald-600/30">
                              {t(`cat_${listing.category}` as keyof typeof t)}
                            </span>
                            {listing.hasLabTestReport && (
                              <span className="text-[10px] text-emerald-400 font-semibold flex items-center gap-1">
                                <ShieldCheck className="w-3 h-3" /> Lab Tested
                              </span>
                            )}
                          </div>
                          <h3 className="font-bold text-sm text-stone-100 hover:text-emerald-300">
                            {title}
                          </h3>
                          <div className="text-[11px] text-stone-400 flex items-center gap-2">
                            <span className="flex items-center gap-1 text-emerald-400">
                              <MapPin className="w-3 h-3" />
                              {listing.locationCity}, {listing.locationState}
                            </span>
                            <span>•</span>
                            <span>{listing.sellerName}</span>
                          </div>
                        </div>
                      </div>

                      <div className="text-right sm:border-l sm:border-emerald-950 sm:pl-6 w-full sm:w-auto flex sm:flex-col justify-between items-center sm:items-end">
                        <div>
                          <div className="text-base font-extrabold text-emerald-300">
                            ₹{listing.pricePerUnit} <span className="text-xs font-normal text-stone-400">/ {listing.unit}</span>
                          </div>
                          <div className="text-[11px] text-stone-400">
                            {listing.quantity} {listing.unit} Available (MOQ {listing.minOrderQuantity})
                          </div>
                        </div>
                        <button
                          type="button"
                          className="mt-2 px-3 py-1 bg-emerald-600 hover:bg-emerald-500 text-white rounded-lg text-xs font-semibold"
                        >
                          {t('viewDetailsBtn')}
                        </button>
                      </div>
                    </div>
                  );
                })}
              </div>
            )}
          </main>
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

export default function MarketplacePage() {
  return (
    <Suspense
      fallback={
        <div className="flex-1 flex items-center justify-center p-12 text-stone-400 text-sm">
          Loading Marketplace...
        </div>
      }
    >
      <MarketplaceContent />
    </Suspense>
  );
}
