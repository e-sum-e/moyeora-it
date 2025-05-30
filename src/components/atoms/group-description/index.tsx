'use client';

import DOMPurify from 'dompurify';

const sanitizeHTML = (markdown: string) => {
  const renderedHTML = DOMPurify.sanitize(markdown);
  return { __html: renderedHTML };
};

export const GroupDescription = ({ description }: { description: string }) => {
  return <div dangerouslySetInnerHTML={sanitizeHTML(description)} />;
};
