'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { EditUserProfileForm } from '@/features/user/components/edit-user-profile-form/edit-user-profile-form';

/**
 * 프로필 수정 모달 컴포넌트
 *
 * @returns 프로필 수정 모달 컴포넌트
 */

export const EditUserProfileDialog = () => {
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  const closeDialog = () => {
    setIsDialogOpen(false);
  }

  return (
    <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
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
          <EditUserProfileForm closeDialog={closeDialog} />
        </div>
      </DialogContent>
    </Dialog>
  );
};
