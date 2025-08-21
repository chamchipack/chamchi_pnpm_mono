import { Metadata } from 'next';

export const createNoMeta = (title: string, description: string): Metadata => ({
  title,
  description,
  robots: {
    index: false,
    follow: false,
  },
});
