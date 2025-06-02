import { BookmarkCardContents } from '@/components/molecules/bookmark-card-contents';
import { CardImage } from '@/components/molecules/card-image';
import { Group } from '@/types';
import { isBeforeToday } from '@/utils/dateUtils';
export type ContentInfo = Pick<
	Group,
	'id' | 'title' | 'deadline' | 'maxParticipants' | 'position' | 'skills' | 'participants'
>;

type CardProps = {
	info: ContentInfo;
};

export const BookmarkCard = ({ info }: CardProps) => {
	const isBeforeDeadline = isBeforeToday(info.deadline);

	return (
		<div className="relative">
			<article className="flex w-full">
				<figure>
					<CardImage
						imageSrc="https://picsum.photos/200/300"
						alt="card-image"
						width={280}
						height={150}
					/>
				</figure>
				<BookmarkCardContents className="flex-1" info={info} />
			</article>
			{isBeforeDeadline && (
				<div className="absolute inset-0 flex items-center justify-center bg-black/50 rounded-lg">
					<p className="text-white font-medium">
						모집이 종료되었습니다.
					</p>
				</div>
			)}
		</div>
	);
};
