import CourseContent from '@/components/CourseContent';
import { Header } from '@/components/Form';
import { PageSEO } from '@/components/SEO';
import config from 'config';
import { GetStaticProps, InferGetStaticPropsType } from 'next';

const SLUG = 'go';

export const getStaticProps: GetStaticProps = () => {
  const course = config.courses.find(course => course.slug === SLUG) || null;

  if (!course) {
    return { notFound: true };
  }

  return { props: { course } };
};

export default function Go(
  props: InferGetStaticPropsType<typeof getStaticProps>,
): React.ReactElement {
  const { course } = props;
  const { title, description } = course;

  return (
    <>
      <PageSEO
        title={title}
        description={description}
        imageUrl={`/static/courses/${SLUG}/banner.png`}
      />
      <div className='fade-in divide-y-2 divide-gray-100 dark:divide-gray-800'>
        <Header title={title} subtitle={description} />
        <CourseContent course={course} />
      </div>
    </>
  );
}
