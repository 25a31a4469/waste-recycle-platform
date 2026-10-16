'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useApp } from '@/context/AppContext';
import { RoleSwitcherModal } from '@/components/RoleSwitcherModal';
import { AuthModal } from '@/components/AuthModal';
import {
  Recycle,
  Globe,
  Bell,
  PlusCircle,
  Menu,
  X,
  Factory,
  Store,
  Truck,
  ShoppingCart,
  ShieldCheck,
  Check,
  ExternalLink,
} from 'lucide-react';

export function Navbar() {
  const pathname = usePathname();
  const {
    language,
    setLanguage,
    t,
    currentRole,
    currentUser,
    notifications,
    markNotificationRead,
  } = useApp();

  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [roleModalOpen, setRoleModalOpen] = useState(false);
  const [authModalOpen, setAuthModalOpen] = useState(false);
  const [notifDropdownOpen, setNotifDropdownOpen] = useState(false);

  const unreadNotifs = notifications.filter((n) => !n.isRead);

  const roleIcons = {
    FACTORY: Factory,
    SMALL_BUSINESS: Store,
    SUPPLIER: Truck,
    RECYCLER: Recycle,
    BUYER: ShoppingCart,
    ADMIN: ShieldCheck,
  };

  const RoleIcon = roleIcons[currentRole] || Factory;

  const navLinks = [
    { href: '/marketplace', label: t('navMarketplace') },
    { href: '/raw-materials', label: t('navRawMaterials') },
    { href: '/matchmaker', label: t('navAiMatchmaker') },
    { href: '/rfq-center', label: t('navRfqCenter') },
    { href: '/how-it-works', label: t('navHowItWorks') },
    { href: '/impact', label: t('navImpact') },
    { href: '/dashboard', label: t('navDashboard') },
  ];

  return (
    <>
      <header className="sticky top-0 z-40 w-full border-b border-emerald-950/20 bg-forest-950/95 backdrop-blur-md text-white transition-all">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16 sm:h-20 gap-4">
            {/* Logo */}
            <Link href="/" className="flex items-center gap-2.5 group shrink-0">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-emerald-400 to-emerald-700 flex items-center justify-center shadow-lg shadow-emerald-900/50 group-hover:scale-105 transition-transform">
                <Recycle className="w-5 h-5 text-forest-950 group-hover:rotate-180 transition-transform duration-700" />
              </div>
              <div className="flex flex-col">
                <div className="flex items-center gap-1.5">
                  <span className="font-extrabold text-lg sm:text-xl tracking-tight text-white">
                    CIRCUVIA
                  </span>
                  <span className="text-[10px] font-black uppercase px-1.5 py-0.5 rounded bg-lime-400 text-forest-950 tracking-wider">
                    AI
                  </span>
                </div>
                <span className="text-[10px] text-emerald-400 font-medium tracking-wide hidden sm:block">
                  {t('brandTagline')}
                </span>
              </div>
            </Link>

            {/* Desktop Navigation Links */}
            <nav className="hidden lg:flex items-center gap-1 xl:gap-2 text-sm font-medium">
              {navLinks.map((link) => {
                const isActive = pathname === link.href;
                return (
                  <Link
                    key={link.href}
                    href={link.href}
                    className={`px-3 py-1.5 rounded-lg transition-colors ${
                      isActive
                        ? 'bg-emerald-900/50 text-emerald-300 font-semibold border border-emerald-700/40'
                        : 'text-stone-300 hover:text-white hover:bg-forest-900/60'
                    }`}
                  >
                    {link.label}
                  </Link>
                );
              })}
            </nav>

            {/* Right Side Tools */}
            <div className="flex items-center gap-2 sm:gap-3">
              {/* Language Selector */}
              <div className="flex items-center bg-forest-900/80 rounded-xl border border-emerald-800/40 p-1 text-xs font-semibold">
                <button
                  type="button"
                  onClick={() => setLanguage('en')}
                  className={`px-2 py-1 rounded-lg transition-all ${
                    language === 'en'
                      ? 'bg-emerald-600 text-white shadow-sm'
                      : 'text-stone-400 hover:text-white'
                  }`}
                  title="Switch to English"
                >
                  EN
                </button>
                <button
                  type="button"
                  onClick={() => setLanguage('te')}
                  className={`px-2.5 py-1 rounded-lg transition-all ${
                    language === 'te'
                      ? 'bg-emerald-600 text-white shadow-sm font-bold'
                      : 'text-stone-400 hover:text-white'
                  }`}
                  title="తెలుగు భాషకు మార్చండి"
                >
                  తెలుగు
                </button>
              </div>

              {/* Active Role Switcher Badge */}
              <button
                type="button"
                onClick={() => setRoleModalOpen(true)}
                className="hidden sm:flex items-center gap-2 px-3 py-1.5 bg-emerald-950/80 hover:bg-emerald-900/60 border border-emerald-700/50 rounded-xl text-xs font-medium text-emerald-200 transition-colors shadow-sm"
                title="Click to switch business perspective"
              >
                <RoleIcon className="w-4 h-4 text-emerald-400" />
                <span className="truncate max-w-[110px] xl:max-w-[140px]">
                  {t(`role_${currentRole}` as keyof typeof t)}
                </span>
                <span className="text-[10px] text-lime-400 border-l border-emerald-800 pl-1.5 font-bold uppercase">
                  {language === 'te' ? 'మార్చు' : 'Switch'}
                </span>
              </button>

              {/* Notifications Popover Toggle */}
              <div className="relative">
                <button
                  type="button"
                  onClick={() => setNotifDropdownOpen(!notifDropdownOpen)}
                  className="relative p-2 rounded-xl text-stone-300 hover:text-white hover:bg-forest-900 border border-emerald-900/40 transition-colors"
                  aria-label="Notifications"
                >
                  <Bell className="w-4 h-4" />
                  {unreadNotifs.length > 0 && (
                    <span className="absolute -top-1 -right-1 w-4 h-4 rounded-full bg-emerald-500 text-[10px] font-black text-forest-950 flex items-center justify-center ring-2 ring-forest-950 animate-pulse">
                      {unreadNotifs.length}
                    </span>
                  )}
                </button>

                {/* Notifications Dropdown */}
                {notifDropdownOpen && (
                  <div className="absolute right-0 mt-2 w-80 sm:w-96 bg-forest-950 border border-emerald-800/60 rounded-2xl shadow-2xl p-4 z-50 animate-fadeIn">
                    <div className="flex items-center justify-between pb-2 border-b border-emerald-900/50">
                      <span className="font-bold text-sm text-emerald-200">
                        {language === 'te' ? 'నోటిఫికేషన్లు' : 'Platform Alerts'}
                      </span>
                      <span className="text-xs text-stone-400">
                        {unreadNotifs.length} {language === 'te' ? 'చదవనివి' : 'unread'}
                      </span>
                    </div>
                    <div className="divide-y divide-emerald-950 max-h-72 overflow-y-auto mt-2">
                      {notifications.map((notif) => (
                        <div
                          key={notif.id}
                          onClick={() => markNotificationRead(notif.id)}
                          className={`p-2.5 rounded-lg cursor-pointer transition-colors ${
                            notif.isRead
                              ? 'opacity-70 hover:opacity-100 hover:bg-forest-900/40'
                              : 'bg-emerald-950/60 hover:bg-emerald-900/40'
                          }`}
                        >
                          <div className="flex items-start justify-between gap-1">
                            <h4 className="text-xs font-semibold text-stone-100">
                              {language === 'te' && notif.titleTe ? notif.titleTe : notif.title}
                            </h4>
                            {!notif.isRead && (
                              <span className="w-2 h-2 rounded-full bg-emerald-400 shrink-0 mt-1" />
                            )}
                          </div>
                          <p className="text-[11px] text-stone-300 mt-0.5 line-clamp-2">
                            {language === 'te' && notif.messageTe ? notif.messageTe : notif.message}
                          </p>
                          <span className="text-[10px] text-stone-400 mt-1 block">
                            {new Date(notif.createdAt).toLocaleDateString()}
                          </span>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>

              {/* List a Resource CTA Button */}
              <Link
                href="/list-resource"
                className="hidden sm:inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-gradient-to-r from-emerald-600 to-emerald-500 hover:from-emerald-500 hover:to-emerald-400 text-white font-semibold text-xs shadow-md shadow-emerald-950/40 hover:shadow-emerald-900/60 transition-all hover:-translate-y-0.5"
              >
                <PlusCircle className="w-4 h-4" />
                <span>{t('navListResource')}</span>
              </Link>

              {/* Profile / Account Button */}
              <button
                type="button"
                onClick={() => setAuthModalOpen(true)}
                className="hidden md:flex items-center gap-2 p-1.5 pl-2.5 rounded-xl border border-emerald-800/40 bg-forest-900 hover:bg-emerald-900/30 text-xs font-medium text-stone-200 transition-colors"
                title="Account profile"
              >
                <div className="w-6 h-6 rounded-lg bg-emerald-700 flex items-center justify-center text-white font-bold text-[10px]">
                  {currentUser.name[0]}
                </div>
                <span className="max-w-[85px] truncate">{currentUser.name.split(' ')[0]}</span>
              </button>

              {/* Mobile Hamburger Menu Toggle */}
              <button
                type="button"
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                className="lg:hidden p-2 rounded-xl text-stone-300 hover:text-white hover:bg-forest-900 border border-emerald-900/40"
                aria-label="Toggle navigation menu"
              >
                {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Navigation Drawer */}
        {mobileMenuOpen && (
          <div className="lg:hidden border-t border-emerald-900/50 bg-forest-950 px-4 pt-3 pb-6 space-y-3 animate-fadeIn">
            {/* Mobile Active Role Switcher */}
            <div className="p-3 bg-forest-900/80 rounded-xl border border-emerald-800/40 flex items-center justify-between">
              <div className="flex items-center gap-2">
                <RoleIcon className="w-4 h-4 text-emerald-400" />
                <div>
                  <div className="text-[10px] text-stone-400 uppercase font-bold">
                    {t('activeRole')}
                  </div>
                  <div className="text-xs font-semibold text-stone-100">
                    {t(`role_${currentRole}` as keyof typeof t)}
                  </div>
                </div>
              </div>
              <button
                type="button"
                onClick={() => {
                  setMobileMenuOpen(false);
                  setRoleModalOpen(true);
                }}
                className="px-2.5 py-1 text-xs font-bold bg-emerald-600 text-white rounded-lg"
              >
                {t('switchRole')}
              </button>
            </div>

            {/* Links */}
            <div className="grid grid-cols-2 gap-2 pt-2">
              {navLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  onClick={() => setMobileMenuOpen(false)}
                  className={`p-2.5 rounded-xl text-xs font-medium border text-center transition-colors ${
                    pathname === link.href
                      ? 'bg-emerald-900/60 border-emerald-500 text-emerald-200'
                      : 'border-emerald-900/30 text-stone-300 hover:bg-forest-900'
                  }`}
                >
                  {link.label}
                </Link>
              ))}
            </div>

            {/* Mobile CTA */}
            <div className="pt-2 flex gap-2">
              <Link
                href="/list-resource"
                onClick={() => setMobileMenuOpen(false)}
                className="flex-1 py-2.5 rounded-xl bg-emerald-600 text-white font-bold text-xs text-center flex items-center justify-center gap-1.5 shadow-md"
              >
                <PlusCircle className="w-4 h-4" />
                {t('navListResource')}
              </Link>
              <button
                type="button"
                onClick={() => {
                  setMobileMenuOpen(false);
                  setAuthModalOpen(true);
                }}
                className="px-4 py-2.5 rounded-xl border border-emerald-800 bg-forest-900 text-xs font-medium text-white"
              >
                {currentUser.name.split(' ')[0]}
              </button>
            </div>
          </div>
        )}
      </header>

      {/* Role Switcher Modal */}
      <RoleSwitcherModal
        isOpen={roleModalOpen}
        onClose={() => setRoleModalOpen(false)}
      />

      {/* Authentication Modal */}
      <AuthModal
        isOpen={authModalOpen}
        onClose={() => setAuthModalOpen(false)}
      />
    </>
  );
}
