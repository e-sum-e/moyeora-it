'use client';

import { request } from '@/api/request';
import { ReplyMeta } from '@/components/molecules/reply/reply-meta';
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
  isDeleted = false, // 삭제된 댓글인지 여부
  onDelete,
}: ReplyContentProps) => {
  const { groupId } = useParams();
  const [isEditing, setIsEditing] = useState<boolean>(false);
  const [isLocallyDeleted, setIsLocallyDeleted] = useState<boolean>(isDeleted);
  const [content, setContent] = useState<string>(initalContent);

  const isWriter = true; // writer.userId === user.userId

  const { mutate: updateReply } = useMutation({
    mutationFn: async (enteredContent: string) =>
      request.patch(
        `/groups/${groupId}/replies/${replyId.toString()}`,
        { 'Content-Type': 'application/json' },
        {
          content: enteredContent,
        },
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
      request.delete(`/groups/${groupId}/replies/${replyId.toString()}`),
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
    <div>
      <header className="flex justify-between items-start">
        <ReplyMeta writer={writer} createdAt={createdAt} />
        {isWriter && !isLocallyDeleted && (
          <div className="flex gap-2">
            {!isEditing && (
              <button onClick={editButtonClickHandler}>수정</button>
            )}
            {isEditing && (
              <button onClick={saveButtonClickHandler}>저장</button>
            )}
            <button onClick={deleteButtonClickHandler}>삭제</button>
          </div>
        )}
      </header>
      {isEditing ? (
        <textarea
          value={content}
          onChange={(e) => setContent(e.currentTarget.value)}
          className="h-10 w-full border-2 border-slate-950"
        />
      ) : (
        <p className={`${isLocallyDeleted ? 'text-gray-500' : ''}`}>
          {isLocallyDeleted ? '삭제된 댓글입니다.' : content}
        </p>
      )}
    </div>
  );
};
