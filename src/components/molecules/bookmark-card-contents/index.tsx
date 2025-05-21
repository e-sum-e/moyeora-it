import { Badge } from '@/components/atoms/badge';
import { BookmarkButton } from '@/components/atoms/bookmark-button';
import { Title } from '@/components/atoms/title';
import { Progress } from '@/components/ui/progress';

type BookmarkCardContentsProps = {
  className?: string;
};

export const BookmarkCardContents = ({
  className,
}: BookmarkCardContentsProps) => {
  return (
    <section className={`${className} flex flex-col justify-between`}>
      <div className="flex justify-between">
        <div className="flex flex-col gap-2">
          <header>
            <Title />
          </header>
          <div className="flex flex-row gap-2">
            <Badge text="날짜" className="bg-gray-200 text-gray-500" />
            <Badge text="시간" className="bg-gray-900 text-gray-100" />
          </div>
        </div>
        <BookmarkButton id={1} isBookmark={false} />
      </div>
      <footer>
        <div className="flex flex-col gap-2">
          <p>
            <span>인원수</span>
            <span>개설 여부</span>
          </p>
          <div className="flex flex-row gap-2">
            <Progress value={50} />
            <span>완료여부</span>
          </div>
        </div>
      </footer>
    </section>
  );
};
