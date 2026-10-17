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
    consent: {
      title: 'Usage statistics',
      body: 'With your permission, we use Google Analytics to count visits and see which pages help people find BaraLink. Nothing is collected until you choose.',
      accept: 'Accept',
      refuse: 'Refuse',
      privacyLink: 'How we use them',
      currentlyAccepted: 'Your current choice: accepted. You can change it at any time.',
      currentlyRefused: 'Your current choice: refused. You can change it at any time.',
    },
    invitation: {
      yourCode: 'Your invitation code:',
      enterIt: 'enter it in the app when you sign up.',
      close: 'Close',
    },
    privacy: {
      // DRAFT — analytics plan AN-11: to be approved by BaraLink and reviewed by a lawyer
      // (Guinea, Loi L/2016/037/AN; GDPR for users in Europe) before this page is published.
      title: 'Privacy policy',
      updated: 'Last updated: 17 October 2026',
      intro: 'Your privacy matters to us. This page explains what BaraLink collects, why, who it is shared with, and the choices you have.',
      sections: [
        {
          id: 'collected',
          title: 'What we collect',
          body: [
            'Your name, phone number, email address, location and profile photo, so that the app works: creating your account, matching clients and workers, and confirming your phone number by SMS.',
            'For workers, the identity document sent for verification. For payments, what the payment provider returns about each payment and payout.',
          ],
        },
        {
          id: 'use',
          title: 'How we use it',
          body: [
            'To create your profile, connect you with the people you work with, take and send payments, keep the service safe, and improve it.',
          ],
        },
        {
          id: 'sharing',
          title: 'Who it is shared with',
          body: [
            'We never sell your data. Your information is shared with the users you deal with on BaraLink, and with the providers that run the service for us: payments (LengoPay), SMS (Nimba SMS), email (Resend), file storage (Cloudinary), hosting (Railway) and, if you allow it, usage statistics (Google).',
          ],
        },
        {
          id: 'analytics',
          title: 'Usage statistics (Google Analytics and Firebase)',
          body: [
            'On this website, Google Analytics is loaded only after you click "Accept". It then counts visits, the pages seen and clicks on the download, contact and social buttons, and stores cookies (for example _ga) in your browser. If you click "Refuse", nothing is loaded. You can change your choice at any time with the "Cookies" link at the bottom of every page.',
            'In the app, Google Analytics for Firebase is used only if you answer "Allow" to the usage-statistics question. The app then sends which screens are used and the main steps (sign-up, posting a job, applying, paying). It identifies you with a random number, never your name, phone number or account number. You can withdraw at any time in Settings → Privacy.',
            'We use no advertising features: no ad personalisation, no Google signals. Statistics are kept 14 months. Google may process them outside Guinea, including in the United States.',
          ],
        },
        {
          id: 'retention',
          title: 'How long we keep it',
          body: [
            'As long as your account is open, then for the time the law requires for payment records. You can delete your account from the app, and ask our support to delete the usage statistics linked to it.',
          ],
        },
        {
          id: 'rights',
          title: 'Your rights',
          body: [
            'You can ask to see, correct or delete your data, and withdraw a consent you gave, by contacting our support from the app.',
          ],
        },
      ],
      back: 'Back to the home page',
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
    consent: {
      title: 'Statistiques de visite',
      body: 'Avec votre accord, nous utilisons Google Analytics pour compter les visites et voir quelles pages aident à découvrir BaraLink. Rien n’est collecté avant votre choix.',
      accept: 'Accepter',
      refuse: 'Refuser',
      privacyLink: 'À quoi elles servent',
      currentlyAccepted: 'Votre choix actuel : accepté. Vous pouvez le changer à tout moment.',
      currentlyRefused: 'Votre choix actuel : refusé. Vous pouvez le changer à tout moment.',
    },
    invitation: {
      yourCode: 'Votre code d’invitation :',
      enterIt: 'saisissez-le dans l’application lors de votre inscription.',
      close: 'Fermer',
    },
    privacy: {
      title: 'Politique de confidentialité',
      updated: 'Dernière mise à jour : 17 octobre 2026',
      intro: 'Votre vie privée est importante pour nous. Cette page explique ce que BaraLink collecte, pourquoi, avec qui c’est partagé et les choix dont vous disposez.',
      sections: [
        {
          id: 'collected',
          title: 'Données collectées',
          body: [
            'Votre nom, numéro de téléphone, adresse email, localisation et photo de profil, pour le fonctionnement de l’application : créer votre compte, mettre en relation clients et prestataires, et confirmer votre numéro par SMS.',
            'Pour les prestataires, la pièce d’identité envoyée pour la vérification. Pour les paiements, ce que le prestataire de paiement renvoie sur chaque paiement et chaque versement.',
          ],
        },
        {
          id: 'use',
          title: 'Utilisation',
          body: [
            'Créer votre profil, vous mettre en relation avec les personnes avec qui vous travaillez, encaisser et verser les paiements, protéger le service et l’améliorer.',
          ],
        },
        {
          id: 'sharing',
          title: 'Partage',
          body: [
            'Nous ne vendons jamais vos données. Vos informations sont partagées avec les utilisateurs avec qui vous interagissez sur BaraLink, et avec les prestataires qui font fonctionner le service : paiements (LengoPay), SMS (Nimba SMS), email (Resend), stockage de fichiers (Cloudinary), hébergement (Railway) et, si vous l’acceptez, statistiques d’utilisation (Google).',
          ],
        },
        {
          id: 'analytics',
          title: 'Statistiques d’utilisation (Google Analytics et Firebase)',
          body: [
            'Sur ce site, Google Analytics n’est chargé qu’après un clic sur « Accepter ». Il compte alors les visites, les pages vues et les clics sur les boutons de téléchargement, de contact et des réseaux sociaux, et dépose des cookies (par exemple _ga) dans votre navigateur. Si vous cliquez sur « Refuser », rien n’est chargé. Vous pouvez changer d’avis à tout moment avec le lien « Cookies » en bas de chaque page.',
            'Dans l’application, Google Analytics pour Firebase n’est utilisé que si vous répondez « Autoriser » à la question sur les statistiques. L’application envoie alors les écrans utilisés et les étapes principales (inscription, publication d’une mission, candidature, paiement). Elle vous identifie par un numéro aléatoire, jamais par votre nom, votre téléphone ou votre numéro de compte. Vous pouvez retirer votre accord à tout moment dans Paramètres → Confidentialité.',
            'Nous n’utilisons aucune fonction publicitaire : ni personnalisation des annonces, ni signaux Google. Les statistiques sont conservées 14 mois. Google peut les traiter hors de Guinée, notamment aux États-Unis.',
          ],
        },
        {
          id: 'retention',
          title: 'Durée de conservation',
          body: [
            'Tant que votre compte est ouvert, puis pendant la durée que la loi impose pour les traces de paiement. Vous pouvez supprimer votre compte depuis l’application, et demander à notre support de supprimer les statistiques qui y sont liées.',
          ],
        },
        {
          id: 'rights',
          title: 'Vos droits',
          body: [
            'Vous pouvez demander à consulter, corriger ou supprimer vos données, et retirer un accord donné, en contactant notre support depuis l’application.',
          ],
        },
      ],
      back: 'Retour à l’accueil',
    },
};

export const dictionaries: Record<Locale, typeof en> = { en, fr };

export type Dictionary = typeof en;
