'use client';

import { request } from '@/api/request';
import { ReplyMeta } from '@/components/molecules/reply/reply-meta';
import { Reply } from '@/types';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useParams } from 'next/navigation';
import { useState } from 'react';
import { toast } from 'sonner';

type ReplyContentProps = Reply & { parentId?: number };

export const ReplyContent = ({
  content: initalContent,
  replyId,
  writer,
  createdAt,
  parentId,
  isDeleted = false, // 삭제된 댓글인지 여부
}: ReplyContentProps) => {
  const { groupId } = useParams();
  const [isEditing, setIsEditing] = useState<boolean>(false);
  const [content, setContent] = useState<string>(initalContent);

  const isWriter = true; // writer.userId === user.userId
  const queryKeyEndpoint = `/groups/${groupId}/replies${
    parentId !== undefined ? `/${parentId}` : ''
  }`;

  const queryClient = useQueryClient();

  const { mutate: updateReply } = useMutation({
    mutationFn: async (enteredContent: string) =>
      request.patch(
        `/groups/${groupId}/replies`,
        {
          content: enteredContent,
        },
        replyId.toString(),
      ),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ['items', queryKeyEndpoint],
      });
    },
    onError: () => {
      toast.error('댓글 수정에 실패하였습니다.');
      setContent(initalContent);
    },
  });

  const { mutate: deleteReply } = useMutation({
    mutationFn: async () =>
      request.delete(`/groups/${groupId}/replies`, replyId.toString()),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ['items', queryKeyEndpoint],
      });
    },
    onError: () => {
      toast.error('댓글 삭제에 실패하였습니다.');
    },
  });

  const editButtonClickHandler = () => {
    setIsEditing(true);
  };

  const saveButtonClickHandler = () => {
    if (!content.trim()) return;

    setIsEditing(false);
    updateReply(content);
  };

  const deleteButtonClickHandler = () => {
    setIsEditing(false);
    deleteReply();
  };

  return (
    <div id={`reply-${replyId}`}>
      <header className="flex justify-between items-start">
        <ReplyMeta writer={writer} createdAt={createdAt} />
        {isWriter && !isDeleted && (
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
        <p className={`${isDeleted ? 'text-gray-500' : ''}`}>{content}</p>
      )}
    </div>
  );
};
