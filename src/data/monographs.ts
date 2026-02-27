/**
 * Ingredient Monographs — Complete Research Database
 * Historical Translation Project™
 *
 * 39 ingredients documented from:
 *   - Rambam's Guide to Health, Appendix A (Monographs 1–30)
 *   - Formulation chapters (Digestive Bitter Complex, Urinary Support Complex)
 *   - Cross-traditional additions (Bacopa, Lion's Mane)
 *   - Cardiovascular/Respiratory formulation design
 *
 * Each monograph includes supporting publication references with DOI/PubMed links.
 * All language conforms to DSHEA structure/function requirements.
 */

export interface PublicationRef {
  /** Short citation */
  citation: string;
  /** URL — DOI link, PubMed link, or institutional URL */
  url?: string;
  /** Reference type */
  type: 'rct' | 'systematic-review' | 'meta-analysis' | 'monograph' | 'pharmacopoeia' | 'historical' | 'preclinical' | 'book';
}

export interface IngredientMonograph {
  /** Monograph number from Rambam's Guide Appendix A (1–30), or 0 for additions */
  monographNumber: number;
  name: string;
  latinBinomial: string;
  arabicName?: string;
  hebrewName?: string;
  category: 'digestive' | 'cognitive' | 'respiratory' | 'cardiovascular' | 'urinary' | 'hepatoprotective' | 'anti-inflammatory' | 'nervine' | 'antimicrobial' | 'glycemic-metabolic' | 'multi-system';
  formulationSlugs: string[];
  historicalUse: string;
  activeCompounds: string[];
  modernResearch: string;
  safetyNotes: string;
  references: PublicationRef[];
}

