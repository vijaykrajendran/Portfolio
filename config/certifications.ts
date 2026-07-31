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
    credentialUrl: 'https://www.credly.com/badges/962c1280-27fc-44b8-ae6f-93a7a05e5902/public_url',
    badge: '/static/certifications/cka.png',
    description: 'Demonstrates the ability to perform the responsibilities of a Kubernetes administrator, including cluster maintenance, networking, storage, and security.',
    skills: ['Kubernetes', 'Container Orchestration', 'Cluster Administration', 'etcd', 'Networking'],
  },
  {
    title: 'Certified Kubernetes Application Developer (CKAD)',
    slug: 'ckad',
    issuer: 'The Linux Foundation',
    issueDate: '2024-03-20',
    credentialUrl: 'https://www.credly.com/badges/be80edcd-1391-4c9b-9604-b34b9c10f8ad/public_url',
    badge: '/static/certifications/ckad.png',
    description: 'Validates expertise in designing, building, configuring, and deploying cloud-native applications for Kubernetes.',
    skills: ['Kubernetes', 'Application Development', 'Pod Design', 'Configuration', 'Observability'],
  },
  {
    title: 'Certified Kubernetes Security Specialist (CKS)',
    slug: 'cks',
    issuer: 'The Linux Foundation',
    issueDate: '2024-06-10',
    credentialUrl: 'https://www.credly.com/badges/dad38aea-8229-4832-88e7-71f2f582f90b/public_url',
    badge: '/static/certifications/cks.png',
    description: 'Demonstrates proficiency in securing container-based applications and Kubernetes platforms during build, deployment, and runtime.',
    skills: ['Kubernetes Security', 'Network Policies', 'Runtime Security', 'Supply Chain Security', 'Cluster Hardening'],
  },
  {
    title: 'Kubernetes and Cloud Native Associate (KCNA)',
    slug: 'kcna',
    issuer: 'The Linux Foundation',
    issueDate: '2023-11-05',
    credentialUrl: 'https://www.credly.com/badges/7e7f817b-5bd4-420f-ad76-ad433cdf7cda/public_url',
    badge: '/static/certifications/kcna.png',
    description: 'Entry-level certification demonstrating foundational knowledge of Kubernetes and cloud-native technologies.',
    skills: ['Kubernetes Fundamentals', 'Cloud Native', 'Container Basics', 'GitOps', 'Observability'],
  },
  {
    title: 'Kubernetes and Cloud Native Security Associate (KCSA)',
    slug: 'kcsa',
    issuer: 'The Linux Foundation',
    issueDate: '2024-08-15',
    credentialUrl: 'https://www.credly.com/badges/963b3e18-a6c6-4aa6-9c30-97d04b8ffed2/public_url',
    badge: '/static/certifications/kcsa.png',
    description: 'Validates understanding of security concepts and best practices for Kubernetes and cloud-native environments.',
    skills: ['Security Fundamentals', 'Compliance', 'Platform Security', 'Cloud Security', 'Container Security'],
  },
];

// KubeAstronaut is awarded to individuals who have earned all five Kubernetes certifications
export const kubeAstronautStatus = {
  isKubeAstronaut: true,
  awardDate: '2024-09-01',
  credentialUrl: 'https://www.credly.com/badges/6676f384-4caa-4b4e-8620-5784c7c9a03f/public_url',
  badge: '/static/certifications/kubeastronaut.png',
  certifications: ['CKA', 'CKAD', 'CKS', 'KCNA', 'KCSA'],
};
