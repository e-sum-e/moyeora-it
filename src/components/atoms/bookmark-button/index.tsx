'use client';

import Image from 'next/image';

type Props = {
  isBookmark: boolean;
  onToggle: () => void;
};

export const BookmarkButton = ({ isBookmark, onToggle }: Props) => {
  return (
    <button onClick={onToggle} className="cursor-pointer">
      <Image
        src={`/icons/bookmark-${isBookmark ? 'active' : 'default'}.svg`}
        alt="찜하기"
        width={24}
        height={24}
      />
    </button>
  );
};