export const ingredientMonographs: IngredientMonograph[] = [
  // ═════════════════════════════════════════════════════════
  // MONOGRAPHS 1–30 (from Rambam's Guide Appendix A)
  // ═════════════════════════════════════════════════════════

  {
    monographNumber: 1,
    name: 'Wormwood',
    latinBinomial: 'Artemisia absinthium',
    arabicName: 'Afsantīn (أفسنتين)',
    hebrewName: 'Afsantin (אפסנתין)',
    category: 'digestive',
    formulationSlugs: ['digestive-balance-complex'],
    historicalUse: 'Rambam documented wormwood as the paradigmatic digestive bitter. Classified as hot and dry, used primarily for bile stimulation and appetite enhancement. Avicenna prescribed it extensively in the Canon for gastric weakness and hepatic insufficiency. One of the most consistently prescribed botanicals across the Galenic-Islamic tradition.',
    activeCompounds: ['Absinthin (sesquiterpene lactone)', 'Artabsin', 'Thujone (minor)', 'Chamazulene'],
    modernResearch: 'Absinthin activates TAS2R bitter taste receptors throughout the GI tract, triggering increased gastric acid secretion, gastrin release, and CCK-mediated bile/pancreatic enzyme production. Research supports its traditional role in supporting healthy digestive secretion and appetite.',
    safetyNotes: 'Safe at standard supplemental doses. Thujone content is well below concern at extract-standardized doses. Avoid in pregnancy. Contraindicated in seizure disorders at high doses. Asteraceae allergy possible.',
    references: [
      { citation: 'Lachenmeier DW. Wormwood (Artemisia absinthium)—A curious plant with both neurotoxic and neuroprotective properties? J Ethnopharmacol. 2010;131(1):224-227.', url: 'https://doi.org/10.1016/j.jep.2010.05.062', type: 'preclinical' },
      { citation: 'German Commission E Monograph: Artemisia absinthium (Wormwood herb)', url: 'https://buecher.heilpflanzen-welt.de/BGA-Commission-E-Monographs/0022.htm', type: 'pharmacopoeia' },
      { citation: 'Historical Translation Project. Rambam\'s Guide to Health, Monograph 1, p. 34.', type: 'book' },
    ],
  },

  {
    monographNumber: 2,
    name: 'Celery Seed',
    latinBinomial: 'Apium graveolens',
    arabicName: 'Karafs (كرفس)',
    hebrewName: 'Karpass (כרפס)',
    category: 'urinary',
    formulationSlugs: [],
    historicalUse: 'Documented in both the Talmudic and Islamic medical traditions as a primary diuretic and urinary-supportive plant. Rambam referenced celery for its role in supporting urinary flow and kidney function. Its appearance at the Passover seder (karpas) reflects its deep cultural significance.',
    activeCompounds: ['3-n-Butylphthalide', 'Sedanolide', 'Apigenin', 'Luteolin'],
    modernResearch: 'Phthalide compounds contribute mild vasodilatory effects that may support renal blood flow. Research suggests celery seed may support healthy urinary function and normal fluid balance. Apigenin provides antioxidant activity.',
    safetyNotes: 'Generally safe. Apiaceae family allergen potential. Photosensitivity possible with high-dose use. Avoid concentrated extract in pregnancy.',
    references: [
      { citation: 'Sowbhagya HB. Chemistry, technology, and nutraceutical functions of celery (Apium graveolens L.). Crit Rev Food Sci Nutr. 2014;54(3):389-398.', url: 'https://doi.org/10.1080/10408398.2011.586740', type: 'systematic-review' },
      { citation: 'Historical Translation Project. Rambam\'s Guide to Health, Monograph 2, p. 35.', type: 'book' },
    ],
  },

  {
    monographNumber: 3,
    name: 'Aloe Vera',
    latinBinomial: 'Aloe barbadensis',
    arabicName: 'Ṣabr (صبر)',
    hebrewName: 'Alui (אלוי)',
    category: 'digestive',
    formulationSlugs: [],
    historicalUse: 'One of the most ancient medicinal plants documented across all traditions. Rambam distinguished between the bitter latex (cathartic) and the gel (demulcent). Avicenna documented both external and internal applications in the Canon, classifying aloe among the most reliable purgative medicines.',
    activeCompounds: ['Acemannan (polysaccharide)', 'Aloin (anthraquinone glycoside)', 'Barbaloin', 'Aloe-emodin'],
    modernResearch: 'Acemannan has been studied for immunomodulatory and wound-healing properties. The gel supports healthy mucosal integrity. Anthraquinone content (aloin) supports bowel regularity but requires careful dosing.',
    safetyNotes: 'Gel is very safe topically and orally. Latex/aloin is a stimulant cathartic — chronic use not recommended. Avoid in pregnancy (uterotonic). May cause electrolyte depletion with prolonged internal use.',
    references: [
      { citation: 'Surjushe A, Vasani R, Saple DG. Aloe vera: a short review. Indian J Dermatol. 2008;53(4):163-166.', url: 'https://doi.org/10.4103/0019-5154.44785', type: 'systematic-review' },
      { citation: 'WHO Monographs on Selected Medicinal Plants, Vol. 1: Aloe vera gel / Aloe.', url: 'https://apps.who.int/iris/handle/10665/42052', type: 'pharmacopoeia' },
      { citation: 'Historical Translation Project. Rambam\'s Guide to Health, Monograph 3, p. 35.', type: 'book' },
    ],
  },

  {
    monographNumber: 4,
    name: 'Ginger Rhizome',
    latinBinomial: 'Zingiber officinale',
    arabicName: 'Zanjabīl (زنجبيل)',
    hebrewName: 'Zangvil (זנגביל)',
    category: 'digestive',
    formulationSlugs: ['digestive-balance-complex'],
    historicalUse: 'Maimonides classified ginger among the warming carminatives in the Regimen of Health. Avicenna documented it as a first-line digestive aid in the Canon, noting its warming quality (mizāj ḥārr). The dossier records standardized extract (5% gingerols) at 150mg per serving.',
    activeCompounds: ['6-Gingerol', '8-Gingerol', '10-Gingerol', 'Shogaols', 'Zingerone', 'Zingiberene'],
    modernResearch: 'Gingerols and shogaols activate TRPV1 receptors and demonstrate gastroprokinetic activity (accelerates gastric emptying). Multiple systematic reviews and meta-analyses support its role in digestive comfort and normal GI motility. 5-HT3 antagonism provides anti-nausea mechanism.',
    safetyNotes: 'Very well-tolerated. Mild antiplatelet activity at high doses — discuss with healthcare provider if taking anticoagulants. Discontinue 2 weeks before surgery.',
    references: [
      { citation: 'Viljoen E et al. Systematic review and meta-analysis of ginger in pregnancy-associated nausea. Nutr J. 2014;13:20.', url: 'https://doi.org/10.1186/1475-2891-13-20', type: 'meta-analysis' },
      { citation: 'Hu ML et al. Effect of ginger on gastric motility and symptoms of functional dyspepsia. World J Gastroenterol. 2011;17(1):105-110.', url: 'https://doi.org/10.3748/wjg.v17.i1.105', type: 'rct' },
      { citation: 'Toth B et al. Ginger: An alternative for prevention of postoperative nausea. Phytomedicine. 2018;50:8-18.', url: 'https://doi.org/10.1016/j.phymed.2018.09.007', type: 'meta-analysis' },
      { citation: 'WHO Monographs Vol. 1: Rhizoma Zingiberis.', url: 'https://apps.who.int/iris/handle/10665/42052', type: 'pharmacopoeia' },
      { citation: 'NCCIH. Ginger. National Center for Complementary and Integrative Health.', url: 'https://www.nccih.nih.gov/health/ginger', type: 'monograph' },
      { citation: 'Historical Translation Project. Rambam\'s Guide to Health, Monograph 4, p. 36.', type: 'book' },
    ],
  },

  {
    monographNumber: 5,
    name: 'Caper',
    latinBinomial: 'Capparis spinosa',
    arabicName: 'Kabar (كبر)',
    hebrewName: 'Tzalaf (צלף)',
    category: 'urinary',
    formulationSlugs: [],
    historicalUse: 'Documented in the Talmud and Maimonidean corpus. Classified in the Islamic tradition for liver and spleen support, and as a diuretic. Avicenna recommended caper for urinary support and "opening obstructions" in the viscera.',
    activeCompounds: ['Rutin', 'Quercetin', 'Kaempferol', 'Glucocapparin', 'Stachydrine'],
    modernResearch: 'Rich in flavonoids (rutin, quercetin) with antioxidant properties. Preclinical research has examined its role in supporting healthy glycemic function and hepatoprotection. Stachydrine has been studied for diuretic properties.',
    safetyNotes: 'Generally safe at culinary doses. Limited safety data for high-dose supplementation.',
    references: [
      { citation: 'Tlili N et al. Caper (Capparis spp.): Molecular and pharmacological insights. Phytochem Rev. 2011;10:499-517.', url: 'https://doi.org/10.1007/s11101-011-9201-6', type: 'systematic-review' },
      { citation: 'Historical Translation Project. Rambam\'s Guide to Health, Monograph 5, p. 36.', type: 'book' },
    ],
  },

  {
    monographNumber: 6,
    name: 'Vinegar',
    latinBinomial: 'Acetic acid (fermentation product)',
    arabicName: 'Khall (خل)',
    hebrewName: 'Ḥometz (חומץ)',
    category: 'glycemic-metabolic',
    formulationSlugs: [],
    historicalUse: 'Rambam documented vinegar extensively for digestive support and as a food preservative. Used medicinally across all ancient traditions. The Talmud references vinegar as both a condiment and a remedy. Avicenna classified it as cold and dry.',
    activeCompounds: ['Acetic acid', 'Polyphenols (in apple cider vinegar)', 'Organic acids'],
    modernResearch: 'Multiple RCTs suggest vinegar consumption may support healthy post-prandial glycemic response. Acetic acid may delay gastric emptying and inhibit disaccharidase activity, supporting blood sugar regulation after meals.',
    safetyNotes: 'Safe at culinary doses. Undiluted vinegar may damage tooth enamel and esophageal tissue. May enhance hypoglycemic effects of diabetes medications.',
    references: [
      { citation: 'Johnston CS, Gaas CA. Vinegar: Medicinal uses and antiglycemic effect. MedGenMed. 2006;8(2):61.', url: 'https://pubmed.ncbi.nlm.nih.gov/16926800/', type: 'systematic-review' },
      { citation: 'Historical Translation Project. Rambam\'s Guide to Health, Monograph 6, p. 37.', type: 'book' },
    ],
  },

  {
    monographNumber: 7,
    name: 'Honey',
    latinBinomial: 'Mel (Apis mellifera product)',
    arabicName: "ʿAsal (عسل)",
    hebrewName: 'Dvash (דבש)',
    category: 'antimicrobial',
    formulationSlugs: [],
    historicalUse: 'One of the most sacred medicinal substances in both Islamic and Jewish traditions. Referenced throughout the Torah, Talmud, and Qur\'an. Maimonides prescribed honey for throat comfort and as a vehicle for other medicines. Avicenna documented its antimicrobial and wound-healing properties extensively.',
    activeCompounds: ['Methylglyoxal (MGO, in manuka)', 'Hydrogen peroxide (via glucose oxidase)', 'Defensin-1', 'Flavonoids', 'Phenolic acids'],
    modernResearch: 'Cochrane reviews confirm honey supports wound healing and upper respiratory comfort. Manuka honey\'s MGO content provides superior antimicrobial activity. Research supports its traditional role as a cough suppressant and throat soother.',
    safetyNotes: 'Very safe for adults. Never give to infants under 12 months (botulism risk). High caloric content. May affect glycemic control in diabetic patients.',
    references: [
      { citation: 'Jull AB et al. Honey as a topical treatment for wounds. Cochrane Database Syst Rev. 2015;3:CD005083.', url: 'https://doi.org/10.1002/14651858.CD005083.pub4', type: 'systematic-review' },
      { citation: 'Oduwole O et al. Honey for acute cough in children. Cochrane Database Syst Rev. 2018;4:CD007094.', url: 'https://doi.org/10.1002/14651858.CD007094.pub5', type: 'systematic-review' },
      { citation: 'Historical Translation Project. Rambam\'s Guide to Health, Monograph 7, p. 37.', type: 'book' },
    ],
  },

  {
    monographNumber: 8,
    name: 'Garlic',
    latinBinomial: 'Allium sativum',
    arabicName: 'Thawm (ثوم)',
    hebrewName: 'Shum (שום)',
    category: 'antimicrobial',
    formulationSlugs: [],
    historicalUse: 'Among the most prescribed botanicals in the entire Maimonidean corpus. Documented for cardiovascular support, antimicrobial action, and digestive warmth. The Talmud specifically recommends garlic consumption on Friday nights. Avicenna classified it as hot in the fourth degree.',
    activeCompounds: ['Allicin (thiosulfinate)', 'Ajoene', 'S-allylcysteine', 'Diallyl disulfide'],
    modernResearch: 'Multiple meta-analyses suggest garlic may support healthy blood pressure and lipid profiles. Allicin demonstrates broad-spectrum antimicrobial activity. S-allylcysteine (aged garlic) has been studied for cardiovascular support.',
    safetyNotes: 'Safe at culinary doses. High antiplatelet activity — discontinue 2 weeks before surgery. May interact with anticoagulants. Mild CYP450 interactions. GI discomfort common at high supplemental doses.',
    references: [
      { citation: 'Ried K et al. Effect of garlic on blood pressure: A systematic review and meta-analysis. BMC Cardiovasc Disord. 2008;8:13.', url: 'https://doi.org/10.1186/1471-2261-8-13', type: 'meta-analysis' },
      { citation: 'NCCIH. Garlic. National Center for Complementary and Integrative Health.', url: 'https://www.nccih.nih.gov/health/garlic', type: 'monograph' },
      { citation: 'Historical Translation Project. Rambam\'s Guide to Health, Monograph 8, p. 38.', type: 'book' },
    ],
  },

  {
    monographNumber: 9,
    name: 'Henna',
    latinBinomial: 'Lawsonia inermis',
    arabicName: 'Ḥinnā (حناء)',
    hebrewName: 'Kofer (כופר)',
    category: 'multi-system',
    formulationSlugs: [],
    historicalUse: 'Documented primarily for topical use in the Islamic medical tradition — cooling, astringent, and antimicrobial. Avicenna prescribed henna poultices for headaches, skin conditions, and wound healing. Used ceremonially across the Islamic world.',
    activeCompounds: ['Lawsone (2-hydroxy-1,4-naphthoquinone)', 'Gallic acid', 'Tannic acid'],
    modernResearch: 'Lawsone has demonstrated antimicrobial and antifungal activity in laboratory studies. Primarily studied for topical applications. Limited modern research on internal use.',
    safetyNotes: 'Safe for external/topical use. Internal use not well-studied and generally not recommended at supplemental doses. G6PD deficiency: lawsone can trigger hemolytic episodes.',
    references: [
      { citation: 'Semwal RB et al. Lawsonia inermis L. (henna): Ethnobotanical, phytochemical and pharmacological aspects. J Ethnopharmacol. 2014;155(1):80-103.', url: 'https://doi.org/10.1016/j.jep.2014.05.042', type: 'systematic-review' },
      { citation: 'Historical Translation Project. Rambam\'s Guide to Health, Monograph 9, p. 38.', type: 'book' },
    ],
  },

  {
    monographNumber: 10,
    name: 'Cumin Seed',
    latinBinomial: 'Cuminum cyminum',
    arabicName: 'Kammūn (كمون)',
    hebrewName: 'Kammon (כמון)',
    category: 'digestive',
    formulationSlugs: ['digestive-balance-complex'],
    historicalUse: 'Mentioned in Isaiah 28:25,27 and extensively in the Talmud. One of the most widely used spice-medicines of the ancient Mediterranean world. Classified as warming and drying in the Islamic medical tradition. The dossier records 10:1 extract at 200mg per serving.',
    activeCompounds: ['Cuminaldehyde', 'Gamma-terpinene', 'p-Cymene', 'Beta-pinene'],
    modernResearch: 'RCT (Zare et al., 2014; 88 subjects): cumin supplementation significantly improved lipid profiles vs. placebo. Carminative and smooth muscle relaxant mechanisms documented. High dietary iron content provides additional nutritional benefit.',
    safetyNotes: 'Very safe at culinary and supplemental doses. Long history of safe use across cultures.',
    references: [
      { citation: 'Zare R et al. Effect of cumin powder on body composition and lipid profile in overweight women. Complement Ther Clin Pract. 2014;20(4):297-301.', url: 'https://doi.org/10.1016/j.ctcp.2014.10.001', type: 'rct' },
      { citation: 'Historical Translation Project. Rambam\'s Guide to Health, Monograph 10, p. 36.', type: 'book' },
      { citation: 'Historical Translation Project. Digestive Balance Complex™ Dossier, Ingredient 2.', type: 'book' },
    ],
  },

  {
    monographNumber: 11,
    name: 'Turmeric',
    latinBinomial: 'Curcuma longa',
    arabicName: 'Kurkum (كركم)',
    hebrewName: 'Karkom (כרכם)',
    category: 'anti-inflammatory',
    formulationSlugs: ['digestive-balance-complex'],
    historicalUse: 'Known as kurkum in the Arabic pharmacopoeia. Ibn Sīnā documented it for liver support, bile stimulation, and digestive enhancement. Medieval Islamic physicians valued it for its warming, drying properties and hepatobiliary affinity. Used as choleretic/cholagogue in compound digestive preparations.',
    activeCompounds: ['Curcumin', 'Demethoxycurcumin', 'Bisdemethoxycurcumin', 'Turmerone', 'Zingiberene'],
    modernResearch: 'One of the most extensively studied phytochemicals. Curcumin inhibits NF-κB, modulates inflammatory cytokines (TNF-alpha, IL-1-beta, IL-6), and activates Nrf2 antioxidant pathways. Poor oral bioavailability addressed by piperine co-administration (~20-fold increase). Multiple RCTs support its role in supporting healthy inflammatory response.',
    safetyNotes: 'Culinary turmeric is very safe. High-dose curcumin supplements may cause GI discomfort. Antiplatelet activity — caution with anticoagulants. Avoid in gallstones or bile duct obstruction (cholagogue activity).',
    references: [
      { citation: 'Hewlings SJ, Kalman DS. Curcumin: A review of its effects on human health. Foods. 2017;6(10):92.', url: 'https://doi.org/10.3390/foods6100092', type: 'systematic-review' },
      { citation: 'Shoba G et al. Influence of piperine on the pharmacokinetics of curcumin. Planta Med. 1998;64(4):353-356.', url: 'https://doi.org/10.1055/s-2006-957450', type: 'rct' },
      { citation: 'Historical Translation Project. Rambam\'s Guide to Health, Monograph 11, p. 39.', type: 'book' },
    ],
  },

  {
    monographNumber: 12,
    name: 'Castor Oil Plant',
    latinBinomial: 'Ricinus communis',
    arabicName: 'Kharwaʿ (خروع)',
    category: 'digestive',
    formulationSlugs: [],
    historicalUse: 'Documented in the Maimonidean corpus as a powerful cathartic and external emollient. Avicenna prescribed castor oil for constipation and external application for joint conditions. Used with great caution due to the extreme toxicity of ricin in the seeds.',
    activeCompounds: ['Ricinoleic acid (in oil)', 'Ricin (in seeds — TOXIC)', 'Undecylenic acid'],
    modernResearch: 'Castor oil (ricinoleic acid) is an FDA-approved stimulant laxative. Ricinoleic acid activates EP3 prostanoid receptors in intestinal smooth muscle. For external use, castor oil packs are studied for supporting comfortable joint function.',
    safetyNotes: 'CRITICAL: Castor seeds contain ricin, one of the most toxic natural substances. Only refined castor oil (ricin-free) is used medicinally. Oil is a potent cathartic — use with caution. Contraindicated in pregnancy (uterotonic).',
    references: [
      { citation: 'Tunaru S et al. Castor oil induces laxation and uterus contraction via ricinoleic acid activating prostaglandin EP3 receptors. PNAS. 2012;109(23):9179-84.', url: 'https://doi.org/10.1073/pnas.1201627109', type: 'preclinical' },
      { citation: 'Historical Translation Project. Rambam\'s Guide to Health, Monograph 12, p. 39.', type: 'book' },
    ],
  },

  {
    monographNumber: 13,
    name: 'Pomegranate',
    latinBinomial: 'Punica granatum',
    arabicName: 'Rummān (رمان)',
    hebrewName: 'Rimon (רימון)',
    category: 'anti-inflammatory',
    formulationSlugs: ['digestive-balance-complex'],
    historicalUse: 'One of the most revered fruits in both Islamic and Jewish traditions. Maimonides recommended pomegranate rind for digestive binding and intestinal comfort. Appears in the Torah, Talmud, and Qur\'an. Avicenna documented both the fruit and rind — rind as astringent, juice as nutritive and liver-supportive.',
    activeCompounds: ['Punicalagin', 'Ellagic acid', 'Punicalin', 'Gallagic acid', 'Urolithins (gut metabolites)'],
    modernResearch: 'Punicalagins are among the largest polyphenols in any food. Gut bacteria metabolize ellagitannins to urolithins, studied for mitophagy-inducing and anti-inflammatory properties. Research supports cardiovascular and antioxidant benefits. CYP450 interactions documented.',
    safetyNotes: 'Fruit and juice very safe. Rind has high tannin content — may affect medication absorption. CYP450 interaction potential — discuss with provider if on medications.',
    references: [
      { citation: 'Aviram M, Rosenblat M. Pomegranate for your cardiovascular health. Rambam Maimonides Med J. 2013;4(2):e0013.', url: 'https://doi.org/10.5041/RMMJ.10113', type: 'systematic-review' },
      { citation: 'Historical Translation Project. Rambam\'s Guide to Health, Monograph 13, p. 40.', type: 'book' },
    ],
  },

  {
    monographNumber: 14,
    name: 'Dill',
    latinBinomial: 'Anethum graveolens',
    arabicName: 'Shabath (شبث)',
    hebrewName: 'Shevet (שבת)',
    category: 'digestive',
    formulationSlugs: [],
    historicalUse: 'Documented in the Mishnah (Ma\'asrot 4:5) and throughout the Talmud as both food and medicine. Rambam classified it among the carminative aromatics. Avicenna documented dill for digestive support and lactation enhancement.',
    activeCompounds: ['Carvone', 'd-Limonene', 'Dill ether (anethofuran)', 'Apiole'],
    modernResearch: 'Carvone has been studied for carminative and antispasmodic properties on GI smooth muscle. Research suggests dill may support healthy digestive function and comfortable lactation.',
    safetyNotes: 'Very safe at culinary doses. Apiaceae family allergen potential. Avoid concentrated essential oil in pregnancy.',
    references: [
      { citation: 'Jana S, Shekhawat GS. Anethum graveolens: An Indian traditional medicinal herb. Pharmacogn Rev. 2010;4(8):179-184.', url: 'https://doi.org/10.4103/0973-7847.70915', type: 'systematic-review' },
      { citation: 'Historical Translation Project. Rambam\'s Guide to Health, Monograph 14, p. 40.', type: 'book' },
    ],
  },

  {
    monographNumber: 15,
    name: 'Spikenard',
    latinBinomial: 'Nardostachys jatamansi',
    arabicName: 'Sunbul al-Ṭīb (سنبل الطيب)',
    hebrewName: 'Nerd (נרד)',
    category: 'nervine',
    formulationSlugs: [],
    historicalUse: 'One of the most precious aromatics in the ancient world — referenced in the Song of Solomon. Rambam documented it for nervous system support and emotional calming. Avicenna classified it for cardiac and cerebral applications. Central to the Ayurvedic nervine tradition as jatamansi.',
    activeCompounds: ['Jatamansone (valeranone)', 'Nardostachone', 'Jatamansinol', 'Sesquiterpenes'],
    modernResearch: 'Jatamansone has been studied for GABA-A receptor modulation and potential anxiolytic properties. Research suggests it may support healthy stress response and emotional equilibrium. Cross-traditional evidence from both Ayurvedic and Islamic medical research.',
    safetyNotes: 'Generally well-tolerated. Limited modern safety data for high-dose supplementation. Mild sedation possible.',
    references: [
      { citation: 'Razack S et al. Nardostachys jatamansi: A chemical, pharmacological and biological appraisal. J Pharm Sci Innovation. 2013;2(2):14-20.', type: 'systematic-review' },
      { citation: 'Historical Translation Project. Rambam\'s Guide to Health, Monograph 15, p. 40.', type: 'book' },
    ],
  },

  {
    monographNumber: 16,
    name: 'Orris/Iris',
    latinBinomial: 'Iris germanica / I. florentina',
    arabicName: 'Sūsan (سوسن)',
    hebrewName: 'Shoshan (שושן)',
    category: 'multi-system',
    formulationSlugs: [],
    historicalUse: 'Documented in Rambam\'s Glossary for its expectorant and aromatic properties. Used in the ketoret (Temple incense). Avicenna documented iris root for respiratory support and as a fragrance medicine.',
    activeCompounds: ['Irones (alpha-irone)', 'Isoflavones', 'Myristic acid'],
    modernResearch: 'Limited modern clinical research. Irones are studied primarily in perfumery. Historical use suggests expectorant and aromatic applications.',
    safetyNotes: 'Strong allergen potential — Iridaceae family. Contact dermatitis common with fresh root. Not recommended for internal use without professional guidance.',
    references: [
      { citation: 'Historical Translation Project. Rambam\'s Guide to Health, Monograph 16, p. 41.', type: 'book' },
    ],
  },

  {
    monographNumber: 17,
    name: 'Black Seed',
    latinBinomial: 'Nigella sativa',
    arabicName: 'Ḥabba al-Sawdāʾ (حبة السوداء)',
    hebrewName: 'Ketzaḥ (קצח)',
    category: 'antimicrobial',
    formulationSlugs: [],
    historicalUse: 'One of the most revered medicines in the Islamic tradition — the hadith records "In the black seed is healing for every disease except death." Rambam documented it for respiratory and digestive support. Avicenna prescribed it extensively across multiple indications.',
    activeCompounds: ['Thymoquinone', 'Thymohydroquinone', 'Thymol', 'Carvacrol', 'Nigellone'],
    modernResearch: 'Thymoquinone is among the most studied phytochemicals in Islamic pharmacology. Research suggests it may support healthy immune function, antioxidant status, and normal inflammatory response. Multiple RCTs in glycemic and lipid support.',
    safetyNotes: 'Safe at culinary and typical supplemental doses. Antiplatelet activity — caution with anticoagulants. May enhance hypoglycemic effects. Uterotonic — avoid medicinal doses in pregnancy.',
    references: [
      { citation: 'Ahmad A et al. A review on therapeutic potential of Nigella sativa. Asian Pac J Trop Biomed. 2013;3(5):337-352.', url: 'https://doi.org/10.1016/S2221-1691(13)60075-1', type: 'systematic-review' },
      { citation: 'Dajani EZ et al. Overview of the preclinical pharmacological properties of Nigella sativa (black seeds). Complement Ther Med. 2016;24:81-87.', url: 'https://doi.org/10.1016/j.ctim.2015.12.006', type: 'systematic-review' },
      { citation: 'Historical Translation Project. Rambam\'s Guide to Health, Monograph 17, p. 41.', type: 'book' },
    ],
  },

  {
    monographNumber: 18,
    name: 'Fenugreek',
    latinBinomial: 'Trigonella foenum-graecum',
    arabicName: 'Ḥulba (حلبة)',
    hebrewName: 'Ḥilbeh (חילבה)',
    category: 'glycemic-metabolic',
    formulationSlugs: [],
    historicalUse: 'Extensively documented by both Maimonides and Avicenna for digestive and metabolic support. The Talmud references ḥilbeh as a valued remedy. Classified as hot and moist — one of the few warming demulcents in the classical pharmacopoeia.',
    activeCompounds: ['4-Hydroxyisoleucine', 'Trigonelline', 'Galactomannan fiber', 'Diosgenin (saponin)'],
    modernResearch: 'Multiple RCTs and meta-analyses suggest fenugreek may support healthy glycemic control and insulin sensitivity. 4-Hydroxyisoleucine stimulates insulin secretion. Galactomannan fiber slows carbohydrate absorption.',
    safetyNotes: 'Generally safe. Uterotonic — avoid in pregnancy. Strong hypoglycemic potential — discuss with provider if on diabetes medications. May cause maple syrup odor in urine/sweat.',
    references: [
      { citation: 'Neelakantan N et al. Effect of fenugreek (Trigonella foenum-graecum L.) on glycemic indices: A systematic review. J Ethnopharmacol. 2014;153(3):697-704.', url: 'https://doi.org/10.1016/j.jep.2014.03.030', type: 'systematic-review' },
      { citation: 'Historical Translation Project. Rambam\'s Guide to Health, Monograph 18, p. 41.', type: 'book' },
    ],
  },

  {
    monographNumber: 19,
    name: 'Black Pepper',
    latinBinomial: 'Piper nigrum',
    arabicName: 'Fulful (فلفل)',
    hebrewName: 'Pilpel (פלפל)',
    category: 'digestive',
    formulationSlugs: ['digestive-balance-complex'],
    historicalUse: 'Among the most prized commodities of the ancient spice trade. In Rambam\'s Fustat, arrived via Indian Ocean trade. Classified as hot and dry in the fourth degree. Used as a warming, stimulating medicine and digestive fire enhancer. The dossier records 95% piperine standardization at 5mg.',
    activeCompounds: ['Piperine', 'Piperlongumine', 'Chavicine', 'Piperonal'],
    modernResearch: 'Landmark study (Shoba et al., 1998, Planta Medica): 20mg piperine produced 20-fold increase in curcumin bioavailability. Piperine inhibits CYP3A4 and P-glycoprotein. TRPV1 activation supports warmth-mediated gut motility. At 5mg formula dose, below threshold for significant drug interaction risk.',
    safetyNotes: 'Safe at culinary doses. Piperine inhibits CYP450 enzymes — may alter drug metabolism. Discuss with healthcare provider if taking statins, blood thinners, or antidepressants.',
    references: [
      { citation: 'Shoba G et al. Influence of piperine on the pharmacokinetics of curcumin in animals and human volunteers. Planta Med. 1998;64(4):353-356.', url: 'https://doi.org/10.1055/s-2006-957450', type: 'rct' },
      { citation: 'Historical Translation Project. Rambam\'s Guide to Health, Monograph 19, p. 41.', type: 'book' },
      { citation: 'Historical Translation Project. Digestive Balance Complex™ Dossier, Ingredient 5.', type: 'book' },
    ],
  },

  {
    monographNumber: 20,
    name: 'Olive Oil',
    latinBinomial: 'Olea europaea',
    arabicName: 'Zayt (زيت)',
    hebrewName: 'Shemen Zayit (שמן זית)',
    category: 'multi-system',
    formulationSlugs: [],
    historicalUse: 'Sacred in both Islamic and Jewish traditions. Rambam recommended olive oil for digestive lubrication, skin health, and as a vehicle for other medicines. Central to the Mediterranean diet documented in the Regimen of Health.',
    activeCompounds: ['Oleic acid', 'Hydroxytyrosol', 'Oleuropein', 'Oleocanthal', 'Squalene'],
    modernResearch: 'Oleocanthal demonstrates ibuprofen-like COX inhibition. Hydroxytyrosol is a potent antioxidant. PREDIMED trial and other large RCTs demonstrate cardiovascular benefits of extra-virgin olive oil consumption.',
    safetyNotes: 'Extremely safe. One of the best-studied food fats in human nutrition.',
    references: [
      { citation: 'Estruch R et al. Primary prevention of cardiovascular disease with a Mediterranean diet (PREDIMED). N Engl J Med. 2018;378:e34.', url: 'https://doi.org/10.1056/NEJMoa1800389', type: 'rct' },
      { citation: 'Historical Translation Project. Rambam\'s Guide to Health, Monograph 20, p. 42.', type: 'book' },
    ],
  },

  {
    monographNumber: 21,
    name: 'Frankincense',
    latinBinomial: 'Boswellia sacra / B. serrata',
    arabicName: 'Lubān (لبان)',
    hebrewName: 'Levonah (לבונה)',
    category: 'anti-inflammatory',
    formulationSlugs: [],
    historicalUse: 'Central to both Temple worship (ketoret incense) and medicine. Rambam documented frankincense for its anti-inflammatory and wound-healing properties. Avicenna prescribed it for joint conditions, respiratory support, and cognitive function.',
    activeCompounds: ['Boswellic acids (AKBA, KBA, β-BA)', '11-Keto-β-boswellic acid', 'Incensole acetate'],
    modernResearch: 'AKBA (acetyl-11-keto-β-boswellic acid) is a potent and selective 5-lipoxygenase inhibitor — a mechanism distinct from NSAIDs. Multiple RCTs have examined boswellia for supporting comfortable joint function. Research supports its role in healthy inflammatory response.',
    safetyNotes: 'Generally well-tolerated. May cause mild GI discomfort. Antiplatelet activity possible. Rare: contact dermatitis.',
    references: [
      { citation: 'Yu G et al. Effectiveness of Boswellia and Boswellia extract for osteoarthritis patients: A systematic review and meta-analysis. BMC Complement Med Ther. 2020;20:225.', url: 'https://doi.org/10.1186/s12906-020-02985-6', type: 'meta-analysis' },
      { citation: 'Abdel-Tawab M et al. Boswellia serrata: An overall assessment of in vitro, preclinical, pharmacokinetic and clinical data. Clin Pharmacokinet. 2011;50(6):349-369.', url: 'https://doi.org/10.2165/11586800-000000000-00000', type: 'systematic-review' },
      { citation: 'Historical Translation Project. Rambam\'s Guide to Health, Monograph 21, p. 42.', type: 'book' },
    ],
  },

  {
    monographNumber: 22,
    name: 'Fennel Seed',
    latinBinomial: 'Foeniculum vulgare',
    arabicName: 'Rāziyānaj (رازيانج)',
    hebrewName: 'Shumar (שומר)',
    category: 'digestive',
    formulationSlugs: ['digestive-balance-complex'],
    historicalUse: 'Appears in Rambam\'s Glossary of Drug Names. "Considered warm and moist in moderate degree in the Islamic medical tradition, used primarily as digestive carminative, galactagogue, and mild diuretic" (Monograph 22, p. 43). Dossier records 10:1 extract at 250mg per serving.',
    activeCompounds: ['trans-Anethole (60–80% of essential oil)', 'Fenchone', 'Limonene', 'Estragole (minor)'],
    modernResearch: 'RCT: fennel oil emulsion significantly reduced infant colic symptoms vs. placebo (Alexandrovich et al., 2003). EMA/HMPC monograph confirms traditional use for symptomatic relief of digestive complaints including bloating and flatulence. trans-Anethole provides antispasmodic activity on GI smooth muscle.',
    safetyNotes: 'Very safe at culinary and supplemental doses. Mild estrogenic activity — caution in estrogen-sensitive conditions. Uterotonic at medicinal doses — avoid in pregnancy. Apiaceae cross-reactivity possible.',
    references: [
      { citation: 'Alexandrovich I et al. The effect of fennel (Foeniculum vulgare) seed oil emulsion in infantile colic. Altern Ther Health Med. 2003;9(4):58-61.', url: 'https://pubmed.ncbi.nlm.nih.gov/12868253/', type: 'rct' },
      { citation: 'EMA/HMPC Community Herbal Monograph: Foeniculi fructus.', url: 'https://www.ema.europa.eu/en/medicines/herbal/foeniculi-amari-fructus', type: 'pharmacopoeia' },
      { citation: 'NCCIH. Fennel. National Center for Complementary and Integrative Health.', url: 'https://www.nccih.nih.gov/health/fennel', type: 'monograph' },
      { citation: 'Historical Translation Project. Rambam\'s Guide to Health, Monograph 22, p. 43.', type: 'book' },
    ],
  },

  {
    monographNumber: 23,
    name: 'Hyssop/Oregano',
    latinBinomial: 'Origanum syriacum / Hyssopus officinalis',
    arabicName: 'Zūfā (زوفا)',
    hebrewName: 'Ezov (אזוב)',
    category: 'respiratory',
    formulationSlugs: ['respiratory-harmony-formula'],
    historicalUse: 'One of the most symbolically and medically important herbs in Jewish tradition — ezov appears throughout the Torah. Scholarly debate on identification: may be Syrian oregano rather than European hyssop. Maimonides documented respiratory properties. Avicenna classified it among expectorant herbs.',
    activeCompounds: ['Carvacrol (if oregano)', 'Thymol', 'Pinocamphone (if hyssop)', 'Marrubiin', 'Ursolic acid'],
    modernResearch: 'Carvacrol and thymol have been studied for antimicrobial and respiratory support properties. Research suggests these compounds may support healthy respiratory function and normal mucociliary clearance.',
    safetyNotes: 'Herb is generally well-tolerated. Concentrated essential oil (hyssop) contains convulsant compounds — do not use internally at high concentrations. Thymol may interact with anticoagulants.',
    references: [
      { citation: 'Figueiredo AC et al. Factors affecting secondary metabolite production in plants: volatile components and essential oils. Flavour Fragrance J. 2008;23:213-226.', url: 'https://doi.org/10.1002/ffj.1875', type: 'systematic-review' },
      { citation: 'Historical Translation Project. Rambam\'s Guide to Health, Monograph 23, p. 43.', type: 'book' },
    ],
  },

  {
    monographNumber: 24,
    name: 'Cloves',
    latinBinomial: 'Syzygium aromaticum',
    arabicName: 'Qaranful (قرنفل)',
    hebrewName: 'Tziporen (ציפורן)',
    category: 'antimicrobial',
    formulationSlugs: [],
    historicalUse: 'Prized spice arriving in the medieval Mediterranean via Indian Ocean trade. Avicenna documented cloves for dental pain, digestive warming, and antimicrobial applications. Rambam classified it among the warming aromatics.',
    activeCompounds: ['Eugenol (70–90% of essential oil)', 'Beta-caryophyllene', 'Eugenyl acetate', 'Oleanolic acid'],
    modernResearch: 'Eugenol is well-characterized as a COX-2 inhibitor and dental analgesic (FDA-approved for dental use). Broad-spectrum antimicrobial activity. Beta-caryophyllene acts as a CB2 cannabinoid receptor agonist.',
    safetyNotes: 'Safe at culinary doses. Concentrated eugenol can cause mucosal burns — do not apply undiluted. Hepatotoxic at very high doses. Antiplatelet activity.',
    references: [
      { citation: 'Cortés-Rojas DF et al. Clove (Syzygium aromaticum): A precious spice. Asian Pac J Trop Biomed. 2014;4(2):90-96.', url: 'https://doi.org/10.1016/S2221-1691(14)60215-X', type: 'systematic-review' },
      { citation: 'Historical Translation Project. Rambam\'s Guide to Health, Monograph 24, p. 44.', type: 'book' },
    ],
  },

  {
    monographNumber: 25,
    name: 'Zedoary',
    latinBinomial: 'Curcuma zedoaria',
    arabicName: 'Jadwār (جدوار)',
    hebrewName: 'Kurkum HaLavan (כורכום הלבן)',
    category: 'digestive',
    formulationSlugs: [],
    historicalUse: 'Related to turmeric, documented as a digestive bitter and liver-supportive agent in the Arabic pharmacopoeia. Distinguished from turmeric by its white/pale coloring and more bitter taste profile.',
    activeCompounds: ['Curcumenol', 'Curzerenone', 'Germacrone', 'Sesquiterpene volatile oils'],
    modernResearch: 'Curcumenol and curzerenone have been studied for anti-inflammatory and hepatoprotective properties in preclinical models. Less clinical evidence than Curcuma longa (turmeric).',
    safetyNotes: 'Generally safe at traditional doses. Avoid in pregnancy (standard Zingiberaceae cautions). Limited modern safety data for high-dose supplementation.',
    references: [
      { citation: 'Lobo R et al. Curcuma zedoaria Rosc.: A review of its chemical, pharmacological and ethnomedicinal properties. J Ethnopharmacol. 2009;124(1):1-14.', url: 'https://doi.org/10.1016/j.jep.2009.04.010', type: 'systematic-review' },
      { citation: 'Historical Translation Project. Rambam\'s Guide to Health, Monograph 25, p. 44.', type: 'book' },
    ],
  },

  {
    monographNumber: 26,
    name: 'Mulberry',
    latinBinomial: 'Morus alba / M. nigra',
    arabicName: 'Tūt (توت)',
    hebrewName: 'Tut (תות)',
    category: 'glycemic-metabolic',
    formulationSlugs: [],
    historicalUse: 'Documented in the Maimonidean corpus for its cooling, nutritive properties. The fruit was valued across the medieval Mediterranean. Avicenna classified mulberry among the cooling, moist fruits suitable for hot temperaments.',
    activeCompounds: ['1-Deoxynojirimycin (DNJ)', 'Anthocyanins (cyanidin-3-glucoside)', 'Quercetin', 'Resveratrol'],
    modernResearch: 'DNJ is an alpha-glucosidase inhibitor — one of the best-characterized glycemic-modulating mechanisms of any botanical. RCTs suggest mulberry leaf extract may support healthy post-prandial blood sugar levels.',
    safetyNotes: 'Fruit is very safe. Leaf extract: hypoglycemic enhancement possible — discuss with provider if on diabetes medications. Take with meals.',
    references: [
      { citation: 'Thaipitakwong T et al. Mulberry leaves and their potential effects against cardiometabolic risks. J Sci Food Agric. 2018;98(5):1634-1643.', url: 'https://doi.org/10.1002/jsfa.8687', type: 'systematic-review' },
      { citation: 'Historical Translation Project. Rambam\'s Guide to Health, Monograph 26, p. 44.', type: 'book' },
    ],
  },

  {
    monographNumber: 27,
    name: 'Cinnamon Bark',
    latinBinomial: 'Cinnamomum verum',
    arabicName: 'Dār Ṣīnī (دار صيني)',
    hebrewName: 'Tzinammon (צינמון)',
    category: 'cardiovascular',
    formulationSlugs: ['cardiovascular-reserve-compound'],
    historicalUse: 'One of the most prized spices in the ancient and medieval world. Maimonides recommended cinnamon for warming and clarifying properties. Appears in the Torah (ketoret incense). Avicenna documented it for digestive warmth and circulatory vitality.',
    activeCompounds: ['Cinnamaldehyde', 'Eugenol', 'Cinnamic acid', 'Type-A proanthocyanidins'],
    modernResearch: 'Multiple meta-analyses examine cinnamon for glycemic and lipid support. Type-A proanthocyanidins support healthy insulin sensitivity. Use Ceylon cinnamon (C. verum) over cassia (C. cassia) due to lower coumarin content.',
    safetyNotes: 'Safe at culinary doses. Cassia cinnamon has high coumarin — prefer Ceylon. Antiplatelet activity. Hypoglycemic enhancement — discuss with provider if on diabetes medications.',
    references: [
      { citation: 'Allen RW et al. Cinnamon use in type 2 diabetes: An updated systematic review and meta-analysis. Ann Fam Med. 2013;11(5):452-459.', url: 'https://doi.org/10.1370/afm.1517', type: 'meta-analysis' },
      { citation: 'WHO Monographs: Cortex Cinnamomi.', url: 'https://apps.who.int/iris/handle/10665/42052', type: 'pharmacopoeia' },
      { citation: 'Historical Translation Project. Rambam\'s Guide to Health, Monograph 27, p. 44.', type: 'book' },
    ],
  },

  {
    monographNumber: 28,
    name: 'Marjoram',
    latinBinomial: 'Origanum majorana',
    arabicName: 'Mardaqūsh (مردقوش)',
    hebrewName: 'Mayoran (מיורן)',
    category: 'nervine',
    formulationSlugs: [],
    historicalUse: 'Documented in the Islamic medical tradition as a nervine carminative — calming to the nervous system while supporting digestive function. Avicenna prescribed it for headaches and emotional excess. Used in both culinary and medicinal contexts across the Mediterranean.',
    activeCompounds: ['Terpinene-4-ol', 'Ursolic acid', 'Luteolin', 'Rosmarinic acid', 'Sabinene hydrate'],
    modernResearch: 'Research suggests marjoram may support healthy hormonal balance and normal nervous system function. Rosmarinic acid provides antioxidant activity. Terpinene-4-ol has been studied for anti-inflammatory properties.',
    safetyNotes: 'Safe at culinary doses. Avoid medicinal doses in pregnancy (mild uterotonic). May cause mild sedation.',
    references: [
      { citation: 'Bina F, Rahimi R. Sweet Marjoram: A review of ethnopharmacology, phytochemistry, and biological activities. J Evid Based Complementary Altern Med. 2017;22(1):175-185.', url: 'https://doi.org/10.1177/2156587216650793', type: 'systematic-review' },
      { citation: 'Historical Translation Project. Rambam\'s Guide to Health, Monograph 28, p. 45.', type: 'book' },
    ],
  },

  {
    monographNumber: 29,
    name: 'Asparagus Root',
    latinBinomial: 'Asparagus officinalis',
    arabicName: 'Halyūn (هليون)',
    hebrewName: 'Asparagus (אספרגוס)',
    category: 'urinary',
    formulationSlugs: [],
    historicalUse: 'Documented in the Islamic medical tradition for kidney support and "opening obstructions." Avicenna classified asparagus among the diuretic foods. Long history of traditional use for urinary support across multiple cultures.',
    activeCompounds: ['Steroidal saponins (protodioscin)', 'Asparagine', 'Inulin (prebiotic)', 'Rutin'],
    modernResearch: 'Saponins and asparagine contribute to the diuretic profile. Inulin provides prebiotic fiber supporting broader gut and metabolic health. Traditional use for urinary support is well-documented.',
    safetyNotes: 'Very safe. Characteristic urine odor. Asparagaceae allergy possible but rare.',
    references: [
      { citation: 'Negi JS et al. Chemical and pharmacological aspects of Asparagus. Nat Prod Commun. 2010;5(3):457-462.', url: 'https://pubmed.ncbi.nlm.nih.gov/20420324/', type: 'systematic-review' },
      { citation: 'Historical Translation Project. Rambam\'s Guide to Health, Monograph 29, p. 45.', type: 'book' },
    ],
  },

  {
    monographNumber: 30,
    name: 'Milk Thistle',
    latinBinomial: 'Silybum marianum',
    arabicName: 'Shawkat al-Baqar (شوكة البقر)',
    hebrewName: 'Shoshanat HaBakar (שושנת הבקר)',
    category: 'hepatoprotective',
    formulationSlugs: [],
    historicalUse: 'Documented for hepatoprotective applications in both the Islamic and European herbal traditions. While not extensively referenced by Maimonides, the Arabic pharmacopoeia classified it for liver and spleen support.',
    activeCompounds: ['Silymarin complex (silybin A/B, silychristin, silydianin)', 'Flavonolignans', 'Taxifolin'],
    modernResearch: 'Silymarin is among the most studied hepatoprotective phytochemicals. Multiple RCTs and meta-analyses have examined it for supporting healthy liver function. Mechanism includes antioxidant, anti-inflammatory, and cell membrane-stabilizing properties.',
    safetyNotes: 'Well-tolerated. CYP2C9 and CYP3A4 interaction potential — discuss with provider. Asteraceae allergy possible.',
    references: [
      { citation: 'Saller R et al. An updated systematic review of milk thistle for liver diseases. Forsch Komplementmed. 2008;15(1):9-20.', url: 'https://doi.org/10.1159/000113648', type: 'systematic-review' },
      { citation: 'Abenavoli L et al. Milk thistle in liver diseases: Past, present, future. Phytother Res. 2018;32(11):2202-2213.', url: 'https://doi.org/10.1002/ptr.6171', type: 'systematic-review' },
      { citation: 'Historical Translation Project. Rambam\'s Guide to Health, Monograph 30, p. 45.', type: 'book' },
    ],
  },

  // ═════════════════════════════════════════════════════════
  // ADDITIONAL INGREDIENTS (from formulation chapters)
  // ═════════════════════════════════════════════════════════

  {
    monographNumber: 0,
    name: 'Coriander Seed',
    latinBinomial: 'Coriandrum sativum',
    arabicName: 'Kuzbara (كزبرة)',
    hebrewName: 'Gad (גד)',
    category: 'digestive',
    formulationSlugs: ['digestive-balance-complex'],
    historicalUse: 'One of the most frequently cited botanicals in the Maimonidean corpus. The Regimen of Health recommends coriander for digestive equilibrium. Avicenna classified it as cooling — a complement to warming carminatives. Dossier records 10:1 extract at 200mg per serving.',
    activeCompounds: ['Linalool', 'Geranyl acetate', 'Camphor', 'Quercetin', 'Tocopherols'],
    modernResearch: 'Research has examined coriander for its role in supporting healthy digestive function and antioxidant activity. The linalool-rich volatile oil profile supports comfortable digestion.',
    safetyNotes: 'Very well-tolerated. Long history of safe culinary and medicinal use across cultures.',
    references: [
      { citation: 'Burdock GA, Carabin IG. Safety assessment of coriander essential oil as a food ingredient. Food Chem Toxicol. 2009;47(1):22-34.', url: 'https://doi.org/10.1016/j.fct.2008.11.006', type: 'preclinical' },
      { citation: 'WHO Monographs Vol. 1: Fructus Coriandri.', url: 'https://apps.who.int/iris/handle/10665/42052', type: 'pharmacopoeia' },
      { citation: 'Historical Translation Project. Digestive Balance Complex™ Dossier, Ingredient 3.', type: 'book' },
    ],
  },

  {
    monographNumber: 0,
    name: 'Gentian',
    latinBinomial: 'Gentiana lutea',
    arabicName: "Jantiyānā (جنطيانا)",
    category: 'digestive',
    formulationSlugs: ['digestive-balance-complex'],
    historicalUse: 'Known in the Arabic-Islamic pharmacopoeia as jantiana. Used for identical applications as in European traditions. Contains gentiopicrin, which has the highest bitterness value of any known natural compound — approximately three million bitterness units.',
    activeCompounds: ['Gentiopicrin (gentiopicroside)', 'Amarogentin', 'Swertiamarin', 'Gentiobiose'],
    modernResearch: 'Gentian is recognized by German Commission E and ESCOP for digestive bitter stimulation. Gentiopicrin activates TAS2R bitter receptors. Research supports traditional use in supporting healthy appetite and digestive secretion.',
    safetyNotes: 'Generally safe. Contraindicated in gastric/duodenal ulcers (stimulates acid secretion). Avoid in pregnancy.',
    references: [
      { citation: 'ESCOP Monograph: Gentianae radix (Gentian root).', type: 'pharmacopoeia' },
      { citation: 'German Commission E Monograph: Gentiana lutea.', url: 'https://buecher.heilpflanzen-welt.de/BGA-Commission-E-Monographs/0153.htm', type: 'pharmacopoeia' },
    ],
  },

  {
    monographNumber: 0,
    name: 'Dandelion Root',
    latinBinomial: 'Taraxacum officinale',
    arabicName: 'Hindabāʾ barrī (هندباء بري)',
    category: 'hepatoprotective',
    formulationSlugs: ['digestive-balance-complex'],
    historicalUse: 'Known across both Islamic and European herbal traditions for liver and bile support. Classified as a digestive tonic and choleretic. The root provides prebiotic inulin alongside bitter compounds.',
    activeCompounds: ['Taraxacin (sesquiterpene lactone)', 'Taraxacerin', 'Inulin (prebiotic)', 'Potassium'],
    modernResearch: 'German Commission E approves dandelion root for bile and appetite stimulation. Taraxacin activates bitter receptors. Inulin supports healthy gut microbiome. Potassium-rich — provides natural electrolyte compensation.',
    safetyNotes: 'Very safe. Allergen risk in Asteraceae-sensitive individuals. May enhance diuretic effects of medications.',
    references: [
      { citation: 'German Commission E Monograph: Taraxacum officinale (Dandelion root).', url: 'https://buecher.heilpflanzen-welt.de/BGA-Commission-E-Monographs/0369.htm', type: 'pharmacopoeia' },
      { citation: 'Schütz K et al. Taraxacum — A review on its phytochemical and pharmacological profile. J Ethnopharmacol. 2006;107(3):313-323.', url: 'https://doi.org/10.1016/j.jep.2006.07.021', type: 'systematic-review' },
    ],
  },

  {
    monographNumber: 0,
    name: 'Parsley',
    latinBinomial: 'Petroselinum crispum',
    arabicName: 'Baqdunis (بقدونس)',
    hebrewName: 'Petrozilia (פטרוזיליה)',
    category: 'urinary',
    formulationSlugs: [],
    historicalUse: 'Documented across multiple traditions for diuretic and urinary-supportive properties. Contains apiol and myristicin with documented diuretic activity. Flavonoids including apigenin contribute antioxidant and anti-inflammatory effects on the urinary mucosa.',
    activeCompounds: ['Apiol', 'Myristicin', 'Apigenin', 'Luteolin', 'Furanocoumarins'],
    modernResearch: 'Traditional diuretic use is supported by apiol and myristicin content. Apigenin provides antioxidant and anti-inflammatory activity. Research has examined parsley for supporting healthy urinary function.',
    safetyNotes: 'Safe at culinary doses. Concentrated extracts/essential oil: avoid in pregnancy (uterotonic). Photosensitivity possible. Apiaceae allergen potential.',
    references: [
      { citation: 'Farzaei MH et al. Parsley: A review of ethnopharmacology, phytochemistry and biological activities. J Tradit Chin Med. 2013;33(6):815-826.', url: 'https://doi.org/10.1016/S0254-6272(14)60018-2', type: 'systematic-review' },
    ],
  },

  {
    monographNumber: 0,
    name: 'Cornsilk',
    latinBinomial: 'Zea mays (stigma)',
    category: 'urinary',
    formulationSlugs: [],
    historicalUse: 'Post-Rambam botanical (New World plant) included as a legitimate modern extension of the urinary support tradition. Its mucilaginous and demulcent properties specifically address urinary mucosal comfort. Consistent cross-cultural traditional use for urinary support.',
    activeCompounds: ['Mucilage polysaccharides', 'Flavonoids (maysin)', 'Silicic acid', 'Allantoin'],
    modernResearch: 'Traditional use for urinary comfort is well-documented. Mucilage content supports mucosal soothing. Limited modern clinical trials, but traditional use across cultures is consistent.',
    safetyNotes: 'Very safe. May enhance effects of diuretic medications.',
    references: [
      { citation: 'Hasanudin K et al. Corn silk (Stigma maydis) in healthcare: A phytochemical and pharmacological review. Molecules. 2012;17(8):9697-9715.', url: 'https://doi.org/10.3390/molecules17089697', type: 'systematic-review' },
    ],
  },

  {
    monographNumber: 0,
    name: 'Marshmallow Root',
    latinBinomial: 'Althaea officinalis',
    arabicName: 'Khaṭmī (خطمي)',
    category: 'urinary',
    formulationSlugs: [],
    historicalUse: 'Known as khatmi in the Arabic-Islamic tradition. Present in the pharmacopoeia available to Rambam. The quintessential demulcent plant — provides rich mucilage (arabinogalactans, pectin) that coats and soothes mucosal membranes.',
    activeCompounds: ['Arabinogalactans', 'Pectin', 'Mucilage polysaccharides', 'Flavonoids', 'Scopoletin'],
    modernResearch: 'German Commission E and ESCOP recognize marshmallow for demulcent and mucosal-soothing properties. Research supports its traditional use in supporting comfort of the urinary and respiratory mucosal membranes.',
    safetyNotes: 'Very safe. Mucilage may slow absorption of co-administered medications — take separately.',
    references: [
      { citation: 'ESCOP Monograph: Althaeae radix (Marshmallow root).', type: 'pharmacopoeia' },
      { citation: 'German Commission E Monograph: Althaea officinalis.', url: 'https://buecher.heilpflanzen-welt.de/BGA-Commission-E-Monographs/0016.htm', type: 'pharmacopoeia' },
    ],
  },

  {
    monographNumber: 0,
    name: 'Cranberry',
    latinBinomial: 'Vaccinium macrocarpon',
    category: 'urinary',
    formulationSlugs: [],
    historicalUse: 'Post-Rambam botanical representing legitimate modern extension of the urinary support tradition. Its A-type proanthocyanidins support urinary health through anti-adhesion mechanisms entirely unknown to classical physicians but consistent with the functional goal they pursued.',
    activeCompounds: ['A-type proanthocyanidins (PACs)', 'Anthocyanins', 'Hippuric acid', 'D-mannose'],
    modernResearch: 'Cochrane review and multiple meta-analyses have examined cranberry for supporting healthy urinary tract function. A-type PACs inhibit bacterial adhesion to urinary epithelium. Evidence most consistent for prevention rather than treatment.',
    safetyNotes: 'Very safe. May interact with warfarin at very high doses. Oxalate content — caution with kidney stone history.',
    references: [
      { citation: 'Jepson RG et al. Cranberries for preventing urinary tract infections. Cochrane Database Syst Rev. 2012;10:CD001321.', url: 'https://doi.org/10.1002/14651858.CD001321.pub5', type: 'systematic-review' },
    ],
  },

  {
    monographNumber: 0,
    name: 'Dandelion Leaf',
    latinBinomial: 'Taraxacum officinale (folium)',
    category: 'urinary',
    formulationSlugs: [],
    historicalUse: 'Distinct from the root preparation (used for digestive/hepatic support). The leaf provides potassium-sparing diuretic activity — one of the highest plant sources of potassium, providing natural compensation for any increased urinary potassium loss from diuretic botanicals.',
    activeCompounds: ['Potassium (4.5% dry weight)', 'Sesquiterpene lactones', 'Taraxasterol', 'Flavonoids'],
    modernResearch: 'Preliminary clinical evidence supports traditional diuretic use. The high potassium content distinguishes it from pharmaceutical diuretics that deplete potassium. French folk name "pissenlit" reflects centuries of observed diuretic activity.',
    safetyNotes: 'Very safe. Allergen risk in Asteraceae-sensitive individuals. May enhance effects of diuretic and potassium-altering medications.',
    references: [
      { citation: 'Clare BA et al. The diuretic effect in human subjects of an extract of Taraxacum officinale folium. J Altern Complement Med. 2009;15(8):929-934.', url: 'https://doi.org/10.1089/acm.2008.0152', type: 'rct' },
    ],
  },

  // ═════════════════════════════════════════════════════════
  // CARDIOVASCULAR & RESPIRATORY FORMULA INGREDIENTS
  // ═════════════════════════════════════════════════════════

  {
    monographNumber: 0,
    name: 'Hawthorn Berry & Leaf',
    latinBinomial: 'Crataegus monogyna / C. laevigata',
    arabicName: "Za'rūr (زعرور)",
    category: 'cardiovascular',
    formulationSlugs: ['cardiovascular-reserve-compound'],
    historicalUse: 'Avicenna documented hawthorn for cardiotonic properties. Widely used in the Islamic medical tradition for supporting heart function and circulatory vitality. Both berry and leaf valued for cardiovascular effects.',
    activeCompounds: ['Oligomeric proanthocyanidins (OPCs)', 'Vitexin', 'Hyperoside', 'Chlorogenic acid', 'Epicatechin'],
    modernResearch: 'Among the most studied cardiovascular botanicals. Cochrane review and multiple meta-analyses examine hawthorn for cardiac output and circulatory support. German Commission E and ESCOP recognize traditional use for heart function.',
    safetyNotes: 'Generally well-tolerated. May have additive effects with cardiac glycosides and antihypertensives — discuss with provider.',
    references: [
      { citation: 'Pittler MH et al. Hawthorn extract for treating chronic heart failure. Cochrane Database Syst Rev. 2008;1:CD005312.', url: 'https://doi.org/10.1002/14651858.CD005312.pub2', type: 'systematic-review' },
      { citation: 'ESCOP Monograph: Crataegi folium cum flore.', type: 'pharmacopoeia' },
      { citation: 'German Commission E Monograph: Crataegus.', type: 'pharmacopoeia' },
    ],
  },

  {
    monographNumber: 0,
    name: 'Motherwort Herb',
    latinBinomial: 'Leonurus cardiaca',
    arabicName: "Umm al-Qalb (أم القلب)",
    category: 'cardiovascular',
    formulationSlugs: ['cardiovascular-reserve-compound'],
    historicalUse: 'The Arabic name means "mother of the heart" — reflecting its deep association with cardiac support. Documented for calming the heart and supporting normal cardiac rhythm. Used in Unani and European herbal traditions.',
    activeCompounds: ['Leonurine', 'Stachydrine', 'Lavandulifolioside', 'Ursolic acid', 'Iridoid glycosides'],
    modernResearch: 'Leonurine has been studied for supporting healthy cardiovascular function and normal cardiac rhythm. Research suggests it may support comfortable heart rate during occasional stress.',
    safetyNotes: 'Generally well-tolerated. May potentiate cardiac medications — discuss with provider. Avoid during pregnancy (uterotonic).',
    references: [
      { citation: 'German Commission E Monograph: Leonurus cardiaca.', type: 'pharmacopoeia' },
      { citation: 'European Medicines Agency: Leonuri cardiacae herba.', url: 'https://www.ema.europa.eu/en/medicines/herbal/leonuri-cardiacae-herba', type: 'pharmacopoeia' },
    ],
  },

  {
    monographNumber: 0,
    name: 'Rose Hip',
    latinBinomial: 'Rosa canina',
    arabicName: 'Thamr al-Ward (ثمر الورد)',
    hebrewName: 'Vered (ורד)',
    category: 'cardiovascular',
    formulationSlugs: ['cardiovascular-reserve-compound'],
    historicalUse: 'Rose preparations were staples of the medieval Islamic apothecary. Avicenna recommended rose for cardiac and hepatic support. Rose water and rose hip valued across the Judeo-Arabic tradition for constitutional vitality and antioxidant-rich nourishment.',
    activeCompounds: ['Ascorbic acid (vitamin C)', 'Galactolipid (GOPO)', 'Lycopene', 'Beta-carotene', 'Tiliroside'],
    modernResearch: 'The galactolipid GOPO has been examined in multiple clinical trials for joint comfort and inflammatory markers. High antioxidant content supports vascular health. Research supports its role in healthy inflammatory response.',
    safetyNotes: 'Excellent safety profile. Very well-tolerated.',
    references: [
      { citation: 'Christensen R et al. Does the hip powder of Rosa canina (rosehip) reduce pain in osteoarthritis patients? — a meta-analysis. Osteoarthritis Cartilage. 2008;16(9):965-972.', url: 'https://doi.org/10.1016/j.joca.2008.03.001', type: 'meta-analysis' },
      { citation: 'ESCOP Monograph: Rosae pseudo-fructus.', type: 'pharmacopoeia' },
    ],
  },

  {
    monographNumber: 0,
    name: 'Thyme Herb',
    latinBinomial: 'Thymus vulgaris',
    arabicName: "Sa'tar (صعتر)",
    category: 'respiratory',
    formulationSlugs: ['respiratory-harmony-formula'],
    historicalUse: 'Avicenna documented thyme extensively for respiratory comfort and airway health. Maimonides included it in respiratory preparations. Andalusian pharmacists used thyme-honey combinations as foundational respiratory support.',
    activeCompounds: ['Thymol', 'Carvacrol', 'p-Cymene', 'Linalool', 'Rosmarinic acid'],
    modernResearch: 'Thymol and carvacrol support healthy respiratory function and normal mucociliary clearance. ESCOP recognizes thyme for traditional use in supporting upper respiratory comfort. German Commission E approved.',
    safetyNotes: 'Well-tolerated at recommended doses. Thymol may interact with anticoagulants at very high doses.',
    references: [
      { citation: 'ESCOP Monograph: Thymi herba.', type: 'pharmacopoeia' },
      { citation: 'German Commission E Monograph: Thymus vulgaris.', url: 'https://buecher.heilpflanzen-welt.de/BGA-Commission-E-Monographs/0378.htm', type: 'pharmacopoeia' },
    ],
  },

  {
    monographNumber: 0,
    name: 'Elecampane Root',
    latinBinomial: 'Inula helenium',
    arabicName: 'Rāsan (راسن)',
    category: 'respiratory',
    formulationSlugs: ['respiratory-harmony-formula'],
    historicalUse: 'Known as rāsan in the Arabic pharmacopoeia. Avicenna documented it for respiratory support as a warming expectorant. Use spans from Dioscorides through the Judeo-Arabic tradition. Medieval physicians used it in compound chest preparations.',
    activeCompounds: ['Alantolactone', 'Isoalantolactone', 'Inulin', 'Thymol derivatives'],
    modernResearch: 'Sesquiterpene lactones studied for respiratory support and normal immune response in the airways. German Commission E recognizes traditional use.',
    safetyNotes: 'Generally well-tolerated. Asteraceae/Compositae allergy risk. May cause contact dermatitis in sensitive individuals.',
    references: [
      { citation: 'German Commission E Monograph: Inula helenium.', type: 'pharmacopoeia' },
    ],
  },

  {
    monographNumber: 0,
    name: 'Licorice Root',
    latinBinomial: 'Glycyrrhiza glabra',
    arabicName: "'Irq al-Sūs (عرق السوس)",
    hebrewName: 'Shoresh Matok (שורש מתוק)',
    category: 'respiratory',
    formulationSlugs: ['respiratory-harmony-formula'],
    historicalUse: 'One of the most widely prescribed botanicals in the entire Islamic-Jewish tradition. Maimonides recommended it for throat comfort and respiratory support. Avicenna documented it extensively for demulcent and harmonizing properties — often used as a "conductor" to guide other herbs.',
    activeCompounds: ['Glycyrrhizin', 'Glycyrrhetinic acid', 'Liquiritigenin', 'Glabridin', 'Isoliquiritigenin'],
    modernResearch: 'Glycyrrhizin supports healthy mucosal membranes and respiratory comfort. DGL (deglycyrrhizinated) forms studied for GI applications. WHO and ESCOP monographs support traditional use.',
    safetyNotes: 'IMPORTANT: Glycyrrhizin may affect blood pressure and potassium levels with chronic use. Discuss with provider if taking blood pressure medications or diuretics. DGL form avoids this concern.',
    references: [
      { citation: 'WHO Monographs Vol. 1: Radix Glycyrrhizae.', url: 'https://apps.who.int/iris/handle/10665/42052', type: 'pharmacopoeia' },
      { citation: 'ESCOP Monograph: Liquiritiae radix.', type: 'pharmacopoeia' },
    ],
  },

  // ═════════════════════════════════════════════════════════
  // CROSS-TRADITIONAL COGNITIVE INGREDIENTS
  // ═════════════════════════════════════════════════════════

  {
    monographNumber: 0,
    name: 'Rosemary Leaf',
    latinBinomial: 'Rosmarinus officinalis',
    arabicName: 'Iklīl al-Jabal (إكليل الجبل)',
    category: 'cognitive',
    formulationSlugs: ['cognitive-clarity-blend'],
    historicalUse: 'Known as "crown of the mountain" in Arabic tradition. Avicenna documented rosemary for digestive warmth and cognitive clarity. Medieval Andalusian pharmacists included it in compound cognitive and digestive preparations.',
    activeCompounds: ['Rosmarinic acid', 'Carnosic acid', 'Carnosol', '1,8-Cineole', 'Camphor'],
    modernResearch: 'Rosmarinic acid and carnosic acid studied for antioxidant and neuroprotective properties. Research suggests rosemary aroma may support cognitive performance and alertness. Supports normal bile flow and hepatic function.',
    safetyNotes: 'Generally well-tolerated at dietary and supplemental doses.',
    references: [
      { citation: 'ESCOP Monograph: Rosmarini folium.', type: 'pharmacopoeia' },
      { citation: 'WHO Monographs Vol. 3: Folium Rosmarini.', type: 'pharmacopoeia' },
      { citation: 'Moss M, Oliver L. Plasma 1,8-cineole correlates with cognitive performance following exposure to rosemary essential oil aroma. Ther Adv Psychopharmacol. 2012;2(3):103-113.', url: 'https://doi.org/10.1177/2045125312436573', type: 'rct' },
    ],
  },

  {
    monographNumber: 0,
    name: 'Saffron Stigma',
    latinBinomial: 'Crocus sativus',
    arabicName: "Za'farān (زعفران)",
    hebrewName: 'Karkom (כרכם)',
    category: 'cognitive',
    formulationSlugs: ['cognitive-clarity-blend'],
    historicalUse: 'One of the most prized medicinal substances in the Islamic-Jewish pharmacopoeia. Maimonides recommended saffron for mood and cognitive brightness. Avicenna classified it as a cardiac tonic and cerebral clarifier, supporting "the pneuma of the brain."',
    activeCompounds: ['Crocin', 'Crocetin', 'Safranal', 'Picrocrocin'],
    modernResearch: 'Multiple RCTs examine saffron for healthy mood and cognitive function. Crocin and safranal studied for neuroprotective properties and normal serotonergic signaling. Among the strongest clinical evidence profiles for any cognitive botanical.',
    safetyNotes: 'Well-tolerated at recommended doses (≤30mg/day stigma equivalent). Mild serotonergic activity — discuss with provider if on antidepressants.',
    references: [
      { citation: 'Hausenblas HA et al. Saffron (Crocus sativus L.) and major depressive disorder: a meta-analysis. J Integr Med. 2013;11(6):377-383.', url: 'https://doi.org/10.3736/jintegrmed2013056', type: 'meta-analysis' },
      { citation: 'WHO Monographs: Stigma Croci.', type: 'pharmacopoeia' },
    ],
  },

  {
    monographNumber: 0,
    name: 'Bacopa Herb',
    latinBinomial: 'Bacopa monnieri',
    category: 'cognitive',
    formulationSlugs: ['cognitive-clarity-blend'],
    historicalUse: 'Primarily documented in Ayurveda as "Brahmi." Known to medieval Arab pharmacists through Indian Ocean trade routes. Ibn al-Bayṭār referenced Indian memory herbs. Included as a cross-traditional complement to the Judeo-Arabic cognitive botanicals.',
    activeCompounds: ['Bacosides A and B', 'Bacopasides', 'Betulinic acid', 'Stigmasterol'],
    modernResearch: 'Among the most studied nootropic botanicals. Multiple RCTs suggest bacopa supports healthy memory consolidation, attention, and cognitive processing speed. Cochrane review available.',
    safetyNotes: 'Generally well-tolerated. May cause mild GI discomfort. Possible cholinergic interactions — discuss with provider if on seizure medications.',
    references: [
      { citation: 'Kongkeaw C et al. Meta-analysis of randomized controlled trials on cognitive effects of Bacopa monnieri extract. J Ethnopharmacol. 2014;151(1):528-535.', url: 'https://doi.org/10.1016/j.jep.2013.11.008', type: 'meta-analysis' },
      { citation: 'Pase MP et al. The cognitive-enhancing effects of Bacopa monnieri: A systematic review. Hum Psychopharmacol. 2012;27(3):232-241.', url: 'https://doi.org/10.1002/hup.1259', type: 'systematic-review' },
    ],
  },

  {
    monographNumber: 0,
    name: "Lion's Mane Mushroom",
    latinBinomial: 'Hericium erinaceus',
    category: 'cognitive',
    formulationSlugs: ['cognitive-clarity-blend'],
    historicalUse: 'Documented in classical Chinese medicine as a tonic for the spleen and brain. Not present in the Judeo-Arabic pharmacopoeia. Included based on its strong modern evidence profile — a deliberate cross-traditional integration following the HTP methodology.',
    activeCompounds: ['Hericenones (H, I, J)', 'Erinacines (A, B, C)', 'Beta-glucans', 'Ergothioneine'],
    modernResearch: 'Hericenones and erinacines uniquely support nerve growth factor (NGF) synthesis — a mechanism not found in other botanicals. Research suggests lion\'s mane may support healthy neurological function and cognitive clarity.',
    safetyNotes: 'Generally well-tolerated. Rare allergic reactions in individuals sensitive to fungi.',
    references: [
      { citation: 'Mori K et al. Improving effects of Hericium erinaceus on mild cognitive impairment. Phytother Res. 2009;23(3):367-372.', url: 'https://doi.org/10.1002/ptr.2634', type: 'rct' },
      { citation: 'Li IC et al. Neurohealth properties of Hericium erinaceus mycelia. Behav Neurol. 2018;5802634.', url: 'https://doi.org/10.1155/2018/5802634', type: 'systematic-review' },
    ],
  },

  {
    monographNumber: 0,
    name: 'Caraway Seed',
    latinBinomial: 'Carum carvi',
    arabicName: 'Karāwiyā (كراويا)',
    hebrewName: 'Karavya (כרוויה)',
    category: 'digestive',
    formulationSlugs: ['digestive-balance-complex'],
    historicalUse: 'Avicenna documented caraway as a potent carminative and antispasmodic. Medieval Judeo-Arabic formularies regularly paired it with fennel for digestive support. Maimonides noted its warming properties.',
    activeCompounds: ['Carvone', 'Limonene', 'Carveol', 'Dihydrocarvone'],
    modernResearch: 'Studies suggest caraway supports healthy digestive function and comfortable gastric motility. Carvone/limonene profile supports normal smooth muscle function in the digestive tract.',
    safetyNotes: 'Very safe. Long history of culinary and medicinal use.',
    references: [
      { citation: 'ESCOP Monograph: Carvi fructus.', type: 'pharmacopoeia' },
      { citation: 'WHO Monographs Vol. 1: Fructus Carvi.', url: 'https://apps.who.int/iris/handle/10665/42052', type: 'pharmacopoeia' },
    ],
  },
];

// ═══════════════════════════════════════════════════════
// UTILITY FUNCTIONS
// ═══════════════════════════════════════════════════════

export function getMonographsByFormulation(slug: string): IngredientMonograph[] {
  return ingredientMonographs.filter((m) => m.formulationSlugs.includes(slug));
}

export function getMonographByName(name: string): IngredientMonograph | undefined {
  return ingredientMonographs.find((m) => m.name === name);
}

export function getMonographsByCategory(category: IngredientMonograph['category']): IngredientMonograph[] {
  return ingredientMonographs.filter((m) => m.category === category);
}

export function getRambamMonographs(): IngredientMonograph[] {
  return ingredientMonographs.filter((m) => m.monographNumber > 0).sort((a, b) => a.monographNumber - b.monographNumber);
}
