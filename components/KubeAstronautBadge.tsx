import Image from 'next/image';
import Link from './Link';
import { memo } from 'react';

interface KubeAstronautBadgeProps {
  badge: string;
  certificationCount: number;
}

function KubeAstronautBadge({ badge, certificationCount }: KubeAstronautBadgeProps): React.ReactElement {
  return (
    <Link href="/certifications" className="group block w-full">
      <div className="relative overflow-hidden rounded-lg sm:rounded-xl bg-gradient-to-r from-slate-900 via-purple-900/90 to-slate-900 p-3 sm:p-4 transition-all duration-300 hover:shadow-xl hover:shadow-purple-500/10 border border-white/10">
        {/* Subtle gradient overlay */}
        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-purple-500/5 to-transparent" />
        
        <div className="relative flex items-center gap-3 sm:gap-4">
          {/* Badge - Smaller on mobile */}
          <div className="relative flex-shrink-0">
            <div className="relative h-10 w-10 sm:h-12 sm:w-12">
              <div className="absolute inset-0 rounded-full bg-purple-500/20 blur-sm" />
              <div className="relative flex h-full w-full items-center justify-center overflow-hidden rounded-full border border-white/20 bg-black/30">
                <Image
                  src={badge}
                  alt="KubeAstronaut"
                  width={40}
                  height={40}
                  className="object-contain scale-90"
                />
              </div>
            </div>
          </div>

          {/* Content - Responsive text */}
          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-1.5 sm:gap-2 flex-wrap">
              <span className="text-sm sm:text-base font-semibold text-white truncate">
                KubeAstronaut
              </span>
              <span className="hidden xs:inline-flex rounded-full bg-purple-500/20 px-1.5 sm:px-2 py-0.5 text-[10px] sm:text-xs font-medium text-purple-300 border border-purple-500/30">
                CNCF Elite
              </span>
            </div>
            <p className="text-xs sm:text-sm text-gray-400 truncate">
              {certificationCount} K8s certifications
            </p>
          </div>

          {/* Arrow - Hidden on very small screens */}
          <div className="flex-shrink-0 text-gray-500 transition-all duration-300 group-hover:translate-x-0.5 group-hover:text-purple-400">
            <svg className="h-4 w-4 sm:h-5 sm:w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </div>
        </div>
      </div>
    </Link>
  );
}

export default memo(KubeAstronautBadge);
