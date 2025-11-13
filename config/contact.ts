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
  twitter: '@vijayrajendran_',
  site: 'vijayrajendran.com',
  calendly: 'https://calendly.com/vijaykrajendran69',
  links: {
    github: 'https://github.com/vijayvj6796',
    linkedin: 'https://www.linkedin.com/in/vijaykumar96',
    googlescholar:
      'https://scholar.google.com/citations?user=8wIfeAsAAAAJ&hl=en',
    twitter: 'https://twitter.com/vijayrajendran_',
    youtube: 'https://www.youtube.com/c/techtravellertales',
    email: 'mailto:vijaykrajendran@gmail.com',
    buymeacoffee: 'https://www.buymeacoffee.com/vijayrajendran_'
  },
};
