'use client';

import React from 'react';
import { useApp } from '@/context/AppContext';
import { ResourceListing } from '@/types';
import {
  MapPin,
  ShieldCheck,
  ShieldAlert,
  Bookmark,
  ArrowUpRight,
  Sparkles,
} from 'lucide-react';

interface ResourceCardProps {
  listing: ResourceListing;
  onSelect: (listing: ResourceListing) => void;
  onRequestQuote?: (listing: ResourceListing) => void;
}

export function ResourceCard({ listing, onSelect, onRequestQuote }: ResourceCardProps) {
  const { t, language, savedListingIds, toggleSaveListing } = useApp();
  const isSaved = savedListingIds.includes(listing.id);

  const title = language === 'te' && listing.titleTe ? listing.titleTe : listing.title;
  const description =
    language === 'te' && listing.descriptionTe ? listing.descriptionTe : listing.description;

  return (
    <div className="group relative rounded-2xl bg-forest-950/90 border border-emerald-900/50 hover:border-emerald-500/60 shadow-lg hover:shadow-2xl hover:shadow-emerald-950/60 transition-all duration-300 flex flex-col overflow-hidden text-stone-200">
      {/* Top Image Box */}
      <div className="relative aspect-[16/10] overflow-hidden bg-forest-900">
        <img
          src={listing.images[0] || 'https://images.unsplash.com/photo-1578575437130-527eed3abbec?auto=format&fit=crop&w=800&q=80'}
          alt={listing.title}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
        />

        {/* Top Badges */}
        <div className="absolute top-2.5 left-2.5 right-2.5 flex items-start justify-between gap-2 pointer-events-none">
          <div className="flex flex-col gap-1">
            <span className="pointer-events-auto px-2 py-0.5 rounded-md text-[10px] font-extrabold uppercase tracking-wide bg-emerald-950/90 text-emerald-300 border border-emerald-600/40 backdrop-blur-md">
              {t(`cat_${listing.category}` as keyof typeof t)}
            </span>
            <span className="pointer-events-auto px-2 py-0.5 rounded-md text-[10px] font-medium bg-forest-950/80 text-lime-400 border border-emerald-800/40 backdrop-blur-md">
              {t(`type_${listing.resourceType}` as keyof typeof t)}
            </span>
          </div>

          <button
            type="button"
            onClick={(e) => {
              e.stopPropagation();
              toggleSaveListing(listing.id);
            }}
            className={`pointer-events-auto p-2 rounded-xl backdrop-blur-md border transition-all ${
              isSaved
                ? 'bg-emerald-600 text-white border-emerald-400 shadow-md'
                : 'bg-forest-950/70 text-stone-300 hover:text-white border-emerald-900/50 hover:bg-forest-900'
            }`}
            aria-label={isSaved ? t('savedItem') : t('saveItem')}
          >
            <Bookmark className="w-3.5 h-3.5" />
          </button>
        </div>

        {/* Bottom Verification Banner on Image */}
        <div className="absolute bottom-2 left-2.5 right-2.5">
          {listing.hasLabTestReport ? (
            <span className="inline-flex items-center gap-1 text-[10px] font-bold px-2 py-0.5 rounded-full bg-emerald-950/90 text-emerald-300 border border-emerald-500/50 backdrop-blur-md shadow-sm">
              <ShieldCheck className="w-3 h-3 text-emerald-400" />
              {t('verifiedMaterialBadge')}
            </span>
          ) : (
            <span className="inline-flex items-center gap-1 text-[10px] font-medium px-2 py-0.5 rounded-full bg-amber-950/90 text-amber-300 border border-amber-600/40 backdrop-blur-md shadow-sm">
              <ShieldAlert className="w-3 h-3 text-amber-400" />
              {t('sellerProvidedClaim')}
            </span>
          )}
        </div>
      </div>

      {/* Card Content */}
      <div className="p-4 flex-1 flex flex-col justify-between space-y-3">
        <div>
          <div className="flex items-center gap-1 text-[11px] text-emerald-400 font-medium">
            <MapPin className="w-3 h-3 shrink-0" />
            <span className="truncate">
              {listing.locationCity}, {listing.locationState}
            </span>
          </div>

          <h3
            onClick={() => onSelect(listing)}
            className="font-bold text-sm text-stone-100 hover:text-emerald-300 cursor-pointer mt-1 line-clamp-1 transition-colors"
          >
            {title}
          </h3>

          <p className="text-xs text-stone-400 line-clamp-2 mt-1 leading-relaxed">
            {description}
          </p>
        </div>

        {/* Quantities & Price Grid */}
        <div className="pt-2 border-t border-emerald-950/80 space-y-2">
          <div className="flex items-center justify-between text-xs">
            <div>
              <span className="text-[10px] text-stone-400 block">{language === 'te' ? 'లభ్యత' : 'Available'}:</span>
              <span className="font-bold text-stone-200">
                {listing.quantity} {listing.unit}
              </span>
            </div>
            <div className="text-right">
              <span className="text-[10px] text-stone-400 block">{t('moqLabel')}:</span>
              <span className="font-semibold text-emerald-400">
                {listing.minOrderQuantity} {listing.unit}
              </span>
            </div>
          </div>

          {/* Pricing Row */}
          <div className="flex items-center justify-between pt-1">
            <div>
              <span className="text-base font-extrabold text-emerald-300">
                ₹{listing.pricePerUnit.toLocaleString('en-IN')}
              </span>
              <span className="text-[10px] text-stone-400 ml-1">/ {listing.unit}</span>
            </div>

            <button
              type="button"
              onClick={() => onSelect(listing)}
              className="px-3 py-1.5 rounded-xl bg-forest-900 hover:bg-emerald-900/60 border border-emerald-800/60 text-xs font-semibold text-emerald-200 hover:text-white flex items-center gap-1 transition-colors"
            >
              <span>{t('viewDetailsBtn')}</span>
              <ArrowUpRight className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
