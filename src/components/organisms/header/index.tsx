'use client';
import React from 'react';
import Link from 'next/link';
import { Avatar } from '../../atoms/avatar';
import { useRouter } from 'next/navigation';
export const Header = () => {
	const router = useRouter();
	const menuItems = [
		{
			label: '모여라-IT',
			href: '/',
			needLogin: false,
		},
		{
			label: 'Bookmark',
			href: '/bookmark',
			needLogin: false,
		},
		{
			label: 'MyPage',
			href: '/mypage',
			needLogin: true,
		},
		{
			label: 'Login',
			href: '/login',
			needLogin: false,
		},
		{
			label: 'Notification',
			href: '/notification',
			needLogin: true,
		},
	];
	const isLoggedIn = true; //TODO: 로그인 여부 확인 -> 전역에서 상태관리

	const filteredMenuItems = menuItems.filter(
		(item) => !item.needLogin || (item.needLogin && isLoggedIn),
	);

	return (
		<header>
			<nav>
				<ul className="flex gap-4 w-full justify-between">
					{filteredMenuItems.map((item) => (
						<li key={item.href}>
							{isLoggedIn && item.label === 'Notification' ? (
								<Avatar
									imageSrc="https://github.com/shadcn.png"
									fallback="user이름"
									className="w-8 h-8 cursor-pointer"
									onClick={() => {
										router.push('/');
									}}
								/>
							) : (
								<Link href={item.href}>{item.label}</Link>
							)}
						</li>
					))}
				</ul>
			</nav>
		</header>
	);
};
