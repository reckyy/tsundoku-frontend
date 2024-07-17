import { notFound } from 'next/navigation';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Page not found',
};

export default function Page({
  params,
}: {
  params: { 'not-found': string[] };
}) {
  if (params['not-found']) {
    notFound();
  }

  return null;
}
