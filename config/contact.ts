export enum ContactType {
  github = 'github',
  linkedin = 'linkedin',
  twitter = 'twitter',
  youtube = 'youtube',
  email = 'email',
  buymeacoffee = 'buymeacoffee',
  googlescholar = 'googlescholar',
}

export interface Contact {
  twitter: string;
  site: string;
  calendly?: string;
  links: Record<ContactType, string>;
}

export const contact: Contact = {
  twitter: '@karan_6864',
  site: 'vijayrajendran.com',
  calendly: 'https://calendly.com/karanpratapsingh',
  links: {
    github: 'https://github.com/vijayvj6796',
    linkedin: 'https://www.linkedin.com/in/vijaykumar96',
    googlescholar:
      'https://scholar.google.com/citations?user=8wIfeAsAAAAJ&hl=en',
    twitter: 'https://twitter.com/karan_6864',
    youtube: 'https://www.youtube.com/c/KaranPratapSingh',
    email: 'mailto:contact@karanpratapsingh.com',
    buymeacoffee: 'https://www.buymeacoffee.com/karanps',
  },
};
