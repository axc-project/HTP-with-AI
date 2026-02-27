export const siteConfig = {
  name: 'Historical Translation Project™',
  abbr: 'HTP',
  tagline: 'Bridging Nine Centuries of Medical Scholarship',
  description:
    'A research institute dedicated to the rigorous translation, authentication, and modern scientific contextualization of classical Islamic-Jewish medical and pharmacognostic texts.',
  url: 'https://historicaltranslationproject.com',
  email: 'research@historicaltranslationproject.com',
  founded: '2019',
  registeredTM: true,
};

export const navLinks = [
  { label: 'Home',          href: '/' },
  { label: 'About',         href: '/about' },
  { label: 'Formulations',  href: '/formulations' },
  { label: 'Research',      href: '/research' },
  { label: 'AI Advisor',    href: '/advisor',  badge: 'Beta' },
  { label: 'Contact',       href: '/contact' },
];

export const footerLinks = {
  institute: [
    { label: 'About HTP',      href: '/about' },
    { label: 'Research Scope', href: '/research' },
    { label: 'Advisory Board', href: '/about#advisory' },
  ],
  scholarship: [
    { label: 'Rambam / Maimonides', href: '/research#rambam' },
    { label: 'Ibn Sīnā / Avicenna', href: '/research#avicenna' },
    { label: 'Ibn Zuhr / Avenzoar', href: '/research#avenzoar' },
  ],
  formulations: [
    { label: 'All Formulations',   href: '/formulations' },
    { label: 'Digestive',          href: '/formulations?category=digestive' },
    { label: 'Cognitive',          href: '/formulations?category=cognitive' },
    { label: 'Respiratory',        href: '/formulations?category=respiratory' },
    { label: 'Cardiovascular',     href: '/formulations?category=cardiovascular' },
  ],
  legal: [
    { label: 'Disclaimer',         href: '/disclaimer' },
    { label: 'Privacy Policy',     href: '/privacy' },
    { label: 'Terms of Use',       href: '/terms' },
  ],
};
