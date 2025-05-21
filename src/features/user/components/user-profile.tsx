import { Avatar } from '@/components/atoms/avatar';
import { Badge } from '@/components/atoms/badge';

/**
 * 유저 프로필 컴포넌트
 *
 * 유저 상세 정보를 보여준다.
 *
 * @returns 유저 프로필 컴포넌트
 */

export const UserProfile = () => {
	// TODO: 전역 스토어에서 유저 정보 가져오기
	// const user = useAuthStore(state => state.user)

	const user = {
		userId: 'a',
		email: 'test@test.com',
		nickname: '테스트닉네임',
		profileImage: 'https://github.com/shadcn.png',
		position: 'FE',
		skills: ['React', 'TypeScript', 'Next.js'],
		rate: 4.5,
	};

	return (
		<div>
			<Avatar
				className="size-36"
				imageSrc={user.profileImage}
				fallback="테스트"
			/>
			<div className="flex flex-col gap-y-1">
				<span>{user.nickname}</span>
				<span>{user.email}</span>
				<div className="flex items-center gap-x-2">
					<span>별점 : {user.rate}</span>
					<Badge text="뱃지" className="bg-emerald-50 text-emerald-500" />
				</div>
				<ul>
					{user.skills.map((skill) => (
						<li key={skill}>
							<Badge text={skill} className="bg-gray-100 text-gray-800" />
						</li>
					))}
				</ul>
			</div>
		</div>
	);
};
