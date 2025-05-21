'use client';

import { Button } from '@/components/ui/button';
import {
	Dialog,
	DialogContent,
	DialogDescription,
	DialogFooter,
	DialogHeader,
	DialogTitle,
	DialogTrigger,
	DialogClose,
} from '@/components/ui/dialog';
import { EditableAvatar } from '@/features/user/components/editable-avatar';

/**
 * 프로필 수정 모달 컴포넌트
 *
 * @returns 프로필 수정 모달 컴포넌트
 */

export const EditUserProfileDialog = () => {
	const editButtonClickHandler = () => {
		// TODO: 프로필 수정 로직 구현
	};

	return (
		<Dialog>
			<DialogTrigger asChild>
				<Button variant="outline">프로필 수정</Button>
			</DialogTrigger>
			<DialogContent className="sm:max-w-[425px]">
				<DialogHeader>
					<DialogTitle>프로필 수정</DialogTitle>
					<DialogDescription>
						프로필 이미지와 닉네임을 수정할 수 있습니다.
					</DialogDescription>
				</DialogHeader>
				<div className={'flex flex-col gap-y-4'}>
					<EditableAvatar imageSrc={''} fallback={'닉네임'} />
					<input type={'text'} placeholder={'새로운 닉네임을 입력해주세요.'} />
				</div>
				<DialogFooter>
					<DialogClose asChild>
						<Button variant="outline">취소</Button>
					</DialogClose>
					<DialogClose asChild>
						<Button type="button" onClick={editButtonClickHandler}>
							수정
						</Button>
					</DialogClose>
				</DialogFooter>
			</DialogContent>
		</Dialog>
	);
};
