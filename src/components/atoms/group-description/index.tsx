'use client';

import DOMPurify from 'dompurify';

export const GroupDescription = ({ description }: { description: string }) => {
  return (
    <div
      dangerouslySetInnerHTML={{
        __html: DOMPurify.sanitize(description),
      }}
    />
  );
};
