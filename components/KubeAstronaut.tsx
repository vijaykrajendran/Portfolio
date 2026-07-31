import Image from 'next/image';
import Link from './Link';
import { memo } from 'react';

interface KubeAstronautProps {
  awardDate: string;
  credentialUrl: string;
  badge: string;
  certifications: string[];
}

function KubeAstronaut({ awardDate, credentialUrl, badge, certifications }: KubeAstronautProps): React.ReactElement {
  const formatDate = (dateStr: string) => {
    return new Date(dateStr).toLocaleDateString('en-US', {
      month: 'long',
      year: 'numeric',
    });
  };

  return (
    <div className="relative overflow-hidden rounded-xl sm:rounded-2xl bg-gradient-to-br from-slate-900 via-purple-900/80 to-slate-900 border border-white/10">
      {/* Subtle gradient overlay */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-purple-500/10 via-transparent to-transparent" />
      
      <div className="relative p-4 sm:p-6 lg:p-8">
        <div className="flex flex-col items-center text-center sm:flex-row sm:text-left gap-4 sm:gap-6">
          {/* Badge Section - Responsive sizing */}
          <div className="relative flex-shrink-0">
            <div className="relative h-24 w-24 sm:h-32 sm:w-32 lg:h-40 lg:w-40">
              {/* Subtle glow */}
              <div className="absolute inset-0 rounded-full bg-purple-500/20 blur-lg" />
              
              {/* Badge */}
              <div className="relative flex h-full w-full items-center justify-center overflow-hidden rounded-full border-2 border-white/20 bg-black/30 p-2 sm:p-3">
                <Image
                  src={badge}
                  alt="KubeAstronaut Badge"
                  width={120}
                  height={120}
                  className="object-contain"
                  priority
                />
              </div>
            </div>
          </div>

          {/* Content Section */}
          <div className="flex-1 min-w-0">
            {/* Elite badge */}
            <div className="mb-2 inline-flex items-center rounded-full bg-purple-500/20 px-2.5 py-1 border border-purple-500/30">
              <span className="text-xs sm:text-sm font-medium text-purple-300">CNCF Elite Achievement</span>
            </div>

            <h2 className="mb-1 sm:mb-2 text-2xl sm:text-3xl lg:text-4xl font-bold text-white">
              KubeAstronaut
            </h2>

            <p className="mb-3 text-sm sm:text-base text-gray-400">
              Earned <span className="font-semibold text-purple-300">all {certifications.length}</span> Kubernetes certifications
            </p>

            {/* Certification pills - Responsive */}
            <div className="mb-4 flex flex-wrap justify-center sm:justify-start gap-1.5 sm:gap-2">
              {certifications.map((cert) => (
                <span
                  key={cert}
                  className="inline-flex items-center rounded-md bg-white/5 px-2 py-1 text-xs sm:text-sm font-medium text-gray-300 border border-white/10"
                >
                  <svg className="mr-1 h-3 w-3 sm:h-3.5 sm:w-3.5 text-green-400" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                  </svg>
                  {cert}
                </span>
              ))}
            </div>

            {/* Footer with date and verify */}
            <div className="flex flex-col sm:flex-row items-center gap-3 sm:gap-4">
              <span className="text-xs sm:text-sm text-gray-500">
                Awarded <span className="text-gray-300">{formatDate(awardDate)}</span>
              </span>
              
              {credentialUrl && (
                <Link
                  href={credentialUrl}
                  className="inline-flex items-center rounded-lg bg-purple-600 hover:bg-purple-500 px-4 py-2 text-xs sm:text-sm font-medium text-white transition-colors"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <svg className="mr-1.5 h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                  </svg>
                  Verify
                </Link>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default memo(KubeAstronaut);
