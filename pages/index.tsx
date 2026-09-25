import { PageSEO } from '@/components/SEO';
import siteMetadata from '@/data/siteMetadata';
import { getFileBySlug } from '@/lib/mdx';
import { GetStaticProps, InferGetStaticPropsType } from 'next';
import { AuthorFrontMatter } from 'types/AuthorFrontMatter';
import KubeAstronautHero from '@/components/KubeAstronautHero';
import Banner from '@/components/Banner';
import Stats from '@/components/Stats';
import TechStack from '@/components/TechStack';
import Marquee from '@/components/Marquee';
import Timeline from '@/components/Timeline';
import { kubeAstronautStatus } from 'config/certifications';

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

      {/* Featured KubeAstronaut achievement */}
      <div id='explore' className='scroll-mt-24'>
        {kubeAstronautStatus.isKubeAstronaut && (
          <KubeAstronautHero
            badge={kubeAstronautStatus.badge}
            credentialUrl={kubeAstronautStatus.credentialUrl}
            awardDate={kubeAstronautStatus.awardDate}
            certifications={kubeAstronautStatus.certifications}
          />
        )}
      </div>

      <div className='section-divider mx-auto mt-16 max-w-4xl' />

      {/* Animated stats */}
      <Stats />

      {/* Tech Stack Showcase */}
      <TechStack />

      {/* Infinite tech ticker */}
      <Marquee />

      <div className='section-divider mx-auto mt-20 max-w-4xl' />

      {/* Experience Timeline */}
      <Timeline />
    </>
  );
}
