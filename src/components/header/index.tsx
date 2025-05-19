import React from "react";
import Link from "next/link";

export const Header = () => {
  const menuItems = [
    {
      label: "모여라-IT",
      href: "/",
      needLogin: false,
    },
    {
      label: "Bookmark",
      href: "/bookmark",
      needLogin: false,
    },
    {
      label: "MyPage",
      href: "/mypage",
      needLogin: true,
    },
    {
      label: "Login",
      href: "/login",
      needLogin: false,
    },
    {
      label: "Notification",
      href: "/notification",
      needLogin: true,
    },
  ];
  const isLoggedIn = false; //TODO: 로그인 여부 확인 -> 전역에서 상태관리 

  const filteredMenuItems = menuItems.filter(
    (item) => !item.needLogin || (item.needLogin && isLoggedIn)
  );

  return (
    <header>
      <nav>
        <ul className="flex gap-4 w-full justify-between">
          {filteredMenuItems.map((item) => (
            <li key={item.href}>
              <Link href={item.href}>{item.label}</Link>
            </li>
          ))}
        </ul>
      </nav>
    </header>
  );
}; 