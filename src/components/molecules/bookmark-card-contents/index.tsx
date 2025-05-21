import { Badge } from '@/components/atoms/badge';
import { BookmarkButton } from '@/components/atoms/bookmark-button';
import { Title } from '@/components/atoms/title';
import { ContentInfo } from '@/components/organisms/bookmark-card';
import { Progress } from '@/components/ui/progress';
import { getPosition } from '@/types/enums';

type BookmarkCardContentsProps = {
	className?: string;
	info: ContentInfo;
};

export const BookmarkCardContents = ({
	className,
	info,
}: BookmarkCardContentsProps) => {
	return (
		info && (
			<section className={`${className} flex flex-col justify-between`}>
				<div className="flex justify-between">
					<div className="flex flex-col gap-2">
						<header>
							<Title title={info.title} />
						</header>
						<div className="flex flex-row gap-2">
							{/* TODO: 날짜 형식 util 윤아님이 만드시면 적용 */}
							<Badge
								text={info.deadline.toLocaleDateString()}
								className="bg-gray-200 text-gray-500"
							/>
							{info.position.map((position) => (
								<Badge
									text={getPosition(position)}
									className="bg-gray-900 text-gray-100"
									key={position}
								/>
							))}
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
		)
	);
};
