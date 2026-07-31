import { PageSEO } from '@/components/SEO';
import siteMetadata from '@/data/siteMetadata';
import { getFileBySlug } from '@/lib/mdx';
import { GetStaticProps, InferGetStaticPropsType } from 'next';
import dynamic from 'next/dynamic';
import { AuthorFrontMatter } from 'types/AuthorFrontMatter';
import KubeAstronaut from '@/components/KubeAstronaut';
import { kubeAstronautStatus } from 'config/certifications';

// TODO: Direct share functionality.
// TODO: Switch geist-ui with something simple.

// @ts-ignore
export const getStaticProps: GetStaticProps<{
  author: AuthorFrontMatter;
}> = async () => {
  const authorDetails = await getFileBySlug<AuthorFrontMatter>('authors', [
    'default',
  ]);

  const { frontMatter: author } = authorDetails;

  return { props: { author } };
};

const Banner = dynamic(import('@/components/Banner'));

export default function Home({
  author,
}: InferGetStaticPropsType<typeof getStaticProps>) {
  return (
    <>
      <PageSEO
        title={siteMetadata.title}
        description={siteMetadata.description}
      />
      <Banner frontMatter={author} />
      {kubeAstronautStatus.isKubeAstronaut && (
        <div className="container py-6">
          <KubeAstronaut
            awardDate={kubeAstronautStatus.awardDate}
            credentialUrl={kubeAstronautStatus.credentialUrl}
            badge={kubeAstronautStatus.badge}
            certifications={kubeAstronautStatus.certifications}
          />
        </div>
      )}
    </>
  );
}
