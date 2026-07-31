import Image from 'next/image';
import Link from './Link';
import { Certification } from 'config/certifications';

interface CertificationCardProps {
  certification: Certification;
}

function CertificationCard({ certification }: CertificationCardProps): React.ReactElement {
  const { title, issuer, issueDate, badge, credentialUrl, skills } = certification;
  
  const formatDate = (dateStr: string) => {
    return new Date(dateStr).toLocaleDateString('en-US', {
      month: 'short',
      year: 'numeric',
    });
  };

  return (
    <div className="card-hover group relative rounded-lg sm:rounded-xl border border-gray-200 bg-white p-3 sm:p-4 hover:border-primary-400 dark:border-gray-700 dark:bg-gray-900 dark:hover:border-primary-500">
      <div className="flex items-start gap-3 sm:gap-4">
        {/* Badge Image - Compact */}
        <div className="flex-shrink-0">
          <div className="flex h-14 w-14 sm:h-16 sm:w-16 items-center justify-center overflow-hidden rounded-lg bg-gray-50 dark:bg-gray-800 group-hover:bg-gray-100 dark:group-hover:bg-gray-700 transition-colors duration-200">
            <Image
              src={badge}
              alt={title}
              width={56}
              height={56}
              className="object-contain group-hover:scale-110 transition-transform duration-300"
            />
          </div>
        </div>

        {/* Content */}
        <div className="flex-1 min-w-0">
          <h3 className="text-sm sm:text-base font-semibold text-gray-900 dark:text-white truncate">
            {title}
          </h3>
          <p className="text-xs sm:text-sm text-gray-500 dark:text-gray-400">
            {issuer}
          </p>
          
          {/* Issue date */}
          <div className="mt-1.5">
            <span className="inline-flex items-center rounded-full bg-green-50 px-2 py-0.5 text-[10px] sm:text-xs font-medium text-green-700 dark:bg-green-900/30 dark:text-green-400">
              Issued {formatDate(issueDate)}
            </span>
          </div>

          {/* Skills - Hidden on mobile, shown on sm+ */}
          <div className="mt-2 hidden sm:flex flex-wrap gap-1">
            {skills.slice(0, 3).map((skill) => (
              <span
                key={skill}
                className="inline-flex items-center rounded bg-gray-100 px-1.5 py-0.5 text-[10px] text-gray-600 dark:bg-gray-800 dark:text-gray-400"
              >
                {skill}
              </span>
            ))}
            {skills.length > 3 && (
              <span className="inline-flex items-center rounded bg-gray-100 px-1.5 py-0.5 text-[10px] text-gray-500 dark:bg-gray-800 dark:text-gray-500">
                +{skills.length - 3}
              </span>
            )}
          </div>
        </div>

        {/* Verify Button - Icon only on mobile */}
        {credentialUrl && (
          <div className="flex-shrink-0 self-center">
            <Link
              href={credentialUrl}
              className="btn-press inline-flex items-center justify-center rounded-lg bg-primary-500 p-2 sm:px-3 sm:py-1.5 text-white transition-all duration-200 hover:bg-primary-600 hover:shadow-lg hover:shadow-primary-500/25"
              target="_blank"
              rel="noopener noreferrer"
              title="Verify credential"
            >
              <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              <span className="hidden sm:inline ml-1.5 text-xs font-medium">Verify</span>
            </Link>
          </div>
        )}
      </div>
    </div>
  );
}

export default CertificationCard;
