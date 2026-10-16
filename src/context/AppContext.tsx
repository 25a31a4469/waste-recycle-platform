'use client';

import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import {
  UserRole,
  UserProfile,
  ResourceListing,
  RFQItem,
  Quotation,
  QuotationStatus,
  OrderRecord,
  OrderStatus,
  NotificationItem,
  DirectMessage,
  VerificationDocument,
  DisputeRecord,
} from '@/types';
import { translations, Language } from '@/lib/translations';
import {
  SEED_USERS,
  SEED_LISTINGS,
  SEED_RFQS,
  SEED_QUOTATIONS,
  SEED_ORDERS,
  SEED_MESSAGES,
  SEED_NOTIFICATIONS,
  SEED_VERIFICATION_DOCS,
  SEED_DISPUTES,
} from '@/lib/seedData';

interface Toast {
  id: string;
  message: string;
  type: 'success' | 'info' | 'error';
}

interface AppContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: (key: keyof typeof translations['en']) => string;
  currentRole: UserRole;
  setRole: (role: UserRole) => void;
  currentUser: UserProfile;
  listings: ResourceListing[];
  savedListingIds: string[];
  rfqs: RFQItem[];
  quotations: Quotation[];
  orders: OrderRecord[];
  messages: DirectMessage[];
  notifications: NotificationItem[];
  verificationDocs: VerificationDocument[];
  disputes: DisputeRecord[];
  toasts: Toast[];
  addToast: (message: string, type?: 'success' | 'info' | 'error') => void;
  removeToast: (id: string) => void;

  // Actions
  addListing: (listing: Omit<ResourceListing, 'id' | 'createdAt' | 'viewsCount' | 'inquiriesCount'>) => ResourceListing;
  updateListingStatus: (id: string, status: 'ACTIVE' | 'PAUSED' | 'SOLD') => void;
  toggleSaveListing: (id: string) => void;
  createRFQ: (rfq: Omit<RFQItem, 'id' | 'createdAt' | 'quotesCount'>) => RFQItem;
  submitQuotation: (quote: Omit<Quotation, 'id' | 'createdAt'>) => Quotation;
  updateQuotationStatus: (id: string, status: QuotationStatus) => void;
  createOrder: (order: Omit<OrderRecord, 'id' | 'orderNumber' | 'createdAt'>) => OrderRecord;
  updateOrderStatus: (id: string, status: OrderStatus) => void;
  sendMessage: (receiverId: string, receiverName: string, content: string, listingId?: string, listingTitle?: string) => void;
  markNotificationRead: (id: string) => void;
  uploadVerificationDoc: (docType: VerificationDocument['docType'], fileName: string, fileSize: string) => void;
  approveVerificationDoc: (id: string) => void;
  rejectVerificationDoc: (id: string) => void;
  raiseDispute: (orderNumber: string, reason: string, details: string) => void;
  resolveDispute: (id: string, resolution: string) => void;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

