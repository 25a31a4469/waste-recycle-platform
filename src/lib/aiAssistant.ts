export interface ChatMessage {
  id: string;
  sender: 'user' | 'assistant';
  text: string;
  timestamp: string;
  chips?: string[];
  disclaimer?: boolean;
}

export const FAQ_KNOWLEDGE_BASE = [
  {
    keywords: ['fly ash', 'ఫ్లై యాష్', 'cement', 'సిమెంట్', 'brick', 'ఇటుక'],
    replyEn:
      'Dry Fly Ash (Grade F & C conforming to IS 3812 Part 1) is widely utilized for:\n1. **Portland Pozzolana Cement (PPC)**: Replaces 15-35% clinker, reducing heat of hydration and improving sulfate resistance.\n2. **Fly Ash Bricks & Paver Blocks**: Blended with lime, gypsum, and sand/quarry dust (Fal-G technology) yielding compressive strengths > 10.5 N/mm².\n3. **Ready Mix Concrete (RMC)**: Enhances workability and long-term durability in marine and subterranean structures.\n\n*Safety Advisory: Fly ash contains crystalline silica. Use enclosed pneumatic loading and standard dust masks during bulk handling.*',
    replyTe:
      'పొడి ఫ్లై యాష్ (IS 3812 Part 1 నిబంధనల ప్రకారం గ్రేడ్ F & C) ఈ క్రింది ప్రధాన పనులకు ఉపయోగపడుతుంది:\n1. **సిమెంట్ తయారీ (PPC)**: 15-35% క్లింకర్‌కు ప్రత్యామ్నాయంగా ఉపయోగించవచ్చు.\n2. **ఫ్లై యాష్ ఇటుకలు & పేవర్ బ్లాక్స్**: సున్నం, జిప్సం మరియు ఇసుకతో కలిపి తయారుచేస్తారు.\n3. **రెడీ మిక్స్ కాంక్రీట్ (RMC)**: మన్నికను పెంచుతుంది.\n\n*గమనిక: ఫ్లై యాష్‌లో సిలికా ఉంటుంది. నిర్వహణ సమయంలో డస్ట్ మాస్కులు మరియు న్యుమాటిక్ సైలోలను ఉపయోగించండి.*',
  },
  {
    keywords: ['slag', 'స్లాగ్', 'ggbs', 'foundry', 'ఫౌండ్రీ'],
    replyEn:
      'Industrial Slags (Blast Furnace Slag & Steel Slag) have extensive secondary applications:\n1. **Granulated Blast Furnace Slag (GGBS)**: When water-quenched and pulverized to >350 m²/kg, it serves as high-performance slag cement.\n2. **Road Sub-Base & Bituminous Layer**: Air-cooled steel slag functions as a superior aggregate with high CBR (California Bearing Ratio) values.\n3. **Railway Ballast & Shoreline Armor**: High bulk density provides excellent geotechnical stability.\n\n*Safety Advisory: Confirm free lime (CaO) content is <4% to prevent volumetric expansion in civil foundations.*',
    replyTe:
      'పారిశ్రామిక స్లాగ్ యొక్క ముఖ్యమైన ఉపయోగాలు:\n1. **GGBS గ్రీన్ సిమెంట్**: నీటి ద్వారా శుద్ధి చేసిన స్లాగ్‌ను పౌడర్‌గా చేసి ప్రీమియం సిమెంట్‌గా వాడతారు.\n2. **రహదారి నిర్మాణం (Sub-base)**: రోడ్డు నిర్మాణంలో సహజ రాళ్ళకు ప్రత్యామ్నాయంగా అద్భుతంగా పనిచేస్తుంది.\n3. **రైల్వే ట్రాక్ మరియు పోర్ట్ రక్షణ**: భారీ సాంద్రత వల్ల భూమి స్థిరత్వానికి తోడ్పడుతుంది.',
  },
  {
    keywords: ['pet', 'ప్లాస్టిక్', 'plastic', 'flakes', 'regrind'],
    replyEn:
      'To maximize the value of your PET Flakes / Regrind listing:\n- State whether it is **Hot Washed** (with caustic at >80°C) or **Cold Washed**.\n- Specify Intrinsic Viscosity (IV) — bottle-to-bottle grade requires IV > 0.76 dl/g, while textile fiber spinning accepts 0.65 - 0.72 dl/g.\n- Disclose PVC levels (target <25 ppm) and polyolefin floatables (<15 ppm).\n- Provide packaging details (1000 kg PP jumbo bags on wooden pallets facilitate rapid export or industrial loading).',
    replyTe:
      'మీ PET ప్లాస్టిక్ ఫ్లేక్స్ విక్రయాన్ని మెరుగుపరచడానికి సూచనలు:\n- ఇది **హాట్ వాష్డ్** లేదా **కోల్డ్ వాష్డ్** అనే వివరాలు స్పష్టంగా పేర్కొనండి.\n- IV (Intrinsic Viscosity) విలువను తెలపండి (బాటిల్ తయారీకి >0.76 dl/g, నూలు తయారీకి 0.65-0.72 dl/g).\n- PVC శాతం 25 ppm కంటే తక్కువగా ఉందని ల్యాబ్ రిపోర్ట్ జతచేయండి.\n- 1000 కిలోల జంబో బ్యాగ్‌లలో ప్యాకింగ్ వివరాలు కొనుగోలుదారులను ఆకర్షిస్తాయి.',
  },
  {
    keywords: ['bagasse', 'బగాస్', 'biomass', 'బోయ్లర్', 'pellet'],
    replyEn:
      'Sugarcane Bagasse & Agro-Residues offer high calorific value for industrial clean energy:\n1. **Bio-Coal Pellets / Briquettes**: Extruded into 8mm-90mm pellets with Gross Calorific Value (GCV) 3,600-4,100 kcal/kg, substituting fossil coal in boilers.\n2. **Moulded Pulp Packaging**: Bleached or unbleached bagasse fiber replaces single-use expanded polystyrene (thermocol) for food containers and electronics packaging.\n3. **Paper & Particle Board**: Chemical pulping for writing paper and medium density fiberboard (MDF).\n\n*CIRCUVIA Impact: Replaces ~0.85 MT of imported thermal coal per MT of pellets.*',
    replyTe:
      'చెరకు బగాస్ మరియు వ్యవసాయ వ్యర్థాల ముఖ్య ఉపయోగాలు:\n1. **బయోమాస్ పెల్లెట్స్ / బ్రిక్వెట్స్**: బొగ్గు స్థానంలో ఫ్యాక్టరీ బాయిలర్లలో పరిశుభ్రమైన ఇంధనంగా పనిచేస్తుంది (3,800+ kcal/kg).\n2. **పర్యావరణహిత ప్యాకేజింగ్**: ప్లాస్టిక్ మరియు థర్మాకోల్ స్థానంలో బగాస్ ప్లేట్లు మరియు బాక్సుల తయారీ.\n3. **కాగితం మరియు పార్టికల్ బోర్డుల తయారీ**: MDF బోర్డులు మరియు పేపర్ పల్ప్ కోసం అనుకూలం.',
  },
  {
    keywords: ['telangana', 'ఆంధ్రప్రదేశ్', 'hyderabad', 'హైదరాబాద్', 'supplier', 'recycler'],
    replyEn:
      'Top recycling clusters in Telangana & Andhra Pradesh:\n- **Plastics & Polymers**: Jeedimetla, Cherlapally, Kattedan (Hyderabad), and Autonagar (Vijayawada).\n- **Fly Ash & Minerals**: Ramagundam (NTPC), Palvancha (KTPS), Visakhapatnam (NTPC Simhadri), and Ibrahimpatnam (VTPS).\n- **Cotton & Textiles**: Guntur, Warangal, and Rajahmundry spinning corridors.\n- **Bulk Solvents & Active Ingredients**: Jawaharlal Nehru Pharma City (JNPC, Visakhapatnam) and Pashamylaram (Hyderabad).',
    replyTe:
      'తెలంగాణ మరియు ఆంధ్రప్రదేశ్‌లోని ప్రముఖ రీసైక్లింగ్ ప్రాంతాలు:\n- **ప్లాస్టిక్స్**: జీడిమెట్ల, చర్లపల్లి, కాటేదాన్ (హైదరాబాద్), ఆటోనగర్ (విజయవాడ).\n- **ఫ్లై యాష్ & ఖనిజాలు**: రామగుండం, పాల్వంచ, విశాఖపట్నం, ఇబ్రహీంపట్నం.\n- **వస్త్ర వ్యర్థాలు (కాటన్)**: గుంటూరు, వరంగల్, రాజమండ్రి.\n- **ఫార్మా రసాయనాలు**: జవహర్‌లాల్ నెహ్రూ ఫార్మా సిటీ (విశాఖపట్నం), పాశమైలారం (హైదరాబాద్).',
  },
];

