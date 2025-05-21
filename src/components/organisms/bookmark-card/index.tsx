import { BookmarkCardContents } from '@/components/molecules/bookmark-card-contents';
import { CardImage } from '@/components/molecules/card-image';

export const BookmarkCard = () => {
  return (
    <article className="flex w-full">
      <figure>
        <CardImage
          imageSrc="https://picsum.photos/200/300"
          alt="card-image"
          width={280}
          height={150}
        />
      </figure>
      <BookmarkCardContents className="flex-1" />
    </article>
  );
};
