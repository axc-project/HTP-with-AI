export interface Formulation {
  slug: string;
  name: string;
  tradeName: string;
  category: 'digestive' | 'cognitive' | 'respiratory' | 'botanical' | 'cardiovascular';
  tagline: string;
  historicalSource: string;
  historicalSourceHebrew?: string;
  historicalSourceArabic?: string;
  primaryScholar: string;
  period: string;
  summary: string;
  keyIngredients: Array<{
    name: string;
    arabicName?: string;
    hebrewName?: string;
    role: string;
    modernEquivalent?: string;
  }>;
  clinicalNotes: string;
  researchStatus: 'peer-reviewed' | 'historical' | 'in-progress';
  productUrl?: string;
  /** Path to product image in /public/images/formulas/ */
  image?: string;
  /** Price in USD cents (e.g. 4995 = $49.95). null = not yet established. */
  price: number | null;
  /** Shopify Storefront API variant GID. Set when store is configured. */
  shopifyVariantId?: string;
  /** Whether this formulation is available for purchase. */
  availableForPurchase: boolean;
  disclaimer: string;
}

export const formulations: Formulation[] = [
  {
    slug: 'digestive-balance-complex',
    name: 'Digestive Balance Complex™',
    tradeName: 'DBC-1',
    category: 'digestive',
    image: '/images/formulas/digestive-metabolic-core.png',
    tagline: 'Gastrointestinal equilibrium rooted in nine centuries of clinical observation.',
    historicalSource: 'Regimen of Health (Hanhagat HaBriut)',
    historicalSourceHebrew: 'הנהגת הבריאות',
    historicalSourceArabic: 'تدبير الصحة',
    primaryScholar: 'Rabbi Moses ben Maimon (Maimonides / Rambam)',
    period: '12th century CE — Cairo, Egypt',
    summary:
      'This formulation draws on the dietetic and pharmacognostic principles laid out by Maimonides in his Regimen of Health, composed for Sultan al-Afdal in Cairo circa 1198 CE. The text systematically addresses gastric temperament, humoral balance, and the role of aromatic botanicals in supporting digestive fire (al-harara al-ghariziyya). Modern phytochemical analysis reveals strong mechanistic alignment with contemporary GI research.',
    keyIngredients: [
      {
        name: 'Ginger Rhizome',
        arabicName: 'زنجبيل (zanjabīl)',
        hebrewName: 'זנגביל',
        role: 'Thermogenic digestive stimulant; anti-emetic activity',
        modernEquivalent: 'Zingiber officinale — gingerols & shogaols',
      },
      {
        name: 'Caraway Seed',
        arabicName: 'كراوية (karāwiyā)',
        hebrewName: 'קרווי',
        role: 'Carminative; relieves intestinal spasm',
        modernEquivalent: 'Carum carvi — carvone, limonene',
      },
      {
        name: 'Fennel Seed',
        arabicName: 'شمار (shammār)',
        hebrewName: 'שומר',
        role: 'Spasmolytic; promotes gastric motility',
        modernEquivalent: 'Foeniculum vulgare — trans-anethole',
      },
      {
        name: 'Coriander Seed',
        arabicName: 'كزبرة (kuzbara)',
        hebrewName: 'כוסברה',
        role: 'Cooling digestive; anti-flatulent',
        modernEquivalent: 'Coriandrum sativum — linalool',
      },
      {
        name: 'Pomegranate Rind',
        arabicName: 'رمان (rummān)',
        hebrewName: 'רימון',
        role: 'Astringent; antimicrobial; mucosal support',
        modernEquivalent: 'Punica granatum — ellagic acid, punicalagins',
      },
    ],
    clinicalNotes:
      'Preclinical and early-phase clinical evidence supports the anti-inflammatory, prokinetic, and mucosal-protective activities of the component botanicals. Full clinical dossier available upon institutional request. This product has not been evaluated by the FDA and is not intended to diagnose, treat, cure, or prevent any disease.',
    researchStatus: 'in-progress',
    price: null,
    availableForPurchase: false,
    disclaimer:
      'This formulation is presented for educational and historical research purposes only. It is not a drug, medical device, or regulated therapeutic agent. Statements have not been evaluated by the Food and Drug Administration.',
  },
  {
    slug: 'cognitive-clarity-blend',
    name: 'Cognitive Clarity Blend™',
    tradeName: 'CCB-2',
    category: 'cognitive',
    image: '/images/formulas/cognitive-vitality-complex.png',
    tagline: 'Neuroprotective botanicals documented in medieval Andalusian pharmacopeia.',
    historicalSource: 'Kitāb al-Taysīr fī al-Mudāwāt wa-al-Tadbīr',
    historicalSourceArabic: 'كتاب التيسير في المداواة والتدبير',
    primaryScholar: 'Ibn Zuhr (Avenzoar)',
    period: '12th century CE — Seville, Al-Andalus',
    summary:
      'Derived from the clinical compendium of Ibn Zuhr, court physician to the Almohad caliphate, this formulation targets the "animal spirit" (rūḥ ḥaywānī) residing in the brain ventricles. Ibn Zuhr's empirical observations on cognition and memory preceded modern neuroscience by eight centuries. The constituent botanicals exhibit documented cholinergic, antioxidant, and anti-neuroinflammatory mechanisms.',
    keyIngredients: [
      {
        name: 'Rosemary Leaf',
        arabicName: 'إكليل الجبل (iklīl al-jabal)',
        role: 'Acetylcholinesterase inhibition; cerebral circulation',
        modernEquivalent: 'Salvia rosmarinus — rosmarinic acid, carnosic acid',
      },
      {
        name: 'Saffron Stigma',
        arabicName: 'زعفران (zaʿfarān)',
        hebrewName: 'כרכום',
        role: 'Neuroprotective; serotonergic modulation',
        modernEquivalent: 'Crocus sativus — crocin, safranal',
      },
      {
        name: 'Bacopa Herb',
        arabicName: 'براهمي (brāhmī)',
        role: 'Synaptic plasticity; memory consolidation',
        modernEquivalent: 'Bacopa monnieri — bacosides A & B',
      },
      {
        name: 'Lion\'s Mane Mushroom',
        role: 'NGF synthesis stimulation; myelin support',
        modernEquivalent: 'Hericium erinaceus — hericenones, erinacines',
      },
    ],
    clinicalNotes:
      'Randomized controlled trial data exists for individual components at specified doses. Synergistic formulation under ongoing investigation at partner research institutions. IRB protocols available upon request.',
    researchStatus: 'peer-reviewed',
    disclaimer:
      'This formulation is presented for educational and historical research purposes only. Not a drug or therapeutic. Consult a qualified healthcare practitioner before use.',
    price: null,
    availableForPurchase: false,
  },
  {
    slug: 'respiratory-harmony-formula',
    name: 'Respiratory Harmony Formula™',
    tradeName: 'RHF-3',
    category: 'respiratory',
    image: '/images/formulas/cellular-resilience-complex.png',
    tagline: 'Pulmonary botanicals from the Ibn Sīnā pharmacognostic canon.',
    historicalSource: 'Al-Qānūn fī al-Ṭibb (The Canon of Medicine)',
    historicalSourceArabic: 'القانون في الطب',
    primaryScholar: 'Ibn Sīnā (Avicenna)',
    period: '11th century CE — Bukhara & Hamadan, Persia',
    summary:
      'The Canon of Medicine dedicates three full chapters of Book IV to respiratory pathologies, providing the most systematic pre-modern account of pulmonary pharmacotherapy. This formulation reconstructs Ibn Sīnā\'s core "expectorant-humidifying" compound (murakkab mulaṭṭif) using authenticated botanical sources cross-referenced against the Leiden and Cairo manuscript traditions.',
    keyIngredients: [
      {
        name: 'Licorice Root',
        arabicName: 'عرق السوس (ʿirq al-sūs)',
        hebrewName: 'שוש',
        role: 'Demulcent; anti-inflammatory; expectorant',
        modernEquivalent: 'Glycyrrhiza glabra — glycyrrhizin, liquiritin',
      },
      {
        name: 'Thyme Herb',
        arabicName: 'صعتر (ṣaʿtar)',
        role: 'Bronchospasmolytic; antimicrobial',
        modernEquivalent: 'Thymus vulgaris — thymol, carvacrol',
      },
      {
        name: 'Elecampane Root',
        arabicName: 'راسن (rāsin)',
        role: 'Mucolytic; anti-infective pulmonary tonic',
        modernEquivalent: 'Inula helenium — alantolactone, isoalantolactone',
      },
      {
        name: 'Hyssop Herb',
        arabicName: 'زوفا (zūfā)',
        hebrewName: 'אזוב',
        role: 'Expectorant; antispasmodic',
        modernEquivalent: 'Hyssopus officinalis — pinocamphone, isopinocamphone',
      },
    ],
    clinicalNotes:
      'Component-level evidence supports bronchospasmolytic and mucociliary activity. No completed RCT on this specific formulation. Historical dossier prepared per EU Traditional Herbal Medicinal Products Directive framework for reference.',
    researchStatus: 'historical',
    disclaimer:
      'This formulation is presented for educational and historical research purposes only. It is not intended for the diagnosis, prevention, or treatment of respiratory conditions.',
    price: null,
    availableForPurchase: false,
  },
  {
    slug: 'cardiovascular-reserve-compound',
    name: 'Cardiovascular Reserve Compound™',
    tradeName: 'CRC-4',
    category: 'cardiovascular',
    image: '/images/formulas/circulatory-vitality-core.png',
    tagline: 'Cardiac tonics prescribed by Maimonides for the Ayyubid royal court.',
    historicalSource: 'Maqāla fī Bayān Baʿḍ al-Aʿrāḍ wa-al-Jawāb ʿanhā',
    historicalSourceArabic: 'مقالة في بيان بعض الأعراض والجواب عنها',
    historicalSourceHebrew: 'מאמר על ביאור כמה תסמינים',
    primaryScholar: 'Rabbi Moses ben Maimon (Maimonides / Rambam)',
    period: '12th century CE — Fustat (Old Cairo), Egypt',
    summary:
      'Composed as a private treatise for the Ayyubid court, this Maimonidean text presents the most detailed pre-modern account of cardiac tonic therapy in the Judeo-Arabic tradition. The formulation emphasizes fortifying the "vital spirit" (rūḥ ḥaywānī) of the heart through aromatic, bitter, and astringent botanicals — a therapeutic strategy now understood through the lens of cardioprotective polyphenols and adaptogenic compounds.',
    keyIngredients: [
      {
        name: 'Hawthorn Berry & Leaf',
        arabicName: 'زعرور (zaʿrūr)',
        role: 'Positive inotrope; coronary vasodilator',
        modernEquivalent: 'Crataegus monogyna — oligomeric proanthocyanidins, vitexin',
      },
      {
        name: 'Motherwort Herb',
        arabicName: 'عشبة الأم (ʿushbat al-umm)',
        role: 'Negative chronotrope; antispasmodic',
        modernEquivalent: 'Leonurus cardiaca — leonurine, stachydrine',
      },
      {
        name: 'Rose Hip',
        arabicName: 'ورد مجفف (ward mujaffaf)',
        hebrewName: 'ורד הכלב',
        role: 'Antioxidant; anti-inflammatory vascular support',
        modernEquivalent: 'Rosa canina — ascorbic acid, tiliroside',
      },
      {
        name: 'Cinnamon Bark',
        arabicName: 'دارصيني (dār ṣīnī)',
        hebrewName: 'קינמון',
        role: 'Circulatory stimulant; insulin sensitizer',
        modernEquivalent: 'Cinnamomum verum — cinnamaldehyde, procyanidins',
      },
    ],
    clinicalNotes:
      'Strong clinical evidence exists for hawthorn in mild-to-moderate heart failure (NYHA I-II). Compositional synergy under review. Full evidence matrix available for research collaborators.',
    researchStatus: 'peer-reviewed',
    price: null,
    availableForPurchase: false,
    disclaimer:
      'This formulation is presented for educational and historical research purposes only. It is not a cardiovascular drug or therapeutic. Persons with cardiac conditions must consult a qualified physician.',
  },
];

export function getFormulationBySlug(slug: string): Formulation | undefined {
  return formulations.find((f) => f.slug === slug);
}

export function getFormulationsByCategory(category: Formulation['category']): Formulation[] {
  return formulations.filter((f) => f.category === category);
}
