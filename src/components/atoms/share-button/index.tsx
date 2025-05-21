"use client";

import { Button } from "@/components/ui/button";

export const ShareButton = () => {
  const currentUrl = window.location.href;

  const shareButtonClickHandler = () => {
    navigator.clipboard
      .writeText(currentUrl)
      .then(() => {
        console.log("클립보드에 복사되었습니다");
      })
      .catch(() => {
        console.error("클립보드 복사 실패!");
      });
  };

  return <Button onClick={shareButtonClickHandler}>공유하기</Button>;
};
