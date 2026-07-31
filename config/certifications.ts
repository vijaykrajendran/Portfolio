export interface Certification {
  title: string;
  slug: string;
  issuer: string;
  issueDate: string;
  expiryDate?: string;
  credentialId?: string;
  credentialUrl?: string;
  badge: string;
  description: string;
  skills: string[];
}

export const certifications: Certification[] = [
  {
    title: 'Certified Kubernetes Administrator (CKA)',
    slug: 'cka',
    issuer: 'The Linux Foundation',
    issueDate: '2024-01-15',
    expiryDate: '2027-01-15',
    credentialId: 'LF-xxxxx',
    credentialUrl: 'https://www.credly.com/badges/your-cka-badge',
    badge: '/static/certifications/cka.svg',
    description: 'Demonstrates the ability to perform the responsibilities of a Kubernetes administrator, including cluster maintenance, networking, storage, and security.',
    skills: ['Kubernetes', 'Container Orchestration', 'Cluster Administration', 'etcd', 'Networking'],
  },
  {
    title: 'Certified Kubernetes Application Developer (CKAD)',
    slug: 'ckad',
    issuer: 'The Linux Foundation',
    issueDate: '2024-03-20',
    expiryDate: '2027-03-20',
    credentialId: 'LF-xxxxx',
    credentialUrl: 'https://www.credly.com/badges/your-ckad-badge',
    badge: '/static/certifications/ckad.svg',
    description: 'Validates expertise in designing, building, configuring, and deploying cloud-native applications for Kubernetes.',
    skills: ['Kubernetes', 'Application Development', 'Pod Design', 'Configuration', 'Observability'],
  },
  {
    title: 'Certified Kubernetes Security Specialist (CKS)',
    slug: 'cks',
    issuer: 'The Linux Foundation',
    issueDate: '2024-06-10',
    expiryDate: '2026-06-10',
    credentialId: 'LF-xxxxx',
    credentialUrl: 'https://www.credly.com/badges/your-cks-badge',
    badge: '/static/certifications/cks.svg',
    description: 'Demonstrates proficiency in securing container-based applications and Kubernetes platforms during build, deployment, and runtime.',
    skills: ['Kubernetes Security', 'Network Policies', 'Runtime Security', 'Supply Chain Security', 'Cluster Hardening'],
  },
  {
    title: 'Kubernetes and Cloud Native Associate (KCNA)',
    slug: 'kcna',
    issuer: 'The Linux Foundation',
    issueDate: '2023-11-05',
    credentialId: 'LF-xxxxx',
    credentialUrl: 'https://www.credly.com/badges/your-kcna-badge',
    badge: '/static/certifications/kcna.svg',
    description: 'Entry-level certification demonstrating foundational knowledge of Kubernetes and cloud-native technologies.',
    skills: ['Kubernetes Fundamentals', 'Cloud Native', 'Container Basics', 'GitOps', 'Observability'],
  },
  {
    title: 'Kubernetes and Cloud Native Security Associate (KCSA)',
    slug: 'kcsa',
    issuer: 'The Linux Foundation',
    issueDate: '2024-08-15',
    credentialId: 'LF-xxxxx',
    credentialUrl: 'https://www.credly.com/badges/your-kcsa-badge',
    badge: '/static/certifications/kcsa.svg',
    description: 'Validates understanding of security concepts and best practices for Kubernetes and cloud-native environments.',
    skills: ['Security Fundamentals', 'Compliance', 'Platform Security', 'Cloud Security', 'Container Security'],
  },
  // Add more certifications below as needed
  // {
  //   title: 'AWS Certified Solutions Architect',
  //   slug: 'aws-sa',
  //   issuer: 'Amazon Web Services',
  //   issueDate: '2024-02-01',
  //   expiryDate: '2027-02-01',
  //   credentialId: 'AWS-xxxxx',
  //   credentialUrl: 'https://www.credly.com/badges/your-aws-badge',
  //   badge: '/static/certifications/aws-sa.png',
  //   description: 'Validates expertise in designing distributed systems on AWS.',
  //   skills: ['AWS', 'Cloud Architecture', 'EC2', 'S3', 'VPC'],
  // },
];

// KubeAstronaut is awarded to individuals who have earned all five Kubernetes certifications
export const kubeAstronautStatus = {
  isKubeAstronaut: true,
  awardDate: '2024-09-01',
  credentialUrl: 'https://www.credly.com/badges/your-kubeastronaut-badge',
  badge: '/static/certifications/kubeastronaut.svg',
  certifications: ['CKA', 'CKAD', 'CKS', 'KCNA', 'KCSA'],
};
