/* eslint-disable react/display-name */
import React, { useMemo } from 'react';
import { getMDXComponent } from 'mdx-bundler/client';
import Image from 'next/image';
import CustomLink from './Link';
import TOCInline from './TOCInline';
import Pre from './Pre';
import { BlogNewsletterForm } from './NewsletterForm';

import AuthorLayout from '../layouts/AuthorLayout';
import CourseLayout from '../layouts/CourseLayout';
import ListLayout from '../layouts/ListLayout';
import PostLayout from '../layouts/PostLayout';
import PostSimple from '../layouts/PostSimple';

const layouts: Record<string, React.ComponentType<any>> = {
  AuthorLayout,
  CourseLayout,
  ListLayout,
  PostLayout,
  PostSimple,
};

const Wrapper: React.ComponentType<{ layout: string }> = ({
  layout,
  ...rest
}) => {
  const Layout = layouts[layout];
  if (!Layout) {
    throw new Error(`Unknown MDX layout: "${layout}"`);
  }
  return <Layout {...rest} />;
};

export const MDXComponents: Record<string, React.ComponentType<any>> = {
  Image,
  //@ts-ignore
  TOCInline,
  a: CustomLink,
  pre: Pre,
  wrapper: Wrapper,
  //@ts-ignore
  BlogNewsletterForm,
};

interface Props {
  layout: string;
  mdxSource: string;
  [key: string]: unknown;
}

export const MDXLayoutRenderer = ({ layout, mdxSource, ...rest }: Props) => {
  const MDXLayout = useMemo(() => getMDXComponent(mdxSource), [mdxSource]);

  return <MDXLayout layout={layout} components={MDXComponents} {...rest} />;
};
