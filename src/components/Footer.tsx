'use client';

import React from 'react';
import Link from 'next/link';
import { useApp } from '@/context/AppContext';
import { Recycle, ShieldAlert, Award, FileText, Mail, Phone, MapPin } from 'lucide-react';

export function Footer() {
  const { t, language } = useApp();

  return (
    <footer className="bg-forest-950 text-stone-300 border-t border-emerald-950/60 pt-16 pb-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10 pb-12 border-b border-emerald-900/40">
          {/* Brand Column */}
          <div className="lg:col-span-2 space-y-4">
            <Link href="/" className="flex items-center gap-2.5">
              <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-emerald-400 to-emerald-600 flex items-center justify-center text-forest-950 shadow-md">
                <Recycle className="w-5 h-5" />
              </div>
              <span className="font-black text-xl text-white tracking-tight">
                CIRCUVIA <span className="text-lime-400">AI</span>
              </span>
            </Link>
            <p className="text-xs text-stone-400 leading-relaxed max-w-sm">
              {language === 'te'
                ? 'భారతదేశ పారిశ్రామిక ఉప-ఉత్పత్తులు మరియు పునర్వినియోగ ముడి పదార్థాల మార్పిడి ప్లాట్‌ఫారమ్. వ్యర్థాలను విలువైన ఉత్పత్తి వనరులుగా మార్చడమే సర్క్యువియా లక్ష్యం.'
                : 'India’s dedicated AI Circular Resource Exchange Platform connecting large manufacturing plants, recyclers, and small craft enterprises to close the industrial materials loop.'}
            </p>

            <div className="pt-2 flex flex-col gap-1.5 text-xs text-stone-400">
              <div className="flex items-center gap-2">
                <MapPin className="w-4 h-4 text-emerald-400 shrink-0" />
                <span>Madhapur Industrial Cluster, Hyderabad, Telangana 500081</span>
              </div>
              <div className="flex items-center gap-2">
                <Mail className="w-4 h-4 text-emerald-400 shrink-0" />
                <span>compliance@circuvia.ai</span>
              </div>
              <div className="flex items-center gap-2">
                <Phone className="w-4 h-4 text-emerald-400 shrink-0" />
                <span>+91 40 2988 5600 (Mon - Sat, 9 AM - 6 PM IST)</span>
              </div>
            </div>
          </div>

          {/* Quick Links */}
          <div className="space-y-3">
            <h4 className="text-xs font-bold uppercase tracking-wider text-emerald-300">
              {language === 'te' ? 'ప్లాట్‌ఫారమ్' : 'Platform'}
            </h4>
            <ul className="space-y-2 text-xs">
              <li>
                <Link href="/marketplace" className="hover:text-emerald-400 transition-colors">
                  {t('navMarketplace')}
                </Link>
              </li>
              <li>
                <Link href="/raw-materials" className="hover:text-emerald-400 transition-colors">
                  {t('navRawMaterials')}
                </Link>
              </li>
              <li>
                <Link href="/matchmaker" className="hover:text-emerald-400 transition-colors">
                  {t('navAiMatchmaker')}
                </Link>
              </li>
              <li>
                <Link href="/rfq-center" className="hover:text-emerald-400 transition-colors">
                  {t('navRfqCenter')}
                </Link>
              </li>
              <li>
                <Link href="/list-resource" className="hover:text-emerald-400 transition-colors">
                  {t('navListResource')}
                </Link>
              </li>
            </ul>
          </div>

          {/* Categories */}
          <div className="space-y-3">
            <h4 className="text-xs font-bold uppercase tracking-wider text-emerald-300">
              {language === 'te' ? 'ముఖ్య విభాగాలు' : 'Resource Classes'}
            </h4>
            <ul className="space-y-2 text-xs">
              <li>
                <Link href="/marketplace?cat=INDUSTRIAL_SLAG_ASH" className="hover:text-emerald-400 transition-colors">
                  {t('cat_INDUSTRIAL_SLAG_ASH')}
                </Link>
              </li>
              <li>
                <Link href="/marketplace?cat=PLASTICS" className="hover:text-emerald-400 transition-colors">
                  {t('cat_PLASTICS')}
                </Link>
              </li>
              <li>
                <Link href="/marketplace?cat=METALS" className="hover:text-emerald-400 transition-colors">
                  {t('cat_METALS')}
                </Link>
              </li>
              <li>
                <Link href="/marketplace?cat=CHEMICALS_SOLVENTS" className="hover:text-emerald-400 transition-colors">
                  {t('cat_CHEMICALS_SOLVENTS')}
                </Link>
              </li>
              <li>
                <Link href="/marketplace?cat=AGRO_WASTE" className="hover:text-emerald-400 transition-colors">
                  {t('cat_AGRO_WASTE')}
                </Link>
              </li>
            </ul>
          </div>

          {/* Compliance & Safety */}
          <div className="space-y-3">
            <h4 className="text-xs font-bold uppercase tracking-wider text-emerald-300">
              {language === 'te' ? 'భద్రత & నిబంధనలు' : 'Compliance & Safety'}
            </h4>
            <ul className="space-y-2 text-xs">
              <li>
                <Link href="/how-it-works#safety" className="hover:text-emerald-400 transition-colors flex items-center gap-1.5">
                  <ShieldAlert className="w-3.5 h-3.5 text-amber-400" />
                  {language === 'te' ? 'ప్రమాదకర వ్యర్థాల నిబంధనలు' : 'Hazardous Waste Policy'}
                </Link>
              </li>
              <li>
                <Link href="/how-it-works#lab" className="hover:text-emerald-400 transition-colors flex items-center gap-1.5">
                  <Award className="w-3.5 h-3.5 text-emerald-400" />
                  {language === 'te' ? 'ల్యాబ్ టెస్ట్ & నివేదికలు' : 'Lab Testing Guidelines'}
                </Link>
              </li>
              <li>
                <Link href="/impact" className="hover:text-emerald-400 transition-colors flex items-center gap-1.5">
                  <FileText className="w-3.5 h-3.5 text-lime-400" />
                  {language === 'te' ? 'CPCB పర్యావరణ కొలమానాలు' : 'CPCB ESG Methodology'}
                </Link>
              </li>
            </ul>
          </div>
        </div>

        {/* Regulatory Advisory Banner */}
        <div className="mt-8 p-4 rounded-xl bg-forest-900/60 border border-emerald-900/40 text-xs text-stone-400 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
          <div className="flex items-start gap-2.5">
            <ShieldAlert className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />
            <p className="leading-relaxed">
              <strong className="text-stone-200">
                {language === 'te' ? 'భద్రతా ప్రకటన' : 'Regulatory & Testing Disclaimer'}:
              </strong>{' '}
              {language === 'te'
                ? 'రసాయన కూర్పు, ప్రమాదకర వ్యర్థాల వర్గీకరణ మరియు పారిశ్రామిక భద్రత వివరాలు సరఫరాదారులు సమర్పించినవి. కొనుగోలుకు ముందు అధికారిక ప్రయోగశాల పరీక్షా పత్రాలు తప్పనిసరి.'
                : 'All material compositions and safety disclosures are self-reported by facility listings until verified via accredited NABL/CPCB testing documentation. Never trade hazardous Schedule I materials without state PCB manifest approval.'}
            </p>
          </div>
        </div>

        {/* Bottom Credits */}
        <div className="mt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-stone-400">
          <div>
            © 2026 CIRCUVIA AI. {t('allRightsReserved')}
          </div>
          <div className="flex items-center gap-6">
            <span>ISO 14001 ESG Compliant Architecture</span>
            <span className="text-emerald-400 font-medium">
              Language: {language === 'te' ? 'తెలుగు (Telugu)' : 'English'}
            </span>
          </div>
        </div>
      </div>
    </footer>
  );
}