export function getAiAssistantResponse(query: string, lang: 'en' | 'te'): ChatMessage {
  const normalized = query.toLowerCase();

  for (const item of FAQ_KNOWLEDGE_BASE) {
    if (item.keywords.some((k) => normalized.includes(k.toLowerCase()))) {
      return {
        id: `msg_${Date.now()}`,
        sender: 'assistant',
        text: lang === 'te' ? item.replyTe : item.replyEn,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        disclaimer: true,
      };
    }
  }

  // Generic intelligent fallback
  if (lang === 'te') {
    return {
      id: `msg_${Date.now()}`,
      sender: 'assistant',
      text: `మీరు అడిగిన "${query}" అంశాన్ని సర్క్యువియా వనరుల విజ్ఞాన భాండాగారం విశ్లేషించింది.\n\nవృత్తాకార ఆర్థిక వ్యవస్థలో ప్రతి పారిశ్రామిక వ్యర్థానికి అనువైన పునర్వినియోగ మార్గం ఉంది. మెటీరియల్ కేటగిరీ, పరిమాణం (MT/Kg) మరియు రసాయన లక్షణాలు నమోదు చేస్తే మరింత ఖచ్చితమైన మ్యాచ్‌లను అందించగలం.\n\n*గమనిక: రసాయన కూర్పు మరియు భద్రతపై సూచనలు ప్రాథమిక మార్గదర్శకత్వం కోసం మాత్రమే. అధీకృత ల్యాబ్ నివేదికలను పరిశీలించండి.*`,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      chips: ['ఫ్లై యాష్ ఉపయోగాలు', 'PET ఫ్లేక్స్ విక్రయం', 'బగాస్ పెల్లెట్స్', 'తెలంగాణ రీసైక్లర్లు'],
      disclaimer: true,
    };
  }

  return {
    id: `msg_${Date.now()}`,
    sender: 'assistant',
    text: `Based on industrial symbiosis frameworks for "${query}":\n\n1. **Commercial Potential**: Evaluate whether this material is best categorized under By-Products, Recycled Feedstocks, or Surplus Raw Materials.\n2. **Compliance & Verification**: Under CPCB guidelines, attaching a standard third-party certificate of analysis (COA) increases buyer inquiries by ~68%.\n3. **Suggested Next Steps**: You can list this resource in our Marketplace Wizard or issue a customized RFQ in the Procurement Center.\n\n*Advisory: All technical recommendations are consultative. Hazardous waste classification and transport safety must adhere strictly to Hazardous and Other Wastes Rules.*`,
    timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
    chips: ['Industrial slag uses', 'Improving PET listing', 'Bagasse bio-energy', 'Regional suppliers in South India'],
    disclaimer: true,
  };
}
