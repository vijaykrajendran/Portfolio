import { Maybe, Tuple } from '../types';
import { Stack } from './stack';

export type Deployment = {
  web?: string;
  android?: string;
  ios?: string;
};

export interface SubProject {
  title: string;
  description: string;
  repository: Maybe<string>;
  deployment: Deployment;
}

export const defaultDimensions: Tuple<number> = [450, 220];

export interface Project {
  title: string;
  slug: string;
  website: string;
  banner: string;
  description: string;
  shortDescription?: string;
  repository: Maybe<string>;
  stack: Stack[];
  dimensions?: Tuple<number>; // Tuple of [height, width]
  screenshots: string[];
  deployment: Deployment;
  subProjects: SubProject[];
}

// Projects array - add your projects here.
// These are starter templates based on your DevOps background — replace the
// URLs, descriptions, and screenshots with your real project details.
export const projects: Project[] = [
  {
    title: 'Kubernetes Platform Migration',
    slug: 'kubernetes-platform-migration',
    website: '', // e.g. https://your-demo-or-writeup.com
    banner: '/static/projects/placeholder.png',
    shortDescription:
      'Migrated legacy applications to a Kubernetes-managed containerized platform.',
    description:
      'Led the transition of production applications to a Kubernetes-managed containerized platform. Designed cluster architecture, set up ingress, autoscaling, and rolling deployments, and cut deployment times significantly while improving resilience. (Replace with your real project details.)',
    repository: '', // e.g. https://github.com/vijayvj6796/your-repo
    stack: [
      Stack.kubernetes,
      Stack.docker,
      Stack.terraform,
      Stack.aws,
      Stack.go,
    ],
    screenshots: [],
    deployment: {},
    subProjects: [],
  },
  {
    title: 'CI/CD Pipeline Automation',
    slug: 'cicd-pipeline-automation',
    website: '',
    banner: '/static/projects/placeholder.png',
    shortDescription:
      'Revamped CI/CD strategies and automated key delivery tasks.',
    description:
      'Designed and implemented end-to-end CI/CD pipelines that automated build, test, and deployment workflows, accelerating release cadence and reducing manual toil. Integrated security scanning and automated rollbacks. (Replace with your real project details.)',
    repository: '',
    stack: [Stack.docker, Stack.kubernetes, Stack.aws, Stack.python],
    screenshots: [],
    deployment: {},
    subProjects: [],
  },
  {
    title: 'AWS Data Migration & Cost Optimization',
    slug: 'aws-data-migration',
    website: '',
    banner: '/static/projects/placeholder.png',
    shortDescription:
      'Migrated 25 TB of data to AWS S3 Glacier, significantly reducing costs.',
    description:
      'Planned and executed a large-scale migration of 25 TB of data to AWS S3 Glacier, implementing lifecycle policies and monitoring to significantly reduce storage costs while preserving durability and retrieval SLAs. (Replace with your real project details.)',
    repository: '',
    stack: [Stack.aws, Stack.terraform, Stack.python],
    screenshots: [],
    deployment: {},
    subProjects: [],
  },
];
