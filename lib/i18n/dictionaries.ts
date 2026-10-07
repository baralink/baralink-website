export type Locale = 'en' | 'fr';

const en = {
  nav: {
    home: 'Home',
      about: 'About Us',
      howItWorks: 'How it works',
      forClients: 'For Clients',
      forWorkers: 'For Workers',
      contact: 'Contact Us',
    },
    announcement:
      '🎉 Welcome to BaraLink! The new mobile app is now available for download.',
    callUs: 'Call Us',
    hero: {
      titleLine1: 'Trusted local workers,',
      titleLine2: 'a tap away.',
      description:
        'Book verified workers in Guinea for repairs, cleaning, delivery and everyday home services.',
      download: 'Download the app',
      howItWorks: 'See how it works',
    },
    about: {
      eyebrow: 'About Us',
      headline: 'Trust shouldn’t depend on who you know.',
      body: 'We help people in Guinea find verified local workers in minutes — and help skilled workers build a reputation they own.',
      stats: [
        { value: '96%', label: 'of work is informal' },
        { value: '84.6%', label: 'have a phone' },
        { value: '1 city', label: 'to start' },
      ],
    },
    how: {
      heading: 'A smooth, trusted way to get things done',
      intro:
        'It only takes a few steps to find reliable help and keep your home running without the usual back and forth.',
      steps: [
        'Search for the service you need near you.',
        'Book a verified worker and agree on the job.',
        'Rate the work and build trust for next time.',
      ],
    },
    forEveryone: {
      sectionTitle: 'Built for both sides',
      tabClients: 'For Clients',
      tabWorkers: 'For Workers',
      clients: {
        title: 'Help, when you need it',
        subtitle: 'Verified workers near you',
        body: 'Find trusted plumbers, cleaners, electricians and more in minutes. Every worker is verified and rated by real neighbors, so you know exactly who shows up at your door.',
      },
      workers: {
        title: 'More jobs, more income',
        subtitle: 'Build a reputation you own',
        body: 'Reach new clients beyond your personal network and turn good work into steady demand. Your ratings and history stay with you, helping you grow a reputation that keeps the jobs coming.',
      },
    },
    banner: {
      title: 'Your One-Stop Home Solutions Provider',
      subtitle: 'From the app to the comforts of your home.',
      body: 'BaraLink introduces an integrated home services mobile application with a large selection of technical experts covering all aspects of household care. Our platform bridges the gap in the market to offer users convenient access to a network of trusted and quality service providers. We are committed to enhancing consumer accessibility and convenience, playing a key role in revolutionising home services.',
    },
    contact: {
      eyebrow: 'Contact Us',
      heading: 'Get in touch',
      body: 'Questions, partnerships, or need a hand getting started? Reach out and our team will get back to you.',
      phoneLabel: 'Call us',
      emailLabel: 'Email us',
      locationLabel: 'Find us',
      locations: ['Matoto, Conakry', 'AIU Albukhary, Kedah'],
      email: 'hello@baralink.com',
      formName: 'Your name',
      formEmail: 'Your email',
      formMessage: 'Your message',
      formSend: 'Send message',
    },
    footer: {
      getStarted: 'Get started with BaraLink',
      contact: 'Contact us',
      columns: {
        company: 'Company',
        forWorkers: 'For Workers',
        stayConnected: 'Stay connected',
      },
      company: [
        { label: 'About us', href: '#about' },
        { label: 'How it works', href: '#how-it-works' },
        { label: 'For Clients', href: '#for-clients' },
        { label: 'For Workers', href: '#for-workers' },
        { label: 'Contact us', href: '#contact' },
      ],
      workers: [
        { label: 'Join as a worker', href: '#for-workers' },
        { label: 'Verification', href: '#how-it-works' },
        { label: 'FAQs', href: '#contact' },
      ],
      legal: 'Legal',
      privacy: 'Privacy',
      cookies: 'Cookie Notice',
      rights: 'All rights reserved.',
    },
};

