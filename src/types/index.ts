export type UserRole =
  | 'FACTORY'
  | 'SMALL_BUSINESS'
  | 'SUPPLIER'
  | 'RECYCLER'
  | 'BUYER'
  | 'ADMIN';

export type ResourceType =
  | 'WASTE'
  | 'BY_PRODUCT'
  | 'SURPLUS'
  | 'VIRGIN_RAW'
  | 'RECYCLED_FEEDSTOCK';

export type MaterialCategory =
  | 'PLASTICS'
  | 'METALS'
  | 'PAPER_CARDBOARD'
  | 'TEXTILES'
  | 'CHEMICALS_SOLVENTS'
  | 'GLASS'
  | 'RUBBER'
  | 'WOOD_BIOMASS'
  | 'AGRO_WASTE'
  | 'INDUSTRIAL_SLAG_ASH'
  | 'ELECTRONICS_EWALL';

export type MaterialCondition =
  | 'CLEAN_PROCESSED'
  | 'RAW_UNSORTED'
  | 'SHREDDED'
  | 'BALED'
  | 'PELLETIZED'
  | 'LIQUID_DRUMMED'
  | 'VIRGIN_PACKAGED';

export type MaterialGrade = 'GRADE_A' | 'GRADE_B' | 'GRADE_C' | 'OFF_SPEC' | 'VIRGIN';

export type OrderStatus =
  | 'INQUIRY'
  | 'QUOTED'
  | 'CONFIRMED'
  | 'PROCESSING'
  | 'IN_TRANSIT'
  | 'DELIVERED'
  | 'CANCELLED';

export type QuotationStatus =
  | 'PENDING'
  | 'REVIEWED'
  | 'ACCEPTED'
  | 'REJECTED'
  | 'COUNTER_OFFER';

export type VerificationStatus = 'UNVERIFIED' | 'PENDING' | 'VERIFIED' | 'REJECTED';

export interface UserProfile {
  id: string;
  name: string;
  email: string;
  phone: string;
  companyName: string;
  role: UserRole;
  city: string;
  state: string;
  verificationStatus: VerificationStatus;
  gstNumber?: string;
  bio?: string;
  avatarUrl?: string;
  joinedDate: string;
}

export interface ResourceListing {
  id: string;
  title: string;
  titleTe?: string;
  description: string;
  descriptionTe?: string;
  category: MaterialCategory;
  resourceType: ResourceType;
  grade: MaterialGrade;
  condition: MaterialCondition;
  quantity: number;
  unit: string; // 'MT', 'kg', 'Liters', 'Pieces', 'Drums'
  pricePerUnit: number;
  isNegotiable: boolean;
  minOrderQuantity: number;
  locationCity: string;
  locationState: string;
  pickupAvailable: boolean;
  deliveryAvailable: boolean;
  chemicalComposition?: string;
  safetyDocUrl?: string;
  hasLabTestReport: boolean;
  isVerifiedSeller: boolean;
  isVerifiedMaterial: boolean; // Verified lab report / physical inspection
  images: string[];
  sellerId: string;
  sellerName: string;
  sellerRole: UserRole;
  status: 'ACTIVE' | 'PAUSED' | 'SOLD';
  createdAt: string;
  viewsCount: number;
  inquiriesCount: number;
  isDemo?: boolean;
}

export interface RFQItem {
  id: string;
  title: string;
  category: MaterialCategory;
  requiredQuantity: number;
  unit: string;
  targetPricePerUnit?: number;
  destinationCity: string;
  destinationState: string;
  specifications: string;
  deadline: string;
  buyerId: string;
  buyerName: string;
  buyerCompany: string;
  status: 'OPEN' | 'IN_NEGOTIATION' | 'CLOSED';
  createdAt: string;
  quotesCount: number;
}

export interface Quotation {
  id: string;
  rfqId?: string;
  listingId?: string;
  listingTitle: string;
  sellerId: string;
  sellerName: string;
  buyerId: string;
  buyerName: string;
  quantity: number;
  unit: string;
  unitPrice: number;
  totalPrice: number;
  deliveryTerms: string;
  estDeliveryDays: number;
  validUntil: string;
  notes: string;
  status: QuotationStatus;
  createdAt: string;
}

export interface OrderRecord {
  id: string;
  orderNumber: string;
  listingId: string;
  listingTitle: string;
  buyerId: string;
  buyerName: string;
  sellerId: string;
  sellerName: string;
  quantity: number;
  unit: string;
  totalAmount: number;
  currency: string;
  status: OrderStatus;
  originCity: string;
  originState: string;
  destinationCity: string;
  destinationState: string;
  transportPartner?: string;
  estimatedDelivery: string;
  carbonSavedKg: number;
  wasteDivertedKg: number;
  createdAt: string;
}

export interface NotificationItem {
  id: string;
  userId: string;
  title: string;
  message: string;
  titleTe?: string;
  messageTe?: string;
  type: 'ORDER' | 'RFQ' | 'MATCH' | 'VERIFICATION' | 'SYSTEM' | 'MESSAGE';
  link?: string;
  isRead: boolean;
  createdAt: string;
}

export interface DirectMessage {
  id: string;
  senderId: string;
  senderName: string;
  receiverId: string;
  receiverName: string;
  listingId?: string;
  listingTitle?: string;
  content: string;
  timestamp: string;
  isRead: boolean;
}

export interface MatchRecommendation {
  id: string;
  listing: ResourceListing;
  matchScore: number; // 0 to 100
  reasons: string[];
  reasonsTe: string[];
  carbonOffsetEstimateKg: number;
  costSavingsEstimateInr: number;
  proximityKm: number;
}

export interface VerificationDocument {
  id: string;
  userId: string;
  userName: string;
  docType: 'GST_CERTIFICATE' | 'POLLUTION_NOC' | 'LAB_TEST_REPORT' | 'FACTORY_LICENSE';
  fileName: string;
  fileSize: string;
  status: 'PENDING' | 'VERIFIED' | 'REJECTED';
  uploadDate: string;
  verifiedDate?: string;
  notes?: string;
}

export interface DisputeRecord {
  id: string;
  orderNumber: string;
  raisedBy: string;
  defendant: string;
  reason: string;
  details: string;
  status: 'OPEN' | 'INVESTIGATING' | 'RESOLVED' | 'DISMISSED';
  createdAt: string;
  resolution?: string;
}
