'use client';

import { Button } from '@/components/ui/button';
import { toast } from 'sonner';

export const ShareButton = () => {
  const currentUrl = window.location.href;

  const shareButtonClickHandler = async () => {
    try {
      await navigator.clipboard.writeText(currentUrl);
      toast.success('클립보드에 복사되었습니다');
    } catch {
      toast.error('클립보드 복사 실패!');
    }
  };

  return (
    <Button onClick={shareButtonClickHandler} className="cursor-pointer">
      공유하기
    </Button>
  );
};