const fr: typeof en = {
    nav: {
      home: 'Accueil',
      about: 'À propos',
      howItWorks: 'Comment ça marche',
      forClients: 'Pour les clients',
      forWorkers: 'Pour les travailleurs',
      contact: 'Contact',
    },
    announcement:
      '🎉 Bienvenue sur BaraLink ! La nouvelle application mobile est maintenant disponible au téléchargement.',
    callUs: 'Appelez-nous',
    hero: {
      titleLine1: 'Des travailleurs de confiance,',
      titleLine2: 'à portée de clic.',
      description:
        'Réservez des travailleurs vérifiés en Guinée pour vos réparations, le ménage, la livraison et tous vos services à domicile.',
      download: 'Télécharger l’app',
      howItWorks: 'Voir comment ça marche',
    },
    about: {
      eyebrow: 'À propos',
      headline: 'La confiance ne devrait pas dépendre de vos relations.',
      body: 'Nous aidons les Guinéens à trouver des travailleurs locaux vérifiés en quelques minutes — et nous aidons les travailleurs qualifiés à bâtir une réputation qui leur appartient.',
      stats: [
        { value: '96%', label: 'du travail est informel' },
        { value: '84,6%', label: 'ont un téléphone' },
        { value: '1 ville', label: 'pour commencer' },
      ],
    },
    how: {
      heading: 'Une façon simple et fiable de tout régler',
      intro:
        'Quelques étapes suffisent pour trouver de l’aide fiable et faire tourner votre foyer sans les allers-retours habituels.',
      steps: [
        'Cherchez le service dont vous avez besoin près de chez vous.',
        'Réservez un travailleur vérifié et convenez de la tâche.',
        'Notez le travail et construisez la confiance pour la prochaine fois.',
      ],
    },
    forEveryone: {
      sectionTitle: 'Conçu pour les deux côtés',
      tabClients: 'Pour les clients',
      tabWorkers: 'Pour les travailleurs',
      clients: {
        title: 'De l’aide, quand vous en avez besoin',
        subtitle: 'Des travailleurs vérifiés près de chez vous',
        body: 'Trouvez des plombiers, agents de ménage, électriciens et bien d’autres en quelques minutes. Chaque travailleur est vérifié et noté par de vrais voisins, pour savoir exactement qui se présente chez vous.',
      },
      workers: {
        title: 'Plus de missions, plus de revenus',
        subtitle: 'Bâtissez une réputation qui vous appartient',
        body: 'Touchez de nouveaux clients au-delà de votre réseau personnel et transformez un bon travail en demande régulière. Vos notes et votre historique vous suivent et vous aident à bâtir une réputation qui attire les missions.',
      },
    },
    banner: {
      title: 'Votre partenaire unique pour la maison',
      subtitle: 'De l’application au confort de votre foyer.',
      body: 'BaraLink propose une application mobile intégrée de services à domicile avec une large sélection d’experts techniques couvrant tous les aspects de l’entretien de la maison. Notre plateforme comble un manque du marché pour offrir aux utilisateurs un accès pratique à un réseau de prestataires de confiance et de qualité. Nous nous engageons à améliorer l’accessibilité et la commodité pour les consommateurs, en jouant un rôle clé dans la transformation des services à domicile.',
    },
    contact: {
      eyebrow: 'Contact',
      heading: 'Entrons en contact',
      body: 'Des questions, un partenariat, ou besoin d’aide pour démarrer ? Écrivez-nous et notre équipe vous répondra.',
      phoneLabel: 'Appelez-nous',
      emailLabel: 'Écrivez-nous',
      locationLabel: 'Où nous trouver',
      locations: ['Matoto, Conakry', 'AIU Albukhary, Kedah'],
      email: 'hello@baralink.com',
      formName: 'Votre nom',
      formEmail: 'Votre e-mail',
      formMessage: 'Votre message',
      formSend: 'Envoyer le message',
    },
    footer: {
      getStarted: 'Commencez avec BaraLink',
      contact: 'Nous contacter',
      columns: {
        company: 'Entreprise',
        forWorkers: 'Pour les travailleurs',
        stayConnected: 'Restez connecté',
      },
      company: [
        { label: 'À propos', href: '#about' },
        { label: 'Comment ça marche', href: '#how-it-works' },
        { label: 'Pour les clients', href: '#for-clients' },
        { label: 'Pour les travailleurs', href: '#for-workers' },
        { label: 'Contact', href: '#contact' },
      ],
      workers: [
        { label: 'Devenir travailleur', href: '#for-workers' },
        { label: 'Vérification', href: '#how-it-works' },
        { label: 'FAQ', href: '#contact' },
      ],
      legal: 'Mentions légales',
      privacy: 'Confidentialité',
      cookies: 'Cookies',
      rights: 'Tous droits réservés.',
    },
};

export const dictionaries: Record<Locale, typeof en> = { en, fr };

export type Dictionary = typeof en;
