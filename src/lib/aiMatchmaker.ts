import { ResourceListing, MatchRecommendation, UserRole } from '@/types';

interface MatchCriteria {
  targetCategory?: string;
  targetRole?: UserRole;
  userCity?: string;
  userState?: string;
  maxDistanceKm?: number;
  requiredQuantity?: number;
  maxBudgetPerUnit?: number;
  requiresLabReport?: boolean;
}

// Distance approximation between major Indian manufacturing hubs (in km)
const CITY_DISTANCES: Record<string, Record<string, number>> = {
  Ramagundam: { Karimnagar: 65, Hyderabad: 230, Visakhapatnam: 480, Guntur: 340, Bengaluru: 810, Mumbai: 820 },
  Karimnagar: { Ramagundam: 65, Hyderabad: 165, Visakhapatnam: 520, Guntur: 290, Bengaluru: 750, Mumbai: 780 },
  Hyderabad: { Ramagundam: 230, Karimnagar: 165, Visakhapatnam: 620, Guntur: 270, Bengaluru: 570, Chennai: 630, Mumbai: 710 },
  Visakhapatnam: { Ramagundam: 480, Hyderabad: 620, Guntur: 360, Vijayawada: 350, Chennai: 800, Kolkata: 870 },
  Guntur: { Hyderabad: 270, Vijayawada: 35, Visakhapatnam: 360, Chennai: 380, Bengaluru: 610 },
  Vijayawada: { Guntur: 35, Hyderabad: 275, Visakhapatnam: 350, Chennai: 450, Bengaluru: 640 },
  Bengaluru: { Hyderabad: 570, Chennai: 350, Coimbatore: 360, Pune: 840, Mumbai: 980 },
  Coimbatore: { Bengaluru: 360, Chennai: 500, Hyderabad: 920, Mumbai: 1250 },
  Chennai: { Bengaluru: 350, Hyderabad: 630, Guntur: 380, Coimbatore: 500, Mumbai: 1330 },
  Mumbai: { Pune: 150, Ahmedabad: 530, Hyderabad: 710, Bengaluru: 980, Delhi: 1420 },
  Pune: { Mumbai: 150, Ahmedabad: 660, Hyderabad: 560, Bengaluru: 840 },
  Ahmedabad: { Mumbai: 530, Pune: 660, Delhi: 940, Jaipur: 670, Hyderabad: 1210 },
};

export function getApproxDistance(origin: string, destination: string): number {
  if (origin.toLowerCase() === destination.toLowerCase()) return 25;
  if (CITY_DISTANCES[origin] && CITY_DISTANCES[origin][destination]) {
    return CITY_DISTANCES[origin][destination];
  }
  if (CITY_DISTANCES[destination] && CITY_DISTANCES[destination][origin]) {
    return CITY_DISTANCES[destination][origin];
  }
  return 450; // default average intra-state / interstate Indian transit distance
}

export function calculateCircularMatch(
  listing: ResourceListing,
  criteria: MatchCriteria
): MatchRecommendation {
  let score = 50; // base score
  const reasons: string[] = [];
  const reasonsTe: string[] = [];

  const distance = criteria.userCity
    ? getApproxDistance(listing.locationCity, criteria.userCity)
    : 180;

  // 1. Category alignment
  if (criteria.targetCategory && criteria.targetCategory === listing.category) {
    score += 20;
    reasons.push(`Direct Category Match: 100% material alignment for ${listing.category}.`);
    reasonsTe.push(`నేరుగా సరిపోలే విభాగం: ${listing.category} కోసం 100% మెటీరియల్ అనుకూలత.`);
  } else {
    score += 10;
  }

  // 2. Geographic proximity
  if (distance <= 150) {
    score += 15;
    reasons.push(`Local Cluster Proximity (${distance} km): Drastically cuts freight carbon footprint.`);
    reasonsTe.push(`సమీప పారిశ్రామిక వాడ (${distance} కి.మీ.): రవాణా ఖర్చు మరియు ఉద్గారాలు గణనీయంగా తగ్గుతాయి.`);
  } else if (distance <= 450) {
    score += 8;
    reasons.push(`Regional Economic Zone (${distance} km): Direct highway connectivity for bulk tippers.`);
    reasonsTe.push(`ప్రాంతీయ నెట్‌వర్క్ (${distance} కి.మీ.): నేరుగా జాతీయ రహదారి రవాణా అనుకూలత.`);
  } else {
    score -= 5;
    reasons.push(`Interstate Transport (${distance} km): Rail freight or multi-axle trailers recommended.`);
    reasonsTe.push(`రాష్ట్రాల మధ్య రవాణా (${distance} కి.మీ.): రైలు లేదా భారీ ట్రక్కుల రవాణా సిఫార్సు.`);
  }

  // 3. Lab certification & verification
  if (listing.hasLabTestReport) {
    score += 10;
    reasons.push(`Verified Quality: Laboratory test report / chemical assay is attached.`);
    reasonsTe.push(`నాణ్యతా ధృవీకరణ: అధికారిక ల్యాబ్ పరీక్ష నివేదిక జతచేయబడింది.`);
  }
  if (listing.isVerifiedSeller) {
    score += 5;
    reasons.push(`Trusted Source: Facility holds verified GST & industrial pollution compliance status.`);
    reasonsTe.push(`విశ్వసనీయ సంస్థ: GST మరియు పర్యావరణ నిబంధనల ధృవీకరణ ఉంది.`);
  }

  // 4. Quantity alignment
  if (criteria.requiredQuantity) {
    if (listing.quantity >= criteria.requiredQuantity && listing.minOrderQuantity <= criteria.requiredQuantity) {
      score += 10;
      reasons.push(`Quantity Fit: Can supply your required ${criteria.requiredQuantity} ${listing.unit} without backlog.`);
      reasonsTe.push(`పరిమాణ అనుకూలత: మీ అవసరమైన ${criteria.requiredQuantity} ${listing.unit} వెంటనే అందించగలదు.`);
    }
  }

  // Cap score between 35 and 98%
  const finalScore = Math.min(Math.max(score, 35), 98);

  // Carbon and economic estimates based on CPCB / EPA factors
  // 1 MT waste diverted ~ 0.82 to 2.4 MT CO2e avoided depending on material
  const massKg = listing.quantity * (listing.unit === 'MT' ? 1000 : 1);
  const carbonOffsetEstimateKg = Math.round(massKg * 0.95);
  // Estimated economic benefit: secondary material cost is typically 30-40% below virgin raw material
  const costSavingsEstimateInr = Math.round(listing.pricePerUnit * (listing.quantity > 50 ? 50 : listing.quantity) * 0.35);

  return {
    id: `rec_${listing.id}`,
    listing,
    matchScore: finalScore,
    reasons,
    reasonsTe,
    carbonOffsetEstimateKg,
    costSavingsEstimateInr,
    proximityKm: distance,
  };
}

export function findTopMatches(
  listings: ResourceListing[],
  criteria: MatchCriteria
): MatchRecommendation[] {
  return listings
    .filter((l) => l.status === 'ACTIVE')
    .map((l) => calculateCircularMatch(l, criteria))
    .sort((a, b) => b.matchScore - a.matchScore);
}
