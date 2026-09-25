import Link from '@/components/Link';
import kebabCase from '@/lib/utils/kebabCase';

interface Props {
  text: string;
}

const Tag = ({ text }: Props) => {
  return (
    <Link
      className='mr-2 mt-1 inline-block rounded-md border border-term-green/30 bg-term-green/10 px-2 py-0.5 font-mono text-xs font-medium lowercase text-term-green transition-colors hover:border-term-green/60 hover:bg-term-green/20'
      href={`/tags/${kebabCase(text)}`}
    >
      #{text.split(' ').join('-')}
    </Link>
  );
};

export default Tag;
