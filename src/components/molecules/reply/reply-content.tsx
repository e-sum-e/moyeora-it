'use client';

import { request } from '@/api/request';
import { ReplyMeta } from '@/components/molecules/reply/reply-meta';
import { Button } from '@/components/ui/button';
import useAuthStore from '@/stores/useAuthStore';
import { Reply } from '@/types';
import { useMutation } from '@tanstack/react-query';
import { useParams } from 'next/navigation';
import { useState } from 'react';
import { toast } from 'sonner';

type ReplyContentProps = Reply & { parentId?: number; onDelete?: () => void };

export const ReplyContent = ({
  content: initalContent,
  replyId,
  writer,
  createdAt,
  parentId,
  deleted: isDeleted, // 삭제된 댓글인지 여부
  onDelete,
}: ReplyContentProps) => {
  const { groupId } = useParams();
  const [isEditing, setIsEditing] = useState<boolean>(false);
  const [isLocallyDeleted, setIsLocallyDeleted] = useState<boolean>(isDeleted);
  const [content, setContent] = useState<string>(initalContent);
  const user = useAuthStore((state) => state.user);

  const isWriter = user && writer.userId == user.userId;

  const { mutate: updateReply } = useMutation({
    mutationFn: async (enteredContent: string) =>
      request.patch(
        `/v2/groups/${groupId}/replies/${replyId}`,
        { 'Content-Type': 'application/json' },
        {
          content: enteredContent,
        },
        { credentials: 'include' },
      ),
    onSuccess: () => {
      setIsEditing(false);
    },
    onError: () => {
      toast.error('댓글 수정에 실패하였습니다.');
    },
  });

  const { mutate: deleteReply } = useMutation({
    mutationFn: async () =>
      request.delete(`/v2/groups/${groupId}/replies/${replyId}`, {
        credentials: 'include',
      }),
    onSuccess: () => {
      // 서버에서 삭제 요청이 성공하면 UI에서도 반영
      onDelete?.();
      setIsLocallyDeleted(true);
    },
    onError: () => {
      toast.error('댓글 삭제에 실패하였습니다.');
    },
  });

  const editButtonClickHandler = () => {
    setIsEditing(true);
  };

  const saveButtonClickHandler = () => {
    if (!content.trim() || content === initalContent) return;
    updateReply(content);
  };

  const deleteButtonClickHandler = () => {
    setIsEditing(false);
    deleteReply();
  };

  if (isLocallyDeleted && parentId) return null;

  return (
    <div className="p-5 flex flex-col gap-8">
      <header className="flex justify-between items-start max-sm:flex-col">
        <ReplyMeta writer={writer} createdAt={createdAt} />
        {isWriter && !isLocallyDeleted && (
          <div className="flex gap-2 max-sm:order-1">
            {!isEditing && (
              <Button
                onClick={editButtonClickHandler}
                variant="ghost"
                className="cursor-pointer"
              >
                수정
              </Button>
            )}
            {isEditing && (
              <Button
                onClick={saveButtonClickHandler}
                variant="ghost"
                className="cursor-pointer"
              >
                저장
              </Button>
            )}
            <Button
              onClick={deleteButtonClickHandler}
              variant="ghost"
              className="cursor-pointer"
            >
              삭제
            </Button>
          </div>
        )}
      </header>
      {isEditing ? (
        <textarea
          value={content}
          onChange={(e) => setContent(e.currentTarget.value)}
          className="max-h-20 w-full border-2 border-slate-800 rounded-sm p-3 resize-none"
        />
      ) : (
        <p
          className={`${
            isLocallyDeleted ? 'text-gray-500' : ''
          } break-words whitespace-pre-wrap`}
        >
          {isLocallyDeleted ? '삭제된 댓글입니다.' : content}
        </p>
      )}
    </div>
  );
};
