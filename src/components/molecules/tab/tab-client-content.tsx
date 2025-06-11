'use client';

import { Tabs, TabsContent } from '@/components/ui/tabs';
import { ReactNode } from 'react';

type TabClientContentProps = {
  value: string;
  children: ReactNode;
};

export const TabClientContent = ({
  value,
  children,
}: TabClientContentProps) => {
  return (
    <Tabs>
      <TabsContent value={value}>{children}</TabsContent>
    </Tabs>
  );
};
