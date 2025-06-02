import { GroupList } from '@/components/organisms/group';
import { Suspense } from 'react';

export default function Home() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <GroupList />
    </Suspense>
  );
}
