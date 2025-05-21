import { useCallback, useState } from 'react';

export const usePreventDoubleClick = (delay = 1000) => {
  // 기본적으로 1초내에 같은 요청은 무시한다
  const [isClicked, setIsClicked] = useState(false);

  const onClick = useCallback(
    async (callback: () => Promise<void>) => {
      if (isClicked) return;
      setIsClicked(true);

      try {
        await callback();
      } finally {
        setTimeout(() => {
          setIsClicked(false);
        }, delay);
      }
    },
    [isClicked, delay],
  );

  return { onClick, isClicked };
};

/**
 * 사용예시. button의 disabled 옵션도 같이 사용
"use client";

import React from "react";
import { request } from "@/api/request";
import { usePreventDoubleClick } from "@/hooks/usePreventDoubleClick";

export const SubmitButton = () => {
  const { onClick, isClicked } = usePreventDoubleClick();

  const submitClick = async () => {
    const data = await request.post("submit", { name: "user" });

  };

  return (
    <button disabled={isClicked} onClick={() => onClick(submitClick)}>
      저장
    </button>
  );
};
 */
