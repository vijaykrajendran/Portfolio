export interface NavLink {
  href: string;
  title: string;
  /** optional sub-links; when present this renders as a dropdown group */
  children?: { href: string; title: string }[];
}

const headerNavLinks: NavLink[] = [
  { href: '/', title: 'Home' },
  { href: '/projects', title: 'Projects' },
  { href: '/certifications', title: 'Certifications' },
  { href: '/blog', title: 'Blog' },
  {
    href: '#',
    title: 'Learn',
    children: [
      { href: '/courses', title: 'Courses' },
      { href: '/k8s-tools', title: 'K8s Tools' },
      { href: '/k8s-roadmap', title: 'K8s Roadmap' },
      { href: '/ai-devops-tracker', title: 'AI Tracker' },
    ],
  },
  { href: '/about', title: 'About' },
  { href: '/contact', title: 'Disturb_ME' },
];

export default headerNavLinks;
