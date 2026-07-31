import Image from 'next/image';
import Link from './Link';
import { memo } from 'react';
import { RoughNotation } from 'react-rough-notation';
import { useRandomColorPair } from '@/lib/hooks/useRandomColorPair';

interface KubeAstronautProps {
  awardDate: string;
  credentialUrl: string;
  badge: string;
  certifications: string[];
}

function KubeAstronaut({ awardDate, credentialUrl, badge, certifications }: KubeAstronautProps): React.ReactElement {
  const [highlightColor] = useRandomColorPair();
  
  const formatDate = (dateStr: string) => {
    return new Date(dateStr).toLocaleDateString('en-US', {
      month: 'long',
      year: 'numeric',
    });
  };

  return (
    <div className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-purple-900 via-blue-900 to-indigo-900 p-1">
      {/* Animated stars background */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="stars-container">
          {[...Array(50)].map((_, i) => (
            <div
              key={i}
              className="star"
              style={{
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
                animationDelay: `${Math.random() * 3}s`,
                animationDuration: `${2 + Math.random() * 2}s`,
              }}
            />
          ))}
        </div>
      </div>

      <div className="relative rounded-xl bg-gray-900/80 backdrop-blur-sm p-8">
        <div className="flex flex-col items-center text-center lg:flex-row lg:text-left gap-8">
          {/* Badge Section */}
          <div className="relative flex-shrink-0">
            <div className="relative h-48 w-48 lg:h-56 lg:w-56">
              {/* Glowing ring effect */}
              <div className="absolute inset-0 animate-pulse rounded-full bg-gradient-to-r from-purple-500 via-blue-500 to-cyan-500 opacity-50 blur-xl" />
              
              {/* Badge */}
              <div className="relative h-full w-full overflow-hidden rounded-full border-4 border-white/20 bg-gray-800/50 p-4">
                <Image
                  src={badge}
                  alt="KubeAstronaut Badge"
                  layout="fill"
                  objectFit="contain"
                  priority
                />
              </div>

              {/* Rocket emoji decoration */}
              <span className="absolute -right-2 -top-2 text-4xl animate-bounce">
                🚀
              </span>
            </div>
          </div>

          {/* Content Section */}
          <div className="flex-1">
            <div className="mb-2 inline-flex items-center rounded-full bg-gradient-to-r from-purple-500/20 to-blue-500/20 px-4 py-1">
              <span className="mr-2 text-2xl">🎖️</span>
              <span className="text-sm font-medium text-purple-300">Elite Achievement</span>
            </div>

            <h2 className="mb-2 text-4xl font-bold lg:text-5xl">
              <RoughNotation
                show
                type="highlight"
                animationDelay={500}
                animationDuration={2000}
                color={highlightColor}
              >
                <span className="text-white">KubeAstronaut</span>
              </RoughNotation>
            </h2>

            <p className="mb-4 text-lg text-gray-300">
              Achieved by earning <span className="font-bold text-cyan-400">all five</span> CNCF Kubernetes certifications
            </p>

            <div className="mb-6 flex flex-wrap justify-center gap-2 lg:justify-start">
              {certifications.map((cert) => (
                <span
                  key={cert}
                  className="inline-flex items-center rounded-lg bg-white/10 px-3 py-1.5 text-sm font-medium text-white backdrop-blur-sm"
                >
                  <svg className="mr-1.5 h-4 w-4 text-green-400" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                  </svg>
                  {cert}
                </span>
              ))}
            </div>

            <div className="flex flex-col items-center gap-4 sm:flex-row lg:justify-start">
              <span className="text-sm text-gray-400">
                Awarded: <span className="font-medium text-white">{formatDate(awardDate)}</span>
              </span>
              
              {credentialUrl && (
                <Link
                  href={credentialUrl}
                  className="inline-flex items-center rounded-lg bg-gradient-to-r from-purple-600 to-blue-600 px-6 py-3 text-sm font-medium text-white transition-all hover:from-purple-500 hover:to-blue-500 hover:shadow-lg hover:shadow-purple-500/25"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <svg className="mr-2 h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                  </svg>
                  Verify Credential
                </Link>
              )}
            </div>
          </div>
        </div>

        {/* Fun fact banner */}
        <div className="mt-8 rounded-lg bg-white/5 p-4">
          <p className="text-center text-sm text-gray-300">
            <span className="mr-2">💡</span>
            <span className="font-medium text-cyan-400">KubeAstronaut</span> is an exclusive recognition by the CNCF for individuals who demonstrate 
            exceptional expertise across the entire Kubernetes certification program. Only a select few worldwide have achieved this distinction!
          </p>
        </div>
      </div>

      <style jsx>{`
        .stars-container {
          position: absolute;
          width: 100%;
          height: 100%;
        }
        
        .star {
          position: absolute;
          width: 2px;
          height: 2px;
          background: white;
          border-radius: 50%;
          animation: twinkle ease-in-out infinite;
        }
        
        @keyframes twinkle {
          0%, 100% { opacity: 0.2; transform: scale(1); }
          50% { opacity: 1; transform: scale(1.5); }
        }
      `}</style>
    </div>
  );
}

export default memo(KubeAstronaut);