export function AppProvider({ children }: { children: ReactNode }) {
  const [language, setLanguageState] = useState<Language>('en');
  const [currentRole, setRoleState] = useState<UserRole>('FACTORY');
  const [listings, setListings] = useState<ResourceListing[]>(SEED_LISTINGS);
  const [savedListingIds, setSavedListingIds] = useState<string[]>(['list_1', 'list_2']);
  const [rfqs, setRfqs] = useState<RFQItem[]>(SEED_RFQS);
  const [quotations, setQuotations] = useState<Quotation[]>(SEED_QUOTATIONS);
  const [orders, setOrders] = useState<OrderRecord[]>(SEED_ORDERS);
  const [messages, setMessages] = useState<DirectMessage[]>(SEED_MESSAGES);
  const [notifications, setNotifications] = useState<NotificationItem[]>(SEED_NOTIFICATIONS);
  const [verificationDocs, setVerificationDocs] = useState<VerificationDocument[]>(SEED_VERIFICATION_DOCS);
  const [disputes, setDisputes] = useState<DisputeRecord[]>(SEED_DISPUTES);
  const [toasts, setToasts] = useState<Toast[]>([]);

  // Load persisted language and role from localStorage on mount
  useEffect(() => {
    if (typeof window !== 'undefined') {
      const savedLang = localStorage.getItem('circuvia_lang') as Language;
      if (savedLang === 'en' || savedLang === 'te') {
        setLanguageState(savedLang);
      }
      const savedRole = localStorage.getItem('circuvia_role') as UserRole;
      if (savedRole && SEED_USERS[savedRole]) {
        setRoleState(savedRole);
      }
    }
  }, []);

  const setLanguage = (lang: Language) => {
    setLanguageState(lang);
    if (typeof window !== 'undefined') {
      localStorage.setItem('circuvia_lang', lang);
      document.documentElement.lang = lang;
    }
  };

  const setRole = (role: UserRole) => {
    setRoleState(role);
    if (typeof window !== 'undefined') {
      localStorage.setItem('circuvia_role', role);
    }
    const roleName = translations[language][`role_${role}` as keyof typeof translations['en']];
    addToast(`${language === 'te' ? 'పాత్ర మార్చబడింది' : 'Role switched to'}: ${roleName}`, 'info');
  };

  const t = (key: keyof typeof translations['en']): string => {
    return translations[language][key] || translations['en'][key] || key;
  };

  const addToast = (message: string, type: 'success' | 'info' | 'error' = 'success') => {
    const id = `toast_${Date.now()}_${Math.random().toString(36).substring(2, 6)}`;
    setToasts((prev) => [...prev, { id, message, type }]);
    setTimeout(() => {
      removeToast(id);
    }, 4500);
  };

  const removeToast = (id: string) => {
    setToasts((prev) => prev.filter((t) => t.id !== id));
  };

  const currentUser = SEED_USERS[currentRole] || SEED_USERS.FACTORY;

  // Actions
  const addListing = (
    listingData: Omit<ResourceListing, 'id' | 'createdAt' | 'viewsCount' | 'inquiriesCount'>
  ): ResourceListing => {
    const newListing: ResourceListing = {
      ...listingData,
      id: `list_${Date.now()}`,
      createdAt: new Date().toISOString(),
      viewsCount: 1,
      inquiriesCount: 0,
      isDemo: true,
    };
    setListings((prev) => [newListing, ...prev]);
    addToast(t('wizardSuccessTitle'), 'success');

    // Notify about new listing
    const newNotif: NotificationItem = {
      id: `notif_${Date.now()}`,
      userId: currentUser.id,
      title: 'Resource Listed Successfully',
      titleTe: 'వనరు విజయవంతంగా ప్రచురించబడింది',
      message: `${newListing.title} is now active on the CIRCUVIA marketplace.`,
      messageTe: `${newListing.title} ఇప్పుడు మార్కెట్‌ప్లేస్‌లో అందుబాటులో ఉంది.`,
      type: 'SYSTEM',
      link: '/marketplace',
      isRead: false,
      createdAt: new Date().toISOString(),
    };
    setNotifications((prev) => [newNotif, ...prev]);

    return newListing;
  };

  const updateListingStatus = (id: string, status: 'ACTIVE' | 'PAUSED' | 'SOLD') => {
    setListings((prev) =>
      prev.map((l) => (l.id === id ? { ...l, status } : l))
    );
    addToast(`Listing status updated to ${status}`, 'info');
  };

  const toggleSaveListing = (id: string) => {
    setSavedListingIds((prev) => {
      const exists = prev.includes(id);
      if (exists) {
        addToast(language === 'te' ? 'భద్రపరచిన జాబితా నుండి తీసివేయబడింది' : 'Removed from saved items', 'info');
        return prev.filter((item) => item !== id);
      } else {
        addToast(language === 'te' ? 'వస్తువు భద్రపరచబడింది' : 'Resource saved to your favorites', 'success');
        return [...prev, id];
      }
    });
  };

  const createRFQ = (rfqData: Omit<RFQItem, 'id' | 'createdAt' | 'quotesCount'>): RFQItem => {
    const newRfq: RFQItem = {
      ...rfqData,
      id: `rfq_${Date.now()}`,
      createdAt: new Date().toISOString(),
      quotesCount: 0,
    };
    setRfqs((prev) => [newRfq, ...prev]);
    addToast(language === 'te' ? 'కొత్త RFQ విజయవంతంగా సమర్పించబడింది' : 'RFQ published to procurement network', 'success');
    return newRfq;
  };

  const submitQuotation = (quoteData: Omit<Quotation, 'id' | 'createdAt'>): Quotation => {
    const newQuote: Quotation = {
      ...quoteData,
      id: `quote_${Date.now()}`,
      createdAt: new Date().toISOString(),
    };
    setQuotations((prev) => [newQuote, ...prev]);
    addToast(language === 'te' ? 'కొటేషన్ సమర్పించబడింది' : 'Quotation dispatched to buyer', 'success');
    return newQuote;
  };

  const updateQuotationStatus = (id: string, status: QuotationStatus) => {
    setQuotations((prev) =>
      prev.map((q) => (q.id === id ? { ...q, status } : q))
    );
    addToast(`Quotation status: ${status}`, 'info');
  };

  const createOrder = (orderData: Omit<OrderRecord, 'id' | 'orderNumber' | 'createdAt'>): OrderRecord => {
    const randomNum = Math.floor(1000 + Math.random() * 9000);
    const newOrder: OrderRecord = {
      ...orderData,
      id: `ord_${Date.now()}`,
      orderNumber: `CRV-2026-${randomNum}`,
      createdAt: new Date().toISOString(),
    };
    setOrders((prev) => [newOrder, ...prev]);
    addToast(
      language === 'te'
        ? `ఆర్డర్ ${newOrder.orderNumber} విజయవంతంగా సృష్టించబడింది`
        : `Order ${newOrder.orderNumber} created successfully!`,
      'success'
    );
    return newOrder;
  };

  const updateOrderStatus = (id: string, status: OrderStatus) => {
    setOrders((prev) =>
      prev.map((o) => (o.id === id ? { ...o, status } : o))
    );
    addToast(`Order updated to ${status}`, 'info');
  };

  const sendMessage = (
    receiverId: string,
    receiverName: string,
    content: string,
    listingId?: string,
    listingTitle?: string
  ) => {
    const newMsg: DirectMessage = {
      id: `msg_${Date.now()}`,
      senderId: currentUser.id,
      senderName: currentUser.name,
      receiverId,
      receiverName,
      listingId,
      listingTitle,
      content,
      timestamp: new Date().toISOString(),
      isRead: false,
    };
    setMessages((prev) => [...prev, newMsg]);
    addToast(language === 'te' ? 'సందేశం పంపబడింది' : 'Message sent', 'success');

    // Simulate facility response after 3 seconds for interactive demo realism
    setTimeout(() => {
      const replyMsg: DirectMessage = {
        id: `msg_${Date.now() + 1}`,
        senderId: receiverId,
        senderName: receiverName,
        receiverId: currentUser.id,
        receiverName: currentUser.name,
        listingId,
        listingTitle,
        content:
          language === 'te'
            ? `నమస్కారం! మీ విచారణ అందింది. మా క్వాలిటీ టీమ్ వివరాలను పరిశీలించి త్వరలో కొటేషన్ పంపుతారు.`
            : `Hello ${currentUser.name}! Thank you for your inquiry. Our technical dispatch team has received your specifications.`,
        timestamp: new Date().toISOString(),
        isRead: false,
      };
      setMessages((prev) => [...prev, replyMsg]);
    }, 3000);
  };

  const markNotificationRead = (id: string) => {
    setNotifications((prev) =>
      prev.map((n) => (n.id === id ? { ...n, isRead: true } : n))
    );
  };

  const uploadVerificationDoc = (
    docType: VerificationDocument['docType'],
    fileName: string,
    fileSize: string
  ) => {
    const newDoc: VerificationDocument = {
      id: `vdoc_${Date.now()}`,
      userId: currentUser.id,
      userName: currentUser.companyName,
      docType,
      fileName,
      fileSize,
      status: 'PENDING',
      uploadDate: new Date().toISOString().split('T')[0],
      notes: 'Submitted for Circuvia compliance audit.',
    };
    setVerificationDocs((prev) => [newDoc, ...prev]);
    addToast(
      language === 'te'
        ? 'ధృవీకరణ పత్రం విజయవంతంగా అప్‌లోడ్ చేయబడింది (సమీక్షలో ఉంది)'
        : 'Document submitted for verification review',
      'success'
    );
  };

  const approveVerificationDoc = (id: string) => {
    setVerificationDocs((prev) =>
      prev.map((d) => (d.id === id ? { ...d, status: 'VERIFIED', verifiedDate: new Date().toISOString().split('T')[0] } : d))
    );
    addToast('Document status updated: VERIFIED', 'success');
  };

  const rejectVerificationDoc = (id: string) => {
    setVerificationDocs((prev) =>
      prev.map((d) => (d.id === id ? { ...d, status: 'REJECTED' } : d))
    );
    addToast('Document status updated: REJECTED', 'error');
  };

  const raiseDispute = (orderNumber: string, reason: string, details: string) => {
    const newDispute: DisputeRecord = {
      id: `disp_${Date.now()}`,
      orderNumber,
      raisedBy: `${currentUser.name} (${currentUser.companyName})`,
      defendant: 'Counterparty Facility',
      reason,
      details,
      status: 'OPEN',
      createdAt: new Date().toISOString().split('T')[0],
    };
    setDisputes((prev) => [newDispute, ...prev]);
    addToast(
      language === 'te' ? 'వివాద దరఖాస్తు నమోదైంది' : 'Dispute ticket registered with Circuvia Admin',
      'info'
    );
  };

  const resolveDispute = (id: string, resolution: string) => {
    setDisputes((prev) =>
      prev.map((d) => (d.id === id ? { ...d, status: 'RESOLVED', resolution } : d))
    );
    addToast('Dispute marked as RESOLVED', 'success');
  };

  return (
    <AppContext.Provider
      value={{
        language,
        setLanguage,
        t,
        currentRole,
        setRole,
        currentUser,
        listings,
        savedListingIds,
        rfqs,
        quotations,
        orders,
        messages,
        notifications,
        verificationDocs,
        disputes,
        toasts,
        addToast,
        removeToast,
        addListing,
        updateListingStatus,
        toggleSaveListing,
        createRFQ,
        submitQuotation,
        updateQuotationStatus,
        createOrder,
        updateOrderStatus,
        sendMessage,
        markNotificationRead,
        uploadVerificationDoc,
        approveVerificationDoc,
        rejectVerificationDoc,
        raiseDispute,
        resolveDispute,
      }}
    >
      {children}
    </AppContext.Provider>
  );
}

export function useApp() {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useApp must be used within an AppProvider');
  }
  return context;
}
