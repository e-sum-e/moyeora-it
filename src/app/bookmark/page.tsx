import { Metadata } from 'next';
import { BookmarkPageClient, CardSkeleton } from './BookmarkPageClient';
import { Suspense } from 'react';


export const metadata: Metadata = {
  title: '찜한 프로젝트 | 모여라-IT',
  description: '찜한 프로젝트를 확인할 수 있습니다.',
  openGraph: {
    title: '찜한 프로젝트 | 모여라-IT',
    description: '찜한 프로젝트를 확인할 수 있습니다.',
    images: [
      { url: '/logos/logo-img.svg' },
    ],
  },
}
const SkeletonUI = () => {
  return (
    <div>
      <section className="flex flex-row gap-4 mb-8 w-full">
    <div className="w-[50px] h-[50px] bg-gray-200 rounded-xl animate-pulse" />
    <div className="flex flex-col gap-2 justify-center flex-1">
      <div className="h-6 w-32 bg-gray-200 rounded animate-pulse mb-1" />
      <div className="h-4 w-48 bg-gray-100 rounded animate-pulse" />
    </div>
  </section>
  <main>
    <div className="flex gap-2 mb-6">
      {[1, 2, 3].map((i) => (
        <div
          key={i}
          className="h-9 w-24 bg-gray-200 rounded-full animate-pulse"
        />
      ))}
    </div>
    <CardSkeleton />
  </main>
    </div>
  );
};
export default function BookmarkPage() {
  return (
    <Suspense fallback={<SkeletonUI />}>
      <BookmarkPageClient />
    </Suspense>
  );
}
