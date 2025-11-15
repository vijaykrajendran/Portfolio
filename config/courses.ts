export type CourseContent = {
  name: string;
  slug?: string;
  description?: string;
  content?: CourseContent[];
};

export interface Course {
  title: string;
  slug: string;
  banner: string;
  description: string;
  content: CourseContent[];
}

export const courseSlugMap = {
  go: 'Learn Go',
  'system-design': 'System Design',
  'learn-mysql': 'Learn Mysql',
  'learn-nginx': 'Learn Nginx',
  python: 'Learn Python',
};

export const courses: Course[] = [
  {
    title: 'Learn Mysql',
    slug: 'learn-mysql',
    banner: '/static/courses/learn-mysql/banner.png',
    description:
      'Learn how to work realtime on Mysql database in production Environment',
    content: [
      {
        name: 'Getting Started',
        content: [
          {
            name: 'Welcome to the MYSQL course',
            slug: 'welcome-to-the-courses1',
          },
          {
            name: 'What is RDBMS & Why MYSQL?',
            slug: 'what-is-system-design',
          },
        ],
      },
      {
        name: 'Chapter I:  Introduction to Databases',
        content: [
          {
            name: 'What is Database?',
            slug: 'Introduction',
          },
          {
            name: 'Introduction to RDBMS',
            slug: 'Introduction-to-RDBMS',
          },
        ],
      },
      {
        name: 'Chapter II',
        content: [
          {
            name: 'Databases and DBMS',
            slug: 'databases-and-dbms',
          },
          {
            name: 'SQL databases',
            slug: 'sql-databases',
          },
          {
            name: 'NoSQL databases',
            slug: 'nosql-databases',
          },
          {
            name: 'SQL vs NoSQL databases',
            slug: 'sql-vs-nosql-databases',
          },
          {
            name: 'Database Replication',
            slug: 'database-replication',
          },
          {
            name: 'Indexes',
            slug: 'indexes',
          },
          {
            name: 'Normalization and Denormalization',
            slug: 'normalization-and-denormalization',
          },
          {
            name: 'ACID and BASE consistency models',
            slug: 'acid-and-base-consistency-models',
          },
          {
            name: 'CAP theorem',
            slug: 'cap-theorem',
          },
          {
            name: 'PACELC Theorem',
            slug: 'pacelc-theorem',
          },
          {
            name: 'Transactions',
            slug: 'transactions',
          },
          {
            name: 'Distributed Transactions',
            slug: 'distributed-transactions',
          },
          {
            name: 'Sharding',
            slug: 'sharding',
          },
          {
            name: 'Consistent Hashing',
            slug: 'consistent-hashing',
          },
          {
            name: 'Database Federation',
            slug: 'database-federation',
          },
        ],
      },
      {
        name: 'Chapter III',
        content: [
          {
            name: 'N-tier architecture',
            slug: 'n-tier-architecture',
          },
          {
            name: 'Message Brokers',
            slug: 'message-brokers',
          },
          {
            name: 'Message Queues',
            slug: 'message-queues',
          },
          {
            name: 'Publish-Subscribe',
            slug: 'publish-subscribe',
          },
          {
            name: 'Enterprise Service Bus (ESB)',
            slug: 'enterprise-service-bus',
          },
          {
            name: 'Monoliths and Microservices',
            slug: 'monoliths-microservices',
          },
          {
            name: 'Event-Driven Architecture (EDA)',
            slug: 'event-driven-architecture',
          },
          {
            name: 'Event Sourcing',
            slug: 'event-sourcing',
          },
          {
            name: 'Command and Query Responsibility Segregation (CQRS)',
            slug: 'command-and-query-responsibility-segregation',
          },
          {
            name: 'API Gateway',
            slug: 'api-gateway',
          },
          {
            name: 'REST, GraphQL, gRPC',
            slug: 'rest-graphql-grpc',
          },
          {
            name: 'Long polling, WebSockets, Server-Sent Events (SSE)',
            slug: 'long-polling-websockets-server-sent-events',
          },
        ],
      },
      {
        name: 'Chapter IV',
        content: [
          {
            name: 'Geohashing and Quadtrees',
            slug: 'geohashing-and-quadtrees',
          },
          {
            name: 'Circuit breaker ',
            slug: 'circuit-breaker',
          },
          {
            name: 'Rate Limiting',
            slug: 'rate-limiting',
          },
          {
            name: 'Service Discovery',
            slug: 'service-discovery',
          },
          {
            name: 'SLA, SLO, SLI',
            slug: 'sla-slo-sli',
          },
          {
            name: 'Disaster recovery',
            slug: 'disaster-recovery',
          },
          {
            name: 'Virtual Machines (VMs) and Containers',
            slug: 'virtual-machines-and-containers',
          },
          {
            name: 'OAuth 2.0 and OpenID Connect (OIDC)',
            slug: 'oauth2-and-openid-connect',
          },
          {
            name: 'Single Sign-On (SSO)',
            slug: 'single-sign-on',
          },
          {
            name: 'SSL, TLS, mTLS',
            slug: 'ssl-tls-mtls',
          },
        ],
      },
      {
        name: 'Chapter V',
        content: [
          {
            name: 'System Design Interviews',
            slug: 'system-design-interviews',
          },
          {
            name: 'URL Shortener',
            slug: 'url-shortener',
          },
          {
            name: 'WhatsApp',
            slug: 'whatsapp',
          },
          {
            name: 'Twitter',
            slug: 'twitter',
          },
          {
            name: 'Netflix',
            slug: 'netflix',
          },
          {
            name: 'Uber',
            slug: 'uber',
          },
        ],
      },
      {
        name: 'Appendix',
        content: [
          {
            name: 'Next Steps',
            slug: 'next-steps',
          },
          {
            name: 'References',
            slug: 'references',
          },
        ],
      },
    ],
  },
  {
    title: 'Learn Go',
    slug: 'go',
    banner: '/static/courses/go/banner.png',
    description:
      'Master the fundamentals and advanced features of the Go programming language',
    content: [
      {
        name: 'Getting Started',
        content: [
          {
            name: 'Welcome to the course',
            slug: 'welcome-to-the-course',
          },
          {
            name: 'What is Go?',
            slug: 'what-is-go',
          },
          {
            name: 'Why learn Go?',
            slug: 'why-learn-go',
          },
          {
            name: 'Installation and Setup',
            slug: 'installation-and-setup',
          },
        ],
      },
      {
        name: 'Chapter I',
        content: [
          { name: 'Hello world', slug: 'hello-world' },
          {
            name: 'Variables and Data Types',
            slug: 'variables-and-data-types',
          },
          { name: 'String Formatting', slug: 'string-formatting' },
          { name: 'Flow Control', slug: 'flow-control' },
          { name: 'Functions', slug: 'functions' },
          { name: 'Modules', slug: 'modules' },
          { name: 'Packages', slug: 'packages' },
          { name: 'Workspaces', slug: 'workspaces' },
          { name: 'Useful Commands', slug: 'useful-commands' },
          { name: 'Build', slug: 'build' },
        ],
      },
      {
        name: 'Chapter II',
        content: [
          { name: 'Pointers', slug: 'pointers' },
          { name: 'Structs', slug: 'structs' },
          { name: 'Methods', slug: 'methods' },
          { name: 'Arrays and Slices', slug: 'arrays-and-slices' },
          { name: 'Maps', slug: 'maps' },
        ],
      },
      {
        name: 'Chapter III',
        content: [
          { name: 'Interfaces', slug: 'interfaces' },
          { name: 'Errors', slug: 'errors' },
          { name: 'Panic and Recover', slug: 'panic-and-recover' },
          { name: 'Testing', slug: 'testing' },
          { name: 'Generics', slug: 'generics' },
        ],
      },
      {
        name: 'Chapter IV',
        content: [
          { name: 'Concurrency', slug: 'concurrency' },
          { name: 'Goroutines', slug: 'goroutines' },
          { name: 'Channels', slug: 'channels' },
          { name: 'Select', slug: 'select' },
          { name: 'Sync Package', slug: 'sync-package' },
          {
            name: 'Advanced Concurrency Patterns',
            slug: 'advanced-concurrency-patterns',
          },
          { name: 'Context', slug: 'context' },
        ],
      },
      {
        name: 'Appendix',
        content: [
          { name: 'Next Steps', slug: 'next-steps' },
          { name: 'References', slug: 'references' },
        ],
      },
    ],
  },
  {
    title: 'Learn Nginx',
    slug: 'learn-nginx',
    banner: '/static/courses/learn-nginx/banner.png',
    description: 'Master Nginx - the modern web server and load balancer used in production DevOps environments',
    content: [
      {
        name: 'Getting Started',
        content: [
          {
            name: 'Welcome to Nginx',
            slug: 'welcome-to-nginx',
          },
          {
            name: 'What is Nginx and Why It Matters',
            slug: '1.Introduction-to-nginx',
          },
          {
            name: 'Nginx vs Apache and Other Web Servers',
            slug: 'nginx-vs-apache',
          },
        ],
      },
      {
        name: 'Chapter I: Installation & Basic Setup',
        content: [
          {
            name: 'Installing Nginx on Linux',
            slug: 'installing-nginx-linux',
          },
          {
            name: 'Starting, Stopping, and Managing Nginx Service',
            slug: 'managing-nginx-service',
          },
          {
            name: 'Understanding Nginx Configuration Files',
            slug: 'nginx-config-files',
          },
          {
            name: 'Directory Structure and Best Practices',
            slug: 'nginx-directory-structure',
          },
        ],
      },
      {
        name: 'Chapter II: Core Configuration & Virtual Hosts',
        content: [
          {
            name: 'Nginx Configuration Fundamentals',
            slug: 'nginx-config-fundamentals',
          },
          {
            name: 'Server Blocks and Virtual Hosts',
            slug: 'server-blocks-virtual-hosts',
          },
          {
            name: 'Root and Alias Directives',
            slug: 'root-alias-directives',
          },
          {
            name: 'Index Files and Try Files',
            slug: 'index-try-files',
          },
          {
            name: 'Location Blocks and Pattern Matching',
            slug: 'location-blocks-pattern-matching',
          },
        ],
      },
      {
        name: 'Chapter III: Reverse Proxy & Load Balancing',
        content: [
          {
            name: 'Understanding Reverse Proxy',
            slug: 'understanding-reverse-proxy',
          },
          {
            name: 'Configuring Nginx as a Reverse Proxy',
            slug: 'configuring-reverse-proxy',
          },
          {
            name: 'Upstream Blocks and Backend Servers',
            slug: 'upstream-blocks',
          },
          {
            name: 'Load Balancing Algorithms',
            slug: 'load-balancing-algorithms',
          },
          {
            name: 'Round Robin, Least Connections, IP Hash',
            slug: 'round-robin-least-connections-ip-hash',
          },
          {
            name: 'Health Checks and Failover',
            slug: 'health-checks-failover',
          },
          {
            name: 'Proxy Headers and Pass Through',
            slug: 'proxy-headers-pass-through',
          },
        ],
      },
      {
        name: 'Chapter IV: SSL/TLS & Security',
        content: [
          {
            name: 'Understanding SSL and HTTPS',
            slug: 'understanding-ssl-https',
          },
          {
            name: 'Setting Up Self-Signed Certificates',
            slug: 'self-signed-certificates',
          },
          {
            name: 'Integrating Let\'s Encrypt with Certbot',
            slug: 'lets-encrypt-certbot',
          },
          {
            name: 'Nginx SSL Configuration Best Practices',
            slug: 'nginx-ssl-best-practices',
          },
          {
            name: 'HTTP to HTTPS Redirection',
            slug: 'http-https-redirection',
          },
          {
            name: 'HSTS and Security Headers',
            slug: 'hsts-security-headers',
          },
          {
            name: 'SSL/TLS Termination',
            slug: 'ssl-tls-termination',
          },
        ],
      },
      {
        name: 'Chapter V: Performance Optimization',
        content: [
          {
            name: 'Gzip Compression',
            slug: 'gzip-compression',
          },
          {
            name: 'Brotli Compression',
            slug: 'brotli-compression',
          },
          {
            name: 'Browser Caching Strategies',
            slug: 'browser-caching-strategies',
          },
          {
            name: 'Open File Cache',
            slug: 'open-file-cache',
          },
          {
            name: 'Worker Processes and Connections',
            slug: 'worker-processes-connections',
          },
          {
            name: 'Buffer Optimization',
            slug: 'buffer-optimization',
          },
          {
            name: 'Timeouts and Keep-Alive',
            slug: 'timeouts-keep-alive',
          },
        ],
      },
      {
        name: 'Chapter VI: Advanced Topics',
        content: [
          {
            name: 'Rate Limiting and Traffic Control',
            slug: 'rate-limiting-traffic-control',
          },
          {
            name: 'Nginx Modules and Extensions',
            slug: 'nginx-modules-extensions',
          },
          {
            name: 'URL Rewriting and Redirects',
            slug: 'url-rewriting-redirects',
          },
          {
            name: 'Authentication and Access Control',
            slug: 'authentication-access-control',
          },
          {
            name: 'Nginx as an API Gateway',
            slug: 'nginx-api-gateway',
          },
          {
            name: 'Stream Module for TCP/UDP',
            slug: 'stream-module-tcp-udp',
          },
        ],
      },
      {
        name: 'Chapter VII: Docker & Kubernetes',
        content: [
          {
            name: 'Dockerizing Nginx Applications',
            slug: 'dockerizing-nginx',
          },
          {
            name: 'Building Custom Nginx Docker Images',
            slug: 'custom-nginx-docker-images',
          },
          {
            name: 'Nginx Deployment on Kubernetes',
            slug: 'nginx-kubernetes-deployment',
          },
          {
            name: 'Nginx ConfigMaps and Secrets in K8s',
            slug: 'nginx-configmaps-secrets-k8s',
          },
          {
            name: 'Ingress Controller with Nginx',
            slug: 'ingress-controller-nginx',
          },
        ],
      },
      {
        name: 'Chapter VIII: Monitoring & Troubleshooting',
        content: [
          {
            name: 'Nginx Logs and Log Analysis',
            slug: 'nginx-logs-analysis',
          },
          {
            name: 'Monitoring with Prometheus and Grafana',
            slug: 'monitoring-prometheus-grafana',
          },
          {
            name: 'Common Nginx Errors and Fixes',
            slug: 'common-nginx-errors',
          },
          {
            name: 'Performance Benchmarking',
            slug: 'performance-benchmarking',
          },
          {
            name: 'Debugging Nginx Configuration',
            slug: 'debugging-nginx-configuration',
          },
        ],
      },
      {
        name: 'Chapter IX: Real-World Projects',
        content: [
          {
            name: 'Multi-Site Hosting Setup',
            slug: 'multi-site-hosting-setup',
          },
          {
            name: 'Load Balancing Multiple Backend Services',
            slug: 'load-balancing-multiple-backends',
          },
          {
            name: 'Static File Serving with Caching',
            slug: 'static-file-serving-caching',
          },
          {
            name: 'Microservices Routing with Nginx',
            slug: 'microservices-routing',
          },
          {
            name: 'High-Availability Setup with Failover',
            slug: 'high-availability-setup',
          },
        ],
      },
      {
        name: 'Appendix',
        content: [
          {
            name: 'Common Configuration Examples',
            slug: 'common-config-examples',
          },
          {
            name: 'Nginx Directives Reference',
            slug: 'nginx-directives-reference',
          },
          {
            name: 'Best Practices Checklist',
            slug: 'best-practices-checklist',
          },
          {
            name: 'Resources and Further Learning',
            slug: 'resources-further-learning',
          },
        ],
      },
    ],
  },
];
