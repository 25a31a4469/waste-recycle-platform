'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useApp } from '@/context/AppContext';
import { UserRole, OrderStatus } from '@/types';
import {
  Factory,
  Store,
  Truck,
  Recycle,
  ShoppingCart,
  ShieldCheck,
  Package,
  FileText,
  TrendingUp,
  Clock,
  CheckCircle2,
  AlertTriangle,
  FileCheck,
  MessageSquare,
  PlusCircle,
  ExternalLink,
  ChevronRight,
  Bookmark,
  Scale,
  X,
  Upload,
  Sparkles,
} from 'lucide-react';

export default function DashboardPage() {
  const {
    t,
    language,
    currentRole,
    setRole,
    currentUser,
    listings,
    updateListingStatus,
    savedListingIds,
    rfqs,
    quotations,
    orders,
    updateOrderStatus,
    messages,
    sendMessage,
    verificationDocs,
    approveVerificationDoc,
    rejectVerificationDoc,
    uploadVerificationDoc,
    disputes,
    resolveDispute,
    addToast,
  } = useApp();

  const [activeTab, setActiveTab] = useState<'overview' | 'listings' | 'orders' | 'messages' | 'verification' | 'admin'>('overview');
  const [chatReplyText, setChatReplyText] = useState('');

  // Role title & description
  const roleName = t(`role_${currentRole}` as keyof typeof t);

  // Filter items relevant to current role
  const myListings = listings.filter((l) => l.sellerId === currentUser.id);
  const myOrders = currentRole === 'BUYER' || currentRole === 'SMALL_BUSINESS'
    ? orders.filter((o) => o.buyerId === currentUser.id)
    : orders.filter((o) => o.sellerId === currentUser.id);

  const savedListings = listings.filter((l) => savedListingIds.includes(l.id));

  const handleSendChatReply = (e: React.FormEvent) => {
    e.preventDefault();
    if (!chatReplyText.trim()) return;
    sendMessage('usr_small_1', 'P. Venkat Reddy', chatReplyText);
    setChatReplyText('');
  };

  return (
    <div className="flex-1 bg-[#06241a] text-stone-100 min-h-screen py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        {/* Profile & Role Header Banner */}
        <div className="p-6 rounded-3xl bg-forest-950 border border-emerald-800/50 shadow-2xl flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div className="flex items-center gap-4">
            <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-emerald-500 to-forest-800 flex items-center justify-center text-white text-xl font-black shadow-lg shadow-emerald-950/50 shrink-0">
              {currentUser.name[0]}
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h1 className="text-xl sm:text-2xl font-black text-white">
                  {currentUser.companyName}
                </h1>
                <span className="px-2.5 py-0.5 rounded-full text-xs font-bold bg-emerald-950 text-emerald-300 border border-emerald-500/40 flex items-center gap-1">
                  <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
                  {currentUser.verificationStatus}
                </span>
              </div>
              <div className="text-xs text-stone-400 mt-1 flex flex-wrap items-center gap-3">
                <span>Contact: {currentUser.name}</span>
                <span>•</span>
                <span>{currentUser.city}, {currentUser.state}</span>
                <span>•</span>
                <span className="text-emerald-400 font-semibold">{roleName}</span>
              </div>
            </div>
          </div>

          {/* Quick Perspective Role Switcher */}
          <div className="flex items-center gap-2 bg-forest-900/80 p-2 rounded-2xl border border-emerald-800/40">
            <span className="text-xs text-stone-400 font-medium pl-2 hidden sm:inline">
              {language === 'te' ? 'పాత్ర మార్చు:' : 'Switch Role:'}
            </span>
            {(['FACTORY', 'SMALL_BUSINESS', 'RECYCLER', 'BUYER', 'ADMIN'] as UserRole[]).map((r) => (
              <button
                key={r}
                type="button"
                onClick={() => setRole(r)}
                className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all ${
                  currentRole === r
                    ? 'bg-emerald-600 text-white shadow-md'
                    : 'text-stone-300 hover:text-white hover:bg-forest-800'
                }`}
              >
                {r === 'SMALL_BUSINESS' ? 'MSME' : r}
              </button>
            ))}
          </div>
        </div>

        {/* Dashboard Tabs */}
        <div className="flex gap-2 border-b border-emerald-900/50 pb-2 overflow-x-auto scrollbar-none">
          <button
            onClick={() => setActiveTab('overview')}
            className={`px-4 py-2 rounded-xl text-xs font-bold whitespace-nowrap transition-all ${
              activeTab === 'overview'
                ? 'bg-emerald-600 text-white shadow-md'
                : 'text-stone-300 hover:text-white hover:bg-forest-900'
            }`}
          >
            {t('dashOverview')}
          </button>
          <button
            onClick={() => setActiveTab('listings')}
            className={`px-4 py-2 rounded-xl text-xs font-bold whitespace-nowrap transition-all ${
              activeTab === 'listings'
                ? 'bg-emerald-600 text-white shadow-md'
                : 'text-stone-300 hover:text-white hover:bg-forest-900'
            }`}
          >
            {t('dashListings')} ({myListings.length})
          </button>
          <button
            onClick={() => setActiveTab('orders')}
            className={`px-4 py-2 rounded-xl text-xs font-bold whitespace-nowrap transition-all ${
              activeTab === 'orders'
                ? 'bg-emerald-600 text-white shadow-md'
                : 'text-stone-300 hover:text-white hover:bg-forest-900'
            }`}
          >
            {t('dashOrders')} ({myOrders.length})
          </button>
          <button
            onClick={() => setActiveTab('messages')}
            className={`px-4 py-2 rounded-xl text-xs font-bold whitespace-nowrap transition-all ${
              activeTab === 'messages'
                ? 'bg-emerald-600 text-white shadow-md'
                : 'text-stone-300 hover:text-white hover:bg-forest-900'
            }`}
          >
            {language === 'te' ? 'సందేశాలు' : 'Live Messages'} ({messages.length})
          </button>
          <button
            onClick={() => setActiveTab('verification')}
            className={`px-4 py-2 rounded-xl text-xs font-bold whitespace-nowrap transition-all ${
              activeTab === 'verification'
                ? 'bg-emerald-600 text-white shadow-md'
                : 'text-stone-300 hover:text-white hover:bg-forest-900'
            }`}
          >
            {t('dashVerifications')}
          </button>
          {currentRole === 'ADMIN' && (
            <button
              onClick={() => setActiveTab('admin')}
              className={`px-4 py-2 rounded-xl text-xs font-bold whitespace-nowrap transition-all ${
                activeTab === 'admin'
                  ? 'bg-purple-600 text-white shadow-md'
                  : 'text-purple-300 hover:text-white hover:bg-purple-950/40'
              }`}
            >
              {language === 'te' ? 'నిర్వాహక ప్యానెల్ (Admin)' : 'Admin Supervisory Panel'}
            </button>
          )}
        </div>

        {/* TAB 1: OVERVIEW & ROLE-SPECIFIC KPI METRICS */}
        {activeTab === 'overview' && (
          <div className="space-y-6">
            {/* KPI Cards */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              <div className="p-5 rounded-2xl bg-forest-950 border border-emerald-900/40 space-y-1">
                <span className="text-[10px] text-stone-400 uppercase font-bold tracking-wider">
                  {currentRole === 'BUYER' ? 'Monthly Procurement' : 'Residue Diverted'}
                </span>
                <div className="text-2xl font-black text-white">450 MT</div>
                <span className="text-[11px] text-emerald-400 font-medium">↑ 18% from last month</span>
              </div>
              <div className="p-5 rounded-2xl bg-forest-950 border border-emerald-900/40 space-y-1">
                <span className="text-[10px] text-stone-400 uppercase font-bold tracking-wider">
                  {currentRole === 'BUYER' ? 'Input Cost Savings' : 'Secondary Revenue'}
                </span>
                <div className="text-2xl font-black text-emerald-300">₹3,68,000</div>
                <span className="text-[11px] text-lime-400 font-medium">35% below virgin baseline</span>
              </div>
              <div className="p-5 rounded-2xl bg-forest-950 border border-emerald-900/40 space-y-1">
                <span className="text-[10px] text-stone-400 uppercase font-bold tracking-wider">
                  Verified CO₂e Offset
                </span>
                <div className="text-2xl font-black text-lime-400">414 MT CO₂e</div>
                <span className="text-[11px] text-stone-400">Certified for Scope 3 ESG</span>
              </div>
              <div className="p-5 rounded-2xl bg-forest-950 border border-emerald-900/40 space-y-1">
                <span className="text-[10px] text-stone-400 uppercase font-bold tracking-wider">
                  Active Dispatches
                </span>
                <div className="text-2xl font-black text-teal-300">3 Shipments</div>
                <span className="text-[11px] text-stone-400">Pneumatic Tankers on route</span>
              </div>
            </div>

            {/* Role Specific Narrative Advice */}
            <div className="p-6 rounded-3xl bg-forest-900/40 border border-emerald-800/40 space-y-2">
              <h3 className="font-bold text-sm text-emerald-300 flex items-center gap-2">
                <Sparkles className="w-4 h-4 text-lime-400" />
                <span>
                  {currentRole === 'FACTORY' && 'Enterprise Symbiosis Recommendation'}
                  {currentRole === 'SMALL_BUSINESS' && 'MSME Procurement Optimization'}
                  {currentRole === 'RECYCLER' && 'Recycler Washing & Purity Yield'}
                  {currentRole === 'SUPPLIER' && 'Wholesale Surplus Stock Liquidation'}
                  {currentRole === 'BUYER' && 'Sustainable Procurement Advisory'}
                  {currentRole === 'ADMIN' && 'System Integrity Status'}
                </span>
              </h3>
              <p className="text-xs text-stone-300 leading-relaxed">
                {currentRole === 'FACTORY' &&
                  'Your Ramagundam Silo 4 dry fly ash lot has 3 active quotation bids from local brick manufacturers. Accepting local dispatch will reduce regional haulage by 140 km.'}
                {currentRole === 'SMALL_BUSINESS' &&
                  'Reddy Eco-Bricks is currently saving ₹42,000 per 100 MT order by using IS 3812 fly ash instead of river sand and clinker. 2 new nearby suppliers in Karimnagar were added this week.'}
                {currentRole === 'RECYCLER' &&
                  'Your hot-washed rPET flake inventory IV test (0.76 dl/g) is eligible for premium food-contact bottle-to-bottle contracts.'}
                {currentRole === 'ADMIN' &&
                  'All platform operations are currently nominal. 1 industrial license document awaiting compliance review.'}
              </p>
            </div>

            {/* Saved Items Quick Row */}
            {savedListings.length > 0 && (
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <h3 className="text-sm font-bold text-white flex items-center gap-2">
                    <Bookmark className="w-4 h-4 text-emerald-400" />
                    <span>{language === 'te' ? 'మీరు భద్రపరచిన వస్తువులు' : 'Saved Watchlist'}</span>
                  </h3>
                  <Link href="/marketplace" className="text-xs text-emerald-400 hover:underline">
                    View in Marketplace →
                  </Link>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                  {savedListings.map((item) => (
                    <div
                      key={item.id}
                      className="p-4 rounded-2xl bg-forest-950 border border-emerald-900/50 flex items-center gap-3"
                    >
                      <img
                        src={item.images[0]}
                        alt={item.title}
                        className="w-14 h-14 rounded-xl object-cover shrink-0"
                      />
                      <div className="min-w-0 flex-1">
                        <h4 className="font-bold text-xs text-white truncate">{item.title}</h4>
                        <div className="text-[11px] text-emerald-400 font-bold mt-0.5">
                          ₹{item.pricePerUnit} / {item.unit}
                        </div>
                        <div className="text-[10px] text-stone-400 truncate">{item.sellerName}</div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        )}

        {/* TAB 2: MY LISTINGS (Seller Workflow) */}
        {activeTab === 'listings' && (
          <div className="space-y-4">
            <div className="flex justify-between items-center pb-2">
              <span className="text-xs text-stone-400">
                Manage your active industrial inventory, adjust pricing, or pause lots.
              </span>
              <Link
                href="/list-resource"
                className="px-4 py-2 bg-emerald-600 hover:bg-emerald-500 rounded-xl text-xs font-bold text-white flex items-center gap-1.5 shadow-md"
              >
                <PlusCircle className="w-4 h-4" />
                <span>{t('navListResource')}</span>
              </Link>
            </div>

            {myListings.length === 0 ? (
              <div className="p-12 text-center bg-forest-950/60 border border-emerald-900/40 rounded-3xl space-y-3">
                <p className="text-xs text-stone-400">
                  {language === 'te' ? 'మీరు ఇంకా ఎటువంటి సరుకును జాబితా చేయలేదు.' : 'No active resource listings created yet.'}
                </p>
                <Link
                  href="/list-resource"
                  className="px-4 py-2 bg-emerald-600 hover:bg-emerald-500 text-white rounded-xl text-xs font-bold inline-block"
                >
                  {t('navListResource')}
                </Link>
              </div>
            ) : (
              myListings.map((listing) => (
                <div
                  key={listing.id}
                  className="p-5 rounded-2xl bg-forest-950 border border-emerald-900/50 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4"
                >
                  <div className="flex items-center gap-4">
                    <img
                      src={listing.images[0]}
                      alt={listing.title}
                      className="w-16 h-16 rounded-xl object-cover border border-emerald-900/40 shrink-0"
                    />
                    <div className="space-y-0.5">
                      <div className="flex items-center gap-2">
                        <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-emerald-950 text-emerald-300 border border-emerald-600/30">
                          {listing.category}
                        </span>
                        <span
                          className={`text-[10px] font-bold px-2 py-0.5 rounded ${
                            listing.status === 'ACTIVE'
                              ? 'bg-emerald-950 text-emerald-300'
                              : listing.status === 'PAUSED'
                              ? 'bg-amber-950 text-amber-300'
                              : 'bg-rose-950 text-rose-300'
                          }`}
                        >
                          {listing.status}
                        </span>
                      </div>
                      <h4 className="font-bold text-sm text-white">{listing.title}</h4>
                      <div className="text-xs text-stone-400">
                        {listing.quantity} {listing.unit} • ₹{listing.pricePerUnit}/{listing.unit}
                      </div>
                    </div>
                  </div>

                  <div className="flex items-center gap-2 self-end sm:self-center">
                    {listing.status === 'ACTIVE' ? (
                      <button
                        onClick={() => updateListingStatus(listing.id, 'PAUSED')}
                        className="px-3 py-1.5 bg-forest-900 hover:bg-amber-950/60 border border-amber-800/40 rounded-xl text-xs font-semibold text-amber-200 transition-colors"
                      >
                        Pause Listing
                      </button>
                    ) : (
                      <button
                        onClick={() => updateListingStatus(listing.id, 'ACTIVE')}
                        className="px-3 py-1.5 bg-emerald-700 hover:bg-emerald-600 rounded-xl text-xs font-semibold text-white transition-colors"
                      >
                        Resume Active
                      </button>
                    )}
                    <button
                      onClick={() => updateListingStatus(listing.id, 'SOLD')}
                      className="px-3 py-1.5 bg-forest-900 hover:bg-forest-800 border border-emerald-800/40 rounded-xl text-xs font-semibold text-stone-300 transition-colors"
                    >
                      Mark as Sold
                    </button>
                  </div>
                </div>
              ))
            )}
          </div>
        )}

        {/* TAB 3: ORDERS & FULFILLMENT */}
        {activeTab === 'orders' && (
          <div className="space-y-4">
            {myOrders.map((order) => (
              <div
                key={order.id}
                className="p-6 rounded-3xl bg-forest-950 border border-emerald-900/50 space-y-4"
              >
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-3 border-b border-emerald-900/60">
                  <div>
                    <span className="text-xs font-mono font-bold text-emerald-400">
                      {order.orderNumber}
                    </span>
                    <h3 className="text-base font-bold text-white mt-0.5">
                      {order.listingTitle}
                    </h3>
                    <div className="text-xs text-stone-400">
                      Counterparty: {order.buyerName} ↔ {order.sellerName}
                    </div>
                  </div>

                  <div className="text-right">
                    <span className="px-3 py-1 rounded-full text-xs font-extrabold uppercase bg-emerald-950 text-lime-400 border border-emerald-500/40">
                      {order.status}
                    </span>
                    <div className="text-sm font-black text-white mt-1">
                      ₹{order.totalAmount.toLocaleString('en-IN')}
                    </div>
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs bg-forest-900/40 p-3.5 rounded-2xl border border-emerald-950">
                  <div>
                    <span className="text-stone-400 block">Origin:</span>
                    <span className="text-stone-200">{order.originCity}, {order.originState}</span>
                  </div>
                  <div>
                    <span className="text-stone-400 block">Destination:</span>
                    <span className="text-stone-200">{order.destinationCity}, {order.destinationState}</span>
                  </div>
                  <div>
                    <span className="text-stone-400 block">Transport Partner:</span>
                    <span className="text-emerald-300 font-semibold">{order.transportPartner || 'Freight Carrier Pending'}</span>
                  </div>
                </div>

                {/* Status Update Controls */}
                <div className="flex items-center justify-between pt-2 text-xs">
                  <span className="text-stone-400">
                    Est. Delivery: {order.estimatedDelivery}
                  </span>
                  <div className="flex gap-2">
                    {order.status !== 'DELIVERED' && (
                      <button
                        onClick={() => updateOrderStatus(order.id, 'DELIVERED')}
                        className="px-3 py-1.5 bg-emerald-600 hover:bg-emerald-500 text-white rounded-lg font-bold"
                      >
                        Confirm Receipt / Delivered
                      </button>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* TAB 4: LIVE DIRECT MESSAGES */}
        {activeTab === 'messages' && (
          <div className="p-6 rounded-3xl bg-forest-950 border border-emerald-900/50 space-y-4">
            <h3 className="font-bold text-base text-white flex items-center gap-2">
              <MessageSquare className="w-5 h-5 text-emerald-400" />
              <span>{language === 'te' ? 'ఫ్యాక్టరీ సంభాషణలు' : 'Counterparty Conversations'}</span>
            </h3>

            <div className="space-y-3 max-h-80 overflow-y-auto p-2">
              {messages.map((msg) => (
                <div
                  key={msg.id}
                  className={`p-3.5 rounded-2xl border text-xs leading-relaxed max-w-lg ${
                    msg.senderId === currentUser.id
                      ? 'ml-auto bg-emerald-600 text-white border-emerald-500 rounded-br-none'
                      : 'mr-auto bg-forest-900/80 text-stone-200 border-emerald-900/50 rounded-bl-none'
                  }`}
                >
                  <div className="flex justify-between items-center text-[10px] opacity-75 mb-1">
                    <span className="font-bold">{msg.senderName}</span>
                    <span>{new Date(msg.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</span>
                  </div>
                  <p>{msg.content}</p>
                </div>
              ))}
            </div>

            {/* Reply Input */}
            <form onSubmit={handleSendChatReply} className="flex gap-2 pt-2 border-t border-emerald-950">
              <input
                type="text"
                value={chatReplyText}
                onChange={(e) => setChatReplyText(e.target.value)}
                placeholder={language === 'te' ? 'సందేశం టైప్ చేయండి...' : 'Type a dispatch or specification reply...'}
                className="flex-1 px-4 py-2 bg-forest-900 border border-emerald-800/40 rounded-xl text-xs text-white focus:outline-none focus:border-emerald-500"
              />
              <button
                type="submit"
                className="px-5 py-2 bg-emerald-600 hover:bg-emerald-500 rounded-xl font-bold text-xs text-white"
              >
                Send
              </button>
            </form>
          </div>
        )}

        {/* TAB 5: VERIFICATION & COMPLIANCE */}
        {activeTab === 'verification' && (
          <div className="p-6 rounded-3xl bg-forest-950 border border-emerald-900/50 space-y-5">
            <div className="flex justify-between items-center pb-3 border-b border-emerald-900/50">
              <div>
                <h3 className="font-bold text-base text-white">
                  {t('profileTitle')}
                </h3>
                <p className="text-xs text-stone-400">
                  Upload corporate GST, factory license, or pollution control board certificates to unlock Verified Facility status.
                </p>
              </div>

              <button
                onClick={() =>
                  uploadVerificationDoc(
                    'FACTORY_LICENSE',
                    `Factory_Compliance_Audit_${Date.now()}.pdf`,
                    '1.8 MB'
                  )
                }
                className="px-4 py-2 bg-emerald-600 hover:bg-emerald-500 rounded-xl text-xs font-bold text-white flex items-center gap-1.5 shadow-md"
              >
                <Upload className="w-4 h-4" />
                <span>Upload New Compliance Doc</span>
              </button>
            </div>

            <div className="space-y-3">
              {verificationDocs.map((doc) => (
                <div
                  key={doc.id}
                  className="p-4 rounded-2xl bg-forest-900/50 border border-emerald-900/50 flex items-center justify-between gap-4 text-xs"
                >
                  <div className="flex items-center gap-3">
                    <FileCheck className="w-6 h-6 text-emerald-400 shrink-0" />
                    <div>
                      <div className="font-bold text-white">{doc.fileName}</div>
                      <div className="text-[11px] text-stone-400">
                        Type: {doc.docType} • Uploaded on {doc.uploadDate}
                      </div>
                    </div>
                  </div>

                  <span
                    className={`px-3 py-1 rounded-full text-[11px] font-bold ${
                      doc.status === 'VERIFIED'
                        ? 'bg-emerald-950 text-emerald-300 border border-emerald-500/40'
                        : doc.status === 'PENDING'
                        ? 'bg-amber-950 text-amber-300 border border-amber-500/40'
                        : 'bg-rose-950 text-rose-300 border border-rose-500/40'
                    }`}
                  >
                    {doc.status}
                  </span>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* TAB 6: ADMIN SUPERVISORY PANEL (when role is ADMIN) */}
        {activeTab === 'admin' && currentRole === 'ADMIN' && (
          <div className="space-y-6 animate-fadeIn">
            <div className="p-6 rounded-3xl bg-forest-950 border border-purple-800/40 space-y-4">
              <h3 className="font-bold text-lg text-purple-200">
                {t('adminPendingVerifications')}
              </h3>
              <div className="space-y-3 text-xs">
                {verificationDocs.map((doc) => (
                  <div
                    key={doc.id}
                    className="p-4 rounded-2xl bg-forest-900/60 border border-emerald-900/40 flex items-center justify-between gap-4"
                  >
                    <div>
                      <div className="font-bold text-white">{doc.userName}</div>
                      <div className="text-stone-400">{doc.fileName} ({doc.docType})</div>
                      <div className="text-stone-400 text-[10px]">Notes: {doc.notes}</div>
                    </div>
                    <div className="flex gap-2">
                      <button
                        onClick={() => approveVerificationDoc(doc.id)}
                        className="px-3 py-1.5 bg-emerald-600 hover:bg-emerald-500 text-white rounded-lg font-bold"
                      >
                        Approve & Verify
                      </button>
                      <button
                        onClick={() => rejectVerificationDoc(doc.id)}
                        className="px-3 py-1.5 bg-rose-900 hover:bg-rose-800 text-white rounded-lg font-bold"
                      >
                        Reject
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Commercial Disputes Resolution */}
            <div className="p-6 rounded-3xl bg-forest-950 border border-purple-800/40 space-y-4">
              <h3 className="font-bold text-lg text-purple-200">
                {t('adminDisputes')}
              </h3>
              <div className="space-y-3 text-xs">
                {disputes.map((disp) => (
                  <div
                    key={disp.id}
                    className="p-4 rounded-2xl bg-forest-900/60 border border-emerald-900/40 space-y-2"
                  >
                    <div className="flex justify-between items-center">
                      <span className="font-mono text-emerald-400 font-bold">{disp.orderNumber}</span>
                      <span className="px-2 py-0.5 rounded bg-amber-950 text-amber-300 text-[10px] font-bold">
                        {disp.status}
                      </span>
                    </div>
                    <div className="text-white font-semibold">{disp.reason}</div>
                    <p className="text-stone-400 text-xs">{disp.details}</p>
                    {disp.status === 'OPEN' && (
                      <button
                        onClick={() => resolveDispute(disp.id, 'Dispute resolved via official laboratory re-assay and credit note.')}
                        className="mt-2 px-3 py-1.5 bg-purple-700 hover:bg-purple-600 text-white rounded-lg font-bold"
                      >
                        Mark as Resolved
                      </button>
                    )}
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
