'use client';

import { useInfiniteScroll } from '@/hooks/use-infinite-scroll';
import { useRef } from 'react';

export default function GroupDetailPage() {
  const target = useRef<HTMLDivElement>(null);
  const { items: replies } = useInfiniteScroll({
    queryKey: ['test'],
    target,
    requestUrl: '/api/comments',
  });

  return (
    <div>
      <ul>
        {replies.map((reply) => (
          <li key={reply} className="h-10">
            {reply}
          </li>
        ))}
      </ul>
      <div ref={target} className="w-5 h-5 bg-blue-300" />
    </div>
  );
}
