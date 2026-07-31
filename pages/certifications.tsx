import { Header } from '@/components/Form';
import { PageSEO } from '@/components/SEO';
import siteMetadata from '@/data/siteMetadata';
import CertificationCard from '@/components/CertificationCard';
import KubeAstronaut from '@/components/KubeAstronaut';
import { certifications, kubeAstronautStatus } from 'config/certifications';

export default function Certifications() {
  const k8sCerts = certifications.filter(cert => 
    ['cka', 'ckad', 'cks', 'kcna', 'kcsa'].includes(cert.slug)
  );
  const otherCerts = certifications.filter(cert => 
    !['cka', 'ckad', 'cks', 'kcna', 'kcsa'].includes(cert.slug)
  );

  return (
    <>
      <PageSEO
        title={`Certifications - ${siteMetadata.author}`}
        description="Professional certifications and achievements including Kubernetes, Cloud, and DevOps credentials"
      />
      <div className="fade-in divide-y divide-gray-100 dark:divide-gray-800">
        <Header title="Certifications" />
        
        <div className="px-4 py-6 sm:py-8 lg:py-10">
          {/* KubeAstronaut Showcase */}
          {kubeAstronautStatus.isKubeAstronaut && (
            <div className="mb-6 sm:mb-8">
              <KubeAstronaut
                awardDate={kubeAstronautStatus.awardDate}
                credentialUrl={kubeAstronautStatus.credentialUrl}
                badge={kubeAstronautStatus.badge}
                certifications={kubeAstronautStatus.certifications}
              />
            </div>
          )}

          {/* Kubernetes Certifications Section */}
          {k8sCerts.length > 0 && (
            <div className="mb-6 sm:mb-8">
              <div className="mb-3 sm:mb-4 flex items-center">
                <div className="flex h-8 w-8 sm:h-9 sm:w-9 items-center justify-center rounded-lg bg-blue-100 dark:bg-blue-900/50">
                  <svg className="h-4 w-4 sm:h-5 sm:w-5 text-blue-600 dark:text-blue-400" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M10.204 14.35l.007.01-.999 2.413a5.171 5.171 0 0 1-2.075-2.597l2.578-.437.004.005a.44.44 0 0 1 .485.606zm-.833-2.129a.44.44 0 0 0 .173-.756l.002-.011L7.585 9.7a5.143 5.143 0 0 0-.73 3.255l2.514-.725.002-.009zm1.145-1.98a.44.44 0 0 0 .699-.337l-.01-.006.3-2.623a5.157 5.157 0 0 0-2.993 1.5l2.004 1.466zm1.968-1.475a.44.44 0 0 0 .699.337l2.004-1.466a5.158 5.158 0 0 0-2.993-1.5l.29 2.629zm1.969 1.915a.44.44 0 0 0 .173.756l2.514.725a5.143 5.143 0 0 0-.73-3.255l-1.96 1.763.003.011zm-.17 2.098a.44.44 0 0 0 .485-.606l.004-.005 2.578.437a5.171 5.171 0 0 1-2.075 2.597l-.999-2.413.007-.01zm-3.283.911a.44.44 0 0 0-.863 0l-.498 2.436a5.16 5.16 0 0 0 1.859 0l-.498-2.436zm-1.75-3.585a.44.44 0 0 0-.537-.329l-.005-.003-2.514.725a5.157 5.157 0 0 0 .73 3.255l1.96-1.763-.003-.011a.44.44 0 0 0 .369-.874z"/>
                  </svg>
                </div>
                <h2 className="ml-2 sm:ml-3 text-lg sm:text-xl font-bold tracking-tight text-gray-900 dark:text-white">
                  Kubernetes Certifications
                </h2>
              </div>
              <div className="space-y-2 sm:space-y-3">
                {k8sCerts.map((cert) => (
                  <CertificationCard key={cert.slug} certification={cert} />
                ))}
              </div>
            </div>
          )}

          {/* Other Certifications Section */}
          {otherCerts.length > 0 && (
            <div className="mb-6 sm:mb-8">
              <div className="mb-3 sm:mb-4 flex items-center">
                <div className="flex h-8 w-8 sm:h-9 sm:w-9 items-center justify-center rounded-lg bg-green-100 dark:bg-green-900/50">
                  <svg className="h-4 w-4 sm:h-5 sm:w-5 text-green-600 dark:text-green-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z" />
                  </svg>
                </div>
                <h2 className="ml-2 sm:ml-3 text-lg sm:text-xl font-bold tracking-tight text-gray-900 dark:text-white">
                  Other Certifications
                </h2>
              </div>
              <div className="space-y-2 sm:space-y-3">
                {otherCerts.map((cert) => (
                  <CertificationCard key={cert.slug} certification={cert} />
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </>
  );
}
