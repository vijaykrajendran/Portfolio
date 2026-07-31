import Image from 'next/image';
import Link from './Link';
import { Certification } from 'config/certifications';

interface CertificationCardProps {
  certification: Certification;
}

function CertificationCard({ certification }: CertificationCardProps): React.ReactElement {
  const { title, issuer, issueDate, expiryDate, badge, credentialUrl, skills } = certification;
  
  const formatDate = (dateStr: string) => {
    return new Date(dateStr).toLocaleDateString('en-US', {
      month: 'short',
      year: 'numeric',
    });
  };

  const isExpired = expiryDate && new Date(expiryDate) < new Date();
  const isExpiringSoon = expiryDate && !isExpired && 
    new Date(expiryDate) < new Date(Date.now() + 90 * 24 * 60 * 60 * 1000);

  return (
    <div className="group relative rounded-xl border-2 border-gray-100 bg-white p-6 transition-all duration-300 hover:border-primary-500 hover:shadow-lg dark:border-gray-800 dark:bg-gray-900 dark:hover:border-primary-400">
      <div className="flex flex-col items-center sm:flex-row sm:items-start gap-4">
        {/* Badge Image */}
        <div className="flex-shrink-0">
          <div className="relative h-24 w-24 overflow-hidden rounded-lg bg-gray-50 dark:bg-gray-800">
            <Image
              src={badge}
              alt={title}
              fill
              className="object-contain p-2"
            />
          </div>
        </div>

        {/* Content */}
        <div className="flex-1 text-center sm:text-left">
          <h3 className="text-lg font-bold text-gray-900 dark:text-white">
            {title}
          </h3>
          <p className="mt-1 text-sm text-gray-600 dark:text-gray-400">
            {issuer}
          </p>
          
          <div className="mt-2 flex flex-wrap items-center justify-center gap-2 sm:justify-start">
            <span className="inline-flex items-center rounded-full bg-green-100 px-2.5 py-0.5 text-xs font-medium text-green-800 dark:bg-green-900 dark:text-green-200">
              Issued: {formatDate(issueDate)}
            </span>
            {expiryDate && (
              <span className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium ${
                isExpired 
                  ? 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200'
                  : isExpiringSoon
                  ? 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200'
                  : 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200'
              }`}>
                {isExpired ? 'Expired' : 'Expires'}: {formatDate(expiryDate)}
              </span>
            )}
          </div>

          {/* Skills Tags */}
          <div className="mt-3 flex flex-wrap justify-center gap-1 sm:justify-start">
            {skills.slice(0, 4).map((skill) => (
              <span
                key={skill}
                className="inline-flex items-center rounded-md bg-gray-100 px-2 py-0.5 text-xs text-gray-700 dark:bg-gray-800 dark:text-gray-300"
              >
                {skill}
              </span>
            ))}
            {skills.length > 4 && (
              <span className="inline-flex items-center rounded-md bg-gray-100 px-2 py-0.5 text-xs text-gray-500 dark:bg-gray-800 dark:text-gray-400">
                +{skills.length - 4} more
              </span>
            )}
          </div>
        </div>

        {/* Verify Button */}
        {credentialUrl && (
          <div className="flex-shrink-0">
            <Link
              href={credentialUrl}
              className="inline-flex items-center rounded-lg bg-primary-500 px-4 py-2 text-sm font-medium text-white transition-colors hover:bg-primary-600"
              target="_blank"
              rel="noopener noreferrer"
            >
              <svg className="mr-2 h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              Verify
            </Link>
          </div>
        )}
      </div>
    </div>
  );
}

export default CertificationCard;
